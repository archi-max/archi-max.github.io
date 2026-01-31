import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ProjectSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ProjectSearchBar({ value, onChange, placeholder = "Search projects..." }: ProjectSearchBarProps) {
  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-subtle" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-10 bg-background border-border/60 focus:border-primary/40 font-body"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-subtle hover:text-body transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
