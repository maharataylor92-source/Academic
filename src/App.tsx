/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ARTIFACTS_DATA, 
  DAILY_ARCHIVAL_DISPATCHES, 
  Artifact 
} from './data/artifacts';
import { Header } from './components/Header';
import { TimelineViewer } from './components/TimelineViewer';
import { MultispectralViewer } from './components/MultispectralViewer';
import { ArchiveCatalog } from './components/ArchiveCatalog';
import { DailyDispatches } from './components/DailyDispatches';
import { CurriculumRecommender } from './components/CurriculumRecommender';
import { ScholarlyCollab } from './components/ScholarlyCollab';
import { EthiopianCanonViewer } from './components/EthiopianCanonViewer';
import { ManuscriptsViewer } from './components/ManuscriptsViewer';
import { DebiasedAnalysisModal } from './components/DebiasedAnalysisModal';
import { ShieldCheck, BookOpen, Layers, Compass, Sparkles, Scale, Scroll } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'timeline' | 'multispectral' | 'manuscripts' | 'ethiopian-canon' | 'archive' | 'dispatches' | 'recommendations' | 'collaborate'
  >('timeline');

  // Currently focused artifact for multispectral viewer
  const [inspectedArtifact, setInspectedArtifact] = useState<Artifact>(ARTIFACTS_DATA[0]);

  // Modal for full archaeological dossier & AI epigraphic decipherer
  const [dossierArtifact, setDossierArtifact] = useState<Artifact | null>(null);

  const handleOpenMultispectral = (art: Artifact) => {
    setInspectedArtifact(art);
    setActiveTab('multispectral');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDossier = (art: Artifact) => {
    setDossierArtifact(art);
  };

  return (
    <div className="min-h-screen bg-[#121110] text-[#e8e4dc] flex flex-col font-sans-clean antialiased selection:bg-[#c27847]/30 selection:text-[#f8f5ee]">
      {/* Universal Top Bar */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'timeline' && (
          <TimelineViewer
            artifacts={ARTIFACTS_DATA}
            onSelectArtifact={handleOpenDossier}
            onOpenMultispectral={handleOpenMultispectral}
          />
        )}

        {activeTab === 'multispectral' && (
          <MultispectralViewer
            artifact={inspectedArtifact}
            allArtifacts={ARTIFACTS_DATA}
            onSelectArtifact={setInspectedArtifact}
            onOpenDossier={handleOpenDossier}
          />
        )}

        {activeTab === 'manuscripts' && (
          <ManuscriptsViewer
            artifacts={ARTIFACTS_DATA}
            onOpenArtifact={handleOpenDossier}
            onOpenMultispectral={handleOpenMultispectral}
          />
        )}

        {activeTab === 'ethiopian-canon' && (
          <EthiopianCanonViewer
            artifacts={ARTIFACTS_DATA}
            onOpenArtifact={handleOpenDossier}
            onOpenMultispectral={handleOpenMultispectral}
          />
        )}

        {activeTab === 'archive' && (
          <ArchiveCatalog
            artifacts={ARTIFACTS_DATA}
            onOpenArtifact={handleOpenDossier}
            onOpenMultispectral={handleOpenMultispectral}
          />
        )}

        {activeTab === 'dispatches' && (
          <DailyDispatches
            dispatches={DAILY_ARCHIVAL_DISPATCHES}
            artifacts={ARTIFACTS_DATA}
            onOpenArtifact={handleOpenDossier}
            onOpenMultispectral={handleOpenMultispectral}
          />
        )}

        {activeTab === 'recommendations' && (
          <CurriculumRecommender
            artifacts={ARTIFACTS_DATA}
            onOpenArtifact={handleOpenDossier}
            onOpenMultispectral={handleOpenMultispectral}
          />
        )}

        {activeTab === 'collaborate' && (
          <ScholarlyCollab
            artifacts={ARTIFACTS_DATA}
            onOpenArtifact={handleOpenDossier}
            onOpenMultispectral={handleOpenMultispectral}
          />
        )}
      </main>

      {/* Deep Dossier & Epigraphic AI Modal */}
      {dossierArtifact && (
        <DebiasedAnalysisModal
          artifact={dossierArtifact}
          onClose={() => setDossierArtifact(null)}
          onOpenMultispectral={handleOpenMultispectral}
        />
      )}

      {/* Curatorial Institutional Footer */}
      <footer className="border-t border-[#26221f] bg-[#0e0d0c] py-12 px-6 lg:px-8 text-xs text-[#8c827a] font-sans-clean">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-3">
            <span className="text-base font-cinzel font-bold text-[#f5f2eb] tracking-widest block">
              ARCHAICA PRIMARY REPOSITORY
            </span>
            <p className="font-editorial text-sm text-[#b8afa3] leading-relaxed max-w-lg">
              Dedicated to the preservation and unbiased epigraphic study of humanity’s earliest untranslated scripts, 
              symbolic markings, and accounting tablets prior to imperial or monarchical retrospective bias.
            </p>
            <div className="text-[11px] text-[#786f66] flex items-center gap-2 pt-1">
              <Scale className="w-3.5 h-3.5 text-[#e8b584]" />
              <span>Strict Open-Access Primary Source Epigraphy · Non-Ideological Protocol</span>
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-[#cfc6b8] block mb-3 font-cinzel">
              Curatorial Navigation
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('timeline');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#e8b584] transition-colors"
                >
                  Chronological Timeline
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('multispectral');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#e8b584] transition-colors"
                >
                  Multispectral Laboratory
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('manuscripts');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#e8b584] transition-colors"
                >
                  Complete Manuscripts & Pure Sources
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('ethiopian-canon');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#e8b584] transition-colors"
                >
                  Ethiopian 81-Book Bible
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('archive');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#e8b584] transition-colors"
                >
                  Primary Catalog Registry
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('dispatches');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#e8b584] transition-colors"
                >
                  Archival Daily Dispatches
                </button>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-[#cfc6b8] block mb-3 font-cinzel">
              Scientific Standards
            </span>
            <ul className="space-y-2 text-xs text-[#a8a29e]">
              <li>Reflectance Transformation Imaging (RTI)</li>
              <li>Micro-wear Optical Profilometry</li>
              <li>Optically Stimulated Luminescence (OSL)</li>
              <li>Positional N-Gram Statistical Corpora</li>
              <li>Decentralized Peer Epigraphic Consensus</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-[#1f1b18] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6b635a]">
          <div>
            Archaica Academic Archive © 2026. Primary source texts in public domain under open archaeological access.
          </div>
          <div className="flex items-center gap-4">
            <span>Stratigraphy Verified</span>
            <span aria-hidden="true">·</span>
            <span>Unbiased Primary Epigraphy</span>
            <span aria-hidden="true">·</span>
            <span>Museum Macro Laboratory</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
