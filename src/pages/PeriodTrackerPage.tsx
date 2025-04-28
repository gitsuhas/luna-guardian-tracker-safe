import { useState, useEffect } from "react";
import { addDays, format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import PeriodCalendar from "@/components/period-tracker/PeriodCalendar";
import CycleSettings from "@/components/period-tracker/CycleSettings";
import PeriodTracking from "@/components/period-tracker/PeriodTracking";
import HealthGuidelines from "@/components/period-tracker/HealthGuidelines";
import { PeriodData, savePeriodData, getPeriodDataList } from "@/lib/local-storage";
import { calculatePeriodCycle, formatDateForDisplay, formatShortDate } from "@/lib/period-utils";
import { supabase } from "@/integrations/supabase/client";

const PeriodTrackerPage = () => {
  const [lastPeriodDate, setLastPeriodDate] = useState<Date>(new Date());
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [periodLength, setPeriodLength] = useState<number>(5);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>("");
  const [periodHistory, setPeriodHistory] = useState<PeriodData[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchPeriodData = async () => {
      setIsLoading(true);
      try {
        const { data: supabaseData, error } = await supabase
          .from('period_data')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        if (supabaseData && supabaseData.length > 0) {
          const formattedData = supabaseData.map(item => ({
            id: item.id,
            lastPeriodStartDate: item.last_period_start_date,
            cycleLength: item.cycle_length,
            periodLength: item.period_length,
            symptoms: item.symptoms || [],
            notes: item.notes || ""
          }));
          
          setPeriodHistory(formattedData);
          
          const latestData = formattedData[0];
          setLastPeriodDate(new Date(latestData.lastPeriodStartDate));
          setCycleLength(latestData.cycleLength);
          setPeriodLength(latestData.periodLength);
          setSymptoms(latestData.symptoms);
          setNotes(latestData.notes);
          setActiveId(latestData.id);
        } else {
          const savedData = getPeriodDataList();
          setPeriodHistory(savedData);
          
          if (savedData.length > 0) {
            const latestData = savedData[savedData.length - 1];
            setLastPeriodDate(new Date(latestData.lastPeriodStartDate));
            setCycleLength(latestData.cycleLength);
            setPeriodLength(latestData.periodLength);
            setSymptoms(latestData.symptoms);
            setNotes(latestData.notes);
            setActiveId(latestData.id);
          } else {
            const newId = uuidv4();
            setActiveId(newId);
          }
        }
      } catch (error) {
        console.error("Error fetching period data:", error);
        toast.error("Failed to load period data");
        
        const savedData = getPeriodDataList();
        setPeriodHistory(savedData);
        
        if (savedData.length > 0) {
          const latestData = savedData[savedData.length - 1];
          setLastPeriodDate(new Date(latestData.lastPeriodStartDate));
          setCycleLength(latestData.cycleLength);
          setPeriodLength(latestData.periodLength);
          setSymptoms(latestData.symptoms);
          setNotes(latestData.notes);
          setActiveId(latestData.id);
        } else {
          const newId = uuidv4();
          setActiveId(newId);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPeriodData();
  }, []);
  
  const cycleInfo = calculatePeriodCycle(lastPeriodDate, cycleLength);
  
  const handleSavePeriodData = async () => {
    setIsLoading(true);
    
    const periodData: PeriodData = {
      id: activeId,
      lastPeriodStartDate: lastPeriodDate.toISOString(),
      cycleLength,
      periodLength,
      symptoms,
      notes
    };
    
    try {
      const { error } = await supabase
        .from('period_data')
        .upsert({
          id: activeId,
          user_id: (await supabase.auth.getUser()).data.user?.id,
          last_period_start_date: lastPeriodDate.toISOString(),
          cycle_length: cycleLength,
          period_length: periodLength,
          symptoms: symptoms,
          notes: notes
        });
      
      if (error) {
        throw error;
      }
      
      savePeriodData(periodData);
      
      const { data: updatedData, error: fetchError } = await supabase
        .from('period_data')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (fetchError) {
        throw fetchError;
      }
      
      if (updatedData) {
        const formattedData = updatedData.map(item => ({
          id: item.id,
          lastPeriodStartDate: item.last_period_start_date,
          cycleLength: item.cycle_length,
          periodLength: item.period_length,
          symptoms: item.symptoms || [],
          notes: item.notes || ""
        }));
        
        setPeriodHistory(formattedData);
      } else {
        setPeriodHistory(getPeriodDataList());
      }
      
      toast.success("Period data saved successfully");
    } catch (error) {
      console.error("Error saving period data:", error);
      
      savePeriodData(periodData);
      setPeriodHistory(getPeriodDataList());
      toast.success("Period data saved locally");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCreateNewPeriod = () => {
    const newId = uuidv4();
    setActiveId(newId);
    setLastPeriodDate(new Date());
    setSymptoms([]);
    setNotes("");
    toast.success("New period tracking started");
  };
  
  const handleResetTracker = () => {
    setLastPeriodDate(new Date());
    setCycleLength(28);
    setPeriodLength(5);
    setSymptoms([]);
    setNotes("");
    toast.success("Tracker reset to default values");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-6 animate-fade-in">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Period Tracker</h1>
              <p className="text-muted-foreground">Track your cycle, predict periods, and manage your reproductive health</p>
            </div>
            <Button variant="outline" onClick={handleResetTracker} disabled={isLoading}>Reset Tracker</Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <PeriodCalendar 
                lastPeriodDate={lastPeriodDate}
                cycleLength={cycleLength}
                periodLength={periodLength}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-card rounded-lg border border-border">
                  <h3 className="font-medium mb-3">Next Period</h3>
                  <div className="text-xl font-bold text-purple-400">
                    {formatDateForDisplay(cycleInfo.nextPeriodDate)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    In {cycleInfo.daysUntilNextPeriod} days
                  </div>
                </div>
                
                <div className="p-4 bg-card rounded-lg border border-border">
                  <h3 className="font-medium mb-3">Fertility Window</h3>
                  <div className="text-xl font-bold text-green-400">
                    {formatShortDate(cycleInfo.fertilityWindowStart)} - {formatShortDate(cycleInfo.fertilityWindowEnd)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Ovulation: {formatShortDate(cycleInfo.ovulationDate)}
                  </div>
                </div>
              </div>
              
              <HealthGuidelines />
            </div>
            
            <div className="space-y-6">
              <CycleSettings
                lastPeriodDate={lastPeriodDate}
                cycleLength={cycleLength}
                periodLength={periodLength}
                onLastPeriodDateChange={setLastPeriodDate}
                onCycleLengthChange={setCycleLength}
                onPeriodLengthChange={setPeriodLength}
              />
              
              <PeriodTracking
                symptoms={symptoms}
                notes={notes}
                onSymptomsChange={setSymptoms}
                onNotesChange={setNotes}
              />
              
              <div className="flex flex-col space-y-2">
                <Button 
                  onClick={handleSavePeriodData}
                  className="w-full bg-luna-purple hover:bg-luna-purple/90 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Period Data"}
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleCreateNewPeriod}
                  className="w-full"
                  disabled={isLoading}
                >
                  Add Another Period Date
                </Button>
              </div>
            </div>
          </div>
          
          {periodHistory.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Period History</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {periodHistory.map((period) => (
                  <div key={period.id} className={`p-4 rounded-lg border ${period.id === activeId ? 'border-luna-purple bg-secondary' : 'border-border bg-card'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">
                        {format(new Date(period.lastPeriodStartDate), "MMMM d, yyyy")}
                      </h3>
                      {period.id !== activeId && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setLastPeriodDate(new Date(period.lastPeriodStartDate));
                            setCycleLength(period.cycleLength);
                            setPeriodLength(period.periodLength);
                            setSymptoms(period.symptoms);
                            setNotes(period.notes);
                            setActiveId(period.id);
                            toast.success("Period data loaded");
                          }}
                        >
                          Load
                        </Button>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Cycle: {period.cycleLength} days</p>
                      <p>Duration: {period.periodLength} days</p>
                      {period.symptoms.length > 0 && (
                        <p className="mt-1">Symptoms: {period.symptoms.join(", ")}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PeriodTrackerPage;
