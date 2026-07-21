import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Sparkles, ShieldCheck, CheckCircle2, ExternalLink, FileText, Download } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { useTheme } from '../context/ThemeContext';

interface CertItem {
  num: string;
  title: string;
  recipient: string;
  issuer: string;
  description: string;
  date: string;
  certId?: string;
  signatory: string;
  signatoryRole: string;
  themeColor: string;
  badgeText: string;
  stamps: string[];
  verifyUrl?: string;
  pdfUrl?: string;
}

const CERT_ITEMS: CertItem[] = [
  {
    num: "01",
    title: "AI Workflows & Automation Workshop",
    recipient: "J.s.narun",
    issuer: "NxtWave Academy (Make Academic Alliance)",
    description: "For successfully completing the AI Workflows & Automation Workshop project, gaining hands-on experience in building end-to-end automation workflows using Make.com, including intelligent integrations with AI agents, MCP servers and APIs.",
    date: "22-Jan-2026",
    signatory: "Rahul Attuluri",
    signatoryRole: "CEO, NxtWave™",
    themeColor: "#0052FF",
    badgeText: "MAKE.COM ALLIANCE",
    stamps: ["Make Academic Alliance", "Gold Star Award Badge"],
    verifyUrl: "https://nxtwave.tech"
  },
  {
    num: "02",
    title: "Model Context Protocol (MCP) Project",
    recipient: "J.s.narun",
    issuer: "NxtWave CCBP 4.0 Academy",
    description: "For exploring the fundamentals of Model Context Protocol, learning to integrate AI with real-world tools like Cursor IDE, Pipedream, and MCP Servers, and gaining hands-on experience in building prompt-driven AI workflows in the MCP Mega workshop.",
    date: "09-Aug-2025",
    signatory: "Rahul Attuluri",
    signatoryRole: "CEO, NxtWave™",
    themeColor: "#059669",
    badgeText: "MCP PROJECT",
    stamps: ["CCBP 4.0 Academy", "Cursor IDE & Pipedream"],
    verifyUrl: "https://nxtwave.tech"
  },
  {
    num: "03",
    title: "Front-End Development Internship",
    recipient: "Narun.J.S",
    issuer: "Cognifyz IT Solutions Pvt. Ltd.",
    description: "Internship Completion Certificate (Intern ID: CTI/A1/C367251). Worked as a Front-End Development Intern from 02/06/2026 to 02/07/2026, displaying remarkable dedication, sincerity, coordination skills, and attention to detail in front-end web engineering.",
    date: "02-Jul-2026",
    certId: "CTI/A1/C367251",
    signatory: "Sahil Shambhat",
    signatoryRole: "Director, Cognifyz IT Solutions",
    themeColor: "#2563EB",
    badgeText: "ISO 9001:2015",
    stamps: ["ISO 9001:2015 Certified", "MSME Verified Govt. India"],
    verifyUrl: "https://cognifyz.com",
    pdfUrl: "/frontend_dev_cert.pdf"
  },
  {
    num: "04",
    title: "Full Stack Development Internship",
    recipient: "Narun.J.S",
    issuer: "Thiranex (Skill Development & Future Tech)",
    description: "Certificate of Achievement for successfully completing an intensive internship in Full Stack Development from 29 May 2026 to 28 Jun 2026.",
    date: "28-Jun-2026",
    certId: "THX-MAY2926-998",
    signatory: "Hariharan M",
    signatoryRole: "Founder & CEO, Thiranex",
    themeColor: "#4F46E5",
    badgeText: "VERIFIED CREDENTIAL",
    stamps: ["Verified QR ID", "MSME Govt. Verified"],
    verifyUrl: "https://thiranex.in"
  },
  {
    num: "05",
    title: "Data Analysis with Python",
    recipient: "Narun J.S.",
    issuer: "IBM SkillsBuild (Cognitive Class)",
    description: "Completion Certificate (SN-COURSE-V1:COGNITIVECLASS+DA0101EN+V1). Demonstrated mastery in Python data analysis, pandas data manipulation, statistical processing, and exploratory data analytics.",
    date: "02-Jun-2026",
    certId: "DA0101EN+V1",
    signatory: "Cognitive Class System",
    signatoryRole: "Skills Network Record",
    themeColor: "#D97706",
    badgeText: "IBM SKILLSBUILD",
    stamps: ["IBM Cognitive Class", "3 Learning Hours"],
    verifyUrl: "https://cognitiveclass.ai",
    pdfUrl: "/ibm_data_analytics_cert.pdf"
  }
];

