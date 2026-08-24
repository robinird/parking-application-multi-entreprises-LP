"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Mail, Building, ArrowRight } from "lucide-react";

// 1. On déclare "initialMode" comme propriété optionnelle dans l'interface TypeScript
export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "register";
}

export default function AuthModal({ isOpen, onClose, initialMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);

  // 2. Réinitialise le mode quand la modale s'ouvre ou que initialMode change
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-md p-6 relative text-white shadow-2xl"
          >
            {/* Bouton fermeture */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Titres */}
            <h3 className="text-2xl font-bold mb-2">
              {mode === "login" ? "Connexion à votre espace" : "Créer le parking de votre entreprise"}
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              {mode === "login"
                ? "Accédez à la gestion de votre parking."
                : "Commencez dès maintenant, gratuit et sans engagement."}
            </p>

            {/* Formulaire */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {mode === "register" && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Nom de l'entreprise</label>
                  <div className="relative">
                    <Building className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Ex: ACME Corp"
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email professionnel</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    placeholder="vous@entreprise.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Mot de passe</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 mt-6"
              >
                <span>{mode === "login" ? "Se connecter" : "Créer mon espace"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Bascule entre Connexion et Inscription */}
            <div className="mt-6 text-center text-xs text-slate-400">
              {mode === "login" ? (
                <p>
                  Pas encore de compte ?{" "}
                  <button
                    onClick={() => setMode("register")}
                    className="text-blue-400 hover:underline font-semibold"
                  >
                    Créer un espace
                  </button>
                </p>
              ) : (
                <p>
                  Déjà un compte ?{" "}
                  <button
                    onClick={() => setMode("login")}
                    className="text-blue-400 hover:underline font-semibold"
                  >
                    Se connecter
                  </button>
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
