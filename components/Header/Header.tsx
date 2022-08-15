import React from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
    const router = useRouter();
    return (
        <header className="py-3">
            <div className="row">
                <div className={["col-xl-2","col", styles.logo].join(' ')}>
                    <Link href='/'>
                        <img src="/img/logo.jpeg" alt="logo"></img>
                    </Link>
                </div>
                <div className="col-xl-2"></div>
                <div className="col-xl-4 col justify-content-center d-flex">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link href='/'>
                            <a className={[styles.nav_link, 'nav-link' , router.pathname === '/'?styles.nav_link_active:''].join(' ')}>Home</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href='/features'>
                            <a className={[styles.nav_link,'nav-link' , router.pathname === '/features'?styles.nav_link_active:''].join(' ')}>Features</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href='/pricing'>
                            <a className={[styles.nav_link , 'nav-link',router.pathname === '/pricing'?styles.nav_link_active:''].join(' ')}>Pricing</a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="col-xl-1"></div>
                <div className="col-xl-3 col">
                    <div className="row mt-5">
                    </div>
                </div>
            </div>
            
        </header>
    );
}

export default Header;