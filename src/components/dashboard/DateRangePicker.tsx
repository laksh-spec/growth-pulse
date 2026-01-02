import { useState } from "react";
import { format } from "date-fns";
import { Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateRangePickerProps {
  value: { from: Date; to: Date };
  onChange: (range: { from: Date; to: Date }) => void;
}

const presets = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
  { label: "This Month", days: 0 },
  { label: "Last Month", days: -1 },
];

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState("Last 30 days");

  const handlePresetSelect = (preset: typeof presets[0]) => {
    setSelectedPreset(preset.label);
    const to = new Date();
    let from: Date;

    if (preset.days > 0) {
      from = new Date(Date.now() - preset.days * 24 * 60 * 60 * 1000);
    } else if (preset.days === 0) {
      from = new Date(to.getFullYear(), to.getMonth(), 1);
    } else {
      from = new Date(to.getFullYear(), to.getMonth() - 1, 1);
      to.setDate(0); // Last day of previous month
    }

    onChange({ from, to });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start gap-2 bg-muted/50 border-border hover:bg-muted"
          )}
        >
          <Calendar className="h-4 w-4 text-primary" />
          <span className="text-sm">
            {format(value.from, "MMM d, yyyy")} - {format(value.to, "MMM d, yyyy")}
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <div className="flex">
          <div className="border-r border-border p-3 space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 mb-2">
              Quick Select
            </p>
            {presets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => handlePresetSelect(preset)}
                className={cn(
                  "w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
                  selectedPreset === preset.label
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
              >
                {preset.label}
              </button>
            ))}
          </div>
          <div className="p-3">
            <CalendarComponent
              mode="range"
              selected={{ from: value.from, to: value.to }}
              onSelect={(range) => {
                if (range?.from && range?.to) {
                  onChange({ from: range.from, to: range.to });
                  setSelectedPreset("");
                }
              }}
              numberOfMonths={2}
              className="rounded-md"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
