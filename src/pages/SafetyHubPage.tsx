
import Navbar from "@/components/layout/Navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import EmergencyAlert from "@/components/safety-hub/EmergencyAlert";
import FakeCallGenerator from "@/components/safety-hub/FakeCallGenerator";
import EmergencyContacts from "@/components/safety-hub/EmergencyContacts";
import LocationTracker from "@/components/safety-hub/LocationTracker";
import SafetyGuidelines from "@/components/safety/SafetyGuidelines";

const SafetyHubPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-6 animate-fade-in">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-8">Safety Hub</h1>
          
          <Tabs defaultValue="emergency" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="emergency">Emergency</TabsTrigger>
              <TabsTrigger value="fake-call">Fake Call</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="emergency">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EmergencyAlert />
                <LocationTracker />
              </div>
              
              <div className="mt-6">
                <SafetyGuidelines />
              </div>
            </TabsContent>
            
            <TabsContent value="fake-call">
              <FakeCallGenerator />
            </TabsContent>
            
            <TabsContent value="contacts">
              <EmergencyContacts />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default SafetyHubPage;
