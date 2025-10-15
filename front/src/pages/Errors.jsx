import { useEffect } from 'react';
import useStore from '../store/useStore';
import api from '../config/api';
import ErrorList from '../components/Errors/ErrorList';

const Errors = () => {
  const { errors, errorStats, setErrors, setErrorStats } = useStore();

  useEffect(() => {
    fetchErrors();
  }, []);

  const fetchErrors = async () => {
    try {
      const [errorsRes, statsRes] = await Promise.all([
        api.get('/errors'),
        api.get('/errors/stats'),
      ]);
      setErrors(errorsRes.data);
      setErrorStats(statsRes.data);
    } catch (error) {
      console.error('Error fetching errors:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          System Health & Errors
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Monitor system errors and alerts
        </p>
      </div>

      {errorStats.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {errorStats.map((stat) => (
            <div key={stat._id} className="card">
              <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                {stat._id} Errors
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stat.count}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {stat.unresolved} unresolved
              </p>
            </div>
          ))}
        </div>
      )}

      <ErrorList errors={errors} />
    </div>
  );
};

export default Errors;
