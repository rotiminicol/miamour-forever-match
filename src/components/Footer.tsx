
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.footer 
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="bg-gradient-to-b from-miamour-navy to-miamour-navy-dark text-white pt-16 pb-12"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <motion.img
                src="/lovable-uploads/miLogo2.png"
                alt="miamour.me logo"
                className="h-9 w-9 rounded-full shadow-md object-contain bg-white"
                whileHover={{ rotate: [0, 10, -5, 0], scale: 1.08 }}
                transition={{ duration: 0.8 }}
              />
              <span className="text-2xl font-serif font-semibold text-white bg-clip-text bg-gradient-to-r from-miamour-gold to-miamour-gold-light">
                miamour.me
              </span>
            </motion.div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Finding love, nurturing relationships. MiAmour helps you find your perfect match and build lasting connections.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="bg-miamour-navy-light p-2 rounded-full hover:bg-miamour-gold transition-all duration-300"
                >
                  <span className="sr-only">{social}</span>
                  <div className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services Column */}
          <motion.div variants={itemVariants}>
            <h3 className="font-serif text-lg mb-6 text-transparent bg-clip-text bg-gradient-to-r from-miamour-gold to-miamour-gold-light">
              Services
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Wedding Matching", path: "/wedding-matching" },
                { name: "Couples Therapy", path: "/couples-therapy" },
                { name: "Relationship Coaching", path: "/relationship-coaching" },
                { name: "Pricing", path: "/pricing" },
              ].map((item) => (
                <motion.li 
                  key={item.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to={item.path} 
                    className="flex items-center text-gray-300 hover:text-white transition-colors text-sm group"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 text-miamour-gold opacity-0 group-hover:opacity-100 transition-all" />
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company Column */}
          <motion.div variants={itemVariants}>
            <h3 className="font-serif text-lg mb-6 text-transparent bg-clip-text bg-gradient-to-r from-miamour-gold to-miamour-gold-light">
              Company
            </h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", path: "/about" },
                { name: "Blog", path: "/blog" },
                { name: "Careers", path: "/careers" },
                { name: "Contact Us", path: "/contact" },
              ].map((item) => (
                <motion.li 
                  key={item.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to={item.path} 
                    className="flex items-center text-gray-300 hover:text-white transition-colors text-sm group"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 text-miamour-gold opacity-0 group-hover:opacity-100 transition-all" />
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Column */}
          <motion.div variants={itemVariants}>
            <h3 className="font-serif text-lg mb-6 text-transparent bg-clip-text bg-gradient-to-r from-miamour-gold to-miamour-gold-light">
              Legal
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Terms of Service", path: "/terms" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Cookie Policy", path: "/cookies" },
              ].map((item) => (
                <motion.li 
                  key={item.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to={item.path} 
                    className="flex items-center text-gray-300 hover:text-white transition-colors text-sm group"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 text-miamour-gold opacity-0 group-hover:opacity-100 transition-all" />
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        {/* Bottom Section */}
        <motion.div 
          variants={itemVariants}
          className="border-t border-gray-800 mt-12 pt-8 text-center sm:flex sm:justify-between sm:text-left"
        >
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} MiAmour. All rights reserved.
          </p>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="mt-4 sm:mt-0"
          >
            <p className="text-gray-400 text-sm flex items-center justify-center sm:justify-end">
              <span className="mr-1">Made with</span>
              <Heart className="h-4 w-4 text-miamour-gold animate-pulse" />
              <span className="ml-1">for couples worldwide</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
