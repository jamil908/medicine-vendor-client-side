import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";

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
];

const DiscountSlider = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🔥 Discounted Products</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        freeMode={true}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
        id="discount"
      >
        {discountProducts.map((product) => (
          <SwiperSlide key={product.id} className="p-4 discount-image bg-white shadow-lg rounded-xl">
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-lg" />
            <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-500 line-through">${product.originalPrice}</p>
            <p className="text-red-500 text-xl font-bold">${product.discountPrice}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DiscountSlider;
