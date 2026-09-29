import React, { useState, useMemo, useRef } from 'react';
import { 
  Artifact, 
  TIMELINE_EPOCHS 
} from '../data/artifacts';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Layers, 
  Filter, 
  Calendar, 
  Eye, 
  Compass, 
  ChevronRight,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface TimelineViewerProps {
  artifacts: Artifact[];
  onSelectArtifact: (artifact: Artifact) => void;
  onOpenMultispectral: (artifact: Artifact) => void;
}

export const TimelineViewer: React.FC<TimelineViewerProps> = ({
  artifacts,
  onSelectArtifact,
  onOpenMultispectral,
}) => {
  // Epoch filter state
  const [selectedEpoch, setSelectedEpoch] = useState<string>('all');
  // Zoom state: 1 (macro deep time), 2 (millennia), 4 (micro civilizational dawn)
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  // View mode
  const [viewMode, setViewMode] = useState<'rail' | 'cards'>('rail');
  // Decipherment filter
  const [statusFilter, setStatusFilter] = useState<string>('all');
  // Selected timeline item
  const [activeArtifactId, setActiveArtifactId] = useState<string>(artifacts[0]?.id || '');

  const timelineTrackRef = useRef<HTMLDivElement>(null);

  // Filtered artifacts
  const filteredArtifacts = useMemo(() => {
    return artifacts
      .filter((art) => {
        const matchesEpoch = selectedEpoch === 'all' || art.epochKey === selectedEpoch;
        const matchesStatus = statusFilter === 'all' || art.deciphermentStatus === statusFilter;
        return matchesEpoch && matchesStatus;
      })
      .sort((a, b) => a.approxDate - b.approxDate); // strictly chronological from oldest to newest
  }, [artifacts, selectedEpoch, statusFilter]);

  const activeArtifact = useMemo(() => {
    return artifacts.find((a) => a.id === activeArtifactId) || filteredArtifacts[0] || artifacts[0];
  }, [artifacts, activeArtifactId, filteredArtifacts]);

  // Zoom handlers
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 1, 4));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 1, 1));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setSelectedEpoch('all');
    setStatusFilter('all');
  };

  // Chronological position calculator (piecewise scale mapping BCE to CE)
  const calculatePositionPercent = (dateYear: number): number => {
    // -80000 to -10000 takes 0% to 22%
    // -10000 to -4000 takes 22% to 42%
    // -4000 to -2000 takes 42% to 62%
    // -2000 to 0 takes 62% to 80%
    // 0 to 1000 CE takes 80% to 98%
    if (dateYear <= -10000) {
      const ratio = (dateYear - (-80000)) / ((-10000) - (-80000));
      return Math.max(2, Math.min(22, 2 + ratio * 20));
    } else if (dateYear <= -4000) {
      const ratio = (dateYear - (-10000)) / ((-4000) - (-10000));
      return 22 + ratio * 20;
    } else if (dateYear <= -2000) {
      const ratio = (dateYear - (-4000)) / ((-2000) - (-4000));
      return 42 + ratio * 20;
    } else if (dateYear <= 0) {
      const ratio = (dateYear - (-2000)) / (0 - (-2000));
      return 62 + ratio * 18;
    } else {
      const ratio = dateYear / 1000;
      return 80 + Math.min(18, ratio * 18);
    }
  };

  const epochMarks = [
    { label: '80,000 BCE', pos: 2, note: 'Paleolithic Inception' },
    { label: '10,000 BCE', pos: 22, note: 'Göbekli Tepe PPNA' },
    { label: '5,300 BCE', pos: 38, note: 'Vinča & Dispilio' },
    { label: '3,350 BCE', pos: 48, note: 'Uruk IV & Proto-Elamite' },
    { label: '2,600 BCE', pos: 56, note: 'Indus Valley Script' },
    { label: '1,700 BCE', pos: 65, note: 'Phaistos Minoan Disc' },
    { label: '900 BCE', pos: 72, note: 'Cascajal Olmec Block' },
    { label: '150 BCE', pos: 79, note: 'Dead Sea & Enoch/Jubilees' },
    { label: '450 CE', pos: 88, note: 'Ethiopian Garima Gospels' },
    { label: '868 CE', pos: 96, note: 'Dunhuang Diamond Sutra' },
  ];

  return (
    <div className="w-full py-8 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="mb-8 border-b border-[#292523] pb-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest font-sans-clean text-[#a89f91] mb-2 flex items-center gap-2">
              <span>Primary Source Chronology</span>
              <span aria-hidden="true">·</span>
              <span>80,000 BCE — 900 CE</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#d89759]">Pure & Unvarnished</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-cinzel font-medium text-[#f5f2eb] tracking-tight">
              The Ancient Timeline
            </h1>
            <p className="mt-3 text-[#a8a29e] font-editorial text-lg max-w-3xl leading-relaxed">
              Explore humanity’s very first inscribed marks and untranslated primary documents in pure chronological sequence. 
              Stripped of imperial retrofitting, religious rewrites, and victor’s revisionism.
            </p>
          </div>

          {/* View Mode & Reset Controls */}
          <div className="flex items-center gap-2 self-start lg:self-auto bg-[#1a1816] p-1.5 border border-[#2d2926] rounded-sm">
            <button
              onClick={() => setViewMode('rail')}
              className={`px-3 py-1.5 text-xs font-sans-clean font-medium rounded-xs transition-colors ${
                viewMode === 'rail'
                  ? 'bg-[#2a2622] text-[#f5f2eb] shadow-sm'
                  : 'text-[#8c827a] hover:text-[#e8e4dc]'
              }`}
            >
              Calibrated Rail
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 text-xs font-sans-clean font-medium rounded-xs transition-colors ${
                viewMode === 'cards'
                  ? 'bg-[#2a2622] text-[#f5f2eb] shadow-sm'
                  : 'text-[#8c827a] hover:text-[#e8e4dc]'
              }`}
            >
              Curatorial Index
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Time Period & Epoch Filter Controls */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 bg-[#181614] border border-[#2b2724] p-4 rounded-sm">
        {/* Epoch Selector Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          <span className="text-xs uppercase tracking-wider text-[#7d756d] font-sans-clean mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Epoch:
          </span>
          <button
            onClick={() => setSelectedEpoch('all')}
            className={`px-3 py-1.5 text-xs font-sans-clean tracking-wide rounded-xs transition-colors ${
              selectedEpoch === 'all'
                ? 'bg-[#e4be92] text-[#141210] font-semibold'
                : 'bg-[#211e1c] text-[#a8a29e] hover:text-[#f0ebe1] hover:bg-[#2c2825]'
            }`}
          >
            All Eras (80k BCE – 900 CE)
          </button>
          {TIMELINE_EPOCHS.map((epoch) => (
            <button
              key={epoch.id}
              onClick={() => setSelectedEpoch(epoch.id)}
              className={`px-3 py-1.5 text-xs font-sans-clean tracking-wide rounded-xs transition-colors ${
                selectedEpoch === epoch.id
                  ? 'bg-[#e4be92] text-[#141210] font-semibold'
                  : 'bg-[#211e1c] text-[#a8a29e] hover:text-[#f0ebe1] hover:bg-[#2c2825]'
              }`}
            >
              {epoch.name}
            </button>
          ))}
        </div>

        {/* Zoom In / Zoom Out Controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#7d756d] font-sans-clean mr-1">Scale Zoom:</span>
          <div className="flex items-center bg-[#211e1c] border border-[#332f2b] rounded-xs p-1">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              className="p-1.5 text-[#a8a29e] hover:text-[#f5f2eb] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Zoom out timeline scale"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-2.5 text-xs font-code tabular-nums text-[#e8b584] font-medium">
              {zoomLevel}x
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 4}
              className="p-1.5 text-[#a8a29e] hover:text-[#f5f2eb] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Zoom in timeline scale"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleResetZoom}
            className="p-2 text-[#7d756d] hover:text-[#f5f2eb] bg-[#211e1c] border border-[#332f2b] rounded-xs transition-colors"
            title="Reset timeline filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Rail View */}
      {viewMode === 'rail' && (
        <div className="mb-10">
          {/* Calibrated Timeline Canvas */}
          <div className="bg-[#161413] border border-[#2d2926] p-6 lg:p-8 rounded-sm relative overflow-hidden">
            {/* Subtle Grid Watermark / Baseline */}
            <div className="text-xs uppercase tracking-widest text-[#5c544d] font-code mb-4 flex items-center justify-between">
              <span>Deep Time Chronological Track (Scale Multiplier: {zoomLevel}x)</span>
              <span>Direction of Physical Inscription Progress &rarr;</span>
            </div>

            {/* Scrollable Track Container */}
            <div 
              ref={timelineTrackRef} 
              className="overflow-x-auto pb-8 pt-4 custom-scrollbar"
              style={{
                width: '100%',
              }}
            >
              <div 
                className="relative min-w-[840px] h-48 lg:h-56 transition-all duration-300"
                style={{
                  width: `${100 * zoomLevel}%`,
                }}
              >
                {/* Horizontal Baseline Axis Line */}
                <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-[#3d3833] via-[#8c6742] to-[#3d3833]" />

                {/* Millennia Epoch Tick Marks */}
                {epochMarks.map((mark, idx) => (
                  <div
                    key={idx}
                    className="absolute top-16 flex flex-col items-center pointer-events-none"
                    style={{ left: `${mark.pos}%` }}
                  >
                    <span className="text-[10px] font-code tabular-nums text-[#8a8075] whitespace-nowrap mb-1">
                      {mark.label}
                    </span>
                    <div className="w-0.5 h-16 bg-[#3d3731]" />
                    <span className="text-[9px] font-sans-clean text-[#59524b] uppercase tracking-wider mt-1 whitespace-nowrap">
                      {mark.note}
                    </span>
                  </div>
                ))}

                {/* Artifact Pin Nodes */}
                {filteredArtifacts.map((art) => {
                  const posPercent = calculatePositionPercent(art.approxDate);
                  const isSelected = activeArtifact.id === art.id;

                  return (
                    <div
                      key={art.id}
                      className="absolute z-20 transition-all duration-200"
                      style={{
                        left: `${posPercent}%`,
                        top: isSelected ? '18px' : '30px',
                        transform: 'translateX(-50%)',
                      }}
                    >
                      {/* Clickable Node */}
                      <button
                        onClick={() => setActiveArtifactId(art.id)}
                        className={`group flex flex-col items-center cursor-pointer transition-all focus:outline-none ${
                          isSelected ? 'scale-110' : 'hover:scale-105'
                        }`}
                      >
                        {/* Node Card / Badge */}
                        <div
                          className={`px-2.5 py-1 text-xs font-sans-clean whitespace-nowrap border transition-all ${
                            isSelected
                              ? 'bg-[#e4be92] text-[#141210] border-[#f2d8b8] shadow-lg shadow-[#000000]/60 font-semibold'
                              : 'bg-[#221f1d] text-[#d4cbbe] border-[#3d3731] hover:border-[#8c6742] hover:bg-[#2b2724]'
                          }`}
                        >
                          <span className="font-code mr-1.5 text-[11px] tabular-nums">
                            {art.dateDisplay}
                          </span>
                          <span>{art.culture.split(' ')[0]}</span>
                        </div>

                        {/* Stalk down to timeline line */}
                        <div
                          className={`w-0.5 transition-all ${
                            isSelected
                              ? 'h-16 bg-[#e4be92]'
                              : 'h-12 bg-[#544a40] group-hover:bg-[#8c6742]'
                          }`}
                        />

                        {/* Anchor Dot */}
                        <div
                          className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
                            isSelected
                              ? 'bg-[#e4be92] border-[#ffffff] ring-4 ring-[#e4be92]/20'
                              : 'bg-[#1a1715] border-[#8c6742] group-hover:border-[#e4be92]'
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Timeline Instruction Notice */}
            <div className="mt-2 text-xs text-[#7d756d] font-sans-clean flex items-center justify-between border-t border-[#23201d] pt-3">
              <span>Click any timeline node above to load the primary source dossier and multispectral scan options.</span>
              <span className="font-code text-[11px] text-[#a89f91]">{filteredArtifacts.length} Artifacts in scope</span>
            </div>
          </div>

          {/* Active Artifact Deep Inspection Spotlight Card */}
          {activeArtifact && (
            <div className="mt-8 bg-[#181614] border border-[#332f2b] p-6 lg:p-8 rounded-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Artifact High-Res Image Preview */}
              <div className="lg:col-span-5 relative group overflow-hidden bg-[#121110] border border-[#2b2724] rounded-sm">
                <img
                  src={activeArtifact.image}
                  alt={activeArtifact.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-72 lg:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-transparent to-transparent opacity-80" />

                {/* Spectral badges overlay */}
                <div className="absolute top-3 left-3 bg-[#121110]/90 border border-[#3b3631] px-2.5 py-1 text-[11px] font-code text-[#e8b584] uppercase tracking-wider backdrop-blur-sm">
                  {activeArtifact.accessionCode}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className="text-xs text-[#cfc6b8] font-sans-clean">
                    <span className="text-[#a89f91]">Medium:</span> {activeArtifact.medium.split(',')[0]}
                  </div>
                  <button
                    onClick={() => onOpenMultispectral(activeArtifact)}
                    className="px-3 py-1.5 bg-[#e4be92] text-[#141210] hover:bg-[#eed3b5] font-sans-clean text-xs font-semibold flex items-center gap-1.5 rounded-xs transition-colors cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    Multispectral Scan
                  </button>
                </div>
              </div>

              {/* Right Column: Scholarly Epigraphic Profile */}
              <div className="lg:col-span-7">
                {/* Unboxed Metadata line with typographic separators (Frontend Constitution Compliance) */}
                <div className="flex items-center flex-wrap gap-2 text-xs text-[#a89f91] font-sans-clean mb-2">
                  <span className="text-[#e8b584] font-medium">{activeArtifact.dateDisplay}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeArtifact.geographicOrigin}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeArtifact.curatorialRepository}</span>
                </div>

                <h2 className="text-2xl lg:text-3xl font-cinzel font-semibold text-[#f5f2eb] tracking-tight">
                  {activeArtifact.title}
                </h2>

                <p className="mt-3 text-[#c2b9ad] font-editorial text-base lg:text-lg leading-relaxed">
                  {activeArtifact.physicalRecord}
                </p>

                {/* Victor's Bias Warning Box */}
                <div className="mt-4 p-3.5 bg-[#201b17] border-l-2 border-[#d97736] text-xs font-sans-clean text-[#d9c4b2] leading-relaxed">
                  <div className="flex items-center gap-1.5 font-semibold text-[#e88d4d] mb-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    DE-BIASED HISTORICAL RECORD (NO VICTOR'S REVISIONISM)
                  </div>
                  {activeArtifact.victorsBiasWarning}
                </div>

                {/* Epigraphic Metrics Grid */}
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-[#2b2724] pt-4 text-xs">
                  <div>
                    <span className="text-[#7d756d] block font-sans-clean uppercase tracking-wider text-[10px]">
                      Decipherment Status
                    </span>
                    <span className="font-sans-clean text-[#e8b584] font-medium">
                      {activeArtifact.deciphermentStatus}
                    </span>
                  </div>

                  <div>
                    <span className="text-[#7d756d] block font-sans-clean uppercase tracking-wider text-[10px]">
                      Identified Signs
                    </span>
                    <span className="font-code text-[#f0ebe1] tabular-nums font-semibold">
                      {activeArtifact.glyphDetails.totalSignsIdentified} tokens / {activeArtifact.glyphDetails.uniqueSignTypes} unique
                    </span>
                  </div>

                  <div>
                    <span className="text-[#7d756d] block font-sans-clean uppercase tracking-wider text-[10px]">
                      Inscription Path
                    </span>
                    <span className="font-sans-clean text-[#d4cbbe]">
                      {activeArtifact.glyphDetails.directionOfInscription.split('(')[0]}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onSelectArtifact(activeArtifact)}
                    className="px-4 py-2 bg-[#2a2622] hover:bg-[#36312c] text-[#f5f2eb] border border-[#423c35] text-xs font-sans-clean font-medium flex items-center gap-2 rounded-xs transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Full Archaeological Dossier
                  </button>

                  <button
                    onClick={() => onOpenMultispectral(activeArtifact)}
                    className="px-4 py-2 bg-[#e4be92] hover:bg-[#eed3b5] text-[#141210] text-xs font-sans-clean font-semibold flex items-center gap-2 rounded-xs transition-colors cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    Launch High-Res RTI Viewer
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Alternative View: Chronological Curatorial Matrix Cards */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredArtifacts.map((art) => (
            <div
              key={art.id}
              className="bg-[#181614] border border-[#2b2724] hover:border-[#8c6742] transition-colors rounded-sm overflow-hidden flex flex-col group"
            >
              {/* Card Image */}
              <div className="h-52 overflow-hidden relative bg-[#121110]">
                <img
                  src={art.image}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#121110]/90 px-2 py-0.5 text-[10px] font-code text-[#e8b584] border border-[#38332c]">
                  {art.dateDisplay}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] text-[#8c827a] font-sans-clean mb-1 uppercase tracking-wider">
                    {art.culture} · {art.geographicOrigin}
                  </div>
                  <h3 className="font-cinzel text-lg font-medium text-[#f5f2eb] group-hover:text-[#e8b584] transition-colors">
                    {art.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#a8a29e] font-editorial line-clamp-3 leading-relaxed">
                    {art.physicalRecord}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-[#23201d] flex items-center justify-between">
                  <span className="text-[11px] text-[#d4cbbe] font-sans-clean">
                    {art.deciphermentStatus}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectArtifact(art)}
                      className="text-xs text-[#a89f91] hover:text-[#f5f2eb] font-sans-clean underline"
                    >
                      Dossier
                    </button>
                    <button
                      onClick={() => onOpenMultispectral(art)}
                      className="px-2.5 py-1 bg-[#26221f] hover:bg-[#e4be92] hover:text-[#141210] text-[#e8b584] text-xs font-sans-clean rounded-xs transition-colors"
                    >
                      Scan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
