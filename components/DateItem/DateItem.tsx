import st from './DateItem.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeDate, changeTime } from '../../redux/actions';
import { useCallback } from 'react';

interface Props {
    active: boolean;
    date: Date|null;
}

const DateItem = ({active, date}:Props) => {
    const dispatch = useDispatch();
	const selectedDate = useSelector((state:any) => state.date);
	const datesEqual = !!(date && selectedDate && (date.toDateString() === selectedDate.toDateString()));
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
			onClick={() => {
				if (active) {
				handler(datesEqual);
			}}}>
				<span className={`${st.item_text}`}>{date?date.getDate() : ''}</span>
			</div>
        </div>
    )
};
  
export default DateItem;