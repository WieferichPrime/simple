import { useState } from "react";
import styles from './register.module.scss';
import { Button, Modal } from 'react-bootstrap';
import { useRouter } from "next/router";


export default function() {
    const [registered, setRegistered] = useState(undefined); 
    const [rememberPass, setRememberPass] = useState(false);
    const [email, setEmail] = useState(''); 
    const [phone, setPhone] = useState(''); 
    const [name, setName] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [passwordRepeat, setPasswordRepeat] = useState(''); 
    const router = useRouter();


    const submitHandler = async (e) => {
        e.preventDefault();

        //validation

        await fetch('/api/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({email, password, name, phone})
        })
        .then(() => setRegistered(true))
        .catch((e) => {
            setRegistered(false)
            console.log(e);
        })
    }

    return (
        <>
            <Modal 
                show = {registered}
                backdrop="static"
                keyboard={false}
                onHide={() => setRegistered(undefined)}
                >
                <Modal.Header>
                    <Modal.Title>Учетная запись создана</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Письмо с подтверждением в разработке</Modal.Body>
                    <Modal.Footer>
                    <Button onClick={() => router.push('/login')} className={styles.modal__btn}>
                        Войти в аккаунт
                    </Button>
                    </Modal.Footer>
            </Modal>
            <div className="row">  
                <div className="col-5"></div>
                <form className={"col-2 " + styles.form} onSubmit={submitHandler}>
                <div className="mb-3">
                        <label htmlFor="name" className="form-label">Имя</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="name"
                        onChange = {(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Адрес электронной почты</label>
                        <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        aria-describedby="email"
                        onChange = {(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Мобильный телефон</label>
                        <input 
                        type="phone" 
                        className="form-control" 
                        id="phone" 
                        aria-describedby="phone"
                        onChange = {(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Пароль</label>
                        <input 
                        type="password" 
                        className="form-control" 
                        id="password"
                        onChange = {(e) => setPassword(e.target.value)}
                        />
                    </div>
    
                    <div className="mb-3">
                        <label htmlFor="repeat_password" className="form-label">Повторите пароль</label>
                        <input 
                        type="password" 
                        className="form-control" 
                        id="repeat_password"
                        onChange = {(e) => setPasswordRepeat(e.target.value)}
                        />
                    </div>
                    
                    <div className="row">
                        <div className="col-2"></div>
                        <button className="btn btn-dark col-8">Зарегистрироваться</button>
                        <div className="col-2"></div>
                    </div>
                </form> 
                <div className="col-5"></div>
            </div>
        </>
    )
}