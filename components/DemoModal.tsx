"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Copy, Check, Sparkles, ShieldCheck } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMAIL_RECIPIENT = "contact.techcorpparking@gmail.com";
const EMAIL_SUBJECT = "Demande d'accès / Démo - TechCorp Parking";
const EMAIL_BODY_TEMPLATE = `Bonjour TechCorp Parking,

Je suis intéressé par votre service pour mon entreprise {À Compléter}.
Nous sommes actuellement {À Compléter} employés/collaborateurs pour un parking de {À Compléter} places.

Cordialement,
{À Compléter}`;

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [copied, setCopied] = useState(false);

  const mailtoUrl = `mailto:${EMAIL_RECIPIENT}?subject=${encodeURIComponent(
    EMAIL_SUBJECT
  )}&body=${encodeURIComponent(EMAIL_BODY_TEMPLATE)}`;

  const handleOpenMail = () => {
    window.location.href = mailtoUrl;
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_BODY_TEMPLATE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Erreur lors de la copie du texte :", err);
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
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#0D0D0D] p-6 md:p-8 shadow-2xl z-10"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Étape 1/2 : Préparation de votre demande</span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
              Lançons le parking de votre entreprise
            </h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Un e-mail pré-rempli va s'ouvrir. Il vous suffira de compléter vos informations (nom d'entreprise, nombre de places) et de l'envoyer.
            </p>

            <div className="mb-6 rounded-2xl border border-white/5 bg-black/50 p-4 text-xs font-mono text-slate-300 leading-relaxed relative group">
              <div className="text-slate-500 mb-2 font-sans font-medium border-b border-white/5 pb-2 flex justify-between items-center">
                <span>Sujet : {EMAIL_SUBJECT}</span>
                <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">Pré-rempli</span>
              </div>
              <pre className="whitespace-pre-wrap font-sans text-slate-300">
                {EMAIL_BODY_TEMPLATE}
              </pre>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleOpenMail}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3.5 px-6 rounded-full font-bold transition-all shadow-[0_0_25px_-5px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 group"
              >
                <Mail className="w-5 h-5 transition-transform group-hover:scale-110" />
                Ouvrir mon logiciel de messagerie
              </button>

              <button
                onClick={handleCopyText}
                className="w-full bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 py-3 px-6 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Texte copié dans le presse-papier !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    Copier le texte du message (alternative)
                  </>
                )}
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Réponse garantie en moins de 2 heures ouvrées • Sans engagement</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
