/*
 * Created on Sat Dec 27 2025
 * Demo Controls for Simulation Scenarios
 * Copyright (c) 2025 Your Company
 */

// src/components/demo/ScenarioControls.jsx
import { FaPlay, FaPause, FaRedo, FaSkull, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

const ScenarioControls = ({ 
  activeScenario, 
  onScenarioChange, 
  isPlaying, 
  onPlayPause,
  onReset 
}) => {
  const scenarios = [
    { id: 'normal', label: 'Normal', icon: FaCheckCircle, color: 'status-normal' },
    { id: 'warning', label: 'Warning', icon: FaExclamationTriangle, color: 'status-warning' },
    { id: 'danger', label: 'Danger', icon: FaSkull, color: 'status-danger' }
  ];
  
  return (
    <div className="bg-surface rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Demo Controls</h3>
        <div className="flex space-x-2">
          <button
            onClick={onPlayPause}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              isPlaying 
                ? 'bg-status-warning text-white' 
                : 'bg-navy-500 text-white'
            }`}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
            <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
          </button>
          <button
            onClick={onReset}
            className="px-4 py-2 rounded-lg border border-border-color hover:bg-navy-50 dark:hover:bg-navy-900 flex items-center space-x-2"
          >
            <FaRedo />
            <span>Reset</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {scenarios.map((scenario) => {
          const Icon = scenario.icon;
          return (
            <button
              key={scenario.id}
              onClick={() => onScenarioChange(scenario.id)}
              className={`p-4 rounded-lg border-2 flex flex-col items-center justify-center transition-all ${
                activeScenario === scenario.id
                  ? `border-${scenario.color} bg-${scenario.color}/10`
                  : 'border-border-color hover:border-navy-300'
              }`}
            >
              <Icon className={`text-2xl text-${scenario.color} mb-2`} />
              <span className="font-medium">{scenario.label}</span>
              <span className="text-xs text-secondary mt-1">
                Click to activate
              </span>
            </button>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border-color">
        <div className="text-sm text-secondary">
          <p className="mb-2">Demo Instructions:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Click scenario buttons to change system state</li>
            <li>Auto Play cycles through scenarios every 5 seconds</li>
            <li>Observe color changes and warning indicators</li>
            <li>All data is simulated for demo purposes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ScenarioControls;