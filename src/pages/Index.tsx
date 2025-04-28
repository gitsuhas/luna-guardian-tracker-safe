
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import SafetyGuidelines from "@/components/safety/SafetyGuidelines";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <SafetyGuidelines />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
