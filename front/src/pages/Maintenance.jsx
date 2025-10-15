import { useState, useEffect } from 'react';
import { Plus, Wrench, Clock, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import useStore from '../store/useStore';
import api from '../config/api';

const Maintenance = () => {
  const { maintenanceRequests, setMaintenanceRequests, addMaintenanceRequest } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    type: 'routine',
    priority: 'medium',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMaintenanceRequests();
  }, []);

  const fetchMaintenanceRequests = async () => {
    try {
      const response = await api.get('/maintenance');
      setMaintenanceRequests(response.data);
    } catch (error) {
      console.error('Error fetching maintenance requests:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/maintenance', formData);
      addMaintenanceRequest(response.data);
      setShowModal(false);
      setFormData({ type: 'routine', priority: 'medium', description: '' });
    } catch (error) {
      console.error('Error creating maintenance request:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'badge badge-warning',
      scheduled: 'badge badge-info',
      in_progress: 'badge badge-info',
      completed: 'badge badge-success',
      cancelled: 'badge badge-error',
    };
    return badges[status] || 'badge';
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      low: 'badge badge-info',
      medium: 'badge badge-warning',
      high: 'badge badge-error',
      critical: 'badge badge-error',
    };
    return badges[priority] || 'badge';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Maintenance & Support
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage service requests and maintenance history
          </p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          New Request
        </button>
      </div>

      {/* Maintenance Requests List */}
      <div className="grid grid-cols-1 gap-4">
        {maintenanceRequests.length === 0 ? (
          <div className="card text-center py-12">
            <Wrench className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              No maintenance requests yet
            </p>
          </div>
        ) : (
          maintenanceRequests.map((request) => (
            <div key={request._id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={getStatusBadge(request.status)}>
                      {request.status.replace('_', ' ')}
                    </span>
                    <span className={getPriorityBadge(request.priority)}>
                      {request.priority}
                    </span>
                    <span className="badge">
                      {request.type}
                    </span>
                  </div>
                  <p className="text-gray-900 dark:text-white font-medium mb-2">
                    {request.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 space-x-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {format(new Date(request.timestamp), 'MMM dd, yyyy HH:mm')}
                    </div>
                    {request.status === 'completed' && request.completedDate && (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Completed {format(new Date(request.completedDate), 'MMM dd, yyyy')}
                      </div>
                    )}
                  </div>
                  {request.technicianNotes && (
                    <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Technician Notes:</strong> {request.technicianNotes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Request Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              New Maintenance Request
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Request Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="routine">Routine Maintenance</option>
                  <option value="repair">Repair</option>
                  <option value="emergency">Emergency</option>
                  <option value="inspection">Inspection</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field"
                  rows="4"
                  placeholder="Describe the issue or maintenance needed..."
                  required
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 btn-primary disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Maintenance;
