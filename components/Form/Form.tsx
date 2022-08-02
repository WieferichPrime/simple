import { FormEvent, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeEmail, changePhone, Time } from '../../redux/actions';
import isEmail from 'validator/es/lib/isEmail';
import isMobilePhone from 'validator/es/lib/isMobilePhone';
import styles from './Form.module.scss';
import RecordController from '../../Controllers/RecordController.js';

interface InputProps {
    label: string;
    type: string;
    required?: boolean;
    name: string;
    id: string;
    value?: string;
    placeholder?: string;
    handlerValue: (value:string) => void;
    onFocus?: (e:any) => void;
}

interface FormProps {
    date: Date;
    time: Time
}

const Input = ({label, type, name, id, placeholder, required, handlerValue, onFocus = () => {}, value}: InputProps) => {
    return (
        <>
            <label htmlFor={id} className="form-label">{label}</label>
            <input 
            type={type}
            name= {name}
            className="form-control shadow-none" 
            id={id}
            placeholder={placeholder}
            onChange={(e) => handlerValue(e.target.value)}
            value={value}
            onFocus={(e) => onFocus(e)}
            required= {required}
            />
        </>
    )
}

const Form = ({date, time}:FormProps) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [success, setSuccess] = useState(false);
    const [unsuccess, setUnSuccess] = useState(false);
    const dispatch = useDispatch();
    const handlerEmail = useCallback((email: string) => {
        setEmail(email);
        dispatch(changeEmail(email));
    }, []);

    const handlerPhone = useCallback((phone: string) => {
        setPhone(phone);
        dispatch(changePhone(phone));
    }, []);

    const handlerName = ((name: string) => {
        setName(name);
    });

    const getDateTime = () => {
        const dateTime = new Date(date)
        dateTime.setHours(time.hours);
        dateTime.setMinutes(time.minutes);
        dateTime.setSeconds(0);
        return dateTime.toString();
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        fetch('/api/record', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({name, email, phone, date: getDateTime()})
        })
        .then((res) => {
            if (res.status !== 200) {
                setSuccess(false);
                setUnSuccess(true);
            } else {
                setSuccess(true);
                setUnSuccess(false);
            }
        } )
        .catch(e => {
            console.log(e);
        })
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
            {
                (success && !unsuccess)?<span>"Успешно"</span>
                :null
            }
            {
                (unsuccess && !success)?<span>"Что-то пошлоо не так, попробуйте еще раз"</span>
                :null
            }
            
            <div className="mb-3">
                <Input 
                handlerValue={handlerName} 
                label='Ваше имя' 
                type='text' 
                required={true}
                name='name'
                id='name' 
                ></Input>
            </div>
            <div className="mb-3">
                <Input 
                handlerValue={handlerEmail} 
                label='Адрес электронной почты' 
                type='email' 
                required={true}
                name='email'
                id='email' 
                value={useSelector((state:any) => state.email) || ''}
                ></Input>
            </div>
            <div className="mb-3">
                <Input 
                handlerValue={handlerPhone} 
                label='Номер мобильного телефона' 
                type='tel' 
                required={true}
                name='phone'
                id='tel' 
                placeholder='+7'
                value={useSelector((state:any) => state.phone) || ''}
                onFocus={(e) => e.target.value?null:e.target.value = '+7'}
                ></Input>
            </div>
            <button 
            type="submit" 
            className={["btn", "align-self-center", styles.btn].join(' ')}
            >{`
            Записаться на ${date.toLocaleDateString()} 
            ${time.hours}:${time.minutes>10?time.minutes:'0'+time.minutes}
            `}</button>
        </form>
    );
}

export default Form;