"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { 
  CarFront, 
  ChevronRight, 
  Smartphone, 
  Scale, 
  QrCode, 
  LayoutDashboard, 
  ChevronDown
} from "lucide-react";

import ContactModal from "@/components/ContactModal";
import AuthModal from "@/components/AuthModal";

// --- COMPOSANTS UTILITAIRES ---

const TypewriterText = () => {
  const phrases = [
    "des places réservées restent vides toute la journée.",
    "votre fichier Excel de suivi n'est jamais à jour.",
    "vous perdez votre temps à arbitrer des conflits."
  ];
  
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 30 : 60;
    const pauseTime = isDeleting ? 500 : 2500;

    const handleTyping = () => {
      const fullText = phrases[currentPhraseIndex];

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      } else {
        const nextText = isDeleting
          ? fullText.substring(0, currentText.length - 1)
          : fullText.substring(0, currentText.length + 1);
        setCurrentText(nextText);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, phrases]);

  return (
    <span className="text-blue-400 font-semibold inline-block">
      {currentText}
      <span className="animate-pulse text-blue-500">|</span>
    </span>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 py-4 cursor-pointer group" onClick={() => setIsOpen(!isOpen)}>
      <div className="flex justify-between items-center">
        <h4 className="text-lg text-white font-medium group-hover:text-blue-400 transition-colors">{question}</h4>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-slate-400">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- PAGE PRINCIPALE ---

export default function LandingPage() {
  // États de contrôle des modales
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Animation du fil conducteur
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const carTop = useTransform(scaleY, [0, 1], ["0%", "100%"]);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-blue-500/30">
      
      {/* FIL CONDUCTEUR (SCROLL INDICATOR FIXE) */}
      <div className="fixed left-2 md:left-6 top-[15vh] bottom-[10vh] w-12 z-40 pointer-events-none flex flex-col items-center">
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-blue-500/70 mb-4">
          <ChevronDown className="w-5 h-5" />
        </motion.div>

        <div className="w-[2px] flex-1 bg-white/10 relative">
          <motion.div className="absolute top-0 left-0 w-full bg-blue-500 origin-top h-full" style={{ scaleY }} />

          {/* Place de parking d'arrivée */}
          <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 w-8 h-12 border-2 border-dashed border-blue-500/40 rounded flex items-center justify-center bg-[#050505] z-0">
            <span className="text-xs font-bold text-blue-500/30">P</span>
          </div>

          {/* Voiture animée */}
          <motion.div
            className="absolute left-1/2 bg-[#050505] p-1.5 rounded-full border border-blue-500/50 text-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.5)] z-10"
            style={{ 
              top: carTop,
              x: "-50%",
              y: "-50%"
            }}
          >
            <CarFront className="w-4 h-4 md:w-5 md:h-5 rotate-180" />
          </motion.div>
        </div>
      </div>

      {/* HEADER & NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
            <CarFront className="w-6 h-6 text-blue-500" />
            <span>TechCorp<span className="text-slate-400"> Parking</span></span>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsAuthOpen(true)}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Connexion
            </button>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-200 transition-colors"
            >
              Créer un parking
            </button>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20">
        
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Gestion du parking d'entreprise & Travail Hybride
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6"
          >
            Vos collaborateurs se battent encore pour se garer le matin ?
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Fin des fichiers Excel ingérables, des places bloquées par des absents et des frictions à l'accueil. Offrez une attribution équitable et fluide à vos équipes en 2 minutes chrono.
          </motion.p>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 rounded-full text-lg font-bold transition-all shadow-[0_0_40px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_-15px_rgba(37,99,235,0.6)] flex items-center gap-2 mx-auto"
            >
              Créer le parking de votre entreprise (Gratuit)
              <ChevronRight className="w-5 h-5" />
            </button>
            <p className="mt-4 text-sm text-slate-500">
              Aucune installation • Vos employés n'ont pas d'application à télécharger
            </p>
          </motion.div>

          {/* MOCKUP (Vidéo/Démo) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-20 max-w-5xl mx-auto relative rounded-xl border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 top-1/2"></div>
            <div className="rounded-lg overflow-hidden bg-[#111] aspect-[16/9] relative flex items-center justify-center border border-white/5">
              <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                <source src="/videos/hero-demo.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la balise vidéo.
              </video>
            </div>
          </motion.div>
        </section>

        {/* MACHINE À ÉCRIRE */}
        <section className="py-24 px-6 relative mt-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-5xl text-slate-200 leading-tight font-bold">
              Soyons honnêtes, la gestion du parking est devenue un cauchemar invisible car <TypewriterText />
            </h2>
          </div>
        </section>

        {/* LA SOLUTION (Bento Grid) */}
        <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Une technologie pensée pour l'humain</h2>
            <p className="text-slate-400">Pas de friction. Pas d'injustice. Juste un parking qui fonctionne.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0A] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/30 hover:bg-[#111] hover:shadow-[0_10px_40px_-10px_rgba(37,99,235,0.15)] flex flex-col justify-between">
              <div>
                <Smartphone className="w-8 h-8 text-blue-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Lien unique, Zéro téléchargement</h3>
                <p className="text-slate-400 mb-6">
                  Friction zéro : Pas d'application sur les App Stores, pas de mot de passe à retenir. Vos équipes cliquent et réservent depuis leur navigateur.
                </p>
              </div>
              <div className="aspect-video rounded-xl bg-black border border-white/5 flex items-center justify-center overflow-hidden">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100">
                  <source src="/videos/link-booking.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0A] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/30 hover:bg-[#111] hover:shadow-[0_10px_40px_-10px_rgba(99,102,241,0.15)] flex flex-col justify-between">
              <div>
                <Scale className="w-8 h-8 text-indigo-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Algorithme d'équité absolue</h3>
                <p className="text-slate-400 mb-6">
                  Fin du favoritisme perçu : L'attribution se fait automatiquement selon VOS règles d'entreprise (distance, ancienneté, covoiturage).
                </p>
              </div>
              <div className="aspect-video rounded-xl bg-black border border-white/5 flex items-center justify-center overflow-hidden">
                <img src="/images/algorithm.png" alt="Algorithme d'équité" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0A] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/30 hover:bg-[#111] hover:shadow-[0_10px_40px_-10px_rgba(168,85,247,0.15)] flex flex-col justify-between">
              <div>
                <QrCode className="w-8 h-8 text-purple-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Validation Check-in / QR Code</h3>
                <p className="text-slate-400 mb-6">
                  Bannissement des places fantômes : Si un collaborateur ne confirme pas sa venue le matin même, sa place est instantanément libérée pour les autres.
                </p>
              </div>
              <div className="aspect-video rounded-xl bg-black border border-white/5 flex items-center justify-center overflow-hidden">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100">
                  <source src="/videos/qr-checkin.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0A] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500/30 hover:bg-[#111] hover:shadow-[0_10px_40px_-10px_rgba(16,185,129,0.15)] flex flex-col justify-between">
              <div>
                <LayoutDashboard className="w-8 h-8 text-emerald-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Vue d'ensemble en temps réel</h3>
                <p className="text-slate-400 mb-6">
                  Sérénité RH : Visualisez l'état du parking, les zones et l'historique d'occupation en un seul coup d'œil sur votre interface administrateur.
                </p>
              </div>
              <div className="aspect-video rounded-xl bg-black border border-white/5 flex items-center justify-center overflow-hidden">
                <img src="/images/dashboard-view.png" alt="Dashboard RH" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
              </div>
            </div>
          </div>
        </section>

        {/* TÉMOIGNAGES */}
        <section className="py-24 px-6 border-y border-white/5 bg-[#080808]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-16 tracking-tight">Ils ont retrouvé la paix le lundi matin</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { quote: "Mes lundis matins ne sont plus gâchés par des querelles de places. Les équipes se gèrent en autonomie totale.", author: "Julie M.", role: "Office Manager (120 salariés)" },
                { quote: "Zéro formation nécessaire. Les collaborateurs ont adopté le lien unique d'entreprise en moins de 24 heures.", author: "Marc L.", role: "Directeur RH (350 salariés)" },
                { quote: "On a réoptimisé 30% de places inoccupées sans avoir à agrandir notre parking. Un gain financier direct.", author: "Thomas B.", role: "Responsable Services Généraux" }
              ].map((testimonial, i) => (
                <div key={i} className="p-8 rounded-2xl bg-[#0D0D0D] border border-white/5 flex flex-col justify-between hover:border-white/10 transition-colors">
                  <p className="text-slate-300 italic mb-6 leading-relaxed">« {testimonial.quote} »</p>
                  <div>
                    <p className="text-white font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12 tracking-tight">Questions fréquentes</h2>
          <div className="flex flex-col gap-2">
            <FAQItem 
              question="Mon service IT va-t-il mettre des mois à valider la solution ?"
              answer="Non. L'application ne requiert aucune installation lourde sur vos serveurs. Tout fonctionne directement via le Web en quelques minutes, en mode SaaS."
            />
            <FAQItem 
              question="Comment s'assurer que les collaborateurs vont vraiment l'utiliser ?"
              answer="L'expérience est conçue sans création de compte complexe ou mot de passe à retenir. Un simple lien d'entreprise personnalisé suffit pour réserver sa place en 3 secondes."
            />
            <FAQItem 
              question="Qu'en est-il de la sécurité et du RGPD ?"
              answer="Vos données sont isolées de manière étanche par entreprise et hébergées sur une infrastructure moderne et sécurisée conforme aux normes européennes de protection des données."
            />
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-4xl mx-auto relative rounded-3xl bg-[#0A0A0A] border border-white/10 p-12 md:p-20 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/5 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Reprenez le contrôle de vos matinées dès demain.
              </h2>
              <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
                Configurez les accès de votre entreprise en moins de 3 minutes et éliminez définitivement les frictions liées au stationnement.
              </p>
              <button 
                onClick={() => setIsContactOpen(true)}
                className="bg-white text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-200 transition-all shadow-[0_0_30px_-5px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.4)]"
              >
                Tester gratuitement pour mon entreprise
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-white font-bold tracking-tight opacity-50 hover:opacity-100 transition-opacity">
            <CarFront className="w-5 h-5" />
            <span>TechCorp Parking</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Confidentialité & RGPD</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-sm text-slate-600">© 2026 TechCorp Parking. Tous droits réservés.</p>
        </div>
      </footer>

      {/* MODALES D'ACTION */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}
