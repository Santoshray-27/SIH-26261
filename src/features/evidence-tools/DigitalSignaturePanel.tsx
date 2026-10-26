import React, { useState } from 'react';
import { StatusPill } from '../../components/ui/StatusPill';
import { ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

export const DigitalSignaturePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'summary' | 'cert' | 'digest'>('summary');

  return (
    <div className="bg-[#141413] border border-white/10 rounded-md overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3.5 bg-[#171715] border-b border-white/10 flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase font-mono tracking-wider text-slate">
            CRYPTOGRAPHIC TRUST ANCHOR · §3.3
          </div>
          <h3 className="text-sm font-serif font-bold text-[#EDE7DA] mt-0.5">
            Digital Signature Verification (PKCS#7 / PAdES)
          </h3>
        </div>
        <StatusPill status="SIGNATURE_VALID" />
      </div>

      <div className="p-6 space-y-6">
        {/* Critical Evidentiary Boundary Alert (§14 Copy Rule) */}
        <div className="p-4 bg-[#1B2A49]/30 border border-[#1B2A49] rounded space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
            <AlertCircle className="w-4 h-4 text-ochre flex-shrink-0" />
            <span>Evidentiary Scope & Statutory Limitation</span>
          </div>
          <p className="text-xs text-[#EDE7DA] leading-relaxed">
            A status of <strong className="text-verdigris font-mono">SIGNATURE_VALID</strong> proves only mathematical certificate validity and byte-level tamper-evident transmission.
            <span className="text-ochre font-semibold"> It does NOT mean every claim in the document is true</span>, nor does it guarantee factual accuracy or physical compliance.
          </p>
        </div>

        {/* Verification Summary Card */}
        <div className="p-4 bg-[#181816] border border-white/10 rounded space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-verdigris" />
              <div>
                <div className="text-xs font-serif font-bold text-white">
                  e-Mudhra Class 3 Individual Document Signer
                </div>
                <div className="text-[10px] font-mono text-slate">
                  Issuer: CCA India 2014-2026 Root Authority
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="px-2 py-0.5 bg-verdigris/15 border border-verdigris/30 text-verdigris font-mono text-[10px] rounded">
                ROOT CHAIN VERIFIED
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-1 text-xs font-mono">
            <div>
              <span className="text-slate block text-[10px]">Signing Time:</span>
              <span className="text-[#EDE7DA]">2026-03-12 09:40:00 UTC</span>
            </div>
            <div>
              <span className="text-slate block text-[10px]">Digest Algorithm:</span>
              <span className="text-[#EDE7DA]">SHA-256 (FIPS 180-4)</span>
            </div>
            <div>
              <span className="text-slate block text-[10px]">Key Specification:</span>
              <span className="text-[#EDE7DA]">RSA 2048-bit</span>
            </div>
            <div>
              <span className="text-slate block text-[10px]">Revocation Status:</span>
              <span className="text-verdigris">OCSP GOOD (Cached)</span>
            </div>
          </div>
        </div>

        {/* Tabs for Certificate Chain / Technical Digest */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-white/10 pb-1 text-xs font-mono">
            <button
              onClick={() => setActiveTab('summary')}
              className={`px-3 py-1.5 transition-colors border-b-2 -mb-1 ${
                activeTab === 'summary'
                  ? 'border-verdigris text-white font-bold'
                  : 'border-transparent text-slate hover:text-white'
              }`}
            >
              Signer Identity
            </button>
            <button
              onClick={() => setActiveTab('cert')}
              className={`px-3 py-1.5 transition-colors border-b-2 -mb-1 ${
                activeTab === 'cert'
                  ? 'border-verdigris text-white font-bold'
                  : 'border-transparent text-slate hover:text-white'
              }`}
            >
              Certificate Path
            </button>
            <button
              onClick={() => setActiveTab('digest')}
              className={`px-3 py-1.5 transition-colors border-b-2 -mb-1 ${
                activeTab === 'digest'
                  ? 'border-verdigris text-white font-bold'
                  : 'border-transparent text-slate hover:text-white'
              }`}
            >
              Byte Digest & ByteRange
            </button>
          </div>

          {activeTab === 'summary' && (
            <div className="p-4 bg-black/40 border border-white/5 rounded text-xs font-mono space-y-2 text-slate">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Common Name (CN):</span>
                <span className="text-white">DR. CHANDRASEKHAR RAO (DIRECTOR)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Organization (O):</span>
                <span className="text-white">SRI VIDYA EDUCATIONAL TRUST</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Country / State:</span>
                <span className="text-white">IN / TELANGANA</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Serial Number (HEX):</span>
                <span className="text-white">4A:8F:2B:10:99:C2:55:01:EE</span>
              </div>
            </div>
          )}

          {activeTab === 'cert' && (
            <div className="p-4 bg-black/40 border border-white/5 rounded text-xs font-mono space-y-2">
              <div className="flex items-center gap-2 text-verdigris">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>1. India PKI Controller of Certifying Authorities (CCA) 2014 Root</span>
              </div>
              <div className="flex items-center gap-2 text-verdigris pl-4">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>2. e-Mudhra Sub-CA 2024 for Institutional Signatures</span>
              </div>
              <div className="flex items-center gap-2 text-white font-bold pl-8">
                <CheckCircle2 className="w-3.5 h-3.5 text-verdigris" />
                <span>3. End-Entity Certificate: Sri Vidya Deponent [VALID]</span>
              </div>
            </div>
          )}

          {activeTab === 'digest' && (
            <div className="p-4 bg-black/40 border border-white/5 rounded text-xs font-mono space-y-2 text-slate">
              <div className="text-[11px] text-white">ByteRange: [0, 48200, 52300, 289810]</div>
              <div className="text-[10px] break-all select-all text-neutral-400">
                PAdES Signature Object: /ByteRange [ 0 48200 52300 289810 ] /Filter /Adobe.PPKLite /SubFilter /ETSI.CAdES.detached
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
