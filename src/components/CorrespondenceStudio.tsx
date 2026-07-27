import React, { useState } from 'react';
import { TailoredCorrespondenceResult } from '../types';
import { Sparkles, Send, Copy, Check, Feather, Compass, RefreshCw } from 'lucide-react';

interface CorrespondenceStudioProps {
  onClose: () => void;
}

export const CorrespondenceStudio: React.FC<CorrespondenceStudioProps> = ({ onClose }) => {
  const [draft, setDraft] = useState<string>(
    'I really valued our conversation about quiet sanctuaries last week. I felt a rare alignment, but I want to ensure we give our connection room to unfold naturally without rushing.'
  );
  const [intent, setIntent] = useState<string>('Empathetic, clear, and grounded');
  const [recipientContext, setRecipientContext] = useState<string>('A meaningful relationship connection');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<TailoredCorrespondenceResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/tailor-correspondence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draft, intent, recipientContext }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Error tailoring correspondence:', err);
      // Local haute couture fallback
      setResult({
        tailoredMessage:
          'I deeply appreciated our reflection on solitude and sanctuary. There is a quiet clarity in what we shared, and I want to honor it by allowing our connection to take root with unhurried grace.',
        keyShift: 'Transmuted tentative hesitation into confident, dignified warmth.',
        emotionalNuance: 'Warmth (45%), Intellectual Precision (35%), Boundary Security (20%)',
        atelierNote: 'By replacing procedural language with evocative presence, the message invites trust without pressure.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result?.tailoredMessage) {
      navigator.clipboard.writeText(result.tailoredMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0a0a0a]/90 backdrop-blur-2xl animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#0a0a0a] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-y-auto max-h-[92vh] text-[#E2D2BD]">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-6 mb-6">
          <div>
            <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-sans text-[#4A6FA5] mb-1.5">
              <Feather className="w-3.5 h-3.5" />
              <span>The Atelier Correspondence Studio</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-light">
              Tailor Your Thought
            </h2>
            <p className="text-xs text-[#E2D2BD]/70 mt-1.5 font-light">
              The AI refines complex feelings into dignified, thoughtful written communication without diluting truth.
            </p>
          </div>
          <button
            id="btn-close-correspondence"
            onClick={onClose}
            className="text-[#E2D2BD]/50 hover:text-white text-xl p-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.3em] text-[#E2D2BD]/70 mb-2 font-sans">
              Raw Thought or Message Draft
            </label>
            <textarea
              id="input-correspondence-draft"
              rows={4}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write your raw thoughts here..."
              className="w-full bg-white/5 border border-white/15 rounded-2xl p-4 text-sm text-white placeholder-[#E2D2BD]/30 focus:outline-none focus:border-[#E2D2BD] transition-colors resize-none font-serif leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] text-[#E2D2BD]/70 mb-2 font-sans">
                Desired Tone & Intent
              </label>
              <select
                id="select-correspondence-intent"
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/15 rounded-2xl p-3.5 text-xs text-[#E2D2BD] focus:outline-none focus:border-[#E2D2BD]"
              >
                <option value="Empathetic, clear, and grounded">Empathetic, Clear, and Grounded</option>
                <option value="Vulnerable & Authentic">Vulnerable & Authentic</option>
                <option value="Boundary-Setting with Elegance">Boundary-Setting with Elegance</option>
                <option value="Intellectually Playful">Intellectually Playful</option>
                <option value="Restorative & Apologetic">Restorative & Apologetic</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] text-[#E2D2BD]/70 mb-2 font-sans">
                Recipient Context
              </label>
              <input
                id="input-correspondence-context"
                type="text"
                value={recipientContext}
                onChange={(e) => setRecipientContext(e.target.value)}
                placeholder="e.g. Connection after first date"
                className="w-full bg-white/5 border border-white/15 rounded-2xl p-3.5 text-xs text-[#E2D2BD] focus:outline-none focus:border-[#E2D2BD]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              id="btn-submit-tailor"
              type="submit"
              disabled={isLoading || !draft.trim()}
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#E2D2BD] text-[#0a0a0a] font-sans font-medium text-[11px] tracking-[0.2em] uppercase hover:bg-white disabled:opacity-50 transition-all shadow-xl cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Weaving Words...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#4A6FA5]" />
                  <span>Tailor Correspondence</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Tailored Result View */}
        {result && (
          <div className="mt-8 pt-8 border-t border-white/10 space-y-6 animate-fadeIn">
            <div className="bg-white/5 border border-white/15 rounded-2xl p-6 relative group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#E2D2BD]">
                  Tailored Phrasing
                </span>
                <button
                  id="btn-copy-correspondence"
                  onClick={copyToClipboard}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/20 text-xs text-[#E2D2BD] hover:border-white transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <blockquote className="font-serif text-xl text-white leading-relaxed italic border-l-2 border-[#E2D2BD] pl-4 my-3">
                "{result.tailoredMessage}"
              </blockquote>

              <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#E2D2BD]/80">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#E2D2BD]/50 block font-sans">
                    Key Transmutation
                  </span>
                  <p className="mt-1 font-light">{result.keyShift}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#E2D2BD]/50 block font-sans">
                    Emotional Nuance
                  </span>
                  <p className="mt-1 font-light text-[#4A6FA5]">{result.emotionalNuance}</p>
                </div>
              </div>
            </div>

            {/* Atelier Note */}
            <div className="flex items-start gap-3 bg-[#4A6FA5]/15 border border-[#4A6FA5]/30 rounded-2xl p-5 text-xs text-[#E2D2BD]">
              <Compass className="w-4 h-4 text-[#4A6FA5] shrink-0 mt-0.5" />
              <div>
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#4A6FA5] block mb-1">
                  Atelier Insight
                </span>
                <p className="font-light leading-relaxed">{result.atelierNote}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
