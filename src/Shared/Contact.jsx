import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactUs = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const cardsRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });

      // Form animation
      gsap.from(formRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.8,
        delay: 0.3,
        ease: 'power2.out',
      });

      // Contact cards animation
     
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }

    // Send email via mailto
    const mailtoLink = `mailto:jamilhossainrafi@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
    )}`;
    
    window.location.href = mailtoLink;
    
    // Show success message
    setSubmitted(true);
    gsap.to(formRef.current, { opacity: 0.5, duration: 0.3 });
    
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
      gsap.to(formRef.current, { opacity: 1, duration: 0.3 });
    }, 2000);
  };

  return (
    <div ref={containerRef} className="bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      {/* Hero Section */}
      <section className="py-20   px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div ref={formRef} className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div ref={formRef}  className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Email Card */}
          <div className="bg-white hover:shadow-lg transition-all duration-300">
            <Mail className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
            <a
              href="mailto:jamilhossainrafi@gmail.com"
              className="text-blue-600 hover:text-blue-700 font-semibold break-all"
            >
              jamilhossainrafi@gmail.com
            </a>
            <p className="text-gray-700 mt-2 text-sm">We'll reply within 24 hours</p>
          </div>

          {/* Phone Card */}
          <div ref={titleRef} className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-8 border border-green-200 hover:shadow-lg transition-all duration-300">
            <Phone className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
            <a
              href="tel:+8801781142856"
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              +880 1781142856
            </a>
            <p className="text-gray-700 mt-2 text-sm">Available 24/7 for urgent queries</p>
          </div>

          {/* Location Card */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-8 border border-red-200 hover:shadow-lg transition-all duration-300">
            <MapPin className="w-12 h-12 text-red-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Location</h3>
            <p className="text-gray-700 font-semibold">Chittagong, Bangladesh</p>
            <p className="text-gray-700 mt-2 text-sm">Visit us at our store for consultation</p>
          </div>
        </div>

        {/* Contact Form and Map */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div ref={formRef} className="bg-gray-50 rounded-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="+880 1781142856"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="Medicine inquiry"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none"
                  placeholder="Tell us about your inquiry..."
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>

              {submitted && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-center font-semibold">
                  ✓ Thank you for your message! We'll be in touch soon.
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div ref={titleRef} className="space-y-8">
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Business Hours</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-semibold">8:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-semibold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-semibold">10:00 AM - 4:00 PM</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Response Time</h3>
              <p className="text-gray-700 mb-4">
                We value your time and ensure quick responses to all inquiries.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> Email: Within 24 hours
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> Phone: Immediate
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> In-store: Available instantly
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Need Emergency Service?</h3>
              <p className="mb-4">
                For urgent medicine needs, call us directly at +880 1781142856
              </p>
              <a
                href="tel:+8801781142856"
                className="inline-block bg-white text-blue-600 font-bold py-2 px-6 rounded-lg hover:bg-gray-100 transition-all duration-300"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;