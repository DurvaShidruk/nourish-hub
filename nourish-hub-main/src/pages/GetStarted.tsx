import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/data/context";
import { motion } from "framer-motion";
import { User, Weight, Target, Activity, ArrowRight, Check } from "lucide-react";

const goals = ["Fat Loss", "Muscle Gain", "Maintain"];
const conditions = ["PCOS", "Diabetes", "IBD", "General Fitness"];

export default function GetStarted() {
  const { setProfile } = useApp();
  const navigate = useNavigate();
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleCondition = (c: string) => {
    setSelectedConditions((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    if (!age || Number(age) < 1) newErrors.age = "Please enter a valid age";
    if (!weight || Number(weight) < 1) newErrors.weight = "Please enter a valid weight";
    if (!goal) newErrors.goal = "Please select a goal";
    if (selectedConditions.length === 0) newErrors.conditions = "Please select at least one";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setProfile({
      age: Number(age),
      weight: Number(weight),
      goal,
      conditions: selectedConditions,
    });
    navigate("/results");
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="font-display font-extrabold text-3xl text-foreground mb-3">
            Tell us about you
          </h1>
          <p className="text-muted-foreground">
            We'll create your personalized grocery recommendations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="glass-strong rounded-3xl p-8 space-y-6"
        >
          {/* Age */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
              <User className="w-4 h-4 text-primary" />
              Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => { setAge(e.target.value); setErrors((p) => ({ ...p, age: "" })); }}
              placeholder="Enter your age"
              className="w-full px-4 py-3 rounded-2xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all text-sm"
            />
            {errors.age && <p className="text-destructive text-xs mt-1.5">{errors.age}</p>}
          </div>

          {/* Weight */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
              <Weight className="w-4 h-4 text-primary" />
              Weight (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => { setWeight(e.target.value); setErrors((p) => ({ ...p, weight: "" })); }}
              placeholder="Enter your weight"
              className="w-full px-4 py-3 rounded-2xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all text-sm"
            />
            {errors.weight && <p className="text-destructive text-xs mt-1.5">{errors.weight}</p>}
          </div>

          {/* Goal */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
              <Target className="w-4 h-4 text-primary" />
              Goal
            </label>
            <div className="grid grid-cols-3 gap-2">
              {goals.map((g) => (
                <button
                  key={g}
                  onClick={() => { setGoal(g); setErrors((p) => ({ ...p, goal: "" })); }}
                  className={`py-3 rounded-2xl text-xs font-medium transition-all duration-200 ${
                    goal === g
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "bg-secondary text-secondary-foreground hover:bg-muted"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            {errors.goal && <p className="text-destructive text-xs mt-1.5">{errors.goal}</p>}
          </div>

          {/* Conditions */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
              <Activity className="w-4 h-4 text-primary" />
              Health Conditions
            </label>
            <div className="grid grid-cols-2 gap-2">
              {conditions.map((c) => (
                <button
                  key={c}
                  onClick={() => { toggleCondition(c); setErrors((p) => ({ ...p, conditions: "" })); }}
                  className={`relative py-3 px-4 rounded-2xl text-xs font-medium text-left transition-all duration-200 ${
                    selectedConditions.includes(c)
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "bg-secondary text-secondary-foreground hover:bg-muted"
                  }`}
                >
                  {c}
                  {selectedConditions.includes(c) && (
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" />
                  )}
                </button>
              ))}
            </div>
            {errors.conditions && <p className="text-destructive text-xs mt-1.5">{errors.conditions}</p>}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-display font-semibold text-sm flex items-center justify-center gap-2 hover:bg-sage-dark transition-colors shadow-soft hover:shadow-elevated"
          >
            Get My Plan
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
