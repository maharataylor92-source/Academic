import React, { useState, useEffect } from 'react';
import { Artifact, PeerNote } from '../data/artifacts';
import { MessageSquare, ThumbsUp, Send, User, Building, Layers, ShieldCheck, Download } from 'lucide-react';

interface ScholarlyCollabProps {
  artifacts: Artifact[];
  onOpenArtifact: (art: Artifact) => void;
  onOpenMultispectral: (art: Artifact) => void;
}

export const ScholarlyCollab: React.FC<ScholarlyCollabProps> = ({
  artifacts,
  onOpenArtifact,
  onOpenMultispectral,
}) => {
  const [selectedArtifactId, setSelectedArtifactId] = useState<string>(artifacts[0]?.id || '');
  const [authorName, setAuthorName] = useState<string>('');
  const [institution, setInstitution] = useState<string>('');
  const [spectralRef, setSpectralRef] = useState<string>('Natural Light');
  const [commentContent, setCommentContent] = useState<string>('');
  const [localPeerNotes, setLocalPeerNotes] = useState<{ [artifactId: string]: PeerNote[] }>({});

  const activeArtifact = artifacts.find((a) => a.id === selectedArtifactId) || artifacts[0];

  // Load custom peer notes from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('archaica_peer_notes');
      if (stored) {
        setLocalPeerNotes(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handlePostNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentContent.trim()) return;

    const newNote: PeerNote = {
      id: `pn-${Date.now()}`,
      author: authorName.trim(),
      institution: institution.trim() || 'Independent Epigrapher',
      timestamp: 'Just now',
      content: commentContent.trim(),
      spectralReference: spectralRef,
      upvotes: 1,
    };

    const updated = {
      ...localPeerNotes,
      [activeArtifact.id]: [newNote, ...(localPeerNotes[activeArtifact.id] || [])],
    };

    setLocalPeerNotes(updated);
    try {
      localStorage.setItem('archaica_peer_notes', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setCommentContent('');
  };

  const handleUpvote = (noteId: string) => {
    const currentNotes = localPeerNotes[activeArtifact.id] || [];
    const updatedNotes = currentNotes.map((n) =>
      n.id === noteId ? { ...n, upvotes: n.upvotes + 1 } : n
    );
    const updated = {
      ...localPeerNotes,
      [activeArtifact.id]: updatedNotes,
    };
    setLocalPeerNotes(updated);
    try {
      localStorage.setItem('archaica_peer_notes', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const allNotes = [
    ...(localPeerNotes[activeArtifact.id] || []),
    ...activeArtifact.peerNotes,
  ];

  return (
    <div className="w-full py-8 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="mb-8 border-b border-[#292523] pb-6">
        <div className="text-xs uppercase tracking-widest font-sans-clean text-[#a89f91] mb-2 flex items-center gap-2">
          <span>Global Scholarly Collaboration</span>
          <span aria-hidden="true">·</span>
          <span>Peer Epigraphic Forum</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#d89759]">Open Academic Exchange</span>
        </div>
        <h1 className="text-3xl lg:text-5xl font-cinzel font-medium text-[#f5f2eb] tracking-tight">
          Scholarly Peer Notes
        </h1>
        <p className="mt-3 text-[#a8a29e] font-editorial text-lg max-w-3xl leading-relaxed">
          Collaborate on untranslated primary sources. Share microscopic toolmark discoveries, statistical n-gram counts, and de-biased hypotheses with researchers worldwide.
        </p>
      </div>

      {/* Artifact Selector Tabs */}
      <div className="mb-8 flex items-center overflow-x-auto gap-2 pb-2 custom-scrollbar">
        {artifacts.map((art) => (
          <button
            key={art.id}
            onClick={() => setSelectedArtifactId(art.id)}
            className={`px-4 py-2 text-xs font-sans-clean rounded-xs whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeArtifact.id === art.id
                ? 'bg-[#e4be92] text-[#141210] font-semibold shadow-sm'
                : 'bg-[#1c1917] text-[#a8a29e] hover:text-[#f5f2eb] border border-[#2b2724]'
            }`}
          >
            <span>{art.culture.split(' ')[0]}</span>
            <span className="text-[10px] font-code opacity-70">({art.dateDisplay})</span>
          </button>
        ))}
      </div>

      {/* Active Artifact Focus & Notes Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Artifact Summary & Submission Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#181614] border border-[#2d2926] p-5 rounded-sm">
            <div className="h-44 overflow-hidden relative rounded-xs mb-4 bg-[#121110]">
              <img
                src={activeArtifact.image}
                alt={activeArtifact.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-[#121110]/90 px-2 py-0.5 text-[10px] font-code text-[#e8b584]">
                {activeArtifact.accessionCode}
              </div>
            </div>

            <h3 className="font-cinzel text-lg font-semibold text-[#f5f2eb]">
              {activeArtifact.title}
            </h3>
            <p className="text-xs font-editorial text-[#a8a29e] mt-1.5 leading-relaxed line-clamp-3">
              {activeArtifact.physicalRecord}
            </p>

            <div className="mt-4 pt-3 border-t border-[#26221f] flex items-center justify-between">
              <button
                onClick={() => onOpenArtifact(activeArtifact)}
                className="text-xs text-[#a89f91] hover:text-[#f5f2eb] font-sans-clean underline"
              >
                View Full Dossier
              </button>
              <button
                onClick={() => onOpenMultispectral(activeArtifact)}
                className="px-3 py-1 bg-[#24201d] hover:bg-[#e4be92] hover:text-[#141210] text-[#e8b584] text-xs font-sans-clean rounded-xs transition-colors cursor-pointer"
              >
                Launch Scan
              </button>
            </div>
          </div>

          {/* Submission Form */}
          <form
            onSubmit={handlePostNote}
            className="bg-[#181614] border border-[#2d2926] p-5 rounded-sm text-xs"
          >
            <h4 className="font-cinzel text-base font-semibold text-[#f5f2eb] mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#e8b584]" />
              Submit Peer Epigraphic Observation
            </h4>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase font-sans-clean text-[#8c827a] block mb-1">
                  Researcher / Contributor Name
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#5e564e]" />
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Dr. Elena Rostova"
                    className="w-full bg-[#121110] border border-[#332f2b] text-[#f5f2eb] pl-8 pr-3 py-2 rounded-xs focus:outline-none focus:border-[#e8b584]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-sans-clean text-[#8c827a] block mb-1">
                  Academic Institution / Affiliation
                </label>
                <div className="relative">
                  <Building className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#5e564e]" />
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="e.g. Cambridge Faculty of Classics / Independent"
                    className="w-full bg-[#121110] border border-[#332f2b] text-[#f5f2eb] pl-8 pr-3 py-2 rounded-xs focus:outline-none focus:border-[#e8b584]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-sans-clean text-[#8c827a] block mb-1">
                  Spectral Reference Layer
                </label>
                <select
                  value={spectralRef}
                  onChange={(e) => setSpectralRef(e.target.value)}
                  className="w-full bg-[#121110] border border-[#332f2b] text-[#f5f2eb] px-3 py-2 rounded-xs focus:outline-none focus:border-[#e8b584]"
                >
                  <option value="Natural Light">Natural Light Inspection</option>
                  <option value="RTI Raking Light">RTI Raking Light (Toolmark/Groove Depth)</option>
                  <option value="UV Fluorescence">UV Fluorescence (Organic residue/binder)</option>
                  <option value="Infrared Reflectography">Infrared (Under-patina examination)</option>
                  <option value="3D Line Tracing">3D Relief / Line Tracing</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-sans-clean text-[#8c827a] block mb-1">
                  Empirical Observation (Strictly Unbiased)
                </label>
                <textarea
                  required
                  rows={3}
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="Record your physical findings, incision measurements, sign positional concordance, or critical peer comment..."
                  className="w-full bg-[#121110] border border-[#332f2b] text-[#f5f2eb] p-2.5 rounded-xs focus:outline-none focus:border-[#e8b584]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#e4be92] hover:bg-[#edd0ae] text-[#141210] font-sans-clean font-semibold rounded-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Publish Peer Note
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Peer Discussions Feed */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-4 border-b border-[#292523] pb-2">
            <h3 className="font-cinzel text-lg font-semibold text-[#f5f2eb]">
              Peer Notes for {activeArtifact.title.split('(')[0]} ({allNotes.length})
            </h3>
            <span className="text-[11px] font-sans-clean text-[#8c827a] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verified Open Scholarly Discourse
            </span>
          </div>

          <div className="space-y-4">
            {allNotes.map((note) => (
              <div
                key={note.id}
                className="bg-[#181614] border border-[#2c2825] p-5 rounded-sm hover:border-[#423c35] transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-cinzel font-semibold text-sm text-[#f5f2eb]">
                      {note.author}
                    </span>
                    <span className="text-[11px] font-sans-clean text-[#8c827a] ml-2">
                      · {note.institution}
                    </span>
                  </div>
                  <span className="text-[10px] font-code text-[#7d756d]">
                    {note.timestamp}
                  </span>
                </div>

                {note.spectralReference && (
                  <div className="inline-block px-2 py-0.5 bg-[#121110] border border-[#332f2b] text-[10px] font-code text-[#e8b584] rounded-xs mb-3">
                    Spectral Layer: {note.spectralReference}
                  </div>
                )}

                <p className="text-xs font-editorial text-[#d4cbbe] leading-relaxed">
                  {note.content}
                </p>

                <div className="mt-4 pt-3 border-t border-[#23201d] flex items-center justify-between text-xs">
                  <span className="text-[10px] text-[#7d756d] font-sans-clean">
                    Scholarly Endorsement
                  </span>
                  <button
                    onClick={() => handleUpvote(note.id)}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-[#211e1b] hover:bg-[#2b2723] text-[#d4cbbe] rounded-xs border border-[#332e29] transition-colors"
                  >
                    <ThumbsUp className="w-3 h-3 text-[#e8b584]" />
                    <span className="font-code text-[11px] tabular-nums font-semibold">
                      {note.upvotes}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
