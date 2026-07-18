import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useApp } from "@/data/context";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function CartSidebar() {
  const { cart, cartOpen, setCartOpen, cartSubtotal, cartDiscount, cartDeliveryFee, cartTotal, removeFromCart, updateQuantity } = useApp();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
            onClick={() => setCartOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background border-l border-border z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-display font-bold text-lg text-foreground">Your Cart</h2>
              <button onClick={() => setCartOpen(false)} className="p-2 rounded-xl hover:bg-muted transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-3">
                  <ShoppingBag className="w-12 h-12" />
                  <p className="text-sm font-medium">Your cart is empty</p>
                  <button
                    onClick={() => { setCartOpen(false); navigate("/shop"); }}
                    className="mt-2 px-5 py-2.5 rounded-2xl bg-primary text-primary-foreground text-sm font-medium hover:bg-sage-dark transition-colors"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-4 p-3 rounded-2xl bg-card border border-border">
                      <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-xl object-cover" draggable="false" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-semibold text-sm text-foreground truncate">{item.product.name}</h4>
                        <p className="text-sm text-muted-foreground mt-0.5">${item.product.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center hover:bg-border transition-colors">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center hover:bg-border transition-colors">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.product.id)} className="p-1.5 self-start rounded-lg hover:bg-muted transition-colors">
                        <X className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-border space-y-3">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>${cartSubtotal.toFixed(2)}</span></div>
                  {cartDiscount > 0 && <div className="flex justify-between text-primary"><span>Discount (10%)</span><span>-${cartDiscount.toFixed(2)}</span></div>}
                  <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span>{cartDeliveryFee === 0 ? "Free" : `$${cartDeliveryFee.toFixed(2)}`}</span></div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="font-display font-bold text-foreground">Total</span>
                  <span className="font-display font-bold text-lg text-foreground">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setCartOpen(false); navigate("/shop"); }} className="flex-1 py-3 rounded-2xl bg-secondary text-secondary-foreground font-display font-semibold text-sm hover:bg-muted transition-colors">
                    Continue Shopping
                  </button>
                  <button onClick={() => { setCartOpen(false); navigate("/checkout"); }} className="flex-1 py-3 rounded-2xl bg-primary text-primary-foreground font-display font-semibold text-sm hover:bg-sage-dark transition-colors flex items-center justify-center gap-1.5">
                    Checkout <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
