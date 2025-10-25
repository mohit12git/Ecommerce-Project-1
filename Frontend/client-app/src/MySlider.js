import React from "react";
import images from "./data/Images";
import CustomSlider from "./CustomerCarousel";

//import "./style.css";

export default function MySlider(){
    return (
        <div>
            <CustomSlider >
                {images.map((image,index)=>{
                    return <img key={index} src={image.imgURL} alt={image.imgAlt} />;
                })}
            </CustomSlider>
        </div>
    );
}