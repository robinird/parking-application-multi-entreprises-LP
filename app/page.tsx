"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CarFront, 
  ChevronRight, 
  Smartphone, 
  Scale, 
  QrCode, 
  LayoutDashboard, 
  ChevronDown,
  PlayCircle,
  Ghost,
  FileSpreadsheet,
  ShieldAlert
} from "lucide-react";

// --- COMPOSANTS UTILITAIRES ---

// Composant FAQ Accordéon
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
  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-blue-500/30">
      
      {/* 1. HEADER & NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
            <CarFront className="w-6 h-6 text-blue-500" />
            <span>Park<span className="text-slate-400">Flow</span></span>
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
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold tracking-wide uppercase mb-8"
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
            <button className="bg-white text-black hover:bg-slate-200 px-8 py-4 rounded-full text-lg font-bold transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] flex items-center gap-2 mx-auto">
              Créer le parking de votre entreprise (Gratuit)
              <ChevronRight className="w-5 h-5" />
            </button>
            <p className="mt-4 text-sm text-slate-500">
              Aucune installation • Vos employés n'ont pas d'application à télécharger
            </p>
          </motion.div>

          {/* MOCKUP (Image/Video) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-20 max-w-5xl mx-auto relative rounded-xl border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 top-1/2"></div>
            <div className="rounded-lg overflow-hidden bg-[#111] aspect-[16/9] relative flex items-center justify-center border border-white/5">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 bg-[#0A0A0A]">
                 <PlayCircle className="w-16 h-16 mb-4 opacity-20" />
                 <p className="text-sm font-medium">Démo Interactive : Réservation en 1 clic</p>
                 <p className="text-xs mt-2 opacity-50">(Espace vidéo Hero)</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 2. LA BASCULE (Le changement de paradigme) */}
        <section className="py-20 px-6 mt-12 relative">
          {/* Effet de lueur en fond */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-2xl md:text-4xl text-slate-200 leading-relaxed font-light">
              « Le problème n'est pas le manque de places. Le problème, c'est que votre système actuel manque de souplesse et de transparence. <span className="text-white font-bold block mt-4">Tant que la libération d'une place demande un effort, personne ne le fera.</span> »
            </h2>
          </div>
        </section>

        {/* 3. LE MIROIR DE LA DOULEUR (Émotion et besoin) */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16 tracking-tight">
              Soyons honnêtes, la gestion du parking est devenue un cauchemar invisible...
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Douleur 1 */}
              <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 hover:bg-[#111] transition-colors">
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Ghost className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Le syndrome du "Parking Fantôme"</h3>
                <p className="text-slate-400 leading-relaxed">
                  Trois cadres sont en déplacement ou en télétravail. Leurs places réservées restent vides toute la journée, pendant que deux employés tournent 20 minutes dans la rue.
                </p>
              </div>

              {/* Douleur 2 */}
              <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 hover:bg-[#111] transition-colors">
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6">
                  <FileSpreadsheet className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">L'enfer du fichier Excel</h3>
                <p className="text-slate-400 leading-relaxed">
                  « Quelqu'un libère sa place aujourd'hui ? » Votre messagerie interne est polluée par des dizaines de messages et votre tableau de suivi n'est jamais à jour.
                </p>
              </div>

              {/* Douleur 3 */}
              <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 hover:bg-[#111] transition-colors">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-6">
                  <ShieldAlert className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Vous êtes devenu le policier</h3>
                <p className="text-slate-400 leading-relaxed">
                  Au lieu de vous concentrer sur vos vraies missions (RH, logistique, bien-être), vous passez votre temps à arbitrer des conflits d'attribution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. LA SOLUTION (Grille Bento avec Hover Animations) */}
        <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5 mt-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Une technologie pensée pour l'humain</h2>
            <p className="text-slate-400">Pas de friction. Pas d'injustice. Juste un parking qui fonctionne.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Carte 1 : Lien unique */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0A] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/30 hover:bg-[#111] hover:shadow-[0_10px_40px_-10px_rgba(37,99,235,0.15)] flex flex-col justify-between">
              <div>
                <Smartphone className="w-8 h-8 text-blue-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Lien unique, Zéro téléchargement</h3>
                <p className="text-slate-400 mb-6">
                  Friction zéro : Pas d'application sur les App Stores, pas de mot de passe à retenir. Vos équipes cliquent et réservent depuis leur navigateur.
                </p>
              </div>
              <div className="aspect-video rounded-xl bg-[#151515] border border-white/5 flex items-center justify-center overflow-hidden">
                <p className="text-xs text-slate-600 transition-transform duration-700 group-hover:scale-105">Espace Média (Lien web)</p>
              </div>
            </div>

            {/* Carte 2 : Algorithme */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0A] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/30 hover:bg-[#111] hover:shadow-[0_10px_40px_-10px_rgba(99,102,241,0.15)] flex flex-col justify-between">
              <div>
                <Scale className="w-8 h-8 text-indigo-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Algorithme d'équité absolue</h3>
                <p className="text-slate-400 mb-6">
                  Fin du favoritisme perçu : L'attribution se fait automatiquement selon VOS règles d'entreprise (distance, ancienneté, covoiturage).
                </p>
              </div>
              <div className="aspect-video rounded-xl bg-[#151515] border border-white/5 flex items-center justify-center overflow-hidden">
                <p className="text-xs text-slate-600 transition-transform duration-700 group-hover:scale-105">Espace Média (Animation attribution)</p>
              </div>
            </div>

            {/* Carte 3 : QR Code Check-in (Avec ta vidéo intégrée) */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0A] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/30 hover:bg-[#111] hover:shadow-[0_10px_40px_-10px_rgba(168,85,247,0.15)] flex flex-col justify-between">
              <div>
                <QrCode className="w-8 h-8 text-purple-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Validation Check-in / QR Code</h3>
                <p className="text-slate-400 mb-6">
                  Bannissement des places fantômes : Si un collaborateur ne confirme pas sa venue le matin même, sa place est instantanément libérée pour les autres.
                </p>
              </div>
              <div className="aspect-video rounded-xl bg-black border border-white/5 flex items-center justify-center overflow-hidden">
                {/* Vidéo intégrée ici */}
                <video 
                  autoPlay loop muted playsInline 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                >
                  <source src="/videos/qr-checkin.mp4" type="video/mp4" />
                  Votre navigateur ne supporte pas la balise vidéo.
                </video>
              </div>
            </div>

            {/* Carte 4 : Dashboard (Avec ton image intégrée) */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0A] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500/30 hover:bg-[#111] hover:shadow-[0_10px_40px_-10px_rgba(16,185,129,0.15)] flex flex-col justify-between">
              <div>
                <LayoutDashboard className="w-8 h-8 text-emerald-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Vue d'ensemble en temps réel</h3>
                <p className="text-slate-400 mb-6">
                  Sérénité RH : Visualisez l'état du parking, les zones et l'historique d'occupation en un seul coup d'œil sur votre interface administrateur.
                </p>
              </div>
              <div className="aspect-video rounded-xl bg-black border border-white/5 flex items-center justify-center overflow-hidden">
                {/* Image intégrée ici */}
                <img 
                  src="/images/dashboard-view.png" 
                  alt="Aperçu du Dashboard RH" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
              </div>
            </div>

          </div>
        </section>

        {/* 5. TÉMOIGNAGES */}
        <section className="py-24 px-6 border-y border-white/5 bg-[#080808]">
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

        {/* 7. CTA FINAL (Design épuré et premium) */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-4xl mx-auto relative rounded-3xl bg-[#0A0A0A] border border-white/10 p-12 md:p-20 overflow-hidden">
            {/* Effet de lueur subtil au centre haut */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/5 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Reprenez le contrôle de vos matinées dès demain.
              </h2>
              <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
                Configurez les accès de votre entreprise en moins de 3 minutes et éliminez définitivement les frictions liées au stationnement.
              </p>
              <button className="bg-white text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-200 transition-all shadow-[0_0_30px_-5px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.4)]">
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
            <span>ParkFlow</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Confidentialité & RGPD</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-sm text-slate-600">© 2024 ParkFlow. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
