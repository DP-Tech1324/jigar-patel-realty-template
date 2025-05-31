
import { Button } from "@/components/ui/button";
import { Search, Home, MapPin, DollarSign } from "lucide-react";

const PropertySearch = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Property
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search through thousands of properties in the GTA with our advanced search tools
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                Location
              </label>
              <input 
                type="text" 
                placeholder="City, Neighborhood, Postal Code"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Home className="h-4 w-4 mr-2 text-blue-600" />
                Property Type
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Types</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
                <option value="apartment">Apartment</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <DollarSign className="h-4 w-4 mr-2 text-blue-600" />
                Price Range
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Any Price</option>
                <option value="0-500000">Under $500K</option>
                <option value="500000-750000">$500K - $750K</option>
                <option value="750000-1000000">$750K - $1M</option>
                <option value="1000000+">$1M+</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Bedrooms</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
              <Search className="mr-2 h-5 w-5" />
              Search Properties
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertySearch;
