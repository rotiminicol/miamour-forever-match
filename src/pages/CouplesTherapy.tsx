
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HandHeart, CheckCircle, Calendar } from "lucide-react";

const CouplesTherapy = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-miamour-cream py-16 md:py-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-miamour-burgundy mb-6">
                Strengthen Your Relationship
              </h1>
              <p className="text-lg text-miamour-charcoal mb-8">
                Our licensed therapists specialize in couples counseling, helping you build stronger communication, resolve conflicts, and deepen your connection.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="text-miamour-gold mr-3 h-6 w-6" />
                  <p className="text-miamour-charcoal">Licensed relationship therapists</p>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-miamour-gold mr-3 h-6 w-6" />
                  <p className="text-miamour-charcoal">Flexible virtual & in-person sessions</p>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-miamour-gold mr-3 h-6 w-6" />
                  <p className="text-miamour-charcoal">Personalized therapy plans</p>
                </div>
              </div>
              <div className="mt-8">
                <Link to="/register">
                  <Button className="bg-miamour-burgundy text-white hover:bg-miamour-burgundy/90 text-lg px-8 py-6 mr-4">
                    Book a Session
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" className="border-miamour-burgundy text-miamour-burgundy hover:bg-miamour-blush/30">
                    View Plans
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-miamour-gold/20 rounded-full z-0"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-miamour-blush rounded-full z-0"></div>
                <div className="relative z-10 bg-white p-6 rounded-lg shadow-md border border-miamour-blush/50">
                  <img
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Couples therapy session"
                    className="rounded-lg w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-miamour-burgundy mb-4">
              Our Therapeutic Approach
            </h2>
            <p className="text-miamour-charcoal max-w-2xl mx-auto">
              We combine evidence-based techniques with compassionate care to help couples overcome challenges and build stronger connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-miamour-cream rounded-lg p-8 text-center">
              <div className="bg-miamour-blush w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <HandHeart className="text-miamour-burgundy h-8 w-8" />
              </div>
              <h3 className="text-xl font-serif font-medium text-miamour-burgundy mb-4">
                Emotionally Focused Therapy
              </h3>
              <p className="text-miamour-charcoal">
                Identify and transform negative interaction patterns into moments of connection and bonding.
              </p>
            </div>
            
            <div className="bg-miamour-cream rounded-lg p-8 text-center">
              <div className="bg-miamour-blush w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <HandHeart className="text-miamour-burgundy h-8 w-8" />
              </div>
              <h3 className="text-xl font-serif font-medium text-miamour-burgundy mb-4">
                Gottman Method
              </h3>
              <p className="text-miamour-charcoal">
                Build friendship, manage conflict, and create shared meaning using research-backed techniques.
              </p>
            </div>
            
            <div className="bg-miamour-cream rounded-lg p-8 text-center">
              <div className="bg-miamour-blush w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <HandHeart className="text-miamour-burgundy h-8 w-8" />
              </div>
              <h3 className="text-xl font-serif font-medium text-miamour-burgundy mb-4">
                Attachment-Based Therapy
              </h3>
              <p className="text-miamour-charcoal">
                Understand how early attachments influence your relationship and learn to build secure connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section className="py-16 md:py-24 bg-miamour-cream">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-miamour-burgundy mb-4">
              Issues We Help With
            </h2>
            <p className="text-miamour-charcoal max-w-2xl mx-auto">
              Our therapists are experienced in helping couples navigate a wide range of relationship challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-miamour-blush/50">
              <h3 className="text-lg font-serif font-medium text-miamour-burgundy mb-2">
                Communication Problems
              </h3>
              <p className="text-miamour-charcoal">
                Learn to express needs clearly and listen effectively to prevent misunderstandings.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-miamour-blush/50">
              <h3 className="text-lg font-serif font-medium text-miamour-burgundy mb-2">
                Conflict Resolution
              </h3>
              <p className="text-miamour-charcoal">
                Develop healthy ways to address disagreements and find mutually satisfying solutions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-miamour-blush/50">
              <h3 className="text-lg font-serif font-medium text-miamour-burgundy mb-2">
                Intimacy Concerns
              </h3>
              <p className="text-miamour-charcoal">
                Address emotional and physical intimacy issues and rebuild connection.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-miamour-blush/50">
              <h3 className="text-lg font-serif font-medium text-miamour-burgundy mb-2">
                Trust & Infidelity
              </h3>
              <p className="text-miamour-charcoal">
                Work through betrayal and rebuild trust with compassionate guidance.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-miamour-blush/50">
              <h3 className="text-lg font-serif font-medium text-miamour-burgundy mb-2">
                Life Transitions
              </h3>
              <p className="text-miamour-charcoal">
                Navigate major changes together, from marriage to parenthood to retirement.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-miamour-blush/50">
              <h3 className="text-lg font-serif font-medium text-miamour-burgundy mb-2">
                Premarital Counseling
              </h3>
              <p className="text-miamour-charcoal">
                Build a strong foundation for your marriage with targeted counseling sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-miamour-burgundy mb-4">
              How Therapy Works
            </h2>
            <p className="text-miamour-charcoal max-w-2xl mx-auto">
              Our structured approach ensures you receive the support you need to strengthen your relationship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-miamour-blush w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-miamour-burgundy font-serif font-bold">1</span>
              </div>
              <h3 className="font-serif font-medium text-miamour-burgundy mb-2">Initial Assessment</h3>
              <p className="text-sm text-miamour-charcoal">Complete our relationship questionnaire to help us understand your needs.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-miamour-blush w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-miamour-burgundy font-serif font-bold">2</span>
              </div>
              <h3 className="font-serif font-medium text-miamour-burgundy mb-2">Therapist Matching</h3>
              <p className="text-sm text-miamour-charcoal">We'll match you with a therapist specialized in your specific needs.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-miamour-blush w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-miamour-burgundy font-serif font-bold">3</span>
              </div>
              <h3 className="font-serif font-medium text-miamour-burgundy mb-2">Personalized Plan</h3>
              <p className="text-sm text-miamour-charcoal">Your therapist will create a tailored therapy plan for your relationship goals.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-miamour-blush w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-miamour-burgundy font-serif font-bold">4</span>
              </div>
              <h3 className="font-serif font-medium text-miamour-burgundy mb-2">Regular Sessions</h3>
              <p className="text-sm text-miamour-charcoal">Meet with your therapist via video or in person for ongoing support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-miamour-burgundy text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">
            Ready to Strengthen Your Relationship?
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-10">
            Take the first step toward a more connected and fulfilling relationship with professional therapy support.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/register">
              <Button className="bg-miamour-gold text-miamour-burgundy hover:bg-miamour-gold/90 text-lg px-8 py-6">
                Book Your First Session
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                View Therapy Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CouplesTherapy;
