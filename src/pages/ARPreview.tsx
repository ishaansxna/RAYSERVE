
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { fetchARPreviewData } from '../lib/api-service';

const ARPreview: React.FC = () => {
  const { toast } = useToast();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');

  // Request user location on component mount
  useEffect(() => {
    const checkLocationPermission = async () => {
      if (navigator.permissions && navigator.permissions.query) {
        try {
          const result = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
          setLocationPermission(result.state as 'granted' | 'denied' | 'prompt');
        } catch (error) {
          console.error('Error checking location permission:', error);
        }
      }
    };
    
    checkLocationPermission();
  }, []);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const requestUserLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationPermission('granted');
          toast({
            title: "Location Accessed",
            description: "Your location has been used to enhance the AR preview accuracy.",
          });
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationPermission('denied');
          toast({
            title: "Location Access Denied",
            description: "Please enter your address manually for the preview.",
            variant: "destructive"
          });
          setLoading(false);
        }
      );
    } else {
      toast({
        title: "Geolocation Not Supported",
        description: "Your browser does not support geolocation. Please enter your address manually.",
        variant: "destructive"
      });
    }
  };

  const handleFetchPreview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      return toast({
        title: "Address Required",
        description: "Please enter your address to generate an AR preview.",
        variant: "destructive"
      });
    }

    setLoading(true);
    try {
      // Pass user location if available
      const data = await fetchARPreviewData(address, userLocation);
      setPreviewData(data);
      toast({
        title: "AR Preview Generated",
        description: "View your solar panel visualization below.",
      });
    } catch (error) {
      console.error('Error fetching AR preview:', error);
      toast({
        title: "Error",
        description: "Failed to generate AR preview. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-solar-dark text-center mb-8">
          Visualize Solar Panels on Your Roof
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Use our Augmented Reality tool</h2>
              <p className="mb-6 text-gray-700">
                Use our Augmented Reality tool to see exactly how solar panels will 
                look on your home before installation. Get a realistic preview and
                make informed decisions.
              </p>

              {locationPermission !== 'granted' && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-md mb-4">
                  <h3 className="font-bold text-blue-700 mb-2">Enable Location Access</h3>
                  <p className="mb-3 text-sm">
                    For the most accurate AR preview, we recommend sharing your location.
                  </p>
                  <button
                    onClick={requestUserLocation}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                  >
                    Share My Location
                  </button>
                </div>
              )}

              <form onSubmit={handleFetchPreview} className="mb-6">
                <div className="mb-4">
                  <label htmlFor="address" className="block text-gray-700 mb-2">
                    Enter your address to visualize
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={handleAddressChange}
                    placeholder="123 Main St, City, State, PIN"
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-solar-yellow text-solar-dark px-6 py-3 rounded font-bold w-full md:w-auto"
                  disabled={loading}
                >
                  {loading ? 'Generating Preview...' : 'Launch AR Preview'}
                </button>
              </form>
              
              <Link to="/solutions" className="text-solar-dark hover:underline">
                Learn More About Our Solutions
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">AR Panel Preview</h2>
            
            <div className="bg-gray-200 h-72 flex items-center justify-center mb-6 rounded">
              {previewData ? (
                <img 
                  src="/lovable-uploads/68b7d688-e3f2-463c-935f-19538f863f42.png" 
                  alt="AR Solar Panel Visualization" 
                  className="max-w-full max-h-full"
                />
              ) : (
                <p className="text-gray-600">AR visualization will appear here</p>
              )}
            </div>

            {previewData && (
              <div className="space-y-2">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Panel Type:</span>
                  <span>{previewData.panelType}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Estimated Output:</span>
                  <span>{previewData.estimatedOutput}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Coverage:</span>
                  <span>{previewData.coverage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Estimated Savings:</span>
                  <span className="text-green-600 font-bold">{previewData.savingsEstimate}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Benefits of Solar Energy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Save Money</h3>
              <p className="text-gray-700">
                Reduce or eliminate your electricity bills and protect against rising energy costs.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-2">Eco-Friendly</h3>
              <p className="text-gray-700">
                Reduce your carbon footprint and help combat climate change.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-5xl mb-4">🏠</div>
              <h3 className="text-xl font-bold mb-2">Increase Home Value</h3>
              <p className="text-gray-700">
                Solar installations can boost your property value by 4-6%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARPreview;
