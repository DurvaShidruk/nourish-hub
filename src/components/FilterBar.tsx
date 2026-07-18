import { Search, X } from "lucide-react";
import { filterOptions } from "@/data/products";

interface Props {
  search: string;
  setSearch: (s: string) => void;
  activeFilters: string[];
  toggleFilter: (f: string) => void;
  onClear?: () => void;
}

export default function FilterBar({ search, setSearch, activeFilters, toggleFilter, onClear }: Props) {
  const hasActiveFilters = activeFilters.length > 0 || search.trim() !== "";

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all text-sm"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {filterOptions.map((filter) => (
          <button
            key={filter}
            onClick={() => toggleFilter(filter)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
              activeFilters.includes(filter)
                ? "bg-primary text-primary-foreground shadow-soft"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
          >
            {filter}
          </button>
        ))}
        {hasActiveFilters && onClear && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-semibold text-destructive hover:bg-destructive/10 hover:text-destructive-dark transition-all duration-200"
          >
            <X className="w-3 h-3" />
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
