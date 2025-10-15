const PHLevelIndicator = ({ phLevel = 7 }) => {
  const getColor = () => {
    if (phLevel < 6.5) return 'text-red-500';
    if (phLevel > 8.5) return 'text-red-500';
    if (phLevel < 7 || phLevel > 8) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getStatus = () => {
    if (phLevel < 6.5) return 'Too Acidic';
    if (phLevel > 8.5) return 'Too Alkaline';
    if (phLevel < 7 || phLevel > 8) return 'Acceptable';
    return 'Optimal';
  };

  const getPosition = () => {
    // Map pH 0-14 to 0-100%
    return (phLevel / 14) * 100;
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        pH Level Monitor
      </h3>

      {/* pH Scale */}
      <div className="relative mt-8 mb-12">
        {/* Gradient bar */}
        <div className="h-8 rounded-lg bg-gradient-to-r from-red-500 via-green-500 to-blue-500"></div>

        {/* Optimal range indicator */}
        <div
          className="absolute top-0 h-8 bg-green-500 bg-opacity-30 border-2 border-green-500"
          style={{ left: '46.4%', width: '10.7%' }}
        ></div>

        {/* Current pH marker */}
        <div
          className="absolute -top-2 transform -translate-x-1/2 transition-all duration-500"
          style={{ left: `${getPosition()}%` }}
        >
          <div className="flex flex-col items-center">
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-900 dark:border-t-white"></div>
            <div className={`mt-1 text-2xl font-bold ${getColor()}`}>
              {phLevel.toFixed(1)}
            </div>
          </div>
        </div>

        {/* Scale markers */}
        <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
          <span>0</span>
          <span>7</span>
          <span>14</span>
        </div>
      </div>

      {/* Status */}
      <div className="text-center">
        <div className={`text-lg font-semibold ${getColor()}`}>
          {getStatus()}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Safe range: 6.5 - 8.5
        </p>
      </div>
    </div>
  );
};

export default PHLevelIndicator;
