import React from 'react';
import { Shield, Heart, Users, Target } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mission Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-6">Our Mission</h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Creating safer communities through innovative technology and real-time information sharing.
          </p>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { icon: <Shield className="text-purple-400" size={32} />, title: 'Safety First', description: 'Prioritizing community safety through real-time monitoring and alerts.' },
            { icon: <Heart className="text-purple-400" size={32} />, title: 'Community Care', description: 'Building stronger, more connected neighborhoods.' },
            { icon: <Users className="text-purple-400" size={32} />, title: 'Inclusivity', description: 'Creating a platform that serves everyone in our community.' },
            { icon: <Target className="text-purple-400" size={32} />, title: 'Empowerment', description: 'Providing tools and information for informed decision-making.' }
          ].map((value, index) => (
            <div key={index} className="bg-purple-900/50 p-6 rounded-lg text-center hover:bg-purple-900/70 transition-colors">
              <div className="flex justify-center mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
              <p className="text-purple-200">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Vision Section */}
        <div className="bg-purple-900/50 p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
          <p className="text-lg text-purple-200 max-w-3xl mx-auto">
            We envision a London where technology and community collaboration create safer spaces for everyone. Through real-time data sharing and community engagement, we're building a network that empowers residents to make informed decisions about their safety.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;