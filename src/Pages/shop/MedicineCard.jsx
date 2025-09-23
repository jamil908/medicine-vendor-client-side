import { Building, Pill } from "lucide-react";
import { HiEye, HiShoppingCart } from "react-icons/hi";
const MedicineCard = ({ medicine, onView, onAdd }) => {
  return (
            <>
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
        <div className="relative h-48 bg-gray-100 overflow-hidden">
                <img
                  src={medicine.image}
                  alt={medicine.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300"></div>
                {/* Price Badge */}
                <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold transform hover:scale-105 transition-transform duration-200">
                  ${medicine.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                  {medicine.name}
                </h3>
                
                <div className="space-y-1 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Pill className="w-4 h-4 text-blue-500" />
                    <span className="truncate">{medicine.genericName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-purple-500" />
                    <span className="truncate">{medicine.company}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                     onClick={onView}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 hover:shadow-md group"
                  >
                    <HiEye className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    View
                  </button>
                  <button
                    onClick={onAdd}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 group"
                  >
                    <HiShoppingCart className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                    Buy
                  </button>
                </div>
              </div>
        </div>


       
       
           
              {/* Image Container */}
         
          
         
        

        {/* Empty State */}
        {medicine.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Pill className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No medicines available</h3>
            <p className="text-gray-600">Check back later for new medicines.</p>
          </div>
        )}
    </>
  );
};

export default MedicineCard;
