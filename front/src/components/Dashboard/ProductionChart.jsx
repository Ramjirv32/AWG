import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { format } from 'date-fns';

const ProductionChart = ({ data = [], type = 'line' }) => {
  const formattedData = data.map((item) => ({
    ...item,
    time: format(new Date(item.timestamp), 'HH:mm'),
    date: format(new Date(item.timestamp), 'MMM dd'),
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {payload[0].payload.date} {payload[0].payload.time}
          </p>
          <p className="text-sm text-primary-600 dark:text-primary-400">
            Production: {payload[0].value.toFixed(2)} L
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Water Production Trend
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        {type === 'area' ? (
          <AreaChart data={formattedData}>
            <defs>
              <linearGradient id="colorProduction" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1890ff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#1890ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
            <XAxis
              dataKey="time"
              className="text-xs text-gray-600 dark:text-gray-400"
            />
            <YAxis
              className="text-xs text-gray-600 dark:text-gray-400"
              label={{ value: 'Liters', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="waterProduction"
              stroke="#1890ff"
              fillOpacity={1}
              fill="url(#colorProduction)"
            />
          </AreaChart>
        ) : (
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
            <XAxis
              dataKey="time"
              className="text-xs text-gray-600 dark:text-gray-400"
            />
            <YAxis
              className="text-xs text-gray-600 dark:text-gray-400"
              label={{ value: 'Liters', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="waterProduction"
              stroke="#1890ff"
              strokeWidth={2}
              dot={{ fill: '#1890ff', r: 4 }}
              activeDot={{ r: 6 }}
              name="Production (L)"
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default ProductionChart;
