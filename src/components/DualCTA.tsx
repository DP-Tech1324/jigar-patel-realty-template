
import { Button } from "@/components/ui/button";
import { Search, Calculator, ArrowRight, Home, TrendingUp } from "lucide-react";

const DualCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Dream Home Search */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Find Your Dream Home
              </h3>
              <p className="text-gray-600 mb-6">
                Browse through thousands of properties in the GTA. Our advanced search 
                tools help you find the perfect home that matches your lifestyle and budget.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <Home className="h-4 w-4 mr-3 text-blue-600" />
                  <span>Exclusive access to new listings</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <TrendingUp className="h-4 w-4 mr-3 text-blue-600" />
                  <span>Market insights and neighborhood data</span>
                </div>
              </div>
              <Button 
                size="lg" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Start Your Search
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Home Worth Calculator */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <Calculator className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                What's Your Home Worth?
              </h3>
              <p className="text-gray-600 mb-6">
                Get an instant estimate of your property's current market value. 
                Our comprehensive analysis uses the latest market data and comparable sales.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <TrendingUp className="h-4 w-4 mr-3 text-yellow-600" />
                  <span>Accurate market valuations</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Home className="h-4 w-4 mr-3 text-yellow-600" />
                  <span>Detailed property analysis</span>
                </div>
              </div>
              <Button 
                size="lg" 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              >
                Get Free Valuation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DualCTA;
