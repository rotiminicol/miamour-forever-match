import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Users, Settings } from "lucide-react";
import { motion } from "framer-motion";

// Create a custom HandHeart icon since it's not in the standard lucide-react package
const HandHeart = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"></path>
    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path>
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.9-3.97a1 1 0 0 1 .29-1.64L3 14"></path>
    <path d="M17.42 14.44A3 3 0 0 0 19 17a3 3 0 0 0-5.94.56"></path>
    <path d="M13.41 17.77a3 3 0 0 0 .46 2 3 3 0 0 0 5.94-.56"></path>
    <path d="M10.41, 19.87a3 3 0 0 0 5.94-.56, 3 3 0 0 0-.46-2, 3 3 0 0 0-4.11-1.2"></path>
  </svg>
);

const Index = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-miamour-cream opacity-90 z-0"></div>
        <div className="absolute inset-0 bg-cover bg-center z-[-1]" style={{ backgroundImage: `url('/lovable-uploads/89d37f15-5428-454f-9922-b847af3f994c.png')` }}></div>
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-miamour-burgundy mb-6">
              Find Your Perfect Match<br />
              <span className="text-miamour-gold">Build Lasting Love</span>
            </h1>
            <p className="text-lg md:text-xl text-miamour-charcoal max-w-2xl mx-auto mb-10 bg-white/70 p-4 rounded-lg">
              MiAmour helps couples find their perfect match and nurture their relationships with expert therapy and guidance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button className="bg-miamour-burgundy text-white hover:bg-miamour-burgundy/90 text-lg px-8 py-6">
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" className="bg-white/80 border-miamour-burgundy text-miamour-burgundy hover:bg-miamour-blush/30 text-lg px-8 py-6">
                  View Plans
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-miamour-burgundy mb-4">
              Our Services
            </h2>
            <p className="text-miamour-charcoal max-w-2xl mx-auto">
              Whether you're looking for love or nurturing your existing relationship, MiAmour offers premium services to help you succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-miamour-cream rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow border border-miamour-blush">
              <div className="flex items-center mb-6">
                <div className="text-miamour-gold mr-4">
                  <Heart className="h-12 w-12" />
                </div>
                <div className="w-20 h-20 rounded-full overflow-hidden">
                  <img src="/lovable-uploads/7c2a3061-f38e-4225-be10-d69d0056a60c.png" alt="Couple" className="w-full h-full object-cover" />
                </div>
              </div>
              <h3 className="text-2xl font-serif font-medium text-miamour-burgundy mb-4">
                Wedding Matching
              </h3>
              <p className="text-miamour-charcoal mb-6">
                Our advanced algorithm and personalized consultation helps you find your perfect match based on values, interests, and life goals.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="text-miamour-gold mr-2">✓</span>
                  <span>Personalized matching system</span>
                </li>
                <li className="flex items-center">
                  <span className="text-miamour-gold mr-2">✓</span>
                  <span>Compatibility assessment</span>
                </li>
                <li className="flex items-center">
                  <span className="text-miamour-gold mr-2">✓</span>
                  <span>Guided communication</span>
                </li>
              </ul>
              <Link to="/wedding-matching">
                <Button className="bg-miamour-burgundy text-white hover:bg-miamour-burgundy/90 w-full">
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="bg-miamour-cream rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow border border-miamour-blush">
              <div className="flex items-center mb-6">
                <div className="text-miamour-gold mr-4">
                  <HandHeart className="h-12 w-12" />
                </div>
                <div className="w-20 h-20 rounded-full overflow-hidden">
                  <img src="/lovable-uploads/3c1cafa9-8e1d-4272-a237-4d411868fc09.png" alt="Couple" className="w-full h-full object-cover" />
                </div>
              </div>
              <h3 className="text-2xl font-serif font-medium text-miamour-burgundy mb-4">
                Couples Therapy
              </h3>
              <p className="text-miamour-charcoal mb-6">
                Expert therapists help you strengthen your relationship, improve communication, and overcome challenges together.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="text-miamour-gold mr-2">✓</span>
                  <span>Licensed relationship therapists</span>
                </li>
                <li className="flex items-center">
                  <span className="text-miamour-gold mr-2">✓</span>
                  <span>Virtual & in-person sessions</span>
                </li>
                <li className="flex items-center">
                  <span className="text-miamour-gold mr-2">✓</span>
                  <span>Personalized therapy plans</span>
                </li>
              </ul>
              <Link to="/couples-therapy">
                <Button className="bg-miamour-burgundy text-white hover:bg-miamour-burgundy/90 w-full">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-miamour-cream">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-miamour-burgundy mb-4">
              Success Stories
            </h2>
            <p className="text-miamour-charcoal max-w-2xl mx-auto">
              Hear from couples who found love and strengthened their relationships with MiAmour.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md border border-miamour-blush">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img src="/lovable-uploads/ea449538-9033-4309-ac5d-2fc2ffdbc083.png" alt="Happy couple" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-serif font-medium">Sarah & Michael</h4>
                  <p className="text-sm text-miamour-charcoal">Matched in 2024</p>
                </div>
              </div>
              <p className="text-miamour-charcoal italic">
                "MiAmour's matching algorithm was spot on! We connected instantly and are now planning our wedding. The relationship coaching helped us build a strong foundation."
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md border border-miamour-blush">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img src="/lovable-uploads/e21a4b76-b28b-49de-9e63-0598991a5d03.png" alt="Therapy clients" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-serif font-medium">David & Emma</h4>
                  <p className="text-sm text-miamour-charcoal">Therapy clients</p>
                </div>
              </div>
              <p className="text-miamour-charcoal italic">
                "After 5 years of marriage, we hit a rough patch. The couples therapy at MiAmour helped us reconnect and fall in love all over again. Truly transformative."
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md border border-miamour-blush">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img src="/lovable-uploads/99899bbf-47ce-4f76-9b78-958369c519de.png" alt="Premium members" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-serif font-medium">James & Robert</h4>
                  <p className="text-sm text-miamour-charcoal">Premium members</p>
                </div>
              </div>
              <p className="text-miamour-charcoal italic">
                "As a same-sex couple, we felt completely welcome and supported. MiAmour's inclusive approach and personalized matching made all the difference for us."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Venues Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-miamour-burgundy mb-4">
              Dream Wedding Venues
            </h2>
            <p className="text-miamour-charcoal max-w-2xl mx-auto">
              Explore stunning venues for your special day through our partnership network.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl overflow-hidden shadow-lg group relative">
              <img 
                src="/lovable-uploads/8a4759fb-9f60-4206-86e6-0620a1c94dc7.png" 
                alt="Beach wedding venue" 
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-miamour-burgundy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-serif font-medium mb-2">Beachfront Paradise</h3>
                  <p className="text-sm">Say "I do" with the sound of waves and a breathtaking ocean view.</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-lg group relative">
              <img 
                src="/lovable-uploads/c9811a52-485d-49b8-8c58-651d452794d1.png" 
                alt="Indoor wedding venue" 
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-miamour-burgundy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-serif font-medium mb-2">Elegant Ballroom</h3>
                  <p className="text-sm">A timeless setting for a sophisticated celebration with your loved ones.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/venues">
              <Button variant="outline" className="border-miamour-burgundy text-miamour-burgundy hover:bg-miamour-blush/30">
                Explore All Venues
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-miamour-burgundy text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">
            Ready to Begin Your Love Story?
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-10 text-gray-100">
            Join thousands of couples who have found love and transformed their relationships with MiAmour.
          </p>
          <Link to="/register">
            <Button className="bg-miamour-gold text-miamour-burgundy hover:bg-miamour-gold/90 text-lg px-8 py-6 font-medium">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Index;
