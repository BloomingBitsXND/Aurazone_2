import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, BarChart as ChartBar, AlertTriangle, TrendingUp } from 'lucide-react';

interface Crime {
  category: string;
  outcome_status: {
    category: string;
    date: string;
  } | null;
}

const Statistics = () => {
  const [crimes, setCrimes] = useState<Crime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCrimes = async () => {
      try {
        // Using a more recent date that's available in the API
        const response = await fetch(
          'https://data.police.uk/api/crimes-no-location?category=all-crime&force=metropolitan&date=2023-12'
        );
        if (!response.ok) throw new Error('Failed to fetch crime data');
        const data = await response.json();
        setCrimes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch crime data');
      } finally {
        setLoading(false);
      }
    };

    fetchCrimes();
  }, []);

  const getCrimesByCategory = () => {
    const categories: { [key: string]: number } = {};
    crimes.forEach((crime) => {
      categories[crime.category] = (categories[crime.category] || 0) + 1;
    });
    return Object.entries(categories).map(([name, value]) => ({
      name: name.replace(/-/g, ' ').split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '),
      value
    }));
  };

  const getOutcomeStatistics = () => {
    const outcomes: { [key: string]: number } = {};
    crimes.forEach((crime) => {
      const outcome = crime.outcome_status?.category || 'Under Investigation';
      outcomes[outcome] = (outcomes[outcome] || 0) + 1;
    });
    return outcomes;
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-white">Loading crime statistics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  const crimesByCategory = getCrimesByCategory();
  const outcomeStats = getOutcomeStatistics();

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-2 mb-8">
          <ChartBar className="text-purple-400" />
          Crime Statistics
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-purple-900/50 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Total Reports</h3>
              <PieChart className="text-purple-400" size={24} />
            </div>
            <p className="text-3xl font-bold text-white">{crimes.length}</p>
          </div>
          
          <div className="bg-purple-900/50 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Categories</h3>
              <AlertTriangle className="text-purple-400" size={24} />
            </div>
            <p className="text-3xl font-bold text-white">{crimesByCategory.length}</p>
          </div>
          
          <div className="bg-purple-900/50 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Solved Cases</h3>
              <TrendingUp className="text-purple-400" size={24} />
            </div>
            <p className="text-3xl font-bold text-white">
              {crimes.filter(crime => crime.outcome_status?.category).length}
            </p>
          </div>
        </div>

        {/* Crime Categories Chart */}
        <div className="bg-purple-900/50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">Crimes by Category</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={crimesByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={100} 
                  stroke="#E5E7EB"
                />
                <YAxis stroke="#E5E7EB" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#E5E7EB'
                  }}
                />
                <Bar dataKey="value" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Outcome Statistics */}
        <div className="bg-purple-900/50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-6">Case Outcomes</h2>
          <div className="space-y-4">
            {Object.entries(outcomeStats).map(([outcome, count]) => (
              <div key={outcome} className="flex items-center justify-between">
                <span className="text-purple-200">
                  {outcome.replace(/-/g, ' ').split(' ').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-white font-semibold">{count}</span>
                  <div className="w-32 h-2 bg-purple-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-400"
                      style={{ width: `${(count / crimes.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;