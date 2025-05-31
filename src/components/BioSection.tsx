
import { Button } from "@/components/ui/button";
import { Award, Users, Home, Star, ArrowRight } from "lucide-react";

const BioSection = () => {
  const achievements = [
    {
      icon: Home,
      number: "500+",
      label: "Homes Sold"
    },
    {
      icon: Users,
      number: "400+",
      label: "Happy Families"
    },
    {
      icon: Award,
      number: "15+",
      label: "Years Experience"
    },
    {
      icon: Star,
      number: "5.0",
      label: "Average Rating"
    }
  ];

  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Jigar Patel
              </h2>
              <p className="text-xl text-blue-600 font-semibold mb-6">
                Your Trusted Real Estate Professional
              </p>
            </div>

            <div className="space-y-4 text-gray-600">
              <p>
                With over 15 years of experience in the Greater Toronto Area real estate market, 
                Jigar Patel has built a reputation as one of the most trusted and knowledgeable 
                realtors in the region. His commitment to excellence and personalized service 
                has helped hundreds of families find their perfect homes.
              </p>
              <p>
                Jigar's deep understanding of the local market, combined with his negotiation 
                skills and attention to detail, ensures that every client receives the best 
                possible outcome. Whether you're a first-time buyer, seasoned investor, or 
                looking to sell your property, Jigar provides the expertise and support you need.
              </p>
              <p>
                Born and raised in the GTA, Jigar has an intimate knowledge of the neighborhoods, 
                schools, and communities that make this area so special. He takes pride in 
                matching families with homes that truly fit their lifestyle and dreams.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Schedule Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                View Credentials
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            {/* Profile Image Placeholder */}
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">JP</span>
                  </div>
                  <p className="text-gray-600">Professional headshot placeholder</p>
                  <p className="text-sm text-gray-500 mt-2">Upload Jigar's photo here</p>
                </div>
              </div>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 text-center">
                  <achievement.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {achievement.number}
                  </div>
                  <div className="text-sm text-gray-600">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BioSection;
