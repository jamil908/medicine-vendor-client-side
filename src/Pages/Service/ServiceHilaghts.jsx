import React from 'react';
import { 
  FileText, 
  Truck, 
  Bell, 
  MessageCircle, 
  Shield, 
  Clock, 
  Pill, 
  Phone 
} from 'lucide-react';

const ServiceHighlights = () => {
  const services = [
    {
      icon: FileText,
      title: "Prescription Services",
      description: "Upload your prescription securely and get medicines delivered to your doorstep",
      features: ["Digital prescription upload", "Pharmacist verification", "Insurance claim support"],
      color: "blue",
      bgGradient: "from-blue-50 to-blue-100",
      iconBg: "from-blue-500 to-blue-600",
      hoverBg: "hover:from-blue-100 hover:to-blue-150"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Multiple delivery options to get your medicines when you need them most",
      features: ["Same-day delivery", "Express shipping", "Free delivery over $50"],
      color: "green",
      bgGradient: "from-green-50 to-emerald-100",
      iconBg: "from-green-500 to-emerald-600",
      hoverBg: "hover:from-green-100 hover:to-emerald-150"
    },
    {
      icon: Bell,
      title: "Medicine Reminders",
      description: "Never miss a dose with our smart reminder system and refill notifications",
      features: ["Automatic refill alerts", "Dosage reminders", "Mobile app notifications"],
      color: "indigo",
      bgGradient: "from-indigo-50 to-purple-100",
      iconBg: "from-indigo-500 to-purple-600",
      hoverBg: "hover:from-indigo-100 hover:to-purple-150"
    },
    {
      icon: MessageCircle,
      title: "24/7 Consultation",
      description: "Chat with licensed pharmacists anytime for medicine guidance and health advice",
      features: ["Licensed pharmacist chat", "Drug interaction checks", "Health guidance"],
      color: "teal",
      bgGradient: "from-teal-50 to-cyan-100",
      iconBg: "from-teal-500 to-cyan-600",
      hoverBg: "hover:from-teal-100 hover:to-cyan-150"
    }
  ];

  const additionalServices = [
    {
      icon: Shield,
      title: "Quality Assured",
      description: "All medicines sourced from certified manufacturers with quality guarantees"
    },
    {
      icon: Clock,
      title: "Quick Reorders",
      description: "Reorder your regular medicines with just one click from your order history"
    },
    {
      icon: Pill,
      title: "Generic Options",
      description: "Save money with high-quality generic alternatives for branded medicines"
    },
    {
      icon: Phone,
      title: "Emergency Support",
      description: "24/7 emergency helpline for urgent medicine needs and health concerns"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Our Healthcare Services
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive medicine delivery and healthcare services designed for your convenience and well-being
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index}
                className={`group relative bg-gradient-to-br ${service.bgGradient} ${service.hoverBg} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50`}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.iconBg} rounded-xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-slate-900">
                  {service.title}
                </h3>
                
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-slate-700">
                      <div className={`w-2 h-2 bg-gradient-to-r ${service.iconBg} rounded-full mr-3 flex-shrink-0`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200/50 transition-colors duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Additional Services Bar */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-8">
          <h3 className="text-2xl font-bold text-slate-800 text-center mb-8">
            Additional Services
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={index} 
                  className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 transition-all duration-300 group"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-slate-100 to-slate-200 group-hover:from-blue-100 group-hover:to-green-100 rounded-lg flex items-center justify-center transition-all duration-300">
                      <IconComponent className="w-6 h-6 text-slate-600 group-hover:text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1 group-hover:text-blue-800">
                      {service.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">
            Need Help Choosing the Right Medicine?
          </h3>
          <p className="text-xl mb-8 text-blue-100">
            Our licensed pharmacists are here to help you 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Chat with Pharmacist
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300">
              Call Now: 1-800-MEDICINE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;