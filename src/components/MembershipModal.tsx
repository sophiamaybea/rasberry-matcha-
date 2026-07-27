import React, { useState } from 'react';
import { Key, Sparkles, ShieldCheck, Check, Lock } from 'lucide-react';

interface MembershipModalProps {
  onClose: () => void;
}

export const MembershipModal: React.FC<MembershipModalProps> = ({ onClose }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [city, setCity] = useState<string>('Paris');
  const [values, setValues] = useState<string>('Epistemic Depth, Structural Clarity, Unhurried Communication');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [accessKey, setAccessKey] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const generatedKey = `HUMAN-ATELIER-${Math.random().toString(36).substring(2, 8).toUpperCase()}-2028`;
    setAccessKey(generatedKey);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0a0a0a]/90 backdrop-blur-2xl animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0a0a0a] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl text-[#E2D2BD]">
        {/* Close button */}
        <button
          id="btn-close-membership-modal"
          onClick={onClose}
          className="absolute top-6 right-6 text-[#E2D2BD]/50 hover:text-white text-xl p-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
        >
          ✕
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-sans text-[#4A6FA5] mb-1.5">
              <Key className="w-3.5 h-3.5" />
              <span>Private Access Application</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-light mb-2">
              Apply for Atelier Access
            </h2>
            <p className="text-xs text-[#E2D2BD]/70 font-light mb-6 leading-relaxed">
              HUMAN is an invitation-first digital flagship. We curate an ecosystem of thoughtful, articulate individuals seeking profound connection.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-[#E2D2BD]/70 font-sans mb-1.5">
                  Full Name
                </label>
                <input
                  id="input-applicant-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aurelia Vance"
                  className="w-full bg-white/5 border border-white/15 rounded-2xl p-3.5 text-xs text-white focus:outline-none focus:border-[#E2D2BD]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-[#E2D2BD]/70 font-sans mb-1.5">
                  Private Email
                </label>
                <input
                  id="input-applicant-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="aurelia@atelier.com"
                  className="w-full bg-white/5 border border-white/15 rounded-2xl p-3.5 text-xs text-white focus:outline-none focus:border-[#E2D2BD]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-[#E2D2BD]/70 font-sans mb-1.5">
                    Primary City
                  </label>
                  <select
                    id="select-applicant-city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-white/15 rounded-2xl p-3.5 text-xs text-white focus:outline-none focus:border-[#E2D2BD]"
                  >
                    <option value="Paris">Paris</option>
                    <option value="Florence">Florence</option>
                    <option value="London">London</option>
                    <option value="Kyoto">Kyoto</option>
                    <option value="Zurich">Zurich</option>
                    <option value="New York">New York</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-[#E2D2BD]/70 font-sans mb-1.5">
                    Core Aspirations
                  </label>
                  <input
                    id="input-applicant-values"
                    type="text"
                    value={values}
                    onChange={(e) => setValues(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-2xl p-3.5 text-xs text-white focus:outline-none focus:border-[#E2D2BD]"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  id="btn-submit-membership"
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#E2D2BD] text-[#0a0a0a] font-sans font-medium text-[11px] tracking-[0.25em] uppercase hover:bg-white transition-all shadow-2xl cursor-pointer"
                >
                  Submit Confidential Application
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center space-y-6 py-4 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-white/10 border border-[#E2D2BD] flex items-center justify-center mx-auto text-[#E2D2BD]">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#4A6FA5] block">
              Application Approved
            </span>

            <h3 className="font-serif text-3xl text-white font-light">
              Welcome to the Atelier, {name}
            </h3>

            <p className="text-xs text-[#E2D2BD]/80 font-light leading-relaxed max-w-md mx-auto">
              Your application has been authenticated. You have been assigned an initial confidential Atelier Key:
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/20 font-sans text-sm text-[#E2D2BD] tracking-[0.2em] select-all">
              {accessKey}
            </div>

            <p className="text-xs text-[#E2D2BD]/60 italic font-serif">
              “Every relationship begins with understanding.”
            </p>

            <button
              id="btn-[#close-after-approval]"
              onClick={onClose}
              className="px-8 py-3 rounded-full bg-white/10 border border-white/20 text-xs text-white hover:bg-white/20 transition-colors cursor-pointer font-sans tracking-[0.2em] uppercase"
            >
              Enter Flagship
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
