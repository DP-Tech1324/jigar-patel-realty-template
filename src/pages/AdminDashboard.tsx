
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminRoute from "@/components/AdminRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Plus,
  AlertCircle
} from "lucide-react";
import { 
  useAdminStats, 
  useAnalyticsData
} from "@/hooks/useAdminData";
import { useAdminInquiriesQuery } from "@/hooks/useAdminInquiries";
import { useAdminListingsQuery } from "@/hooks/useAdminListings";
import AdminStats from "@/components/admin/AdminStats";
import AdminOverviewTab from "@/components/admin/AdminOverviewTab";
import AdminListingsTab from "@/components/admin/AdminListingsTab";
import AdminInquiriesTab from "@/components/admin/AdminInquiriesTab";
import AdminAnalyticsTab from "@/components/admin/AdminAnalyticsTab";

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  
  // Fetch real data using the new hooks
  const { data: stats, isLoading: statsLoading, error: statsError } = useAdminStats();
  const { data: inquiries, isLoading: inquiriesLoading, error: inquiriesError } = useAdminInquiriesQuery();
  const { data: listings, isLoading: listingsLoading } = useAdminListingsQuery();
  const { data: analyticsData, isLoading: analyticsLoading } = useAnalyticsData();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (statsError || inquiriesError) {
    return (
      <AdminRoute>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <div className="max-w-7xl mx-auto px-4 py-8">
            <Card>
              <CardContent className="p-8 text-center">
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Dashboard</h2>
                <p className="text-gray-600">
                  There was an error loading the admin dashboard. Please make sure you have admin permissions.
                </p>
              </CardContent>
            </Card>
          </div>
          <Footer />
        </div>
      </AdminRoute>
    );
  }

  return (
    <AdminRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Dashboard Header */}
        <section className="bg-white border-b py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Manage your real estate business</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Content */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            
            {/* Stats Overview */}
            <AdminStats 
              stats={stats}
              isLoading={statsLoading}
              formatCurrency={formatCurrency}
            />

            {/* Main Dashboard Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="listings">Listings</TabsTrigger>
                <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <AdminOverviewTab 
                  inquiries={inquiries}
                  inquiriesLoading={inquiriesLoading}
                  analyticsData={analyticsData}
                  analyticsLoading={analyticsLoading}
                />
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <AdminAnalyticsTab 
                  analyticsData={analyticsData}
                  analyticsLoading={analyticsLoading}
                />
              </TabsContent>

              {/* Listings Tab */}
              <TabsContent value="listings">
                <AdminListingsTab />
              </TabsContent>

              {/* Inquiries Tab */}
              <TabsContent value="inquiries">
                <AdminInquiriesTab />
              </TabsContent>

              {/* Content Tab */}
              <TabsContent value="content">
                <Card>
                  <CardHeader>
                    <CardTitle>Content Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Content management interface would go here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <Footer />
      </div>
    </AdminRoute>
  );
};

export default AdminDashboard;
