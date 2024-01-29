import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import slider1 from '../../Images/phone-with-black-friday-inscription-table.jpg';
import slider2 from '../../Images/pexels-pixabay-259200.jpg';
import slider3 from '../../Images/laptop-near-tags-shopping-trolley-packets.jpg';
import slider4 from '../../Images/online-shopping-shipping-internet-commerce-concept.jpg';
import slider5 from '../../Images/pexels-andrea-piacquadio-3769747.jpg';
import slider6 from '../../Images/pexels-monstera-5849559.jpg';

const CustomSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="custom-slider-wrapper">
     
      <Slider {...settings}>
        <div className="slide">
          <img src={slider1} alt="Slide 1" /> {/* Example image */}
        </div>
        <div className="slide">
          <img src={slider2} alt="Slide 2" /> {/* Example image */}
        </div>
        <div className="slide">
          <img src={slider3} alt="Slide 3" /> {/* Example image */}
        </div>
        <div className="slide">
          <img src={slider4} alt="Slide 3" /> {/* Example image */}
        </div>
        <div className="slide">
          <img src={slider5} alt="Slide 3" /> {/* Example image */}
        </div>
        <div className="slide">
          <img src={slider6} alt="Slide 3" /> {/* Example image */}
        </div>
        
      </Slider>
    </div>
  );
};

export default CustomSlider;