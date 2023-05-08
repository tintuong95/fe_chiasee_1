import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Mousewheel, Navigation } from "swiper";

import PropTypes from 'prop-types';
import SwiperGL from "./swiper-gl.esm.js";
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/autoplay";
import "swiper/css/mousewheel";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiper-gl.css";
import "./swiper.css";


import { REACT_APP_URL_CLOUD_S3 } from "../../constants/enviroment.js";
import { useEffect } from "react";

export default function SwiperComponent({ photoLists,data }) {
  const swiperParameters = {
    modules: [A11y, Autoplay, Mousewheel, Navigation, SwiperGL],
    autoplay: { enabled: data.autoPlay },
    grabCursor: true,
    speed: data.speed,
    mousewheel: { enabled: true },
    effect: "gl",
    loop: true,
    pagination: { clickable: true, hideOnClick: true },
    watchSlidesProgress: true,
    navigation: false,
    onBeforeInit(swiper) {
      swiper.params.gl = { shader: data.effect };
    },
  };
  console.log(data)

  // useEffect(()=>{
  //   fetch(`${REACT_APP_URL_CLOUD_S3}${photoLists[0]?.photos?.path}`).then(result=>{
  //     console.log(result.json())
  //   })
  // }, [])

  return (
    <>
      {photoLists.length>0  && <Swiper {...swiperParameters}>
        {photoLists?.map((item, index) => {
          return <SwiperSlide key={index}>
            <img
            onLoad={()=>{console.log("hihi")}}
              className="swiper-slide-image swiper-gl-image"
              src={`${REACT_APP_URL_CLOUD_S3}${item?.photos?.path}`}
            />

            <div className="swiper-slide-content">
              <div className="swiper-slide-title text-xl ">{item?.photos?.name}</div>
            </div>
          </SwiperSlide>
        })}



      </Swiper>}
    </>
  );
}

SwiperComponent.propTypes = {
  photoLists: PropTypes.array,
  data: PropTypes.object,
};