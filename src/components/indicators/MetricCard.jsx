/*
 * Created on Sat Dec 27 2025
 *
 * Copyright (c) 2025 Your Company
 */

// src/components/indicators/MetricCard.jsx
import { useState, useEffect } from 'react';

const MetricCard = ({ 
  title, 
  value, 
  unit, 
  trend = 'stable', 
  status = 'normal',
  format = 'number',
  decimals = 1
}) => {
  const [animatedValue, setAnimatedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);
  
  const getTrendIcon = () => {
    switch(trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      case 'up-fast': return '⇈';
      case 'down-fast': return '⇊';
      default: return '→';
    }
  };
  
  const getTrendColor = () => {
    switch(trend) {
      case 'up': return 'text-status-warning';
      case 'up-fast': return 'text-status-danger';
      case 'down': return 'text-status-normal';
      default: return 'text-gray-500';
    }
  };
  
  const getStatusBorder = () => {
    switch(status) {
      case 'warning': return 'border-l-4 border-status-warning';
      case 'danger': return 'border-l-4 border-status-danger';
      default: return '';
    }
  };
  
  const formatValue = (val) => {
    if (format === 'number') {
      return typeof val === 'number' ? val.toFixed(decimals) : val;
    }
    return val;
  };
  
  return (
    <div className={`bg-surface rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 ${getStatusBorder()}`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-semibold text-secondary uppercase tracking-wide">{title}</h3>
        <span className={`text-lg font-bold ${getTrendColor()}`}>
          {getTrendIcon()}
        </span>
      </div>
      <div className="flex items-baseline space-x-2">
        <span className="font-digital text-3xl font-bold">
          {formatValue(animatedValue)}
        </span>
        {unit && (
          <span className="text-lg text-secondary font-medium">
            {unit}
          </span>
        )}
      </div>
      <div className="mt-4 pt-3 border-t border-border-color">
        <div className="text-xs text-secondary">
          Trend: <span className="font-medium capitalize">{trend}</span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;