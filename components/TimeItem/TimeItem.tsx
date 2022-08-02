import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTime } from "../../redux/actions";
import st from './TimeItem.module.css';


interface Time {
    hours: number;
    minutes: number;
}

interface Props {
    time: Time
}

const TimeItem = ({time}:Props) => {
    const dispatch = useDispatch();
    const selectedTime = useSelector((state:any) => state.time);
    const timeEqual = !!(time && selectedTime && (time.hours === selectedTime.hours && time.minutes === selectedTime.minutes));
    const handler = useCallback((timeEqual: boolean) => {
        if (!timeEqual)
            dispatch(changeTime(time));
    }, []);

    let styles = `${st['timelist-item']} col`;
    styles += timeEqual?` ${st['timelist-item-selected']}`:'';
    
    return (
        <div 
        onClick={() => handler(timeEqual)} 
        className={styles}>
            {time.hours}:{time.minutes > 9?time.minutes:'0' + time.minutes}
        </div>
    )
}

export default TimeItem;