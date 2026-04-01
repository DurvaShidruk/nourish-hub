import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Heart, ShoppingCart, ArrowRight, Leaf, Target, Zap } from "lucide-react";
import Footer from "@/components/Footer";

const features = [
  {
    icon: Heart,
    title: "Personalized Nutrition",
    description: "Get grocery recommendations tailored to your unique health profile and dietary needs.",
  },
  {
    icon: Target,
    title: "Condition-Based Shopping",
    description: "Smart suggestions for PCOS, diabetes, IBD, and other health conditions.",
  },
  {
    icon: Zap,
    title: "Smart Recommendations",
    description: "AI-powered product matching based on your goals — fat loss, muscle gain, or maintenance.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-warm/5 blur-3xl" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage-light text-sage-dark text-xs font-medium mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              Health-first grocery shopping
            </div>
            
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
              Shop Smart for
              <br />
              <span className="text-primary">Your Health</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Get personalized grocery recommendations based on your health profile, 
              dietary goals, and medical conditions. Eat better, live better.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/get-started"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-display font-semibold text-sm hover:bg-sage-dark transition-all duration-200 shadow-soft hover:shadow-elevated"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-card text-foreground font-display font-semibold text-sm border border-border hover:bg-muted transition-all duration-200"
              >
                Browse Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4">
              Why NutriCart?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              We combine nutrition science with smart shopping to help you make healthier choices.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group p-8 rounded-3xl bg-card border border-border hover:shadow-card transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-sage-light flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 rounded-3xl bg-primary text-center overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-sage-dark/30 blur-3xl" />
            <div className="relative">
              <Leaf className="w-10 h-10 text-primary-foreground/80 mx-auto mb-6" />
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary-foreground mb-4">
                Ready to eat healthier?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
                Tell us about your health goals and we'll create your personalized grocery plan.
              </p>
              <Link
                to="/get-started"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-background text-foreground font-display font-semibold text-sm hover:bg-muted transition-colors"
              >
                Create Your Plan
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
