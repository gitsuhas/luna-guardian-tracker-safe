
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { EmergencyContact, getEmergencyContacts, saveEmergencyContact, deleteEmergencyContact } from "@/lib/local-storage";
import { Avatar } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Load contacts on component mount
  useEffect(() => {
    const loadContacts = async () => {
      setIsLoading(true);
      try {
        // Try to fetch from Supabase first
        const { data: supabaseContacts, error } = await supabase
          .from('emergency_contacts')
          .select('*');
        
        if (error) {
          throw error;
        }
        
        if (supabaseContacts && supabaseContacts.length > 0) {
          // Map Supabase data to our format
          const formattedContacts = supabaseContacts.map(contact => ({
            id: contact.id,
            name: contact.name,
            phone: contact.phone || undefined,
            email: contact.email || undefined
          }));
          setContacts(formattedContacts);
        } else {
          // Fall back to local storage
          setContacts(getEmergencyContacts());
        }
      } catch (error) {
        console.error("Error loading contacts:", error);
        // Fall back to local storage
        setContacts(getEmergencyContacts());
      } finally {
        setIsLoading(false);
      }
    };
    
    loadContacts();
  }, []);
  
  const handleAddContact = async () => {
    if (!name) {
      toast.error("Please enter a contact name");
      return;
    }
    
    if (!phone && !email) {
      toast.error("Please enter a phone number or email address");
      return;
    }
    
    setIsLoading(true);
    const contactId = uuidv4();
    
    const newContact: EmergencyContact = {
      id: contactId,
      name,
      phone: phone || undefined,
      email: email || undefined
    };
    
    try {
      // Try to save to Supabase first
      const { error } = await supabase
        .from('emergency_contacts')
        .insert({
          id: contactId,
          user_id: (await supabase.auth.getUser()).data.user?.id,
          name: name,
          phone: phone || null,
          email: email || null
        });
      
      if (error) {
        throw error;
      }
      
      // Update local state
      setContacts(prev => [...prev, newContact]);
      
      // Also save to local storage as backup
      saveEmergencyContact(newContact);
      
      // Reset form
      setName("");
      setPhone("");
      setEmail("");
      
      toast.success("Emergency contact added");
    } catch (error) {
      console.error("Error adding contact:", error);
      
      // Fall back to local storage
      saveEmergencyContact(newContact);
      setContacts(prev => [...prev, newContact]);
      toast.success("Contact saved locally");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteContact = async (id: string) => {
    setIsLoading(true);
    
    try {
      // Try to delete from Supabase first
      const { error } = await supabase
        .from('emergency_contacts')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      // Update local state
      setContacts(prev => prev.filter(contact => contact.id !== id));
      
      // Also delete from local storage
      deleteEmergencyContact(id);
      
      toast.success("Contact removed");
    } catch (error) {
      console.error("Error deleting contact:", error);
      
      // Fall back to local storage
      deleteEmergencyContact(id);
      setContacts(prev => prev.filter(contact => contact.id !== id));
      toast.success("Contact removed locally");
    } finally {
      setIsLoading(false);
    }
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
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
        </div>
        
        <p className="text-xs text-muted-foreground">
          At least one contact method (phone or email) is required
        </p>
        
        <Button
          onClick={handleAddContact}
          className="w-full bg-luna-purple hover:bg-luna-purple/90 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Emergency Contact"}
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
                  disabled={isLoading}
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
