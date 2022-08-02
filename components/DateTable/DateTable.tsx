import { faLessThan, faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import DateItem from '../DateItem/DateItem';
import styles from './DateTable.module.css';

interface Prop {
    month: number;
    monthName: string;
    next?: () => void;
    prev?: () => void;
}

const DateTable = ({month, monthName, next, prev}:Prop) => {
    
    const dateList = [];
    let allCells = [];
    let date = new Date();
    const today = new Date();
    date.setMonth(month);
    date.setDate(1);
    const extraCells:JSX.Element[] = [];

    for (let i = 0; i < (date.getDay() + 6) % 7; i++) {
        allCells.push({date: null, active: false});
    }

    while (date.getMonth() === month) {
        if ((date < today) && (today.toDateString() !== date.toDateString())) {
            allCells.push({date: new Date(date), active: false});
        }  else {
            allCells.push({date: new Date(date), active: true});
        }
        date.setDate(date.getDate() + 1);
    }

    for (let i = 0; i < allCells.length; i += 7) {
        dateList.push(allCells.slice(i, i + 7));
    }

    for (let i = 0; i < 7 - allCells.length % 7; i++) {
        extraCells.push(<td className='cell'></td>);
    }

    const labels = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
    return (
        <div className={styles.date_table}>
            <div className='row'>
                <div className='col-2 col-xl-1 d-flex align-items-center'><FontAwesomeIcon 
                icon = {faLessThan} 
                className={styles.arrow} 
                onClick={prev}
                /></div>
                <div className='col-8 col-xl d-flex justify-content-center align-items-center'><span className={styles.table_label}>{monthName + ' ' + date.getFullYear()}</span></div>
                <div className='col-2 col-xl-1 d-flex align-items-center'><FontAwesomeIcon 
                icon = {faGreaterThan} 
                className={styles.arrow} 
                onClick={next}
                /></div>
            </div>
            <table className={`${styles.table}`}>
                <thead>
                    <tr>{labels.map(label => <th scope="col">{label}</th>)}</tr>
                </thead>
                <tbody className={styles.body}>
                    {
                        dateList.map( week => <tr>{
                                    week.map( cell => <td className={`${styles.cell}`}><DateItem 
                                        date={cell.date} 
                                        active={cell.active}
                                        ></DateItem></td>)
                                    }
                                    {(week.length % 7)?extraCells:null}</tr>
                        )
                    }
                </tbody>
            </table>
        </div>
        
    )
};

export default DateTable;
