"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, ArrowRight } from "lucide-react";

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDemo: () => void; // Fonction pour basculer vers l'inscription (DemoModal)
}

export default function AuthModal({ isOpen, onClose, onOpenDemo }: AuthModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-md p-6 relative text-white shadow-2xl z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold mb-2">Connexion à votre espace</h3>
            <p className="text-sm text-slate-400 mb-6">
              Accédez à la gestion de votre parking.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
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
                <span>Se connecter</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-400">
              <p>
                Pas encore de compte ?{" "}
                <button
                  onClick={() => {
                    onClose(); // Ferme la modale de connexion
                    onOpenDemo(); // Ouvre la modale d'email pré-rempli
                  }}
                  className="text-blue-400 hover:underline font-semibold"
                >
                  Créer un espace
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
