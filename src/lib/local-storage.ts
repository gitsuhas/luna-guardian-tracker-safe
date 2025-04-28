// Types
export interface PeriodData {
  id: string;
  lastPeriodStartDate: string;
  cycleLength: number;
  periodLength: number;
  symptoms: string[];
  notes: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
}

// Data keys
const PERIOD_DATA_KEY = 'luna-guard-period-data';
const EMERGENCY_CONTACTS_KEY = 'luna-guard-emergency-contacts';

// Period data functions
export const savePeriodData = (data: PeriodData): void => {
  const existingData = getPeriodDataList();
  
  // If the ID already exists, update it
  const existingIndex = existingData.findIndex(item => item.id === data.id);
  if (existingIndex !== -1) {
    existingData[existingIndex] = data;
  } else {
    // Otherwise add as new
    existingData.push(data);
  }
  
  localStorage.setItem(PERIOD_DATA_KEY, JSON.stringify(existingData));
};

export const getPeriodDataList = (): PeriodData[] => {
  const data = localStorage.getItem(PERIOD_DATA_KEY);
  return data ? JSON.parse(data) : [];
};

export const getPeriodDataById = (id: string): PeriodData | null => {
  const data = getPeriodDataList();
  return data.find(item => item.id === id) || null;
};

export const deletePeriodData = (id: string): void => {
  const data = getPeriodDataList();
  const filteredData = data.filter(item => item.id !== id);
  localStorage.setItem(PERIOD_DATA_KEY, JSON.stringify(filteredData));
};

// Emergency contacts functions
export const getEmergencyContacts = (): EmergencyContact[] => {
  const contacts = localStorage.getItem(EMERGENCY_CONTACTS_KEY);
  return contacts ? JSON.parse(contacts) : [];
};

export const saveEmergencyContact = (contact: EmergencyContact): void => {
  const existingContacts = getEmergencyContacts();
  
  // If the ID already exists, update it
  const existingIndex = existingContacts.findIndex(item => item.id === contact.id);
  if (existingIndex !== -1) {
    existingContacts[existingIndex] = contact;
  } else {
    // Otherwise add as new
    existingContacts.push(contact);
  }
  
  localStorage.setItem(EMERGENCY_CONTACTS_KEY, JSON.stringify(existingContacts));
};

export const deleteEmergencyContact = (id: string): void => {
  const contacts = getEmergencyContacts();
  const filteredContacts = contacts.filter(contact => contact.id !== id);
  localStorage.setItem(EMERGENCY_CONTACTS_KEY, JSON.stringify(filteredContacts));
};
