
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { calculatePeriodCycle } from "@/lib/period-utils";

interface PeriodCalendarProps {
  lastPeriodDate: Date;
  cycleLength: number;
  periodLength: number;
}

const PeriodCalendar: React.FC<PeriodCalendarProps> = ({
  lastPeriodDate,
  cycleLength,
  periodLength
}) => {
  const [selected, setSelected] = useState<Date | undefined>(new Date());
  
  // Calculate period and fertility window dates
  const cycleInfo = calculatePeriodCycle(lastPeriodDate, cycleLength);
  
  // Generate period days
  const periodDays: Date[] = [];
  for (let i = 0; i < periodLength; i++) {
    periodDays.push(addDays(lastPeriodDate, i));
  }
  
  // Generate next period days
  const nextPeriodDays: Date[] = [];
  for (let i = 0; i < periodLength; i++) {
    nextPeriodDays.push(addDays(cycleInfo.nextPeriodDate, i));
  }
  
  // Generate fertility window days
  const fertilityDays: Date[] = [];
  let currentDate = new Date(cycleInfo.fertilityWindowStart);
  while (currentDate <= cycleInfo.fertilityWindowEnd) {
    fertilityDays.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return (
    <div className="rounded-lg border bg-card">
      <div className="p-3">
        <div className="text-center font-medium py-2">
          Your Cycle Calendar
        </div>
        <p className="text-center text-sm text-muted-foreground mb-4">
          View your period, fertility window, and ovulation days
        </p>
        <Calendar
          mode="single"
          selected={selected}
          onSelect={setSelected}
          className="mx-auto"
          modifiers={{
            period: [...periodDays, ...nextPeriodDays],
            fertility: fertilityDays,
            ovulation: [cycleInfo.ovulationDate]
          }}
          modifiersClassNames={{
            period: "bg-red-500 text-white rounded-full",
            fertility: "bg-green-500 text-white rounded-full",
            ovulation: "bg-blue-500 text-white rounded-full",
            selected: "bg-purple-500 text-white rounded-full"
          }}
          styles={{
            day: { padding: '0.5rem' }
          }}
        />
        <div className="flex justify-center gap-4 pt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-xs">Period</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-xs">Fertile Window</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-xs">Ovulation</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
            <span className="text-xs">Selected Day</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodCalendar;
