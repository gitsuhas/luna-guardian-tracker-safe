
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
        <section className="py-12 md:py-24 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
              Your Safety Matters
            </h2>
            <SafetyGuidelines />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
