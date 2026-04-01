import { X, Plus, Minus, ShoppingCart } from "lucide-react";
import { Product } from "@/data/products";
import { useApp } from "@/data/context";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: Props) {
  const { addToCart } = useApp();
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setQty(1);
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg z-50 bg-card rounded-3xl border border-border shadow-elevated overflow-hidden flex flex-col max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-xl bg-background/80 backdrop-blur flex items-center justify-center hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {product.tags.map((tag) => (
                  <span key={tag} className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-sage-light text-sage-dark">
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="font-display font-bold text-xl text-foreground mb-1">{product.name}</h2>
              <p className="font-display font-bold text-lg text-primary mb-4">${product.price.toFixed(2)}</p>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                A carefully selected, nutrient-rich product perfect for your health goals. Packed with essential vitamins and minerals to support your dietary needs.
              </p>

              <div className="space-y-2 mb-6">
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Nutritional Highlights</h4>
                <div className="grid grid-cols-2 gap-2">
                  {product.tags.map((tag) => (
                    <div key={tag} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {tag}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-secondary rounded-2xl px-3 py-2">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 rounded-xl bg-background flex items-center justify-center hover:bg-muted transition-colors">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-display font-semibold text-sm w-6 text-center">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-8 h-8 rounded-xl bg-background flex items-center justify-center hover:bg-muted transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3.5 rounded-2xl bg-primary text-primary-foreground font-display font-semibold text-sm flex items-center justify-center gap-2 hover:bg-sage-dark transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart — ${(product.price * qty).toFixed(2)}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
