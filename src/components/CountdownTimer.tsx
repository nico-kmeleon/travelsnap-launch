
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC = () => {
  // Set launch date to 30 days from now
  const calculateLaunchDate = () => {
    const now = new Date();
    const launchDate = new Date(now);
    launchDate.setDate(now.getDate() + 30);
    return launchDate;
  };
  
  const launchDate = calculateLaunchDate();
  
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +launchDate - +new Date();
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };
  
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
    
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearTimeout(timer);
  });
  
  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];
  
  return (
    <div className="py-12 max-w-3xl mx-auto">
      <h3 className={cn(
        "text-lg text-center font-medium text-travelsnap-dark-gray/80 mb-6 opacity-0",
        loaded && "animate-fade-in"
      )}>
        Launching In
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {timeUnits.map((unit, index) => (
          <div 
            key={unit.label}
            className={cn(
              "glass-card px-4 py-6 rounded-xl text-center opacity-0",
              loaded && "animate-fade-in",
              loaded && `animate-delay-${index * 100}`
            )}
          >
            <div className="text-3xl md:text-4xl font-display font-bold text-travelsnap-blue mb-1">
              {unit.value < 10 ? `0${unit.value}` : unit.value}
            </div>
            <div className="text-xs uppercase tracking-wider text-travelsnap-dark-gray/60 font-medium">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
