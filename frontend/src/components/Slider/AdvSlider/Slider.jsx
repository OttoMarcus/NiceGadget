import React from "react";
import Slider from "react-slick";
import FirstBanner from "../../Banner/FirstBanner/FirstBanner";
import SecondBanner from "../../Banner/SecondBanner/SecondBanner";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style,
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                width: '32px',
                height: '400px',
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
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                width: '32px',
                height: '400px',
                background: '#323542',
                color: 'white'}}
            onClick={onClick}
        />
    );
}

export default function SimpleSlider() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        appendDots: dots => (
            <div
                style={{
                    borderRadius: "10px",
                    padding: "10px",
                    marginBottom: `-10px`
                }}
            >
                <ul style={{ margin: "0px" , display: `flex` , justifyContent: `center` , gap: `20px`, marginTop: `8px`  }}> {dots} </ul>
            </div>
        ),
        customPaging: i => (
            <div
                style={{
                    width: "30px",
                    color: "blue",
                    border: "3px grey solid",
                }}
            >

            </div>
        ),
    };
    return (
        <div style={{display:  "block" , width: `1030px`}}>
        <Slider {...settings} >
            <div>
                <FirstBanner/>
            </div>
            <div>
                <SecondBanner/>
            </div>
            <div>
                <FirstBanner/>
            </div>
        </Slider>

        </div>
    );
}

