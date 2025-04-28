
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface CycleSettingsProps {
  lastPeriodDate: Date;
  cycleLength: number;
  periodLength: number;
  onLastPeriodDateChange: (date: Date) => void;
  onCycleLengthChange: (length: number) => void;
  onPeriodLengthChange: (length: number) => void;
}

const CycleSettings: React.FC<CycleSettingsProps> = ({
  lastPeriodDate,
  cycleLength,
  periodLength,
  onLastPeriodDateChange,
  onCycleLengthChange,
  onPeriodLengthChange
}) => {
  const [date, setDate] = useState<Date>(lastPeriodDate);

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      onLastPeriodDateChange(newDate);
    }
  };

  const handleCycleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const length = Number(e.target.value);
    if (length >= 21 && length <= 40) {
      onCycleLengthChange(length);
    }
  };

  const handlePeriodLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const length = Number(e.target.value);
    if (length >= 3 && length <= 10) {
      onPeriodLengthChange(length);
    }
  };

  return (
    <div className="p-4 bg-card rounded-lg border border-border">
      <h3 className="font-medium mb-3">Cycle Settings</h3>
      <p className="text-sm text-muted-foreground mb-5">Adjust your period and cycle information</p>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="lastPeriodStartDate">Last Period Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="lastPeriodStartDate"
                variant="outline"
                className="w-full justify-start text-left"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                disabled={(date) => date > new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cycleLength">Cycle Length (days)</Label>
          <Input
            id="cycleLength"
            type="number"
            value={cycleLength}
            onChange={handleCycleLengthChange}
            min={21}
            max={40}
            className="bg-secondary"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="periodLength">Period Length (days)</Label>
          <Input
            id="periodLength"
            type="number"
            value={periodLength}
            onChange={handlePeriodLengthChange}
            min={3}
            max={10}
            className="bg-secondary"
          />
        </div>
      </div>
    </div>
  );
};

export default CycleSettings;
