import React, { useState, useMemo } from 'react';
import { Artifact, TIMELINE_EPOCHS } from '../data/artifacts';
import { Search, Filter, Layers, BookOpen, Scale, ArrowUpRight } from 'lucide-react';

interface ArchiveCatalogProps {
  artifacts: Artifact[];
  onOpenArtifact: (art: Artifact) => void;
  onOpenMultispectral: (art: Artifact) => void;
}

export const ArchiveCatalog: React.FC<ArchiveCatalogProps> = ({
  artifacts,
  onOpenArtifact,
  onOpenMultispectral,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEpoch, setSelectedEpoch] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filtered = useMemo(() => {
    return artifacts.filter((art) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        art.title.toLowerCase().includes(q) ||
        art.culture.toLowerCase().includes(q) ||
        art.geographicOrigin.toLowerCase().includes(q) ||
        art.scriptClassification.toLowerCase().includes(q) ||
        art.physicalRecord.toLowerCase().includes(q) ||
        art.accessionCode.toLowerCase().includes(q);

      const matchesEpoch = selectedEpoch === 'all' || art.epochKey === selectedEpoch;
      const matchesStatus = selectedStatus === 'all' || art.deciphermentStatus === selectedStatus;

      return matchesSearch && matchesEpoch && matchesStatus;
    });
  }, [artifacts, searchQuery, selectedEpoch, selectedStatus]);

  return (
    <div className="w-full py-8 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="mb-8 border-b border-[#292523] pb-6">
        <div className="text-xs uppercase tracking-widest font-sans-clean text-[#a89f91] mb-2 flex items-center gap-2">
          <span>Complete Curatorial Registry</span>
          <span aria-hidden="true">·</span>
          <span>Primary Physical Sources</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#d89759]">Zero Imperial Revisionism</span>
        </div>
        <h1 className="text-3xl lg:text-5xl font-cinzel font-medium text-[#f5f2eb] tracking-tight">
          Primary Source Archive
        </h1>
        <p className="mt-3 text-[#a8a29e] font-editorial text-lg max-w-3xl leading-relaxed">
          The unvarnished repository of humanity's earliest scripts, accounting matrices, and monumental pictograms. 
          Every accession record provides original excavation stratigraphy, material spectrometry, and unedited epigraphy.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#181614] border border-[#2b2724] p-4 rounded-sm mb-8 space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#7d756d]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by culture, accession code, script type, or material matrix..."
            className="w-full bg-[#121110] border border-[#332f2b] text-[#f5f2eb] pl-9 pr-4 py-2 text-xs rounded-xs focus:outline-none focus:border-[#e8b584]"
          />
        </div>

        {/* Filter dropdowns */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-sans-clean">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[#7d756d]">Epoch:</span>
              <select
                value={selectedEpoch}
                onChange={(e) => setSelectedEpoch(e.target.value)}
                className="bg-[#121110] border border-[#332f2b] text-[#d4cbbe] py-1 px-2.5 rounded-xs focus:outline-none focus:border-[#e8b584]"
              >
                <option value="all">All Epochs (80k–500 BCE)</option>
                {TIMELINE_EPOCHS.map((ep) => (
                  <option key={ep.id} value={ep.id}>
                    {ep.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[#7d756d]">Decipherment:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-[#121110] border border-[#332f2b] text-[#d4cbbe] py-1 px-2.5 rounded-xs focus:outline-none focus:border-[#e8b584]"
              >
                <option value="all">All Decipherment Statuses</option>
                <option value="Fully Undeciphered">Fully Undeciphered</option>
                <option value="Pre-Script Symbolic System">Pre-Script Symbolic System</option>
                <option value="Partially Deciphered (Metrology Only)">Partially Deciphered (Metrology Only)</option>
              </select>
            </div>
          </div>

          <div className="text-[#8c827a] font-code text-[11px]">
            Showing {filtered.length} of {artifacts.length} primary documents
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((art) => (
          <div
            key={art.id}
            className="bg-[#181614] border border-[#2b2724] hover:border-[#8c6742] transition-colors rounded-sm overflow-hidden flex flex-col group"
          >
            {/* Image */}
            <div className="h-56 relative bg-[#121110] overflow-hidden">
              <img
                src={art.image}
                alt={art.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#121110]/90 px-2 py-0.5 text-[10px] font-code text-[#e8b584] border border-[#38332c]">
                {art.dateDisplay}
              </div>
              <div className="absolute top-3 right-3 bg-[#121110]/90 px-2 py-0.5 text-[10px] font-code text-[#a8a29e] border border-[#38332c]">
                {art.accessionCode}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-sans-clean text-[#8c827a] uppercase tracking-wider mb-1">
                  {art.culture} · {art.geographicOrigin}
                </div>
                <h3 className="font-cinzel text-lg font-semibold text-[#f5f2eb] group-hover:text-[#e8b584] transition-colors">
                  {art.title}
                </h3>
                <p className="mt-2 text-xs font-editorial text-[#a8a29e] line-clamp-3 leading-relaxed">
                  {art.physicalRecord}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-[#23201d] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] uppercase font-sans-clean text-[#7d756d]">Status</span>
                  <span className="text-[11px] font-medium text-[#e8b584]">{art.deciphermentStatus}</span>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    onClick={() => onOpenArtifact(art)}
                    className="text-[#a89f91] hover:text-[#f5f2eb] font-sans-clean underline flex items-center gap-1"
                  >
                    Archaeological Dossier
                  </button>
                  <button
                    onClick={() => onOpenMultispectral(art)}
                    className="px-3 py-1 bg-[#26221f] hover:bg-[#e4be92] hover:text-[#141210] text-[#e8b584] text-xs font-sans-clean rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    Multispectral Scan
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
