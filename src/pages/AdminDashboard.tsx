import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, ChartLine, Clock, Star, Users, LogOut } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'customers' | 'installations' | 'payments' | 'analytics'>('overview');
  
  const chartColors = {
    primary: '#8B5CF6',    // Vivid Purple
    secondary: '#D946EF',  // Magenta Pink
    accent: '#F97316',     // Bright Orange
    highlight: '#0EA5E9',  // Ocean Blue
    background: '#F1F0FB', // Soft Gray
  };

  const ticketTrendData = [
    { month: 'Jan', tickets: 65 },
    { month: 'Feb', tickets: 75 },
    { month: 'Mar', tickets: 85 },
    { month: 'Apr', tickets: 78 },
    { month: 'May', tickets: 90 },
    { month: 'Jun', tickets: 95 },
  ];

  const responseTimeData = [
    { day: 'Mon', time: 25 },
    { day: 'Tue', time: 22 },
    { day: 'Wed', time: 28 },
    { day: 'Thu', time: 20 },
    { day: 'Fri', time: 24 },
  ];

  const satisfactionData = [
    { month: 'Jan', score: 4.2 },
    { month: 'Feb', score: 4.4 },
    { month: 'Mar', score: 4.3 },
    { month: 'Apr', score: 4.5 },
    { month: 'May', score: 4.6 },
    { month: 'Jun', score: 4.7 },
  ];

  const ticketCategoryData = [
    { name: 'Installation', value: 35 },
    { name: 'Technical', value: 25 },
    { name: 'Billing', value: 20 },
    { name: 'General', value: 20 },
  ];

  const topPerformers = [
    { name: 'Priya Sharma', tickets: 145, rating: 4.8 },
    { name: 'Rahul Verma', tickets: 132, rating: 4.7 },
    { name: 'Anjali Patel', tickets: 128, rating: 4.7 },
  ];
  
  const customers = [
    { id: 1, name: "Rajesh Kumar", email: "rajesh@example.com", installDate: "2025-02-15", status: "Active" },
    { id: 2, name: "Meera Singh", email: "meera@example.com", installDate: "2025-03-20", status: "Pending" },
    { id: 3, name: "Arjun Malhotra", email: "arjun@example.com", installDate: "2025-01-10", status: "Active" },
    { id: 4, name: "Priya Reddy", email: "priya@example.com", installDate: "2025-04-05", status: "Installation" },
  ];
  
  const installations = [
    { id: 101, customer: "Rajesh Kumar", address: "123 Solar St", date: "2025-02-15", panels: 12, status: "Completed" },
    { id: 102, customer: "Meera Singh", address: "456 Energy Ave", date: "2025-03-20", panels: 8, status: "Scheduled" },
    { id: 103, customer: "Arjun Malhotra", address: "789 Power Blvd", date: "2025-01-10", panels: 15, status: "Completed" },
    { id: 104, customer: "Priya Reddy", address: "321 Sun Lane", date: "2025-04-05", panels: 10, status: "In Progress" },
  ];
  
  const payments = [
    { id: 201, customer: "Rajesh Kumar", amount: 12500, date: "2025-02-01", status: "Paid" },
    { id: 202, customer: "Meera Singh", amount: 8600, date: "2025-03-15", status: "Pending" },
    { id: 203, customer: "Arjun Malhotra", amount: 15200, date: "2025-01-05", status: "Paid" },
    { id: 204, customer: "Priya Reddy", amount: 10800, date: "2025-04-01", status: "Pending" },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-solar-dark">Admin Dashboard</h1>
          <Link 
            to="/" 
            onClick={() => localStorage.removeItem('currentUser')}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b overflow-x-auto">
            <button 
              onClick={() => setActiveTab('overview')} 
              className={`px-6 py-3 text-center whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-solar-yellow font-medium' : 'text-gray-600'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('customers')} 
              className={`px-6 py-3 text-center whitespace-nowrap ${activeTab === 'customers' ? 'border-b-2 border-solar-yellow font-medium' : 'text-gray-600'}`}
            >
              Customers
            </button>
            <button 
              onClick={() => setActiveTab('installations')} 
              className={`px-6 py-3 text-center whitespace-nowrap ${activeTab === 'installations' ? 'border-b-2 border-solar-yellow font-medium' : 'text-gray-600'}`}
            >
              Installations
            </button>
            <button 
              onClick={() => setActiveTab('payments')} 
              className={`px-6 py-3 text-center whitespace-nowrap ${activeTab === 'payments' ? 'border-b-2 border-solar-yellow font-medium' : 'text-gray-600'}`}
            >
              Payments
            </button>
            <button 
              onClick={() => setActiveTab('analytics')} 
              className={`px-6 py-3 text-center whitespace-nowrap ${activeTab === 'analytics' ? 'border-b-2 border-solar-yellow font-medium' : 'text-gray-600'}`}
            >
              Analytics
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">System Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2">
                    <Activity className="text-purple-600" />
                    <p className="text-sm text-gray-600">Active Tickets</p>
                  </div>
                  <p className="text-2xl font-bold text-purple-700">48</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2">
                    <Clock className="text-blue-600" />
                    <p className="text-sm text-gray-600">Avg Response Time</p>
                  </div>
                  <p className="text-2xl font-bold text-blue-700">24m</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2">
                    <Star className="text-green-600" />
                    <p className="text-sm text-gray-600">CSAT Score</p>
                  </div>
                  <p className="text-2xl font-bold text-green-700">4.6</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2">
                    <Users className="text-orange-600" />
                    <p className="text-sm text-gray-600">Active Users</p>
                  </div>
                  <p className="text-2xl font-bold text-orange-700">142</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white">
                  <h3 className="text-lg font-medium mb-3 text-gray-800">Ticket Trends</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={ticketTrendData}>
                        <defs>
                          <linearGradient id="ticketColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip contentStyle={{ borderRadius: '8px' }} />
                        <Area 
                          type="monotone" 
                          dataKey="tickets" 
                          stroke={chartColors.primary} 
                          fill="url(#ticketColor)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white">
                  <h3 className="text-lg font-medium mb-3 text-gray-800">Response Time</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={responseTimeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="day" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip contentStyle={{ borderRadius: '8px' }} />
                        <Line 
                          type="monotone" 
                          dataKey="time" 
                          stroke={chartColors.secondary}
                          strokeWidth={2}
                          dot={{ fill: chartColors.secondary }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white">
                  <h3 className="text-lg font-medium mb-3 text-gray-800">Customer Satisfaction</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={satisfactionData}>
                        <defs>
                          <linearGradient id="satisfactionColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={chartColors.accent} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={chartColors.accent} stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis domain={[0, 5]} stroke="#6b7280" />
                        <Tooltip contentStyle={{ borderRadius: '8px' }} />
                        <Line 
                          type="monotone" 
                          dataKey="score" 
                          stroke={chartColors.accent}
                          strokeWidth={2}
                          fill="url(#satisfactionColor)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white">
                  <h3 className="text-lg font-medium mb-3 text-gray-800">Tickets by Category</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={ticketCategoryData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill={chartColors.highlight}
                          label
                        >
                          {ticketCategoryData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={[chartColors.primary, chartColors.secondary, chartColors.accent, chartColors.highlight][index % 4]}
                            />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '8px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Top Performing Agents</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Tickets Resolved</TableHead>
                        <TableHead>Rating</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topPerformers.map((performer) => (
                        <TableRow key={performer.name}>
                          <TableCell>{performer.name}</TableCell>
                          <TableCell>{performer.tickets}</TableCell>
                          <TableCell>{performer.rating}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'customers' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Customer Management</h2>
                <button className="px-3 py-1 bg-solar-yellow text-solar-dark rounded hover:bg-opacity-90 transition-colors text-sm">
                  Add New Customer
                </button>
              </div>
              
              <Table>
                <TableCaption>List of all customers</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Install Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>{customer.id}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.installDate}</TableCell>
                      <TableCell>{customer.status}</TableCell>
                      <TableCell className="space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">View</button>
                        <button className="text-green-600 hover:text-green-800">Edit</button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          {activeTab === 'installations' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Installation Management</h2>
                <button className="px-3 py-1 bg-solar-yellow text-solar-dark rounded hover:bg-opacity-90 transition-colors text-sm">
                  Schedule Installation
                </button>
              </div>
              
              <Table>
                <TableCaption>List of all installations</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Panels</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {installations.map((install) => (
                    <TableRow key={install.id}>
                      <TableCell>{install.id}</TableCell>
                      <TableCell>{install.customer}</TableCell>
                      <TableCell>{install.address}</TableCell>
                      <TableCell>{install.date}</TableCell>
                      <TableCell>{install.panels}</TableCell>
                      <TableCell>{install.status}</TableCell>
                      <TableCell className="space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">Details</button>
                        <button className="text-green-600 hover:text-green-800">Update</button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          {activeTab === 'payments' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Payment Records</h2>
                <button className="px-3 py-1 bg-solar-yellow text-solar-dark rounded hover:bg-opacity-90 transition-colors text-sm">
                  Record Payment
                </button>
              </div>
              
              <Table>
                <TableCaption>Payment history</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.id}</TableCell>
                      <TableCell>{payment.customer}</TableCell>
                      <TableCell>₹{payment.amount}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.status}</TableCell>
                      <TableCell className="space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">Receipt</button>
                        <button className="text-green-600 hover:text-green-800">Edit</button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Performance Analytics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-3">Installation Growth</h3>
                  <div className="h-64 bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-500">Chart visualization would be here</p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-3">Revenue Growth</h3>
                  <div className="h-64 bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-500">Chart visualization would be here</p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 md:col-span-2">
                  <h3 className="text-lg font-medium mb-3">Regional Distribution</h3>
                  <div className="h-64 bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-500">Map visualization would be here</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;