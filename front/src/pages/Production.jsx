import { useEffect, useState } from 'react';
import { Droplets } from 'lucide-react';
import api from '../config/api';
import ProductionChart from '../components/Dashboard/ProductionChart';

const Production = () => {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState(null);
  const [period, setPeriod] = useState('day');

  useEffect(() => {
    fetchData();
  }, [period]);

  const fetchData = async () => {
    try {
      const [historyRes, statsRes] = await Promise.all([
        api.get('/sensors/historical'),
        api.get(`/sensors/stats?period=${period}`),
      ]);
      setData(historyRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Error fetching production data:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Water Production
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Detailed production analytics and trends
          </p>
        </div>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="input-field w-auto"
        >
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Production</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stats.totalProduction?.toFixed(2) || 0} L
                </p>
              </div>
              <Droplets className="w-8 h-8 text-primary-600" />
            </div>
          </div>
          <div className="card">
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg Temperature</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {stats.avgTemperature?.toFixed(1) || 0}°C
            </p>
          </div>
          <div className="card">
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg Humidity</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {stats.avgHumidity?.toFixed(0) || 0}%
            </p>
          </div>
          <div className="card">
            <p className="text-sm text-gray-600 dark:text-gray-400">Power Used</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {stats.totalPowerConsumption?.toFixed(2) || 0} kWh
            </p>
          </div>
        </div>
      )}

      <ProductionChart data={data} type="area" />
    </div>
  );
};

export default Production;
