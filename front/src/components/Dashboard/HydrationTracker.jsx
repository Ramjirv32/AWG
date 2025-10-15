import { Droplet } from 'lucide-react';

const HydrationTracker = ({ consumed = 0, goal = 2000 }) => {
  const percentage = Math.min((consumed / goal) * 100, 100);

  const getColor = () => {
    if (percentage < 30) return 'bg-red-500';
    if (percentage < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Daily Hydration Goal
        </h3>
        <Droplet className="w-6 h-6 text-blue-500" />
      </div>

      {/* Progress ring */}
      <div className="relative w-48 h-48 mx-auto">
        <svg className="transform -rotate-90 w-48 h-48">
          {/* Background circle */}
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress circle */}
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={`${2 * Math.PI * 88}`}
            strokeDashoffset={`${2 * Math.PI * 88 * (1 - percentage / 100)}`}
            className={`${getColor().replace('bg-', 'text-')} transition-all duration-1000`}
            strokeLinecap="round"
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-gray-900 dark:text-white">
            {percentage.toFixed(0)}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {consumed} / {goal} ml
          </div>
        </div>
      </div>

      {/* Action button */}
      <button className="w-full mt-6 btn-primary">
        Log Water Intake
      </button>
    </div>
  );
};

export default HydrationTracker;
