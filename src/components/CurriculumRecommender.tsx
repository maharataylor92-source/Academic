import React, { useState } from 'react';
import { 
  RESEARCH_INTERESTS, 
  ResearchInterest, 
  Artifact 
} from '../data/artifacts';
import { 
  Sparkles, 
  BookOpen, 
  Check, 
  ArrowRight, 
  Compass, 
  Layers, 
  BookmarkCheck,
  Send
} from 'lucide-react';

interface CurriculumRecommenderProps {
  artifacts: Artifact[];
  onOpenArtifact: (art: Artifact) => void;
  onOpenMultispectral: (art: Artifact) => void;
}

interface RecommendedPath {
  title: string;
  focus: string;
  primarySourceRef: string;
}

export const CurriculumRecommender: React.FC<CurriculumRecommenderProps> = ({
  artifacts,
  onOpenArtifact,
  onOpenMultispectral,
}) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'interest-undeciphered',
  ]);
  const [customResearchTopic, setCustomResearchTopic] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customCurriculum, setCustomCurriculum] = useState<RecommendedPath[] | null>(null);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleGenerateCurriculum = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/recommendations/curate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interests: selectedInterests,
          userQuery: customResearchTopic,
        }),
      });

      const data = await res.json();
      if (data.curriculum && Array.isArray(data.curriculum) && data.curriculum.length > 0) {
        setCustomCurriculum(data.curriculum);
      } else {
        // Fallback default recommendations
        setCustomCurriculum([
          {
            title: 'Statistical Positional Analysis of Undeciphered Harappan Seals',
            focus: 'Positional n-gram clusters on Sign 411 and terminal grammatical affixes without Sanskrit/Dravidian victor bias.',
            primarySourceRef: 'Harappa Steatite Seal M-314',
          },
          {
            title: 'Non-Phonetic Cognitive Marking: The Middle Paleolithic Ochre Matrix',
            focus: 'Examining human external graphic memory at 73,000 BCE in southern Africa before Eurasian migrations.',
            primarySourceRef: 'Blombos Cave M1-6 Silcrete Matrix',
          },
          {
            title: 'Archaic Accounting Before the Advent of Dynastic Kings',
            focus: 'Deconstructing the sexagesimal System S on unbaked river silt before the emergence of monarchical state propaganda.',
            primarySourceRef: 'Uruk IV Tablet W 9655,t',
          },
        ]);
      }
    } catch (e) {
      console.error(e);
      setCustomCurriculum([
        {
          title: 'Primary Inscription Concordance: Indus Script Corpus',
          focus: 'Statistical frequency analysis of Sign 411 and terminal suffixes without ideological bias.',
          primarySourceRef: 'ASI M-314 Intaglio Corpus',
        },
        {
          title: 'Metrology Before Monarchs: Archaic Uruk IV Accounting',
          focus: 'How barley dry capacity systems gave birth to writing 500 years before kingship myths were carved.',
          primarySourceRef: 'MSVO 1, 1 (W 9655,t)',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Find recommended artifacts based on selected interest tags
  const matchedArtifacts = artifacts.filter((art) => {
    const activeInterestObjects = RESEARCH_INTERESTS.filter((ri) =>
      selectedInterests.includes(ri.id)
    );
    return activeInterestObjects.some((ri) =>
      ri.recommendedArtifactIds.includes(art.id)
    );
  });

  return (
    <div className="w-full py-8 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="mb-8 border-b border-[#292523] pb-6">
        <div className="text-xs uppercase tracking-widest font-sans-clean text-[#a89f91] mb-2 flex items-center gap-2">
          <span>Personalized Archival Syllabus</span>
          <span aria-hidden="true">·</span>
          <span>Unbiased Epigraphy Curriculum</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#d89759]">Tailored to Your Inquiry</span>
        </div>
        <h1 className="text-3xl lg:text-5xl font-cinzel font-medium text-[#f5f2eb] tracking-tight">
          Research Recommendations
        </h1>
        <p className="mt-3 text-[#a8a29e] font-editorial text-lg max-w-3xl leading-relaxed">
          Select your research focus areas or specify an inquiry. Archaica curates an unbiased syllabus composed strictly of primary physical documents and peer-reviewed epigraphic concordances.
        </p>
      </div>

      {/* Interest Selector Grid */}
      <div className="mb-8">
        <h2 className="text-sm uppercase tracking-wider font-sans-clean text-[#8c827a] mb-4">
          Select Your Research Focus Areas:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RESEARCH_INTERESTS.map((ri) => {
            const isSelected = selectedInterests.includes(ri.id);
            return (
              <div
                key={ri.id}
                onClick={() => toggleInterest(ri.id)}
                className={`p-5 rounded-sm border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#201c18] border-[#e4be92] shadow-sm'
                    : 'bg-[#181614] border-[#2b2724] hover:border-[#423c36]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-cinzel text-base font-semibold ${isSelected ? 'text-[#f5f2eb]' : 'text-[#cfc5b8]'}`}>
                    {ri.name}
                  </h3>
                  <div
                    className={`w-4 h-4 rounded-xs border flex items-center justify-center text-[10px] ${
                      isSelected
                        ? 'bg-[#e4be92] border-[#e4be92] text-[#141210]'
                        : 'border-[#4a4239]'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
                <p className="text-xs font-editorial text-[#a8a29e] leading-relaxed mb-3">
                  {ri.description}
                </p>
                <div className="text-[11px] font-sans-clean text-[#8c827a]">
                  <strong className="text-[#a89f91]">Methodology:</strong> {ri.primaryMethodology}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Inquiry Bar */}
      <div className="p-5 bg-[#181614] border border-[#2b2724] rounded-sm mb-10 flex flex-col md:flex-row items-center gap-3">
        <div className="flex-1 w-full">
          <label className="text-[11px] font-sans-clean text-[#a89f91] uppercase tracking-wider block mb-1">
            Specific Epigraphic or Paleographic Inquiry (Optional)
          </label>
          <input
            type="text"
            value={customResearchTopic}
            onChange={(e) => setCustomResearchTopic(e.target.value)}
            placeholder="e.g. Compare early accounting tallies with pre-pottery astronomical symbols..."
            className="w-full bg-[#121110] border border-[#332f2b] text-[#f5f2eb] px-3 py-2 text-xs rounded-xs focus:outline-none focus:border-[#e8b584]"
          />
        </div>
        <button
          onClick={handleGenerateCurriculum}
          disabled={isLoading}
          className="w-full md:w-auto mt-4 md:mt-0 px-5 py-2.5 bg-[#e4be92] hover:bg-[#edd0ae] disabled:opacity-50 text-[#141210] font-sans-clean text-xs font-semibold rounded-xs flex items-center justify-center gap-2 transition-colors cursor-pointer self-end whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5" />
          {isLoading ? 'Generating Syllabus...' : 'Curate Custom Syllabus'}
        </button>
      </div>

      {/* Generated Custom Syllabus */}
      {customCurriculum && (
        <div className="mb-12 bg-[#161412] border border-[#38332e] p-6 lg:p-8 rounded-sm">
          <div className="flex items-center gap-2 text-xs font-code text-[#e8b584] uppercase tracking-wider mb-2">
            <BookmarkCheck className="w-4 h-4" />
            Curated Archival Syllabus (Unbiased Primary Sources)
          </div>
          <h2 className="text-2xl font-cinzel font-semibold text-[#f5f2eb] mb-5">
            Recommended Reading & Inspection Modules
          </h2>

          <div className="space-y-4">
            {customCurriculum.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#1a1816] border border-[#2d2925] rounded-xs"
              >
                <div className="flex items-center gap-2 text-xs text-[#e8b584] font-code mb-1">
                  <span>Module {idx + 1}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#a89f91]">{item.primarySourceRef}</span>
                </div>
                <h3 className="font-cinzel text-lg font-medium text-[#f5f2eb]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs font-editorial text-[#cfc6b8] leading-relaxed">
                  {item.focus}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Primary Recommended Artifacts Section */}
      <div>
        <div className="flex items-center justify-between mb-4 border-b border-[#292523] pb-2">
          <h2 className="text-xl font-cinzel font-semibold text-[#f5f2eb]">
            Recommended Primary Artifacts in Scope ({matchedArtifacts.length})
          </h2>
          <span className="text-xs text-[#8c827a] font-sans-clean">
            Based on active focus filters
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchedArtifacts.map((art) => (
            <div
              key={art.id}
              className="bg-[#181614] border border-[#2b2724] hover:border-[#8c6742] transition-colors rounded-sm overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative bg-[#121110]">
                  <img
                    src={art.image}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-[#121110]/90 px-2 py-0.5 text-[10px] font-code text-[#e8b584]">
                    {art.dateDisplay}
                  </div>
                </div>

                <div className="p-4">
                  <div className="text-[11px] text-[#8c827a] font-sans-clean mb-1">
                    {art.culture}
                  </div>
                  <h3 className="font-cinzel text-base font-semibold text-[#f5f2eb]">
                    {art.title}
                  </h3>
                  <p className="mt-2 text-xs font-editorial text-[#a8a29e] line-clamp-2 leading-relaxed">
                    {art.physicalRecord}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center justify-between border-t border-[#23201d] mt-2 pt-3">
                <button
                  onClick={() => onOpenArtifact(art)}
                  className="text-xs text-[#a89f91] hover:text-[#f5f2eb] font-sans-clean underline"
                >
                  Dossier
                </button>
                <button
                  onClick={() => onOpenMultispectral(art)}
                  className="px-3 py-1 bg-[#26221f] hover:bg-[#e4be92] hover:text-[#141210] text-[#e8b584] text-xs font-sans-clean rounded-xs transition-colors cursor-pointer"
                >
                  Inspect Scan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
