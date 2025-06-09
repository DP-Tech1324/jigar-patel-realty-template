import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminRoute from "@/components/AdminRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  Users,
  Home,
  TrendingUp,
  Mail,
  Eye,
  Phone,
  MessageSquare,
  DollarSign,
  Calendar,
  Star,
  Settings,
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  Loader2
} from "lucide-react";
import { 
  useAdminStats, 
  useAdminInquiries, 
  useAdminListings,
  useAnalyticsData,
  useUpdateInquiryStatus,
  type InquiryWithListing 
} from "@/hooks/useAdminData";
import { Database } from '@/integrations/supabase/types';
import { formatDistanceToNow } from "date-fns";

type InquiryStatus = Database['public']['Enums']['inquiry_status'];

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  
  // Fetch real data
  const { data: stats, isLoading: statsLoading, error: statsError } = useAdminStats();
  const { data: inquiries, isLoading: inquiriesLoading, error: inquiriesError } = useAdminInquiries();
  const { data: listings, isLoading: listingsLoading } = useAdminListings();
  const { data: analyticsData, isLoading: analyticsLoading } = useAnalyticsData();
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
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Listing
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Content */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Listings</p>
                      {statsLoading ? (
                        <div className="flex items-center">
                          <Loader2 className="h-6 w-6 animate-spin mr-2" />
                          <span className="text-sm text-gray-500">Loading...</span>
                        </div>
                      ) : (
                        <>
                          <p className="text-3xl font-bold text-gray-900">{stats?.totalListings || 0}</p>
                          <p className="text-sm text-green-600">+{stats?.listingsGrowth || 0}% from last month</p>
                        </>
                      )}
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Home className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Inquiries</p>
                      {statsLoading ? (
                        <div className="flex items-center">
                          <Loader2 className="h-6 w-6 animate-spin mr-2" />
                          <span className="text-sm text-gray-500">Loading...</span>
                        </div>
                      ) : (
                        <>
                          <p className="text-3xl font-bold text-gray-900">{stats?.activeInquiries || 0}</p>
                          <p className="text-sm text-yellow-600">{stats?.inquiriesNeedingResponse || 0} need response</p>
                        </>
                      )}
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <MessageSquare className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Monthly Revenue</p>
                      {statsLoading ? (
                        <div className="flex items-center">
                          <Loader2 className="h-6 w-6 animate-spin mr-2" />
                          <span className="text-sm text-gray-500">Loading...</span>
                        </div>
                      ) : (
                        <>
                          <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats?.monthlyRevenue || 0)}</p>
                          <p className="text-sm text-green-600">+{stats?.revenueGrowth || 0}% from last month</p>
                        </>
                      )}
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Site Visitors</p>
                      {statsLoading ? (
                        <div className="flex items-center">
                          <Loader2 className="h-6 w-6 animate-spin mr-2" />
                          <span className="text-sm text-gray-500">Loading...</span>
                        </div>
                      ) : (
                        <>
                          <p className="text-3xl font-bold text-gray-900">{stats?.siteVisitors?.toLocaleString() || '0'}</p>
                          <p className="text-sm text-blue-600">+{stats?.visitorsGrowth || 0}% from last month</p>
                        </>
                      )}
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Eye className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

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
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Sales Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {analyticsLoading ? (
                        <div className="h-[300px] flex items-center justify-center">
                          <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                      ) : (
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={analyticsData?.salesData || []}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="sales" fill="#3B82F6" />
                          </BarChart>
                        </ResponsiveContainer>
                      )}
                    </CardContent>
                  </Card>

                  {/* Inquiry Trends */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Weekly Inquiries</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {analyticsLoading ? (
                        <div className="h-[300px] flex items-center justify-center">
                          <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                      ) : (
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={analyticsData?.inquiryData || []}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="inquiries" stroke="#10B981" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Inquiries */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Inquiries</CardTitle>
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
                          <div key={inquiry.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="bg-gray-100 p-2 rounded-full">
                                <Users className="h-4 w-4 text-gray-600" />
                              </div>
                              <div>
                                <p className="font-medium">{inquiry.name}</p>
                                <p className="text-sm text-gray-600">{inquiry.email}</p>
                                <p className="text-sm text-gray-500">
                                  {inquiry.listings?.address || 'General inquiry'}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Badge className={getStatusBadge(inquiry.status)}>
                                {inquiry.status}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {formatDistanceToNow(new Date(inquiry.created_at), { addSuffix: true })}
                              </span>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleStatusUpdate(inquiry.id, 'contacted' as InquiryStatus)}
                                disabled={updateInquiryStatus.isPending}
                              >
                                <MessageSquare className="h-4 w-4" />
                              </Button>
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
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Property Type Distribution */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Property Type Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {analyticsLoading ? (
                        <div className="h-[300px] flex items-center justify-center">
                          <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                      ) : (
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={analyticsData?.propertyTypeData || []}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, value }) => `${name} ${value}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {(analyticsData?.propertyTypeData || []).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      )}
                    </CardContent>
                  </Card>

                  {/* Performance Metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Average Days on Market</span>
                        <span className="font-bold">28 days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Conversion Rate</span>
                        <span className="font-bold">12.5%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Average Sale Price</span>
                        <span className="font-bold">$847K</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Client Satisfaction</span>
                        <div className="flex items-center">
                          <span className="font-bold mr-2">4.8</span>
                          <div className="flex">
                            {[1,2,3,4,5].map((star) => (
                              <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Listings Tab */}
              <TabsContent value="listings">
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
              </TabsContent>

              {/* Inquiries Tab */}
              <TabsContent value="inquiries">
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
