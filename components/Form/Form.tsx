import { FormEvent, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeEmail, changePhone } from '../../redux/actions';
import isEmail from 'validator/es/lib/isEmail';
import isMobilePhone from 'validator/es/lib/isMobilePhone';
import styles from './Form.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faCheck, faX } from '@fortawesome/free-solid-svg-icons';

interface InputProps {
    label: string;
    type: string;
    required?: boolean;
    name: string;
    id: string;
    value?: string;
    placeholder?: string;
    handlerValue: (value:string) => void;
    handler: (value:string) => void;
    onFocus?: (e:any) => void;
}

interface FormProps {
    date: string;
    time: string;
    successHandler: (value:boolean) => void;
}

const Input = ({label, type, name, id, placeholder, required, handlerValue, onFocus, handler}: InputProps) => {
    return (
        <>
            <label htmlFor={id} className="form-label">{label}</label>
            <input 
            type={type}
            name= {name}
            className="form-control shadow-none" 
            id={id}
            placeholder={placeholder}
            onBlur={(e) => handlerValue(e.target.value)}
            onChange={(e) => handler(e.target.value)}
            onFocus={(e) => onFocus?onFocus(e):null}
            required= {required}
            />
        </>
    )
}

const Form = ({date, time, successHandler}:FormProps) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [submited, setSubmited] = useState(false);
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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSubmited(true);
        fetch('/api/record', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({name, email, phone, date, time})
        })
        .then((res) => {
            successHandler(res.status === 200);
            setSubmited(false);
        } )
        .catch(e => {
            console.log(e);
        })
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form + ' ' + styles.form_success}>
            <div className="mb-3">
                <Input 
                handlerValue={handlerName}
                handler = {setName}
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
                handler = {setEmail}
                label='Адрес электронной почты' 
                type='email' 
                required={true}
                name='email'
                id='email' 
                value={email}
                ></Input>
            </div>
            <div className="mb-3">
                <Input 
                handlerValue={handlerPhone} 
                handler = {setPhone}
                label='Номер мобильного телефона' 
                type='tel' 
                required={true}
                name='phone'
                id='tel' 
                placeholder='+7'
                value={phone}
                onFocus={(e) => e.target.value?null:e.target.value = '+7'}
                ></Input>
            </div>
            {
            (submited)?
            <FontAwesomeIcon  icon = {faCircleNotch} className={`fa-spin ${styles.spinner}`} size='2x'/>
            :<button 
            type="submit" 
            className="btn btn-dark align-self-center"
            >Записаться</button>
            }
        </form>
    );
}

export default Form;