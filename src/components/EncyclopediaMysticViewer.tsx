import React, { useState, useMemo } from 'react';
import { 
  ENCYCLOPEDIA_AND_MYSTIC_DATA, 
  EncyclopediaEntry 
} from '../data/encyclopediaAndMysticData';
import { Artifact } from '../data/artifacts';
import { 
  BookOpen, 
  Sun, 
  Feather, 
  GraduationCap, 
  Scale, 
  Search, 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Scroll, 
  Compass, 
  Layers, 
  Landmark, 
  ChevronRight 
} from 'lucide-react';

interface EncyclopediaMysticViewerProps {
  artifacts: Artifact[];
  onOpenArtifact: (art: Artifact) => void;
  onOpenMultispectral: (art: Artifact) => void;
}

export const EncyclopediaMysticViewer: React.FC<EncyclopediaMysticViewerProps> = ({
  artifacts,
  onOpenArtifact,
  onOpenMultispectral,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'encyclopedia-of-religions' | 'mystic-ra-thoth' | 'pre-1890-professors' | 'free-will-human-nature'
  >('all');
  const [selectedEntryId, setSelectedEntryId] = useState<string>('ibn-hazm-milal-nihal');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredEntries = useMemo(() => {
    return ENCYCLOPEDIA_AND_MYSTIC_DATA.filter((entry) => {
      if (selectedCategory !== 'all' && entry.category !== selectedCategory) {
        return false;
      }
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchTitle = entry.title.toLowerCase().includes(q);
      const matchAuthor = entry.authorOrAttribution.toLowerCase().includes(q);
      const matchSummary = entry.unvarnishedSummary.toLowerCase().includes(q);
      const matchText = entry.pre1890Translation.toLowerCase().includes(q) || entry.originalTextExcerpt.toLowerCase().includes(q);
      const matchProf = entry.professorAnalysisPre1890.professorName.toLowerCase().includes(q) || 
                        entry.professorAnalysisPre1890.treatiseTitle.toLowerCase().includes(q);
      const matchConcepts = entry.keyThematicConcepts.some((c) => c.toLowerCase().includes(q));

      return matchTitle || matchAuthor || matchSummary || matchText || matchProf || matchConcepts;
    });
  }, [selectedCategory, searchQuery]);

  const activeEntry = useMemo(() => {
    const found = ENCYCLOPEDIA_AND_MYSTIC_DATA.find((e) => e.id === selectedEntryId);
    return found || filteredEntries[0] || ENCYCLOPEDIA_AND_MYSTIC_DATA[0];
  }, [selectedEntryId, filteredEntries]);

  // Find linked artifact if any
  const linkedArtifact = useMemo(() => {
    return artifacts.find((a) => a.id === activeEntry.id);
  }, [artifacts, activeEntry]);

  const handleCopyCitation = (entry: EncyclopediaEntry) => {
    const text = `[${entry.title} - ${entry.authorOrAttribution} (${entry.exactDateDisplay})]\n\nOriginal Text:\n${entry.originalTextExcerpt}\n\nPre-1890 Translation:\n${entry.pre1890Translation}\n\n19th-Century Professorial Commentary (${entry.professorAnalysisPre1890.professorName}, ${entry.professorAnalysisPre1890.publicationYear}):\n"${entry.professorAnalysisPre1890.directQuote}"\nSource: ${entry.professorAnalysisPre1890.treatiseTitle}`;
    navigator.clipboard.writeText(text);
    setCopiedId(entry.id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  return (
    <div className="w-full py-8 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Top Editorial Archival Header */}
      <div className="mb-8 border-b border-[#292523] pb-6">
        <div className="text-xs uppercase tracking-widest font-sans-clean text-[#a89f91] mb-2 flex items-center gap-2">
          <span>Comparative Religion & Mystic Epigraphy</span>
          <span aria-hidden="true">·</span>
          <span>Ra, Thoth & The Hermetica</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#e8b584]">Strictly Pre-1890 Scholarship</span>
        </div>
        <h1 className="text-3xl lg:text-5xl font-cinzel font-medium text-[#f5f2eb] tracking-tight">
          Encyclopedia of Religions & Mystic Wisdom
        </h1>
        <p className="mt-3 text-[#a8a29e] font-editorial text-lg max-w-3xl leading-relaxed">
          The oldest systematic encyclopedias of comparative religion in human history, alongside the sacred texts of Ra and Thoth, 
          19th-century decipherment professors (Champollion, Lepsius, Renouf, Maspero, Max Müller), and foundational pre-1890 treatises on free will and human nature.
        </p>

        {/* Pre-1890 Scholarly Guarantee Banner */}
        <div className="mt-5 p-4 bg-[#1a1715] border-l-4 border-[#e8b584] rounded-xs flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#e8b584] shrink-0 mt-0.5" />
          <div className="text-xs font-sans-clean text-[#c4b9aa] leading-relaxed">
            <strong className="text-[#f5f2eb]">Pre-1890 Archival Integrity Guarantee:</strong> All encyclopedic surveys, hieroglyphic recensions, philosophical diatribes, and academic commentaries featured in this section are dated strictly prior to 1890. Every item includes the original language notation, verbatim pre-1890 translation, primary professorial citations from pioneer Chairs of Philology, and direct links to public domain institutional repositories (Gallica BnF, Cambridge Newton MSS, British Museum, Oxford Bodleian, and the Escorial).
          </div>
        </div>
      </div>

      {/* Quick Access Badges for Key Domains */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <button
          onClick={() => {
            setSelectedCategory('encyclopedia-of-religions');
            setSelectedEntryId('ibn-hazm-milal-nihal');
          }}
          className={`p-3 rounded-xs border text-left transition-all ${
            selectedCategory === 'encyclopedia-of-religions'
              ? 'bg-[#221e1a] border-[#e8b584] shadow-sm'
              : 'bg-[#161412] border-[#292522] hover:border-[#423c36]'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-[#e8b584]" />
            <span className="text-xs font-cinzel font-semibold text-[#f5f2eb]">Oldest Encyclopedias</span>
          </div>
          <p className="text-[11px] text-[#8c827a] font-sans-clean">
            Ibn Hazm (1030 CE), Al-Biruni (1030 CE), Max Müller (1879), Dupuis (1795)
          </p>
        </button>

        <button
          onClick={() => {
            setSelectedCategory('mystic-ra-thoth');
            setSelectedEntryId('litany-of-ra-kv17');
          }}
          className={`p-3 rounded-xs border text-left transition-all ${
            selectedCategory === 'mystic-ra-thoth'
              ? 'bg-[#221e1a] border-[#e8b584] shadow-sm'
              : 'bg-[#161412] border-[#292522] hover:border-[#423c36]'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Sun className="w-4 h-4 text-[#d97736]" />
            <span className="text-xs font-cinzel font-semibold text-[#f5f2eb]">Ra & Thoth Mysteries</span>
          </div>
          <p className="text-[11px] text-[#8c827a] font-sans-clean">
            Litany of Ra (75 Names), Emerald Tablet, Papyrus of Ani, Poimandres
          </p>
        </button>

        <button
          onClick={() => {
            setSelectedCategory('pre-1890-professors');
            setSelectedEntryId('champollion-pantheon-egyptien');
          }}
          className={`p-3 rounded-xs border text-left transition-all ${
            selectedCategory === 'pre-1890-professors'
              ? 'bg-[#221e1a] border-[#e8b584] shadow-sm'
              : 'bg-[#161412] border-[#292522] hover:border-[#423c36]'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className="w-4 h-4 text-[#e8b584]" />
            <span className="text-xs font-cinzel font-semibold text-[#f5f2eb]">Pre-1890 Professors</span>
          </div>
          <p className="text-[11px] text-[#8c827a] font-sans-clean">
            Champollion (1823), Lepsius (1842), Renouf (1879), Maspero (1880)
          </p>
        </button>

        <button
          onClick={() => {
            setSelectedCategory('free-will-human-nature');
            setSelectedEntryId('epictetus-enchiridion-prohairesis');
          }}
          className={`p-3 rounded-xs border text-left transition-all ${
            selectedCategory === 'free-will-human-nature'
              ? 'bg-[#221e1a] border-[#e8b584] shadow-sm'
              : 'bg-[#161412] border-[#292522] hover:border-[#423c36]'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Scale className="w-4 h-4 text-[#5eead4]" />
            <span className="text-xs font-cinzel font-semibold text-[#f5f2eb]">Free Will & Human Nature</span>
          </div>
          <p className="text-[11px] text-[#8c827a] font-sans-clean">
            Epictetus (Prohairesis), Lucretius (Clinamen), Spinoza, Hume, Schopenhauer
          </p>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#181614] border border-[#2b2724] p-4 rounded-sm mb-8 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#7d756d]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by treatise, author (Ibn Hazm, Champollion, Spinoza...), hieroglyphic text, or concept (Prohairesis, Clinamen, Ma'at)..."
            className="w-full bg-[#121110] border border-[#332f2b] text-[#f5f2eb] pl-9 pr-4 py-2 text-xs rounded-xs focus:outline-none focus:border-[#e8b584]"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-sans-clean">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xs transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[#e4be92] text-[#141210] font-semibold'
                  : 'bg-[#211e1c] text-[#a8a29e] hover:text-[#f5f2eb]'
              }`}
            >
              All Corpora ({ENCYCLOPEDIA_AND_MYSTIC_DATA.length})
            </button>
            <button
              onClick={() => setSelectedCategory('encyclopedia-of-religions')}
              className={`px-3 py-1.5 rounded-xs transition-colors flex items-center gap-1 ${
                selectedCategory === 'encyclopedia-of-religions'
                  ? 'bg-[#e4be92] text-[#141210] font-semibold'
                  : 'bg-[#211e1c] text-[#a8a29e] hover:text-[#f5f2eb]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Oldest Encyclopedias
            </button>
            <button
              onClick={() => setSelectedCategory('mystic-ra-thoth')}
              className={`px-3 py-1.5 rounded-xs transition-colors flex items-center gap-1 ${
                selectedCategory === 'mystic-ra-thoth'
                  ? 'bg-[#e4be92] text-[#141210] font-semibold'
                  : 'bg-[#211e1c] text-[#a8a29e] hover:text-[#f5f2eb]'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              Ra & Thoth
            </button>
            <button
              onClick={() => setSelectedCategory('pre-1890-professors')}
              className={`px-3 py-1.5 rounded-xs transition-colors flex items-center gap-1 ${
                selectedCategory === 'pre-1890-professors'
                  ? 'bg-[#e4be92] text-[#141210] font-semibold'
                  : 'bg-[#211e1c] text-[#a8a29e] hover:text-[#f5f2eb]'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Professors on Ra & Thoth
            </button>
            <button
              onClick={() => setSelectedCategory('free-will-human-nature')}
              className={`px-3 py-1.5 rounded-xs transition-colors flex items-center gap-1 ${
                selectedCategory === 'free-will-human-nature'
                  ? 'bg-[#e4be92] text-[#141210] font-semibold'
                  : 'bg-[#211e1c] text-[#a8a29e] hover:text-[#f5f2eb]'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              Free Will & Human Nature
            </button>
          </div>

          <div className="text-[#8c827a] font-code text-[11px]">
            Showing {filteredEntries.length} of {ENCYCLOPEDIA_AND_MYSTIC_DATA.length} primary treatises
          </div>
        </div>
      </div>

      {/* Main Two-Column Master / Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: List of Treatises */}
        <div className="lg:col-span-4 space-y-2.5 max-h-[850px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredEntries.map((entry) => {
            const isSelected = activeEntry.id === entry.id;
            return (
              <div
                key={entry.id}
                onClick={() => setSelectedEntryId(entry.id)}
                className={`p-3.5 rounded-sm border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#221e1a] border-[#e4be92] shadow-sm'
                    : 'bg-[#181614] border-[#2b2724] hover:border-[#423c36]'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className={`font-cinzel text-xs font-semibold leading-snug ${isSelected ? 'text-[#f5f2eb]' : 'text-[#cfc5b8]'}`}>
                    {entry.title}
                  </span>
                </div>

                <div className="text-[11px] text-[#e8b584] font-sans-clean mt-0.5">
                  {entry.authorOrAttribution}
                </div>

                <div className="flex items-center justify-between text-[10px] text-[#8c827a] font-code mt-1.5">
                  <span>{entry.exactDateDisplay}</span>
                  <span className="capitalize px-1.5 py-0.5 bg-[#121110] border border-[#2b2724] rounded-xs text-[#a89f91]">
                    {entry.category.replace(/-/g, ' ')}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap gap-1">
                  {entry.keyThematicConcepts.slice(0, 3).map((concept, idx) => (
                    <span key={idx} className="text-[9px] bg-[#141210] border border-[#272320] text-[#7d756d] px-1.5 py-0.2 rounded-xs">
                      {concept}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Deep Inspection of Selected Treatise */}
        <div className="lg:col-span-8 space-y-6">
          {activeEntry && (
            <div className="bg-[#181614] border border-[#332f2b] p-6 lg:p-8 rounded-sm space-y-6">
              {/* Header Info */}
              <div className="border-b border-[#292522] pb-5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-code text-[#e8b584] uppercase tracking-wider">
                    {activeEntry.primarySubject}
                  </span>
                  <span className="px-2 py-0.5 bg-[#201d1a] border border-[#38332d] text-[#e8b584] text-[11px] font-code rounded-xs">
                    {activeEntry.exactDateDisplay}
                  </span>
                </div>

                <h2 className="text-2xl lg:text-3xl font-cinzel font-semibold text-[#f5f2eb]">
                  {activeEntry.title}
                </h2>

                <div className="mt-2 text-xs font-sans-clean text-[#cfc5b8] flex flex-wrap items-center gap-4">
                  <span><strong>Author / Source:</strong> {activeEntry.authorOrAttribution}</span>
                  <span><strong>Original Language:</strong> {activeEntry.originalLanguage}</span>
                </div>

                <p className="mt-3 text-xs lg:text-sm font-editorial text-[#a8a29e] leading-relaxed">
                  {activeEntry.unvarnishedSummary}
                </p>

                {/* Quick actions: Link to Dossier / Multispectral if exists */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleCopyCitation(activeEntry)}
                    className="px-3 py-1.5 bg-[#25211d] hover:bg-[#322c26] text-xs font-sans-clean text-[#f5f2eb] rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-[#38332d]"
                  >
                    {copiedId === activeEntry.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Citation Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#e8b584]" />
                        <span>Copy Academic Citation</span>
                      </>
                    )}
                  </button>

                  {linkedArtifact && (
                    <>
                      <button
                        onClick={() => onOpenArtifact(linkedArtifact)}
                        className="px-3 py-1.5 bg-[#221e1a] hover:bg-[#2e2924] text-xs font-sans-clean text-[#f5f2eb] rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-[#3e3730]"
                      >
                        <Scroll className="w-3.5 h-3.5 text-[#e8b584]" />
                        Open Epigraphic Dossier
                      </button>
                      <button
                        onClick={() => onOpenMultispectral(linkedArtifact)}
                        className="px-3 py-1.5 bg-[#e4be92] hover:bg-[#eed0ad] text-[#141210] text-xs font-sans-clean font-semibold rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        Multispectral Scan
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Original Language Inscription / Excerpt */}
              <div className="p-4 bg-[#11100e] border border-[#26221f] rounded-xs space-y-2">
                <div className="text-[10px] font-sans-clean uppercase tracking-wider text-[#8c827a] flex items-center justify-between">
                  <span>Original Primary Script & Epigraphic Text</span>
                  <span className="font-code text-[#e8b584]">{activeEntry.originalLanguage}</span>
                </div>
                <div className="font-code text-xs lg:text-sm text-[#e8b584] leading-relaxed whitespace-pre-line break-words select-text">
                  {activeEntry.originalTextExcerpt}
                </div>
              </div>

              {/* Pre-1890 Literal Translation */}
              <div className="p-4 bg-[#161412] border border-[#2b2724] rounded-xs space-y-2">
                <div className="text-[10px] font-sans-clean uppercase tracking-wider text-[#8c827a] flex items-center justify-between">
                  <span>Pre-1890 Word-for-Word Literal Translation</span>
                  <span className="text-[10px] text-[#a89f91]">{activeEntry.translatorOrCurator}</span>
                </div>
                <p className="font-editorial text-xs lg:text-sm text-[#e4decb] italic leading-relaxed">
                  {activeEntry.pre1890Translation}
                </p>
              </div>

              {/* 19th-Century Professorial Commentary (Strictly Pre-1890) */}
              <div className="p-5 bg-[#1b1815] border-l-4 border-[#e8b584] rounded-xs space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#e8b584]" />
                    <span className="font-cinzel text-xs font-semibold text-[#f5f2eb]">
                      {activeEntry.professorAnalysisPre1890.professorName} ({activeEntry.professorAnalysisPre1890.publicationYear})
                    </span>
                  </div>
                  <span className="text-[10px] font-code text-[#a89f91]">
                    {activeEntry.professorAnalysisPre1890.academicPost}
                  </span>
                </div>

                <div className="text-[11px] font-code text-[#e8b584]">
                  Treatise: {activeEntry.professorAnalysisPre1890.treatiseTitle}
                </div>

                <blockquote className="font-editorial text-xs lg:text-sm text-[#c4b9aa] italic leading-relaxed pt-1 border-t border-[#292522]">
                  {activeEntry.professorAnalysisPre1890.directQuote}
                </blockquote>
              </div>

              {/* Verified Pure Source Repositories */}
              <div>
                <h3 className="text-xs font-cinzel font-semibold text-[#f5f2eb] uppercase tracking-wider mb-2.5 flex items-center gap-2">
                  <Landmark className="w-3.5 h-3.5 text-[#e8b584]" />
                  Verified Pure Source Repositories (Public Domain Scans)
                </h3>
                <div className="space-y-2">
                  {activeEntry.pureSourceLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-[#13110f] hover:bg-[#1a1714] border border-[#2b2724] hover:border-[#e4be92] rounded-xs transition-colors flex items-center justify-between gap-3 text-left group"
                    >
                      <div className="space-y-0.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-cinzel font-semibold text-[#e8b584] group-hover:text-[#f5f2eb]">
                            {link.repositoryName}
                          </span>
                          <span className="text-[9px] px-1.5 py-0.2 bg-[#221f1c] text-[#a8a29e] rounded-xs border border-[#332f2b]">
                            {link.archiveType}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#8c827a] leading-relaxed">
                          {link.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[#e4be92] group-hover:text-[#edd0ae] shrink-0 font-sans-clean">
                        <span>Open Pure Source</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Thematic Tags */}
              <div className="pt-2 border-t border-[#26221f] flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] text-[#7d756d] uppercase font-sans-clean mr-1">Thematic Indices:</span>
                {activeEntry.keyThematicConcepts.map((concept, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-[#121110] border border-[#2b2724] text-[#a89f91] px-2 py-0.5 rounded-xs"
                  >
                    #{concept}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
