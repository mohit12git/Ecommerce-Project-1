import React, { useState, useEffect } from "react";
import "./custom.slider.css";

function CustomCarousel({ children }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [slidedone, setSlideDone] = useState(true);
    const [timeid, setTimeID] = useState(null);

    useEffect(() => {
        if (slidedone) {
            setSlideDone(false);
            setTimeID(
                setTimeout(() => {
                    slideNext();
                    setSlideDone(true);
                }, 5000)
            );
        }
    }, [slidedone]);

    const slideNext = () => {
        setActiveIndex((val) => {
            if (val >= children.length - 1) {
                return 0;
            } else {
                return val + 1;
            }
        });
    };

    const slidePrev = () => {
        setActiveIndex((val) => {
            if (val <= 0) {
                return children.length - 1;
            } else {
                return val - 1;
            }
        });
    };

    const AutoPlayStop = () => {
        if (timeid > 0) {
            clearTimeout(timeid);
            setSlideDone(false);
        }
    };

    const AutoPlayStart = () => {
        if (!slidedone) {
            setSlideDone(true);
        }
    };

    return (
        <div className="container_slider"onMouseEnter={AutoPlayStop} onMouseLeave={AutoPlayStart}>
            {

                children.map((item, index) => {
                    return (
                        <div
                            className={"slider_item slider_item-active-"+(activeIndex + 1)}  key={index}>
                            {item}
                        </div>
                    );
                })}

            <div className="container_slider_links">
                {children.map((item, index) => {
                    return (
                        <button key={index} className={activeIndex === index
                                    ? "container_slider_links-small container_slider_links-small-active"
                                     : "container_slider_links-small"
                            }
                            onClick={(e) => {
                                e.preventDefault();
                                setActiveIndex(index);
                            }}></button>
                    );
                })
                }</div>
                <button className="slider_btn-next"onClick={(e) => {
                    e.preventDefault();
                    slideNext();
                }}>
                    {">"}
                </button>
                 <button className="slider_btn-prev"onClick={(e) => {
                    e.preventDefault();
                    slidePrev();
                }}>
                    {"<"}
                    </button>

            </div>
    );

} export default CustomCarousel;