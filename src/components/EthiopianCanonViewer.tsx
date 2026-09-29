import React, { useState, useMemo } from 'react';
import { ETHIOPIAN_81_BOOKS, EthiopianCanonBook } from '../data/ethiopianCanon';
import { Artifact } from '../data/artifacts';
import { 
  BookOpen, 
  Sparkles, 
  Layers, 
  Filter, 
  Search, 
  ShieldCheck, 
  Scroll, 
  Star, 
  Compass, 
  ChevronRight,
  ExternalLink,
  Landmark 
} from 'lucide-react';

interface EthiopianCanonViewerProps {
  artifacts: Artifact[];
  onOpenArtifact: (art: Artifact) => void;
  onOpenMultispectral: (art: Artifact) => void;
}

export const EthiopianCanonViewer: React.FC<EthiopianCanonViewerProps> = ({
  artifacts,
  onOpenArtifact,
  onOpenMultispectral,
}) => {
  const [selectedTestament, setSelectedTestament] = useState<'all' | 'ot' | 'nt'>('all');
  const [onlyUnique, setOnlyUnique] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeBook, setActiveBook] = useState<EthiopianCanonBook>(ETHIOPIAN_81_BOOKS[9]); // 1 Enoch by default

  const filteredBooks = useMemo(() => {
    return ETHIOPIAN_81_BOOKS.filter((b) => {
      const matchesTestament =
        selectedTestament === 'all' ||
        (selectedTestament === 'ot' && b.testament.includes('Old')) ||
        (selectedTestament === 'nt' && b.testament.includes('New'));

      const matchesUnique = !onlyUnique || b.uniqueToEthiopia;

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        b.englishTitle.toLowerCase().includes(q) ||
        b.geezTitle.toLowerCase().includes(q) ||
        b.transliteratedTitle.toLowerCase().includes(q) ||
        b.summary.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q);

      return matchesTestament && matchesUnique && matchesSearch;
    });
  }, [selectedTestament, onlyUnique, searchQuery]);

  // Find linked artifact if available
  const linkedArtifact = useMemo(() => {
    if (activeBook.englishTitle.includes('Enoch')) {
      return artifacts.find((a) => a.id === 'ethiopian-book-of-enoch');
    }
    if (activeBook.englishTitle.includes('Jubilees')) {
      return artifacts.find((a) => a.id === 'ethiopian-book-of-jubilees');
    }
    if (activeBook.englishTitle.includes('Gospel')) {
      return artifacts.find((a) => a.id === 'garima-gospels-ethiopia');
    }
    return artifacts.find((a) => a.id === 'garima-gospels-ethiopia');
  }, [activeBook, artifacts]);

  return (
    <div className="w-full py-8 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="mb-8 border-b border-[#292523] pb-6">
        <div className="text-xs uppercase tracking-widest font-sans-clean text-[#a89f91] mb-2 flex items-center gap-2">
          <span>The Complete 81-Book Ethiopian Orthodox Tewahedo Canon</span>
          <span aria-hidden="true">·</span>
          <span>Ge'ez Sacred Scripture</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#d89759]">World's Oldest & Most Complete Bible</span>
        </div>
        <h1 className="text-3xl lg:text-5xl font-cinzel font-medium text-[#f5f2eb] tracking-tight">
          The Ethiopian Biblical Archive
        </h1>
        <p className="mt-3 text-[#a8a29e] font-editorial text-lg max-w-3xl leading-relaxed">
          While Western European councils suppressed and reduced the Biblical canon to 66 or 73 books, 
          the highland monasteries of Ethiopia faithfully preserved the complete <strong>81 Books of Holy Scripture</strong> in classical Ge'ez fidel. 
          Including the complete Book of Enoch, Jubilees, the three books of Meqabyan, 4 Baruch, and the ancient Apostolic Sinodos.
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-[#181614] border border-[#2d2926] rounded-sm">
          <div className="text-xs text-[#8c827a] font-sans-clean uppercase tracking-wider">Total Sacred Books</div>
          <div className="text-2xl lg:text-3xl font-code text-[#e4be92] font-bold mt-1">81 Books</div>
          <div className="text-[11px] text-[#a89f91] mt-0.5">46 Old Testament · 35 New Testament</div>
        </div>

        <div className="p-4 bg-[#181614] border border-[#2d2926] rounded-sm">
          <div className="text-xs text-[#8c827a] font-sans-clean uppercase tracking-wider">Unique / Excluded in West</div>
          <div className="text-2xl lg:text-3xl font-code text-[#e88d4d] font-bold mt-1">11 Books</div>
          <div className="text-[11px] text-[#a89f91] mt-0.5">Enoch, Jubilees, Meqabyan 1-3, 4 Baruch, Sinodos</div>
        </div>

        <div className="p-4 bg-[#181614] border border-[#2d2926] rounded-sm">
          <div className="text-xs text-[#8c827a] font-sans-clean uppercase tracking-wider">Sacred Script Medium</div>
          <div className="text-2xl lg:text-3xl font-code text-[#f5f2eb] font-bold mt-1">Ge'ez Fidel</div>
          <div className="text-[11px] text-[#a89f91] mt-0.5">Vocalized syllabary on goatskin vellum</div>
        </div>

        <div className="p-4 bg-[#181614] border border-[#2d2926] rounded-sm">
          <div className="text-xs text-[#8c827a] font-sans-clean uppercase tracking-wider">Oldest Physical Survivor</div>
          <div className="text-2xl lg:text-3xl font-code text-emerald-400 font-bold mt-1">390–530 CE</div>
          <div className="text-[11px] text-[#a89f91] mt-0.5">Abba Garima Gospels (Tigray Highlands)</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#181614] border border-[#2b2724] p-4 rounded-sm mb-8 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#7d756d]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Ge'ez name, English title, category, or theological theme..."
            className="w-full bg-[#121110] border border-[#332f2b] text-[#f5f2eb] pl-9 pr-4 py-2 text-xs rounded-xs focus:outline-none focus:border-[#e8b584]"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-sans-clean">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedTestament('all')}
              className={`px-3 py-1.5 rounded-xs transition-colors ${
                selectedTestament === 'all'
                  ? 'bg-[#e4be92] text-[#141210] font-semibold'
                  : 'bg-[#211e1c] text-[#a8a29e] hover:text-[#f5f2eb]'
              }`}
            >
              All 81 Books
            </button>
            <button
              onClick={() => setSelectedTestament('ot')}
              className={`px-3 py-1.5 rounded-xs transition-colors ${
                selectedTestament === 'ot'
                  ? 'bg-[#e4be92] text-[#141210] font-semibold'
                  : 'bg-[#211e1c] text-[#a8a29e] hover:text-[#f5f2eb]'
              }`}
            >
              Old Testament (46)
            </button>
            <button
              onClick={() => setSelectedTestament('nt')}
              className={`px-3 py-1.5 rounded-xs transition-colors ${
                selectedTestament === 'nt'
                  ? 'bg-[#e4be92] text-[#141210] font-semibold'
                  : 'bg-[#211e1c] text-[#a8a29e] hover:text-[#f5f2eb]'
              }`}
            >
              New Testament (35)
            </button>

            <label className="flex items-center gap-2 ml-2 text-xs text-[#d4cbbe] cursor-pointer bg-[#24201c] px-3 py-1.5 rounded-xs border border-[#38332c]">
              <input
                type="checkbox"
                checked={onlyUnique}
                onChange={(e) => setOnlyUnique(e.target.checked)}
                className="rounded-xs accent-[#e4be92]"
              />
              <span className="text-[#e8b584] font-medium">Unique to Ethiopian Canon Only</span>
            </label>
          </div>

          <div className="text-[#8c827a] font-code text-[11px]">
            Showing {filteredBooks.length} of 81 canonical books
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout: Book Directory on Left, Deep Book Profile on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Scrollable List of Books */}
        <div className="lg:col-span-5 space-y-2 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredBooks.map((book) => {
            const isSelected = activeBook.number === book.number;
            return (
              <div
                key={book.number}
                onClick={() => setActiveBook(book)}
                className={`p-3.5 rounded-sm border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#201c18] border-[#e4be92] shadow-sm'
                    : 'bg-[#181614] border-[#2b2724] hover:border-[#423c36]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-code text-xs text-[#8c827a] tabular-nums w-6">
                      #{book.number}
                    </span>
                    <span className={`font-cinzel text-sm font-semibold ${isSelected ? 'text-[#f5f2eb]' : 'text-[#cfc5b8]'}`}>
                      {book.englishTitle}
                    </span>
                  </div>
                  {book.uniqueToEthiopia && (
                    <span className="px-1.5 py-0.5 bg-[#8c4b2d]/30 text-[#e88d4d] border border-[#8c4b2d] text-[10px] font-sans-clean rounded-xs uppercase">
                      Ethiopian Unique
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-[#8c827a] font-code">
                  <span className="text-[#e8b584]">{book.geezTitle}</span>
                  <span className="text-[10px]">{book.category}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Deep Focus on Selected Canonical Book */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#181614] border border-[#332f2b] p-6 lg:p-8 rounded-sm">
            {/* Book Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#292522] pb-4 mb-5">
              <div>
                <span className="text-xs font-code text-[#e8b584] uppercase tracking-wider block mb-1">
                  Book #{activeBook.number} · {activeBook.testament}
                </span>
                <h2 className="text-2xl lg:text-3xl font-cinzel font-semibold text-[#f5f2eb]">
                  {activeBook.englishTitle}
                </h2>
              </div>
              {activeBook.uniqueToEthiopia && (
                <div className="px-3 py-1 bg-[#8c4b2d]/30 border border-[#8c4b2d] text-xs font-sans-clean text-[#e88d4d] rounded-xs font-semibold">
                  Preserved ONLY in Ethiopian Bible
                </div>
              )}
            </div>

            {/* Ge'ez Script Highlight Card */}
            <div className="p-4 bg-[#121110] border border-[#2b2724] rounded-xs mb-5">
              <span className="text-[10px] font-sans-clean uppercase tracking-wider text-[#7d756d] block mb-1">
                Authentic Ge'ez Fidel Title & Pronunciation
              </span>
              <div className="text-xl font-cinzel text-[#e8b584] font-medium tracking-wide">
                {activeBook.geezTitle}
              </div>
              <div className="text-xs font-code text-[#a8a29e] mt-1">
                Transliteration: {activeBook.transliteratedTitle}
              </div>
            </div>

            {/* Canonical Summary */}
            <div className="mb-6">
              <span className="text-xs font-sans-clean uppercase tracking-wider text-[#a89f91] block mb-2 font-medium">
                Theological & Canonical Context
              </span>
              <p className="text-sm font-editorial text-[#d4cbbe] leading-relaxed">
                {activeBook.summary}
              </p>
            </div>

            {/* Category badge */}
            <div className="flex items-center gap-2 text-xs font-sans-clean text-[#8c827a] border-t border-[#26221f] pt-4 mb-6">
              <span>Canon Section:</span>
              <span className="text-[#f5f2eb] font-medium">{activeBook.category}</span>
            </div>

            {/* Linked Primary Manuscript Scan */}
            {linkedArtifact && (
              <div className="p-4 bg-[#141210] border border-[#38332e] rounded-sm mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-code text-[#e8b584] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    High-Resolution Primary Manuscript Scan in Archive
                  </span>
                  <span className="text-[10px] font-sans-clean text-[#8c827a]">
                    {linkedArtifact.accessionCode}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-4 h-28 rounded-xs overflow-hidden bg-[#0c0b0a] border border-[#2b2724]">
                    <img
                      src={linkedArtifact.image}
                      alt={linkedArtifact.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="sm:col-span-8 space-y-2">
                    <div className="font-cinzel text-sm font-semibold text-[#f5f2eb]">
                      {linkedArtifact.title}
                    </div>
                    <p className="text-xs font-editorial text-[#a8a29e] line-clamp-2">
                      {linkedArtifact.physicalRecord}
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => onOpenArtifact(linkedArtifact)}
                        className="px-2.5 py-1 bg-[#24201c] hover:bg-[#2e2a25] text-xs font-sans-clean text-[#f5f2eb] rounded-xs transition-colors cursor-pointer"
                      >
                        Read Full Dossier
                      </button>
                      <button
                        onClick={() => onOpenMultispectral(linkedArtifact)}
                        className="px-2.5 py-1 bg-[#e4be92] hover:bg-[#eed0ad] text-[#141210] text-xs font-sans-clean font-semibold rounded-xs flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Layers className="w-3 h-3" />
                        Inspect Vellum Scan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pure Source Institutional Repositories for Ethiopian Canon */}
            <div className="pt-4 border-t border-[#26221f] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-cinzel font-semibold text-[#e8b584] uppercase tracking-wider flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5" />
                  Pure Source Monastic & Curatorial Portals
                </span>
                <span className="text-[10px] text-[#8c827a] font-sans-clean">
                  Public Domain Ge'ez Codices
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <a
                  href="https://hmml.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#13110f] hover:bg-[#1a1714] border border-[#2b2724] hover:border-[#e4be92] rounded-xs transition-colors group flex items-center justify-between gap-2"
                >
                  <div>
                    <span className="font-cinzel text-[#e8b584] group-hover:text-[#f5f2eb] block text-xs">
                      HMML Ethiopian Monastic Archive
                    </span>
                    <span className="text-[10px] text-[#8c827a]">
                      300,000+ Tigray & Lake Tana scans
                    </span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-[#8c827a] group-hover:text-[#e8b584]" />
                </a>

                <a
                  href="http://www.bl.uk/manuscripts/Viewer.aspx?ref=or_485_fs001r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#13110f] hover:bg-[#1a1714] border border-[#2b2724] hover:border-[#e4be92] rounded-xs transition-colors group flex items-center justify-between gap-2"
                >
                  <div>
                    <span className="font-cinzel text-[#e8b584] group-hover:text-[#f5f2eb] block text-xs">
                      British Library Digitised Ethiopic MSS
                    </span>
                    <span className="text-[10px] text-[#8c827a]">
                      Royal Gondar Ge'ez codices
                    </span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-[#8c827a] group-hover:text-[#e8b584]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
