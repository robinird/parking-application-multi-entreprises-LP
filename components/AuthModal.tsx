"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, ArrowRight, Mail, AlertTriangle } from "lucide-react";

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "register";
  onOpenDemo?: () => void;
}

const MAX_ATTEMPTS = 5;
const BLOCK_MINUTES = 15;
const BLOCK_MS = BLOCK_MINUTES * 60 * 1000;

// 🔒 DICTIONNAIRE DES MOTS DE PASSE ET REDIRECTIONS
// Ajoute tes mots de passe à gauche et les liens vers lesquels ils redirigent à droite.
const PASSWORD_REDIRECTS: Record<string, string> = {
  "LeoDemo2024": "https://app.techcorpparking.com/demo-leo",
  "AdminTechCorp": "https://app.techcorpparking.com/admin",
  "EntrepriseAlpha": "https://app.techcorpparking.com/espace-alpha",
};

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = "login",
  onOpenDemo,
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [isMounted, setIsMounted] = useState(false);
  
  // Nouveaux états pour gérer le mot de passe et les erreurs
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const [attempts, setAttempts] = useState(0);
  const [blockTimeLeft, setBlockTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
    setMode(initialMode);
    setPassword(""); // Réinitialiser le mot de passe à l'ouverture
    setError("");
  }, [initialMode, isOpen]);

  useEffect(() => {
    if (!isOpen || !isMounted) return;

    const checkBlockStatus = () => {
      const blockedUntilStr = localStorage.getItem("login_blocked_until");
      if (blockedUntilStr) {
        const blockedUntil = parseInt(blockedUntilStr, 10);
        const timeRemaining = blockedUntil - Date.now();

        if (timeRemaining > 0) {
          setBlockTimeLeft(Math.ceil(timeRemaining / 60000));
        } else {
          setBlockTimeLeft(null);
          localStorage.removeItem("login_blocked_until");
          localStorage.setItem("login_attempts", "0");
          setAttempts(0);
        }
      }

      const savedAttempts = localStorage.getItem("login_attempts");
      if (savedAttempts) {
        setAttempts(parseInt(savedAttempts, 10));
      }
    };

    checkBlockStatus();
    const interval = setInterval(checkBlockStatus, 60000);

    return () => clearInterval(interval);
  }, [isOpen, isMounted]);

  if (!isOpen) return null;

  const handleSwitchToDemo = () => {
    onClose();
    if (onOpenDemo) {
      onOpenDemo();
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (blockTimeLeft !== null) return;
    
    // 1. Vérification du mot de passe dans notre dictionnaire
    const redirectUrl = PASSWORD_REDIRECTS[password];

    if (redirectUrl) {
      // ✅ Succès : Le mot de passe est trouvé
      setError("");
      localStorage.removeItem("login_attempts"); // On réinitialise les erreurs
      window.location.href = redirectUrl; // Redirection vers le lien
    } else {
      // ❌ Échec : Mauvais mot de passe
      setError("Mot de passe incorrect.");
      setPassword(""); // On vide le champ
      
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem("login_attempts", newAttempts.toString());

      if (newAttempts >= MAX_ATTEMPTS) {
        const blockedUntil = Date.now() + BLOCK_MS;
        localStorage.setItem("login_blocked_until", blockedUntil.toString());
        setBlockTimeLeft(BLOCK_MINUTES);
        setError(""); // On efface l'erreur simple pour laisser place au message de blocage
      }
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
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-md p-6 relative text-white shadow-2xl z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold mb-2">
              {mode === "login" ? "Connexion à votre espace" : "Créer un espace"}
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              {mode === "login"
                ? "Accédez à la gestion de votre parking d'entreprise."
                : "Demandez votre accès personnalisé en quelques secondes."}
            </p>

            {mode === "login" ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Mot de passe d'accès
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError(""); // Efface l'erreur dès que l'utilisateur tape
                      }}
                      disabled={blockTimeLeft !== null}
                      className={`w-full bg-white/5 border rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                        error ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-blue-500"
                      }`}
                    />
                  </div>
                  {/* Affichage de l'erreur de mot de passe */}
                  {error && (
                    <p className="text-red-400 text-xs mt-1.5 font-medium">{error}</p>
                  )}
                </div>

                {isMounted && blockTimeLeft !== null ? (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-3 mt-4">
                    <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-400">Accès temporairement bloqué</p>
                      <p className="text-xs text-red-400/80 mt-1">
                        Trop de tentatives échouées. Veuillez réessayer dans {blockTimeLeft} min.
                      </p>
                    </div>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={!password}
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 disabled:text-white/50 text-white font-semibold py-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 mt-6"
                  >
                    <span>Se connecter</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                
                {isMounted && blockTimeLeft === null && attempts > 0 && attempts < MAX_ATTEMPTS && (
                  <p className="text-xs text-amber-500/80 text-center mt-2">
                    Tentative {attempts}/{MAX_ATTEMPTS} avant blocage.
                  </p>
                )}
              </form>
            ) : (
              <div className="space-y-4 text-center">
                <p className="text-sm text-slate-300">
                  Pour créer un espace entreprise, nous préparons votre demande personnalisée.
                </p>
                <button
                  onClick={handleSwitchToDemo}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Poursuivre la demande par e-mail</span>
                </button>
              </div>
            )}

            <div className="mt-6 text-center text-xs text-slate-400 border-t border-white/5 pt-4">
              {mode === "login" ? (
                <p>
                  Pas encore de compte ?{" "}
                  <button
                    onClick={() => {
                      if (onOpenDemo) {
                        handleSwitchToDemo();
                      } else {
                        setMode("register");
                      }
                    }}
                    type="button"
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
                    type="button"
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
