import React from 'react';
import Slider from './Banner/Slider';
import Category from './category/Category';
import HealthTips from './healthTips/HealthTips';
import LiveChatSupport from './liveChatSupport/LiveChatSupport';
import Faq from './faq/Faq';
import DiscountSlider from './discountSlider/DiscountSlider';
import ServiceHighlights from './Service/ServiceHilaghts';
import HomepageSearchSection from './HomePageSearch/HomePageSearch';

const Home = () => {
    return (
        <div>
              <Slider></Slider>
              <Category></Category>
              <ServiceHighlights></ServiceHighlights>
              <HomepageSearchSection></HomepageSearchSection>
              <HealthTips></HealthTips>

              <Faq></Faq>
              <DiscountSlider></DiscountSlider>
              <LiveChatSupport></LiveChatSupport>
        </div>
    );
};

export default Home;