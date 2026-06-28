import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp, DeliveryDetails } from "@/data/context";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, CreditCard, ClipboardList, Check, ArrowLeft, ArrowRight, Truck, Banknote, Smartphone } from "lucide-react";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const steps = [
  { label: "Delivery", icon: MapPin },
  { label: "Payment", icon: CreditCard },
  { label: "Summary", icon: ClipboardList },
];

// Validation helpers
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^\+?[\d\s\-()]{7,15}$/;
const PINCODE_REGEX = /^\d{5,6}$/;
const CARD_NUMBER_REGEX = /^\d{13,19}$/;
const CARD_EXPIRY_REGEX = /^(0[1-9]|1[0-2])\/\d{2}$/;
const CVV_REGEX = /^\d{3,4}$/;

function generateOrderId(): string {
  const uuid = crypto.randomUUID();
  return "NH-" + uuid.replace(/-/g, "").substring(0, 10).toUpperCase();
}

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartSubtotal, cartDiscount, cartDeliveryFee, cartTotal, clearCart, addOrder } = useApp();
  const [step, setStep] = useState(0);
  const [delivery, setDelivery] = useState<DeliveryDetails>({ name: "", email: "", phone: "", address: "", city: "", pincode: "" });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center px-4">
        <p className="text-muted-foreground font-medium mb-4">Your cart is empty</p>
        <button onClick={() => navigate("/shop")} className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-display font-semibold text-sm hover:bg-sage-dark transition-colors">
          Browse Products
        </button>
      </div>
    );
  }

  const validateStep0 = () => {
    const e: Record<string, string> = {};
    if (!delivery.name.trim()) e.name = "Name is required";
    else if (delivery.name.trim().length < 2) e.name = "Name must be at least 2 characters";

    if (!delivery.email.trim()) e.email = "Email is required";
    else if (!EMAIL_REGEX.test(delivery.email.trim())) e.email = "Please enter a valid email address";

    if (!delivery.phone.trim()) e.phone = "Phone number is required";
    else if (!PHONE_REGEX.test(delivery.phone.replace(/\s/g, ""))) e.phone = "Please enter a valid phone number (7-15 digits)";

    if (!delivery.address.trim()) e.address = "Address is required";
    else if (delivery.address.trim().length < 5) e.address = "Please enter a complete address";

    if (!delivery.city.trim()) e.city = "City is required";

    if (!delivery.pincode.trim()) e.pincode = "PIN code is required";
    else if (!PINCODE_REGEX.test(delivery.pincode.trim())) e.pincode = "PIN code must be 5-6 digits";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep1 = () => {
    if (paymentMethod !== "card") return true;
    const e: Record<string, string> = {};
    const rawCardNumber = cardNumber.replace(/\s/g, "");
    if (!rawCardNumber) e.cardNumber = "Card number is required";
    else if (!CARD_NUMBER_REGEX.test(rawCardNumber)) e.cardNumber = "Please enter a valid card number (13-19 digits)";

    if (!cardExpiry) e.cardExpiry = "Expiry date is required";
    else if (!CARD_EXPIRY_REGEX.test(cardExpiry)) e.cardExpiry = "Use MM/YY format";
    else {
      const [month, year] = cardExpiry.split("/").map(Number);
      const now = new Date();
      const expiry = new Date(2000 + year, month);
      if (expiry <= now) e.cardExpiry = "Card has expired";
    }

    if (!cardCvv) e.cardCvv = "CVV is required";
    else if (!CVV_REGEX.test(cardCvv)) e.cardCvv = "CVV must be 3-4 digits";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 0 && !validateStep0()) return;
    if (step === 1 && !validateStep1()) return;
    setStep((s) => Math.min(s + 1, 2));
  };

  const placeOrder = () => {
    const orderId = generateOrderId();
    addOrder({
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      deliveryFee: cartDeliveryFee,
      total: cartTotal,
      delivery,
      paymentMethod,
      orderId,
      date: new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
    });
    clearCart();
    toast.success("Order placed successfully!");
    navigate("/order-confirmation");
  };

  // Input masking helpers
  const handleCardNumberChange = (value: string) => {
    const digits = value.replace(/\D/g, "").substring(0, 19);
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);
    setErrors({ ...errors, cardNumber: "" });
  };

  const handleExpiryChange = (value: string) => {
    let digits = value.replace(/\D/g, "").substring(0, 4);
    if (digits.length >= 3) {
      digits = digits.substring(0, 2) + "/" + digits.substring(2);
    }
    setCardExpiry(digits);
    setErrors({ ...errors, cardExpiry: "" });
  };

  const handleCvvChange = (value: string) => {
    const digits = value.replace(/\D/g, "").substring(0, 4);
    setCardCvv(digits);
    setErrors({ ...errors, cardCvv: "" });
  };

  const fieldLabels: Record<string, string> = {
    name: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    address: "Address",
    city: "City",
    pincode: "PIN Code",
  };

  const fieldPlaceholders: Record<string, string> = {
    name: "Enter your full name",
    email: "you@example.com",
    phone: "+1 234 567 8901",
    address: "Enter your street address",
    city: "Enter your city",
    pincode: "Enter PIN code",
  };

  const fieldTypes: Record<string, string> = {
    name: "text",
    email: "email",
    phone: "tel",
    address: "text",
    city: "text",
    pincode: "text",
  };

  const inputCls = "w-full px-4 py-3 rounded-2xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all text-sm";
  const inputErrorCls = "w-full px-4 py-3 rounded-2xl bg-background border border-destructive text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-destructive/30 transition-all text-sm";

  return (
    <div className="min-h-screen pt-24 pb-0">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Stepper */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold transition-all ${i <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                {i < step ? <Check className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</span>
              {i < steps.length - 1 && <div className={`w-8 sm:w-16 h-0.5 rounded-full ${i < step ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
            {step === 0 && (
              <div className="glass-strong rounded-3xl p-8 space-y-5">
                <h2 className="font-display font-bold text-xl text-foreground">Delivery Details</h2>
                {(["name", "email", "phone", "address", "city", "pincode"] as const).map((field) => (
                  <div key={field}>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">{fieldLabels[field]}</label>
                    <input
                      type={fieldTypes[field]}
                      value={delivery[field]}
                      onChange={(e) => { setDelivery({ ...delivery, [field]: e.target.value }); setErrors({ ...errors, [field]: "" }); }}
                      placeholder={fieldPlaceholders[field]}
                      className={errors[field] ? inputErrorCls : inputCls}
                    />
                    {errors[field] && <p className="text-destructive text-xs mt-1">{errors[field]}</p>}
                  </div>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="glass-strong rounded-3xl p-8 space-y-5">
                <h2 className="font-display font-bold text-xl text-foreground">Payment Method</h2>
                {[
                  { id: "cod", label: "Cash on Delivery", icon: Banknote },
                  { id: "upi", label: "UPI", icon: Smartphone },
                  { id: "card", label: "Credit/Debit Card", icon: CreditCard },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => { setPaymentMethod(m.id); setErrors({}); }}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${paymentMethod === m.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted"}`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === m.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                      <m.icon className="w-5 h-5" />
                    </div>
                    <span className="font-display font-semibold text-sm text-foreground">{m.label}</span>
                    {paymentMethod === m.id && <Check className="w-4 h-4 text-primary ml-auto" />}
                  </button>
                ))}
                {paymentMethod === "card" && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <input
                        placeholder="Card Number"
                        value={cardNumber}
                        onChange={(e) => handleCardNumberChange(e.target.value)}
                        maxLength={23}
                        className={errors.cardNumber ? inputErrorCls : inputCls}
                      />
                      {errors.cardNumber && <p className="text-destructive text-xs mt-1">{errors.cardNumber}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => handleExpiryChange(e.target.value)}
                          maxLength={5}
                          className={errors.cardExpiry ? inputErrorCls : inputCls}
                        />
                        {errors.cardExpiry && <p className="text-destructive text-xs mt-1">{errors.cardExpiry}</p>}
                      </div>
                      <div>
                        <input
                          placeholder="CVV"
                          value={cardCvv}
                          onChange={(e) => handleCvvChange(e.target.value)}
                          maxLength={4}
                          type="password"
                          className={errors.cardCvv ? inputErrorCls : inputCls}
                        />
                        {errors.cardCvv && <p className="text-destructive text-xs mt-1">{errors.cardCvv}</p>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="glass-strong rounded-3xl p-8 space-y-4">
                  <h2 className="font-display font-bold text-xl text-foreground">Order Summary</h2>
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-3">
                        <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-xl object-cover" draggable="false" />
                        <div className="flex-1 min-w-0">
                          <p className="font-display font-semibold text-sm text-foreground truncate">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-display font-semibold text-sm">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border pt-4 space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>${cartSubtotal.toFixed(2)}</span></div>
                    {cartDiscount > 0 && <div className="flex justify-between text-primary"><span>Discount (10%)</span><span>-${cartDiscount.toFixed(2)}</span></div>}
                    <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span>{cartDeliveryFee === 0 ? "Free" : `$${cartDeliveryFee.toFixed(2)}`}</span></div>
                    <div className="flex justify-between font-display font-bold text-foreground text-base pt-2 border-t border-border"><span>Total</span><span>${cartTotal.toFixed(2)}</span></div>
                  </div>
                </div>
                <div className="glass-strong rounded-3xl p-6 space-y-2">
                  <h3 className="font-display font-semibold text-sm text-foreground flex items-center gap-2"><Truck className="w-4 h-4 text-primary" />Delivery to</h3>
                  <p className="text-sm text-muted-foreground">{delivery.name} · {delivery.phone}</p>
                  <p className="text-sm text-muted-foreground">{delivery.email}</p>
                  <p className="text-sm text-muted-foreground">{delivery.address}, {delivery.city} - {delivery.pincode}</p>
                  <p className="text-xs text-muted-foreground mt-1">Payment: {paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "upi" ? "UPI" : "Card"}</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-3 mt-8 mb-16">
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="flex-1 py-3.5 rounded-2xl bg-secondary text-secondary-foreground font-display font-semibold text-sm flex items-center justify-center gap-2 hover:bg-muted transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          )}
          {step < 2 ? (
            <button onClick={next} className="flex-1 py-3.5 rounded-2xl bg-primary text-primary-foreground font-display font-semibold text-sm flex items-center justify-center gap-2 hover:bg-sage-dark transition-colors">
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={placeOrder} className="flex-1 py-3.5 rounded-2xl bg-primary text-primary-foreground font-display font-semibold text-sm flex items-center justify-center gap-2 hover:bg-sage-dark transition-colors">
              <Check className="w-4 h-4" /> Place Order
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
