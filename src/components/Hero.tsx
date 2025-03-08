
import React, { useEffect, useState } from 'react';
import { Camera, Globe, MapPin, Cloud, Sun, Mountain } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative min-h-[90vh] pt-24 pb-16 flex flex-col items-center justify-center overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-gradient-to-b from-travelsnap-light-blue/20 to-white/0 -z-10"></div>
      <div className="absolute inset-0 bg-dot-pattern opacity-40 -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 left-1/6 w-72 h-72 bg-travelsnap-blue/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-travelsnap-light-blue/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-wave-pattern bg-repeat-x opacity-30 -z-10"></div>
      
      {/* Floating icons */}
      <Camera className={cn(
        "absolute text-travelsnap-blue/30 w-12 h-12 top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 opacity-0",
        loaded && "animate-float animate-fade-in-slow"
      )} />
      <Globe className={cn(
        "absolute text-travelsnap-blue/20 w-16 h-16 bottom-1/3 right-1/4 transform translate-x-1/2 translate-y-1/2 opacity-0",
        loaded && "animate-float animate-delay-200 animate-fade-in-slow"
      )} />
      <MapPin className={cn(
        "absolute text-travelsnap-blue/20 w-10 h-10 top-2/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2 opacity-0",
        loaded && "animate-float animate-delay-400 animate-fade-in-slow"
      )} />
      <Cloud className={cn(
        "absolute text-travelsnap-blue/15 w-14 h-14 top-1/5 right-1/5 transform -translate-x-1/2 -translate-y-1/2 opacity-0",
        loaded && "animate-float animate-delay-300 animate-fade-in-slow"
      )} />
      <Sun className={cn(
        "absolute text-travelsnap-blue/10 w-12 h-12 bottom-1/5 left-1/5 transform translate-x-1/2 translate-y-1/2 opacity-0",
        loaded && "animate-float animate-delay-500 animate-fade-in-slow"
      )} />
      <Mountain className={cn(
        "absolute text-travelsnap-blue/20 w-16 h-16 bottom-1/4 left-1/3 transform translate-x-1/2 translate-y-1/2 opacity-0",
        loaded && "animate-float animate-delay-600 animate-fade-in-slow"
      )} />
      
      {/* Content container */}
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Badge */}
        <div className={cn(
          "mx-auto mb-6 inline-flex items-center px-3 py-1 rounded-full bg-travelsnap-blue/10 text-travelsnap-blue text-xs font-medium opacity-0",
          loaded && "animate-fade-in"
        )}>
          <span className="flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-travelsnap-blue opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-travelsnap-blue"></span>
          </span>
          Coming Soon
        </div>
        
        {/* Main heading */}
        <h1 className={cn(
          "text-4xl md:text-6xl lg:text-7xl font-display font-bold text-travelsnap-dark-gray text-center tracking-tight mb-6 opacity-0",
          loaded && "animate-fade-in animate-delay-100"
        )}>
          Share Your <span className="text-travelsnap-blue">Travel</span> Moments
        </h1>
        
        {/* Description */}
        <p className={cn(
          "text-lg md:text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-10 opacity-0",
          loaded && "animate-fade-in animate-delay-200"
        )}>
          TravelSnap connects travelers through ephemeral moments. Share your journey, discover new places, and connect with fellow adventurers in real-time.
        </p>
      </div>
    </section>
  );
};

export default Hero;
