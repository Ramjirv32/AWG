import { create } from 'zustand';

const useStore = create((set, get) => ({
  // Auth state
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),

  // Theme state
  theme: localStorage.getItem('theme') || 'light',

  // Sensor data
  currentSensorData: null,
  historicalData: [],

  // Water consumption
  consumptionData: [],
  dailyHydration: { consumed: 0, goal: 2000, percentage: 0 },

  // Errors
  errors: [],
  errorStats: [],

  // Maintenance
  maintenanceRequests: [],

  // Actions
  setUser: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    set({ theme: newTheme });
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  updateSensorData: (data) => set({ currentSensorData: data }),
  
  setHistoricalData: (data) => set({ historicalData: data }),
  
  addHistoricalData: (data) => set((state) => ({
    historicalData: [...state.historicalData, data].slice(-100)
  })),

  setConsumptionData: (data) => set({ consumptionData: data }),
  
  setDailyHydration: (data) => set({ dailyHydration: data }),

  setErrors: (errors) => set({ errors }),
  
  addError: (error) => set((state) => ({
    errors: [error, ...state.errors].slice(0, 100)
  })),

  setErrorStats: (stats) => set({ errorStats: stats }),

  setMaintenanceRequests: (requests) => set({ maintenanceRequests: requests }),
  
  addMaintenanceRequest: (request) => set((state) => ({
    maintenanceRequests: [request, ...state.maintenanceRequests]
  })),

  updateMaintenanceRequest: (updatedRequest) => set((state) => ({
    maintenanceRequests: state.maintenanceRequests.map((req) =>
      req._id === updatedRequest._id ? updatedRequest : req
    )
  })),
}));

// Initialize theme on load
const theme = localStorage.getItem('theme') || 'light';
if (theme === 'dark') {
  document.documentElement.classList.add('dark');
}

export default useStore;
