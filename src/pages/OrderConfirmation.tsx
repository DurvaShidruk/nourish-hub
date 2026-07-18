import { Link } from "react-router-dom";
import { useApp } from "@/data/context";
import { motion } from "framer-motion";
import { CheckCircle2, Package, Truck, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";

export default function OrderConfirmation() {
  const { lastOrder } = useApp();

  if (!lastOrder) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center px-4">
        <p className="text-muted-foreground font-medium mb-4">No recent order found</p>
        <Link to="/shop" className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-display font-semibold text-sm hover:bg-sage-dark transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-0">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center mb-10">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-display font-extrabold text-3xl text-foreground mb-2">Order Placed!</h1>
          <p className="text-muted-foreground">Your order <span className="font-semibold text-foreground">{lastOrder.orderId}</span> has been confirmed.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="space-y-6 mb-10">
          {/* Estimated Delivery */}
          <div className="glass-strong rounded-3xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Truck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-display font-semibold text-sm text-foreground">Estimated Delivery</p>
              <p className="text-sm text-muted-foreground">2-3 business days</p>
            </div>
          </div>

          {/* Items */}
          <div className="glass-strong rounded-3xl p-6 space-y-4">
            <h3 className="font-display font-semibold text-sm text-foreground flex items-center gap-2">
              <Package className="w-4 h-4 text-primary" /> Order Items
            </h3>
            <div className="space-y-3">
              {lastOrder.items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <img src={item.product.image} alt={item.product.name} className="w-10 h-10 rounded-lg object-cover" draggable="false" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">× {item.quantity}</p>
                  </div>
                  <span className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-1 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>${lastOrder.subtotal.toFixed(2)}</span></div>
              {lastOrder.discount > 0 && <div className="flex justify-between text-primary"><span>Discount</span><span>-${lastOrder.discount.toFixed(2)}</span></div>}
              <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span>{lastOrder.deliveryFee === 0 ? "Free" : `$${lastOrder.deliveryFee.toFixed(2)}`}</span></div>
              <div className="flex justify-between font-display font-bold text-foreground pt-2 border-t border-border"><span>Total</span><span>${lastOrder.total.toFixed(2)}</span></div>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-3 mb-16">
          <Link to="/shop" className="flex-1 py-3.5 rounded-2xl bg-primary text-primary-foreground font-display font-semibold text-sm flex items-center justify-center gap-2 hover:bg-sage-dark transition-colors">
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/order-history" className="flex-1 py-3.5 rounded-2xl bg-secondary text-secondary-foreground font-display font-semibold text-sm flex items-center justify-center gap-2 hover:bg-muted transition-colors">
            View Order History
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
