import TimeItem from '../TimeItem/TimeItem';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import styles from "./TimeList.module.css";
import { useSelector } from 'react-redux';

export const TimeList = ({times}) => {

    return (
        <div className="time_list">
            {
                times && times.length === 0?
                <h3>Нет записи</h3>
                :
                <h3>Доступное время</h3>
            }
            <div className='row mt-5'>
                {
                !times?
                // <FontAwesomeIcon  icon = {faCircleNotch} className={`fa-spin ${styles.spinner}`} size='10x'/>
                [1,2,3,4,5].map( () => <div className={styles.time_plug + ' col'}></div>)
                :
                times.length !== 0 ?
                times.map( (time, index) => <TimeItem key={index} time={time}></TimeItem>)
                :null
                }   
            </div>
        </div>
    )
}

export const TimeListPlug = () => {
    return (
        <div className="time_list">
            <h3>Доступное время</h3>
            <div className='row mt-5'>
                {
                    [1,2,3,4,5].map( () => <div className={styles.time_plug + ' col'}></div>)
                }
            </div>
        </div>
    )
    
}