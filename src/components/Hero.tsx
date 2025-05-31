
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Calculator } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20 lg:py-32">
      <div className="absolute inset-0 bg-black/20"></div>
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="block">Jigar Patel</span>
              <span className="block text-yellow-400">Real Estate</span>
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-blue-100">
              Your Trusted GTA Realtor
            </p>
            <p className="text-lg mb-8 text-blue-200 max-w-2xl">
              Helping families find their perfect home in the Greater Toronto Area. 
              With years of experience and a commitment to excellence, I'm here to 
              guide you through every step of your real estate journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 text-lg"
              >
                <Search className="mr-2 h-5 w-5" />
                Find Your Dream Home
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Get Home Value
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center">Quick Property Search</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input 
                    type="text" 
                    placeholder="Enter city, neighborhood, or postal code"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Min Price</label>
                    <select className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400">
                      <option value="">Any</option>
                      <option value="500000">$500,000</option>
                      <option value="750000">$750,000</option>
                      <option value="1000000">$1,000,000</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Price</label>
                    <select className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400">
                      <option value="">Any</option>
                      <option value="1000000">$1,000,000</option>
                      <option value="1500000">$1,500,000</option>
                      <option value="2000000">$2,000,000</option>
                    </select>
                  </div>
                </div>
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3">
                  Search Properties
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
