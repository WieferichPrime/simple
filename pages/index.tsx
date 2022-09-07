import { useDispatch, useSelector } from 'react-redux';
import Calendar from "../components/Calendar/Calendar";
import MyCarousel from "../components/Carousel/MyCarousel";
import {TimeList, TimeListPlug} from '../components/TimeList/TimeList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useState } from 'react';
import { faCircleNotch, faArrowRightLong, faArrowDownLong } from '@fortawesome/free-solid-svg-icons';
import Form from '../components/Form/Form';
import Layout from '../components/layout';
import styles from './Main.module.scss';
import { Button, Modal } from 'react-bootstrap';
import { changeDate, changeTime, changeUser } from '../redux/actions';

const Main = () => {
    const selectedTime = useSelector((state:any) => state.time);
    const [user, setUser] = useState(useSelector((state:any) => state.user));

    const selectedDate:string = useSelector((state:any) => state.date);
    const [availableTimes, setTimes] = useState<string[]>();
    const [successSubmit, setSuccess] = useState<boolean>();
    const [timesLoading, setTimesLoading] = useState<boolean>(false);
    const times = [
        ["09:00", "09:30", "10:00", "10:30", "11:00"],
        ["12:00", "12:30", "13:00", "13:30", "14:00"]
    ]

    const dispatch = useDispatch();
    const dropDateTime = useCallback(() => {
		dispatch(changeDate(null));
        dispatch(changeTime(null));
    }, []);

    useEffect(() => {
        if (selectedDate) {
            setTimesLoading(true);
            fetch('/api/times', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({date:selectedDate})
            })
            .then(res => res.json())
            .then((res) => {
                const unavailableTimes = res.map(time => time.time);
                if (Number(selectedDate.split('-')[2]) % 2 === 0) {
                    setTimes(times[1].filter(time => unavailableTimes.indexOf(time) === -1))
                } else {
                    setTimes(times[0].filter(time => unavailableTimes.indexOf(time) === -1))
                }
                setTimesLoading(false);
            })
            .catch(e => {
                console.log(e);
                setTimesLoading(false);
            })
        }
    }, [selectedDate]);
    
    return (
        <Layout>
            <div className="main">
                <Modal 
                show = {successSubmit}
                backdrop="static"
                keyboard={false}
                onHide={() => setSuccess(false)}
                >
                <Modal.Header>
                    <Modal.Title>Запись прошла успешно</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Ожидайте звонок с подтверждением записи</Modal.Body>
                    <Modal.Footer>
                    <Button onClick={() => setSuccess(false)} className={styles.modal__btn}>
                        ОК
                    </Button>
                    </Modal.Footer>
                </Modal>
                <MyCarousel></MyCarousel>
                <div className="row mt-5">
                <div className="col col-xl-6">
                        {selectedDate?
                            availableTimes?
                            <TimeList times={availableTimes}></TimeList>
                            :
                            <TimeListPlug></TimeListPlug>
                        :
                        <div className='col col-xl-3'>
                            <h3>Выберите дату</h3>
                            {
                            <FontAwesomeIcon icon={faArrowRightLong} size='5x' className={`${styles.arrow}`}></FontAwesomeIcon>
                            }
                        </div>
                        }
                        {selectedDate && selectedTime ? 
                        <div className='row'>
                            <div className='col-xl-2'></div>
                            <div className='mt-4 col col-xl-8'>
                                <Form
                                    date = {selectedDate} 
                                    time = {selectedTime}
                                    successHandler = {(value) => {
                                        setSuccess(value);
                                        dropDateTime();
                                    }}
                                />
                            </div>
                            <div className='col-xl-2'></div>
                            <div className='col-xl'></div>
                        </div>
                        :null
                        }
                    </div>
                    <div className="col col-xl-6 mt-5">
                        <div className={timesLoading?styles.overlay:''}>
                            <Calendar monthsCount={4}></Calendar>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Main;