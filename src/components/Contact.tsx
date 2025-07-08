import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h1 className="text-4xl font-bold text-white mb-8">Get in Touch</h1>
            <p className="text-purple-200 mb-8">
              Have questions or concerns? We're here to help. Reach out to us through any of the following channels.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-900/50 p-3 rounded-lg">
                  <Mail className="text-purple-400" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Email</h3>
                  <p className="text-purple-200">support@aurazone.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-purple-900/50 p-3 rounded-lg">
                  <Phone className="text-purple-400" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Phone</h3>
                  <p className="text-purple-200">+44 20 1234 5678</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-purple-900/50 p-3 rounded-lg">
                  <MapPin className="text-purple-400" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Location</h3>
                  <p className="text-purple-200">London, United Kingdom</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-purple-900/50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-purple-200 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-purple-800/50 border border-purple-700 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-purple-200 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-purple-800/50 border border-purple-700 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-purple-200 mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-2 bg-purple-800/50 border border-purple-700 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-purple-700 text-white rounded-lg font-bold hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;