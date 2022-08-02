import TimeItem from '../TimeItem/TimeItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    day: number;
}

interface Time {
    hours: number;
    minutes: number;
}

const TimeList = ({day}:Props) => {
    let times:Time[] = []; 
    if (day % 2 === 0) {
        times = ([{hours:9, minutes:0},{hours:9, minutes:30},{hours:10, minutes:0},{hours:11, minutes:0}])
    } else {
        times = ([{hours:12, minutes:0},{hours:13, minutes:0},{hours:14, minutes:0},{hours:15, minutes:0}])
    }
    return (
        <>
            <h3>Доступное время</h3>
            <div className='row mt-5'>
             {
                times.map( (time, index) => <TimeItem key={index} time={time}></TimeItem>)
             }   
            </div>
        </>
    )
}

export default TimeList;