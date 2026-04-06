import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

interface LoginProps {
  setIsLoggedIn: (value: boolean) => void;
}

export default function Login({ setIsLoggedIn }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔐 Email Login
  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  // 🔐 Google Login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      alert("Google login failed");
    }
  };

  return (

  <div className="min-h-screen relative">

    {/* 🔥 BACKGROUND IMAGE */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: "url('/bg.jpg')", // 👈 put image in public folder
      }}
    />

    {/* 🔥 40% OVERLAY */}
    <div className="absolute inset-0 bg-black/40" />

    {/* 🔥 CONTENT (UNCHANGED) */}
    <div className="relative z-10 min-h-screen">

      {/* 🔥 TOP LEFT LOGO */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
          <span className="text-white font-bold">N</span>
        </div>
        <span className="font-display font-bold text-lg text-white">
          NutriCart
        </span>
      </div>

      {/* 🔥 TOP CENTER TEXT */}
      <div className="pt-10 text-center">
        <h1 className="text-2xl font-display font-bold text-white">
          Welcome to NutriCart
        </h1>
        <p className="text-sm text-white/80 mt-1">
          Your smart health shopping partner
        </p>
      </div>

      {/* 🔥 LOGIN CARD (UNCHANGED) */}
      <div className="flex items-center justify-center mt-16">
        <div className="glass p-8 rounded-2xl w-[350px] shadow-elevated bg-white/90 backdrop-blur">

          <h2 className="text-2xl font-display font-bold mb-6 text-center">
            Login
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="p-3 rounded-xl bg-muted outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="p-3 rounded-xl bg-muted outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="bg-primary text-white py-3 rounded-xl hover:opacity-90">
              Login
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white border py-3 rounded-xl mt-3 hover:bg-gray-100 transition"
          >
            Continue with Google
          </button>

          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-primary font-medium">
              Sign Up
            </Link>
          </p>

        </div>
      </div>

    </div>
  </div>
);

}