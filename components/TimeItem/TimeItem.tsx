import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTime } from "../../redux/actions";
import st from './TimeItem.module.css';

interface Props {
    time: string
}

const TimeItem = ({time}:Props) => {
    const dispatch = useDispatch();
    const selectedTime = useSelector((state:any) => state.time);
    const timeEqual = !!(time && selectedTime && (time === selectedTime));
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
            {time}
        </div>
    )
}

export default TimeItem;