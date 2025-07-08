import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { MapIcon, Filter, Search, AlertTriangle, X, Eye, EyeOff } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.heat';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Heat map layer component
function HeatmapLayer({ incidents }: { incidents: Incident[] }) {
  const map = useMap();
  const heatmapLayerRef = useRef<any>(null);

  useEffect(() => {
    if (!map) return;

    if (heatmapLayerRef.current) {
      map.removeLayer(heatmapLayerRef.current);
    }

    const points = incidents.map(incident => [
      incident.coordinates[0],
      incident.coordinates[1],
      0.5
    ]);

    heatmapLayerRef.current = (L as any).heatLayer(points, {
      radius: 35,
      blur: 25,
      maxZoom: 15,
      minOpacity: 0.4,
      gradient: {
        0.2: '#9333ea',
        0.4: '#7e22ce',
        0.6: '#6b21a8',
        0.8: '#581c87',
        1.0: '#3b0764'
      }
    }).addTo(map);

    return () => {
      if (heatmapLayerRef.current) {
        map.removeLayer(heatmapLayerRef.current);
      }
    };
  }, [map, incidents]);

  return null;
}

interface Incident {
  id: number;
  type: string;
  location: string;
  description: string;
  date: string;
  coordinates: [number, number];
  postcode?: string;
}

const incidentTypes = [
  'Harassment',
  'Sexual Assault',
  'Stalking & Following',
  'Mugging & Robbery',
  'Drink Spiking',
  'Physical Assault',
  'Kidnapping',
  'Hate Crimes',
  'Transport Crimes',
  'Gang Violence'
];

const sampleIncidents: Incident[] = [
  { id: 1, type: 'Harassment', location: 'Oxford Street', description: 'Verbal harassment near station', date: '2024-03-15', coordinates: [51.5152, -0.1418], postcode: 'W1C 1JH' },
  { id: 2, type: 'Stalking & Following', location: 'Piccadilly Circus', description: 'Suspicious following reported', date: '2024-03-14', coordinates: [51.5099, -0.1337], postcode: 'W1J 9HP' },
  { id: 3, type: 'Transport Crimes', location: 'Victoria Station', description: 'Incident on platform', date: '2024-03-13', coordinates: [51.4952, -0.1441], postcode: 'SW1V 1JU' },
  { id: 4, type: 'Harassment', location: 'Camden Town', description: 'Street harassment reported', date: '2024-03-15', coordinates: [51.5390, -0.1426], postcode: 'NW1 7BY' },
  { id: 5, type: 'Physical Assault', location: 'Finsbury Park', description: 'Assault near park entrance', date: '2024-03-14', coordinates: [51.5642, -0.1066], postcode: 'N4 2NQ' }
];

