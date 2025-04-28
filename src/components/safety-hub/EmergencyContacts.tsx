
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { EmergencyContact, getEmergencyContacts, saveEmergencyContact, deleteEmergencyContact } from "@/lib/local-storage";
import { Avatar } from "@/components/ui/avatar";

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>(getEmergencyContacts());
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  
  const handleAddContact = () => {
    if (!name) {
      toast.error("Please enter a contact name");
      return;
    }
    
    if (!phone && !email) {
      toast.error("Please enter a phone number or email address");
      return;
    }
    
    const newContact: EmergencyContact = {
      id: Date.now().toString(),
      name,
      phone: phone || undefined,
      email: email || undefined
    };
    
    saveEmergencyContact(newContact);
    setContacts(getEmergencyContacts());
    
    // Reset form
    setName("");
    setPhone("");
    setEmail("");
    
    toast.success("Emergency contact added");
  };
  
  const handleDeleteContact = (id: string) => {
    deleteEmergencyContact(id);
    setContacts(getEmergencyContacts());
    toast.success("Contact removed");
  };

  return (
    <div className="p-4 bg-card rounded-lg border border-border">
      <h3 className="font-medium mb-2">Emergency Contacts</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Add trusted contacts who will receive your SOS alerts
      </p>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contact name"
            className="bg-secondary"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number (optional)</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            className="bg-secondary"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address (optional)</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="bg-secondary"
          />
        </div>
        
        <p className="text-xs text-muted-foreground">
          At least one contact method (phone or email) is required
        </p>
        
        <Button
          onClick={handleAddContact}
          className="w-full bg-luna-purple hover:bg-luna-purple/90 text-white"
        >
          Add Emergency Contact
        </Button>
      </div>
      
      {contacts.length > 0 && (
        <div className="mt-8">
          <h4 className="font-medium text-sm mb-3">Your Emergency Contacts</h4>
          
          <div className="space-y-3">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-3 bg-secondary rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 bg-luna-purple/30">
                    <span>{contact.name.charAt(0).toUpperCase()}</span>
                  </Avatar>
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    {contact.phone && <p className="text-xs text-muted-foreground">{contact.phone}</p>}
                    {contact.email && <p className="text-xs text-muted-foreground">{contact.email}</p>}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteContact(contact.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyContacts;
