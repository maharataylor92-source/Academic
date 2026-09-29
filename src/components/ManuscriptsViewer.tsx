import React, { useState, useMemo } from 'react';
import { 
  COMPLETE_MANUSCRIPTS, 
  CompleteManuscriptDossier, 
  ManuscriptChapter, 
  PureSourceLink 
} from '../data/completeManuscripts';
import { Artifact } from '../data/artifacts';
import { 
  BookOpen, 
  ExternalLink, 
  Search, 
  Filter, 
  ShieldCheck, 
  Layers, 
  Copy, 
  Check, 
  Scroll, 
  Sparkles, 
  Compass, 
  FileText, 
  Landmark, 
  Globe 
} from 'lucide-react';

interface ManuscriptsViewerProps {
  artifacts: Artifact[];
  onOpenArtifact: (art: Artifact) => void;
  onOpenMultispectral: (art: Artifact) => void;
}

export const ManuscriptsViewer: React.FC<ManuscriptsViewerProps> = ({
  artifacts,
  onOpenArtifact,
  onOpenMultispectral,
}) => {
  const [selectedManuscriptKey, setSelectedManuscriptKey] = useState<string>('ethiopian-book-of-enoch');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedChapterIndex, setCopiedChapterIndex] = useState<number | null>(null);

  const allManuscripts = useMemo(() => {
    return Object.entries(COMPLETE_MANUSCRIPTS).map(([key, ms]) => {
      const art = artifacts.find((a) => a.id === ms.artifactId);
      return {
        key,
        ...ms,
        artifact: art,
      };
    });
  }, [artifacts]);

  const filteredManuscripts = useMemo(() => {
    return allManuscripts.filter((ms) => {
      // Category filter
      if (selectedCategory === 'sacred') {
        const isSacred = ms.artifact?.mysticRecord?.isMysticText || 
          ms.artifactId.includes('sutra') || 
          ms.artifactId.includes('enoch') || 
          ms.artifactId.includes('jubilees') || 
          ms.artifactId.includes('isaiah') || 
          ms.artifactId.includes('garima') ||
          ms.artifactId.includes('ra') ||
          ms.artifactId.includes('thoth');
        if (!isSacred) return false;
      } else if (selectedCategory === 'ra-thoth') {
        const isRaThoth = ms.artifactId.includes('ra') || ms.artifactId.includes('thoth') || ms.artifactId.includes('ani');
        if (!isRaThoth) return false;
      } else if (selectedCategory === 'free-will-encyclopedia') {
        const isFreeWill = ms.artifactId.includes('epictetus') || ms.artifactId.includes('spinoza') || ms.artifactId.includes('schopenhauer') || ms.artifactId.includes('hazm');
        if (!isFreeWill) return false;
      } else if (selectedCategory === 'undeciphered') {
        const isUndeciphered = (ms.artifact?.deciphermentScore || 0) < 50;
        if (!isUndeciphered) return false;
      } else if (selectedCategory === 'cuneiform-near-east') {
        const isNearEast = ms.artifactId.includes('uruk') || ms.artifactId.includes('susa') || ms.artifactId.includes('gobekli');
        if (!isNearEast) return false;
      }

      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchTitle = ms.manuscriptTitle.toLowerCase().includes(q);
      const matchArtifactTitle = ms.artifact?.title.toLowerCase().includes(q) || false;
      const matchChapters = ms.chapters.some(
        (c) => c.label.toLowerCase().includes(q) || 
               c.englishLiteral.toLowerCase().includes(q) || 
               c.originalTextSnippet.toLowerCase().includes(q)
      );
      const matchSources = ms.pureSourceLinks.some(
        (s) => s.repositoryName.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      );

      return matchTitle || matchArtifactTitle || matchChapters || matchSources;
    });
  }, [allManuscripts, selectedCategory, searchQuery]);

  const activeManuscript = useMemo(() => {
    const found = allManuscripts.find((m) => m.key === selectedManuscriptKey);
    return found || allManuscripts[0];
  }, [allManuscripts, selectedManuscriptKey]);

  const handleCopyChapter = (chapter: ManuscriptChapter) => {
    const textToCopy = `[${activeManuscript.manuscriptTitle} - ${chapter.label}]\nOriginal Inscription:\n${chapter.originalTextSnippet}\n\nUnvarnished Literal Translation:\n${chapter.englishLiteral}\n\nAcademic Note:\n${chapter.academicNotes}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedChapterIndex(chapter.index);
    setTimeout(() => setCopiedChapterIndex(null), 2000);
  };

  return (
    <div className="w-full py-8 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Top Editorial Archival Banner */}
      <div className="mb-8 border-b border-[#292523] pb-6">
        <div className="text-xs uppercase tracking-widest font-sans-clean text-[#a89f91] mb-2 flex items-center gap-2">
          <span>Complete Uncensored Manuscripts & Primary Epigraphic Corpora</span>
          <span aria-hidden="true">·</span>
          <span>Open Public Domain Access</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#d89759]">Pure Source Institutional Repositories</span>
        </div>
        <h1 className="text-3xl lg:text-5xl font-cinzel font-medium text-[#f5f2eb] tracking-tight">
          Complete Manuscripts & Pure Sources
        </h1>
        <p className="mt-3 text-[#a8a29e] font-editorial text-lg max-w-3xl leading-relaxed">
          Archaica preserves complete surviving chapters, uninterrupted inscriptions, and line-by-line literal translations for all primary texts in the archive. 
          To protect scholarly integrity and respect open access, every single work is accompanied by direct, verifiable links to the world’s purest curatorial vaults—free from imperial revisionism and copyright gatekeeping.
        </p>

        {/* Legal & Open Access Notice Banner */}
        <div className="mt-5 p-4 bg-[#1b1815] border-l-4 border-emerald-500 rounded-xs flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs font-sans-clean text-[#c4b9aa] leading-relaxed">
            <strong className="text-[#f5f2eb]">Pure Source & Open-Access Guarantee:</strong> All primary inscriptions, Ge'ez codices, Chinese sutras, Dead Sea Scrolls, and proto-cuneiform tablets featured here are in the worldwide public domain (pre-1929 / ancient heritage) or made available under open academic agreements. For physical specimens preserved under institutional vaults, direct links connect researchers directly to the official scans of the British Library, Israel Antiquities Authority, International Dunhuang Programme, Hill Museum & Manuscript Library, and Musée du Louvre.
          </div>
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="bg-[#181614] border border-[#2b2724] p-4 rounded-sm mb-8 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#7d756d]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search manuscripts by title, original script, unvarnished translation, or institutional repository..."
            className="w-full bg-[#121110] border border-[#332f2b] text-[#f5f2eb] pl-9 pr-4 py-2 text-xs rounded-xs focus:outline-none focus:border-[#e8b584]"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-sans-clean">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xs transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[#e4be92] text-[#141210] font-semibold'
                  : 'bg-[#211e1c] text-[#a8a29e] hover:text-[#f5f2eb]'
              }`}
            >
              All Manuscripts ({allManuscripts.length})
            </button>
            <button
              onClick={() => setSelectedCategory('sacred')}
              className={`px-3 py-1.5 rounded-xs transition-colors flex items-center gap-1 ${
                selectedCategory === 'sacred'
                  ? 'bg-[#e4be92] text-[#141210] font-semibold'
                  : 'bg-[#211e1c] text-[#a8a29e] hover:text-[#f5f2eb]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Sacred Sutras & Mystic Scriptures
            </button>
            <button
              onClick={() => setSelectedCategory('ra-thoth')}
              className={`px-3 py-1.5 rounded-xs transition-colors flex items-center gap-1 ${
                selectedCategory === 'ra-thoth'
                  ? 'bg-[#e4be92] text-[#141210] font-semibold'
                  : 'bg-[#211e1c] text-[#a8a29e] hover:text-[#f5f2eb]'
              }`}
            >
              <span>☀️</span>
              Ra & Thoth (Litany & Emerald Tablet)
            </button>
            <button
              onClick={() => setSelectedCategory('free-will-encyclopedia')}
              className={`px-3 py-1.5 rounded-xs transition-colors flex items-center gap-1 ${
                selectedCategory === 'free-will-encyclopedia'
                  ? 'bg-[#e4be92] text-[#141210] font-semibold'
                  : 'bg-[#211e1c] text-[#a8a29e] hover:text-[#f5f2eb]'
              }`}
            >
              <span>⚖️</span>
              Free Will & Oldest Encyclopedias
            </button>
            <button
              onClick={() => setSelectedCategory('undeciphered')}
              className={`px-3 py-1.5 rounded-xs transition-colors ${
                selectedCategory === 'undeciphered'
                  ? 'bg-[#e4be92] text-[#141210] font-semibold'
                  : 'bg-[#211e1c] text-[#a8a29e] hover:text-[#f5f2eb]'
              }`}
            >
              Undeciphered Corpora
            </button>
            <button
              onClick={() => setSelectedCategory('cuneiform-near-east')}
              className={`px-3 py-1.5 rounded-xs transition-colors ${
                selectedCategory === 'cuneiform-near-east'
                  ? 'bg-[#e4be92] text-[#141210] font-semibold'
                  : 'bg-[#211e1c] text-[#a8a29e] hover:text-[#f5f2eb]'
              }`}
            >
              Mesopotamian & Anatolian Epigraphs
            </button>
          </div>

          <div className="text-[#8c827a] font-code text-[11px]">
            Showing {filteredManuscripts.length} of {allManuscripts.length} primary texts
          </div>
        </div>
      </div>

      {/* Main Two-Column Master/Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: List of All Primary Manuscripts */}
        <div className="lg:col-span-4 space-y-2 max-h-[850px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredManuscripts.map((ms) => {
            const isSelected = activeManuscript.key === ms.key;
            return (
              <div
                key={ms.key}
                onClick={() => setSelectedManuscriptKey(ms.key)}
                className={`p-3.5 rounded-sm border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#221e1a] border-[#e4be92] shadow-sm'
                    : 'bg-[#181614] border-[#2b2724] hover:border-[#423c36]'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className={`font-cinzel text-xs font-semibold leading-snug ${isSelected ? 'text-[#f5f2eb]' : 'text-[#cfc5b8]'}`}>
                    {ms.manuscriptTitle}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#8c827a] font-code mt-1">
                  <span className="text-[#e8b584]">{ms.artifact?.culture || 'Primary Source'}</span>
                  <span>{ms.artifact?.dateDisplay}</span>
                </div>

                <div className="mt-2 flex items-center gap-1.5 text-[10px] text-[#a89f91] font-sans-clean">
                  <Scroll className="w-3 h-3 text-[#d97736]" />
                  <span className="truncate">{ms.foliationCount}</span>
                </div>

                <div className="mt-1.5 flex items-center justify-between text-[10px] text-[#7d756d]">
                  <span className="px-1.5 py-0.5 bg-[#121110] border border-[#2d2926] rounded-xs text-emerald-400">
                    {ms.pureSourceLinks.length} Curatorial Link{ms.pureSourceLinks.length > 1 ? 's' : ''}
                  </span>
                  <span className="text-[#a8a29e]">{ms.chapters.length} Section{ms.chapters.length > 1 ? 's' : ''}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Deep Manuscript Text & Pure Sources View */}
        <div className="lg:col-span-8 space-y-6">
          {activeManuscript && (
            <div className="bg-[#181614] border border-[#332f2b] p-6 lg:p-8 rounded-sm">
              {/* Manuscript Master Header */}
              <div className="border-b border-[#292522] pb-5 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-code text-[#e8b584] uppercase tracking-wider">
                      {activeManuscript.licenseStatus}
                    </span>
                    <span className="text-[#7d756d]" aria-hidden="true">·</span>
                    <span className="text-xs font-sans-clean text-[#a89f91]">
                      {activeManuscript.artifact?.accessionCode || 'Archival Registry'}
                    </span>
                  </div>

                  <span className="px-2 py-0.5 bg-emerald-950/60 border border-emerald-600/50 text-emerald-300 text-[11px] font-sans-clean rounded-xs flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    {activeManuscript.completeTextState}
                  </span>
                </div>

                <h2 className="text-2xl lg:text-3xl font-cinzel font-semibold text-[#f5f2eb]">
                  {activeManuscript.manuscriptTitle}
                </h2>

                <div className="mt-2 text-xs font-sans-clean text-[#a8a29e] flex flex-wrap items-center gap-4">
                  <span><strong>Medium & Foliation:</strong> {activeManuscript.foliationCount}</span>
                  <span><strong>Date:</strong> {activeManuscript.artifact?.dateDisplay}</span>
                  <span><strong>Repository:</strong> {activeManuscript.artifact?.curatorialRepository}</span>
                </div>

                {/* Copyright disclaimer */}
                <div className="mt-3 p-3 bg-[#13110f] border border-[#2b2724] rounded-xs text-[11px] font-sans-clean text-[#8c827a] leading-relaxed">
                  <span className="text-[#e8b584] font-medium uppercase text-[10px] block mb-0.5">Licensing & Primary Provenance:</span>
                  {activeManuscript.copyrightDisclaimer}
                </div>

                {/* Quick Action Navigation Buttons */}
                {activeManuscript.artifact && (
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => onOpenArtifact(activeManuscript.artifact!)}
                      className="px-3 py-1.5 bg-[#25211d] hover:bg-[#322c26] text-xs font-sans-clean text-[#f5f2eb] rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#e8b584]" />
                      Open Full Dossier & Bias Warning
                    </button>
                    <button
                      onClick={() => onOpenMultispectral(activeManuscript.artifact!)}
                      className="px-3 py-1.5 bg-[#e4be92] hover:bg-[#eed0ad] text-[#141210] text-xs font-sans-clean font-semibold rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      Multispectral RTI & UV Examination
                    </button>
                  </div>
                )}
              </div>

              {/* Verified Pure Source Links Section (Clickable External Links) */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-cinzel font-semibold text-[#f5f2eb] uppercase tracking-wider flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-[#e8b584]" />
                    Verified Pure Source Repositories (Direct External Access)
                  </h3>
                  <span className="text-[10px] font-sans-clean text-[#8c827a]">
                    Authenticated Institutional Scans
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {activeManuscript.pureSourceLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-[#141210] hover:bg-[#1a1714] border border-[#2d2926] hover:border-[#e4be92] rounded-xs transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-cinzel font-semibold text-[#e8b584] group-hover:text-[#f5f2eb] transition-colors">
                            {link.repositoryName}
                          </span>
                          <span className="px-1.5 py-0.5 bg-[#221f1c] text-[10px] font-sans-clean text-[#a89f91] rounded-xs border border-[#332f2b]">
                            {link.type}
                          </span>
                        </div>
                        <p className="text-xs font-editorial text-[#a8a29e] leading-relaxed">
                          {link.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-sans-clean text-[#e4be92] group-hover:text-[#edd0ae] shrink-0 font-medium bg-[#211e1b] px-3 py-2 rounded-xs border border-[#38332d]">
                        <span>Open Pure Source</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Complete Manuscript Text & Chapters Reader */}
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#26221f]">
                  <h3 className="text-sm font-cinzel font-semibold text-[#f5f2eb] uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#e8b584]" />
                    Complete Surviving Text & Unvarnished Translations
                  </h3>
                  <span className="text-xs font-code text-[#8c827a]">
                    {activeManuscript.chapters.length} Section{activeManuscript.chapters.length > 1 ? 's' : ''} Documented
                  </span>
                </div>

                <div className="space-y-6">
                  {activeManuscript.chapters.map((chapter) => (
                    <div 
                      key={chapter.index} 
                      className="p-5 bg-[#141210] border border-[#2b2724] rounded-xs space-y-4"
                    >
                      {/* Chapter Label & Copy Action */}
                      <div className="flex items-center justify-between border-b border-[#221f1d] pb-2.5">
                        <span className="text-xs font-cinzel font-semibold text-[#e8b584]">
                          {chapter.label}
                        </span>

                        <button
                          onClick={() => handleCopyChapter(chapter)}
                          className="px-2.5 py-1 bg-[#1e1b18] hover:bg-[#282420] text-[11px] font-sans-clean text-[#a8a29e] hover:text-[#f5f2eb] rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-[#332f2b]"
                          title="Copy chapter text and translation"
                        >
                          {copiedChapterIndex === chapter.index ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Excerpt</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Original Sacred Script / Transliteration */}
                      <div className="p-3.5 bg-[#0f0e0d] border border-[#24211e] rounded-xs">
                        <div className="text-[10px] font-sans-clean uppercase tracking-wider text-[#8c827a] mb-1.5">
                          Original Epigraphic / Script Inscription
                        </div>
                        <div className="font-code text-xs lg:text-sm text-[#e8b584] leading-relaxed whitespace-pre-line break-words select-text">
                          {chapter.originalTextSnippet}
                        </div>
                      </div>

                      {/* Unvarnished Literal Translation */}
                      <div>
                        <div className="text-[10px] font-sans-clean uppercase tracking-wider text-[#8c827a] mb-1">
                          Unvarnished Word-for-Word Literal Translation (No Imperial / Victor Distortion)
                        </div>
                        <p className="text-xs lg:text-sm font-editorial text-[#d4cbbe] leading-relaxed italic bg-[#171513] p-3.5 rounded-xs border border-[#26221f]">
                          {chapter.englishLiteral}
                        </p>
                      </div>

                      {/* Academic Epigraphic & Provenance Notes */}
                      <div className="text-[11px] font-sans-clean text-[#9c9387] bg-[#161311] p-3 rounded-xs border border-[#221f1c] flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#e8b584] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">
                          <strong>Academic & Epigraphic Context:</strong> {chapter.academicNotes}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Worldwide Open Curatorial Repositories Index */}
      <div className="mt-12 bg-[#181614] border border-[#2b2724] p-6 lg:p-8 rounded-sm">
        <div className="border-b border-[#292523] pb-4 mb-6">
          <div className="text-xs font-code text-[#e8b584] uppercase tracking-wider mb-1 flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#e8b584]" />
            Global Primary Repositories Concordance
          </div>
          <h2 className="text-xl lg:text-2xl font-cinzel font-semibold text-[#f5f2eb]">
            Curatorial Institutions Preserving the Pure Sources
          </h2>
          <p className="text-xs text-[#a8a29e] font-editorial mt-1 max-w-2xl leading-relaxed">
            Direct access to the world’s leading digital libraries hosting primary archaeological scans, multispectral photographic archives, and public domain historical corpora.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="https://www.bl.uk/manuscripts"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-[#141210] hover:bg-[#1c1916] border border-[#2d2926] hover:border-[#e4be92] rounded-xs transition-colors group block"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-cinzel font-semibold text-[#f5f2eb] group-hover:text-[#e8b584]">
                British Library Digitised Manuscripts
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[#8c827a] group-hover:text-[#e8b584]" />
            </div>
            <p className="text-[11px] text-[#8c827a] font-sans-clean leading-relaxed">
              Diamond Sutra (Or.8210/P.2), Gandharan birch bark scrolls, and Ethiopian Ge'ez royal codices.
            </p>
          </a>

          <a
            href="https://www.deadseascrolls.org.il"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-[#141210] hover:bg-[#1c1916] border border-[#2d2926] hover:border-[#e4be92] rounded-xs transition-colors group block"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-cinzel font-semibold text-[#f5f2eb] group-hover:text-[#e8b584]">
                Leon Levy Dead Sea Scrolls Library
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[#8c827a] group-hover:text-[#e8b584]" />
            </div>
            <p className="text-[11px] text-[#8c827a] font-sans-clean leading-relaxed">
              Israel Antiquities Authority multispectral 28-wavelength imaging of Qumran Isaiah, Enoch, and Jubilees.
            </p>
          </a>

          <a
            href="http://idp.bl.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-[#141210] hover:bg-[#1c1916] border border-[#2d2926] hover:border-[#e4be92] rounded-xs transition-colors group block"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-cinzel font-semibold text-[#f5f2eb] group-hover:text-[#e8b584]">
                International Dunhuang Programme (IDP)
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[#8c827a] group-hover:text-[#e8b584]" />
            </div>
            <p className="text-[11px] text-[#8c827a] font-sans-clean leading-relaxed">
              Complete digital archive of Dunhuang Mogao Cave 17 manuscripts and Silk Road artifacts.
            </p>
          </a>

          <a
            href="https://hmml.org"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-[#141210] hover:bg-[#1c1916] border border-[#2d2926] hover:border-[#e4be92] rounded-xs transition-colors group block"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-cinzel font-semibold text-[#f5f2eb] group-hover:text-[#e8b584]">
                Hill Museum & Manuscript Library (HMML)
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[#8c827a] group-hover:text-[#e8b584]" />
            </div>
            <p className="text-[11px] text-[#8c827a] font-sans-clean leading-relaxed">
              Global repository preserving over 300,000 photographic facsimiles of Ethiopian monastic vellum codices.
            </p>
          </a>

          <a
            href="https://cdli.mpiwg-berlin.mpg.de"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-[#141210] hover:bg-[#1c1916] border border-[#2d2926] hover:border-[#e4be92] rounded-xs transition-colors group block"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-cinzel font-semibold text-[#f5f2eb] group-hover:text-[#e8b584]">
                Cuneiform Digital Library Initiative (CDLI)
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[#8c827a] group-hover:text-[#e8b584]" />
            </div>
            <p className="text-[11px] text-[#8c827a] font-sans-clean leading-relaxed">
              Max Planck & UCLA repository with 500,000+ cuneiform, proto-cuneiform, and proto-Elamite 3D RTI scans.
            </p>
          </a>

          <a
            href="https://collections.louvre.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-[#141210] hover:bg-[#1c1916] border border-[#2d2926] hover:border-[#e4be92] rounded-xs transition-colors group block"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-cinzel font-semibold text-[#f5f2eb] group-hover:text-[#e8b584]">
                Musée du Louvre Collections
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[#8c827a] group-hover:text-[#e8b584]" />
            </div>
            <p className="text-[11px] text-[#8c827a] font-sans-clean leading-relaxed">
              Official high-resolution photography and curatorial registers of Near Eastern Antiquities (Susa Sb 1516).
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};
