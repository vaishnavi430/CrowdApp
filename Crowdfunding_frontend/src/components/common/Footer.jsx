import React from "react";
import { NavLink } from "react-router-dom";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-indigo-600/20 blur-[140px]" />
      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-violet-600/20 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-xl font-bold shadow-lg">
                C
              </div>

              <div>
                <h2 className="text-2xl font-bold">CrowdApp</h2>
                <p className="text-sm text-slate-400">
                  Crowdfunding Platform
                </p>
              </div>
            </div>

            <p className="mt-6 leading-7 text-slate-400">
              Empowering innovators, creators, and communities to bring ideas
              to life through transparent and trusted crowdfunding.
            </p>

            <div className="mt-6 flex gap-4">
              {[Github, Linkedin, Twitter].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="rounded-xl bg-white/10 p-3 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-600"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Quick Links</h3>

            <ul className="space-y-4 text-slate-400">
              <li>
                <NavLink
                  to="/"
                  className="transition hover:text-indigo-400"
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/campaigns"
                  className="transition hover:text-indigo-400"
                >
                  Campaigns
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/about"
                  className="transition hover:text-indigo-400"
                >
                  About
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact"
                  className="transition hover:text-indigo-400"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Legal</h3>

            <ul className="space-y-4 text-slate-400">
              <li>
                <a href="#" className="transition hover:text-indigo-400">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-indigo-400">
                  Terms & Conditions
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-indigo-400">
                  Cookie Policy
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-indigo-400">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">
              Contact Us
            </h3>

            <div className="space-y-5 text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-1 text-indigo-400"
                />
                <span>Pune, Maharashtra, India</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone
                  size={18}
                  className="text-indigo-400"
                />
                <span>+91 XXXXX XXXXX</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="text-indigo-400"
                />
                <span>support@crowdapp.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-400 md:flex-row">
          <p>
            © {new Date().getFullYear()} CrowdApp. All Rights Reserved.
          </p>

          <p className="flex items-center gap-2">
            Made with
            <Heart
              size={16}
              className="fill-red-500 text-red-500"
            />
            for creators worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;