import st from './DateItem.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeDate, changeTime } from '../../redux/actions';
import { useCallback } from 'react';

interface Props {
    active: boolean;
    date: string|null;
	day: number|null;
}

const DateItem = ({active, date, day}:Props) => {
    const dispatch = useDispatch();
	const selectedDate = useSelector((state:any) => state.date);
	const datesEqual = !!(date && selectedDate && (date === selectedDate));
    const handler = useCallback((datesEqual: boolean) => {
		if (!datesEqual) {
			dispatch(changeDate(date));
			dispatch(changeTime(null));
		}
    }, []);

	let styles = [
		date?st.item:'',
		active?"": st.item_prev,
		datesEqual?st.item_selected:""
	];
    return (
        <div className={`${st.circle_border}`}>
        	<div 
			className={styles.join(' ')} 
			onClick={(e) => {
				e.stopPropagation();
				if (active) {
				handler(datesEqual);
			}}}>
				<span className={`${st.item_text}`}>{day?day : ''}</span>
			</div>
        </div>
    )
};
  
export default DateItem;