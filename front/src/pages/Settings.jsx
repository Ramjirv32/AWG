import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import useStore from '../store/useStore';
import api from '../config/api';

const Settings = () => {
  const { user, setUser } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    weight: '',
    activityLevel: 'moderate',
    hydrationGoal: 2000,
    theme: 'light',
    notifications: {
      hydration: true,
      maintenance: true,
      errors: true,
    },
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        age: user.age || '',
        weight: user.weight || '',
        activityLevel: user.activityLevel || 'moderate',
        hydrationGoal: user.hydrationGoal || 2000,
        theme: user.preferences?.theme || 'light',
        notifications: user.preferences?.notifications || {
          hydration: true,
          maintenance: true,
          errors: true,
        },
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await api.put('/auth/profile', {
        name: formData.name,
        email: formData.email,
        age: formData.age ? parseInt(formData.age) : undefined,
        weight: formData.weight ? parseInt(formData.weight) : undefined,
        activityLevel: formData.activityLevel,
        hydrationGoal: parseInt(formData.hydrationGoal),
        preferences: {
          theme: formData.theme,
          notifications: formData.notifications,
        },
      });

      setUser(response.data, response.data.token);
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to save settings',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('notifications.')) {
      const notifKey = name.split('.')[1];
      setFormData({
        ...formData,
        notifications: {
          ...formData.notifications,
          [notifKey]: checked,
        },
      });
    } else {
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your account and preferences
        </p>
      </div>

      {message.text && (
        <div
          className={`p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-200'
              : 'bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Information */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Profile Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="input-field"
                min="1"
                max="120"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="input-field"
                min="1"
              />
            </div>
          </div>
        </div>

        {/* Hydration Settings */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Hydration Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Activity Level
              </label>
              <select
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                className="input-field"
              >
                <option value="sedentary">Sedentary</option>
                <option value="light">Light Activity</option>
                <option value="moderate">Moderate Activity</option>
                <option value="active">Active</option>
                <option value="very_active">Very Active</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Daily Hydration Goal (ml)
              </label>
              <input
                type="number"
                name="hydrationGoal"
                value={formData.hydrationGoal}
                onChange={handleChange}
                className="input-field"
                min="500"
                max="5000"
                step="100"
              />
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Notification Preferences
          </h2>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="notifications.hydration"
                checked={formData.notifications.hydration}
                onChange={handleChange}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                Hydration reminders
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="notifications.maintenance"
                checked={formData.notifications.maintenance}
                onChange={handleChange}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                Maintenance alerts
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="notifications.errors"
                checked={formData.notifications.errors}
                onChange={handleChange}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                Error notifications
              </span>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
