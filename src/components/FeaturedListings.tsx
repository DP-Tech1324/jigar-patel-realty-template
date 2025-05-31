
import { Button } from "@/components/ui/button";
import { ArrowRight, Bed, Bath, Square } from "lucide-react";
import { useState } from "react";

const FeaturedListings = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mock listings data - will be replaced with Supabase data
  const listings = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=80",
      price: "$1,299,000",
      address: "123 Maple Street, Toronto, ON",
      beds: 4,
      baths: 3,
      sqft: "2,500",
      type: "Single Family Home"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      price: "$899,000",
      address: "456 Oak Avenue, Mississauga, ON",
      beds: 3,
      baths: 2,
      sqft: "1,800",
      type: "Townhouse"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      price: "$2,150,000",
      address: "789 Pine Road, Oakville, ON",
      beds: 5,
      baths: 4,
      sqft: "3,200",
      type: "Luxury Home"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
      price: "$649,000",
      address: "321 Elm Street, Brampton, ON",
      beds: 2,
      baths: 2,
      sqft: "1,200",
      type: "Condo"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(listings.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(listings.length / 3)) % Math.ceil(listings.length / 3));
  };

  return (
    <section id="listings" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties in the Greater Toronto Area
          </p>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {listings.slice(currentSlide * 3, (currentSlide + 1) * 3).map((listing) => (
              <div key={listing.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={listing.image} 
                    alt={listing.address}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {listing.type}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                      {listing.price}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {listing.address}
                  </h3>
                  
                  <div className="flex items-center space-x-4 text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      <span className="text-sm">{listing.beds} beds</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      <span className="text-sm">{listing.baths} baths</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1" />
                      <span className="text-sm">{listing.sqft} sqft</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline" 
              onClick={prevSlide}
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            >
              Previous
            </Button>
            <Button 
              variant="outline" 
              onClick={nextSlide}
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            >
              Next
            </Button>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
            View All Listings
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
