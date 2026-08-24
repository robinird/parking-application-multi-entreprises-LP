"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, KeyRound, ArrowRight, AlertCircle, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ============================================================================
// DICTIONNAIRE DES CODES D'ACCÈS ENTREPRISES
// Pour ajouter une entreprise : ajoutez une ligne "CODE_RECHERCHE": "ROUTE_DE_DESTINATION"
// ============================================================================
const ENTERPRISE_ROUTES: Record<string, string> = {
  "DEMO2026": "/demo",
  "ACME-PARK": "https://app.techcorpparking.com/acme",
  "TECHCORP": "/dashboard",
  "TEST": "/demo",
};

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCleanState = () => {
    setCode("");
    setError(null);
    setIsLoading(false);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanCode = code.trim().toUpperCase();

    if (!cleanCode) {
      setError("Veuillez saisir un code d'entreprise.");
      return;
    }

    setIsLoading(true);

    // Simulation d'une micro-vérification instantanée
    setTimeout(() => {
      const destination = ENTERPRISE_ROUTES[cleanCode];

      if (destination) {
        if (destination.startsWith("http://") || destination.startsWith("https://")) {
          window.location.href = destination;
        } else {
          router.push(destination);
        }
      } else {
        setIsLoading(false);
        setError("Code invalide ou expiré. Veuillez vérifier votre saisie.");
      }
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop glassmorphism */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCleanState}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Fenêtre Modale */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#0D0D0D] p-6 md:p-8 shadow-2xl z-10"
          >
            {/* Bouton Fermer */}
            <button
              onClick={handleCleanState}
              className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Fermer la fenêtre"
            >
              <X className="w-5 h-5" />
            </button>

            {/* En-tête */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Espace Entreprise</h3>
                <p className="text-xs text-slate-400">Accès sécurisé à votre parking</p>
              </div>
            </div>

            {/* Formulaire de saisie du code */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="enterprise-code" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Merci de saisir le code de l'entreprise :
                </label>
                <div className="relative">
                  <input
                    id="enterprise-code"
                    type="text"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Ex: ACME-PARK ou DEMO2026"
                    className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-3.5 pl-11 text-white placeholder-slate-600 text-sm font-mono tracking-wider focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all uppercase"
                    autoFocus
                  />
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Message d'erreur neutre */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bouton d'accès */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white hover:bg-slate-200 text-black font-bold py-3.5 px-6 rounded-full transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Connexion en cours...</span>
                ) : (
                  <>
                    <span>Accéder à mon espace</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-slate-500">
                Vous n'avez pas de code ?{" "}
                <button
                  type="button"
                  onClick={handleCleanState}
                  className="text-blue-400 hover:underline font-medium"
                >
                  Demandez un accès démo
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
