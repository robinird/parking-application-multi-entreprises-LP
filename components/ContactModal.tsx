"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Copy, Check } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState(false);
  const email = "contact.techcorpparking@gmail.com";

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Erreur lors de la copie :", err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 shadow-2xl z-10 text-center"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-1 rounded-full text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
              <Mail className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Nous contacter</h3>
            <p className="text-sm text-slate-400 mb-6">
              Une question ? Envoyez-nous un message directement à :
            </p>
            <div className="bg-black/50 border border-white/5 rounded-lg p-3 flex items-center justify-between mb-2">
              <span className="text-slate-200 font-mono text-sm">{email}</span>
              <button
                onClick={handleCopyText}
                className="text-slate-400 hover:text-white transition-colors"
                title="Copier l'email"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {copied && <p className="text-xs text-emerald-400">Email copié !</p>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
