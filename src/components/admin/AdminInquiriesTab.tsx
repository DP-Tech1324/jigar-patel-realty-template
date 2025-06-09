
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, MessageSquare } from "lucide-react";
import { InquiryWithListing, useUpdateInquiryStatus } from "@/hooks/useAdminData";
import { Database } from '@/integrations/supabase/types';
import { formatDistanceToNow } from "date-fns";

type InquiryStatus = Database['public']['Enums']['inquiry_status'];

interface AdminInquiriesTabProps {
  inquiries: InquiryWithListing[] | undefined;
  inquiriesLoading: boolean;
}

const AdminInquiriesTab = ({ inquiries, inquiriesLoading }: AdminInquiriesTabProps) => {
  const updateInquiryStatus = useUpdateInquiryStatus();

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      new: "bg-blue-100 text-blue-800",
      contacted: "bg-yellow-100 text-yellow-800",
      converted: "bg-green-100 text-green-800",
      closed: "bg-gray-100 text-gray-800"
    };
    return variants[status] || variants.new;
  };

  const handleStatusUpdate = (inquiryId: string, newStatus: InquiryStatus) => {
    updateInquiryStatus.mutate({ id: inquiryId, status: newStatus });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Inquiries</CardTitle>
      </CardHeader>
      <CardContent>
        {inquiriesLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mr-2" />
            <span>Loading inquiries...</span>
          </div>
        ) : inquiries && inquiries.length > 0 ? (
          <div className="space-y-4">
            {inquiries.map((inquiry: InquiryWithListing) => (
              <div key={inquiry.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium">{inquiry.name}</h3>
                    <p className="text-sm text-gray-600">{inquiry.email}</p>
                    {inquiry.phone && (
                      <p className="text-sm text-gray-600">{inquiry.phone}</p>
                    )}
                  </div>
                  <Badge className={getStatusBadge(inquiry.status)}>
                    {inquiry.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 mb-2">{inquiry.message}</p>
                {inquiry.listings && (
                  <p className="text-sm text-blue-600 mb-2">
                    Property: {inquiry.listings.address}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(inquiry.created_at), { addSuffix: true })}
                  </span>
                  <div className="flex space-x-2">
                    {inquiry.status === 'new' && (
                      <Button 
                        size="sm" 
                        onClick={() => handleStatusUpdate(inquiry.id, 'contacted' as InquiryStatus)}
                        disabled={updateInquiryStatus.isPending}
                      >
                        Mark Contacted
                      </Button>
                    )}
                    {inquiry.status === 'contacted' && (
                      <Button 
                        size="sm" 
                        onClick={() => handleStatusUpdate(inquiry.id, 'converted' as InquiryStatus)}
                        disabled={updateInquiryStatus.isPending}
                      >
                        Mark Converted
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No inquiries found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminInquiriesTab;
