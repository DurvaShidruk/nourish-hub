import { useApp } from "@/data/context";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  History,
  ShoppingBag,
  Package,
  Truck,
  CreditCard,
  Banknote,
  Smartphone,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react";
import Footer from "@/components/Footer";
import { useState } from "react";

const paymentIcon: Record<string, React.ReactNode> = {
  cod: <Banknote className="w-4 h-4" />,
  upi: <Smartphone className="w-4 h-4" />,
  card: <CreditCard className="w-4 h-4" />,
};

const paymentLabel: Record<string, string> = {
  cod: "Cash on Delivery",
  upi: "UPI",
  card: "Credit / Debit Card",
};

export default function OrderHistory() {
  const { orders } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div className="min-h-screen pt-24 pb-0">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <History className="w-5 h-5 text-primary" />
            <span className="text-xs font-medium text-primary">Your Orders</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl text-foreground mb-1">
            Order History
          </h1>
          <p className="text-muted-foreground text-sm">
            {orders.length > 0
              ? `${orders.length} order${orders.length > 1 ? "s" : ""} placed`
              : "No orders yet"}
          </p>
        </motion.div>

        {/* Empty State */}
        {orders.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-strong rounded-3xl p-12 flex flex-col items-center justify-center text-center"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-primary/50" />
            </div>
            <h2 className="font-display font-bold text-lg text-foreground mb-2">
              No orders yet
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Your completed orders will appear here.
            </p>
            <Link
              to="/shop"
              className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-display font-semibold text-sm flex items-center gap-2 hover:bg-sage-dark transition-colors"
            >
              Start Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}

        {/* Orders List */}
        <div className="space-y-4 pb-16">
          <AnimatePresence>
            {orders.map((order, i) => (
              <motion.div
                key={order.orderId}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="glass-strong rounded-3xl overflow-hidden"
              >
                {/* Order Header — always visible */}
                <button
                  onClick={() => toggle(order.orderId)}
                  className="w-full p-6 flex items-center justify-between gap-4 text-left hover:bg-muted/30 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-display font-bold text-sm text-foreground">
                        {order.orderId}
                      </span>
                      {i === 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold">
                          Latest
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <span className="text-xs text-muted-foreground">
                        {order.items.length} item{order.items.length > 1 ? "s" : ""}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="font-display font-bold text-sm text-foreground">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-xl">
                      {paymentIcon[order.paymentMethod]}
                      <span className="hidden sm:block">
                        {paymentLabel[order.paymentMethod] ?? order.paymentMethod}
                      </span>
                    </div>
                    {expandedId === order.orderId ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {/* Expanded Detail */}
                <AnimatePresence>
                  {expandedId === order.orderId && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 space-y-5 border-t border-border pt-5">
                        {/* Items */}
                        <div>
                          <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2 mb-3">
                            <Package className="w-3.5 h-3.5 text-primary" />
                            Items Ordered
                          </h4>
                          <div className="space-y-3">
                            {order.items.map((item) => (
                              <div
                                key={item.product.id}
                                className="flex items-center gap-3"
                              >
                                <img
                                  src={item.product.image}
                                  alt={item.product.name}
                                  className="w-11 h-11 rounded-xl object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-foreground truncate">
                                    {item.product.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    × {item.quantity}
                                  </p>
                                </div>
                                <span className="text-sm font-semibold text-foreground">
                                  ${(item.product.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Price Breakdown */}
                        <div className="bg-muted/40 rounded-2xl p-4 space-y-2 text-sm">
                          <div className="flex justify-between text-muted-foreground">
                            <span>Subtotal</span>
                            <span>${order.subtotal.toFixed(2)}</span>
                          </div>
                          {order.discount > 0 && (
                            <div className="flex justify-between text-primary">
                              <span>Discount (10%)</span>
                              <span>−${order.discount.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-muted-foreground">
                            <span>Delivery</span>
                            <span>
                              {order.deliveryFee === 0
                                ? "Free"
                                : `$${order.deliveryFee.toFixed(2)}`}
                            </span>
                          </div>
                          <div className="flex justify-between font-display font-bold text-foreground pt-2 border-t border-border">
                            <span>Total</span>
                            <span>${order.total.toFixed(2)}</span>
                          </div>
                        </div>

                        {/* Delivery Address */}
                        <div>
                          <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2 mb-2">
                            <Truck className="w-3.5 h-3.5 text-primary" />
                            Delivered To
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {order.delivery.name} · {order.delivery.phone}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.delivery.address}, {order.delivery.city} –{" "}
                            {order.delivery.pincode}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  );
}
