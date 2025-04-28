
import Navbar from "@/components/layout/Navbar";
import ChatUI from "@/components/health-chat/ChatUI";

const HealthChatPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-6 animate-fade-in">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Luna Health Assistant</h1>
              <p className="text-muted-foreground">Ask me anything about women's health and safety</p>
            </div>
          </div>
          
          <ChatUI />
        </div>
      </main>
    </div>
  );
};

export default HealthChatPage;
