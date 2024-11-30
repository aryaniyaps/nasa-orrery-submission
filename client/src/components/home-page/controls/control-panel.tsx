import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Play } from "lucide-react";

interface ControlPanelProps {
  targetDate: Date;
  setTargetDate: (date: Date) => void;
}

export default function ControlPanel({
  targetDate,
  setTargetDate,
}: ControlPanelProps) {
  return (
    <div className="bottom-0 w-full flex gap-6 py-4 px-6 items-center justify-center bg-background">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !targetDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {targetDate ? (
              format(targetDate, "PPP")
            ) : (
              <span>Pick a targetDate</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={targetDate}
            onSelect={(date) => {
              if (date) setTargetDate(date);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Button variant={"outline"} size={"icon"}>
        <Play className="h-4 w-4" />
      </Button>
    </div>
  );
}
