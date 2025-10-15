import { useEffect, useState } from 'react';
import { Plus, Droplet, Coffee, Utensils } from 'lucide-react';
import api from '../config/api';
import socket from '../config/socket';
import useStore from '../store/useStore';
import HydrationTracker from '../components/Dashboard/HydrationTracker';

const Consumption = () => {
  const [hydration, setHydration] = useState({ consumed: 0, goal: 2000 });
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('250');
  const [type, setType] = useState('drinking');
  const [recentLogs, setRecentLogs] = useState([]);

  useEffect(() => {
    fetchHydration();
    fetchRecentLogs();

    // Connect to socket for real-time updates
    socket.connect();

    const user = useStore.getState().user;
    if (user) {
      socket.emit('join', user._id);
    }

    socket.on('consumptionUpdate', () => {
      fetchHydration();
      fetchRecentLogs();
    });

    return () => {
      socket.off('consumptionUpdate');
    };
  }, []);

  const fetchHydration = async () => {
    try {
      const response = await api.get('/consumption/hydration/daily');
      setHydration(response.data);
    } catch (error) {
      console.error('Error fetching hydration:', error);
    }
  };

  const fetchRecentLogs = async () => {
    try {
      const response = await api.get('/consumption?limit=10');
      setRecentLogs(response.data);
    } catch (error) {
      console.error('Error fetching recent logs:', error);
    }
  };

  const handleLogWater = async (e) => {
    e.preventDefault();
    try {
      await api.post('/consumption', {
        amount: parseInt(amount),
        type: type,
      });
      fetchHydration();
      fetchRecentLogs();
      setShowModal(false);
      setAmount('250');
      setType('drinking');
    } catch (error) {
      console.error('Error logging water:', error);
    }
  };

  const quickLog = async (quickAmount) => {
    try {
      await api.post('/consumption', {
        amount: quickAmount,
        type: 'drinking',
      });
      fetchHydration();
      fetchRecentLogs();
    } catch (error) {
      console.error('Error logging water:', error);
    }
  };

  const getTypeIcon = (consumptionType) => {
    switch(consumptionType) {
      case 'drinking': return Droplet;
      case 'cooking': return Utensils;
      default: return Droplet;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Water Usage & Hydration
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your water consumption and hydration goals
          </p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Log Water
        </button>
      </div>

      {/* Quick Log Buttons */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Log
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[250, 500, 750, 1000].map((quickAmount) => (
            <button
              key={quickAmount}
              onClick={() => quickLog(quickAmount)}
              className="p-4 bg-primary-50 dark:bg-primary-900 hover:bg-primary-100 dark:hover:bg-primary-800 rounded-lg transition-colors"
            >
              <Droplet className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <p className="text-lg font-bold text-gray-900 dark:text-white">{quickAmount}ml</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HydrationTracker consumed={hydration.consumed} goal={hydration.goal} />
        
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          {recentLogs.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 text-center py-8">
              No water logged yet. Start tracking your hydration!
            </p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {recentLogs.map((log) => {
                const Icon = getTypeIcon(log.type);
                return (
                  <div key={log._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {log.amount}ml
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                          {log.type}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Hydration Tips */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Hydration Tips
        </h3>
        <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">•</span>
            Drink water first thing in the morning to kickstart your metabolism
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">•</span>
            Keep a water bottle with you throughout the day
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">•</span>
            Drink before, during, and after exercise
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">•</span>
            Set reminders to drink water regularly
          </li>
        </ul>
      </div>

      {/* Log Water Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Log Water Intake
            </h2>
            <form onSubmit={handleLogWater} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="input-field"
                >
                  <option value="drinking">Drinking</option>
                  <option value="cooking">Cooking</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amount (ml)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="input-field"
                  min="1"
                  required
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {[250, 500, 750, 1000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(preset.toString())}
                      className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      {preset}ml
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 btn-primary">
                  Log Water
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Consumption;
