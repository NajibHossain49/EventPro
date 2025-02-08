import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
  Heart,
  Calendar,
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const gradients = [
    "from-pink-500 via-purple-500 to-indigo-500",
    "from-green-400 via-teal-500 to-blue-600",
    "from-yellow-400 via-orange-500 to-red-600",
    "from-cyan-500 via-blue-600 to-purple-700",
  ];

  const socialLinks = [
    {
      Icon: Facebook,
      color: "text-blue-600",
      gradient: gradients[0],
      href: "https://www.facebook.com",
    },
    {
      Icon: Twitter,
      color: "text-sky-500",
      gradient: gradients[1],
      href: "https://www.twitter.com",
    },
    {
      Icon: Instagram,
      color: "text-pink-600",
      gradient: gradients[2],
      href: "https://www.instagram.com",
    },
    {
      Icon: Linkedin,
      color: "text-blue-700",
      gradient: gradients[3],
      href: "https://www.linkedin.com",
    },
  ];

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-10"></div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-10 h-10 text-blue-400 animate-pulse" />
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                EventPro
              </h3>
            </div>
            <p className="text-gray-300 italic">
              Creating Unforgettable Moments ✨
            </p>

            <div className="flex space-x-4 mt-4">
              {socialLinks.map(({ Icon, color, gradient, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${color} hover:scale-110 transform transition-all duration-300 group relative`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-50 rounded-full blur-lg transition-all duration-300`}></div>
                  <Icon className="w-7 h-7 relative z-10" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "Our Services", path: "/services" },
                { name: "Book Event", path: "/book-event" },
                { name: "Gallery", path: "/gallery" },
                { name: "Contact Us", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">
              Subscribe for Updates
            </h4>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-full bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
              />
              <button
                className="absolute right-1 top-1 bottom-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 rounded-full flex items-center space-x-2 transition-all duration-300"
                onClick={() => {
                  console.log("Subscribed:", email);
                  setEmail("");
                }}
              >
                <Send className="w-5 h-5" />
                <span>Subscribe</span>
              </button>
            </div>
            <p className="text-xs text-gray-400 flex items-center">
              <Heart className="w-4 h-4 mr-2 text-red-500 animate-pulse" />
              Get latest updates about upcoming events
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 text-center relative">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
          <p className="text-gray-400 bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-gray-200 to-gray-50 transition-all duration-300">
            © 2025 EventPro: Making Every Moment Magical ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;