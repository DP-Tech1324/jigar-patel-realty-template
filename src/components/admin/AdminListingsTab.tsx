
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Home, Edit } from "lucide-react";

interface Listing {
  id: string;
  title: string;
  address: string;
  city: string;
  price: number | null;
  status: string;
}

interface AdminListingsTabProps {
  listings: Listing[] | undefined;
  listingsLoading: boolean;
  formatCurrency: (amount: number) => string;
}

const AdminListingsTab = ({ listings, listingsLoading, formatCurrency }: AdminListingsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Listings</CardTitle>
      </CardHeader>
      <CardContent>
        {listingsLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mr-2" />
            <span>Loading listings...</span>
          </div>
        ) : listings && listings.length > 0 ? (
          <div className="space-y-4">
            {listings.slice(0, 10).map((listing) => (
              <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{listing.title}</h3>
                  <p className="text-sm text-gray-600">{listing.address}, {listing.city}</p>
                  <p className="text-sm text-green-600 font-medium">
                    {listing.price ? formatCurrency(listing.price) : 'Price on request'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
                    {listing.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Home className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No listings found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminListingsTab;