const SafetyMap = () => {
  const [incidents, setIncidents] = useState<Incident[]>(sampleIncidents);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('fatima');
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingIncident, setEditingIncident] = useState<Incident | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [postcodeError, setPostcodeError] = useState('');
  const [isValidatingPostcode, setIsValidatingPostcode] = useState(false);

  const [newIncident, setNewIncident] = useState({
    type: '',
    location: '',
    description: '',
    coordinates: [51.5074, -0.1278] as [number, number],
    postcode: ''
  });

  const validatePostcode = async (postcode: string): Promise<{ isValid: boolean; coordinates: [number, number] | null }> => {
    try {
      const response = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`);
      const data = await response.json();
      
      if (response.ok && data.result) {
        return {
          isValid: true,
          coordinates: [data.result.latitude, data.result.longitude]
        };
      }
      return { isValid: false, coordinates: null };
    } catch (error) {
      console.error('Error validating postcode:', error);
      return { isValid: false, coordinates: null };
    }
  };

  const getIncidentCountByType = (type: string) => {
    return incidents.filter(incident => incident.type === type).length;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'fatima') {
      setIsAdmin(true);
      setShowLoginModal(false);
      setShowAdminDashboard(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setShowAdminDashboard(false);
  };

  const handleDeleteIncident = (id: number) => {
    setIncidents(prev => prev.filter(incident => incident.id !== id));
  };

  const handleEditIncident = (incident: Incident) => {
    setEditingIncident(incident);
    setNewIncident({
      type: incident.type,
      location: incident.location,
      description: incident.description,
      coordinates: incident.coordinates,
      postcode: incident.postcode || ''
    });
    setShowReportModal(true);
  };

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setPostcodeError('');

    if (!newIncident.postcode) {
      setPostcodeError('Postcode is required');
      return;
    }

    setIsValidatingPostcode(true);
    const postcodeValidation = await validatePostcode(newIncident.postcode);
    setIsValidatingPostcode(false);
    
    if (!postcodeValidation.isValid) {
      setPostcodeError('Invalid postcode');
      return;
    }

    if (editingIncident) {
      setIncidents(prev => prev.map(incident => 
        incident.id === editingIncident.id 
          ? { 
              ...incident, 
              ...newIncident,
              coordinates: postcodeValidation.coordinates || incident.coordinates
            }
          : incident
      ));
      setEditingIncident(null);
    } else {
      const newId = Math.max(...incidents.map(i => i.id)) + 1;
      const incident: Incident = {
        id: newId,
        ...newIncident,
        coordinates: postcodeValidation.coordinates || newIncident.coordinates,
        date: new Date().toISOString().split('T')[0]
      };
      setIncidents(prev => [...prev, incident]);
    }
    
    setShowReportModal(false);
    setNewIncident({
      type: '',
      location: '',
      description: '',
      coordinates: [51.5074, -0.1278],
      postcode: ''
    });
  };

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const filteredIncidents = incidents.filter(incident => {
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(incident.type);
    const matchesSearch = incident.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         incident.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (incident.postcode && incident.postcode.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <MapIcon className="text-purple-400" />
            Safety Map
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                showHeatmap 
                  ? 'bg-purple-700 text-white hover:bg-purple-600'
                  : 'bg-purple-200 text-purple-900 hover:bg-purple-300'
              }`}
            >
              {showHeatmap ? 'Hide Heatmap' : 'Show Heatmap'}
            </button>
            <button 
              data-report-button
              onClick={() => setShowReportModal(true)}
              className="px-4 py-2 bg-purple-700 text-white rounded-lg font-bold hover:bg-purple-600 transition-colors flex items-center gap-2"
            >
              <AlertTriangle size={18} />
              Report Incident
            </button>
            {!isAdmin ? (
              <button 
                onClick={() => setShowLoginModal(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-500 transition-colors"
              >
                Admin Login
              </button>
            ) : (
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-500 transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {!showAdminDashboard ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="bg-purple-900/50 p-6 rounded-lg">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" size={18} />
                  <input
                    type="text"
                    placeholder="Search location or postcode..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-purple-800/50 border border-purple-700 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Filter size={18} className="text-purple-400" />
                  Filters
                </h3>
                
                {incidentTypes.map((type) => (
                  <label key={type} className="flex items-center justify-between hover:bg-purple-800/30 p-2 rounded-lg cursor-pointer group">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleType(type)}
                        className="form-checkbox text-purple-500"
                      />
                      <span className="text-purple-100">{type}</span>
                    </div>
                    <span className="text-purple-400 text-sm bg-purple-800/50 px-2 py-1 rounded-full group-hover:bg-purple-700/50">
                      {getIncidentCountByType(type)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 bg-purple-900/30 rounded-lg h-[600px] overflow-hidden">
              <MapContainer
                center={[51.5074, -0.1278]}
                zoom={12}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
              >
                <TileLayer
                  attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {showHeatmap && <HeatmapLayer incidents={filteredIncidents} />}
                {filteredIncidents.map((incident) => (
                  <Marker
                    key={incident.id}
                    position={incident.coordinates}
                  >
                    <Popup className="custom-popup">
                      <div className="p-2">
                        <h3 className="font-bold text-lg">{incident.type}</h3>
                        <p className="text-sm text-gray-600">{incident.location}</p>
                        {incident.postcode && (
                          <p className="text-sm text-gray-600">Postcode: {incident.postcode}</p>
                        )}
                        <p className="text-sm mt-2">{incident.description}</p>
                        <p className="text-xs text-gray-500 mt-2">Reported: {incident.date}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        ) : (
          <div className="bg-purple-900/50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Admin Dashboard - Incident Reports</h2>
            <div className="space-y-4">
              {incidents.map((incident) => (
                <div key={incident.id} className="bg-purple-800/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{incident.type}</h3>
                      <p className="text-purple-200">Location: {incident.location}</p>
                      <p className="text-purple-200">Postcode: {incident.postcode}</p>
                      <p className="text-purple-200">Date: {incident.date}</p>
                      <p className="text-purple-200">Description: {incident.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditIncident(incident)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteIncident(incident.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showLoginModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center" style={{ zIndex: 9999 }}>
            <div className="bg-purple-900 p-8 rounded-lg w-full max-w-md relative">
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-purple-200 hover:text-white"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-2xl font-bold text-white mb-6">Admin Login</h2>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-purple-200 mb-2">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    className="w-full px-4 py-2 bg-purple-800/50 border border-purple-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-purple-200 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-purple-800/50 border border-purple-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="text-purple-300 text-sm mt-1">Demo password: fatima</p>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-purple-700 text-white rounded-lg font-bold hover:bg-purple-600 transition-colors"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        )}

        {showReportModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center" style={{ zIndex: 9999 }}>
            <div className="bg-purple-900 p-8 rounded-lg w-full max-w-md relative">
              <button
                onClick={() => {
                  setShowReportModal(false);
                  setEditingIncident(null);
                  setNewIncident({
                    type: '',
                    location: '',
                    description: '',
                    coordinates: [51.5074, -0.1278],
                    postcode: ''
                  });
                  setPostcodeError('');
                }}
                className="absolute top-4 right-4 text-purple-200 hover:text-white"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-2xl font-bold text-white mb-6">
                {editingIncident ? 'Edit Incident' : 'Report an Incident'}
              </h2>
              
              <form onSubmit={handleSubmitReport} className="space-y-4">
                <div>
                  <label className="block text-purple-200 mb-2">Incident Type</label>
                  <select
                    required
                    value={newIncident.type}
                    onChange={(e) => setNewIncident(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-4 py-2 bg-purple-800/50 border border-purple-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select type</option>
                    {incidentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-purple-200 mb-2">Postcode</label>
                  <input
                    type="text"
                    required
                    value={newIncident.postcode}
                    onChange={(e) => {
                      setNewIncident(prev => ({ ...prev, postcode: e.target.value.toUpperCase() }));
                      setPostcodeError('');
                    }}
                    className={`w-full px-4 py-2 bg-purple-800/50 border ${
                      postcodeError ? 'border-red-500' : 'border-purple-700'
                    } rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="Enter postcode (e.g., SW1A 1AA)"
                    disabled={isValidatingPostcode}
                  />
                  {postcodeError && (
                    <p className="text-red-500 text-sm mt-1">{postcodeError}</p>
                  )}
                  {isValidatingPostcode && (
                    <p className="text-purple-300 text-sm mt-1">Validating postcode...</p>
                  )}
                </div>

                <div>
                  <label className="block text-purple-200 mb-2">Location Description</label>
                  <input
                    type="text"
                    required
                    value={newIncident.location}
                    onChange={(e) => setNewIncident(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-2 bg-purple-800/50 border border-purple-700 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter location description"
                  />
                </div>

                <div>
                  <label className="block text-purple-200 mb-2">Incident Description</label>
                  <textarea
                    required
                    value={newIncident.description}
                    onChange={(e) => setNewIncident(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-2 bg-purple-800/50 border border-purple-700 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
                    placeholder="Describe the incident..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-purple-700 text-white rounded-lg font-bold hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
                  disabled={isValidatingPostcode}
                >
                  <AlertTriangle size={18} />
                  {editingIncident ? 'Update Incident' : 'Submit Report'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SafetyMap;