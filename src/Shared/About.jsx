import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Users, Target, Award } from 'lucide-react';

// gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);

useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(titleRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
    });

    gsap.from(contentRef.current?.children || [], {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      delay: 0.3,
      ease: 'power2.out',
    });

    // ScrollTrigger.refresh();
  }, containerRef);

  return () => ctx.revert();
}, []);


  const stats = [
    { icon: Users, label: 'Customers', value: '5000+' },
    { icon: Heart, label: 'Products', value: '200+' },
    { icon: Target, label: 'Years Active', value: '10+' },
    { icon: Award, label: 'Awards', value: '15+' },
  ];

  return (
    <div ref={containerRef} className="bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div ref={titleRef} className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">
            About Our Medicine Vendor
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Committed to providing quality medicines and healthcare products to communities across Bangladesh
          </p>
        </div>

        <div ref={contentRef} className="grid md:grid-cols-2 gap-12 items-center mt-16">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-700">
                To deliver authentic, high-quality medicines and healthcare products that are accessible, affordable, and reliable to every individual across Bangladesh.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Vision</h3>
              <p className="text-gray-700">
                To become the most trusted medicine vendor in Bangladesh, known for exceptional customer service, authentic products, and commitment to public health.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Values</h3>
              <p className="text-gray-700">
                Integrity, transparency, customer care, and commitment to quality are at the heart of everything we do. We believe in honest business practices and putting our customers first.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-500">
              <h4 className="text-xl font-bold text-gray-900 mb-3">Why Choose Us?</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold mt-1">✓</span>
                  <span>100% authentic medicines from verified manufacturers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold mt-1">✓</span>
                  <span>Licensed pharmacists available for consultation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold mt-1">✓</span>
                  <span>Fast delivery across Chittagong and Bangladesh</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold mt-1">✓</span>
                  <span>Competitive pricing and special discounts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold mt-1">✓</span>
                  <span>24/7 customer support available</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
<section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Removed bg-white bg-opacity-20 from here so it doesn't cover the cards */}
    <div  className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-center text-white border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <Icon className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
            <p className="text-4xl font-bold mb-2">{stat.value}</p>
            <p className="text-lg font-medium opacity-90">{stat.label}</p>
          </div>
        );
      })}
    </div>
  </div>
</section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <img
              src="https://i.pinimg.com/originals/3e/ed/96/3eed96e0b36eb289dbdf6b58589a4849.jpg"
              alt="Medicine store"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="order-1 md:order-2 space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              Founded with a passion for healthcare accessibility, our medicine vendor started as a small pharmacy in Chittagong. Over the years, we've grown to become a trusted name in pharmaceutical distribution, serving thousands of customers across Bangladesh.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We've invested heavily in ensuring that every product in our inventory meets the highest quality standards. Our team of licensed pharmacists works tirelessly to provide expert advice and genuine medicines at affordable prices.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, we're proud to be one of Chittagong's most reliable medicine vendors, committed to making healthcare more accessible and affordable for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Jamil Hossain', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
              { name: 'Healthcare Expert', role: 'Senior Pharmacist', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
              { name: 'Support Team', role: 'Customer Care', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;