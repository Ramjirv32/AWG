import { useEffect } from 'react';
import { Droplets, Activity, Zap, TrendingUp } from 'lucide-react';
import useStore from '../store/useStore';
import socket from '../config/socket';
import api from '../config/api';
import StatCard from '../components/Dashboard/StatCard';
import WaterLevelGauge from '../components/Dashboard/WaterLevelGauge';
import PHLevelIndicator from '../components/Dashboard/PHLevelIndicator';
import ProductionChart from '../components/Dashboard/ProductionChart';
import SystemStatus from '../components/Dashboard/SystemStatus';
import HydrationTracker from '../components/Dashboard/HydrationTracker';
import ErrorList from '../components/Errors/ErrorList';

const Dashboard = () => {
  const {
    currentSensorData,
    historicalData,
    dailyHydration,
    errors,
    updateSensorData,
    addHistoricalData,
    setHistoricalData,
    setDailyHydration,
    setErrors,
    addError,
  } = useStore();

  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      try {
        const [sensorRes, historyRes, hydrationRes, errorsRes] = await Promise.all([
          api.get('/sensors/current'),
          api.get('/sensors/historical?limit=20'),
          api.get('/consumption/hydration/daily'),
          api.get('/errors?resolved=false&limit=5'),
        ]);

        updateSensorData(sensorRes.data);
        setHistoricalData(historyRes.data);
        setDailyHydration(hydrationRes.data);
        setErrors(errorsRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();

    // Connect to socket for real-time updates
    socket.connect();

    // Get user from store
    const user = useStore.getState().user;
    if (user) {
      // Join user-specific room for personalized updates
      socket.emit('join', user._id);
    }

    socket.on('sensorUpdate', (data) => {
      updateSensorData(data);
      addHistoricalData(data);
    });

    socket.on('errorAlert', (error) => {
      addError(error);
    });

    socket.on('consumptionUpdate', () => {
      // Refresh hydration data when consumption is updated
      api.get('/consumption/hydration/daily')
        .then(res => setDailyHydration(res.data))
        .catch(err => console.error('Error refreshing hydration:', err));
    });

    return () => {
      socket.off('sensorUpdate');
      socket.off('errorAlert');
      socket.off('consumptionUpdate');
    };
  }, []);

  const stats = currentSensorData
    ? [
        {
          title: 'Water Production Today',
          value: (currentSensorData.waterProduction * 10).toFixed(1),
          unit: 'L',
          icon: Droplets,
          color: 'primary',
          trend: { direction: 'up', value: 12, period: 'week' },
        },
        {
          title: 'Current Temperature',
          value: currentSensorData.temperature.toFixed(1),
          unit: '°C',
          icon: Activity,
          color: 'warning',
        },
        {
          title: 'Humidity Level',
          value: currentSensorData.humidity.toFixed(0),
          unit: '%',
          icon: TrendingUp,
          color: 'success',
        },
        {
          title: 'Power Consumption',
          value: (currentSensorData.powerConsumption * 10).toFixed(2),
          unit: 'kWh',
          icon: Zap,
          color: 'error',
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Real-time monitoring of your Atmospheric Water Generator
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Water Level Gauge */}
        <WaterLevelGauge level={currentSensorData?.waterLevel || 0} />

        {/* pH Level Indicator */}
        <PHLevelIndicator phLevel={currentSensorData?.phLevel || 7} />

        {/* System Status */}
        <SystemStatus status={currentSensorData?.systemStatus || 'operational'} />
      </div>

      {/* Charts and Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Production Chart - Takes 2 columns */}
        <div className="lg:col-span-2">
          <ProductionChart data={historicalData} type="area" />
        </div>

        {/* Hydration Tracker */}
        <HydrationTracker
          consumed={dailyHydration.consumed}
          goal={dailyHydration.goal}
        />
      </div>

      {/* Error List */}
      <ErrorList errors={errors} />
    </div>
  );
};

export default Dashboard;
