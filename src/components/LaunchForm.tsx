
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { Camera, CreditCard, Lock, Mail, User } from 'lucide-react';

const LaunchForm: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [step, setStep] = useState(1);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      // Format card number with spaces every 4 digits and limit to 19 chars (16 digits + 3 spaces)
      const formatted = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
      
      setFormData({ ...formData, [name]: formatted });
      return;
    }
    
    if (name === 'expiryDate') {
      // Format expiry date as MM/YY
      const cleaned = value.replace(/\D/g, '');
      let formatted = cleaned;
      
      if (cleaned.length > 2) {
        formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
      }
      
      setFormData({ ...formData, [name]: formatted });
      return;
    }
    
    if (name === 'cvv') {
      // Limit CVV to 3-4 digits
      const formatted = value.replace(/\D/g, '').slice(0, 4);
      setFormData({ ...formData, [name]: formatted });
      return;
    }
    
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!formData.name || !formData.email) {
        toast({
          title: "Please fill in all fields",
          description: "We need your name and email to continue.",
          variant: "destructive"
        });
        return;
      }
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast({
          title: "Invalid email format",
          description: "Please enter a valid email address.",
          variant: "destructive"
        });
        return;
      }
      
      setStep(2);
      return;
    }
    
    if (step === 2) {
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv) {
        toast({
          title: "Please fill in all fields",
          description: "We need your payment details to continue.",
          variant: "destructive"
        });
        return;
      }
      
      // Basic validation
      if (formData.cardNumber.replace(/\s/g, '').length < 16) {
        toast({
          title: "Invalid card number",
          description: "Please enter a valid card number.",
          variant: "destructive"
        });
        return;
      }
      
      if (formData.expiryDate.length < 5) {
        toast({
          title: "Invalid expiry date",
          description: "Please enter a valid expiry date (MM/YY).",
          variant: "destructive"
        });
        return;
      }
      
      if (formData.cvv.length < 3) {
        toast({
          title: "Invalid security code",
          description: "Please enter a valid CVV/CVC code.",
          variant: "destructive"
        });
        return;
      }
      
      // Simulate form submission
      setLoading(true);
      
      setTimeout(() => {
        setLoading(false);
        toast({
          title: "Success!",
          description: "You're on the waitlist! We'll notify you when we launch.",
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          cardNumber: '',
          expiryDate: '',
          cvv: ''
        });
        setStep(1);
      }, 1500);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-travelsnap-blue/10 to-travelsnap-light-blue/20 px-6 py-4 border-b border-white/20">
          <div className="flex items-center">
            <Camera className="h-5 w-5 text-travelsnap-blue mr-2" />
            <h3 className="font-medium text-travelsnap-dark-gray">
              {step === 1 ? "Join the Waitlist" : "Secure Payment Information"}
            </h3>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {step === 1 ? (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Be the first to experience TravelSnap when we launch. Enter your details below to join our exclusive waitlist.
              </p>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-travelsnap-dark-gray">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      className="w-full pl-10 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-travelsnap-blue/20 focus:border-travelsnap-blue outline-none transition-all"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-travelsnap-dark-gray">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className="w-full pl-10 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-travelsnap-blue/20 focus:border-travelsnap-blue outline-none transition-all"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm flex items-center text-muted-foreground mb-6">
                <Lock className="h-3.5 w-3.5 mr-1.5" />
                Your payment details are securely stored. You won't be charged until we launch.
              </p>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="cardNumber" className="text-sm font-medium text-travelsnap-dark-gray">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      id="cardNumber"
                      name="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full pl-10 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-travelsnap-blue/20 focus:border-travelsnap-blue outline-none transition-all"
                      value={formData.cardNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="expiryDate" className="text-sm font-medium text-travelsnap-dark-gray">
                      Expiry Date
                    </label>
                    <input
                      id="expiryDate"
                      name="expiryDate"
                      type="text"
                      placeholder="MM/YY"
                      className="w-full py-2 px-3 bg-white border rounded-lg focus:ring-2 focus:ring-travelsnap-blue/20 focus:border-travelsnap-blue outline-none transition-all"
                      value={formData.expiryDate}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="cvv" className="text-sm font-medium text-travelsnap-dark-gray">
                      CVV/CVC
                    </label>
                    <input
                      id="cvv"
                      name="cvv"
                      type="text"
                      placeholder="123"
                      className="w-full py-2 px-3 bg-white border rounded-lg focus:ring-2 focus:ring-travelsnap-blue/20 focus:border-travelsnap-blue outline-none transition-all"
                      value={formData.cvv}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          
          <div className="mt-6 flex items-center justify-between">
            {step === 2 && (
              <button
                type="button"
                className="text-sm text-travelsnap-blue hover:text-travelsnap-blue/80 transition-colors"
                onClick={() => setStep(1)}
                disabled={loading}
              >
                Go Back
              </button>
            )}
            
            <button
              type="submit"
              className={cn(
                "ml-auto px-5 py-2.5 bg-travelsnap-blue text-white rounded-lg font-medium hover:bg-travelsnap-blue/90 transition-colors focus:outline-none focus:ring-2 focus:ring-travelsnap-blue/20 focus:ring-offset-2",
                loading && "opacity-70 cursor-not-allowed"
              )}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : step === 1 ? "Continue" : "Join Waitlist"}
            </button>
          </div>
          
          <div className="mt-4 text-xs text-center text-travelsnap-dark-gray/60">
            By joining, you agree to our Terms of Service and Privacy Policy
          </div>
        </form>
      </div>
    </div>
  );
};

export default LaunchForm;
