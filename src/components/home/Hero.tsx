
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="py-12 md:py-24 lg:py-32 animate-fade-in">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Your Personal Health & Safety Companion
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
            Luna Guard helps women track their health and stay safe with advanced period
            tracking, health guidance, and safety features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link to="/health-chat">
              <Button className="bg-luna-purple hover:bg-luna-purple/90 text-white">
                Chat With Luna
              </Button>
            </Link>
            <Link to="/safety-hub">
              <Button variant="outline" className="border-luna-purple text-luna-purple hover:text-white hover:bg-luna-purple/90">
                Access Safety Hub
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
