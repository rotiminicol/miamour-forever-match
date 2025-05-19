
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Heart, Calendar, HandHeart, Star } from "lucide-react";

const plans = [
  {
    id: 'blossom',
    name: 'Blossom Package',
    price: '₦75,000',
    priceUSD: '$20',
    priceEUR: '€18',
    period: '1 month',
    features: [
      'Exclusive matchmaking within your country',
      'Access to live sessions',
      'Basic profile verification',
      'Standard customer support'
    ],
    icon: <Star className="w-6 h-6 text-pink-600" />,
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'harmony',
    name: 'Harmony Package',
    price: '₦125,000',
    priceUSD: '$33',
    priceEUR: '€30',
    period: '3 months',
    features: [
      'Exclusive matchmaking within and outside your country',
      'Access to live sessions',
      'Priority profile verification',
      'Premium customer support',
      'Advanced matching algorithms'
    ],
    icon: <Star className="w-6 h-6 text-purple-600" />,
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'forever',
    name: 'My Forever Package',
    price: '₦225,000',
    priceUSD: '$66',
    priceEUR: '€60',
    period: '6 months',
    features: [
      'Personal matches',
      'Private sessions',
      'Access to high-profile members',
      'Matches within and outside Nigeria',
      'VIP customer support',
      'Exclusive events access'
    ],
    icon: <Star className="w-6 h-6 text-amber-500" />,
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 'personalized',
    name: 'Personalized Matching',
    price: '₦475,000',
    priceUSD: '$125',
    priceEUR: '€115',
    period: '1 year',
    features: [
      'Dedicated matchmaker',
      'Customized matching strategy',
      'Unlimited private sessions',
      'Global elite network access',
      '24/7 VIP support',
      'Premium event invitations'
    ],
    icon: <Heart className="w-6 h-6 text-red-500" />,
    color: 'from-red-500 to-pink-500'
  }
];

