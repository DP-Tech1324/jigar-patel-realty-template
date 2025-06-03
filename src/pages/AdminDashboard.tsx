
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  Trash2
} from "lucide-react";

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30");

  // Mock data for charts
  const salesData = [
    { month: "Jan", sales: 12, revenue: 2400000 },
    { month: "Feb", sales: 8, revenue: 1600000 },
    { month: "Mar", sales: 15, revenue: 3200000 },
    { month: "Apr", sales: 10, revenue: 2100000 },
    { month: "May", sales: 18, revenue: 3800000 },
    { month: "Jun", sales: 14, revenue: 2900000 },
  ];

  const inquiryData = [
    { day: "Mon", inquiries: 23 },
    { day: "Tue", inquiries: 18 },
    { day: "Wed", inquiries: 31 },
    { day: "Thu", inquiries: 26 },
    { day: "Fri", inquiries: 42 },
    { day: "Sat", inquiries: 35 },
    { day: "Sun", inquiries: 28 },
  ];

  const propertyTypeData = [
    { name: "Single Family", value: 45, color: "#3B82F6" },
    { name: "Condo", value: 30, color: "#10B981" },
    { name: "Townhouse", value: 15, color: "#F59E0B" },
    { name: "Multi Family", value: 10, color: "#EF4444" },
  ];

  const recentInquiries = [
    { id: 1, name: "John Smith", email: "john@email.com", property: "123 Main St", status: "new", time: "2 hours ago" },
    { id: 2, name: "Sarah Johnson", email: "sarah@email.com", property: "456 Oak Ave", status: "contacted", time: "4 hours ago" },
    { id: 3, name: "Mike Wilson", email: "mike@email.com", property: "789 Pine Rd", status: "scheduled", time: "6 hours ago" },
    { id: 4, name: "Lisa Brown", email: "lisa@email.com", property: "321 Elm St", status: "new", time: "8 hours ago" },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      new: "bg-blue-100 text-blue-800",
      contacted: "bg-yellow-100 text-yellow-800",
      scheduled: "bg-green-100 text-green-800",
      closed: "bg-gray-100 text-gray-800"
    };
    return variants[status] || variants.new;
  };

  return (
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
                    <p className="text-3xl font-bold text-gray-900">87</p>
                    <p className="text-sm text-green-600">+12% from last month</p>
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
                    <p className="text-3xl font-bold text-gray-900">23</p>
                    <p className="text-sm text-yellow-600">4 need response</p>
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
                    <p className="text-3xl font-bold text-gray-900">$2.9M</p>
                    <p className="text-sm text-green-600">+18% from last month</p>
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
                    <p className="text-3xl font-bold text-gray-900">12.4K</p>
                    <p className="text-sm text-blue-600">+24% from last month</p>
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
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="sales" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Inquiry Trends */}
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Inquiries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={inquiryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="inquiries" stroke="#10B981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Inquiries */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Inquiries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentInquiries.map((inquiry) => (
                      <div key={inquiry.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="bg-gray-100 p-2 rounded-full">
                            <Users className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium">{inquiry.name}</p>
                            <p className="text-sm text-gray-600">{inquiry.email}</p>
                            <p className="text-sm text-gray-500">{inquiry.property}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusBadge(inquiry.status)}>
                            {inquiry.status}
                          </Badge>
                          <span className="text-sm text-gray-500">{inquiry.time}</span>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
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
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={propertyTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {propertyTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
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

            {/* Placeholder tabs for other sections */}
            <TabsContent value="listings">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Listing management interface would go here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inquiries">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Inquiries</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Inquiry management interface would go here.</p>
                </CardContent>
              </Card>
            </TabsContent>

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
  );
};

export default AdminDashboard;
