





const HealthTips = () => {
    const tips = [
      { id: 1, title: "Proper Medication Usage", content: "Always take your medicines as prescribed by your doctor." },
      { id: 2, title: "Stay Hydrated", content: "Drink at least 8 glasses of water daily to stay healthy." },
      { id: 3, title: "Regular Exercise", content: "Exercise at least 30 minutes a day to maintain a healthy lifestyle." }
    ];
  
    return (
      <div className="p-6  rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Health Tips & Blogs</h2>
        <div className="space-y-4">
          {tips.map((tip) => (
            <div key={tip.id} className="p-4 bg-gray-700  rounded-md shadow">
              <h3 className="text-xl font-semibold">{tip.title}</h3>
              <p className="text-gray-400">{tip.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default HealthTips;
  