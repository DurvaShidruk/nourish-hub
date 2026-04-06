import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// 🔥 Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface SignupProps {
  setIsLoggedIn: (value: boolean) => void;
}

export default function Signup({ setIsLoggedIn }: SignupProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ SIGNUP HANDLER
  const handleSignup = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      setIsLoggedIn(true);
      navigate("/");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        alert("User already exists");
      } else if (error.code === "auth/weak-password") {
        alert("Password should be at least 6 characters");
      } else {
        alert("Signup failed");
      }
    }
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="glass p-8 rounded-2xl w-[350px] shadow-elevated">
        
        <h2 className="text-2xl font-display font-bold mb-6 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          
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
            Sign Up
          </button>

        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}