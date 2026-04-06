import { Search } from "lucide-react";
import { filterOptions } from "@/data/products";

interface Props {
  search: string;
  setSearch: (s: string) => void;
  activeFilters: string[];
  toggleFilter: (f: string) => void;
}

export default function FilterBar({ search, setSearch, activeFilters, toggleFilter }: Props) {
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
      </div>
      <div className="flex flex-wrap gap-2">
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
      </div>
    </div>
  );
}
