import styles from './admin.module.scss';
import { useState } from 'react';
import SideBar from '/components/SideBar/SideBar';
import ProfileDropDown from '/components/ProfileDropDown';


export default function() {
    const [authorized, setAuthorized] = useState(false); 
    const [rememberPass, setRememberPass] = useState(false);
    const [login, setLogin] = useState(''); 
    const [password, setPassword] = useState(''); 

    const submitHandler = (e) => {
        e.preventDefault();
        setAuthorized(true);
    }

    return (
        <>
                {
                authorized?
                <main className="d-flex flex-nowrap">
                    <SideBar header={'Панель администратора'}>
                        <ul className="nav nav-pills flex-column mb-auto">
                        <li>
                            <a href="#" className={"nav-link link-dark " + styles.active}>
                            <svg className="bi pe-none me-2" width="16" height="16"></svg>
                            Графики
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link link-dark">
                            <svg className="bi pe-none me-2" width="16" height="16"></svg>
                            Записи
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link link-dark">
                            <svg className="bi pe-none me-2" width="16" height="16"></svg>
                            Клиенты
                            </a>
                        </li>
                        </ul>
                        <ProfileDropDown login={login}></ProfileDropDown>
                    </SideBar>
                </main>
                :
                <div className="row">  
                    <div className="col-4"></div>
                    <form className={"col-4 " + styles.form} onSubmit={submitHandler}>
                        <div className="mb-3">
                            <label for="login" className="form-label">Логин</label>
                            <input 
                            type="login" 
                            className="form-control" 
                            id="login" 
                            aria-describedby="login"
                            onChange = {(e) => setLogin(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label for="password" className="form-label">Пароль</label>
                            <input 
                            type="password" 
                            className="form-control" 
                            id="password"
                            onChange = {(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 form-check">
                            <input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="remember_pass"
                            onChange = {(e) => setRememberPass(e.target.value)}
                            />
                            <label className="form-check-label" for="remember_pass">Запомнить пароль</label>
                        </div>
                        <div className="row">
                            <div className="col-4"></div>
                            <button className="btn btn-dark col-4">Войти</button>
                            <div className="col-4"></div>
                        </div>
                    </form> 
                    <div className="col-4"></div>
                </div>
                }
        </>
    );
}