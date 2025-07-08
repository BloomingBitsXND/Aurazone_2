import React from 'react';
import { Map, Bell, Shield, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Map className="w-12 h-12 text-purple-400" />,
      title: "Interactive Safety Map",
      description: "View and report incidents on our real-time map to help identify safer routes."
    },
    {
      icon: <Bell className="w-12 h-12 text-purple-400" />,
      title: "Real-time Alerts",
      description: "Receive instant notifications about safety concerns in your area."
    },
    {
      icon: <Shield className="w-12 h-12 text-purple-400" />,
      title: "Verified Reports",
      description: "Community-verified incident reports to ensure accuracy and reliability."
    },
    {
      icon: <Users className="w-12 h-12 text-purple-400" />,
      title: "Community Support",
      description: "Connect with a network of women supporting each other's safety."
    }
  ];

  return (
    <section className="py-20 bg-purple-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-12">How It Works</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-purple-900/50 p-6 rounded-lg hover:bg-purple-900/70 transition-colors">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-2">
                {feature.title}
              </h3>
              <p className="text-purple-200 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;