
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useFeaturedListings } from "@/hooks/useListings";
import PropertyCard from "./PropertyCard";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedListings = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: listings, isLoading, error } = useFeaturedListings();

  const nextSlide = () => {
    if (listings) {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(listings.length / 3));
    }
  };

  const prevSlide = () => {
    if (listings) {
      setCurrentSlide((prev) => (prev - 1 + Math.ceil(listings.length / 3)) % Math.ceil(listings.length / 3));
    }
  };

  const handleViewDetails = (id: string) => {
    // TODO: Navigate to property details page
    console.log('View details for listing:', id);
  };

  if (error) {
    return (
      <section id="listings" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Failed to load featured listings. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

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
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-2xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          ) : listings && listings.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {listings.slice(currentSlide * 3, (currentSlide + 1) * 3).map((listing) => (
                  <PropertyCard
                    key={listing.id}
                    listing={listing}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>

              {listings.length > 3 && (
                <div className="flex justify-center space-x-4">
                  <Button 
                    variant="outline" 
                    onClick={prevSlide}
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={nextSlide}
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No featured properties available at the moment.</p>
            </div>
          )}
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
