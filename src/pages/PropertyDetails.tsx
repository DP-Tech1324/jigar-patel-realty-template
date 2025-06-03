
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  Share2, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Car, 
  Calendar,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Maximize
} from "lucide-react";
import { useListing } from "@/hooks/useListings";
import { useIsFavorite, useToggleFavorite } from "@/hooks/useFavorites";
import { useAuth } from "@/components/auth/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import InquiryForm from "@/components/InquiryForm";

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { data: listing, isLoading, error } = useListing(id || "");
  const { data: isFavorite } = useIsFavorite(id || "");
  const toggleFavorite = useToggleFavorite();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Skeleton className="h-96 w-full mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2 mb-6" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div>
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-8">The property you're looking for doesn't exist or has been removed.</p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = listing.images || ['https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=80'];
  
  const formatPrice = (price?: number) => {
    if (!price) return 'Price on request';
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleFavoriteClick = () => {
    if (!user || !id) return;
    toggleFavorite.mutate(id);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Image Gallery */}
      <section className="relative">
        <div className="h-96 md:h-[500px] relative overflow-hidden">
          <img 
            src={images[currentImageIndex]}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
          
          {/* Image Controls */}
          {images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
          
          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded">
            {currentImageIndex + 1} / {images.length}
          </div>
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            {user && (
              <Button
                variant="outline"
                size="sm"
                className="bg-white/90 hover:bg-white"
                onClick={handleFavoriteClick}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="bg-white/90 hover:bg-white"
              onClick={() => setShowFullscreen(true)}
            >
              <Maximize className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/90 hover:bg-white"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-blue-600 text-white mb-2">
                    {listing.property_type}
                  </Badge>
                  <div className="text-3xl font-bold text-green-600">
                    {formatPrice(listing.price)}
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {listing.title}
                </h1>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{listing.address}, {listing.city}, {listing.province}</span>
                </div>
                
                <div className="flex items-center space-x-6 text-gray-600">
                  {listing.bedrooms && (
                    <div className="flex items-center">
                      <Bed className="h-5 w-5 mr-2" />
                      <span>{listing.bedrooms} beds</span>
                    </div>
                  )}
                  {listing.bathrooms && (
                    <div className="flex items-center">
                      <Bath className="h-5 w-5 mr-2" />
                      <span>{listing.bathrooms} baths</span>
                    </div>
                  )}
                  {listing.square_footage && (
                    <div className="flex items-center">
                      <Square className="h-5 w-5 mr-2" />
                      <span>{listing.square_footage} sqft</span>
                    </div>
                  )}
                </div>
              </div>

              <Separator className="my-6" />

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed">
                  {listing.description || "This beautiful property offers modern living in a prime location. Contact Jigar Patel for more details and to schedule a viewing."}
                </p>
              </div>

              <Separator className="my-6" />

              {/* Property Features */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Details</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {listing.year_built && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Year Built:</span>
                      <span className="font-medium">{listing.year_built}</span>
                    </div>
                  )}
                  {listing.lot_size && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lot Size:</span>
                      <span className="font-medium">{listing.lot_size} sqft</span>
                    </div>
                  )}
                  {listing.mls_number && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">MLS #:</span>
                      <span className="font-medium">{listing.mls_number}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property Type:</span>
                    <span className="font-medium capitalize">{listing.property_type.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Contact Card */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-2xl">JP</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Jigar Patel</h3>
                    <p className="text-gray-600">Real Estate Professional</p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-3 text-blue-600" />
                      <span className="text-sm">(416) 555-0123</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-3 text-blue-600" />
                      <span className="text-sm">jigar@jigarpatelrealestate.com</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Schedule Viewing */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Schedule a Viewing</h3>
                  <InquiryForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PropertyDetails;
