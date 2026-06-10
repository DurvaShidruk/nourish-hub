import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/data/context";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";
import LoadingSpinner from "@/components/LoadingSpinner";
import Landing from "@/pages/Landing";
import GetStarted from "@/pages/GetStarted";
import Results from "@/pages/Results";
import Shop from "@/pages/Shop";
import Checkout from "@/pages/Checkout";
import OrderConfirmation from "@/pages/OrderConfirmation";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { useEffect, useState } from "react";

// 🔥 Firebase
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const queryClient = new QueryClient();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState(true); // ✅ prevents flicker

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ⛔ Prevent UI flashing before auth loads
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <AppProvider>

            {/* ✅ Navbar only when logged in */}
            {isLoggedIn && (
              <Navbar setIsLoggedIn={setIsLoggedIn} />
            )}

            <CartSidebar />

            <Routes>

              {/* ✅ Protected Routes */}
              <Route
                path="/"
                element={isLoggedIn ? <Landing /> : <Navigate to="/login" />}
              />
              <Route
                path="/get-started"
                element={isLoggedIn ? <GetStarted /> : <Navigate to="/login" />}
              />
              <Route
                path="/results"
                element={isLoggedIn ? <Results /> : <Navigate to="/login" />}
              />
              <Route
                path="/shop"
                element={isLoggedIn ? <Shop /> : <Navigate to="/login" />}
              />
              <Route
                path="/checkout"
                element={isLoggedIn ? <Checkout /> : <Navigate to="/login" />}
              />
              <Route
                path="/order-confirmation"
                element={
                  isLoggedIn ? <OrderConfirmation /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/about"
                element={isLoggedIn ? <About /> : <Navigate to="/login" />}
              />

              {/* ✅ Public Routes */}
              <Route
                path="/login"
                element={<Login setIsLoggedIn={setIsLoggedIn} />}
              />
              <Route
                path="/signup"
                element={<Signup setIsLoggedIn={setIsLoggedIn} />}
              />

              {/* ✅ Fallback */}
              <Route path="*" element={<NotFound />} />

            </Routes>

          </AppProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
