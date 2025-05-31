
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedListings from "@/components/FeaturedListings";
import DualCTA from "@/components/DualCTA";
import BioSection from "@/components/BioSection";
import Testimonials from "@/components/Testimonials";
import PropertySearch from "@/components/PropertySearch";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <PropertySearch />
      <FeaturedListings />
      <DualCTA />
      <BioSection />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
