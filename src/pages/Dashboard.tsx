
import React, { useEffect, useState } from 'react';
import { fetchSolarProductionData } from '../lib/api-service';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import { Sun, Battery, CreditCard, Users, Phone } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [solarData, setSolarData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const production = await fetchSolarProductionData('demo-user');
        setSolarData(production);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadDashboardData();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-solar-dark text-center mb-8">☀️ Solar Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Energy Production */}
          <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="bg-solar-dark text-white py-3 px-6">
              <h2 className="text-xl font-semibold flex items-center">
                <span className="mr-2">⚡</span> Energy Production
              </h2>
            </div>
            <div className="p-4">
              <div className="h-64 bg-gray-100 mb-4">
                {solarData?.monthlyData && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={solarData.monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip contentStyle={{ background: '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
                      <Line 
                        type="monotone" 
                        dataKey="production" 
                        stroke="#FFD700" 
                        strokeWidth={2}
                        dot={{ fill: '#2B2320', strokeWidth: 2 }}
                        activeDot={{ r: 8, fill: '#FFD700' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
              <div className="mt-4">
                <p className="text-xl font-bold">Total Production: {solarData?.totalProduction} kWh 🌟</p>
                <p className="text-green-500 flex items-center gap-2">
                  📈 +{solarData?.growth}% from last month
                </p>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="bg-solar-dark text-white py-3 px-6">
              <h2 className="text-xl font-semibold flex items-center">
                <span className="mr-2">🔗</span> Quick Links
              </h2>
            </div>
            <div className="p-4 space-y-4">
              <Link to="/support" className="flex items-center justify-between p-3 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors">
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Support Center
                </span>
                <span>🎯</span>
              </Link>
              <Link to="/referrals" className="flex items-center justify-between p-3 bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors">
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Referral Program
                </span>
                <span>🤝</span>
              </Link>
              <Link to="/payment" className="flex items-center justify-between p-3 bg-yellow-50 text-yellow-700 rounded hover:bg-yellow-100 transition-colors">
                <span className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Make a Payment
                </span>
                <span>💳</span>
              </Link>
            </div>
          </div>
          
          {/* Solar Stats */}
          <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="bg-solar-dark text-white py-3 px-6">
              <h2 className="text-xl font-semibold flex items-center">
                <span className="mr-2">📊</span> Solar Stats
              </h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded transition-colors">
                  <span className="font-medium flex items-center gap-2">
                    <Battery className="h-4 w-4 text-green-500" />
                    System Health
                  </span>
                  <span className="text-green-500">Excellent 🌟</span>
                </div>
                <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded transition-colors">
                  <span className="font-medium flex items-center gap-2">
                    <Sun className="h-4 w-4 text-yellow-500" />
                    Peak Power
                  </span>
                  <span>5.8 kW ⚡</span>
                </div>
                <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded transition-colors">
                  <span className="font-medium">CO2 Saved</span>
                  <span>2.4 tons 🌱</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
