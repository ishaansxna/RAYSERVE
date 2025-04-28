
import React from 'react';
import { Link } from 'react-router-dom';

const Solutions: React.FC = () => {
  const solutions = [
    {
      title: 'Residential Solar',
      description: 'Custom solar solutions for homes with smart monitoring systems.',
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b',
    },
    {
      title: 'Commercial Solar',
      description: 'Large-scale solar installations for businesses and industries.',
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
    },
    {
      title: 'Solar Maintenance',
      description: '24/7 monitoring and maintenance services for optimal performance.',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-solar-dark">Our Solar Solutions</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={solution.image} 
                alt={solution.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
                <p className="text-gray-600 mb-4">{solution.description}</p>
                <Link
                  to="/consultant"
                  className="block text-center bg-solar-yellow text-solar-dark px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Solutions;
