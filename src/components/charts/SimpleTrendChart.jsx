/*
 * Created on Sat Dec 27 2025
 *
 * Copyright (c) 2025 Your Company
 */

// src/components/charts/SimpleTrendChart.jsx
import { useEffect, useRef } from 'react';

const SimpleTrendChart = ({ data = [], title, color = '#4A5AFF', height = 120 }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length < 2) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Find min and max values
    const values = data.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    
    // Draw grid
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 1;
    
    // Horizontal lines
    for (let i = 0; i <= 4; i++) {
      const y = (height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Draw trend line
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    
    data.forEach((point, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((point.value - min) / range) * height;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // Draw points
    data.forEach((point, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((point.value - min) / range) * height;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
    
  }, [data, color, height]);
  
  return (
    <div className="bg-surface rounded-xl p-4">
      <h4 className="text-sm font-semibold text-secondary mb-3">{title}</h4>
      <div className="relative">
        <canvas 
          ref={canvasRef} 
          width={300} 
          height={height}
          className="w-full h-[120px]"
        />
        <div className="flex justify-between text-xs text-secondary mt-2">
          <span>{data[0]?.time || 'Start'}</span>
          <span>{data[data.length - 1]?.time || 'Now'}</span>
        </div>
      </div>
    </div>
  );
};

export default SimpleTrendChart;