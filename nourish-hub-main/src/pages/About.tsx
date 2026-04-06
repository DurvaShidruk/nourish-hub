import { motion } from "framer-motion";
import { Heart, Shield, Leaf, Users } from "lucide-react";
import Footer from "@/components/Footer";

const values = [
  { icon: Heart, title: "Health First", desc: "Every product is curated with your wellbeing in mind." },
  { icon: Shield, title: "Trusted Quality", desc: "We partner with verified suppliers for premium ingredients." },
  { icon: Leaf, title: "Sustainable", desc: "Eco-conscious sourcing and packaging across our catalog." },
  { icon: Users, title: "Community", desc: "Built by nutritionists, dietitians, and health enthusiasts." },
];

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-0">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mb-4">About NutriCart</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We believe grocery shopping should be personalized to your health needs. NutriCart combines nutrition science with modern e-commerce to help you make smarter food choices.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-strong rounded-3xl p-8"
            >
              <div className="w-12 h-12 rounded-2xl bg-sage-light flex items-center justify-center mb-4">
                <v.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
