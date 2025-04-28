
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { getEmergencyContacts } from "@/lib/local-storage";
import { AlertTriangle } from "lucide-react";

const EmergencyAlert = () => {
  const [emergencyMessage, setEmergencyMessage] = useState(
    "I need help! Please check on me at my current location."
  );
  const [sending, setSending] = useState(false);
  
  const handleSendAlert = () => {
    const contacts = getEmergencyContacts();
    
    if (contacts.length === 0) {
      toast.error("Please add emergency contacts first");
      return;
    }
    
    setSending(true);
    
    // Simulate sending alert
    setTimeout(() => {
      toast.success(`Alert sent to ${contacts.length} emergency contacts`);
      setSending(false);
    }, 2000);
  };

  return (
    <div className="p-4 bg-destructive/20 border border-destructive/50 rounded-lg">
      <div className="flex items-center gap-2 mb-4 text-destructive">
        <AlertTriangle className="h-5 w-5" />
        <h3 className="font-bold">SOS Emergency Alert</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Send an emergency alert with your location to your contacts
      </p>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Emergency Message</label>
          <Textarea
            value={emergencyMessage}
            onChange={(e) => setEmergencyMessage(e.target.value)}
            className="min-h-[100px] bg-secondary"
          />
        </div>
        
        <Button
          className="w-full bg-destructive hover:bg-destructive/90 text-white"
          onClick={handleSendAlert}
          disabled={sending}
        >
          {sending ? "Sending Alert..." : "Send SOS Alert"}
        </Button>
      </div>
    </div>
  );
};

export default EmergencyAlert;
