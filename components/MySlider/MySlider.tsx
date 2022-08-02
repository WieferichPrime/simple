import React, { useState } from 'react';
import ss from './MySlider.module.css';

interface sliderItemProps {
    children: JSX.Element;
    next?: () => void;
    prev?: () => void;
}

interface sliderProps {
    children: JSX.Element[];
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
                React.cloneElement(children, {
                    next,
                    prev
                })
            }
        </div>
    )
}

const MySlider = ({children}:sliderProps) => {
    const [activeSlide, setActiveSlide] = useState(0);
    return (
        <div className={ss.slider}>
            <div className={ss.slider_inner} style={{transform: `translateX(-${activeSlide*100}%)`}}>
                {
                    children.map(child => React.cloneElement(child, {
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