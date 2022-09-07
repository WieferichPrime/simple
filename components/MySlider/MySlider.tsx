import { useCallback, useEffect, useState, cloneElement } from 'react';
import ss from './MySlider.module.css';

interface sliderItemProps {
    children: JSX.Element;
    next?: () => void;
    prev?: () => void;
}

interface sliderProps {
    children: JSX.Element[];
    auto?: boolean;
}

interface sliderRadioProps {
    active: boolean;
    set: () => void;
}

export const CarouselRadio = ({set, active}:sliderRadioProps) => {
    return (
        <div onClick={() => {
            if (active) return;
            set();
        }} className={[ss.slider_radio, active?ss.slider_radio_active:''].join(' ')}>
        </div>
    )
}

export const SliderItem = ({children, next, prev}:sliderItemProps) => {
    return (
        <div className={ss.slider_item}>
            {
                cloneElement(children, {
                    next,
                    prev
                })
            }
        </div>
    )
}

const MySlider = ({children, auto}:sliderProps) => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [touchPosition, setTouchPosition] = useState(null)

    if (auto) {
        useEffect(() => {
            const timer = setTimeout(() => setActiveSlide((activeSlide + 1) % children.length ), 5000);
            return () => clearTimeout(timer);
        }, [activeSlide])
    }

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX
        setTouchPosition(touchDown)
    }

    const handleTouchMove = (e) => {
        const touchDown = touchPosition

        if(touchDown === null) {
            return
        }

        const currentTouch = e.touches[0].clientX
        const diff = touchDown - currentTouch

        if (diff > 7) {
            setActiveSlide((activeSlide + children.length + 1) % children.length)
        }

        if (diff < -7) {
            setActiveSlide((activeSlide + children.length - 1) % children.length)
        }

        setTouchPosition(null)
    }   

    return (
        <div className={ss.slider}>
            <div 
            className={ss.slider_inner} 
            style={{transform: `translateX(-${activeSlide*100}%)`, transition: 'all 0.6s'}}
            onTouchStart = {handleTouchStart}
            onTouchMove = {handleTouchMove}
            >
                {
                    children.map(child => cloneElement(child, {
                            next: () => setActiveSlide((activeSlide + children.length + 1) % children.length),
                            prev: () => setActiveSlide((activeSlide + children.length - 1) % children.length),
                            set: (index:number) => setActiveSlide(index)
                        }
                    ))
                }
                
            </div>
            <div className={ss.slider_radio_list}>
                {
                    children.map((child, index) => <CarouselRadio key = {index} active={index === activeSlide} set={() => setActiveSlide(index)}></CarouselRadio>)
                }
            </div>
        </div>
        
    )   
}

export default MySlider;