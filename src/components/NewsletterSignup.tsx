
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already Subscribed",
            description: "You're already subscribed to our newsletter!",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Success!",
          description: "Thank you for subscribing to our newsletter.",
        });
        setEmail('');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-600 text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-3xl font-bold mb-4">
          Stay Updated on the GTA Market
        </h3>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Get the latest market insights, new listings, and exclusive opportunities 
          delivered straight to your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-4">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-1 bg-white text-gray-900"
          />
          <Button 
            type="submit" 
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSignup;
