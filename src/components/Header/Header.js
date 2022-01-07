import "./header.css"
import { SliderData } from "./SliderData";
import React, { useState } from "react"
import { FiArrowLeftCircle, FiArrowRightCircle} from "react-icons/fi"

function Header({slides}) {

    const [current, setCurrent] = useState(0)
    const length = slides.length

    const nextSlide = () => {
        setCurrent(current === length -1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length -1 : current -1)
    }

    if(!Array.isArray(slides) || slides.length <=0) {
        return null;
    } 

    return (
        <div className="header">
        <FiArrowLeftCircle className ="left-arrow" onClick={nextSlide}/>
        <FiArrowRightCircle className ="right-arrow" onClick={prevSlide}/>
            {SliderData.map((slide, index) => {
            return (
                <div className={index === current ? 'slider-active' : 'slider'} key={index}>
                {index === current && (
                <img className="sliderimage" src={slide.image} alt="art image"/>
                )}
                </div>
            )
            })}
        </div>
    )
}

export default Header;