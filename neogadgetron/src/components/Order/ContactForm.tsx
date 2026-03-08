import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { Dispatch, SetStateAction } from "react";

interface Contact {
  name: string;
  email: string;
  phone: string;
}

interface ContactProps {
  contact: Contact;
  setContact: Dispatch<SetStateAction<Contact>>;
}

export default function ContactForm({ contact, setContact }: ContactProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          placeholder="Full Name"
          value={contact.name}
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
          className="input"
          required
        />

        <input
          placeholder="Email"
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
          className="input"
          required
        />

        <input
          placeholder="Phone"
          value={contact.phone}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
          className="input"
          required
        />
      </CardContent>
    </Card>
  );
}
