import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-background border-t mt-10">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <h2 className="text-xl font-bold">Gadgetron</h2>
          <p className="text-sm text-muted-foreground">
            The best place to find electronics, gadgets, and more. Fast
            delivery, reliable products, and amazing deals.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Link to="#" className="hover:text-primary transition">
              <FaFacebookF />
            </Link>
            <Link to="#" className="hover:text-primary transition">
              <FaInstagram />
            </Link>
            <Link to="#" className="hover:text-primary transition">
              <FaTwitter />
            </Link>
            <Link to="#" className="hover:text-primary transition">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-foreground transition">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-foreground transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/faq" className="hover:text-foreground transition">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="hover:text-foreground transition">
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-foreground transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-foreground transition">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Newsletter</h3>
          <p className="text-sm text-muted-foreground">
            Subscribe to get the latest deals and updates.
          </p>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Your email"
              className="flex-1 h-10"
            />
            <Button className="h-10">Subscribe</Button>
          </div>
        </div>
      </div>

      <div className="border-t mt-8 py-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Gadgetron. All rights reserved.
      </div>
    </footer>
  );
}
