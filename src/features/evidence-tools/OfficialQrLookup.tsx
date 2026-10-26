import React, { useState } from 'react';
import { StatusPill } from '../../components/ui/StatusPill';
import { Globe, ShieldAlert, RefreshCw } from 'lucide-react';

export const OfficialQrLookup: React.FC = () => {
  const [urlInput, setUrlInput] = useState<string>(
    'https://nba-india.org/verify/certificate/NBA-2023-TIER2-8801'
  );
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [response, setResponse] = useState<any>({
    status: 'PASS',
    host: 'nba-india.org',
    isAllowlisted: true,
    certificateId: 'NBA-2023-TIER2-8801',
    validUntil: '2025-12-31',
    program: 'B.Tech Computer Science & Engineering',
    institution: 'Sri Vidya Institute of Technology',
    issuer: 'National Board of Accreditation, New Delhi',
  });

  const allowlistedHosts = [
    'nba-india.org',
    'aicte-india.org',
    'nad.digilocker.gov.in',
    'dharani.telangana.gov.in',
    'igod.gov.in',
  ];

  const handleLookup = () => {
    setIsVerifying(true);
    setTimeout(() => {
      try {
        const parsed = new URL(urlInput);
        const host = parsed.hostname;
        const isAllowlisted = allowlistedHosts.includes(host);

        setResponse({
          status: isAllowlisted ? 'PASS' : 'SOURCE_UNAVAILABLE',
          host,
          isAllowlisted,
          certificateId: 'NBA-2023-TIER2-8801',
          validUntil: '2025-12-31',
          program: 'B.Tech Computer Science & Engineering',
          institution: 'Sri Vidya Institute of Technology',
          issuer: isAllowlisted ? 'National Board of Accreditation' : 'Unknown Origin',
          warning: !isAllowlisted
            ? `Host '${host}' is NOT in the AICTE official issuer allowlist (§14). Direct web lookup prohibited to prevent SSRF and phishing.`
            : null,
        });
      } catch (e) {
        setResponse({
          status: 'SOURCE_UNAVAILABLE',
          host: 'INVALID_URL',
          isAllowlisted: false,
          warning: 'Invalid URL string supplied.',
        });
      }
      setIsVerifying(false);
    }, 400);
  };

  return (
    <div className="bg-[#141413] border border-white/10 rounded-md overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3.5 bg-[#171715] border-b border-white/10 flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase font-mono tracking-wider text-slate">
            EXTERNAL ISSUER ADAPTER · §14
          </div>
          <h3 className="text-sm font-serif font-bold text-[#EDE7DA] mt-0.5">
            Official QR Code & Direct Web Lookup
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-ochre/20 border border-ochre/40 text-ochre font-mono text-[10px] rounded font-bold">
            SANDBOX ENVIRONMENT
          </span>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <p className="text-xs text-slate leading-relaxed">
          Statutory QR lookup adapter. Strict security policy requires that all embedded QR codes
          resolve exclusively to <span className="text-white font-bold">allowlisted government & accreditation domains</span>.
          Simulated through the sandbox gateway.
        </p>

        {/* Input Bar */}
        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase text-slate">
            Target URL from Scanned QR Code:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 bg-[#181816] border border-white/15 rounded p-2.5 text-xs text-white font-mono focus:border-ochre outline-none"
              placeholder="https://..."
            />
            <button
              onClick={handleLookup}
              disabled={isVerifying}
              className="px-4 py-2.5 bg-ochre hover:bg-ochre/90 text-white font-mono text-xs rounded transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
              <span>Lookup (SANDBOX)</span>
            </button>
          </div>
        </div>

        {/* Allowlist indicator */}
        <div className="p-3 bg-black/40 border border-white/5 rounded text-[11px] font-mono text-slate">
          <span className="text-white font-bold">Configured Sandbox Allowlist: </span>
          {allowlistedHosts.join(' · ')}
        </div>

        {/* Response Card */}
        {response && (
          <div className="p-4 bg-[#181816] border border-white/10 rounded space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate" />
                <span className="font-mono text-xs text-white font-bold">{response.host}</span>
              </div>
              <StatusPill
                status={response.isAllowlisted ? 'PASS' : 'SOURCE_UNAVAILABLE'}
                label={response.isAllowlisted ? 'HOST ALLOWLISTED' : 'UNRECOGNIZED DOMAIN'}
              />
            </div>

            {response.isAllowlisted ? (
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <span className="text-slate block text-[10px]">Accreditation ID:</span>
                  <span className="text-[#EDE7DA] font-bold">{response.certificateId}</span>
                </div>
                <div>
                  <span className="text-slate block text-[10px]">Accreditation Expiry:</span>
                  <span className="text-[#EDE7DA]">{response.validUntil}</span>
                </div>
                <div>
                  <span className="text-slate block text-[10px]">Institution Registered:</span>
                  <span className="text-[#EDE7DA]">{response.institution}</span>
                </div>
                <div>
                  <span className="text-slate block text-[10px]">Program:</span>
                  <span className="text-[#EDE7DA]">{response.program}</span>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-vermilion/10 border border-vermilion/20 rounded text-xs font-mono text-vermilion flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{response.warning}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
