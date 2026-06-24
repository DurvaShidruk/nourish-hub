import { useNavigate } from "react-router-dom";
import { useApp } from "@/data/context";
import { motion } from "framer-motion";
import { User, Weight, Target, Activity, ArrowRight, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getStartedSchema, GetStartedValues } from "@/lib/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const goals = ["Fat Loss", "Muscle Gain", "Maintain"];
const conditions = ["PCOS", "Diabetes", "IBD", "General Fitness"];

export default function GetStarted() {
  const { setProfile } = useApp();
  const navigate = useNavigate();

  const form = useForm<GetStartedValues>({
    resolver: zodResolver(getStartedSchema),
    defaultValues: {
      age: undefined,
      weight: undefined,
      goal: "",
      conditions: [],
    },
  });

  const onSubmit = (data: GetStartedValues) => {
    setProfile({
      age: data.age,
      weight: data.weight,
      goal: data.goal,
      conditions: data.conditions,
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
          className="glass-strong rounded-3xl p-8"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Age */}
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                      <User className="w-4 h-4 text-primary" />
                      Age
                    </FormLabel>
                    <FormControl>
                      <input
                        type="number"
                        placeholder="Enter your age"
                        className="w-full px-4 py-3 rounded-2xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all text-sm"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Weight */}
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                      <Weight className="w-4 h-4 text-primary" />
                      Weight (kg)
                    </FormLabel>
                    <FormControl>
                      <input
                        type="number"
                        placeholder="Enter your weight"
                        className="w-full px-4 py-3 rounded-2xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all text-sm"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Goal */}
              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                      <Target className="w-4 h-4 text-primary" />
                      Goal
                    </FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-3 gap-2">
                        {goals.map((g) => (
                          <button
                            type="button"
                            key={g}
                            onClick={() => field.onChange(g)}
                            className={`py-3 rounded-2xl text-xs font-medium transition-all duration-200 ${
                              field.value === g
                                ? "bg-primary text-primary-foreground shadow-soft"
                                : "bg-secondary text-secondary-foreground hover:bg-muted"
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Conditions */}
              <FormField
                control={form.control}
                name="conditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                      <Activity className="w-4 h-4 text-primary" />
                      Health Conditions
                    </FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-2 gap-2">
                        {conditions.map((c) => {
                          const isSelected = field.value?.includes(c);
                          return (
                            <button
                              type="button"
                              key={c}
                              onClick={() => {
                                const newValue = isSelected
                                  ? field.value.filter((x) => x !== c)
                                  : [...(field.value || []), c];
                                field.onChange(newValue);
                              }}
                              className={`relative py-3 px-4 rounded-2xl text-xs font-medium text-left transition-all duration-200 ${
                                isSelected
                                  ? "bg-primary text-primary-foreground shadow-soft"
                                  : "bg-secondary text-secondary-foreground hover:bg-muted"
                              }`}
                            >
                              {c}
                              {isSelected && (
                                <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-display font-semibold text-sm flex items-center justify-center gap-2 hover:bg-sage-dark transition-colors shadow-soft hover:shadow-elevated"
              >
                Get My Plan
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
}
