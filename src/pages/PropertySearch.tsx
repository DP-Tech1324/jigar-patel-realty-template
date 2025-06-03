
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Grid, List, MapPin, SlidersHorizontal } from "lucide-react";
import { useListings, SearchFilters } from "@/hooks/useListings";
import PropertyCard from "@/components/PropertyCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const PropertySearch = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SearchFilters>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const { data: listings, isLoading, error } = useListings(filters);

  const handleFilterChange = (field: keyof SearchFilters, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [field]: value === '' ? undefined : value
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const handleViewDetails = (id: string) => {
    navigate(`/property/${id}`);
  };

  const activeFiltersCount = Object.values(filters).filter(value => value !== undefined && value !== '').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Find Your Perfect Property
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Search through thousands of properties in the Greater Toronto Area
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Main Search Bar */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by city, neighborhood, or postal code..."
                    value={filters.city || ''}
                    onChange={(e) => handleFilterChange('city', e.target.value)}
                    className="h-12"
                  />
                </div>
                <Button 
                  onClick={() => setShowFilters(!showFilters)}
                  variant="outline"
                  className="h-12 px-6"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-2 bg-blue-600">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
                <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-700">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Filters */}
          {showFilters && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select 
                      value={filters.propertyType || ''} 
                      onValueChange={(value) => handleFilterChange('propertyType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Types</SelectItem>
                        <SelectItem value="single_family">Single Family</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="multi_family">Multi Family</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="minPrice">Min Price</Label>
                    <Select 
                      value={filters.minPrice?.toString() || ''} 
                      onValueChange={(value) => handleFilterChange('minPrice', value ? Number(value) : '')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Min Price" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No Min</SelectItem>
                        <SelectItem value="200000">$200K</SelectItem>
                        <SelectItem value="400000">$400K</SelectItem>
                        <SelectItem value="600000">$600K</SelectItem>
                        <SelectItem value="800000">$800K</SelectItem>
                        <SelectItem value="1000000">$1M</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="maxPrice">Max Price</Label>
                    <Select 
                      value={filters.maxPrice?.toString() || ''} 
                      onValueChange={(value) => handleFilterChange('maxPrice', value ? Number(value) : '')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Max Price" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No Max</SelectItem>
                        <SelectItem value="500000">$500K</SelectItem>
                        <SelectItem value="750000">$750K</SelectItem>
                        <SelectItem value="1000000">$1M</SelectItem>
                        <SelectItem value="1500000">$1.5M</SelectItem>
                        <SelectItem value="2000000">$2M</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Select 
                      value={filters.bedrooms?.toString() || ''} 
                      onValueChange={(value) => handleFilterChange('bedrooms', value ? Number(value) : '')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any</SelectItem>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                        <SelectItem value="5">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Button variant="outline" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                  <div className="text-sm text-gray-600">
                    {listings?.length || 0} properties found
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {isLoading ? 'Searching...' : `${listings?.length || 0} Properties Found`}
              </h2>
              {activeFiltersCount > 0 && (
                <p className="text-gray-600">Showing filtered results</p>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Results */}
          {isLoading ? (
            <div className={`grid ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-2xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">Failed to load properties. Please try again.</p>
            </div>
          ) : listings && listings.length > 0 ? (
            <div className={`grid ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
              {listings.map((listing) => (
                <PropertyCard
                  key={listing.id}
                  listing={listing}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mb-4">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or clearing filters to see more results.
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PropertySearch;
