
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, Phone, Mail } from "lucide-react";

const FAQ = () => {
  const buyerFAQs = [
    {
      question: "How much do I need for a down payment?",
      answer: "In Canada, the minimum down payment is 5% for homes under $500,000, 5% on the first $500,000 and 10% on the remaining amount for homes between $500,000-$999,999, and 20% for homes over $1 million. However, a larger down payment can help you avoid mortgage insurance and get better rates."
    },
    {
      question: "What is the home buying process?",
      answer: "The process typically involves: 1) Getting pre-approved for a mortgage, 2) Finding a real estate agent, 3) Searching for properties, 4) Making an offer, 5) Home inspection, 6) Finalizing financing, 7) Final walkthrough, and 8) Closing. Jigar will guide you through each step."
    },
    {
      question: "How long does it take to buy a home?",
      answer: "The timeline varies, but typically takes 30-60 days from offer acceptance to closing. The search phase can take anywhere from a few weeks to several months, depending on your criteria and market conditions."
    },
    {
      question: "What are closing costs?",
      answer: "Closing costs typically range from 1.5% to 4% of the purchase price and include legal fees, land transfer tax, title insurance, home inspection, appraisal fees, and moving costs. Jigar can provide a detailed breakdown based on your specific situation."
    },
    {
      question: "Should I get a home inspection?",
      answer: "Absolutely! A home inspection is crucial for identifying potential issues before finalizing your purchase. It typically costs $400-$800 but can save you thousands in unexpected repairs. Most offers include a home inspection condition."
    }
  ];

  const sellerFAQs = [
    {
      question: "How do I determine my home's value?",
      answer: "Jigar provides comprehensive market analysis using recent comparable sales, current market conditions, and your home's unique features. Factors include location, size, condition, recent renovations, and local market trends."
    },
    {
      question: "When is the best time to sell?",
      answer: "Spring and early summer typically see the most activity, but the 'best' time depends on your personal situation and local market conditions. Jigar can analyze current market trends to help you time your sale optimally."
    },
    {
      question: "What are the costs of selling?",
      answer: "Selling costs typically include real estate commission (usually 5-6% of sale price), legal fees, staging costs, marketing expenses, and potential capital gains tax. Jigar provides transparent cost breakdowns upfront."
    },
    {
      question: "How long will it take to sell my home?",
      answer: "The average time on market varies by location and price point, but typically ranges from 15-45 days in the GTA. Proper pricing, staging, and marketing are key factors in selling quickly."
    },
    {
      question: "Should I renovate before selling?",
      answer: "Not all renovations add value. Focus on improvements that buyers notice: fresh paint, updated fixtures, decluttering, and curb appeal. Jigar can recommend which updates will provide the best return on investment."
    }
  ];

  const generalFAQs = [
    {
      question: "What areas does Jigar Patel serve?",
      answer: "Jigar specializes in the Greater Toronto Area (GTA), including Toronto, Mississauga, Brampton, Vaughan, Richmond Hill, Markham, Scarborough, North York, Etobicoke, and surrounding communities."
    },
    {
      question: "How is Jigar's commission structured?",
      answer: "Jigar's commission is competitive and transparent. For buyers, the seller typically pays the commission. For sellers, Jigar provides full-service marketing and support. Contact Jigar for detailed commission information."
    },
    {
      question: "What makes Jigar different from other realtors?",
      answer: "Jigar combines deep local market knowledge, personalized service, cutting-edge marketing technology, and a commitment to transparent communication. He's dedicated to making your real estate experience smooth and successful."
    },
    {
      question: "Can I use Jigar's services if I'm relocating from another province or country?",
      answer: "Absolutely! Jigar has extensive experience helping clients relocate to the GTA. He can provide area information, connect you with local services, and even arrange virtual tours if you can't visit in person."
    },
    {
      question: "How do I get started working with Jigar?",
      answer: "Simply contact Jigar via phone, email, or the contact form on this website. He'll schedule a consultation to understand your needs and explain how he can help you achieve your real estate goals."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-full">
              <HelpCircle className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Get answers to common questions about buying, selling, and working with Jigar Patel
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Buyer FAQs */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              For Buyers
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {buyerFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`buyer-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Seller FAQs */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              For Sellers
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {sellerFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`seller-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* General FAQs */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              General Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {generalFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`general-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Jigar is here to help with personalized answers to your specific situation.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Call Jigar</h3>
                <p className="text-gray-600 mb-4">(416) 555-0123</p>
                <Button className="w-full">Call Now</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Send Email</h3>
                <p className="text-gray-600 mb-4">jigar@jigarpatelrealestate.com</p>
                <Button variant="outline" className="w-full">Send Email</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
