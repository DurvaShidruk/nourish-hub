import { useState, useMemo } from "react";
import { useApp } from "@/data/context";
import { products, categoryLabels, conditionRecommendations, goalRecommendations } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import FilterBar from "@/components/FilterBar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Results() {
  const { profile } = useApp();
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleFilter = (f: string) => {
    setActiveFilters((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  // Determine recommended categories from profile
  const recommendedCategories = useMemo(() => {
    if (!profile) return Object.keys(categoryLabels);
    const cats = new Set<string>();
    profile.conditions.forEach((c) => {
      (conditionRecommendations[c] || []).forEach((cat) => cats.add(cat));
    });
    (goalRecommendations[profile.goal] || []).forEach((cat) => cats.add(cat));
    return Array.from(cats);
  }, [profile]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (activeCategory) {
      filtered = filtered.filter((p) => p.category.includes(activeCategory));
    } else if (recommendedCategories.length < Object.keys(categoryLabels).length) {
      filtered = filtered.filter((p) =>
        p.category.some((c) => recommendedCategories.includes(c))
      );
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (activeFilters.length > 0) {
      filtered = filtered.filter((p) =>
        activeFilters.some((f) => p.tags.includes(f))
      );
    }

    return filtered;
  }, [search, activeFilters, activeCategory, recommendedCategories]);

  const displayCategories = recommendedCategories.filter((c) => categoryLabels[c]);

  return (
    <div className="min-h-screen pt-24 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-xs font-medium text-primary">Personalized for you</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mb-2">
            {profile ? "Your Smart Grocery Plan" : "Browse All Products"}
          </h1>
          {profile && (
            <p className="text-muted-foreground">
              Based on your {profile.goal.toLowerCase()} goal and {profile.conditions.join(", ").toLowerCase()} profile.
            </p>
          )}
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 ${
              activeCategory === null
                ? "bg-primary text-primary-foreground shadow-soft"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
          >
            All
          </button>
          {displayCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <FilterBar
            search={search}
            setSearch={setSearch}
            activeFilters={activeFilters}
            toggleFilter={toggleFilter}
          />
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-16">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-muted-foreground font-medium">No products match your filters.</p>
            <button
              onClick={() => { setSearch(""); setActiveFilters([]); setActiveCategory(null); }}
              className="mt-4 px-6 py-2.5 rounded-2xl bg-primary text-primary-foreground text-sm font-medium hover:bg-sage-dark transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
