import styles from "./Header.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { changeUser } from "../../redux/actions";

const Header = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem('user_id')) {
            setUser({
                role: localStorage.getItem('user_role'),
                name: localStorage.getItem('user_name'),
                _id: localStorage.getItem('user_id'),
                email: localStorage.getItem('user_email')
            })
        }
    }, [])
    
    return (
        <header className="py-3">
            <div className="row">
                <div className={["col-xl-2","col", styles.logo].join(' ')}>
                    <Link href='/'>
                        <a><img src="/img/logo.jpeg" alt="logo"></img></a>
                    </Link>
                </div>
                <div className="col-xl-2"></div>
                <div className="col-xl-4 col justify-content-center d-flex">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link href='/'>
                            <a className={[styles.nav_link, 'nav-link' , router.pathname === '/'?styles.nav_link_active:''].join(' ')}>Главная</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href='/features'>
                            <a className={[styles.nav_link,'nav-link' , router.pathname === '/features'?styles.nav_link_active:''].join(' ')}>Услуги</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href='/pricing'>
                            <a className={[styles.nav_link , 'nav-link',router.pathname === '/pricing'?styles.nav_link_active:''].join(' ')}>Контакты</a>
                            </Link>
                        </li>
                        {
                            user && user.role === 'admin'?
                            <li className="nav-item">
                                <Link href='/admin'>
                                    <a className={[styles.nav_link , 'nav-link',router.pathname === '/admin'?styles.nav_link_active:''].join(' ')}>Админка</a>
                                </Link>
                            </li>
                            :
                            null   
                        }
                    </ul>
                </div>
                <div className="col-xl-2 col">{user?`Привет, ${user.role} ${user.name}`:''}</div>
                <div className="col-xl-2 col">
                    {
                        user?
                        <Button className={styles.btn} onClick = {async () => {
                            await fetch('/api/logout')
                            setUser(null);
                            localStorage.clear();
                            }}>
                            <a>Выйти</a>
                        </Button>
                        :
                        <div className="row">
                            <div className="col">
                                <Link href='/login'>
                                    <Button className={styles.btn}>
                                        <a>Войти</a>
                                    </Button>
                                </Link>
                            </div>
                            <div className="col mt-2">
                                <Link href='/register'>
                                    <Button className={styles.btn}>
                                        <a>Зарегистрироваться</a>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    }
                </div>
            </div>
            
        </header>
    );
}

export default Header;