
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Phone } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FakeCallGenerator = () => {
  const [callMessage, setCallMessage] = useState("Baby girl, always trust your instincts. If you need to leave, say you need to help me right now.");
  const [voiceType, setVoiceType] = useState("male1");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const callMessages = [
    {
      value: "emergency",
      label: "Baby girl, always trust your instincts. If you need to leave, say you need to help me right now."
    },
    {
      value: "work",
      label: "Hey, there's an urgent situation at work. I need you to come in right away."
    },
    {
      value: "family",
      label: "Hi honey, there's a family emergency. You need to come home immediately."
    },
    {
      value: "friend",
      label: "Hey, I need your help with something important. Can you meet me as soon as possible?"
    }
  ];
  
  const voices = [
    { value: "male1", label: "Male Voice 1" },
    { value: "male2", label: "Male Voice 2" },
    { value: "female1", label: "Female Voice 1" },
    { value: "female2", label: "Female Voice 2" }
  ];
  
  const handleGenerateCall = () => {
    setIsGenerating(true);
    
    // Simulate incoming call
    setTimeout(() => {
      showFakeCallScreen();
      setIsGenerating(false);
    }, 1500);
  };
  
  const showFakeCallScreen = () => {
    // Create fake call UI
    const callContainer = document.createElement('div');
    callContainer.className = 'fixed inset-0 z-50 bg-black flex flex-col items-center justify-between p-8';
    callContainer.style.zIndex = '9999';
    
    // Add caller info
    const callerInfo = document.createElement('div');
    callerInfo.className = 'text-center';
    callerInfo.innerHTML = `
      <div class="w-24 h-24 mx-auto bg-gray-600 rounded-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      </div>
      <h2 class="text-white text-2xl font-bold mt-4">Incoming Call</h2>
      <p class="text-gray-400">${voiceType.includes('male') ? 'Dad' : 'Mom'}</p>
    `;
    
    // Add buttons
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'w-full flex justify-around';
    
    const declineButton = document.createElement('button');
    declineButton.className = 'w-16 h-16 bg-red-600 rounded-full flex items-center justify-center';
    declineButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
        <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path>
        <line x1="2" x2="22" y1="2" y2="22"></line>
      </svg>
    `;
    declineButton.onclick = () => {
      document.body.removeChild(callContainer);
    };
    
    const acceptButton = document.createElement('button');
    acceptButton.className = 'w-16 h-16 bg-green-600 rounded-full flex items-center justify-center';
    acceptButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    `;
    acceptButton.onclick = () => {
      // Play audio message
      const utterance = new SpeechSynthesisUtterance(callMessage);
      
      if (voiceType.includes('male')) {
        utterance.pitch = 0.8;
      } else {
        utterance.pitch = 1.2;
      }
      
      speechSynthesis.speak(utterance);
      
      // Update UI for active call
      callerInfo.innerHTML = `
        <div class="w-24 h-24 mx-auto bg-gray-600 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </div>
        <h2 class="text-white text-2xl font-bold mt-4">Call Active</h2>
        <p class="text-gray-400">${voiceType.includes('male') ? 'Dad' : 'Mom'}</p>
        <div class="mt-4 text-green-500">
          <span class="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          <span>00:00</span>
        </div>
      `;
      
      buttonsDiv.innerHTML = '';
      
      const endCallButton = document.createElement('button');
      endCallButton.className = 'w-16 h-16 bg-red-600 rounded-full flex items-center justify-center';
      endCallButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
          <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path>
          <line x1="2" x2="22" y1="2" y2="22"></line>
        </svg>
      `;
      endCallButton.onclick = () => {
        speechSynthesis.cancel();
        document.body.removeChild(callContainer);
      };
      
      buttonsDiv.appendChild(endCallButton);
    };
    
    buttonsDiv.appendChild(declineButton);
    buttonsDiv.appendChild(acceptButton);
    
    // Assemble fake call UI
    callContainer.appendChild(callerInfo);
    callContainer.appendChild(buttonsDiv);
    
    // Add to document
    document.body.appendChild(callContainer);
    
    // Add sound
    const audio = new Audio("https://www2.cs.uic.edu/~i101/SoundFiles/StarWars3.wav");
    audio.loop = true;
    audio.play();
    
    // Stop audio when call ends
    declineButton.addEventListener('click', () => {
      audio.pause();
    });
    
    acceptButton.addEventListener('click', () => {
      audio.pause();
    });
  };

  return (
    <div className="p-4 bg-card rounded-lg border border-border">
      <h3 className="font-medium mb-2">Fake Call Generator</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Generate a fake incoming call to help you exit uncomfortable situations
      </p>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Call Message</Label>
          <Select value={callMessage} onValueChange={setCallMessage}>
            <SelectTrigger className="bg-secondary">
              <SelectValue placeholder="Select a message" />
            </SelectTrigger>
            <SelectContent>
              {callMessages.map((message) => (
                <SelectItem key={message.value} value={message.label}>
                  {message.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            This message will be used for the voice in the fake call
          </p>
        </div>
        
        <div className="space-y-2">
          <Label>Voice Selection</Label>
          <Select value={voiceType} onValueChange={setVoiceType}>
            <SelectTrigger className="bg-secondary">
              <SelectValue placeholder="Select a voice" />
            </SelectTrigger>
            <SelectContent>
              {voices.map((voice) => (
                <SelectItem key={voice.value} value={voice.value}>
                  {voice.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button
          onClick={handleGenerateCall}
          disabled={isGenerating}
          className="w-full bg-luna-purple hover:bg-luna-purple/90 text-white"
        >
          <Phone className="mr-2 h-4 w-4" />
          {isGenerating ? "Generating Fake Call..." : "Generate Fake Call Now"}
        </Button>
      </div>
      
      <div className="mt-8 bg-secondary p-3 rounded-lg border border-border">
        <h4 className="font-medium text-sm mb-3">How to Use:</h4>
        <ol className="list-decimal list-inside text-sm space-y-2">
          <li>Select your desired message and voice</li>
          <li>Press "Generate Fake Call Now"</li>
          <li>Answer the fake call when it appears</li>
          <li>Excuse yourself from the current situation using the call as a reason</li>
        </ol>
      </div>
    </div>
  );
};

export default FakeCallGenerator;
