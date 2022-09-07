import styles from './admin.module.scss';
import { useState } from 'react';
import SideBar from '/components/SideBar/SideBar';
import ProfileDropDown from '/components/ProfileDropDown';
import cookie from 'cookie'


export default function() {
    return (
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
                <ProfileDropDown></ProfileDropDown>
            </SideBar>
        </main>
    );
}