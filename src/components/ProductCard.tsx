import { Plus } from "lucide-react";
import { Product } from "@/data/products";
import { useApp } from "@/data/context";
import { motion } from "framer-motion";

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const { addToCart } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group glass rounded-2xl overflow-hidden hover:shadow-elevated transition-all duration-300"
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          draggable="false"
        />
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-sage-light text-sage-dark"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display font-semibold text-sm text-foreground mb-1">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-3">
          <span className="font-display font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-sage-dark transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
