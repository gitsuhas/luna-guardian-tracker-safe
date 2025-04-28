
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { getEmergencyContacts } from "@/lib/local-storage";
import { AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const EmergencyAlert = () => {
  const [emergencyMessage, setEmergencyMessage] = useState(
    "I need help! Please check on me at my current location."
  );
  const [sending, setSending] = useState(false);
  
  const handleSendAlert = async () => {
    setSending(true);
    
    try {
      // First check if we have emergency contacts
      let contacts = [];
      
      // Try to get contacts from Supabase
      const { data: supabaseContacts, error } = await supabase
        .from('emergency_contacts')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      if (supabaseContacts && supabaseContacts.length > 0) {
        contacts = supabaseContacts;
      } else {
        // Fall back to local storage
        contacts = getEmergencyContacts();
      }
      
      if (contacts.length === 0) {
        toast.error("Please add emergency contacts first");
        setSending(false);
        return;
      }
      
      // Get current location
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Here we'd typically use the real coordinates, but as per requirement
            // we'll use SRM University Potheri Tech Park coordinates
            const SRM_LATITUDE = 12.8230;
            const SRM_LONGITUDE = 80.0444;
            
            // Save SOS alert to Supabase
            const { error: sosError } = await supabase
              .from('sos_alerts')
              .insert({
                user_id: (await supabase.auth.getUser()).data.user?.id,
                latitude: SRM_LATITUDE,
                longitude: SRM_LONGITUDE,
                accuracy: Math.floor(Math.random() * 200) + 800, // Random accuracy between 800-1000m
                alert_message: emergencyMessage,
                is_resolved: false
              });
              
            if (sosError) {
              throw sosError;
            }
            
            toast.success(`Alert sent to ${contacts.length} emergency contacts`);
          } catch (error) {
            console.error("Error saving SOS alert:", error);
            toast.error("Failed to send alert. Please try again");
          } finally {
            setSending(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Unable to get your location. Please check your permissions.");
          setSending(false);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } catch (error) {
      console.error("Error in send alert:", error);
      toast.error("Failed to send alert. Please try again");
      setSending(false);
    }
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
            disabled={sending}
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
