import React from 'react';
import { Bell, AlertTriangle, AlertCircle } from 'lucide-react';

const Alerts = () => {
  const alerts = [
    {
      type: 'high',
      title: 'High-Risk Alert: Camden Area',
      description: 'Multiple reports of suspicious activity near Camden Station. Exercise caution when traveling in this area after dark.',
      time: '2 hours ago'
    },
    {
      type: 'medium',
      title: 'Poor Street Lighting: Islington',
      description: 'Several street lights are non-functional on Upper Street. Alternative routes recommended during evening hours.',
      time: '4 hours ago'
    },
    {
      type: 'low',
      title: 'Community Notice: Westminster',
      description: 'Increased police patrols in response to recent reports. Stay vigilant and report any suspicious activity.',
      time: '6 hours ago'
    }
  ];

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-2 mb-8">
          <Bell className="text-purple-400" />
          Safety Alerts
        </h1>

        <div className="grid gap-6">
          {alerts.map((alert, index) => (
            <div key={index} className={`
              p-6 rounded-lg border-l-4 
              ${alert.type === 'high' ? 'bg-red-900/20 border-red-500' : 
                alert.type === 'medium' ? 'bg-yellow-900/20 border-yellow-500' : 
                'bg-purple-900/20 border-purple-500'}
            `}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {alert.type === 'high' ? (
                    <AlertTriangle className="text-red-500 mt-1" />
                  ) : (
                    <AlertCircle className={alert.type === 'medium' ? 'text-yellow-500 mt-1' : 'text-purple-500 mt-1'} />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{alert.title}</h3>
                    <p className="text-purple-200 mb-2">{alert.description}</p>
                    <p className="text-sm text-purple-300">{alert.time}</p>
                  </div>
                </div>
                <button className="text-purple-300 hover:text-white">
                  <Bell size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Alerts;