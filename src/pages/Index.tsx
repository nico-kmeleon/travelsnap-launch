
import React, { useEffect, useState } from 'react';
import { Camera, Image, Send } from 'lucide-react';
import NavigationBar from '@/components/NavigationBar';
import Hero from '@/components/Hero';
import CountdownTimer from '@/components/CountdownTimer';
import LaunchForm from '@/components/LaunchForm';
import { cn } from '@/lib/utils';

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);
  
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <NavigationBar />
      
      <Hero />
      
      <section className="py-12 md:py-20 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className={cn(
            "text-center max-w-3xl mx-auto mb-16 opacity-0",
            loaded && "animate-fade-in animate-delay-300"
          )}>
            <div className="inline-flex items-center justify-center mb-4 h-12 w-12 rounded-full bg-travelsnap-blue/10">
              <Camera className="h-6 w-6 text-travelsnap-blue" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-travelsnap-dark-gray mb-4">
              Ephemeral Travel Moments
            </h2>
            <p className="text-muted-foreground text-lg">
              TravelSnap is redefining how travelers share experiences. Capture moments that disappear after 24 hours, creating a genuine, in-the-moment travel community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {[
              {
                icon: <Camera className="h-6 w-6 text-travelsnap-blue" />,
                title: "Capture Moments",
                description: "Share your journey through photos and videos that vanish after 24 hours, creating authentic travel stories."
              },
              {
                icon: <Send className="h-6 w-6 text-travelsnap-blue" />,
                title: "Connect Instantly",
                description: "Discover and connect with travelers in your vicinity, creating spontaneous meet-ups and friendships."
              },
              {
                icon: <Image className="h-6 w-6 text-travelsnap-blue" />,
                title: "Travel Map",
                description: "Build your personal travel map as you explore, showcasing where you've been and generating recommendations."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={cn(
                  "glass-card p-6 rounded-2xl opacity-0",
                  loaded && "animate-fade-in",
                  loaded && `animate-delay-${(index + 3) * 100}`
                )}
              >
                <div className="inline-flex items-center justify-center mb-4 h-10 w-10 rounded-full bg-travelsnap-blue/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-display font-semibold text-travelsnap-dark-gray mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className={cn(
            "max-w-4xl mx-auto bg-gradient-to-br from-travelsnap-light-blue/30 to-white rounded-3xl p-8 md:p-12 opacity-0",
            loaded && "animate-fade-in animate-delay-400"
          )}>
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-travelsnap-dark-gray mb-4">
                Be the First to Experience TravelSnap
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join our waitlist to get early access when we launch. Your payment details will be securely stored and you'll only be charged when the app launches.
              </p>
            </div>
            
            <CountdownTimer />
            
            <LaunchForm />
          </div>
        </div>
      </section>
      
      <footer className="py-8 border-t border-gray-100">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Camera className="h-5 w-5 text-travelsnap-blue" />
            <span className="font-display font-semibold text-travelsnap-dark-gray">
              TravelSnap
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TravelSnap. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
