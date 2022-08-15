import TimeItem from '../TimeItem/TimeItem';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import styles from "./TimeList.module.css";
import { useSelector } from 'react-redux';
import { isNull } from 'util';

const TimeList = () => {
    const [isLoading, setLoading] = useState(false);
    const [unavailableTimes, setTimes] = useState<string[]>()
    const selectedDate:Date = useSelector((state:any) => state.date);
    useEffect(() => {
        setLoading(true);
        fetch('/api/times', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({date:selectedDate.toISOString().slice(0,10)})
        })
        .then(res => res.json())
        .then((times) => {
            setTimes(times.map(time => time.time))
            setLoading(false)
        })
        .catch(e => console.log(e))
      }, [selectedDate])
    let allTimes = [];
    if (selectedDate.getDate() % 2 === 0) {
        allTimes = (["09:00", "09:30", "10:00", "10:30", "11:00"])
    } else {
        allTimes = (["12:00", "12:30", "13:00", "13:30", "14:00"])
    }
    if (unavailableTimes) {
        allTimes = allTimes.filter(time => unavailableTimes.indexOf(time) === -1)
    } 

    return (
        <div className="time_list">
            {
                allTimes.length === 0 ?
                <h3>Нет записи</h3>
                :
                <h3>Доступное время</h3>
            }
            
            {
            isLoading || isNull(unavailableTimes)?
            <FontAwesomeIcon  icon = {faCircleNotch} className={`fa-spin ${styles.spinner}`} size='10x'/>
            :
            allTimes.length !== 0 ?
            <div className='row mt-5'>
                {
                allTimes.map( (time, index) => <TimeItem key={index} time={time}></TimeItem>)
                }   
            </div>
            :null
            }
        </div>
    )
}

export default TimeList;