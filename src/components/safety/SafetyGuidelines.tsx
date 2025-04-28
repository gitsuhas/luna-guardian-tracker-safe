
import { Card, CardContent } from "@/components/ui/card";

const SafetyGuidelines = () => {
  const emergencyNumbers = [
    { number: "911", description: "Emergency Services" },
    { number: "100", description: "Police" },
    { number: "108", description: "Ambulance" },
    { number: "1098", description: "Child Helpline" },
    { number: "181", description: "Women Helpline" },
  ];

  const safetyTips = [
    {
      title: "Stay Alert and Aware",
      description: "Avoid distractions like looking at your phone while walking. Be aware of your surroundings, especially in unfamiliar areas."
    },
    {
      title: "Share Your Location",
      description: "Let someone you trust know your whereabouts and expected time of return when going out."
    },
    {
      title: "Trust Your Instincts",
      description: "If something doesn't feel right, it probably isn't. Don't hesitate to leave a situation that makes you uncomfortable."
    },
    {
      title: "Avoid Isolated Areas",
      description: "Stick to well-lit, populated areas, especially when alone at night."
    },
    {
      title: "Keep Emergency Contacts Handy",
      description: "Have a list of emergency contacts easily accessible on your phone and memorize important numbers."
    }
  ];

  return (
    <div className="p-4 bg-card rounded-lg border border-border">
      <h2 className="text-xl font-bold mb-2">Safety Guidelines</h2>
      <p className="text-muted-foreground text-sm mb-6">Important numbers and safety tips</p>
      
      <div className="mb-6">
        <h3 className="font-medium mb-3">Emergency Numbers</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {emergencyNumbers.map((item, index) => (
            <Card key={index} className="bg-secondary border-none">
              <CardContent className="p-3 text-center">
                <p className="text-xl font-bold">{item.number}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-3">Personal Safety Tips</h3>
        <div className="space-y-3">
          {safetyTips.map((tip, index) => (
            <div key={index}>
              <h4 className="font-medium text-sm">{tip.title}</h4>
              <p className="text-xs text-muted-foreground">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SafetyGuidelines;
