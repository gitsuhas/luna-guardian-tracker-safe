
import { format, addDays } from "date-fns";

export interface PeriodCycleInfo {
  nextPeriodDate: Date;
  daysUntilNextPeriod: number;
  fertilityWindowStart: Date;
  fertilityWindowEnd: Date;
  ovulationDate: Date;
}

export function calculatePeriodCycle(lastPeriodDate: Date, cycleLength: number): PeriodCycleInfo {
  // Calculate next period date
  const nextPeriodDate = new Date(lastPeriodDate);
  nextPeriodDate.setDate(lastPeriodDate.getDate() + cycleLength);
  
  // Calculate days until next period
  const today = new Date();
  const daysUntilNextPeriod = Math.ceil((nextPeriodDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // Calculate fertility window (typically 5 days before ovulation until 1 day after)
  const ovulationDate = new Date(lastPeriodDate);
  ovulationDate.setDate(lastPeriodDate.getDate() + Math.floor(cycleLength / 2) - 14);
  
  const fertilityWindowStart = new Date(ovulationDate);
  fertilityWindowStart.setDate(ovulationDate.getDate() - 5);
  
  const fertilityWindowEnd = new Date(ovulationDate);
  fertilityWindowEnd.setDate(ovulationDate.getDate() + 1);
  
  return {
    nextPeriodDate,
    daysUntilNextPeriod,
    fertilityWindowStart,
    fertilityWindowEnd,
    ovulationDate
  };
}

export function formatDateForDisplay(date: Date): string {
  return format(date, "MMMM d, yyyy");
}

export function formatShortDate(date: Date): string {
  return format(date, "MMM d, yyyy");
}

export const commonSymptoms = [
  "Mood Swings",
  "Cramps",
  "Headache",
  "Breast Tenderness",
  "Bloating",
  "Lower Back Pain",
  "Fatigue",
  "Food Cravings",
  "Insomnia",
  "Nausea"
];
