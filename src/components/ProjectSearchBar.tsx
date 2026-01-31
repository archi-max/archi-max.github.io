import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ProjectSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  tags?: string[];
  selectedTags?: string[];
  onTagToggle?: (tag: string) => void;
}

const TAG_ICONS: Record<string, string> = {
  "AI": "✨",
  "Hardware": "🔧",
  "Web": "🌐",
  "Mobile": "📱",
  "Data": "📊",
  "DevTools": "⚙️",
};

export function ProjectSearchBar({
  value,
  onChange,
  placeholder = "Search projects...",
  tags = [],
  selectedTags = [],
  onTagToggle,
}: ProjectSearchBarProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
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

        {tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              const icon = TAG_ICONS[tag] || "";
              return (
                <button
                  key={tag}
                  onClick={() => onTagToggle?.(tag)}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full border transition-all",
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-body border-border/60 hover:border-primary/40 hover:text-primary"
                  )}
                >
                  {icon && <span className="text-xs">{icon}</span>}
                  {tag}
                </button>
              );
            })}
            {selectedTags.length > 0 && (
              <button
                onClick={() => selectedTags.forEach((t) => onTagToggle?.(t))}
                className="text-sm text-subtle hover:text-primary transition-colors underline-offset-2 hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
