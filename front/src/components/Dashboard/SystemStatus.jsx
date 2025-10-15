import { CheckCircle, AlertTriangle, XCircle, Wrench } from 'lucide-react';

const SystemStatus = ({ status = 'operational' }) => {
  const statusConfig = {
    operational: {
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900',
      label: 'Operational',
      description: 'All systems running normally',
    },
    warning: {
      icon: AlertTriangle,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900',
      label: 'Warning',
      description: 'Minor issues detected',
    },
    error: {
      icon: XCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900',
      label: 'Error',
      description: 'Critical issues require attention',
    },
    maintenance: {
      icon: Wrench,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900',
      label: 'Maintenance',
      description: 'System under maintenance',
    },
  };

  const config = statusConfig[status] || statusConfig.operational;
  const Icon = config.icon;

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        System Status
      </h3>

      <div className={`${config.bgColor} rounded-lg p-6 text-center`}>
        <Icon className={`w-16 h-16 mx-auto ${config.color}`} />
        <h4 className={`text-2xl font-bold mt-4 ${config.color}`}>
          {config.label}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {config.description}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-600 dark:text-gray-400">Uptime</p>
          <p className="font-semibold text-gray-900 dark:text-white">99.8%</p>
        </div>
        <div>
          <p className="text-gray-600 dark:text-gray-400">Last Check</p>
          <p className="font-semibold text-gray-900 dark:text-white">Just now</p>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
