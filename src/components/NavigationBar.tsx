
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Camera, Send } from "lucide-react";

const NavigationBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-8 transition-all duration-300 ease-in-out",
        scrolled ? "bg-white/80 backdrop-blur-sm shadow-soft" : "bg-transparent"
      )}
    >
      <div className="container max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Camera className="h-6 w-6 text-travelsnap-blue animate-pulse-soft" />
          <h1 className="text-lg md:text-xl font-display font-bold text-travelsnap-dark-gray tracking-tight">
            TravelSnap
          </h1>
        </div>
        <button className="text-sm font-medium text-travelsnap-blue hover:text-travelsnap-blue/80 transition-colors flex items-center">
          <Send className="h-4 w-4 mr-1.5" />
          <span>Join Beta</span>
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar;
