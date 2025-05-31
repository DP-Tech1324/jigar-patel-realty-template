
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah & Michael Johnson",
      location: "Toronto, ON",
      rating: 5,
      text: "Jigar made our home buying experience absolutely seamless. His knowledge of the Toronto market is incredible, and he helped us find the perfect family home within our budget. We couldn't be happier with our purchase!",
      property: "4-bedroom family home in North York"
    },
    {
      id: 2,
      name: "Raj & Priya Sharma",
      location: "Mississauga, ON",
      rating: 5,
      text: "Working with Jigar was the best decision we made. He sold our condo in just two weeks and helped us upgrade to our dream townhouse. His professionalism and dedication are unmatched.",
      property: "Luxury townhouse in Mississauga"
    },
    {
      id: 3,
      name: "David Chen",
      location: "Oakville, ON",
      rating: 5,
      text: "As a first-time homebuyer, I was nervous about the process. Jigar guided me through every step, explained everything clearly, and negotiated an amazing deal. I highly recommend him to anyone looking to buy or sell.",
      property: "Modern condo in Oakville"
    },
    {
      id: 4,
      name: "Lisa & Mark Thompson",
      location: "Brampton, ON",
      rating: 5,
      text: "Jigar's market knowledge and negotiation skills saved us thousands. He was always available to answer our questions and made the entire process stress-free. Thank you for helping us find our forever home!",
      property: "Executive home in Brampton"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What My Clients Say
          </h2>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Don't just take my word for it. Here's what my satisfied clients have to say about their experience.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20">
            <div className="text-center mb-8">
              <Quote className="h-12 w-12 text-yellow-400 mx-auto mb-6" />
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>

            <blockquote className="text-lg md:text-xl text-center mb-8 leading-relaxed">
              "{testimonials[currentTestimonial].text}"
            </blockquote>

            <div className="text-center">
              <div className="font-semibold text-lg mb-1">
                {testimonials[currentTestimonial].name}
              </div>
              <div className="text-blue-200 text-sm mb-2">
                {testimonials[currentTestimonial].location}
              </div>
              <div className="text-yellow-400 text-sm">
                {testimonials[currentTestimonial].property}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={prevTestimonial}
              className="border-white/30 text-white hover:bg-white/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-yellow-400' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="lg"
              onClick={nextTestimonial}
              className="border-white/30 text-white hover:bg-white/10"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
            Share Your Experience
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