const Pricing = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-miamour-cream py-16 md:py-24">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-miamour-burgundy mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-miamour-charcoal max-w-2xl mx-auto mb-8">
            Choose the plan that fits your relationship needs, with no hidden fees and flexible options.
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {plans.map((plan, idx) => (
              <div
                key={plan.id}
                className={`
                  rounded-lg shadow-md overflow-hidden border
                  flex flex-col
                  ${idx === 2 ? "md:-translate-y-4 scale-105 shadow-xl border-2 border-miamour-burgundy" : "border-miamour-blush/50"}
                  bg-gradient-to-br ${plan.color} bg-opacity-10
                  bg-white
                `}
                style={{ backgroundBlendMode: "lighten" }}
              >
                <div className="p-8 text-center border-b border-miamour-blush bg-white/80">
                  <div className="flex justify-center mb-4">{plan.icon}</div>
                  <h3 className="text-2xl font-serif font-medium text-miamour-burgundy mb-2">{plan.name}</h3>
                  <div className="mb-2 flex flex-col items-center">
                    <span className="text-3xl font-bold text-miamour-burgundy">{plan.price}</span>
                    <span className="text-xs text-miamour-charcoal flex gap-2">
                      <span>{plan.priceUSD}</span>
                      <span>{plan.priceEUR}</span>
                      <span className="text-miamour-charcoal">/ {plan.period}</span>
                    </span>
                  </div>
                  <p className="text-sm text-miamour-charcoal">{plan.features[0]}</p>
                </div>
                <div className="p-8 flex-grow bg-white/90">
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li className="flex items-start" key={i}>
                        <Check className="h-5 w-5 text-miamour-gold mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 border-t border-miamour-blush bg-white/80">
                  <Link to="/register">
                    <Button
                      className={`w-full ${
                        idx === 2
                          ? "bg-miamour-burgundy text-white hover:bg-miamour-burgundy/90"
                          : "border-miamour-burgundy text-miamour-burgundy hover:bg-miamour-blush/30"
                      }`}
                      variant={idx === 2 ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Services */}
      <section className="py-16 bg-miamour-cream">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-miamour-burgundy mb-12 text-center">
            Individual Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Therapy Sessions */}
            <div className="bg-white rounded-lg shadow-md p-8 border border-miamour-blush/50">
              <div className="flex items-center mb-6">
                <HandHeart className="h-12 w-12 text-miamour-gold mr-4" />
                <h3 className="text-2xl font-serif font-medium text-miamour-burgundy">
                  Therapy Sessions
                </h3>
              </div>
              <p className="text-miamour-charcoal mb-6">
                One-on-one or couples sessions with our licensed therapists, available both virtually and in-person.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span>Single Session (60 min)</span>
                  <span className="font-medium">$120</span>
                </div>
                <div className="flex justify-between">
                  <span>Package of 4 Sessions</span>
                  <span className="font-medium">$400</span>
                </div>
                <div className="flex justify-between">
                  <span>Package of 8 Sessions</span>
                  <span className="font-medium">$720</span>
                </div>
              </div>
              <Link to="/register">
                <Button className="bg-miamour-burgundy text-white hover:bg-miamour-burgundy/90 w-full">
                  Book a Session
                </Button>
              </Link>
            </div>

            {/* Relationship Workshops */}
            <div className="bg-white rounded-lg shadow-md p-8 border border-miamour-blush/50">
              <div className="flex items-center mb-6">
                <Calendar className="h-12 w-12 text-miamour-gold mr-4" />
                <h3 className="text-2xl font-serif font-medium text-miamour-burgundy">
                  Relationship Workshops
                </h3>
              </div>
              <p className="text-miamour-charcoal mb-6">
                Group learning experiences led by relationship experts, focused on specific relationship skills.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span>Communication Basics (2 hours)</span>
                  <span className="font-medium">$75</span>
                </div>
                <div className="flex justify-between">
                  <span>Conflict Resolution Workshop</span>
                  <span className="font-medium">$85</span>
                </div>
                <div className="flex justify-between">
                  <span>Intimacy Weekend Retreat</span>
                  <span className="font-medium">$350</span>
                </div>
              </div>
              <Link to="/workshops">
                <Button className="bg-miamour-burgundy text-white hover:bg-miamour-burgundy/90 w-full">
                  View Workshop Calendar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-miamour-burgundy mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-2">
              <h3 className="font-serif font-medium text-miamour-burgundy text-lg">Can I cancel my subscription at any time?</h3>
              <p className="text-miamour-charcoal">Yes, you can cancel your subscription at any time with no cancellation fees. Your plan will remain active until the end of your billing period.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-serif font-medium text-miamour-burgundy text-lg">How do therapy sessions work?</h3>
              <p className="text-miamour-charcoal">You can choose between video sessions or in-person sessions based on availability in your area. Each session lasts approximately 50-60 minutes.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-serif font-medium text-miamour-burgundy text-lg">Are your therapists licensed?</h3>
              <p className="text-miamour-charcoal">Yes, all our therapists are licensed professionals with specialized training in couples therapy and relationship counseling.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-serif font-medium text-miamour-burgundy text-lg">What payment methods do you accept?</h3>
              <p className="text-miamour-charcoal">We accept all major credit cards, debit cards, and PayPal. For monthly subscriptions, we also offer ACH direct debit options.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-serif font-medium text-miamour-burgundy text-lg">Is couples therapy covered by insurance?</h3>
              <p className="text-miamour-charcoal">While we don't bill insurance directly, we can provide you with documentation to submit to your insurance for potential reimbursement.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-serif font-medium text-miamour-burgundy text-lg">How is my data protected?</h3>
              <p className="text-miamour-charcoal">We take your privacy seriously. All your data is encrypted, and our platform is HIPAA-compliant to ensure confidentiality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-miamour-burgundy text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">
            Start Your Journey Today
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-10">
            Choose a plan and take the first step toward finding or strengthening love.
          </p>
          <Link to="/register">
            <Button className="bg-miamour-gold text-miamour-burgundy hover:bg-miamour-gold/90 text-lg px-8 py-6">
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Pricing;
