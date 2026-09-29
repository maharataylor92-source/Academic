import React, { useState } from 'react';
import { 
  Artifact 
} from '../data/artifacts';
import { getManuscriptForArtifact, ManuscriptChapter } from '../data/completeManuscripts';
import { 
  X, 
  ShieldAlert, 
  Sparkles, 
  Layers, 
  Send, 
  BookOpen, 
  Copy, 
  Check, 
  Compass, 
  Scale,
  ExternalLink,
  Landmark,
  Scroll,
  ShieldCheck
} from 'lucide-react';

interface DebiasedAnalysisModalProps {
  artifact: Artifact | null;
  onClose: () => void;
  onOpenMultispectral: (art: Artifact) => void;
}

export const DebiasedAnalysisModal: React.FC<DebiasedAnalysisModalProps> = ({
  artifact,
  onClose,
  onOpenMultispectral,
}) => {
  if (!artifact) return null;

  const [activeTab, setActiveTab] = useState<'dossier' | 'manuscript' | 'ai_analysis'>('dossier');
  const [glyphQuery, setGlyphQuery] = useState<string>('');
  const [analysisLoading, setAnalysisLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [copiedCitation, setCopiedCitation] = useState<boolean>(false);
  const [copiedChapterIndex, setCopiedChapterIndex] = useState<number | null>(null);

  const manuscriptDossier = getManuscriptForArtifact(artifact.id);

  const handleRunAiAnalysis = async (customPrompt?: string) => {
    const query = customPrompt || glyphQuery || 'General epigraphic and unbiased paleographic breakdown';
    setAnalysisLoading(true);
    setAnalysisResult(null);

    try {
      const res = await fetch('/api/epigraphy/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          artifactTitle: artifact.title,
          culture: artifact.culture,
          dateDisplay: artifact.dateDisplay,
          scriptClassification: artifact.scriptClassification,
          glyphQuery: query,
          focusArea: 'Physical toolmark evidence, non-biased consensus, and exposing victor historiographical distortion',
        }),
      });

      const data = await res.json();
      if (data.analysis) {
        setAnalysisResult(data.analysis);
      } else {
        setAnalysisResult('Analysis complete. Please review the physical consensus notes.');
      }
    } catch (err) {
      console.error(err);
      setAnalysisResult('Could not reach the server epigraphy analyzer. Showing cached primary consensus record.');
    } finally {
      setAnalysisLoading(false);
    }
  };

  const handleCopyCitation = () => {
    const citation = `Archaica Primary Source Archive. (2026). "${artifact.primaryTitle}" (${artifact.dateDisplay}). Accession ${artifact.accessionCode}, ${artifact.curatorialRepository}. Stratigraphic excavation record.`;
    navigator.clipboard.writeText(citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div 
        className="bg-[#181614] border border-[#38332e] w-full max-w-4xl max-h-[90vh] rounded-sm flex flex-col shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-[#2b2724] bg-[#141210] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-code text-[#e8b584] uppercase tracking-wider">
              Dossier: {artifact.accessionCode}
            </span>
            <span className="text-xs text-[#7d756d]" aria-hidden="true">·</span>
            <span className="text-xs font-sans-clean text-[#a89f91]">
              {artifact.dateDisplay}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCitation}
              className="px-2.5 py-1 text-xs font-sans-clean text-[#a8a29e] hover:text-[#f5f2eb] bg-[#221f1c] border border-[#332f2b] rounded-xs flex items-center gap-1.5 transition-colors"
              title="Copy Academic Citation"
            >
              {copiedCitation ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Cite Source</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1 text-[#8c827a] hover:text-[#f5f2eb] transition-colors rounded-xs"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Subnav */}
        <div className="px-6 pt-3 border-b border-[#26221f] bg-[#161412] flex items-center gap-6 text-xs font-sans-clean uppercase tracking-wider overflow-x-auto">
          <button
            onClick={() => setActiveTab('dossier')}
            className={`pb-2.5 transition-colors whitespace-nowrap ${
              activeTab === 'dossier'
                ? 'text-[#e8b584] border-b-2 border-[#e8b584] font-medium'
                : 'text-[#8c827a] hover:text-[#e8e4dc]'
            }`}
          >
            Unbiased Dossier & Provenance
          </button>

          {manuscriptDossier && (
            <button
              onClick={() => setActiveTab('manuscript')}
              className={`pb-2.5 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'manuscript'
                  ? 'text-[#e8b584] border-b-2 border-[#e8b584] font-medium'
                  : 'text-[#8c827a] hover:text-[#e8e4dc]'
              }`}
            >
              <Scroll className="w-3.5 h-3.5 text-[#e8b584]" />
              Complete Manuscript & Pure Sources
            </button>
          )}

          <button
            onClick={() => setActiveTab('ai_analysis')}
            className={`pb-2.5 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'ai_analysis'
                ? 'text-[#e8b584] border-b-2 border-[#e8b584] font-medium'
                : 'text-[#8c827a] hover:text-[#e8e4dc]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#e8b584]" />
            Epigraphic AI Decipherer
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          {activeTab === 'dossier' && (
            <div className="space-y-6">
              {/* Header Title & Hero summary */}
              <div>
                <h2 className="text-2xl lg:text-3xl font-cinzel font-semibold text-[#f5f2eb]">
                  {artifact.title}
                </h2>
                <div className="mt-1 text-xs text-[#a89f91] font-sans-clean">
                  Culture: <span className="text-[#e8b584]">{artifact.culture}</span> · Geographic Origin: <span className="text-[#e8b584]">{artifact.geographicOrigin}</span>
                </div>
              </div>

              {/* Victor's Bias Alert Banner */}
              <div className="p-4 bg-[#231d18] border-l-4 border-[#d97736] rounded-xs text-xs font-sans-clean leading-relaxed">
                <div className="flex items-center gap-2 font-semibold text-[#e88d4d] uppercase tracking-wider mb-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  Historiographical De-Biasing (Rejecting the Victor's Narrative)
                </div>
                <p className="text-[#ded1c4]">
                  {artifact.victorsBiasWarning}
                </p>
              </div>

              {/* If Sacred Mystic Text, show dedicated Mystic Scripture block */}
              {artifact.mysticRecord && (
                <div className="p-5 bg-[#171411] border border-[#d99f6e] rounded-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-code text-[#e8b584] uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" />
                      Sacred Mystic Text & Primary Inscription
                    </span>
                    <span className="text-[11px] font-sans-clean text-[#a89f91]">
                      {artifact.mysticRecord.originalScriptLanguage}
                    </span>
                  </div>

                  <div className="p-3 bg-[#110f0e] border border-[#332e29] rounded-xs">
                    <span className="text-[10px] uppercase font-sans-clean text-[#8c827a] block mb-1">
                      Original Sacred Script (Unmodified Primary Inscription)
                    </span>
                    <div className="font-code text-sm text-[#e8b584] leading-relaxed break-words">
                      {artifact.mysticRecord.originalScriptSample}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-sans-clean text-[#8c827a] block mb-1">
                      Unvarnished Word-for-Word Literal Translation
                    </span>
                    <p className="text-xs font-editorial text-[#d4cbbe] italic leading-relaxed">
                      {artifact.mysticRecord.unvarnishedLiteralTranslation}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 bg-[#13110f] border border-[#2b2724] rounded-xs text-xs">
                      <span className="text-[10px] font-sans-clean uppercase tracking-wider text-[#a89f91] block mb-1">
                        Philosophical Context
                      </span>
                      <p className="font-editorial text-[#cfc6b8] leading-relaxed">
                        {artifact.mysticRecord.philosophicalContext}
                      </p>
                    </div>

                    <div className="p-3 bg-[#13110f] border border-[#2b2724] rounded-xs text-xs">
                      <span className="text-[10px] font-sans-clean uppercase tracking-wider text-[#e8b584] block mb-1">
                        Esoteric Ontology & Sacred Cipher
                      </span>
                      <p className="font-editorial text-[#cfc6b8] leading-relaxed">
                        {artifact.mysticRecord.esotericSignificance}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Physical Medium & Inscription Facts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#141210] border border-[#2b2724] rounded-xs">
                  <span className="text-[10px] font-sans-clean uppercase tracking-wider text-[#8c827a] block mb-2">
                    Raw Material Matrix
                  </span>
                  <div className="text-xs font-editorial text-[#d4cbbe] space-y-1.5 leading-relaxed">
                    <div><strong className="text-[#f5f2eb]">Substrate:</strong> {artifact.medium}</div>
                    <div><strong className="text-[#f5f2eb]">Dimensions:</strong> {artifact.dimensions}</div>
                    <div><strong className="text-[#f5f2eb]">Laboratory Analysis:</strong> {artifact.glyphDetails.physicalMediumAnalysis}</div>
                  </div>
                </div>

                <div className="p-4 bg-[#141210] border border-[#2b2724] rounded-xs">
                  <span className="text-[10px] font-sans-clean uppercase tracking-wider text-[#8c827a] block mb-2">
                    Epigraphic Statistics
                  </span>
                  <div className="text-xs font-editorial text-[#d4cbbe] space-y-1.5 leading-relaxed">
                    <div><strong className="text-[#f5f2eb]">Script Classification:</strong> {artifact.scriptClassification}</div>
                    <div><strong className="text-[#f5f2eb]">Total Tokens Identified:</strong> {artifact.glyphDetails.totalSignsIdentified}</div>
                    <div><strong className="text-[#f5f2eb]">Unique Sign Types:</strong> {artifact.glyphDetails.uniqueSignTypes}</div>
                    <div><strong className="text-[#f5f2eb]">Path:</strong> {artifact.glyphDetails.directionOfInscription}</div>
                  </div>
                </div>
              </div>

              {/* Stratigraphic Provenance Record */}
              <div>
                <h3 className="text-sm font-cinzel font-semibold text-[#f5f2eb] mb-2 uppercase tracking-wide">
                  Stratigraphic Excavation & Provenance
                </h3>
                <p className="text-xs font-editorial text-[#c2b9ad] leading-relaxed bg-[#141210] border border-[#292522] p-4 rounded-xs">
                  {artifact.unbiasedProvenance}
                </p>
              </div>

              {/* Consensus Epigraphy */}
              <div>
                <h3 className="text-sm font-cinzel font-semibold text-[#f5f2eb] mb-2 uppercase tracking-wide flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#e8b584]" />
                  Verified Epigraphic Consensus Points
                </h3>
                <ul className="space-y-2 text-xs font-editorial text-[#cfc5b8]">
                  {artifact.consensusEpigraphy.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 bg-[#171412] p-2.5 rounded-xs border border-[#26221f]">
                      <span className="text-[#e8b584] font-code font-bold mt-0.5">{i + 1}.</span>
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Link to Multispectral Scanner */}
              <div className="pt-2 flex items-center justify-between border-t border-[#292522]">
                <div className="text-xs text-[#8c827a] font-sans-clean">
                  Want to examine the physical chisel grooves yourself?
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenMultispectral(artifact);
                  }}
                  className="px-4 py-2 bg-[#e4be92] hover:bg-[#edd0ae] text-[#141210] text-xs font-sans-clean font-semibold rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" />
                  Launch RTI & UV Scan
                </button>
              </div>
            </div>
          )}

          {activeTab === 'manuscript' && manuscriptDossier && (
            <div className="space-y-6">
              {/* Header banner */}
              <div className="p-4 bg-[#141210] border border-[#2e2a26] rounded-xs space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-code text-[#e8b584] uppercase tracking-wider">
                    {manuscriptDossier.licenseStatus}
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-950/60 border border-emerald-600/50 text-emerald-300 text-[10px] font-sans-clean rounded-xs">
                    {manuscriptDossier.completeTextState}
                  </span>
                </div>
                <h3 className="text-lg font-cinzel font-semibold text-[#f5f2eb]">
                  {manuscriptDossier.manuscriptTitle}
                </h3>
                <div className="text-xs text-[#a89f91] font-sans-clean">
                  Foliation & Medium: <span className="text-[#f5f2eb]">{manuscriptDossier.foliationCount}</span>
                </div>
                <p className="text-[11px] font-sans-clean text-[#8c827a] leading-relaxed pt-1">
                  {manuscriptDossier.copyrightDisclaimer}
                </p>
              </div>

              {/* Clickable Pure Source Links */}
              <div>
                <h4 className="text-xs font-cinzel font-semibold text-[#f5f2eb] uppercase tracking-wider mb-2.5 flex items-center gap-2">
                  <Landmark className="w-3.5 h-3.5 text-[#e8b584]" />
                  Verified Pure Source Repositories (Direct External Scans)
                </h4>
                <div className="space-y-2">
                  {manuscriptDossier.pureSourceLinks.map((link, idx) => (
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
                            {link.type}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#8c827a] leading-relaxed">
                          {link.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[#e4be92] group-hover:text-[#edd0ae] shrink-0 font-sans-clean">
                        <span>Open Vault</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Chapters & Full text reader */}
              <div>
                <h4 className="text-xs font-cinzel font-semibold text-[#f5f2eb] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-[#e8b584]" />
                  Complete Surviving Text & Word-for-Word Literal Translations
                </h4>

                <div className="space-y-4">
                  {manuscriptDossier.chapters.map((chapter) => (
                    <div 
                      key={chapter.index}
                      className="p-4 bg-[#13110f] border border-[#272320] rounded-xs space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-[#201d1a] pb-2">
                        <span className="text-xs font-cinzel font-semibold text-[#e8b584]">
                          {chapter.label}
                        </span>
                        <button
                          onClick={() => {
                            const toCopy = `${chapter.label}\n${chapter.originalTextSnippet}\n\n${chapter.englishLiteral}`;
                            navigator.clipboard.writeText(toCopy);
                            setCopiedChapterIndex(chapter.index);
                            setTimeout(() => setCopiedChapterIndex(null), 2000);
                          }}
                          className="px-2 py-0.5 bg-[#1b1916] hover:bg-[#26221e] text-[10px] text-[#a8a29e] hover:text-[#f5f2eb] border border-[#332f2b] rounded-xs flex items-center gap-1 transition-colors"
                        >
                          {copiedChapterIndex === chapter.index ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="p-3 bg-[#0e0d0c] border border-[#24211e] rounded-xs">
                        <div className="text-[9px] font-sans-clean uppercase tracking-wider text-[#7d756d] mb-1">
                          Original Script / Epigraphic Notation
                        </div>
                        <div className="font-code text-xs text-[#e8b584] leading-relaxed whitespace-pre-line break-words">
                          {chapter.originalTextSnippet}
                        </div>
                      </div>

                      <div className="p-3 bg-[#161412] border border-[#24211e] rounded-xs">
                        <div className="text-[9px] font-sans-clean uppercase tracking-wider text-[#7d756d] mb-1">
                          Unvarnished Literal Translation
                        </div>
                        <p className="font-editorial text-xs text-[#d4cbbe] italic leading-relaxed">
                          {chapter.englishLiteral}
                        </p>
                      </div>

                      <div className="text-[11px] text-[#8c827a] font-sans-clean leading-relaxed">
                        <strong className="text-[#a89f91]">Epigraphic Context:</strong> {chapter.academicNotes}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai_analysis' && (
            <div className="space-y-5">
              <div className="p-4 bg-[#141210] border border-[#2d2926] rounded-xs text-xs font-sans-clean text-[#a89f91] leading-relaxed">
                <div className="flex items-center gap-2 text-[#e8b584] font-semibold mb-1">
                  <Sparkles className="w-4 h-4" />
                  Objective Server-Side Paleographic Decipherment Engine
                </div>
                Ask specific epigraphic questions, compare sign frequencies, test phonetic vs logographic hypotheses, or explore how historical revisionism altered this document.
              </div>

              {/* Pre-set questions */}
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  onClick={() => handleRunAiAnalysis('What is the physical consensus regarding whether this inscription represents language or a non-linguistic numerical/accounting system?')}
                  className="px-2.5 py-1.5 bg-[#211e1c] hover:bg-[#2b2724] border border-[#38332d] text-[#cfc5b8] rounded-xs font-sans-clean transition-colors"
                >
                  Is it language or accounting?
                </button>
                <button
                  onClick={() => handleRunAiAnalysis('Explain the exact victor historiographical biases or colonial misattributions that distorted this artifact in the 19th and 20th centuries.')}
                  className="px-2.5 py-1.5 bg-[#211e1c] hover:bg-[#2b2724] border border-[#38332d] text-[#cfc5b8] rounded-xs font-sans-clean transition-colors"
                >
                  Expose Victor Biases
                </button>
                <button
                  onClick={() => handleRunAiAnalysis('Provide the sign positional statistics and discuss terminal frequency patterns.')}
                  className="px-2.5 py-1.5 bg-[#211e1c] hover:bg-[#2b2724] border border-[#38332d] text-[#cfc5b8] rounded-xs font-sans-clean transition-colors"
                >
                  Positional N-Gram Statistics
                </button>
              </div>

              {/* Custom Input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={glyphQuery}
                  onChange={(e) => setGlyphQuery(e.target.value)}
                  placeholder="Ask a specific epigraphic question about this primary source..."
                  className="flex-1 bg-[#121110] border border-[#332e29] text-[#f5f2eb] px-3 py-2 text-xs rounded-xs focus:outline-none focus:border-[#e8b584]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRunAiAnalysis();
                  }}
                />
                <button
                  onClick={() => handleRunAiAnalysis()}
                  disabled={analysisLoading}
                  className="px-4 py-2 bg-[#e4be92] hover:bg-[#edd0ae] disabled:opacity-50 text-[#141210] font-sans-clean text-xs font-semibold rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {analysisLoading ? 'Analyzing...' : 'Analyze'}
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Output Display */}
              {analysisResult && (
                <div className="mt-4 p-5 bg-[#121110] border border-[#332f2b] rounded-xs">
                  <div className="text-[10px] font-code uppercase tracking-wider text-[#e8b584] mb-3 pb-2 border-b border-[#23201d]">
                    Curatorial Paleographic Analysis
                  </div>
                  <div className="prose prose-invert prose-xs max-w-none text-[#cfc6b8] font-editorial leading-relaxed whitespace-pre-line text-sm">
                    {analysisResult}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
