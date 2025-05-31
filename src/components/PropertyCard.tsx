
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Bed, Bath, Square, MapPin } from 'lucide-react';
import { Listing } from '@/hooks/useListings';
import { useIsFavorite, useToggleFavorite } from '@/hooks/useFavorites';
import { useAuth } from '@/components/auth/AuthContext';

interface PropertyCardProps {
  listing: Listing;
  onViewDetails?: (id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ listing, onViewDetails }) => {
  const { user } = useAuth();
  const { data: isFavorite } = useIsFavorite(listing.id);
  const toggleFavorite = useToggleFavorite();

  const formatPrice = (price?: number) => {
    if (!price) return 'Price on request';
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      // TODO: Open auth modal
      return;
    }
    toggleFavorite.mutate(listing.id);
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(listing.id);
    }
  };

  const primaryImage = listing.images?.[0] || 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={primaryImage}
          alt={listing.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-blue-600 text-white">
            {listing.property_type}
          </Badge>
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <Badge className="bg-yellow-500 text-black font-bold">
            {formatPrice(listing.price)}
          </Badge>
          {user && (
            <Button
              variant="outline"
              size="sm"
              className="p-2 bg-white/90 hover:bg-white"
              onClick={handleFavoriteClick}
              disabled={toggleFavorite.isPending}
            >
              <Heart 
                className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
              />
            </Button>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {listing.title}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{listing.address}, {listing.city}</span>
        </div>
        
        <div className="flex items-center space-x-4 text-gray-600 mb-4">
          {listing.bedrooms && (
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span className="text-sm">{listing.bedrooms} beds</span>
            </div>
          )}
          {listing.bathrooms && (
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span className="text-sm">{listing.bathrooms} baths</span>
            </div>
          )}
          {listing.square_footage && (
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span className="text-sm">{listing.square_footage} sqft</span>
            </div>
          )}
        </div>
        
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={handleViewDetails}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default PropertyCard;
