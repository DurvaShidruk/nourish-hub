export interface Product {
  id: string;
  name: string;
  image: string;
  tags: string[];
  price: number;
  category: string[];
}

export const products: Product[] = [
  { id: "1", name: "Steel Cut Oats", image: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400&h=400&fit=crop", tags: ["Low GI", "High Fiber"], price: 4.99, category: ["pcos", "diabetes", "weight-loss"] },
  { id: "2", name: "Mixed Nuts & Seeds", image: "https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=400&h=400&fit=crop", tags: ["High Protein", "Healthy Fats"], price: 8.49, category: ["pcos", "high-protein"] },
  { id: "3", name: "Fresh Blueberries", image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&h=400&fit=crop", tags: ["Antioxidant", "Low Sugar"], price: 5.99, category: ["pcos", "diabetes", "weight-loss"] },
  { id: "4", name: "Quinoa", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop", tags: ["Gluten-Free", "High Protein"], price: 6.49, category: ["pcos", "diabetes", "high-protein", "weight-loss"] },
  { id: "5", name: "Greek Yogurt", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop", tags: ["High Protein", "Probiotic"], price: 3.99, category: ["high-protein", "weight-loss"] },
  { id: "6", name: "Avocado", image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop", tags: ["Healthy Fats", "Low Carb"], price: 2.49, category: ["pcos", "diabetes", "weight-loss"] },
  { id: "7", name: "Chicken Breast", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82571?w=400&h=400&fit=crop", tags: ["High Protein", "Low Fat"], price: 9.99, category: ["high-protein", "weight-loss"] },
  { id: "8", name: "Spinach Bundle", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop", tags: ["Low Carb", "Iron Rich"], price: 2.99, category: ["pcos", "diabetes", "weight-loss"] },
  { id: "9", name: "Brown Rice", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop", tags: ["Low GI", "Whole Grain"], price: 3.49, category: ["diabetes", "weight-loss"] },
  { id: "10", name: "Salmon Fillet", image: "https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=400&h=400&fit=crop", tags: ["Omega-3", "High Protein"], price: 12.99, category: ["pcos", "high-protein"] },
  { id: "11", name: "Sweet Potato", image: "https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?w=400&h=400&fit=crop", tags: ["Low GI", "High Fiber"], price: 1.99, category: ["diabetes", "weight-loss"] },
  { id: "12", name: "Eggs (Free Range)", image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop", tags: ["High Protein", "Keto"], price: 5.49, category: ["high-protein", "pcos", "weight-loss"] },
  { id: "13", name: "Chia Seeds", image: "https://images.unsplash.com/photo-1514218953589-2d7d37efd2dc?w=400&h=400&fit=crop", tags: ["Omega-3", "High Fiber"], price: 7.99, category: ["pcos", "diabetes", "weight-loss"] },
  { id: "14", name: "Lentils", image: "https://images.unsplash.com/photo-1585996746418-e4bd22c0307a?w=400&h=400&fit=crop", tags: ["High Protein", "Low GI"], price: 2.99, category: ["diabetes", "high-protein", "weight-loss"] },
  { id: "15", name: "Almond Butter", image: "https://images.unsplash.com/photo-1612187209234-a05034e0c8c5?w=400&h=400&fit=crop", tags: ["Healthy Fats", "Gluten-Free"], price: 9.49, category: ["pcos", "high-protein"] },
  { id: "16", name: "Broccoli", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop", tags: ["Low Carb", "High Fiber"], price: 2.29, category: ["diabetes", "weight-loss"] },
];

export const categoryLabels: Record<string, string> = {
  pcos: "PCOS-Friendly",
  diabetes: "Diabetes-Friendly",
  "weight-loss": "Weight-Loss Foods",
  "high-protein": "High-Protein Foods",
};

export const filterOptions = [
  "Low Sugar",
  "High Protein",
  "Gluten-Free",
  "Low Carb",
  "Low GI",
  "High Fiber",
  "Omega-3",
  "Healthy Fats",
];

export const conditionRecommendations: Record<string, string[]> = {
  PCOS: ["pcos"],
  Diabetes: ["diabetes"],
  IBD: ["weight-loss", "high-protein"],
  "General Fitness": ["high-protein", "weight-loss"],
};

export const goalRecommendations: Record<string, string[]> = {
  "Fat Loss": ["weight-loss"],
  "Muscle Gain": ["high-protein"],
  Maintain: ["pcos", "diabetes", "weight-loss", "high-protein"],
};
