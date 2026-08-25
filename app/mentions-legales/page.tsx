import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans px-6 py-12 max-w-4xl mx-auto">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-sm text-blue-400 hover:underline mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
      </Link>

      <h1 className="text-3xl font-bold text-white mb-6">Mentions Légales & Politique de Confidentialité</h1>
      <p className="text-xs text-slate-500 mb-8">Dernière mise à jour : 25 août 2026</p>

      <section className="space-y-6 text-sm leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">1. Mentions Légales</h2>
          <p className="mb-2">En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN) :</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li><strong>Projet :</strong> TechCorp Parking (Pré-lancement)</li>
            <li><strong>Éditeur :</strong> Robin (Édition à titre individuel et non professionnel)</li>
            <li><strong>Contact :</strong> contact.techcorpparking@gmail.com</li>
            <li><strong>Hébergeur :</strong> Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis (https://vercel.com)</li>
          </ul>
        </div>

        <hr className="border-white/10 my-6" />

        <div>
          <h2 className="text-xl font-semibold text-white mb-3">2. Politique de Confidentialité & RGPD</h2>
          <p className="text-slate-400 mb-3">
            Les informations recueillies via les formulaires du site sont destinées exclusivement à l'évaluation du projet et à la prise de contact pour des démonstrations.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li><strong>Durée de conservation :</strong> 3 ans maximum.</li>
            <li><strong>Destinataires :</strong> Usage interne strictement confidentiel, aucune revente de données.</li>
            <li><strong>Vos droits :</strong> Vous pouvez demander l'accès, la modification ou la suppression de vos données à tout moment via l'email de contact.</li>
            <li><strong>Cookies :</strong> Aucun cookie publicitaire ou traceur nécessitant votre consentement n'est utilisé.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
