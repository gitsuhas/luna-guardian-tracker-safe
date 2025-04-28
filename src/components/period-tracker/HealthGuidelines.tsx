import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Baby } from "lucide-react";

const HealthGuidelines = () => {
  const periodHealthGuidelines = [
    {
      title: "Regular Check-ups",
      content: "Schedule regular gynecological check-ups, even if you're not experiencing any issues. Annual visits can help detect potential problems early."
    },
    {
      title: "Track Your Period",
      content: "Keep track of your menstrual cycle, including start dates, duration, flow intensity, and symptoms. This can help identify irregularities and provide valuable information to your healthcare provider."
    },
    {
      title: "Know What's Normal",
      content: "Understand what's normal for your body. A typical menstrual cycle ranges from 21 to 35 days, with periods lasting 2 to 7 days. If you experience significant changes, consult your healthcare provider."
    },
    {
      title: "Pain Management",
      content: "For menstrual cramps, consider over-the-counter pain relievers, heat therapy, gentle exercise, or relaxation techniques. If pain is severe or debilitating, consult your healthcare provider."
    },
    {
      title: "When to Seek Help",
      content: "Consult a healthcare provider if you experience very heavy bleeding, periods that last longer than 7 days, severe pain, or if you miss three or more periods in a row."
    }
  ];
  
  const pregnancyHealthGuidelines = [
    {
      title: "Prenatal Care",
      content: "Start prenatal care as soon as you think you're pregnant. Regular check-ups are essential for monitoring your health and your baby's development."
    },
    {
      title: "Nutrition During Pregnancy",
      content: "Eat a balanced diet rich in fruits, vegetables, whole grains, lean proteins, and healthy fats. Take prenatal vitamins with folic acid as recommended by your healthcare provider."
    },
    {
      title: "Exercise Safely",
      content: "Regular, moderate exercise can help manage weight gain, improve mood, and prepare your body for childbirth. Consult with your healthcare provider about safe exercise during pregnancy."
    },
    {
      title: "Avoid Harmful Substances",
      content: "Avoid alcohol, tobacco, recreational drugs, and limit caffeine. Consult your healthcare provider before taking any medications, including over-the-counter drugs and supplements."
    },
    {
      title: "Warning Signs",
      content: "Seek immediate medical attention if you experience vaginal bleeding, severe abdominal pain, severe headaches, vision changes, sudden swelling, decreased fetal movement, or contractions before 37 weeks."
    }
  ];

  return (
    <div className="p-4 bg-card rounded-lg border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Baby className="h-5 w-5 text-luna-purple" />
        <h2 className="text-xl font-bold">Health Guidelines</h2>
      </div>
      <p className="text-muted-foreground text-sm mb-6">
        Important information for your menstrual and reproductive health
      </p>
      
      <Accordion type="single" collapsible className="mb-4">
        <AccordionItem value="period-health">
          <AccordionTrigger className="text-lg font-medium">
            Period Health Guidelines
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              {periodHealthGuidelines.map((guideline, index) => (
                <div key={index}>
                  <h4 className="font-medium text-sm">{guideline.title}</h4>
                  <p className="text-sm text-muted-foreground">{guideline.content}</p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="pregnancy-health">
          <AccordionTrigger className="text-lg font-medium">
            Pregnancy Health Guidelines
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              {pregnancyHealthGuidelines.map((guideline, index) => (
                <div key={index}>
                  <h4 className="font-medium text-sm">{guideline.title}</h4>
                  <p className="text-sm text-muted-foreground">{guideline.content}</p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="bg-secondary p-3 rounded-lg">
        <p className="text-sm font-medium">Disclaimer</p>
        <p className="text-xs text-muted-foreground">
          This information is for educational purposes only and is not intended as medical advice. 
          Always consult with qualified healthcare professionals for personalized medical guidance.
        </p>
      </div>
    </div>
  );
};

export default HealthGuidelines;
