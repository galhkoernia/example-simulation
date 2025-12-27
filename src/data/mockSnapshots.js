/*
 * Created on Sat Dec 27 2025
 *
 * Copyright (c) 2025 Your Company
 */

// src/data/mockSnapshots.js
export const generateMockSnapshot = (scenario = 'normal') => {
  const baseTime = new Date();
  const scenarios = {
    normal: {
      systemStatus: 'NORMAL',
      speed: Math.floor(Math.random() * 40) + 60, // 60-100 km/h
      batteryVoltage: 12.5 + (Math.random() * 0.6 - 0.3), // 12.2-12.8
      batteryTemp: 30 + Math.random() * 10, // 30-40°C
      motorTemp: 70 + Math.random() * 15, // 70-85°C
      motorRPM: 4000 + Math.random() * 2000, // 4000-6000
      brakePressure: 40 + Math.random() * 20, // 40-60 bar
      brakePadWear: 40 + Math.random() * 20, // 40-60%
      tirePressures: {
        frontLeft: 32 + (Math.random() * 1 - 0.5),
        frontRight: 32 + (Math.random() * 1 - 0.5),
        rearLeft: 32 + (Math.random() * 1 - 0.5),
        rearRight: 32 + (Math.random() * 1 - 0.5)
      },
      warnings: [],
      errorCodes: []
    },
    warning: {
      systemStatus: 'WARNING',
      speed: 110 + Math.random() * 10,
      batteryVoltage: 11.2 + Math.random() * 0.3,
      batteryTemp: 48 + Math.random() * 5,
      motorTemp: 95 + Math.random() * 8,
      motorRPM: 7000 + Math.random() * 1000,
      brakePressure: 70 + Math.random() * 10,
      brakePadWear: 75 + Math.random() * 10,
      tirePressures: {
        frontLeft: 29 + Math.random() * 1,
        frontRight: 31 + Math.random() * 1,
        rearLeft: 30 + Math.random() * 1,
        rearRight: 34 + Math.random() * 1
      },
      warnings: [
        'High motor temperature',
        'Battery voltage low',
        'Brake pads worn'
      ],
      errorCodes: []
    },
    danger: {
      systemStatus: 'DANGER',
      speed: 145 + Math.random() * 15,
      batteryVoltage: 10.0 + Math.random() * 0.5,
      batteryTemp: 55 + Math.random() * 8,
      motorTemp: 110 + Math.random() * 10,
      motorRPM: 8500 + Math.random() * 1500,
      brakePressure: 85 + Math.random() * 15,
      brakePadWear: 90 + Math.random() * 8,
      tirePressures: {
        frontLeft: 27 + Math.random() * 1,
        frontRight: 27 + Math.random() * 1,
        rearLeft: 28 + Math.random() * 1,
        rearRight: 36 + Math.random() * 1
      },
      warnings: [
        'CRITICAL: Speed limit exceeded',
        'CRITICAL: Battery overheating',
        'CRITICAL: Motor overheating',
        'IMMEDIATE SERVICE REQUIRED'
      ],
      errorCodes: ['P0562', 'P0217', 'P0118']
    }
  };
  
  return {
    timestamp: baseTime.toISOString(),
    ...scenarios[scenario],
    // Add some random fluctuation
    speed: scenarios[scenario].speed + (Math.random() * 5 - 2.5),
    batteryVoltage: scenarios[scenario].batteryVoltage + (Math.random() * 0.2 - 0.1)
  };
};

// Generate trend data
export const generateTrendData = (count = 10, baseValue = 12.5, variance = 0.3) => {
  const data = [];
  const now = new Date();
  
  for (let i = count - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 10000); // 10-second intervals
    const value = baseValue + (Math.random() * variance * 2 - variance);
    
    data.push({
      time: time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      value: parseFloat(value.toFixed(2))
    });
  }
  
  return data;
};