
import { useState } from "react";
import { X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { commonSymptoms } from "@/lib/period-utils";

interface PeriodTrackingProps {
  symptoms: string[];
  notes: string;
  onSymptomsChange: (symptoms: string[]) => void;
  onNotesChange: (notes: string) => void;
}

const PeriodTracking: React.FC<PeriodTrackingProps> = ({
  symptoms,
  notes,
  onSymptomsChange,
  onNotesChange
}) => {
  const [selectedSymptom, setSelectedSymptom] = useState<string>("");

  const handleAddSymptom = () => {
    if (selectedSymptom && !symptoms.includes(selectedSymptom)) {
      const updatedSymptoms = [...symptoms, selectedSymptom];
      onSymptomsChange(updatedSymptoms);
      setSelectedSymptom("");
    }
  };

  const handleRemoveSymptom = (symptom: string) => {
    const updatedSymptoms = symptoms.filter(s => s !== symptom);
    onSymptomsChange(updatedSymptoms);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onNotesChange(e.target.value);
  };

  return (
    <div className="p-4 bg-card rounded-lg border border-border">
      <h3 className="font-medium mb-3">Tracking</h3>
      <p className="text-sm text-muted-foreground mb-5">Track symptoms and add notes about your cycle</p>
      
      <Tabs defaultValue="symptoms">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="symptoms" className="mt-4 space-y-4">
          <div className="flex space-x-2">
            <Select value={selectedSymptom} onValueChange={setSelectedSymptom}>
              <SelectTrigger>
                <SelectValue placeholder="Select symptom" />
              </SelectTrigger>
              <SelectContent>
                {commonSymptoms.map((symptom) => (
                  <SelectItem key={symptom} value={symptom}>{symptom}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleAddSymptom} className="bg-luna-purple hover:bg-luna-purple/90 text-white">Add</Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {symptoms.map((symptom) => (
              <Badge key={symptom} variant="outline" className="flex items-center gap-1 py-1.5">
                {symptom}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => handleRemoveSymptom(symptom)}
                />
              </Badge>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="notes" className="mt-4">
          <Textarea
            placeholder="Add notes about your period, symptoms, or anything you want to track..."
            value={notes}
            onChange={handleNotesChange}
            className="min-h-[150px] bg-secondary"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PeriodTracking;
