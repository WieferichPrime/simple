import MySlider, { SliderItem } from "../MySlider/MySlider";
import ss from './MyCarousel.module.css';

interface CarouselItemProps {
    children: JSX.Element;
    next?: () => void;
    prev?: () => void;
}

const CarouselItem = ({children}:CarouselItemProps) => {
    return (
        <div>
            {children}
        </div>
    )
}

const MyCarousel = () => {
    return (
        <div className={ss.mycarousel}>
            <MySlider auto={true}>
                <SliderItem>
                    <div className={ss.tablet}>
                        <div className={ss.tablet__screen}><img src="/img/logo_inv.jpeg" alt=""></img></div>
                    </div>
                </SliderItem>
                <SliderItem>
                    <div className={ss.tablet}>
                        <div className={ss.tablet__screen}><img src="/img/logo_inv.jpeg" alt=""></img></div>
                    </div>
                </SliderItem>
                <SliderItem>
                    <div className={ss.tablet}>
                        <div className={ss.tablet__screen}><img src="/img/logo_inv.jpeg" alt=""></img></div>
                    </div>
                </SliderItem>
                <SliderItem>
                    <div className={ss.tablet}>
                        <div className={ss.tablet__screen}><img src="/img/logo_inv.jpeg" alt=""></img></div>
                    </div>
                </SliderItem>
            </MySlider>
        </div>
    )
}

export default MyCarousel;