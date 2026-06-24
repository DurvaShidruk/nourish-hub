import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp, DeliveryDetails } from "@/data/context";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, CreditCard, ClipboardList, Check, ArrowLeft, ArrowRight, Truck, Banknote, Smartphone } from "lucide-react";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, CheckoutValues } from "@/lib/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const steps = [
  { label: "Delivery", icon: MapPin },
  { label: "Payment", icon: CreditCard },
  { label: "Summary", icon: ClipboardList },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartSubtotal, cartDiscount, cartDeliveryFee, cartTotal, clearCart, addOrder } = useApp();
  const [step, setStep] = useState(0);

  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      delivery: {
        name: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
      },
      paymentMethod: "cod",
      card: {
        cardNumber: "",
        expiry: "",
        cvv: "",
      },
    },
    mode: "onChange",
  });

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

  const next = async () => {
    if (step === 0) {
      const isValid = await form.trigger([
        "delivery.name",
        "delivery.phone",
        "delivery.address",
        "delivery.city",
        "delivery.pincode",
      ]);
      if (!isValid) return;
    } else if (step === 1) {
      const isValid = await form.trigger([
        "paymentMethod",
        ...(form.getValues("paymentMethod") === "card"
          ? ["card.cardNumber" as const, "card.expiry" as const, "card.cvv" as const]
          : []),
      ]);
      if (!isValid) return;
    }
    setStep((s) => Math.min(s + 1, 2));
  };

  const onSubmit = (data: CheckoutValues) => {
    if (step < 2) return;
    const orderId = "NC-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    addOrder({
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      deliveryFee: cartDeliveryFee,
      total: cartTotal,
      delivery: data.delivery as DeliveryDetails,
      paymentMethod: data.paymentMethod,
      orderId,
      date: new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
    });
    clearCart();
    toast.success("Order placed successfully!");
    navigate("/order-confirmation");
  };

  const inputCls = "w-full px-4 py-3 rounded-2xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all text-sm";

  const deliveryFields = ["name", "phone", "address", "city", "pincode"] as const;

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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                {step === 0 && (
                  <div className="glass-strong rounded-3xl p-8 space-y-5">
                    <h2 className="font-display font-bold text-xl text-foreground">Delivery Details</h2>
                    {deliveryFields.map((field) => (
                      <FormField
                        key={field}
                        control={form.control}
                        name={`delivery.${field}`}
                        render={({ field: formField }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">
                              {field === "pincode" ? "PIN Code" : field.charAt(0).toUpperCase() + field.slice(1)}
                            </FormLabel>
                            <FormControl>
                              <input
                                placeholder={`Enter ${field}`}
                                className={inputCls}
                                {...formField}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                )}

                {step === 1 && (
                  <div className="glass-strong rounded-3xl p-8 space-y-5">
                    <h2 className="font-display font-bold text-xl text-foreground">Payment Method</h2>
                    
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          {[
                            { id: "cod", label: "Cash on Delivery", icon: Banknote },
                            { id: "upi", label: "UPI", icon: Smartphone },
                            { id: "card", label: "Credit/Debit Card", icon: CreditCard },
                          ].map((m) => (
                            <button
                              type="button"
                              key={m.id}
                              onClick={() => {
                                field.onChange(m.id);
                                form.clearErrors("card");
                              }}
                              className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${field.value === m.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted"}`}
                            >
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${field.value === m.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                                <m.icon className="w-5 h-5" />
                              </div>
                              <span className="font-display font-semibold text-sm text-foreground">{m.label}</span>
                              {field.value === m.id && <Check className="w-4 h-4 text-primary ml-auto" />}
                            </button>
                          ))}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.watch("paymentMethod") === "card" && (
                      <div className="space-y-3 pt-2">
                        <FormField
                          control={form.control}
                          name="card.cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <input placeholder="Card Number" className={inputCls} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <FormField
                            control={form.control}
                            name="card.expiry"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <input placeholder="MM/YY" className={inputCls} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="card.cvv"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <input placeholder="CVV" className={inputCls} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
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
                            <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-xl object-cover" />
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
                      <p className="text-sm text-muted-foreground">{form.getValues("delivery.name")} · {form.getValues("delivery.phone")}</p>
                      <p className="text-sm text-muted-foreground">{form.getValues("delivery.address")}, {form.getValues("delivery.city")} - {form.getValues("delivery.pincode")}</p>
                      <p className="text-xs text-muted-foreground mt-1">Payment: {form.getValues("paymentMethod") === "cod" ? "Cash on Delivery" : form.getValues("paymentMethod") === "upi" ? "UPI" : "Card"}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex gap-3 mt-8 mb-16">
              {step > 0 && (
                <button type="button" onClick={() => setStep(step - 1)} className="flex-1 py-3.5 rounded-2xl bg-secondary text-secondary-foreground font-display font-semibold text-sm flex items-center justify-center gap-2 hover:bg-muted transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              )}
              {step < 2 ? (
                <button type="button" onClick={next} className="flex-1 py-3.5 rounded-2xl bg-primary text-primary-foreground font-display font-semibold text-sm flex items-center justify-center gap-2 hover:bg-sage-dark transition-colors">
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button type="submit" className="flex-1 py-3.5 rounded-2xl bg-primary text-primary-foreground font-display font-semibold text-sm flex items-center justify-center gap-2 hover:bg-sage-dark transition-colors">
                  <Check className="w-4 h-4" /> Place Order
                </button>
              )}
            </div>
          </form>
        </Form>
      </div>
      <Footer />
    </div>
  );
}
