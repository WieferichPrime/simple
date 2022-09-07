import { useCallback, useEffect, useState } from "react";
import styles from './login.module.scss';
import { Button, Modal } from 'react-bootstrap';
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { changeUser } from "../../redux/actions";

export default function() {
    const [authorized, setAuthorized] = useState<boolean>(); 
    const [rememberPass, setRememberPass] = useState<boolean>(false);
    const [email, setLogin] = useState(''); 
    const [password, setPassword] = useState('');
    
    
    const router = useRouter();
    const dispatch = useDispatch();
    const addUser = useCallback((user) => {
		dispatch(changeUser(user));
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        await fetch('/api/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({email, password})
        })
        .then(res => res.json())
        .then((res) => {
            setAuthorized(true);
            if (rememberPass) {
                addUser(res);
                localStorage.clear();
                localStorage.setItem('user_name', res.name)
                localStorage.setItem('user_role', res.role)
                localStorage.setItem('user_email', res.email)
                localStorage.setItem('user_id', res._id)
            }
            router.push('/');
        })
        .catch((e) => {
            setAuthorized(false);
        })
    }

    return (
        <main>
            <Modal 
                show = {authorized !== undefined && !authorized}
                backdrop="static"
                keyboard={false}
                onHide={() => setAuthorized(undefined)}
                >
                <Modal.Header>
                    <Modal.Title>Вход не выполнен</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Неверная почта / пароль</Modal.Body>
                    <Modal.Footer>
                    <Button onClick={() => setAuthorized(undefined)}>
                        ОК
                    </Button>
                    </Modal.Footer>
            </Modal>
            <div className="row">  
                <div className="col-5"></div>
                <form className={"col-2 " + styles.form} onSubmit={submitHandler}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Логин</label>
                        <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        aria-describedby="email"
                        onChange = {(e) => setLogin(e.target.value)}
                        value = {email}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Пароль</label>
                        <input 
                        type="password" 
                        className="form-control" 
                        id="password"
                        onChange = {(e) => setPassword(e.target.value)}
                        value = {password}
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input 
                        type="checkbox" 
                        className="form-check-input" 
                        id="remember_pass"
                        onChange = {(e:React.ChangeEvent<HTMLInputElement>) => setRememberPass(e.target.checked)}
                        checked = {rememberPass}
                        />
                        <label className="form-check-label" htmlFor="remember_pass">Запомнить пароль</label>
                    </div>
                    <div className="row">
                        <div className="col-4"></div>
                        <button className="btn btn-dark col-4">Войти</button>
                        <div className="col-4"></div>
                    </div>
                </form> 
                <div className="col-5"></div>
            </div>
        </main>
    )
}