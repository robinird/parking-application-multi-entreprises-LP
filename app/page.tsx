"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CarFront, 
  ChevronRight, 
  Smartphone, 
  Scale, 
  QrCode, 
  LayoutDashboard, 
  ChevronDown,
  PlayCircle
} from "lucide-react";

// --- COMPOSANTS UTILITAIRES ---

// Effet Machine à écrire pour le miroir de la douleur
const TypewriterEffect = () => {
  const scenarios = [
    "Trois cadres sont en déplacement. Leurs places réservées restent vides toute la journée, pendant que deux employés tournent 20 minutes dans la rue.",
    "« Quelqu'un libère sa place aujourd'hui ? » Votre messagerie interne est polluée par des dizaines de messages et le tableau de suivi n'est jamais à jour.",
    "Au lieu de vous concentrer sur vos vraies missions (RH, logistique), vous passez votre temps à arbitrer des conflits d'attribution."
  ];
  
  const [text, setText] = useState("");
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentScenario = scenarios[scenarioIndex];
    const typingSpeed = isDeleting ? 30 : 50; // Vitesse de frappe et d'effacement
    
    const timer = setTimeout(() => {
      if (!isDeleting && text === currentScenario) {
        setTimeout(() => setIsDeleting(true), 3000); // Pause avant d'effacer
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setScenarioIndex((prev) => (prev + 1) % scenarios.length);
      } else {
        setText(currentScenario.substring(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, scenarioIndex]);

  return (
    <div className="h-32 md:h-24 mt-6 text-xl md:text-2xl text-slate-400 font-light max-w-3xl mx-auto">
      <span className="text-white">« </span>
      {text}
      <motion.span 
        animate={{ opacity: [0, 1, 0] }} 
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-1 h-6 bg-blue-500 ml-1 align-middle"
      />
      <span className="text-white"> »</span>
    </div>
  );
};

// Composant FAQ Accordéon
const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 py-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
      <div className="flex justify-between items-center">
        <h4 className="text-lg text-white font-medium">{question}</h4>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="w-5 h-5 text-slate-400" />
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
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-300 font-sans selection:bg-blue-500/30">
      
      {/* 1. HEADER & NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
            <CarFront className="w-6 h-6 text-blue-500" />
            <span>TechCorp<span className="text-slate-400">Parking</span></span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm font-medium hover:text-white transition-colors">Connexion</a>
            <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-200 transition-colors">
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
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_-15px_rgba(37,99,235,0.7)] flex items-center gap-2 mx-auto">
              Créer le parking de votre entreprise (Gratuit)
              <ChevronRight className="w-5 h-5" />
            </button>
            <p className="mt-4 text-sm text-slate-500">
              Aucune installation • Vos employés n'ont pas d'application à télécharger
            </p>
          </motion.div>

          {/* MOCKUP VIDEO / IMAGE */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 max-w-5xl mx-auto relative rounded-xl border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10 top-1/2"></div>
            <div className="rounded-lg overflow-hidden bg-[#111] aspect-video relative flex items-center justify-center border border-white/5">
              {/* Fallback si la vidéo ne charge pas */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d]">
                 <PlayCircle className="w-16 h-16 mb-4 opacity-20" />
                 <p className="text-sm font-medium">Démo Interactive : Réservation en 1 clic</p>
              </div>
              {/* Vidéo Pomelli : "/videos/hero-demo.mp4" */}
              <video autoPlay loop muted playsInline className="relative z-1 w-full h-full object-cover opacity-90">
                <source src="/videos/hero-demo.mp4" type="video/mp4" />
              </video>
            </div>
          </motion.div>
        </section>

        {/* 2. LE MIROIR DE LA DOULEUR */}
        <section className="py-32 px-6 border-t border-white/5 mt-16 bg-gradient-to-b from-transparent to-blue-950/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
              Soyons honnêtes, la gestion du parking est devenue un cauchemar invisible car...
            </h2>
            <TypewriterEffect />
          </div>
        </section>

        {/* 3. LA BASCULE */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl p-1 bg-gradient-to-r from-blue-500/30 via-indigo-500/30 to-purple-500/30">
              <div className="bg-[#0f0f0f] rounded-xl p-8 md:p-12 text-center backdrop-blur-xl">
                <p className="text-xl md:text-2xl text-slate-200 leading-relaxed font-medium">
                  « Le problème n'est pas le manque de places. Le problème, c'est que votre système actuel manque de souplesse et de transparence. <span className="text-white font-bold">Tant que la libération d'une place demande un effort, personne ne le fera.</span> »
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. LA SOLUTION (Grille Bento) */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Une technologie pensée pour l'humain</h2>
            <p className="text-slate-400">Pas de friction. Pas d'injustice. Juste un parking qui fonctionne.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Carte 1 */}
            <div className="group rounded-2xl border border-white/10 bg-[#111] p-8 hover:bg-[#151515] transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <Smartphone className="w-8 h-8 text-blue-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-2">Lien unique, Zéro téléchargement</h3>
              <p className="text-slate-400 mb-6">Friction zéro : Pas d'application sur les App Stores, pas de mot de passe à retenir. Vos équipes cliquent et réservent depuis leur navigateur.</p>
              <div className="aspect-video rounded-lg bg-black/50 border border-white/5 flex items-center justify-center relative overflow-hidden">
                <p className="text-xs text-slate-600 z-10 relative">Espace Média (Lien web)</p>
                {/* <video autoPlay loop muted src="/videos/link-booking.mp4" className="absolute inset-0 w-full h-full object-cover opacity-50" /> */}
              </div>
            </div>

            {/* Carte 2 */}
            <div className="group rounded-2xl border border-white/10 bg-[#111] p-8 hover:bg-[#151515] transition-colors relative overflow-hidden">
              <Scale className="w-8 h-8 text-indigo-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-2">Algorithme d'équité absolue</h3>
              <p className="text-slate-400 mb-6">Fin du favoritisme perçu : L'attribution se fait automatiquement selon VOS règles d'entreprise (distance, ancienneté, covoiturage).</p>
              <div className="aspect-video rounded-lg bg-black/50 border border-white/5 flex items-center justify-center relative overflow-hidden">
                <p className="text-xs text-slate-600 z-10 relative">Espace Média (Animation attribution)</p>
              </div>
            </div>

            {/* Carte 3 */}
            <div className="group rounded-2xl border border-white/10 bg-[#111] p-8 hover:bg-[#151515] transition-colors relative overflow-hidden">
              <QrCode className="w-8 h-8 text-purple-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-2">Validation Check-in / QR Code</h3>
              <p className="text-slate-400 mb-6">Bannissement des places fantômes : Si un collaborateur ne confirme pas sa venue le matin même, sa place est instantanément libérée pour les autres.</p>
              <div className="aspect-video rounded-lg bg-black/50 border border-white/5 flex items-center justify-center relative overflow-hidden">
                <p className="text-xs text-slate-600 z-10 relative">Espace Média (Scan QR)</p>
              </div>
            </div>

            {/* Carte 4 */}
            <div className="group rounded-2xl border border-white/10 bg-[#111] p-8 hover:bg-[#151515] transition-colors relative overflow-hidden">
              <LayoutDashboard className="w-8 h-8 text-emerald-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-2">Vue d'ensemble en temps réel</h3>
              <p className="text-slate-400 mb-6">Sérénité RH : Visualisez l'état du parking, les zones et l'historique d'occupation en un seul coup d'œil sur votre interface administrateur.</p>
              <div className="aspect-video rounded-lg bg-black/50 border border-white/5 flex items-center justify-center relative overflow-hidden">
                <p className="text-xs text-slate-600 z-10 relative">Espace Média (Dashboard admin)</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. TÉMOIGNAGES */}
        <section className="py-24 px-6 border-y border-white/5 bg-[#0D0D0D]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-16 tracking-tight">Ils ont retrouvé la paix le lundi matin</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "Mes lundis matins ne sont plus gâchés par des querelles de places. Les équipes se gèrent en autonomie totale.",
                  author: "Julie M.",
                  role: "Office Manager (120 salariés)"
                },
                {
                  quote: "Zéro formation nécessaire. Les collaborateurs ont adopté le lien unique d'entreprise en moins de 24 heures.",
                  author: "Marc L.",
                  role: "Directeur RH (350 salariés)"
                },
                {
                  quote: "On a réoptimisé 30% de places inoccupées sans avoir à agrandir notre parking. Un gain financier direct.",
                  author: "Thomas B.",
                  role: "Responsable Services Généraux"
                }
              ].map((testimonial, i) => (
                <div key={i} className="p-8 rounded-2xl bg-black border border-white/10 flex flex-col justify-between">
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

        {/* 6. FAQ */}
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

        {/* 7. CTA FINAL */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-blue-900/40 to-black border border-blue-500/20 p-12 md:p-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Reprenez le contrôle de vos matinées dès demain.
            </h2>
            <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
              Configurez les accès de votre entreprise en moins de 3 minutes et éliminez définitivement les frictions liées au stationnement.
            </p>
            <button className="bg-white text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-200 transition-all shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]">
              Tester gratuitement pour mon entreprise
            </button>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12 px-6">
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
          <p className="text-sm text-slate-600">© 2024 TechCorp Parking. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
