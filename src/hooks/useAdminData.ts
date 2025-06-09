
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

type InquiryStatus = Database['public']['Enums']['inquiry_status'];

export interface AdminStats {
  totalListings: number;
  activeInquiries: number;
  monthlyRevenue: number;
  siteVisitors: number;
  listingsGrowth: number;
  inquiriesNeedingResponse: number;
  revenueGrowth: number;
  visitorsGrowth: number;
}

export interface InquiryWithListing {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: string;
  created_at: string;
  listing_id?: string;
  listings?: {
    title: string;
    address: string;
  } | null;
}

export const useAdminStats = () => {
  const { user, isAdmin } = useAuth();

  return useQuery({
    queryKey: ['admin-stats', user?.id],
    queryFn: async () => {
      if (!user || !isAdmin) throw new Error('Unauthorized');

      // Get total listings
      const { count: totalListings } = await supabase
        .from('listings')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      // Get active inquiries
      const { count: activeInquiries } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true })
        .in('status', ['new', 'contacted']);

      // Get inquiries needing response
      const { count: inquiriesNeedingResponse } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new');

      // Calculate revenue from sold listings (mock calculation)
      const { data: soldListings } = await supabase
        .from('listings')
        .select('price')
        .eq('status', 'sold')
        .gte('updated_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString());

      const monthlyRevenue = soldListings?.reduce((sum, listing) => 
        sum + (listing.price || 0) * 0.025, 0) || 0; // 2.5% commission

      // Mock site visitors (in real app, this would come from analytics)
      const siteVisitors = 12400;

      const stats: AdminStats = {
        totalListings: totalListings || 0,
        activeInquiries: activeInquiries || 0,
        monthlyRevenue,
        siteVisitors,
        listingsGrowth: 12, // Mock growth percentages
        inquiriesNeedingResponse: inquiriesNeedingResponse || 0,
        revenueGrowth: 18,
        visitorsGrowth: 24,
      };

      return stats;
    },
    enabled: !!user && isAdmin,
  });
};

export const useAdminInquiries = () => {
  const { user, isAdmin } = useAuth();

  return useQuery({
    queryKey: ['admin-inquiries', user?.id],
    queryFn: async () => {
      if (!user || !isAdmin) throw new Error('Unauthorized');

      const { data, error } = await supabase
        .from('inquiries')
        .select(`
          *,
          listings (
            title,
            address
          )
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data as InquiryWithListing[];
    },
    enabled: !!user && isAdmin,
  });
};

export const useAdminListings = () => {
  const { user, isAdmin } = useAuth();

  return useQuery({
    queryKey: ['admin-listings', user?.id],
    queryFn: async () => {
      if (!user || !isAdmin) throw new Error('Unauthorized');

      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user && isAdmin,
  });
};

export const useUpdateInquiryStatus = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: InquiryStatus }) => {
      const { data, error } = await supabase
        .from('inquiries')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-inquiries'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      toast({
        title: "Success",
        description: "Inquiry status updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update inquiry status",
        variant: "destructive",
      });
    },
  });
};

export const useAnalyticsData = () => {
  const { user, isAdmin } = useAuth();

  return useQuery({
    queryKey: ['admin-analytics', user?.id],
    queryFn: async () => {
      if (!user || !isAdmin) throw new Error('Unauthorized');

      // Get listings by month for sales chart
      const { data: listingsData } = await supabase
        .from('listings')
        .select('created_at, status, price')
        .eq('status', 'sold')
        .gte('created_at', new Date(new Date().getFullYear(), 0, 1).toISOString());

      // Get inquiries by day for inquiry trends
      const { data: inquiriesData } = await supabase
        .from('inquiries')
        .select('created_at')
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      // Get property type distribution
      const { data: propertyTypes } = await supabase
        .from('listings')
        .select('property_type')
        .eq('status', 'active');

      // Process data for charts
      const salesData = processSalesData(listingsData || []);
      const inquiryData = processInquiryData(inquiriesData || []);
      const propertyTypeData = processPropertyTypeData(propertyTypes || []);

      return {
        salesData,
        inquiryData,
        propertyTypeData,
      };
    },
    enabled: !!user && isAdmin,
  });
};

// Helper functions to process data for charts
function processSalesData(listings: any[]) {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const salesByMonth = monthNames.map(month => ({ month, sales: 0, revenue: 0 }));
  
  listings.forEach(listing => {
    const month = new Date(listing.created_at).getMonth();
    if (month < 6) {
      salesByMonth[month].sales += 1;
      salesByMonth[month].revenue += (listing.price || 0) * 0.025;
    }
  });
  
  return salesByMonth;
}

function processInquiryData(inquiries: any[]) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const inquiriesByDay = days.map(day => ({ day, inquiries: 0 }));
  
  inquiries.forEach(inquiry => {
    const dayIndex = new Date(inquiry.created_at).getDay();
    const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1; // Adjust Sunday to be last
    inquiriesByDay[adjustedIndex].inquiries += 1;
  });
  
  return inquiriesByDay;
}

function processPropertyTypeData(properties: any[]) {
  const typeMap: Record<string, { name: string; color: string }> = {
    single_family: { name: 'Single Family', color: '#3B82F6' },
    condo: { name: 'Condo', color: '#10B981' },
    townhouse: { name: 'Townhouse', color: '#F59E0B' },
    multi_family: { name: 'Multi Family', color: '#EF4444' },
  };

  const counts: Record<string, number> = {};
  properties.forEach(property => {
    counts[property.property_type] = (counts[property.property_type] || 0) + 1;
  });

  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
  
  return Object.entries(counts).map(([type, count]) => ({
    name: typeMap[type]?.name || type,
    value: Math.round((count / total) * 100),
    color: typeMap[type]?.color || '#8884d8',
  }));
}
