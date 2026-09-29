import React, { useState, useRef, useEffect } from 'react';
import { 
  Artifact, 
  EpigraphicHotspot 
} from '../data/artifacts';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Eye, 
  MapPin, 
  PenTool, 
  Columns, 
  Sparkles, 
  Scroll, 
  BookOpen, 
  ShieldAlert, 
  Layers, 
  ArrowLeftRight,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface MultispectralViewerProps {
  artifact: Artifact;
  allArtifacts: Artifact[];
  onSelectArtifact: (art: Artifact) => void;
  onOpenDossier: (art: Artifact) => void;
}

export const MultispectralViewer: React.FC<MultispectralViewerProps> = ({
  artifact,
  allArtifacts,
  onSelectArtifact,
  onOpenDossier,
}) => {
  // Mode: Single Lens vs Side-by-Side Comparison
  const [comparisonMode, setComparisonMode] = useState<boolean>(false);
  const [artifactB, setArtifactB] = useState<Artifact>(
    allArtifacts.find((a) => a.id !== artifact.id) || allArtifacts[1] || artifact
  );

  // Spectral lighting filters for Canvas A & Canvas B
  const [spectralModeA, setSpectralModeA] = useState<'natural' | 'raking' | 'uv' | 'infrared' | 'relief'>('natural');
  const [spectralModeB, setSpectralModeB] = useState<'natural' | 'raking' | 'uv' | 'infrared' | 'relief'>('raking');

  // Zoom & Pan for Canvas A
  const [zoomA, setZoomA] = useState<number>(1);
  const [panA, setPanA] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDraggingA, setIsDraggingA] = useState<boolean>(false);
  const [dragStartA, setDragStartA] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Zoom & Pan for Canvas B
  const [zoomB, setZoomB] = useState<number>(1);
  const [panB, setPanB] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDraggingB, setIsDraggingB] = useState<boolean>(false);
  const [dragStartB, setDragStartB] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Synchronized panning & zooming toggle
  const [syncZoom, setSyncZoom] = useState<boolean>(false);

  // Loupe magnifier mode (Canvas A)
  const [loupeActive, setLoupeActive] = useState<boolean>(false);
  const [loupePos, setLoupePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showLoupe, setShowLoupe] = useState<boolean>(false);

  // Selected Hotspot for Canvas A
  const [activeHotspotA, setActiveHotspotA] = useState<EpigraphicHotspot | null>(
    artifact.hotspots[0] || null
  );
  // Selected Hotspot for Canvas B
  const [activeHotspotB, setActiveHotspotB] = useState<EpigraphicHotspot | null>(
    artifactB.hotspots[0] || null
  );

  const [showHotspots, setShowHotspots] = useState<boolean>(true);

  // Drop Annotation Mode for Canvas A
  const [dropPinMode, setDropPinMode] = useState<boolean>(false);
  const [userPins, setUserPins] = useState<Array<{ id: string; x: number; y: number; label: string; note: string }>>([]);
  const [newPinPrompt, setNewPinPrompt] = useState<{ x: number; y: number } | null>(null);
  const [newPinLabel, setNewPinLabel] = useState<string>('');
  const [newPinNote, setNewPinNote] = useState<string>('');

  const containerRefA = useRef<HTMLDivElement>(null);
  const containerRefB = useRef<HTMLDivElement>(null);

  // Reset viewport when artifact changes
  useEffect(() => {
    setZoomA(1);
    setPanA({ x: 0, y: 0 });
    setActiveHotspotA(artifact.hotspots[0] || null);
  }, [artifact.id]);

  useEffect(() => {
    setZoomB(1);
    setPanB({ x: 0, y: 0 });
    setActiveHotspotB(artifactB.hotspots[0] || null);
  }, [artifactB.id]);

  // Load custom pins from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`archaica_pins_${artifact.id}`);
      if (stored) {
        setUserPins(JSON.parse(stored));
      } else {
        setUserPins([]);
      }
    } catch {
      setUserPins([]);
    }
  }, [artifact.id]);

  const saveUserPins = (pins: typeof userPins) => {
    setUserPins(pins);
    try {
      localStorage.setItem(`archaica_pins_${artifact.id}`, JSON.stringify(pins));
    } catch (e) {
      console.error(e);
    }
  };

  // Zoom controls for Canvas A
  const handleZoomInA = () => {
    const next = Math.min(zoomA + 0.5, 5);
    setZoomA(next);
    if (syncZoom) setZoomB(next);
  };
  const handleZoomOutA = () => {
    const next = Math.max(zoomA - 0.5, 1);
    setZoomA(next);
    if (syncZoom) setZoomB(next);
  };
  const handleResetA = () => {
    setZoomA(1);
    setPanA({ x: 0, y: 0 });
    if (syncZoom) {
      setZoomB(1);
      setPanB({ x: 0, y: 0 });
    }
  };

  // Zoom controls for Canvas B
  const handleZoomInB = () => setZoomB((z) => Math.min(z + 0.5, 5));
  const handleZoomOutB = () => setZoomB((z) => Math.max(z - 0.5, 1));
  const handleResetB = () => {
    setZoomB(1);
    setPanB({ x: 0, y: 0 });
  };

  // Dragging logic Canvas A
  const handleMouseDownA = (e: React.MouseEvent) => {
    if (dropPinMode) return;
    setIsDraggingA(true);
    setDragStartA({ x: e.clientX - panA.x, y: e.clientY - panA.y });
  };

  const handleMouseMoveA = (e: React.MouseEvent) => {
    if (containerRefA.current) {
      const rect = containerRefA.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setLoupePos({ x, y });
    }

    if (!isDraggingA) return;
    const nextX = e.clientX - dragStartA.x;
    const nextY = e.clientY - dragStartA.y;
    setPanA({ x: nextX, y: nextY });
    if (syncZoom) {
      setPanB({ x: nextX, y: nextY });
    }
  };

  const handleMouseUpA = () => setIsDraggingA(false);

  // Dragging logic Canvas B
  const handleMouseDownB = (e: React.MouseEvent) => {
    setIsDraggingB(true);
    setDragStartB({ x: e.clientX - panB.x, y: e.clientY - panB.y });
  };

  const handleMouseMoveB = (e: React.MouseEvent) => {
    if (!isDraggingB) return;
    setPanB({
      x: e.clientX - dragStartB.x,
      y: e.clientY - dragStartB.y,
    });
  };

  const handleMouseUpB = () => setIsDraggingB(false);

  // Wheel zoom A
  const handleWheelA = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.0015;
    const next = Math.min(Math.max(1, zoomA + delta), 5);
    setZoomA(next);
    if (syncZoom) setZoomB(next);
  };

  // Wheel zoom B
  const handleWheelB = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.0015;
    setZoomB((prev) => Math.min(Math.max(1, prev + delta), 5));
  };

  // Drop pin handler
  const handleCanvasClickA = (e: React.MouseEvent) => {
    if (!dropPinMode || !containerRefA.current) return;
    const rect = containerRefA.current.getBoundingClientRect();
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;
    const xPct = Math.round((rawX / rect.width) * 100);
    const yPct = Math.round((rawY / rect.height) * 100);
    setNewPinPrompt({ x: xPct, y: yPct });
  };

  const handleSavePin = () => {
    if (!newPinPrompt || !newPinLabel.trim()) return;
    const newEntry = {
      id: `upin-${Date.now()}`,
      x: newPinPrompt.x,
      y: newPinPrompt.y,
      label: newPinLabel,
      note: newPinNote || 'Peer coordinate observation.',
    };
    const updated = [...userPins, newEntry];
    saveUserPins(updated);
    setNewPinPrompt(null);
    setNewPinLabel('');
    setNewPinNote('');
    setDropPinMode(false);
  };

  const getFilterStyle = (mode: string) => {
    switch (mode) {
      case 'raking':
        return 'spectral-raking';
      case 'uv':
        return 'spectral-uv';
      case 'infrared':
        return 'spectral-infrared';
      case 'relief':
        return 'spectral-relief';
      default:
        return '';
    }
  };

  return (
    <div className="w-full py-8 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Top Header & Comparison Mode Toggle Bar */}
      <div className="mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#2b2724] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans-clean text-[#a89f91] uppercase tracking-wider mb-1">
            <span className="text-[#e8b584] font-medium">Multispectral Epigraphic Scan</span>
            <span aria-hidden="true">·</span>
            <span>Ultra High-Resolution Laboratory Macro</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#d89759]">Side-by-Side Dual Comparator</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-cinzel font-semibold text-[#f5f2eb]">
            {comparisonMode ? 'Comparative Epigraphic Examination' : artifact.title}
          </h1>
          <p className="text-xs font-code text-[#8c827a] mt-1">
            {comparisonMode 
              ? `Comparing [A] ${artifact.accessionCode} (${artifact.culture.split(' ')[0]}) against [B] ${artifactB.accessionCode} (${artifactB.culture.split(' ')[0]})`
              : `Accession: ${artifact.accessionCode} · Repository: ${artifact.curatorialRepository}`
            }
          </p>
        </div>

        {/* Primary Actions: Mode Toggle & Artifact Selectors */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Side-by-Side Toggle Button */}
          <button
            onClick={() => setComparisonMode(!comparisonMode)}
            className={`px-3.5 py-1.5 text-xs font-sans-clean font-semibold rounded-xs flex items-center gap-2 transition-all cursor-pointer ${
              comparisonMode
                ? 'bg-[#e4be92] text-[#141210] shadow-md ring-2 ring-[#e4be92]/40'
                : 'bg-[#221f1c] text-[#e8b584] border border-[#3d3731] hover:bg-[#2b2724]'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            {comparisonMode ? 'Active Side-by-Side' : 'Compare Side-by-Side'}
          </button>

          {!comparisonMode ? (
            <div className="flex items-center gap-2">
              <select
                value={artifact.id}
                onChange={(e) => {
                  const found = allArtifacts.find((a) => a.id === e.target.value);
                  if (found) onSelectArtifact(found);
                }}
                className="bg-[#1c1917] border border-[#38332e] text-[#f5f2eb] text-xs font-sans-clean py-1.5 px-3 rounded-xs focus:outline-none focus:border-[#e8b584]"
              >
                {allArtifacts.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.dateDisplay} — {a.title}
                  </option>
                ))}
              </select>

              <button
                onClick={() => onOpenDossier(artifact)}
                className="px-3 py-1.5 bg-[#2a2622] hover:bg-[#36312c] text-[#f5f2eb] border border-[#3d3731] text-xs font-sans-clean rounded-xs transition-colors whitespace-nowrap cursor-pointer"
              >
                View Dossier
              </button>
            </div>
          ) : (
            /* Comparison Controls */
            <div className="flex items-center gap-2">
              <label className="text-xs text-[#a89f91] font-sans-clean flex items-center gap-1.5 cursor-pointer bg-[#1c1917] px-2.5 py-1 rounded-xs border border-[#332f2b]">
                <input
                  type="checkbox"
                  checked={syncZoom}
                  onChange={(e) => setSyncZoom(e.target.checked)}
                  className="rounded-xs accent-[#e4be92]"
                />
                Sync Zoom & Pan
              </label>

              <button
                onClick={() => onOpenDossier(artifact)}
                className="px-3 py-1.5 bg-[#2a2622] hover:bg-[#36312c] text-[#f5f2eb] border border-[#3d3731] text-xs font-sans-clean rounded-xs transition-colors cursor-pointer"
              >
                Dossier A
              </button>
              <button
                onClick={() => onOpenDossier(artifactB)}
                className="px-3 py-1.5 bg-[#2a2622] hover:bg-[#36312c] text-[#f5f2eb] border border-[#3d3731] text-xs font-sans-clean rounded-xs transition-colors cursor-pointer"
              >
                Dossier B
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: SIDE-BY-SIDE DUAL COMPARISON VIEWPORT                             */}
      {/* ========================================================================= */}
      {comparisonMode ? (
        <div className="space-y-6">
          {/* Dual Canvases Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* ----------------- LEFT ARTIFACT A ----------------- */}
            <div className="bg-[#181614] border border-[#332f2b] rounded-sm overflow-hidden flex flex-col">
              {/* Canvas A Header & Lighting Selector */}
              <div className="p-3 bg-[#141210] border-b border-[#292522] flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-code font-bold text-[#e4be92] px-1.5 py-0.5 bg-[#24201c] rounded-xs border border-[#3d362f]">
                    [A]
                  </span>
                  <select
                    value={artifact.id}
                    onChange={(e) => {
                      const found = allArtifacts.find((a) => a.id === e.target.value);
                      if (found) onSelectArtifact(found);
                    }}
                    className="bg-[#1b1917] border border-[#38332d] text-[#f5f2eb] text-xs font-cinzel py-1 px-2 rounded-xs focus:outline-none focus:border-[#e8b584] max-w-[220px]"
                  >
                    {allArtifacts.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Lighting Toolbar A */}
                <div className="flex items-center gap-1">
                  {(['natural', 'raking', 'uv', 'infrared', 'relief'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setSpectralModeA(m)}
                      className={`px-2 py-0.5 rounded-xs text-[11px] font-sans-clean capitalize transition-colors ${
                        spectralModeA === m
                          ? 'bg-[#e4be92] text-[#141210] font-semibold'
                          : 'bg-[#221f1d] text-[#8c827a] hover:text-[#f5f2eb]'
                      }`}
                    >
                      {m === 'natural' ? 'Nat' : m === 'raking' ? 'RTI' : m.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Viewport Canvas A */}
              <div
                ref={containerRefA}
                onMouseDown={handleMouseDownA}
                onMouseMove={handleMouseMoveA}
                onMouseUp={handleMouseUpA}
                onMouseLeave={() => setIsDraggingA(false)}
                onWheel={handleWheelA}
                className="relative w-full h-[440px] bg-[#0c0b0a] overflow-hidden select-none cursor-grab active:cursor-grabbing"
              >
                <div
                  className="w-full h-full flex items-center justify-center transition-transform duration-75"
                  style={{
                    transform: `translate(${panA.x}px, ${panA.y}px) scale(${zoomA})`,
                    transformOrigin: 'center center',
                  }}
                >
                  <div className="relative inline-block max-w-full max-h-full">
                    <img
                      src={artifact.image}
                      alt={artifact.title}
                      referrerPolicy="no-referrer"
                      className={`max-w-full max-h-[400px] object-contain transition-all duration-300 pointer-events-none ${getFilterStyle(spectralModeA)}`}
                    />

                    {/* Hotspots A */}
                    {showHotspots &&
                      artifact.hotspots.map((spot) => (
                        <button
                          key={spot.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveHotspotA(spot);
                          }}
                          style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                          className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                              activeHotspotA?.id === spot.id
                                ? 'bg-[#e4be92] text-[#141210] ring-4 ring-[#e4be92]/40 scale-125'
                                : 'bg-[#181513]/90 border border-[#e4be92] text-[#e8b584]'
                            }`}
                          >
                            ●
                          </div>
                        </button>
                      ))}
                  </div>
                </div>

                {/* Floating A Zoom Pill */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-[#121110]/90 border border-[#332e29] p-1 rounded-xs backdrop-blur-sm">
                  <button onClick={handleZoomOutA} className="p-1 text-[#8c827a] hover:text-[#f5f2eb]">
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-1.5 text-[11px] font-code text-[#e8b584] tabular-nums">
                    {Math.round(zoomA * 100)}%
                  </span>
                  <button onClick={handleZoomInA} className="p-1 text-[#8c827a] hover:text-[#f5f2eb]">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={handleResetA} className="p-1 text-[#665f57] hover:text-[#f5f2eb]">
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Technical Epigraphic Footer A */}
              <div className="p-4 bg-[#141210] border-t border-[#292522] text-xs font-sans-clean space-y-2">
                <div className="flex items-center justify-between text-[#8c827a]">
                  <span>Origin: <strong className="text-[#d4cbbe]">{artifact.culture}</strong></span>
                  <span className="font-code text-[#e8b584]">{artifact.dateDisplay}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#7d756d] uppercase font-sans-clean block">Script Classification</span>
                  <span className="text-[#cfc6b8]">{artifact.scriptClassification}</span>
                </div>
                {artifact.mysticRecord && (
                  <div className="p-2.5 bg-[#1e1a17] border-l-2 border-[#e4be92] rounded-xs text-[11px] text-[#ded1c4]">
                    <span className="text-[#e8b584] font-semibold block mb-0.5">Mystic Passage:</span>
                    <span className="font-code text-xs text-[#f5f2eb]">{artifact.mysticRecord.originalScriptSample.split('\\n')[0]}</span>
                  </div>
                )}
              </div>
            </div>

            {/* ----------------- RIGHT ARTIFACT B ----------------- */}
            <div className="bg-[#181614] border border-[#332f2b] rounded-sm overflow-hidden flex flex-col">
              {/* Canvas B Header & Lighting Selector */}
              <div className="p-3 bg-[#141210] border-b border-[#292522] flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-code font-bold text-[#e4be92] px-1.5 py-0.5 bg-[#24201c] rounded-xs border border-[#3d362f]">
                    [B]
                  </span>
                  <select
                    value={artifactB.id}
                    onChange={(e) => {
                      const found = allArtifacts.find((a) => a.id === e.target.value);
                      if (found) setArtifactB(found);
                    }}
                    className="bg-[#1b1917] border border-[#38332d] text-[#f5f2eb] text-xs font-cinzel py-1 px-2 rounded-xs focus:outline-none focus:border-[#e8b584] max-w-[220px]"
                  >
                    {allArtifacts.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Lighting Toolbar B */}
                <div className="flex items-center gap-1">
                  {(['natural', 'raking', 'uv', 'infrared', 'relief'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setSpectralModeB(m)}
                      className={`px-2 py-0.5 rounded-xs text-[11px] font-sans-clean capitalize transition-colors ${
                        spectralModeB === m
                          ? 'bg-[#e4be92] text-[#141210] font-semibold'
                          : 'bg-[#221f1d] text-[#8c827a] hover:text-[#f5f2eb]'
                      }`}
                    >
                      {m === 'natural' ? 'Nat' : m === 'raking' ? 'RTI' : m.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Viewport Canvas B */}
              <div
                ref={containerRefB}
                onMouseDown={handleMouseDownB}
                onMouseMove={handleMouseMoveB}
                onMouseUp={handleMouseUpB}
                onMouseLeave={() => setIsDraggingB(false)}
                onWheel={handleWheelB}
                className="relative w-full h-[440px] bg-[#0c0b0a] overflow-hidden select-none cursor-grab active:cursor-grabbing"
              >
                <div
                  className="w-full h-full flex items-center justify-center transition-transform duration-75"
                  style={{
                    transform: `translate(${panB.x}px, ${panB.y}px) scale(${zoomB})`,
                    transformOrigin: 'center center',
                  }}
                >
                  <div className="relative inline-block max-w-full max-h-full">
                    <img
                      src={artifactB.image}
                      alt={artifactB.title}
                      referrerPolicy="no-referrer"
                      className={`max-w-full max-h-[400px] object-contain transition-all duration-300 pointer-events-none ${getFilterStyle(spectralModeB)}`}
                    />

                    {/* Hotspots B */}
                    {showHotspots &&
                      artifactB.hotspots.map((spot) => (
                        <button
                          key={spot.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveHotspotB(spot);
                          }}
                          style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                          className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                              activeHotspotB?.id === spot.id
                                ? 'bg-[#e4be92] text-[#141210] ring-4 ring-[#e4be92]/40 scale-125'
                                : 'bg-[#181513]/90 border border-[#e4be92] text-[#e8b584]'
                            }`}
                          >
                            ●
                          </div>
                        </button>
                      ))}
                  </div>
                </div>

                {/* Floating B Zoom Pill */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-[#121110]/90 border border-[#332e29] p-1 rounded-xs backdrop-blur-sm">
                  <button onClick={handleZoomOutB} className="p-1 text-[#8c827a] hover:text-[#f5f2eb]">
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-1.5 text-[11px] font-code text-[#e8b584] tabular-nums">
                    {Math.round(zoomB * 100)}%
                  </span>
                  <button onClick={handleZoomInB} className="p-1 text-[#8c827a] hover:text-[#f5f2eb]">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={handleResetB} className="p-1 text-[#665f57] hover:text-[#f5f2eb]">
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Technical Epigraphic Footer B */}
              <div className="p-4 bg-[#141210] border-t border-[#292522] text-xs font-sans-clean space-y-2">
                <div className="flex items-center justify-between text-[#8c827a]">
                  <span>Origin: <strong className="text-[#d4cbbe]">{artifactB.culture}</strong></span>
                  <span className="font-code text-[#e8b584]">{artifactB.dateDisplay}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#7d756d] uppercase font-sans-clean block">Script Classification</span>
                  <span className="text-[#cfc6b8]">{artifactB.scriptClassification}</span>
                </div>
                {artifactB.mysticRecord && (
                  <div className="p-2.5 bg-[#1e1a17] border-l-2 border-[#e4be92] rounded-xs text-[11px] text-[#ded1c4]">
                    <span className="text-[#e8b584] font-semibold block mb-0.5">Mystic Passage:</span>
                    <span className="font-code text-xs text-[#f5f2eb]">{artifactB.mysticRecord.originalScriptSample.split('\\n')[0]}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Comparative Epigraphic Synthesis Matrix */}
          <div className="bg-[#181614] border border-[#332f2b] p-6 rounded-sm">
            <div className="text-xs uppercase tracking-wider font-code text-[#e8b584] mb-3 flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4" />
              Epigraphic Correlation & Concordance Matrix ([A] vs [B])
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans-clean">
              <div className="p-4 bg-[#141210] border border-[#26221f] rounded-xs">
                <span className="text-[10px] text-[#8c827a] uppercase block mb-1">Comparative Chronology</span>
                <div className="text-sm font-code text-[#f5f2eb] mb-2">
                  Δ {Math.abs(artifact.approxDate - artifactB.approxDate).toLocaleString()} Years Apart
                </div>
                <p className="text-xs font-editorial text-[#a8a29e] leading-relaxed">
                  {artifact.approxDate < artifactB.approxDate
                    ? `[A] (${artifact.dateDisplay}) was incised centuries prior to [B] (${artifactB.dateDisplay}), illustrating temporal evolution in sign compression.`
                    : `[B] (${artifactB.dateDisplay}) precedes [A] (${artifact.dateDisplay}) in the primary archaeological record.`}
                </p>
              </div>

              <div className="p-4 bg-[#141210] border border-[#26221f] rounded-xs">
                <span className="text-[10px] text-[#8c827a] uppercase block mb-1">Toolmark & Material Contrast</span>
                <div className="text-[#cfc5b8] space-y-1.5 text-xs font-editorial">
                  <div><strong className="text-[#f5f2eb]">[A]:</strong> {artifact.medium}</div>
                  <div><strong className="text-[#f5f2eb]">[B]:</strong> {artifactB.medium}</div>
                </div>
              </div>

              <div className="p-4 bg-[#141210] border border-[#26221f] rounded-xs">
                <span className="text-[10px] text-[#8c827a] uppercase block mb-1">Decipherment & Concordance</span>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8c827a]">[A] Status:</span>
                    <span className="text-[#e8b584]">{artifact.deciphermentStatus.split('(')[0]}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8c827a]">[B] Status:</span>
                    <span className="text-[#e8b584]">{artifactB.deciphermentStatus.split('(')[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* MODE 2: SINGLE ARTIFACT HIGH-RES DEEP INSPECTION LENS                     */
        /* ========================================================================= */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 8 Cols: Interactive Canvas */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Multispectral Toolbar */}
            <div className="bg-[#1a1715] border border-[#2d2926] p-2.5 rounded-t-sm flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Spectral Lighting Selectors */}
              <div className="flex items-center gap-1.5">
                <span className="text-[#8c827a] font-sans-clean uppercase tracking-wider text-[10px] mr-1 hidden sm:inline">
                  Lighting:
                </span>
                <button
                  onClick={() => setSpectralModeA('natural')}
                  className={`px-2.5 py-1 rounded-xs font-sans-clean transition-colors ${
                    spectralModeA === 'natural'
                      ? 'bg-[#e4be92] text-[#141210] font-semibold'
                      : 'bg-[#24201d] text-[#a8a29e] hover:text-[#f5f2eb]'
                  }`}
                  title="Natural Museum Lighting"
                >
                  Natural Light
                </button>
                <button
                  onClick={() => setSpectralModeA('raking')}
                  className={`px-2.5 py-1 rounded-xs font-sans-clean transition-colors ${
                    spectralModeA === 'raking'
                      ? 'bg-[#e4be92] text-[#141210] font-semibold'
                      : 'bg-[#24201d] text-[#a8a29e] hover:text-[#f5f2eb]'
                  }`}
                  title="RTI Raking Light (Enhances Inscriptions & Toolmarks)"
                >
                  RTI Raking Light
                </button>
                <button
                  onClick={() => setSpectralModeA('uv')}
                  className={`px-2.5 py-1 rounded-xs font-sans-clean transition-colors ${
                    spectralModeA === 'uv'
                      ? 'bg-[#e4be92] text-[#141210] font-semibold'
                      : 'bg-[#24201d] text-[#a8a29e] hover:text-[#f5f2eb]'
                  }`}
                  title="UV Fluorescence (Organic trace and pigment identification)"
                >
                  UV Fluorescence
                </button>
                <button
                  onClick={() => setSpectralModeA('infrared')}
                  className={`px-2.5 py-1 rounded-xs font-sans-clean transition-colors ${
                    spectralModeA === 'infrared'
                      ? 'bg-[#e4be92] text-[#141210] font-semibold'
                      : 'bg-[#24201d] text-[#a8a29e] hover:text-[#f5f2eb]'
                  }`}
                  title="Infrared Reflectography (Cuts through surface patina)"
                >
                  Infrared (IR)
                </button>
                <button
                  onClick={() => setSpectralModeA('relief')}
                  className={`px-2.5 py-1 rounded-xs font-sans-clean transition-colors ${
                    spectralModeA === 'relief'
                      ? 'bg-[#e4be92] text-[#141210] font-semibold'
                      : 'bg-[#24201d] text-[#a8a29e] hover:text-[#f5f2eb]'
                  }`}
                  title="3D Inverted Relief / Line Tracing"
                >
                  3D Relief
                </button>
              </div>

              {/* Lens & Hotspot Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLoupeActive(!loupeActive)}
                  className={`px-2.5 py-1 rounded-xs font-sans-clean flex items-center gap-1 transition-colors ${
                    loupeActive
                      ? 'bg-[#c27847] text-[#ffffff] font-semibold'
                      : 'bg-[#24201d] text-[#a8a29e] hover:text-[#f5f2eb]'
                  }`}
                  title="Toggle 2.5x Magnifying Loupe Lens"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Loupe
                </button>

                <button
                  onClick={() => setShowHotspots(!showHotspots)}
                  className={`px-2.5 py-1 rounded-xs font-sans-clean flex items-center gap-1 transition-colors ${
                    showHotspots
                      ? 'bg-[#2c2621] text-[#e8b584] border border-[#52463b]'
                      : 'bg-[#24201d] text-[#7d756d]'
                  }`}
                  title="Toggle Epigraphic Hotspots"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Pins ({artifact.hotspots.length + userPins.length})
                </button>

                <button
                  onClick={() => setDropPinMode(!dropPinMode)}
                  className={`px-2.5 py-1 rounded-xs font-sans-clean flex items-center gap-1 transition-colors ${
                    dropPinMode
                      ? 'bg-[#8c4b2d] text-white animate-pulse'
                      : 'bg-[#24201d] text-[#a8a29e] hover:text-[#f5f2eb]'
                  }`}
                  title="Click canvas to pin custom observation"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  Annotate
                </button>
              </div>
            </div>

            {/* Interactive Image Viewport */}
            <div
              ref={containerRefA}
              onMouseDown={handleMouseDownA}
              onMouseMove={handleMouseMoveA}
              onMouseUp={handleMouseUpA}
              onMouseLeave={() => {
                setIsDraggingA(false);
                setShowLoupe(false);
              }}
              onMouseEnter={() => {
                if (loupeActive) setShowLoupe(true);
              }}
              onWheel={handleWheelA}
              onClick={handleCanvasClickA}
              className={`relative w-full h-[520px] lg:h-[600px] bg-[#0c0b0a] border-x border-b border-[#2d2926] overflow-hidden select-none ${
                dropPinMode ? 'cursor-crosshair' : isDraggingA ? 'cursor-grabbing' : 'cursor-grab'
              }`}
            >
              <div
                className="w-full h-full flex items-center justify-center transition-transform duration-75"
                style={{
                  transform: `translate(${panA.x}px, ${panA.y}px) scale(${zoomA})`,
                  transformOrigin: 'center center',
                }}
              >
                <div className="relative inline-block max-w-full max-h-full">
                  <img
                    src={artifact.image}
                    alt={artifact.title}
                    referrerPolicy="no-referrer"
                    className={`max-w-full max-h-[560px] object-contain transition-all duration-300 pointer-events-none ${getFilterStyle(spectralModeA)}`}
                  />

                  {/* Epigraphic Hotspots Overlay */}
                  {showHotspots &&
                    artifact.hotspots.map((spot) => {
                      const isSelected = activeHotspotA?.id === spot.id;
                      return (
                        <button
                          key={spot.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveHotspotA(spot);
                          }}
                          style={{
                            left: `${spot.x}%`,
                            top: `${spot.y}%`,
                          }}
                          className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                              isSelected
                                ? 'bg-[#e4be92] text-[#141210] ring-4 ring-[#e4be92]/40 scale-125'
                                : 'bg-[#181513]/90 border border-[#e4be92] text-[#e8b584] hover:scale-115'
                            }`}
                          >
                            ●
                          </div>
                          <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-[#121110] border border-[#3d3731] text-[10px] font-sans-clean text-[#f0ebe1] whitespace-nowrap shadow-md pointer-events-none">
                            {spot.glyphLabel}
                          </div>
                        </button>
                      );
                    })}

                  {/* Peer Coordinate User Pins */}
                  {showHotspots &&
                    userPins.map((pin) => (
                      <div
                        key={pin.id}
                        style={{
                          left: `${pin.x}%`,
                          top: `${pin.y}%`,
                        }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer"
                      >
                        <div className="w-5 h-5 rounded-full bg-[#3d7099] border border-white text-white flex items-center justify-center text-[9px] shadow-sm">
                          ★
                        </div>
                        <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-[#121110] border border-[#3d7099] text-[10px] text-white whitespace-nowrap z-40">
                          {pin.label}: {pin.note}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Magnifying Loupe Lens Follower */}
              {loupeActive && showLoupe && (
                <div
                  className="absolute pointer-events-none rounded-full border-2 border-[#e8b584] shadow-2xl overflow-hidden z-40"
                  style={{
                    width: '180px',
                    height: '180px',
                    left: `${loupePos.x - 90}px`,
                    top: `${loupePos.y - 90}px`,
                    backgroundColor: '#121110',
                  }}
                >
                  <div
                    className="w-full h-full relative"
                    style={{
                      transform: 'scale(2.4)',
                      transformOrigin: `${(loupePos.x / (containerRefA.current?.clientWidth || 1)) * 100}% ${(loupePos.y / (containerRefA.current?.clientHeight || 1)) * 100}%`,
                    }}
                  >
                    <img
                      src={artifact.image}
                      alt="Magnified detail"
                      className={`w-full h-full object-contain ${getFilterStyle(spectralModeA)}`}
                    />
                  </div>
                  <div className="absolute inset-0 bg-radial from-transparent to-black/30 pointer-events-none" />
                  <div className="absolute bottom-1 right-2 text-[9px] font-code text-[#e8b584] bg-black/70 px-1 rounded-xs">
                    2.5x Loupe
                  </div>
                </div>
              )}

              {/* Canvas Bottom Floating Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-1.5 bg-[#121110]/90 border border-[#332e29] p-1 rounded-xs backdrop-blur-sm pointer-events-auto">
                  <button
                    onClick={handleZoomOutA}
                    disabled={zoomA <= 1}
                    className="p-1 text-[#a8a29e] hover:text-[#f5f2eb] disabled:opacity-30 transition-colors"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="px-2 text-xs font-code text-[#e8b584] tabular-nums font-semibold">
                    {Math.round(zoomA * 100)}%
                  </span>
                  <button
                    onClick={handleZoomInA}
                    disabled={zoomA >= 5}
                    className="p-1 text-[#a8a29e] hover:text-[#f5f2eb] disabled:opacity-30 transition-colors"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleResetA}
                    className="p-1 text-[#7d756d] hover:text-[#f5f2eb] ml-1 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="bg-[#121110]/90 border border-[#332e29] px-3 py-1 text-xs font-code text-[#d4cbbe] backdrop-blur-sm pointer-events-auto flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#52c41a]" />
                  <span className="uppercase">{spectralModeA} spectral layer</span>
                </div>
              </div>

              {/* Drop Pin Popover */}
              {newPinPrompt && (
                <div
                  className="absolute z-50 bg-[#1c1917] border border-[#e4be92] p-4 rounded-xs shadow-2xl text-xs w-64"
                  style={{
                    left: `${Math.min(newPinPrompt.x, 70)}%`,
                    top: `${Math.min(newPinPrompt.y, 70)}%`,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="font-cinzel font-semibold text-[#f5f2eb] mb-2">
                    Drop Peer Observation Pin
                  </div>
                  <div className="mb-2">
                    <label className="text-[10px] text-[#8c827a] uppercase font-sans-clean block mb-0.5">
                      Sign / Toolmark Label
                    </label>
                    <input
                      type="text"
                      value={newPinLabel}
                      onChange={(e) => setNewPinLabel(e.target.value)}
                      placeholder="e.g. Incision terminal overlap"
                      className="w-full bg-[#121110] border border-[#38332c] text-white px-2 py-1 text-xs rounded-xs focus:outline-none focus:border-[#e8b584]"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="text-[10px] text-[#8c827a] uppercase font-sans-clean block mb-0.5">
                      Physical Observation
                    </label>
                    <textarea
                      value={newPinNote}
                      onChange={(e) => setNewPinNote(e.target.value)}
                      placeholder="Describe chisel angle, erosion, or metrology..."
                      rows={2}
                      className="w-full bg-[#121110] border border-[#38332c] text-white px-2 py-1 text-xs rounded-xs focus:outline-none focus:border-[#e8b584]"
                    />
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setNewPinPrompt(null)}
                      className="px-2 py-1 text-[#8c827a] hover:text-[#f5f2eb]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSavePin}
                      className="px-3 py-1 bg-[#e4be92] text-[#141210] font-semibold rounded-xs"
                    >
                      Save Pin
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right 4 Cols: Epigraphic Hotspot Breakdown & Unvarnished Scholarly Analysis */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* If Artifact is a Sacred Mystic Text, display the Mystic Reader Block */}
            {artifact.mysticRecord && (
              <div className="bg-[#181614] border border-[#d99f6e] p-5 rounded-sm">
                <div className="text-[10px] uppercase font-code tracking-wider text-[#e8b584] mb-1 flex items-center gap-1.5">
                  <Scroll className="w-3.5 h-3.5" />
                  Primary Mystic Text & Sacred Corpus
                </div>
                <h4 className="font-cinzel text-base font-semibold text-[#f5f2eb] mb-2">
                  {artifact.mysticRecord.originalScriptLanguage}
                </h4>

                <div className="my-2.5 p-3 bg-[#121110] border border-[#38332c] rounded-xs">
                  <span className="text-[10px] uppercase font-sans-clean text-[#8c827a] block mb-1">
                    Original Script Inscription
                  </span>
                  <div className="font-code text-xs text-[#e8b584] leading-relaxed break-words">
                    {artifact.mysticRecord.originalScriptSample}
                  </div>
                </div>

                <div className="mb-2.5">
                  <span className="text-[10px] uppercase font-sans-clean text-[#8c827a] block mb-1">
                    Unvarnished Literal Translation
                  </span>
                  <p className="text-xs font-editorial text-[#d4cbbe] leading-relaxed italic">
                    {artifact.mysticRecord.unvarnishedLiteralTranslation}
                  </p>
                </div>

                <div className="p-3 bg-[#201c18] border-l-2 border-[#e8b584] text-[11px] font-sans-clean text-[#cfc5b8] leading-relaxed">
                  <span className="font-semibold text-[#e8b584] block mb-0.5 uppercase tracking-wider text-[10px]">
                    Esoteric Ontology & Cipher
                  </span>
                  {artifact.mysticRecord.esotericSignificance}
                </div>
              </div>
            )}

            {/* Active Hotspot Inspector Panel */}
            {activeHotspotA ? (
              <div className="bg-[#181614] border border-[#332f2b] p-5 rounded-sm flex-1">
                <div className="text-[11px] font-sans-clean uppercase tracking-wider text-[#e8b584] mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Epigraphic Hotspot Inspection
                </div>
                <h3 className="text-xl font-cinzel font-semibold text-[#f5f2eb]">
                  {activeHotspotA.glyphLabel}
                </h3>

                {/* Raw Sign Representation */}
                <div className="my-3 p-3 bg-[#121110] border border-[#2b2724] rounded-xs flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-sans-clean text-[#7d756d]">
                      Raw Sign Token
                    </div>
                    <div className="text-sm font-code text-[#e8b584] mt-0.5">
                      {activeHotspotA.rawSignForm}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase font-sans-clean text-[#7d756d]">
                      Spectral Resolution
                    </div>
                    <div className="text-xs font-sans-clean text-[#a8a29e] capitalize">
                      {activeHotspotA.spectralLayer}
                    </div>
                  </div>
                </div>

                {/* Objective Description */}
                <div className="mb-3">
                  <span className="text-[11px] uppercase tracking-wide font-sans-clean text-[#a89f91] block mb-1">
                    1. Physical Micro-Traceology
                  </span>
                  <p className="text-xs font-editorial text-[#d4cbbe] leading-relaxed">
                    {activeHotspotA.objectiveDescription}
                  </p>
                </div>

                {/* Transliteration Debate */}
                <div className="mb-3">
                  <span className="text-[11px] uppercase tracking-wide font-sans-clean text-[#a89f91] block mb-1">
                    2. Academic Transliteration Debate
                  </span>
                  <p className="text-xs font-editorial text-[#d4cbbe] leading-relaxed">
                    {activeHotspotA.transliterationDebate}
                  </p>
                </div>

                {/* Non-Biased Empirical Observation */}
                <div className="p-3 bg-[#201c18] border-l-2 border-[#8c6742] text-xs font-sans-clean text-[#cfc5b8] leading-relaxed">
                  <span className="font-semibold text-[#e8b584] block mb-0.5 text-[10px] uppercase tracking-wider">
                    Unbiased Consensus Finding
                  </span>
                  {activeHotspotA.nonBiasedObservation}
                </div>

                {/* Hotspot quick list */}
                <div className="mt-4 pt-3 border-t border-[#26221f]">
                  <span className="text-[10px] font-sans-clean uppercase tracking-wider text-[#7d756d] block mb-2">
                    Select Pinned Hotspots on this Artifact:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {artifact.hotspots.map((hs) => (
                      <button
                        key={hs.id}
                        onClick={() => setActiveHotspotA(hs)}
                        className={`px-2 py-1 text-[11px] font-sans-clean rounded-xs transition-colors ${
                          activeHotspotA.id === hs.id
                            ? 'bg-[#e4be92] text-[#141210] font-semibold'
                            : 'bg-[#211e1c] text-[#a8a29e] hover:text-white'
                        }`}
                      >
                        {hs.glyphLabel.split(':')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {/* Quick Technical Provenance Card */}
            <div className="bg-[#181614] border border-[#332f2b] p-4 rounded-sm text-xs">
              <span className="text-[10px] uppercase tracking-wider font-sans-clean text-[#7d756d] block mb-1">
                Physical Medium Specifications
              </span>
              <div className="font-sans-clean text-[#cfc6b8] space-y-1">
                <div><span className="text-[#8c827a]">Dimensions:</span> {artifact.dimensions}</div>
                <div><span className="text-[#8c827a]">Medium:</span> {artifact.medium}</div>
                <div><span className="text-[#8c827a]">Script Path:</span> {artifact.glyphDetails.directionOfInscription}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
