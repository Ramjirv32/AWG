import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, unit, icon: Icon, trend, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400',
    success: 'bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-400',
    warning: 'bg-yellow-50 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400',
    error: 'bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-400',
  };

  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {value}
            </p>
            {unit && (
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                {unit}
              </span>
            )}
          </div>
          {trend && (
            <div className="mt-2 flex items-center text-sm">
              {trend.direction === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span
                className={
                  trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
                }
              >
                {trend.value}%
              </span>
              <span className="ml-1 text-gray-500 dark:text-gray-400">
                vs last {trend.period}
              </span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
