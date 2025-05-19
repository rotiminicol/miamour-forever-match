
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, HandHeart, Users } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-pattern py-20 md:py-32">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-miamour-burgundy mb-6">
              Find Your Perfect Match<br />
              <span className="text-miamour-gold">Build Lasting Love</span>
            </h1>
            <p className="text-lg md:text-xl text-miamour-charcoal max-w-2xl mx-auto mb-10">
              MiAmour helps couples find their perfect match and nurture their relationships with expert therapy and guidance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button className="bg-miamour-burgundy text-white hover:bg-miamour-burgundy/90 text-lg px-8 py-6">
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" className="border-miamour-burgundy text-miamour-burgundy hover:bg-miamour-blush/30 text-lg px-8 py-6">
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
              <div className="text-miamour-gold mb-4">
                <Heart className="h-12 w-12" />
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
              <div className="text-miamour-gold mb-4">
                <HandHeart className="h-12 w-12" />
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
                <div className="w-12 h-12 bg-miamour-blush rounded-full flex items-center justify-center text-miamour-burgundy mr-4">
                  <Users className="h-6 w-6" />
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
                <div className="w-12 h-12 bg-miamour-blush rounded-full flex items-center justify-center text-miamour-burgundy mr-4">
                  <Users className="h-6 w-6" />
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
                <div className="w-12 h-12 bg-miamour-blush rounded-full flex items-center justify-center text-miamour-burgundy mr-4">
                  <Users className="h-6 w-6" />
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
