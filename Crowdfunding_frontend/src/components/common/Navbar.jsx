import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Campaigns", path: "/campaigns" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-lg font-bold text-white shadow-lg">
            C
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              CrowdApp
            </h2>

            <p className="-mt-1 text-xs text-slate-500">
              Crowdfunding Platform
            </p>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-2 backdrop-blur-md md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path}>
              {({ isActive }) => (
                <span
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md"
                      : "text-slate-600 hover:bg-slate-100 hover:text-indigo-600"
                  }`}
                >
                  {link.name}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <NavLink to="/login">
            <Button variant="secondary">
              Login
            </Button>
          </NavLink>

          <NavLink to="/signup">
            <Button variant="primary">
              Get Started
            </Button>
          </NavLink>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 transition hover:bg-slate-100 md:hidden"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="border-t border-slate-200 bg-white/95 backdrop-blur-xl md:hidden"
          >
            <div className="space-y-2 px-6 py-5">
              {[
                ...navLinks,
                { name: "Login", path: "/login" },
                { name: "Sign Up", path: "/signup" },
              ].map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {({ isActive }) => (
                    <div
                      className={`rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {link.name}
                    </div>
                  )}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;