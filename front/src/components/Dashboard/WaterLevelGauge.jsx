const WaterLevelGauge = ({ level = 0 }) => {
  const getColor = () => {
    if (level < 20) return 'bg-red-500';
    if (level < 50) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const getStatusText = () => {
    if (level < 20) return 'Low';
    if (level < 50) return 'Medium';
    if (level < 80) return 'Good';
    return 'Full';
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Water Tank Level
      </h3>
      
      <div className="relative">
        {/* Tank container */}
        <div className="relative w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden border-4 border-gray-300 dark:border-gray-600">
          {/* Water level */}
          <div
            className={`absolute bottom-0 left-0 right-0 ${getColor()} transition-all duration-1000 ease-out`}
            style={{ height: `${level}%` }}
          >
            {/* Wave animation */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent"></div>
            </div>
          </div>

          {/* Level markers */}
          {[0, 25, 50, 75, 100].map((marker) => (
            <div
              key={marker}
              className="absolute left-0 right-0 border-t border-gray-400 dark:border-gray-500 border-dashed"
              style={{ bottom: `${marker}%` }}
            >
              <span className="absolute -left-12 -top-2 text-xs text-gray-600 dark:text-gray-400">
                {marker}%
              </span>
            </div>
          ))}
        </div>

        {/* Current level display */}
        <div className="mt-4 text-center">
          <div className="text-4xl font-bold text-gray-900 dark:text-white">
            {level.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Status: <span className="font-semibold">{getStatusText()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterLevelGauge;
