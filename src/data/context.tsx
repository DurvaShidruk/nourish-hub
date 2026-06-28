import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "./products";
import { toast } from "sonner";

export interface UserProfile {
  age: number;
  weight: number;
  goal: string;
  conditions: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DeliveryDetails {
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}

export interface OrderInfo {
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  delivery: DeliveryDetails;
  paymentMethod: string;
  orderId: string;
  date: string;
}

interface AppState {
  profile: UserProfile | null;
  setProfile: (p: UserProfile) => void;
  cart: CartItem[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  cartTotal: number;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartDeliveryFee: number;
  orders: OrderInfo[];
  addOrder: (order: OrderInfo) => void;
  lastOrder: OrderInfo | null;
}

const AppContext = createContext<AppState | undefined>(undefined);

function loadCart(): CartItem[] {
  try {
    const saved = localStorage.getItem("nutricart-cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function loadOrders(): OrderInfo[] {
  try {
    const saved = localStorage.getItem("nutricart-orders");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [cart, setCart] = useState<CartItem[]>(loadCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [orders, setOrders] = useState<OrderInfo[]>(loadOrders);

  useEffect(() => {
    localStorage.setItem("nutricart-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("nutricart-orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order: OrderInfo) => {
    setOrders((prev) => [order, ...prev]);
  };

  const addToCart = (product: Product, qty: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    toast.success(`${product.name}${qty > 1 ? ` (×${qty})` : ""} added to cart`);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const cartDiscount = cartSubtotal > 30 ? cartSubtotal * 0.1 : 0;
  const cartDeliveryFee = cartSubtotal > 50 ? 0 : 3.99;
  const cartTotal = cartSubtotal - cartDiscount + cartDeliveryFee;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const lastOrder = orders.length > 0 ? orders[0] : null;

  return (
    <AppContext.Provider
      value={{
        profile,
        setProfile,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartOpen,
        setCartOpen,
        cartTotal,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartDeliveryFee,
        orders,
        addOrder,
        lastOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
