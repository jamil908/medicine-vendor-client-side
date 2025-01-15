import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import img1 from '../../assets/banner-imge-1.avif'
import img2 from '../../assets/banner-img-2.avif'
import img3 from '../../assets/banner-img-3.jpg'
import { Carousel } from 'react-responsive-carousel';
const Slider = () => {
    return (
        <Carousel className=''>
                <div>
                    <img src={img1} />
                    <p className="legend">Legend 1</p>
                </div>
               
                <div>
                    <img src={img2} />
                    <p className="legend">Legend 1</p>
                </div>
               
                <div>
                    <img src={img3} />
                    <p className="legend">Legend 1</p>
                </div>
               
            </Carousel>
    );
};

export default Slider;