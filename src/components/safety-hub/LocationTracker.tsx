
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
}

const LocationTracker = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  
  // SRM University Potheri Tech Park coordinates (as required)
  const SRM_LATITUDE = 12.8230;
  const SRM_LONGITUDE = 80.0444;
  
  useEffect(() => {
    let watchId: number | null = null;
    
    if (isTracking) {
      if ("geolocation" in navigator) {
        watchId = navigator.geolocation.watchPosition(
          // For the purposes of this demo, we'll use the SRM coordinates
          // rather than the actual user location
          async (position) => {
            const locationData = {
              latitude: SRM_LATITUDE,
              longitude: SRM_LONGITUDE,
              accuracy: Math.floor(Math.random() * 200) + 800  // Random accuracy between 800-1000m
            };
            
            setLocationData(locationData);
            
            // Save location data to Supabase
            try {
              const { error } = await supabase.from('sos_alerts').insert({
                user_id: (await supabase.auth.getUser()).data.user?.id,
                latitude: locationData.latitude,
                longitude: locationData.longitude,
                accuracy: locationData.accuracy,
                alert_message: "Location tracking update",
                is_resolved: true
              });
              
              if (error) {
                console.error("Error saving location data:", error);
              }
            } catch (error) {
              console.error("Error in location tracking:", error);
            }
          },
          (error) => {
            console.error("Error getting location:", error);
            toast.error("Unable to get your location. Please check your permissions.");
            setIsTracking(false);
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000
          }
        );
      } else {
        toast.error("Geolocation is not supported by your browser");
        setIsTracking(false);
      }
    }
    
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [isTracking]);
  
  const handleStartTracking = () => {
    if (!isTracking) {
      setIsTracking(true);
      toast.success("Location tracking enabled");
    } else {
      setIsTracking(false);
      toast.success("Location tracking disabled");
    }
  };
  
  const openInGoogleMaps = () => {
    if (locationData) {
      const url = `https://www.google.com/maps?q=${locationData.latitude},${locationData.longitude}`;
      window.open(url, '_blank');
    }
  };
  
  return (
    <div className="p-4 bg-card rounded-lg border border-border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Location Status</h3>
        <div className="flex items-center space-x-2">
          <Label htmlFor="show-map">Show Map</Label>
          <Switch
            id="show-map"
            checked={showMap}
            onCheckedChange={setShowMap}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2 mb-4">
        <div className={`h-3 w-3 rounded-full ${isTracking ? 'bg-green-500' : 'bg-gray-400'}`}></div>
        <span>{isTracking ? 'Tracking Active' : 'Tracking Inactive'}</span>
      </div>
      
      {isTracking && locationData && (
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="h-4 w-4 text-luna-purple" />
            <span>Latitude: {locationData.latitude.toFixed(6)}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="h-4 w-4 text-luna-purple" />
            <span>Longitude: {locationData.longitude.toFixed(6)}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="h-4 w-4 text-luna-purple" />
            <span>Accuracy: {locationData.accuracy.toFixed(0)} meters</span>
          </div>
        </div>
      )}
      
      {isTracking && showMap && (
        <div className="mb-4">
          <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-luna-purple mx-auto" />
                <p className="text-white mt-2">Location coordinates captured</p>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-2"
            onClick={openInGoogleMaps}
          >
            Open in Google Maps
          </Button>
        </div>
      )}
      
      <Button
        className={`w-full ${
          isTracking 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-luna-purple hover:bg-luna-purple/90'
        } text-white`}
        onClick={handleStartTracking}
      >
        {isTracking ? 'Stop Tracking Location' : 'Start Tracking Location'}
      </Button>
    </div>
  );
};

export default LocationTracker;
