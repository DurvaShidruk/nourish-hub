import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp, DeliveryDetails } from "@/data/context";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  CreditCard,
  ClipboardList,
  Check,
  Banknote,
  Smartphone,
} from "lucide-react";
import Footer from "@/components/Footer";
import { toast } from "sonner";

import { handlePayment } from "@/lib/payment";
import { placeOrder as saveOrderToDB } from "@/lib/orders";
import { auth } from "@/lib/firebase";

export default function Checkout() {
  const navigate = useNavigate();

  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartDeliveryFee,
    cartTotal,
    clearCart,
    setLastOrder,
  } = useApp();

  const [step, setStep] = useState(0);
  const [delivery, setDelivery] = useState<DeliveryDetails>({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  // 🛑 EMPTY CART
  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p>Your cart is empty</p>
      </div>
    );
  }

  // ✅ VALIDATION
  const validateStep0 = () => {
    if (
      !delivery.name ||
      !delivery.phone ||
      !delivery.address ||
      !delivery.city ||
      !delivery.pincode
    ) {
      toast.error("Fill all fields");
      return false;
    }
    return true;
  };

  const next = () => {
    if (step === 0 && !validateStep0()) return;
    setStep((s) => Math.min(s + 1, 2));
  };

  // 🔥 FINAL PLACE ORDER FUNCTION
  const placeOrder = async () => {
    const user = auth.currentUser;

    if (!user) {
      toast.error("Please login first");
      return;
    }

    const orderData = {
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      deliveryFee: cartDeliveryFee,
      total: cartTotal,
      delivery,
      paymentMethod,
      orderId:
        "NC-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      date: new Date().toLocaleDateString(),
    };

    // 🟢 COD (NO RAZORPAY)
    if (paymentMethod === "cod") {
      try {
        await saveOrderToDB(user, cart, cartTotal);

        setLastOrder(orderData);
        clearCart();

        toast.success("Order placed successfully!");
        navigate("/order-confirmation");
      } catch (err) {
        console.error(err);
        toast.error("Order failed");
      }
      return; // ❗ VERY IMPORTANT
    }

    // 💳 ONLINE PAYMENT (UPI / CARD)
    handlePayment(cartTotal, async () => {
      try {
        await saveOrderToDB(user, cart, cartTotal);

        setLastOrder(orderData);
        clearCart();

        toast.success("Payment successful!");
        navigate("/order-confirmation");
      } catch (err) {
        console.error(err);
        toast.error("Order save failed");
      }
    });
  };

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-2xl mx-auto px-4">

        <AnimatePresence mode="wait">
          <motion.div key={step}>

            {/* STEP 1 */}
            {step === 0 && (
              <div className="glass-strong p-8 rounded-3xl space-y-4">
                <h2>Delivery Details</h2>

                {(["name", "phone", "address", "city", "pincode"] as const).map(
                  (field) => (
                    <input
                      key={field}
                      value={delivery[field]}
                      onChange={(e) =>
                        setDelivery({
                          ...delivery,
                          [field]: e.target.value,
                        })
                      }
                      placeholder={field}
                      className="w-full p-3 rounded-xl bg-muted"
                    />
                  )
                )}
              </div>
            )}

            {/* STEP 2 */}
            {step === 1 && (
              <div className="glass-strong p-8 rounded-3xl space-y-4">
                <h2>Payment Method</h2>

                {[
                  { id: "cod", label: "Cash on Delivery", icon: Banknote },
                  { id: "upi", label: "UPI", icon: Smartphone },
                  { id: "card", label: "Card", icon: CreditCard },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border ${
                      paymentMethod === m.id
                        ? "bg-primary/10 border-primary"
                        : ""
                    }`}
                  >
                    <m.icon className="w-5 h-5" />
                    {m.label}
                    {paymentMethod === m.id && <Check className="ml-auto" />}
                  </button>
                ))}
              </div>
            )}

            {/* STEP 3 */}
            {step === 2 && (
              <div className="glass-strong p-8 rounded-3xl space-y-4">
                <h2>Summary</h2>

                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between">
                    <span>
                      {item.product.name} x {item.quantity}
                    </span>
                    <span>
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                ))}

                <p className="font-bold">Total: ₹{cartTotal}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* NAV */}
        <div className="flex gap-3 mt-6">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 bg-gray-200 p-3 rounded-xl"
            >
              Back
            </button>
          )}

          {step < 2 ? (
            <button
              onClick={next}
              className="flex-1 bg-green-500 text-white p-3 rounded-xl"
            >
              Next
            </button>
          ) : (
            <button
              onClick={placeOrder}
              className="flex-1 bg-green-500 text-white p-3 rounded-xl"
            >
              Place Order
            </button>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}