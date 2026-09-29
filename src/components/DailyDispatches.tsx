import React from 'react';
import { ArchivalDispatch, Artifact } from '../data/artifacts';
import { Compass, Calendar, ArrowRight, ShieldCheck, Layers, Sparkles } from 'lucide-react';

interface DailyDispatchesProps {
  dispatches: ArchivalDispatch[];
  artifacts: Artifact[];
  onOpenArtifact: (art: Artifact) => void;
  onOpenMultispectral: (art: Artifact) => void;
}

export const DailyDispatches: React.FC<DailyDispatchesProps> = ({
  dispatches,
  artifacts,
  onOpenArtifact,
  onOpenMultispectral,
}) => {
  return (
    <div className="w-full py-8 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="mb-8 border-b border-[#292523] pb-6">
        <div className="text-xs uppercase tracking-widest font-sans-clean text-[#a89f91] mb-2 flex items-center gap-2">
          <span>Field Epigraphy & Laboratory Reports</span>
          <span aria-hidden="true">·</span>
          <span>Daily Discoveries</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#d89759]">Updated Daily</span>
        </div>
        <h1 className="text-3xl lg:text-5xl font-cinzel font-medium text-[#f5f2eb] tracking-tight">
          Archival Daily Dispatches
        </h1>
        <p className="mt-3 text-[#a8a29e] font-editorial text-lg max-w-3xl leading-relaxed">
          Daily dispatches from excavations, multi-spectral imaging laboratories, and non-destructive material spectrometry worldwide. 
          Unvarnished primary data before secondary historical filtration.
        </p>
      </div>

      {/* Dispatches Feed */}
      <div className="space-y-6">
        {dispatches.map((dispatch) => {
          const linkedArtifact = artifacts.find((a) => a.id === dispatch.artifactIdLink);

          return (
            <article
              key={dispatch.id}
              className="bg-[#181614] border border-[#2d2926] hover:border-[#8c6742] transition-colors p-6 lg:p-8 rounded-sm"
            >
              {/* Unboxed Metadata row */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#a89f91] font-sans-clean mb-3">
                <span className="text-[#e8b584] font-medium flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {dispatch.datePublished}
                </span>
                <span aria-hidden="true">·</span>
                <span>{dispatch.classification}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#cfc6b8]">{dispatch.archaeologicalSite}</span>
              </div>

              <h2 className="text-xl lg:text-2xl font-cinzel font-semibold text-[#f5f2eb]">
                {dispatch.headline}
              </h2>

              <p className="mt-3 text-[#cfc5b8] font-editorial text-base leading-relaxed">
                {dispatch.primarySummary}
              </p>

              {/* Discovery Technical Details Box */}
              <div className="mt-4 p-4 bg-[#141210] border border-[#2b2724] rounded-xs text-xs font-editorial text-[#b8afa3] space-y-2 leading-relaxed">
                <div>
                  <strong className="text-[#f5f2eb] font-sans-clean uppercase tracking-wider text-[11px] block mb-1">
                    Laboratory & Excavation Record:
                  </strong>
                  {dispatch.objectiveDiscoveryDetails}
                </div>
              </div>

              {/* Non-biased takeaway */}
              <div className="mt-4 p-3.5 bg-[#201c18] border-l-2 border-[#8c6742] text-xs font-sans-clean text-[#cfc6b8]">
                <span className="text-[#e8b584] font-semibold uppercase text-[10px] tracking-wider block mb-0.5">
                  Scholarly Significance:
                </span>
                {dispatch.unvarnishedTakeaway}
              </div>

              {/* Action Bar */}
              {linkedArtifact && (
                <div className="mt-5 pt-4 border-t border-[#26221f] flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-[#8c827a] font-sans-clean">
                    Primary Source In Archive: <span className="text-[#f5f2eb] font-medium">{linkedArtifact.title}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenArtifact(linkedArtifact)}
                      className="px-3 py-1.5 bg-[#24201d] hover:bg-[#2e2a26] text-[#f5f2eb] text-xs font-sans-clean rounded-xs transition-colors cursor-pointer"
                    >
                      Read Full Dossier
                    </button>
                    <button
                      onClick={() => onOpenMultispectral(linkedArtifact)}
                      className="px-3 py-1.5 bg-[#e4be92] hover:bg-[#eed0ad] text-[#141210] text-xs font-sans-clean font-semibold rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      Inspect High-Res Scan
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};
