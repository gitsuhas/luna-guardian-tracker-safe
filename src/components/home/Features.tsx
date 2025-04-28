
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, Shield } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Calendar,
      title: "Period Tracker",
      description: "Track your menstrual cycle, predict future periods, and get fertility window insights.",
      details: "Keep track of your symptoms, moods, and flow intensity. Get accurate predictions and useful insights about your cycle.",
      link: "/period-tracker",
      buttonText: "Track Period"
    },
    {
      icon: MessageSquare,
      title: "Health Chatbot",
      description: "Get answers to your health questions with our AI-powered chatbot.",
      details: "Ask questions about menstruation, pregnancy, general women's health concerns, and receive guidance in real-time.",
      link: "/health-chat",
      buttonText: "Chat Now"
    },
    {
      icon: Shield,
      title: "Safety Hub",
      description: "Feel secure with fake incoming calls, emergency SOS alerts, and location sharing.",
      details: "Access tools designed for your safety, including fake call generator, location sharing, and emergency contacts manager.",
      link: "/safety-hub",
      buttonText: "Access Safety"
    }
  ];

  return (
    <section className="py-12 md:py-24 animate-fade-in" id="features">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            How Luna Guard Helps You
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex flex-col p-6 bg-card rounded-xl shadow-lg border border-border"
              >
                <div className="mb-4 rounded-lg bg-luna-purple p-2 w-12 h-12 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <p className="text-sm text-muted-foreground mb-6">{feature.details}</p>
                <div className="mt-auto">
                  <Link to={feature.link}>
                    <Button className="w-full bg-luna-purple hover:bg-luna-purple/90 text-white">
                      {feature.buttonText}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