export const CertificationsSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertItem | null>(null);
  const { theme } = useTheme();

  // Tripled items to ensure seamless marquee loop
  const tripledCertItems = [...CERT_ITEMS, ...CERT_ITEMS, ...CERT_ITEMS];

  return (
    <section
      id="certifications"
      className={`rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] py-20 sm:py-24 md:py-32 relative z-20 border-t overflow-hidden transition-colors duration-500 select-none ${theme === 'dark'
          ? 'bg-[#0C0C0C] text-[#D7E2EA] border-[#D7E2EA]/5'
          : 'bg-[#F8FAFC] text-[#0F172A] border-[#0F172A]/10'
        }`}
    >
      {/* Background radial glow */}
      <div className="absolute -top-[10%] right-[10%] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="w-full relative z-10">
        {/* HEADING */}
        <div className="max-w-5xl mx-auto px-5 sm:px-8 md:px-10 mb-16 sm:mb-20">
          <FadeIn delay={0} y={40} className="text-center">
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(3rem, 10vw, 7.5rem)' }}
            >
              Certifications
            </h2>
            <p className={`text-xs sm:text-sm md:text-base max-w-xl mx-auto uppercase tracking-widest font-extrabold mt-3 ${theme === 'dark' ? 'text-cyan-400' : 'text-indigo-700'
              }`}>
              Verified Credentials & Industry Internships
            </p>
          </FadeIn>
        </div>

        {/* HORIZONTAL AUTO-SCROLLING MARQUEE WITH 3D CARD ANIMATION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className={`relative w-full overflow-hidden py-10 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-16 sm:before:w-32 before:z-10 before:pointer-events-none after:absolute after:right-0 after:top-0 after:bottom-0 after:w-16 sm:after:w-32 after:z-10 after:pointer-events-none ${theme === 'dark'
              ? 'before:bg-gradient-to-r before:from-[#0C0C0C] before:to-transparent after:bg-gradient-to-l after:from-[#0C0C0C] after:to-transparent'
              : 'before:bg-gradient-to-r before:from-[#F8FAFC] before:to-transparent after:bg-gradient-to-l after:from-[#F8FAFC] after:to-transparent'
            }`}
        >
          <div className="animate-marquee gap-6">
            {tripledCertItems.map((cert, index) => (
              <motion.div
                key={`cert-${index}`}
                whileHover={{
                  scale: 1.06,
                  y: -10,
                  rotateY: 10,
                  rotateX: -4,
                  transition: { type: 'spring', stiffness: 350, damping: 18 }
                }}
                onClick={() => setSelectedCert(cert)}
                className={`w-[300px] sm:w-[380px] md:w-[420px] shrink-0 p-6 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden cursor-pointer ${theme === 'dark'
                    ? 'border-[#D7E2EA]/15 bg-[#121214]/80 backdrop-blur-xl hover:border-cyan-400/50 shadow-black'
                    : 'border-[#0F172A]/15 bg-white hover:border-[#4338CA]/50 shadow-indigo-500/10'
                  }`}
                style={{ perspective: 1000 }}
              >
                {/* Interactive Holographic Shimmer Pass */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

                {/* Accent glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Top Row: Icon and Number */}
                <div className="flex justify-between items-start mb-4">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.15 }}
                    transition={{ duration: 0.6 }}
                    className={`p-3.5 rounded-2xl border text-indigo-500 ${theme === 'dark' ? 'bg-[#1C1C1F] border-[#D7E2EA]/10' : 'bg-[#F1F5F9] border-[#0F172A]/10'
                      }`}
                  >
                    <Award className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: cert.themeColor }} />
                  </motion.div>
                  <span className={`font-black text-3xl sm:text-4xl transition-colors duration-300 ${theme === 'dark' ? 'text-cyan-400' : 'text-[#4338CA]'
                    }`}>
                    {cert.num}
                  </span>
                </div>

                {/* Content */}
                <div className="mb-6 relative z-10 text-left">
                  <span className="text-[10px] sm:text-xs tracking-widest font-extrabold uppercase flex items-center gap-1.5 mb-1" style={{ color: cert.themeColor }}>
                    <Sparkles className="w-3 h-3 inline" />
                    {cert.issuer}
                  </span>
                  <h3 className={`text-base sm:text-lg md:text-xl font-extrabold tracking-tight uppercase leading-snug ${theme === 'dark' ? 'text-[#D7E2EA]' : 'text-slate-900'
                    }`}>
                    {cert.title}
                  </h3>
                  <p className={`text-xs sm:text-sm font-normal mt-2 leading-relaxed line-clamp-3 ${theme === 'dark' ? 'text-[#D7E2EA]/70' : 'text-slate-700'
                    }`}>
                    {cert.description}
                  </p>
                </div>

                {/* Bottom View Button */}
                <div className={`flex justify-between items-center mt-auto border-t pt-4 relative z-10 ${theme === 'dark' ? 'border-[#D7E2EA]/10' : 'border-[#0F172A]/10'
                  }`}>
                  <span className={`text-[10px] sm:text-xs tracking-wider font-mono font-semibold ${theme === 'dark' ? 'text-[#D7E2EA]/50' : 'text-slate-600'
                    }`}>
                    DATE: {cert.date}
                  </span>
                  <motion.button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCert(cert);
                    }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    className="px-5 py-2 text-xs font-bold tracking-wider text-white uppercase rounded-full shadow-lg transition-all duration-200"
                    style={{
                      background: theme === 'dark'
                        ? 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)'
                        : 'linear-gradient(123deg, #312E81 0%, #4338CA 40%, #6D28D9 75%, #A855F7 100%)',
                      boxShadow: '0 4px 14px rgba(67, 56, 202, 0.35)',
                    }}
                  >
                    View Certificate
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CREDENTIAL MODAL VIEWER WITH ROCK-SOLID HIGH-DEFINITION DIGITAL CERTIFICATE DOCUMENT PREVIEW */}
      {selectedCert && typeof document !== 'undefined' && createPortal(
        <AnimatePresence mode="wait">
          <div key="modal-container-wrapper" className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop Layer */}
            <motion.div
              key="modal-backdrop-layer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setSelectedCert(null)}
            />

            {/* Modal Card Content */}
            <motion.div
              key={`modal-card-content-${selectedCert.num}`}
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: 'spring', damping: 24, stiffness: 320 }}
              className={`w-full max-w-4xl border rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl flex flex-col relative z-10 my-auto max-h-[92vh] ${theme === 'dark' ? 'bg-[#121214] border-[#D7E2EA]/20 text-[#D7E2EA]' : 'bg-white border-[#0F172A]/20 text-slate-900'
                }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`flex items-center justify-between px-6 sm:px-8 py-4 border-b shrink-0 ${theme === 'dark' ? 'border-[#D7E2EA]/10 bg-[#161618]' : 'border-[#0F172A]/10 bg-slate-50'
                }`}>
                <div className="flex items-center gap-3">
                  <Award className="w-7 h-7 text-indigo-500 animate-pulse" style={{ color: selectedCert.themeColor }} />
                  <div className="text-left">
                    <h3 className={`text-sm sm:text-base font-black uppercase tracking-tight ${theme === 'dark' ? 'text-[#D7E2EA]' : 'text-slate-900'
                      }`}>
                      {selectedCert.title}
                    </h3>
                    <p className={`text-[10px] sm:text-xs uppercase tracking-widest font-mono font-bold ${theme === 'dark' ? 'text-cyan-400' : 'text-indigo-700'
                      }`}>
                      Issued by {selectedCert.issuer}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {selectedCert.pdfUrl && (
                    <a
                      href={selectedCert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-extrabold uppercase rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      View PDF Document
                    </a>
                  )}

                  {selectedCert.verifyUrl && (
                    <a
                      href={selectedCert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-extrabold uppercase rounded-full border transition-all ${theme === 'dark'
                          ? 'border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/10'
                          : 'border-indigo-500/40 text-indigo-700 hover:bg-indigo-500/10'
                        }`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Verify Link
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => setSelectedCert(null)}
                    className={`p-2.5 rounded-full border transition-all ${theme === 'dark'
                        ? 'hover:bg-white/10 border-[#D7E2EA]/20 text-[#D7E2EA]'
                        : 'hover:bg-slate-200 border-[#0F172A]/20 text-slate-900'
                      }`}
                    title="Close Certificate Preview"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body / High-Definition Digital Certificate Document Graphic Preview & PDF option */}
              <div className={`flex-grow relative flex flex-col items-center justify-center p-4 sm:p-8 overflow-y-auto ${theme === 'dark' ? 'bg-[#09090A]' : 'bg-slate-100'
                }`}>
                
                {/* Optional PDF Direct Link Bar for mobile or direct download */}
                {selectedCert.pdfUrl && (
                  <div className="w-full max-w-3xl mb-4 flex justify-between items-center bg-indigo-950/20 border border-indigo-500/30 p-3 rounded-2xl">
                    <span className="text-xs font-bold flex items-center gap-2 text-indigo-300">
                      <FileText className="w-4 h-4 text-indigo-400" />
                      Official PDF Certificate File Available
                    </span>
                    <a
                      href={selectedCert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 text-xs font-black uppercase tracking-wider rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Open Original PDF
                    </a>
                  </div>
                )}

                {/* PDF Embedded iFrame if available, else Graphic Certificate Document */}
                {selectedCert.pdfUrl ? (
                  <div className="w-full max-w-3xl h-[60vh] min-h-[400px] border-2 border-slate-300/40 rounded-2xl overflow-hidden shadow-2xl bg-white">
                    <iframe
                      src={`${selectedCert.pdfUrl}#toolbar=0`}
                      className="w-full h-full border-0"
                      title={selectedCert.title}
                    />
                  </div>
                ) : (
                  <div className={`w-full max-w-3xl border-4 border-double rounded-3xl p-6 sm:p-10 flex flex-col justify-between items-center text-center shadow-2xl relative bg-white text-slate-900 ${theme === 'dark' ? 'border-indigo-500/40 shadow-indigo-950/40' : 'border-indigo-600/40 shadow-indigo-500/15'
                    }`}>
                    {/* Decorative Corner Seals */}
                    <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-indigo-600" />
                    <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-indigo-600" />
                    <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-indigo-600" />
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-indigo-600" />

                    {/* Certificate Top Header */}
                    <div className="w-full flex justify-between items-center border-b-2 border-slate-200 pb-4 mb-5">
                      <div className="text-left">
                        <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-indigo-700">
                          {selectedCert.issuer}
                        </span>
                        {selectedCert.certId && (
                          <span className="block text-[10px] font-mono text-slate-500 font-bold mt-0.5">
                            VERIFIED ID: {selectedCert.certId}
                          </span>
                        )}
                      </div>

                      {/* Badge Pill */}
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-[10px] font-black uppercase tracking-wider shadow-sm">
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                        {selectedCert.badgeText}
                      </div>
                    </div>

                    {/* Certificate Title */}
                    <div className="my-2">
                      <span className="text-[10px] sm:text-xs tracking-[0.3em] font-extrabold uppercase text-slate-400 block mb-1">
                        OFFICIAL CERTIFICATE OF COMPLETION
                      </span>
                      <h4 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-indigo-700 leading-tight">
                        {selectedCert.title}
                      </h4>
                    </div>

                    {/* Recipient */}
                    <div className="my-4">
                      <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">THIS ACKNOWLEDGMENT IS PROUDLY PRESENTED TO</span>
                      <h5 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-wide mt-1 underline decoration-indigo-600 underline-offset-8">
                        {selectedCert.recipient}
                      </h5>
                    </div>

                    {/* Accomplishment Description */}
                    <p className="text-xs sm:text-sm font-medium text-slate-700 max-w-xl mx-auto leading-relaxed my-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left sm:text-center shadow-inner">
                      {selectedCert.description}
                    </p>

                    {/* Verification Stamps */}
                    <div className="flex flex-wrap justify-center gap-2 my-3">
                      {selectedCert.stamps.map((stamp, i) => (
                        <span key={i} className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-800 flex items-center gap-1 shadow-sm">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          {stamp}
                        </span>
                      ))}
                    </div>

                    {/* Certificate Footer / Signatures */}
                    <div className="w-full flex justify-between items-end border-t-2 border-slate-200 pt-5 mt-4 text-left">
                      <div>
                        <span className="block text-[9px] font-bold text-slate-400 uppercase font-mono">ISSUE DATE</span>
                        <span className="text-xs sm:text-sm font-black text-slate-950 font-mono">{selectedCert.date}</span>
                      </div>

                      <div className="text-right">
                        <span className="block text-base sm:text-lg font-serif italic font-bold text-indigo-800">
                          {selectedCert.signatory}
                        </span>
                        <span className="block text-[10px] font-extrabold text-slate-600 uppercase font-mono">
                          {selectedCert.signatoryRole}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};
