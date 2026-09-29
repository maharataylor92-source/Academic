import React from 'react';
import { Compass, BookOpen, Clock, Layers, Sparkles, MessageSquare, Sun } from 'lucide-react';

interface HeaderProps {
  activeTab: 'timeline' | 'multispectral' | 'manuscripts' | 'encyclopedia-mystic' | 'ethiopian-canon' | 'archive' | 'dispatches' | 'recommendations' | 'collaborate';
  setActiveTab: (tab: 'timeline' | 'multispectral' | 'manuscripts' | 'encyclopedia-mystic' | 'ethiopian-canon' | 'archive' | 'dispatches' | 'recommendations' | 'collaborate') => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#121110]/95 backdrop-blur-md border-b border-[#2a2724] px-4 lg:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Zone 1: Single Wordmark Element (Anti-Slop Cleanliness) */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('timeline');
          }}
          className="text-lg lg:text-xl font-cinzel font-bold tracking-widest text-[#f0ebe1] hover:text-[#d69f6e] transition-colors"
        >
          ARCHAICA
        </a>

        {/* Zone 2: 4-6 Clean Text Nav Links with Subtle Hover States */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-sans-clean uppercase tracking-wider text-[#a8a29e]">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'timeline'
                ? 'text-[#e8b584] border-b border-[#e8b584] font-medium'
                : 'hover:text-[#f0ebe1]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Timeline
          </button>

          <button
            onClick={() => setActiveTab('multispectral')}
            className={`transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'multispectral'
                ? 'text-[#e8b584] border-b border-[#e8b584] font-medium'
                : 'hover:text-[#f0ebe1]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Multispectral Scan
          </button>

          <button
            onClick={() => setActiveTab('manuscripts')}
            className={`transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'manuscripts'
                ? 'text-[#e8b584] border-b border-[#e8b584] font-medium'
                : 'hover:text-[#f0ebe1]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#e8b584]" />
            Complete Manuscripts
          </button>

          <button
            onClick={() => setActiveTab('encyclopedia-mystic')}
            className={`transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'encyclopedia-mystic'
                ? 'text-[#e8b584] border-b border-[#e8b584] font-medium'
                : 'hover:text-[#f0ebe1]'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-[#e8b584]" />
            Encyclopedia & Mystic
          </button>

          <button
            onClick={() => setActiveTab('ethiopian-canon')}
            className={`transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'ethiopian-canon'
                ? 'text-[#e8b584] border-b border-[#e8b584] font-medium'
                : 'hover:text-[#f0ebe1]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#d97736]" />
            Ethiopian Bible (81)
          </button>

          <button
            onClick={() => setActiveTab('archive')}
            className={`transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'archive'
                ? 'text-[#e8b584] border-b border-[#e8b584] font-medium'
                : 'hover:text-[#f0ebe1]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Primary Archive
          </button>

          <button
            onClick={() => setActiveTab('dispatches')}
            className={`transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'dispatches'
                ? 'text-[#e8b584] border-b border-[#e8b584] font-medium'
                : 'hover:text-[#f0ebe1]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Daily Dispatches
          </button>

          <button
            onClick={() => setActiveTab('recommendations')}
            className={`transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'recommendations'
                ? 'text-[#e8b584] border-b border-[#e8b584] font-medium'
                : 'hover:text-[#f0ebe1]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Research Syllabus
          </button>

          <button
            onClick={() => setActiveTab('collaborate')}
            className={`transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'collaborate'
                ? 'text-[#e8b584] border-b border-[#e8b584] font-medium'
                : 'hover:text-[#f0ebe1]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Peer Forum
          </button>
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('multispectral')}
            className="px-3.5 py-1.5 text-xs font-sans-clean font-medium tracking-wide text-[#141210] bg-[#e4be92] hover:bg-[#edd0ae] transition-colors rounded-sm shadow-sm whitespace-nowrap cursor-pointer"
          >
            Inspect High-Res Scan
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="flex md:hidden overflow-x-auto gap-4 pt-2.5 pb-1 text-xs text-[#a8a29e] border-t border-[#22201e] mt-2 no-scrollbar">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`whitespace-nowrap px-2 py-1 ${activeTab === 'timeline' ? 'text-[#e8b584] font-semibold' : ''}`}
        >
          Timeline
        </button>
        <button
          onClick={() => setActiveTab('multispectral')}
          className={`whitespace-nowrap px-2 py-1 ${activeTab === 'multispectral' ? 'text-[#e8b584] font-semibold' : ''}`}
        >
          Multispectral
        </button>
        <button
          onClick={() => setActiveTab('manuscripts')}
          className={`whitespace-nowrap px-2 py-1 ${activeTab === 'manuscripts' ? 'text-[#e8b584] font-semibold' : ''}`}
        >
          Manuscripts
        </button>
        <button
          onClick={() => setActiveTab('encyclopedia-mystic')}
          className={`whitespace-nowrap px-2 py-1 ${activeTab === 'encyclopedia-mystic' ? 'text-[#e8b584] font-semibold' : ''}`}
        >
          Encyclopedia & Mystic
        </button>
        <button
          onClick={() => setActiveTab('ethiopian-canon')}
          className={`whitespace-nowrap px-2 py-1 ${activeTab === 'ethiopian-canon' ? 'text-[#e8b584] font-semibold' : ''}`}
        >
          Ethiopian Bible
        </button>
        <button
          onClick={() => setActiveTab('archive')}
          className={`whitespace-nowrap px-2 py-1 ${activeTab === 'archive' ? 'text-[#e8b584] font-semibold' : ''}`}
        >
          Archive
        </button>
        <button
          onClick={() => setActiveTab('dispatches')}
          className={`whitespace-nowrap px-2 py-1 ${activeTab === 'dispatches' ? 'text-[#e8b584] font-semibold' : ''}`}
        >
          Dispatches
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`whitespace-nowrap px-2 py-1 ${activeTab === 'recommendations' ? 'text-[#e8b584] font-semibold' : ''}`}
        >
          Syllabus
        </button>
        <button
          onClick={() => setActiveTab('collaborate')}
          className={`whitespace-nowrap px-2 py-1 ${activeTab === 'collaborate' ? 'text-[#e8b584] font-semibold' : ''}`}
        >
          Peer Notes
        </button>
      </div>
    </header>
  );
};
