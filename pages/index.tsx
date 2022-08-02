import { useSelector } from 'react-redux';
import SideBar from "../components/SideBar/SideBar";
import Calendar from "../components/Calendar/Calendar";
import MyCarousel from "../components/Carousel/MyCarousel";
import TimeList from '../components/TimeList/TimeList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useState } from 'react';
import { faCircleNotch, faArrowRightLong, faArrowDownLong } from '@fortawesome/free-solid-svg-icons';
import Form from '../components/Form/Form';
import Layout from '../components/layout';
import styles from './Main.module.css';

const Main = () => {
    const selectedTime = useSelector((state:any) => state.time);
    const selectedDate = useSelector((state:any) => state.date);
    const [showTime, setShowTime] = useState<boolean>(false);
    useEffect(() => {
        let timer = setTimeout(() => {
            if (!selectedDate) return;
            setShowTime(true);
        }, 2000);
        return () => {
            clearTimeout(timer);
            setShowTime(false);
        };
    }, [selectedDate]);
    //const months = data.;months.map( (month:Month) => <div className="col-6 mb-5"><DateTable key={month.name} dates={month.dates} monthName = {month.name}></DateTable></div>)
    return (
        <Layout>
            <SideBar></SideBar>
            <div className="main">
                <MyCarousel></MyCarousel>
                <div className="row mt-5">
                <div className="col col-xl-6">
                        {selectedDate?
                            (showTime?
                            <TimeList day={selectedDate.getDate()}></TimeList>
                            :<FontAwesomeIcon  icon = {faCircleNotch} className={`fa-spin ${styles.spinner}`} size='10x'/>)
                        :
                        <div className='col col-xl-3'>
                            <h3>Выберите дату</h3>
                            {
                            <FontAwesomeIcon icon={faArrowRightLong} size='5x' className={`${styles.arrow}`}></FontAwesomeIcon>
                            }
                        </div>
                        }
                        {selectedDate && selectedTime && showTime ? 
                        <div className='row'>
                            <div className='col-xl-2'></div>
                            <div className='mt-4 col col-xl-8'>
                                <Form
                                    date = {selectedDate} 
                                    time = {selectedTime}
                                />
                            </div>
                            <div className='col-xl-2'></div>
                            <div className='col-xl'></div>
                        </div>
                        :null
                        }
                    </div>
                    <div className="col col-xl-6 mt-5">
                        <Calendar monthsCount={4}></Calendar>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Main;