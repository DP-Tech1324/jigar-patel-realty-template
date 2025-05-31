
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedListings from "@/components/FeaturedListings";
import DualCTA from "@/components/DualCTA";
import BioSection from "@/components/BioSection";
import Testimonials from "@/components/Testimonials";
import PropertySearch from "@/components/PropertySearch";
import NewsletterSignup from "@/components/NewsletterSignup";
import InquiryForm from "@/components/InquiryForm";
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
      <NewsletterSignup />
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <InquiryForm />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Index;
