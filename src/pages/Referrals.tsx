
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Referrals: React.FC = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const [referralLink] = useState(`https://ishaan-solar.com/ref/${currentUser?.uid || 'USER123'}`);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    toast({
      title: "Link Copied",
      description: "Referral link copied to clipboard!",
    });
    
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleShare = (platform: string) => {
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Check out Ishaan Solar for amazing solar energy solutions!')}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out Ishaan Solar for amazing solar energy solutions! ${referralLink}`)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent('Ishaan Solar Referral')}&body=${encodeURIComponent(`I thought you might be interested in Ishaan Solar's energy solutions. Check it out: ${referralLink}`)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-solar-dark text-center mb-8">
          Customer Referral Program
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Refer Friends, Earn Rewards</h2>
              <p className="mb-6 text-gray-700">
                Share your positive experience with friends and family. 
                For every successful referral, both you and your friend
                will receive exclusive benefits.
              </p>

              <div className="bg-gray-100 p-6 rounded-md mb-6">
                <h3 className="font-bold mb-4">How It Works:</h3>
                <ol className="list-decimal ml-5 space-y-2">
                  <li>Share your unique referral link with friends</li>
                  <li>Your friend signs up for a solar consultation</li>
                  <li>If they become a customer, you both get rewards</li>
                  <li>Track all your referrals in your dashboard</li>
                </ol>
              </div>

              <div className="bg-solar-dark text-white p-6 rounded-md">
                <h3 className="font-bold mb-4">Your Referral Rewards:</h3>
                <ul className="list-disc ml-5 space-y-2">
                  <li>₹15,000 account credit for each successful referral</li>
                  <li>Free system maintenance check</li>
                  <li>Exclusive access to premium solar upgrades</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-50 p-8 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-6">Share Your Referral Link</h2>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Your Unique Referral Link</label>
                <div className="flex">
                  <input
                    type="text"
                    value={referralLink}
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-l bg-white"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="bg-solar-dark text-white px-4 py-2 rounded-r hover:bg-opacity-90"
                  >
                    {copiedLink ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-bold mb-4">Share via:</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded"
                  >
                    Facebook
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex-1 bg-blue-400 text-white py-2 px-4 rounded"
                  >
                    Twitter
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="flex-1 bg-blue-800 text-white py-2 px-4 rounded"
                  >
                    LinkedIn
                  </button>
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="flex-1 bg-green-500 text-white py-2 px-4 rounded"
                  >
                    WhatsApp
                  </button>
                  <button
                    onClick={() => handleShare('email')}
                    className="flex-1 bg-gray-700 text-white py-2 px-4 rounded"
                  >
                    Email
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4">Referral Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-md text-center">
                    <h4 className="text-3xl font-bold">3</h4>
                    <p className="text-sm text-gray-600">Pending Referrals</p>
                  </div>
                  <div className="bg-white p-4 rounded-md text-center">
                    <h4 className="text-3xl font-bold text-green-600">2</h4>
                    <p className="text-sm text-gray-600">Successful Referrals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
