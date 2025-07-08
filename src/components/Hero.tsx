import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533134486753-c833f0ed4866?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-8">
          <Shield size={80} className="text-white" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Building Safer Communities Together
        </h1>
        
        <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
          Join our community to make London safer. Access real-time safety information, view incident maps, and stay informed about your surroundings.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate('/map')}
            className="px-8 py-4 bg-white text-purple-900 rounded-lg font-bold hover:bg-purple-100 transition-colors"
          >
            Explore Safety Map
          </button>
          <button 
            onClick={() => {
              navigate('/map');
              // Add a small delay to allow navigation to complete before opening the modal
              setTimeout(() => {
                const reportButton = document.querySelector('[data-report-button]') as HTMLButtonElement;
                if (reportButton) {
                  reportButton.click();
                }
              }, 100);
            }}
            className="px-8 py-4 bg-purple-700 text-white rounded-lg font-bold hover:bg-purple-600 transition-colors"
          >
            Report Incident
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;