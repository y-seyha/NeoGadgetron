import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Dispatch, SetStateAction } from "react";
import axios from "axios";

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
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/auth/me", {
          withCredentials: true,
        });

        const data = res.data;

        setContact({
          name: `${data.user.first_name || ""} ${data.user.last_name || ""}`.trim(),
          email: data.user.email || "",
          phone: contact.phone || "", 
        });
      } catch (err) {
        console.error("Failed to fetch user:", err);
        // keep default contact if fetch fails
      }
    }

    fetchUser();
  }, [setContact, contact.phone]);

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
