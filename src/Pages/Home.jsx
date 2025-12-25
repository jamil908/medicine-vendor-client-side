import React, { Suspense, lazy } from "react";
import Slider from "./Banner/Slider";

const Category = lazy(() => import("./category/Category"));
const ServiceHighlights = lazy(() => import("./Service/ServiceHilaghts"));
const HomepageSearchSection = lazy(() => import("./HomePageSearch/HomePageSearch"));
const HealthTips = lazy(() => import("./healthTips/HealthTips"));
const Faq = lazy(() => import("./faq/Faq"));
const DiscountSlider = lazy(() => import("./discountSlider/DiscountSlider"));
const LiveChatSupport = lazy(() => import("./liveChatSupport/LiveChatSupport"));

const Home = () => {
  return (
    <div class="pb-5 bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      <Slider />
      <Suspense fallback={<div>Loading...</div>}>
        <Category />
        <ServiceHighlights />
        <HomepageSearchSection />
        <HealthTips  />
        <Faq />
        <DiscountSlider />
        <LiveChatSupport />
      </Suspense>
    </div>
  );
};

export default Home;
