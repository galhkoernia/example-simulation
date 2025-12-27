/*
 * Created on Sat Dec 27 2025
 *
 * Copyright (c) 2025 Your Company
 */

// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import StatusBanner from '../components/layout/StatusBanner';
import MetricCard from '../components/indicators/MetricCard';
import SimpleTrendChart from '../components/charts/SimpleTrendChart';
import ScenarioControls from '../components/demo/ScenarioControls';
import ThemeToggle from '../components/layout/ThemeToggle';
import { 
  FaTachometerAlt, 
  FaBolt, 
  FaThermometerHalf, 
  FaCar, 
  FaExclamationCircle,
  FaTire 
} from 'react-icons/fa';
import { generateMockSnapshot, generateTrendData } from '../data/mockSnapshots';

const Dashboard = () => {
  const [currentSnapshot, setCurrentSnapshot] = useState(null);
  const [activeScenario, setActiveScenario] = useState('normal');
  const [isPlaying, setIsPlaying] = useState(false);
  const [voltageTrend, setVoltageTrend] = useState([]);
  const [tempTrend, setTempTrend] = useState([]);
  
  // Initialize with mock data
  useEffect(() => {
    const snapshot = generateMockSnapshot(activeScenario);
    setCurrentSnapshot(snapshot);
    
    // Generate initial trend data
    setVoltageTrend(generateTrendData(15, snapshot.batteryVoltage, 0.2));
    setTempTrend(generateTrendData(15, snapshot.motorTemp, 5));
  }, []);
  
  // Auto-play scenario cycling
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        const scenarios = ['normal', 'warning', 'danger'];
        const currentIndex = scenarios.indexOf(activeScenario);
        const nextIndex = (currentIndex + 1) % scenarios.length;
        setActiveScenario(scenarios[nextIndex]);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeScenario]);
  
  // Update snapshot when scenario changes
  useEffect(() => {
    const newSnapshot = generateMockSnapshot(activeScenario);
    setCurrentSnapshot(newSnapshot);
    
    // Update trends with new base values
    setVoltageTrend(prev => {
      const newData = [...prev.slice(1), {
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        value: parseFloat(newSnapshot.batteryVoltage.toFixed(2))
      }];
      return newData;
    });
    
    setTempTrend(prev => {
      const newData = [...prev.slice(1), {
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        value: parseFloat(newSnapshot.motorTemp.toFixed(1))
      }];
      return newData;
    });
  }, [activeScenario]);
  
  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSnapshot) {
        setCurrentSnapshot(prev => ({
          ...prev,
          timestamp: new Date().toISOString(),
          speed: prev.speed + (Math.random() * 2 - 1),
          batteryVoltage: Math.max(10, prev.batteryVoltage + (Math.random() * 0.1 - 0.05)),
          motorTemp: prev.motorTemp + (Math.random() * 0.5 - 0.25)
        }));
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [currentSnapshot]);
  
  if (!currentSnapshot) {
    return <div className="p-8 text-center">Loading demo data...</div>;
  }
  
  const getTrend = (value, previousValue) => {
    const diff = value - previousValue;
    if (diff > 2) return 'up-fast';
    if (diff > 0.5) return 'up';
    if (diff < -2) return 'down-fast';
    if (diff < -0.5) return 'down';
    return 'stable';
  };
  
  return (
    <div className="min-h-screen p-4 md:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Vehicle Monitoring System</h1>
          <p className="text-secondary mt-1">Real-time telemetry dashboard</p>
        </div>
        <ThemeToggle />
      </div>
      
      {/* Demo Controls */}
      <ScenarioControls
        activeScenario={activeScenario}
        onScenarioChange={setActiveScenario}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onReset={() => {
          setActiveScenario('normal');
          setIsPlaying(false);
        }}
      />
      
      {/* Status Banner */}
      <StatusBanner
        status={currentSnapshot.systemStatus}
        message={currentSnapshot.warnings[0]}
        timestamp={currentSnapshot.timestamp}
      />
      
      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Speed"
          value={currentSnapshot.speed}
          unit="km/h"
          trend={getTrend(currentSnapshot.speed, currentSnapshot.speed - 1)}
          status={currentSnapshot.speed > 140 ? 'danger' : currentSnapshot.speed > 120 ? 'warning' : 'normal'}
          icon={FaTachometerAlt}
        />
        
        <MetricCard
          title="Battery Voltage"
          value={currentSnapshot.batteryVoltage}
          unit="V"
          trend={getTrend(currentSnapshot.batteryVoltage, currentSnapshot.batteryVoltage - 0.1)}
          status={currentSnapshot.batteryVoltage < 11 ? 'danger' : currentSnapshot.batteryVoltage < 11.5 ? 'warning' : 'normal'}
          icon={FaBolt}
          decimals={2}
        />
        
        <MetricCard
          title="Motor Temp"
          value={currentSnapshot.motorTemp}
          unit="°C"
          trend={getTrend(currentSnapshot.motorTemp, currentSnapshot.motorTemp - 0.5)}
          status={currentSnapshot.motorTemp > 105 ? 'danger' : currentSnapshot.motorTemp > 90 ? 'warning' : 'normal'}
          icon={FaThermometerHalf}
          decimals={1}
        />
        
        <MetricCard
          title="Motor RPM"
          value={currentSnapshot.motorRPM}
          unit="RPM"
          trend={getTrend(currentSnapshot.motorRPM, currentSnapshot.motorRPM - 100)}
          status={currentSnapshot.motorRPM > 8000 ? 'warning' : 'normal'}
          icon={FaCar}
        />
      </div>
      
      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Brake Pressure"
          value={currentSnapshot.brakePressure}
          unit="bar"
          trend="stable"
          status={currentSnapshot.brakePressure > 80 ? 'warning' : 'normal'}
        />
        
        <MetricCard
          title="Brake Pad Wear"
          value={currentSnapshot.brakePadWear}
          unit="%"
          trend="up"
          status={currentSnapshot.brakePadWear > 80 ? 'danger' : currentSnapshot.brakePadWear > 70 ? 'warning' : 'normal'}
        />
        
        <MetricCard
          title="Battery Temp"
          value={currentSnapshot.batteryTemp}
          unit="°C"
          trend={getTrend(currentSnapshot.batteryTemp, currentSnapshot.batteryTemp - 0.3)}
          status={currentSnapshot.batteryTemp > 55 ? 'danger' : currentSnapshot.batteryTemp > 45 ? 'warning' : 'normal'}
          decimals={1}
        />
        
        <div className="bg-surface rounded-xl p-4">
          <h4 className="text-sm font-semibold text-secondary mb-3">Tire Pressures</h4>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(currentSnapshot.tirePressures).map(([position, pressure]) => (
              <div key={position} className="text-center">
                <div className="text-xs text-secondary mb-1">
                  {position.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <div className={`font-digital text-xl font-bold ${
                  pressure < 29 || pressure > 35 ? 'text-status-warning' : ''
                }`}>
                  {pressure.toFixed(1)}<span className="text-sm">psi</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <SimpleTrendChart
          data={voltageTrend}
          title="Battery Voltage Trend"
          color="#4A5AFF"
        />
        
        <SimpleTrendChart
          data={tempTrend}
          title="Motor Temperature Trend"
          color="#EF4444"
        />
      </div>
      
      {/* Diagnostics Section */}
      <div className="bg-surface rounded-xl p-5">
        <div className="flex items-center mb-4">
          <FaExclamationCircle className="text-status-warning mr-2" />
          <h3 className="text-lg font-semibold">System Diagnostics</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Warnings */}
          <div>
            <h4 className="text-sm font-semibold text-secondary mb-3">Active Warnings</h4>
            {currentSnapshot.warnings.length > 0 ? (
              <div className="space-y-2">
                {currentSnapshot.warnings.map((warning, index) => (
                  <div 
                    key={index} 
                    className="p-3 rounded-lg bg-status-warning/10 border border-status-warning/30"
                  >
                    <div className="flex items-start">
                      <FaExclamationTriangle className="text-status-warning mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm">{warning}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-secondary border border-border-color rounded-lg">
                No active warnings
              </div>
            )}
          </div>
          
          {/* Error Codes */}
          <div>
            <h4 className="text-sm font-semibold text-secondary mb-3">Error Codes</h4>
            {currentSnapshot.errorCodes.length > 0 ? (
              <div className="space-y-2">
                {currentSnapshot.errorCodes.map((code, index) => (
                  <div 
                    key={index} 
                    className="p-3 rounded-lg bg-status-danger/10 border border-status-danger/30"
                  >
                    <div className="flex justify-between items-center">
                      <code className="font-mono font-bold">{code}</code>
                      <span className="text-xs px-2 py-1 bg-status-danger/20 rounded">
                        Critical
                      </span>
                    </div>
                    <div className="text-xs text-secondary mt-2">
                      Diagnostic Trouble Code - Requires immediate attention
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-secondary border border-border-color rounded-lg">
                No error codes detected
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-border-color text-center text-secondary text-sm">
        <p>Vehicle Monitoring System Demo • Data updates in real-time • All values simulated</p>
        <p className="mt-1">
          System Status: <span className={`font-bold text-${currentSnapshot.systemStatus.toLowerCase()}`}>
            {currentSnapshot.systemStatus}
          </span>
          {' • '}
          Last Update: {new Date(currentSnapshot.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;