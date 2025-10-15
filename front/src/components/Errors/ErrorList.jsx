import { AlertTriangle, Info, XCircle, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

const ErrorList = ({ errors = [] }) => {
  const getSeverityConfig = (severity) => {
    const configs = {
      critical: {
        icon: XCircle,
        color: 'text-red-500',
        bgColor: 'bg-red-50 dark:bg-red-900',
        borderColor: 'border-red-200 dark:border-red-800',
      },
      warning: {
        icon: AlertTriangle,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-50 dark:bg-yellow-900',
        borderColor: 'border-yellow-200 dark:border-yellow-800',
      },
      info: {
        icon: Info,
        color: 'text-blue-500',
        bgColor: 'bg-blue-50 dark:bg-blue-900',
        borderColor: 'border-blue-200 dark:border-blue-800',
      },
    };
    return configs[severity] || configs.info;
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent Errors & Alerts
      </h3>

      <div className="space-y-3">
        {errors.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
            <p className="text-gray-600 dark:text-gray-400">
              No errors detected. System running smoothly!
            </p>
          </div>
        ) : (
          errors.map((error) => {
            const config = getSeverityConfig(error.severity);
            const Icon = config.icon;

            return (
              <div
                key={error._id}
                className={`${config.bgColor} ${config.borderColor} border rounded-lg p-4`}
              >
                <div className="flex items-start">
                  <Icon className={`w-5 h-5 ${config.color} mt-0.5 flex-shrink-0`} />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                        {error.message}
                      </h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {format(new Date(error.timestamp), 'MMM dd, HH:mm')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {error.description || error.errorCode}
                    </p>
                    {!error.resolved && (
                      <button className="mt-2 text-xs text-primary-600 dark:text-primary-400 hover:underline">
                        Mark as Resolved
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ErrorList;
