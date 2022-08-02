import { useState } from "react";
import DateTable from "../DateTable/DateTable";
import MySlider, { SliderItem } from "../MySlider/MySlider";

import styles from './Calendar.module.css';


interface Props {
    monthsCount:number;
}

const Calendar = ({monthsCount}:Props) => {
    const monthsNames = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
    const [activeMonth, setActiveMonth] = useState(0);

    const tables = [];
    for (let i = 0; i < monthsCount; i++) {
        const month = new Date().getMonth() + i;
        tables.push(<SliderItem>
        <DateTable 
        month = {month}
        monthName = {monthsNames[month]}
        ></DateTable></SliderItem>)
    }

    return (
        <div className={`${styles.calendar}`}>
            <MySlider>
                {
                    tables
                }
            </MySlider>
        </div>
    )   
}

export default Calendar;