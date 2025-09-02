
import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Slider = () => {
    // Sample images - replace with your actual imports
    const img1 = "/src/assets/banner-img-2.avif";
    const img2 = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80";
    const img3 = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80";

    const slides = [
        {
            img: img1,
            title: "Your Trusted Pharmacy",
            subtitle: "Quality Medicines & Healthcare Products",
            cta: "Shop Now"
        },
        {
            img: img2,
            title: "Prescription Services",
            subtitle: "Safe, Fast & Reliable Delivery",
            cta: "Order Prescription"
        },
        {
            img: img3,
            title: "Health & Wellness",
            subtitle: "Supplements & Personal Care Products",
            cta: "Explore Products"
        }
    ];

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-slate-50 to-green-50">
            {/* Clean Medical Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-green-600/10 z-10"></div>
            
            <Carousel
                className="enhanced-carousel"
                showThumbs={false}
                showStatus={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={4000}
                transitionTime={800}
                showArrows={true}
                showIndicators={true}
                swipeable={true}
                emulateTouch={true}
                renderArrowPrev={(onClickHandler, hasPrev) =>
                    hasPrev && (
                        <button
                            type="button"
                            onClick={onClickHandler}
                            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-full shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center group"
                        >
                            <svg className="w-6 h-6 text-white group-hover:text-blue-100 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                            </svg>
                        </button>
                    )
                }
                renderArrowNext={(onClickHandler, hasNext) =>
                    hasNext && (
                        <button
                            type="button"
                            onClick={onClickHandler}
                            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-full shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center group"
                        >
                            <svg className="w-6 h-6 text-white group-hover:text-blue-100 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>
                    )
                }
                renderIndicator={(onClickHandler, isSelected, index) => {
                    return (
                        <li
                            onClick={onClickHandler}
                            className={`inline-block mx-2 cursor-pointer transition-all duration-300 ${
                                isSelected 
                                    ? 'w-10 h-4 bg-gradient-to-r from-blue-600 via-green-600 to-blue-700 rounded-full shadow-md shadow-blue-500/40' 
                                    : 'w-4 h-4 bg-white/80 border-2 border-blue-300 rounded-full hover:bg-blue-100 hover:border-blue-500'
                            }`}
                            key={index}
                        />
                    );
                }}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="relative h-[70vh] min-h-[300px] max-h-[500px]">
                        {/* Image with Medical Overlay */}
                        <div className="relative h-full overflow-hidden">
                            <img 
                                src={slide.img} 
                                alt={slide.title}
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[3000ms]"
                            />
                            {/* Professional Medical Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-blue-900/20 to-slate-800/10"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-slate-600/10 to-green-600/15"></div>
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="text-center text-white px-6 max-w-4xl">
                                {/* Professional Title */}
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                                    <span className="bg-gradient-to-r from-blue-200 via-slate-100 to-green-200 bg-clip-text text-transparent drop-shadow-lg">
                                        {slide.title}
                                    </span>
                                </h1>
                                
                                {/* Subtitle */}
                                <p className="text-lg md:text-xl lg:text-2xl mb-8 text-blue-50 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                                    {slide.subtitle}
                                </p>
                                
                                {/* Professional CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                    <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 hover:from-blue-700 hover:via-blue-800 hover:to-green-700 text-white font-semibold rounded-lg shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 border border-blue-400/30">
                                        <span className="relative z-10 flex items-center text-lg">
                                            {slide.cta}
                                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                            </svg>
                                        </span>
                                        {/* Subtle Professional Shine Effect */}
                                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                    </button>
                                    
                                    <button className="px-6 py-3 border-2 border-blue-200 text-blue-50 font-medium rounded-lg backdrop-blur-sm hover:bg-blue-600/20 hover:border-blue-100 transition-all duration-300 shadow-md hover:shadow-blue-500/20">
                                        Learn More
                                    </button>
                                </div>
                                
                                {/* Medical Cross Decorative Element */}
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                                    <div className="relative">
                                        <div className="w-1 h-8 bg-gradient-to-b from-transparent via-blue-300 to-green-400 rounded-full"></div>
                                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-gradient-to-r from-blue-300 to-green-400 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Subtle Medical-themed Floating Elements */}
                        <div className="absolute top-24 left-12 w-2 h-2 bg-blue-300 rounded-full opacity-70 animate-pulse"></div>
                        <div className="absolute top-40 right-20 w-1 h-1 bg-green-400 rounded-full opacity-80 animate-ping"></div>
                        <div className="absolute bottom-32 left-16 w-3 h-3 border border-blue-300 rounded-full opacity-60 animate-bounce"></div>
                        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-slate-300 rounded-full opacity-50 animate-pulse"></div>
                        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 border border-green-400 rounded-full opacity-40 animate-ping"></div>
                    </div>
                ))}
            </Carousel>

            {/* Custom Styles */}
            <style jsx>{`
                .enhanced-carousel .carousel .slider-wrapper {
                    border-radius: 0;
                }
                
                .enhanced-carousel .carousel .slider {
                    border-radius: 0;
                }
                
                .enhanced-carousel .carousel .control-dots {
                    bottom: 25px;
                    margin: 0;
                    padding: 0;
                }
                
                .enhanced-carousel .carousel .control-dots .dot {
                    display: none;
                }
                
                @keyframes slideInFromLeft {
                    0% {
                        transform: translateX(-100%);
                        opacity: 0;
                    }
                    100% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideInFromRight {
                    0% {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    100% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes fadeInUp {
                    0% {
                        transform: translateY(30px);
                        opacity: 0;
                    }
                    100% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
};

export default Slider;