import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { Flame, Clock } from "lucide-react";

const discountProducts = [
  {
    id: 1,
    name: "Napa extra 500mg",
    image: "https://i.ibb.co/xtCwmTGH/tab.jpg",
    originalPrice: 100,
    discountPrice: 80,
  },
  {
    id: 2,
    name: "max pro 20mg",
    image: "https://i.ibb.co/3y7CbLJn/captul.png",
    originalPrice: 50,
    discountPrice: 35,
  },
  {
    id: 3,
    name: "Injection",
    image: "https://i.ibb.co/rNRBc7V/imge.jpg",
    originalPrice: 40,
    discountPrice: 30,
  },
  {
    id: 4,
    name: "Syrup",
    image: "https://i.ibb.co/67136qx4/syrups-istock.jpg",
    originalPrice: 60,
    discountPrice: 45,
  },
  {
    id: 5,
    name: "Vitamin C Tablets",
    image: "https://i.ibb.co/xtCwmTGH/tab.jpg",
    originalPrice: 35,
    discountPrice: 25,
  },
  {
    id: 6,
    name: "Aspirin 500mg",
    image: "https://i.ibb.co/3y7CbLJn/captul.png",
    originalPrice: 55,
    discountPrice: 40,
  },
  {
    id: 7,
    name: "Cough Syrup",
    image: "https://i.ibb.co/67136qx4/syrups-istock.jpg",
    originalPrice: 70,
    discountPrice: 52,
  },
  {
    id: 8,
    name: "Antibiotic Capsules",
    image: "https://i.ibb.co/3y7CbLJn/captul.png",
    originalPrice: 85,
    discountPrice: 60,
  },
];

const DiscountSlider = () => {
  const calculateDiscount = (original, discount) => {
    return Math.round(((original - discount) / original) * 100);
  };

  return (
    <div className="py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-12">
          <Flame className="w-8 h-8 text-red-500" />
          <h2 className="text-3xl font-bold text-gray-900">Discounted Products</h2>
        </div>

        {/* Desktop Stylish Carousel Slider */}
        <div className="hidden lg:block">
          <Swiper
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            spaceBetween={-80}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            loop={true}
          >
            {discountProducts.map((product) => {
              const discountPercent = calculateDiscount(product.originalPrice, product.discountPrice);
              return (
                <SwiperSlide key={product.id}>
                  <div className="flex justify-center py-4">
                    <div className="desktop-card bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 h-full flex flex-col w-80">
                      {/* Image Container */}
                      <div className="relative overflow-hidden bg-gray-100 h-64">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                        {/* Discount Badge */}
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                          -{discountPercent}%
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          {product.name}
                        </h3>

                        {/* Pricing */}
                        <div className="space-y-2 mb-6">
                          <p className="text-gray-500 text-sm line-through font-medium">
                            ${product.originalPrice}
                          </p>
                          <p className="text-3xl font-bold text-red-600">
                            ${product.discountPrice}
                          </p>
                        </div>

                        {/* Coming Soon Button */}
                        <button disabled className="w-full bg-gray-400 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 cursor-not-allowed transition-all duration-300">
                          <Clock className="w-4 h-4" />
                          Coming Soon
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* Mobile & Tablet View */}
        <div className="lg:hidden">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            freeMode={true}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{ clickable: true }}
            modules={[FreeMode, Pagination]}
          >
            {discountProducts.map((product) => {
              const discountPercent = calculateDiscount(product.originalPrice, product.discountPrice);
              return (
                <SwiperSlide key={product.id}>
                  <div className="group h-full bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-red-300">
                    {/* Image Container */}
                    <div className="relative overflow-hidden bg-gray-100 h-48">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {/* Discount Badge */}
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        -{discountPercent}%
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
                        {product.name}
                      </h3>

                      {/* Pricing */}
                      <div className="space-y-2 mb-4">
                        <p className="text-gray-500 text-sm line-through font-medium">
                          ${product.originalPrice}
                        </p>
                        <p className="text-2xl font-bold text-red-600">
                          ${product.discountPrice}
                        </p>
                      </div>

                      {/* Coming Soon Button */}
                      <button disabled className="w-full bg-gray-400 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 cursor-not-allowed transition-all duration-300">
                        <Clock className="w-4 h-4" />
                        Coming Soon
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      {/* Custom Pagination & Styling */}
      <style jsx>{`
        :global(.swiper-pagination-bullet) {
          background-color: #dc2626;
          opacity: 0.5;
        }
        :global(.swiper-pagination-bullet-active) {
          background-color: #dc2626;
          opacity: 1;
        }
        :global(.swiper-slide) {
          opacity: 0.6;
          transform: scale(0.85);
          z-index: 1;
        }
        :global(.swiper-slide-active) {
          opacity: 1;
          transform: scale(1);
          z-index: 10;
        }
        .desktop-card {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default DiscountSlider;