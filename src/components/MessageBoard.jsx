import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, FileText } from 'lucide-react';

const notices = [
  {
    title: "Send a Raven",
    desc: "Direct messages and electronic mail.",
    action: "Email Me",
    // Make sure it starts exactly with "mailto:"
    link: "mailto:keshavgosar567@gmail.com", 
    icon: Mail,
    rotate: "-rotate-2",
    color: "bg-amber-100"
  },
  {
    title: "Guild Profile",
    desc: "View my professional network and connections.",
    action: "Visit LinkedIn",
    // MUST start with https://
    link: "https://www.linkedin.com/in/keshav-gosar-479460227", 
    icon: Linkedin,
    rotate: "rotate-3",
    color: "bg-blue-50"
  },
  {
    title: "Code Archives",
    desc: "Inspect the ancient scripts and repositories.",
    action: "View GitHub",
    // MUST start with https://
    link: "https://github.com/keshavgosar", 
    icon: Github,
    rotate: "-rotate-1",
    color: "bg-gray-100"
  },
  {
    title: "Scroll of Legends",
    desc: "Download a formal summary of my deeds.",
    action: "Get Resume",
    link: "/assets/resume/KeshavResume2026.(4).pdf", 
    icon: FileText,
    rotate: "rotate-2",
    color: "bg-orange-50"
  }
];

export default function MessageBoard() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <p className="text-center text-xl text-gray-700 italic mb-8 font-casual">
        "Looking for a skilled programmer to join your party? Take a notice."
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl w-full">
        {notices.map((notice, idx) => {
          // Check if this is an email link
          const isMail = notice.link.startsWith('mailto:');

          return (
            <motion.a
              key={idx}
              href={notice.link}
              // If it's an email, don't open a new blank tab. Otherwise, open a new tab safely.
              target={isMail ? "_self" : "_blank"}
              rel={isMail ? undefined : "noopener noreferrer"}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.15, type: "spring" }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className={`block relative ${notice.color} ${notice.rotate} p-6 pb-8 border-2 border-amber-900 shadow-[2px_4px_10px_rgba(0,0,0,0.5)] transition-transform`}
              style={{ 
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' 
              }}
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-600 rounded-full border-2 border-red-900 shadow-md flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full opacity-50 absolute top-1 left-1" />
              </div>

              <div className="flex flex-col items-center text-center mt-2 gap-3">
                <notice.icon size={48} className="text-stone-800" />
                <h3 className="text-2xl font-medieval font-bold text-black border-b border-black pb-1">
                  {notice.title}
                </h3>
                <p className="font-casual text-gray-800 text-sm">
                  {notice.desc}
                </p>
                <span className="mt-2 text-red-800 font-bold underline underline-offset-4 font-medieval text-lg decoration-2">
                  {notice.action}
                </span>
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}