import { Pill, Droplet, Activity } from 'lucide-react';

const HealthTips = () => {
  const tips = [
    {
      id: 1,
      title: "Proper Medication Usage",
      content: "Always take your medicines as prescribed by your doctor.",
      icon: Pill,
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "Stay Hydrated",
      content: "Drink at least 8 glasses of water daily to stay healthy.",
      icon: Droplet,
      color: "from-cyan-500 to-cyan-600"
    },
    {
      id: 3,
      title: "Regular Exercise",
      content: "Exercise at least 30 minutes a day to maintain a healthy lifestyle.",
      icon: Activity,
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <div className="py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
    <div className='p-6 bg-white'>
        <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Health Tips & Blogs</h2>
        <p className="text-gray-600">Essential wellness advice for your daily routine</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tips.map((tip) => {
          const IconComponent = tip.icon;
          return (
            <div
              key={tip.id}
              className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-gray-300"
            >
              {/* Icon Header */}
              <div className={`bg-gradient-to-r ${tip.color} p-6 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className="w-10 h-10 text-white" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {tip.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {tip.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
};

export default HealthTips;