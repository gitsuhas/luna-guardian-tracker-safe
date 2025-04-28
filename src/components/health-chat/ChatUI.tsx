
import { useState, useRef, useEffect } from "react";
import { RefreshCcw, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatUI = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi there! I'm Luna, your women's health assistant. I can answer questions about menstruation, pregnancy, women's health, and safety. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        isUser: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputValue("");
      
      // Simulate AI response
      setTimeout(() => {
        // Example AI response based on user input
        const aiResponse = generateAIResponse(inputValue);
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      }, 1000);
    }
  };
  
  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("period") || input.includes("menstruation") || input.includes("cycle")) {
      return "A typical menstrual cycle lasts about 28 days, but can range from 21 to 35 days. The bleeding portion usually lasts 3-7 days. If you're experiencing irregular periods, it could be due to stress, weight changes, or hormonal fluctuations. Would you like more specific information?";
    } else if (input.includes("pregnancy") || input.includes("pregnant")) {
      return "Early signs of pregnancy include missed periods, nausea, tender breasts, and fatigue. If you think you might be pregnant, a home pregnancy test can be effective from the first day of your missed period. For the most accurate results, consider consulting with a healthcare provider.";
    } else if (input.includes("pain") || input.includes("cramps")) {
      return "Period cramps are caused by uterine contractions. To relieve discomfort, you can try over-the-counter pain relievers, a heating pad, gentle exercise, or relaxation techniques. If you experience severe pain that interferes with daily activities, you might want to consult a healthcare provider.";
    } else if (input.includes("safety") || input.includes("safe")) {
      return "Your safety is important. Luna Guard's Safety Hub offers features like fake calls, SOS alerts, and location sharing to help you feel secure in uncomfortable situations. Remember to always trust your instincts and have emergency contacts readily available.";
    } else {
      return "Thank you for your question. I'm a simulated health assistant with limited responses in this demo. In a complete version, I would provide helpful information about women's health topics. Is there something specific about menstruation, pregnancy, or women's health you'd like to know?";
    }
  };
  
  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome",
        text: "Hi there! I'm Luna, your women's health assistant. I can answer questions about menstruation, pregnancy, women's health, and safety. How can I help you today?",
        isUser: false,
        timestamp: new Date()
      }
    ]);
    toast.success("Chat has been reset");
  };
  
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[75vh] max-h-[75vh]">
      <div className="flex items-center justify-between bg-card p-4 rounded-t-lg border border-border">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-luna-purple text-white">
            <span className="text-lg font-medium">L</span>
          </Avatar>
          <div>
            <h3 className="font-bold">Luna Health Assistant</h3>
            <p className="text-xs text-muted-foreground">Ask me anything about women's health and safety</p>
          </div>
        </div>
        <Button variant="outline" size="icon" onClick={handleResetChat} title="Reset Chat">
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-background border-x border-border">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.isUser 
                    ? 'bg-luna-purple text-white' 
                    : 'bg-card border border-border'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <span className="text-xs opacity-70 block text-right mt-1">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <form 
        onSubmit={handleSendMessage}
        className="bg-card p-4 border border-border rounded-b-lg flex space-x-2"
      >
        <Input
          placeholder="Type your health question..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="bg-secondary"
        />
        <Button type="submit" size="icon" className="bg-luna-purple hover:bg-luna-purple/90 text-white">
          <Send className="h-4 w-4" />
        </Button>
      </form>
      
      <p className="text-center text-xs text-muted-foreground py-2">
        This is a simulated assistant. For medical concerns, please consult a healthcare professional.
      </p>
    </div>
  );
};

export default ChatUI;
