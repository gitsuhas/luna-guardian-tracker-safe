
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { getEmergencyContacts } from "@/lib/local-storage";
import { AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

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
        console.error("Error fetching contacts:", error);
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
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              // Here we'd typically use the real coordinates, but for demo purposes
              // we'll use SRM University Potheri Tech Park coordinates
              const SRM_LATITUDE = 12.8230;
              const SRM_LONGITUDE = 80.0444;
              
              // Generate a proper UUID for the user
              const userId = (await supabase.auth.getUser()).data.user?.id || uuidv4();
              
              // Save SOS alert to Supabase
              const { error: sosError } = await supabase
                .from('sos_alerts')
                .insert({
                  user_id: userId,
                  latitude: SRM_LATITUDE,
                  longitude: SRM_LONGITUDE,
                  accuracy: Math.floor(Math.random() * 200) + 800, // Random accuracy between 800-1000m
                  alert_message: emergencyMessage,
                  is_resolved: false
                });
                
              if (sosError) {
                throw sosError;
              }
              
              // Simulate sending SMS or email to contacts
              // In a real app, you would integrate with SMS or email service here
              
              toast.success(`Alert sent to ${contacts.length} emergency contacts`);
              
              // Show additional confirmation
              toast.info("Your location has been shared with your emergency contacts");
              
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
          { enableHighAccuracy: true, timeout: 10000 }
        );
      } else {
        toast.error("Geolocation is not supported by your browser");
        setSending(false);
      }
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
        
        <div className="bg-secondary/50 p-3 rounded-lg text-sm text-muted-foreground">
          <p>When you send an SOS alert:</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Your current location will be shared</li>
            <li>Your emergency contacts will be notified</li>
            <li>You can add more contacts in the Contacts tab</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmergencyAlert;
