import React from "react";
import Slider from "react-slick";
import Card from "../../CardComp/Card";
import Style from "./BrandSlider.module.scss"
import Photo1 from './iphone1.png'
import Photo2 from './iphone2.png'
import Photo3 from './iphone3.png'
import Photo4 from './iphone4.png'





function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style,
                position: "absolute",
                top: "-40px" ,
                right: "2px",
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                background: '#323542',
                color: 'white'}}
            onClick={onClick}
        />
    );
}
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;

    return (
        <div
            className={className}
            style={{ ...style,
                position: "absolute",
                top: "-40px" ,
                left: "950px",
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                background: '#323542',
                color: 'white'}}
            onClick={onClick}
        />
    );
}

export default function MultipleItems({title}) {

    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>,
    }
    return (
        <div style={{display:  "block" , width: `1030px`}}>
            <div>
                <p className={Style.text2}>{title}</p>
            </div>
            <Slider {...settings} >
                <div>
                    <Card imageSrc={Photo1} model={"Iphone 14 Pro Max 128GB Gold (MX34551)"} capacity={"128GB"} price={799} ram={"6GB"} screen={"6.1"}/>
                </div>
                <div>
                    <Card imageSrc={Photo2} model={"Iphone 15 Pro 256GB Rose (VF22431)"} capacity={"256GB"} price={899} ram={"6GB"} screen={"5.1"}/>
                </div>
                <div>
                    <Card imageSrc={Photo3} model={"Iphone 13 64 GB Gray (BG78812)"} capacity={"64GB"} price={699} ram={"4GB"} screen={"5.2"}/>
                </div>
                <div>
                    <Card imageSrc={Photo4} model={"Iphone 15 Pro 256GB Silver (ST62735)"} capacity={"256GB"} price={849} ram={"6GB"} screen={"6.1"}/>
                </div>
            </Slider>

        </div>
    );
}




