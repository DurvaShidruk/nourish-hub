export interface Product {
  id: string;
  name: string;
  image: string;
  tags: string[];
  price: number;
  category: string[];
}

export const products: Product[] = [
  { id: "1", name: "Healthy Oats", image: "https://images.unsplash.com/photo-1656853835124-a88cec8347ea?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tags: ["Low GI", "High Fiber"], price: 45, category: ["pcos", "diabetes", "weight-loss"] },
  { id: "2", name: "Mixed Nuts & Seeds(250gms)", image: "https://media.istockphoto.com/id/1975242336/photo/trail-mix-nuts-and-seeds-on-white-background-top-view.jpg?s=2048x2048&w=is&k=20&c=3GITHzEd0pdXlv-pO1ayWYanvVTgyvVIrApC4sDUPRo=", tags: ["High Protein", "Healthy Fats"], price: 30, category: ["pcos", "high-protein"] },
  { id: "3", name: "Fresh Blueberries(250gms)", image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&h=400&fit=crop", tags: ["Antioxidant", "Low Sugar"], price: 50, category: ["pcos", "diabetes", "weight-loss"] },
  { id: "4", name: "Quinoa(Daliya)(250gms)", image: "https://images.unsplash.com/photo-1708949125682-c0cb09727101?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tags: ["Gluten-Free", "High Protein"], price: 30, category: ["pcos", "diabetes", "high-protein", "weight-loss"] },
  { id: "5", name: "Greek Yogurt", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop", tags: ["High Protein", "Probiotic"], price: 30, category: ["high-protein", "weight-loss"] },
  { id: "6", name: "Avocado(2)", image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop", tags: ["Healthy Fats", "Low Carb"], price: 60, category: ["pcos", "diabetes", "weight-loss"] },
  { id: "7", name: "Chicken Breast", image: "https://images.unsplash.com/photo-1708782342351-74f02e9a16c4?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tags: ["High Protein", "Low Fat"], price: 9.99, category: ["high-protein", "weight-loss"] },
  { id: "8", name: "Spinach Bundle", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop", tags: ["Low Carb", "Iron Rich"], price: 25, category: ["pcos", "diabetes", "weight-loss"] },
  { id: "9", name: "Brown Rice(500gms)", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop", tags: ["Low GI", "Whole Grain"], price: 100, category: ["diabetes", "weight-loss"] },
  { id: "10", name: "Salmon Fillet(250gms)", image: "https://media.istockphoto.com/id/1309448946/photo/salmon-fillet-slices-of-fresh-raw-salmon-fish-on-ice.jpg?s=2048x2048&w=is&k=20&c=pjtUnTAqz3nsoNgy6_x-8FSeiah7YUBd5_7CugZp0Nc=", tags: ["Omega-3", "High Protein"], price: 250, category: ["pcos", "high-protein"] },
  { id: "11", name: "Sweet Potato(250gms)", image: "https://media.istockphoto.com/id/175909915/photo/sweet-potatoes.jpg?s=2048x2048&w=is&k=20&c=IZKbp3qnenJtBKHXyoYPr2JRQSauHgY1TVnnbof6D4o=", tags: ["Low GI", "High Fiber"], price: 30, category: ["diabetes", "weight-loss"] },
  { id: "12", name: "Eggs (6)", image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop", tags: ["High Protein", "Keto"], price: 30, category: ["high-protein", "pcos", "weight-loss"] },
  { id: "13", name: "Chia Seeds(250gms)", image: "https://media.istockphoto.com/id/2240420636/photo/healthy-breakfast-chia-seeds-are-pouring-out-from-glass-jar-with-wood-spoon-over-white.jpg?s=2048x2048&w=is&k=20&c=jeEaVpzfYXFbwBDXR49qq9cUAIn8HyTzaV3fw4K2jHc=", tags: ["Omega-3", "High Fiber"], price: 60, category: ["pcos", "diabetes", "weight-loss"] },
  { id: "14", name: "Lentils(250gms)", image: "https://images.unsplash.com/photo-1615485500551-a968b29b07fa?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tags: ["High Protein", "Low GI"], price: 60, category: ["diabetes", "high-protein", "weight-loss"] },
  { id: "15", name: "Peanut Butter(500gms)", image: "https://images.unsplash.com/photo-1564988208558-9270de7c5848?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", tags: ["Healthy Fats", "Gluten-Free"], price: 180, category: ["pcos", "high-protein"] },
  { id: "16", name: "Broccoli(250gms)", image: "https://media.istockphoto.com/id/1090063936/photo/fresh-broccoli-on-wooden-surface.jpg?s=2048x2048&w=is&k=20&c=Zfpp6wazHrWuD2bbygSrM2YY7DNxCGIUG9A8YbLopog=", tags: ["Low Carb", "High Fiber"], price: 80, category: ["diabetes", "weight-loss"] },
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
