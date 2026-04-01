import { useState, useMemo } from "react";
import { products, categoryLabels, filterOptions } from "@/data/products";
import { Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import FilterBar from "@/components/FilterBar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Store } from "lucide-react";

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name A-Z" },
];

export default function Shop() {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sort, setSort] = useState("default");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const toggleFilter = (f: string) => {
    setActiveFilters((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (activeCategory) {
      filtered = filtered.filter((p) => p.category.includes(activeCategory));
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

    switch (sort) {
      case "price-asc": filtered.sort((a, b) => a.price - b.price); break;
      case "price-desc": filtered.sort((a, b) => b.price - a.price); break;
      case "name": filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
    }

    return filtered;
  }, [search, activeFilters, activeCategory, sort]);

  return (
    <div className="min-h-screen pt-24 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Store className="w-5 h-5 text-primary" />
            <span className="text-xs font-medium text-primary">All Products</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mb-2">Shop</h1>
          <p className="text-muted-foreground">Browse our curated selection of health-focused groceries.</p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 ${activeCategory === null ? "bg-primary text-primary-foreground shadow-soft" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}
          >
            All
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(activeCategory === key ? null : key)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 ${activeCategory === key ? "bg-primary text-primary-foreground shadow-soft" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Filter + Sort */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            <div className="flex-1 w-full">
              <FilterBar search={search} setSearch={setSearch} activeFilters={activeFilters} toggleFilter={toggleFilter} />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-3 rounded-2xl bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all min-w-[180px]"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-16">
            {filteredProducts.map((product, i) => (
              <div key={product.id} onClick={() => setSelectedProduct(product)} className="cursor-pointer">
                <ProductCard product={product} index={i} />
              </div>
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
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <Footer />
    </div>
  );
}
