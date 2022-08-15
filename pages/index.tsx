import { useSelector } from 'react-redux';
import Calendar from "../components/Calendar/Calendar";
import MyCarousel from "../components/Carousel/MyCarousel";
import TimeList from '../components/TimeList/TimeList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useState } from 'react';
import { faCircleNotch, faArrowRightLong, faArrowDownLong } from '@fortawesome/free-solid-svg-icons';
import Form from '../components/Form/Form';
import Layout from '../components/layout';
import styles from './Main.module.css';

export async function getServerSideProps(context) {
    const data = fetch('/api/times', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({date:date.toISOString().slice(0,10)})
    })
    .then(res => res.json())
    .catch(e => console.log(e))
  
    return {
      props: { data }, // добавить привязку доступного времени к датам
    }
  }

const Main = () => {
    const selectedTime = useSelector((state:any) => state.time);
    const selectedDate:Date = useSelector((state:any) => state.date);

    return (
        <Layout>
            <div className="main">
                <MyCarousel></MyCarousel>
                <div className="row mt-5">
                <div className="col col-xl-6">
                        {selectedDate?
                            <TimeList></TimeList>
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