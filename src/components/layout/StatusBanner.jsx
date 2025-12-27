/*
 * Created on Sat Dec 27 2025
 *
 * Copyright (c) 2025 Your Company
 */

// src/components/layout/StatusBanner.jsx
import { FaCheckCircle, FaExclamationTriangle, FaSkullCrossbones, FaBan } from 'react-icons/fa';

const StatusBanner = ({ status = 'NORMAL', message = '', timestamp }) => {
  const statusConfig = {
    NORMAL: {
      bg: 'bg-status-normal',
      icon: FaCheckCircle,
      title: 'All Systems Normal',
      animation: ''
    },
    WARNING: {
      bg: 'bg-status-warning',
      icon: FaExclamationTriangle,
      title: 'System Warning',
      animation: 'animate-pulse-slow'
    },
    DANGER: {
      bg: 'bg-status-danger',
      icon: FaSkullCrossbones,
      title: 'CRITICAL - Immediate Action Required',
      animation: 'animate-pulse'
    },
    FAILED: {
      bg: 'bg-status-failed',
      icon: FaBan,
      title: 'SYSTEM FAILURE',
      animation: 'animate-blink'
    }
  };
  
  const config = statusConfig[status] || statusConfig.NORMAL;
  const Icon = config.icon;
  
  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  
  return (
    <div className={`${config.bg} ${config.animation} rounded-xl p-4 text-white shadow-lg mb-6`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Icon className="text-2xl" />
          <div>
            <h1 className="text-2xl font-bold">{config.title}</h1>
            {message && <p className="opacity-90 mt-1">{message}</p>}
          </div>
        </div>
        <div className="text-right">
          <div className="font-digital text-lg bg-black/20 px-3 py-1 rounded">
            {formatTime(timestamp || new Date())}
          </div>
          <div className="text-sm opacity-80 mt-1">Last Update</div>
        </div>
      </div>
    </div>
  );
};

export default StatusBanner;