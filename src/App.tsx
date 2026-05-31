


import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// ============================================================================
// 1CARUS Agency Website
// React + TypeScript + Tailwind + Framer Motion
// Premium cinematic conversion - With Game-Style Team Modal Cards
// ============================================================================

// ----------------------------- Types ----------------------------------------
interface StatItem {
  target: number;
  suffix: string;
  label: string;
  isDecimal?: boolean;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  subtitle: string;
  bio: string;
  specialties: string[];
  quote: string;
  gameStyle: string;
  gradientFrom: string;
  gradientTo: string;
}

// ----------------------------- Team Data ------------------------------------
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Arjun Mehta",
    role: "Creative Director",
    subtitle: "The Visionary",
    bio: "Former creative lead at award-winning studios, Arjun brings cinematic storytelling and strategic vision. He has directed campaigns for top-tier brands and festivals across India.",
    specialties: ["Direction", "Storyboarding", "Client Alchemy"],
    quote: "Every frame must fight for attention.",
    gameStyle: "GTA VI - Mastermind",
    gradientFrom: "#d4a843",
    gradientTo: "#e8822a",
  },
  {
    id: 2,
    name: "Riya Sharma",
    role: "Lead Cinematographer",
    subtitle: "Frame Hunter",
    bio: "With a background in documentary and commercial cinematography, Riya sculpts light and shadow to create unforgettable imagery. Her work has been featured at film festivals worldwide.",
    specialties: ["Cinematography", "Lighting Design", "Drone Ops"],
    quote: "Light is my language.",
    gameStyle: "Cricket 26 - Cover Star",
    gradientFrom: "#b87333",
    gradientTo: "#ff6b35",
  },
  {
    id: 3,
    name: "Devansh Khanna",
    role: "Motion Graphics Artist",
    subtitle: "Motion Alchemist",
    bio: "Devansh turns abstract ideas into dynamic motion. His expertise in After Effects and Blender adds the kinetic energy that makes scroll-stopping content.",
    specialties: ["2D/3D Animation", "VFX", "Typography"],
    quote: "Movement is emotion.",
    gameStyle: "GTA VI - Street Artist",
    gradientFrom: "#2a2a72",
    gradientTo: "#009ffd",
  },
  {
    id: 4,
    name: "Ananya Verma",
    role: "Social Media Strategist",
    subtitle: "Algorithm Whisperer",
    bio: "Ananya decodes platform algorithms and audience psychology to engineer viral growth. She has grown multiple brands to 100k+ engaged followers.",
    specialties: ["Strategy", "Community Building", "Analytics"],
    quote: "Data + Creativity = Impact.",
    gameStyle: "Cricket 26 - Strategist",
    gradientFrom: "#d4a843",
    gradientTo: "#a67c00",
  },
  {
    id: 5,
    name: "Kabir Sinha",
    role: "Color Grading Specialist",
    subtitle: "Chroma Sorcerer",
    bio: "Kabir's color grades give each project a cinematic signature. Trained under Hollywood colorists, he ensures every pixel feels intentional.",
    specialties: ["Color Grading", "DaVinci Resolve", "Look Development"],
    quote: "Color tells the story before a word is spoken.",
    gameStyle: "GTA VI - Neon Expert",
    gradientFrom: "#6a11cb",
    gradientTo: "#2575fc",
  },
  {
    id: 6,
    name: "Zara Mistry",
    role: "3D & VFX Artist",
    subtitle: "Polygon Warlock",
    bio: "Zara builds worlds from scratch. Her 3D environments and VFX sequences add surreal, high-budget flair to brand campaigns.",
    specialties: ["3D Modeling", "Simulation", "Compositing"],
    quote: "Reality is just another render.",
    gameStyle: "Cricket 26 - Stadium Builder",
    gradientFrom: "#ff6b35",
    gradientTo: "#f7b733",
  },
  {
    id: 7,
    name: "Rohan Nair",
    role: "Event Production Lead",
    subtitle: "Hype Architect",
    bio: "Rohan orchestrates large-scale event coverage and hype cycles. From product launches to music festivals, he creates FOMO that converts.",
    specialties: ["Live Production", "Project Management", "Teaser Campaigns"],
    quote: "Moments matter. We capture them.",
    gameStyle: "GTA VI - Event Kingpin",
    gradientFrom: "#b224ef",
    gradientTo: "#7579ff",
  },
  {
    id: 8,
    name: "Tanya Iyer",
    role: "Copywriter / Storyteller",
    subtitle: "Word Sniper",
    bio: "Tanya crafts copy that cuts through the noise. Her narratives build emotional bridges between brands and audiences, driving action.",
    specialties: ["Copywriting", "Scriptwriting", "Brand Voice"],
    quote: "Words that linger long after the scroll.",
    gameStyle: "Cricket 26 - Wordsmith",
    gradientFrom: "#cb356b",
    gradientTo: "#bd3f32",
  },
];

// ----------------------------- Custom Cursor Hook ----------------------------
const useCustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ring) {
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
      }
      requestAnimationFrame(animateRing);
    };

    const animateRingId = requestAnimationFrame(animateRing);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animateRingId);
    };
  }, [isMobile]);

  const onElementHover = useCallback((isHovering: boolean) => {
    if (isMobile) return;
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (cursor && ring) {
      if (isHovering) {
        cursor.style.width = '18px';
        cursor.style.height = '18px';
        ring.style.width = '58px';
        ring.style.height = '58px';
      } else {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        ring.style.width = '38px';
        ring.style.height = '38px';
      }
    }
  }, [isMobile]);

  return { cursorRef, ringRef, onElementHover, isMobile };
};

// ----------------------------- Counter Animation Hook ------------------------
const useCounter = (target: number, suffix: string, isDecimal: boolean = false) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 1600;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;
            if (target >= 1000) {
              setCount(Math.floor(current));
            } else {
              setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
            }
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, isDecimal]);

  return { ref, displayValue: count, suffix };
};

// ----------------------------- Subcomponents ---------------------------------
const SectionLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`flex items-center gap-3 font-mono text-[9px] tracking-[5px] uppercase text-[#d4a843] ${className || ''}`}>
    <span className="block w-7 h-px bg-[#d4a843]" />
    {children}
  </div>
);

const RevealOnScroll: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px -40px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.8, delay: delay * 0.12, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Stats Grid Item
const StatBox: React.FC<StatItem> = ({ target, suffix, label, isDecimal = false }) => {
  const { ref, displayValue, suffix: displayedSuffix } = useCounter(target, suffix, isDecimal);
  return (
    <div ref={ref} className="stat-box group bg-black p-8 relative overflow-hidden transition-all duration-300 hover:bg-[rgba(212,168,67,0.04)] cursor-default">
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(212,168,67,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="font-bebas text-5xl bg-gradient-to-r from-[#d4a843] to-[#e8822a] bg-clip-text text-transparent mb-1.5">
        {displayValue}{displayedSuffix}
      </div>
      <div className="font-mono text-[8px] tracking-[2px] uppercase text-[#777] leading-relaxed">{label}</div>
    </div>
  );
};

// Service Card
const ServiceCard: React.FC<{ num: string; name: string; subtitle: string; desc: string; icon: React.ReactNode; delay?: number }> = ({ num, name, subtitle, desc, icon, delay = 0 }) => (
  <RevealOnScroll delay={delay}>
    <div className="service-card group bg-[#111] p-12 relative overflow-hidden transition-all duration-400 cursor-default hover:bg-[rgba(212,168,67,0.04)]">
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#d4a843] to-[#ff6b35] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
      <div className="absolute top-5 right-5 font-bebas text-7xl text-transparent [-webkit-text-stroke:1px_rgba(212,168,67,0.1)] group-hover:[-webkit-text-stroke-color:rgba(212,168,67,0.22)] transition-all">{num}</div>
      <div className="w-11 h-11 mb-6">{icon}</div>
      <div className="font-bebas text-2xl tracking-[2px] mb-1">{name}</div>
      <div className="font-mono text-[8px] tracking-[3px] uppercase text-[#d4a843] mb-4">{subtitle}</div>
      <p className="text-xs font-light text-[#888] leading-relaxed">{desc}</p>
    </div>
  </RevealOnScroll>
);

// Software Card
const SoftwareCard: React.FC<{ name: string; desc: string; bgColor: string; icon: React.ReactNode; delay?: number }> = ({ name, desc, bgColor, icon, delay = 0 }) => (
  <RevealOnScroll delay={delay}>
    <div className="sw-card group bg-black text-center p-10 relative overflow-hidden transition-all duration-300 cursor-default hover:bg-[rgba(212,168,67,0.04)] flex flex-col items-center gap-4">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#d4a843] to-[#ff6b35] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-center" />
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5`} style={{ backgroundColor: bgColor }}>
        {icon}
      </div>
      <div className="font-bebas text-base tracking-[2px] text-white">{name}</div>
      <div className="font-mono text-[8px] tracking-[2px] uppercase text-[#777] leading-relaxed">{desc}</div>
    </div>
  </RevealOnScroll>
);

// Game-Style Team Member Card with Modal
const TeamMemberCard: React.FC<{ member: TeamMember; onClick: () => void; delay?: number }> = ({ member, onClick, delay = 0 }) => {
  return (
    <RevealOnScroll delay={delay}>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={onClick}
        className="team-card group relative bg-gradient-to-br from-[#111] to-black rounded-xl overflow-hidden cursor-pointer border border-[rgba(212,168,67,0.15)] hover:border-[rgba(212,168,67,0.5)] transition-all duration-300"
      >
        {/* Game-style portrait placeholder with glitch effect */}
        <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-gray-900 to-black">
          <div
            className="absolute inset-0 opacity-30 mix-blend-overlay"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, ${member.gradientFrom}20 0px, ${member.gradientFrom}20 2px, transparent 2px, transparent 8px)`,
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-2 border-[#d4a843] shadow-[0_0_20px_rgba(212,168,67,0.3)] flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <span className="font-bebas text-5xl text-[#d4a843]">{member.id.toString().padStart(2, '0')}</span>
            </div>
            <div className="mt-4 text-center">
              <div className="font-mono text-[8px] tracking-[4px] uppercase text-[#d4a843]">{member.gameStyle.split(' - ')[0]}</div>
              <div className="text-xs text-[#777] mt-1">{member.gameStyle.split(' - ')[1] || "Character"}</div>
            </div>
          </div>
          {/* Scanline overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4a843] to-transparent opacity-60" />
        </div>

        {/* Card info */}
        <div className="p-5 text-center">
          <h3 className="font-bebas text-xl tracking-[1px] text-white">{member.name}</h3>
          <p className="font-mono text-[9px] tracking-[2px] text-[#d4a843] mt-1">{member.role}</p>
          <p className="text-[10px] text-[#999] italic mt-2">"{member.subtitle}"</p>
          <div className="mt-3 flex justify-center gap-2">
            <span className="inline-block px-2 py-0.5 text-[7px] font-mono tracking-wider uppercase bg-[rgba(212,168,67,0.1)] border border-[rgba(212,168,67,0.2)] rounded text-[#d4a843]">View Dossier</span>
          </div>
        </div>
      </motion.div>
    </RevealOnScroll>
  );
};

// Modal Component for Team Member Details
const TeamModal: React.FC<{ member: TeamMember | null; onClose: () => void }> = ({ member, onClose }) => {
  useEffect(() => {
    if (member) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [member]);

  if (!member) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="relative max-w-2xl w-full bg-gradient-to-br from-[#111] to-black rounded-2xl border border-[rgba(212,168,67,0.3)] shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 border border-[rgba(212,168,67,0.3)] text-[#d4a843] hover:bg-[#d4a843] hover:text-black transition-all">✕</button>

          {/* Hero section with game style */}
          <div className="relative h-48 bg-gradient-to-r from-[#1a1a1a] to-black overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 40%, ${member.gradientFrom} 0%, transparent 60%)`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-28 h-28 rounded-full border-4 border-[#d4a843] shadow-[0_0_30px_rgba(212,168,67,0.5)] flex items-center justify-center bg-black/80 backdrop-blur-sm">
                <span className="font-bebas text-6xl text-[#d4a843]">{member.id.toString().padStart(2, '0')}</span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="text-center mb-6">
              <h2 className="font-bebas text-4xl md:text-5xl text-white">{member.name}</h2>
              <p className="font-mono text-xs tracking-[3px] text-[#d4a843] mt-1">{member.role}</p>
              <p className="text-sm text-[#999] italic mt-2">“{member.subtitle}”</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bebas text-xl text-[#d4a843] mb-2">Bio</h3>
                <p className="text-sm text-[#ccc] leading-relaxed">{member.bio}</p>
                <div className="mt-4">
                  <h3 className="font-bebas text-xl text-[#d4a843] mb-2">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((spec) => (
                      <span key={spec} className="px-3 py-1 text-[10px] font-mono uppercase bg-[rgba(212,168,67,0.1)] border border-[rgba(212,168,67,0.2)] rounded-full text-[#d4a843]">{spec}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bebas text-xl text-[#d4a843] mb-2">Game Style</h3>
                <div className="bg-black/50 p-3 rounded-lg border border-[rgba(212,168,67,0.2)]">
                  <p className="text-sm font-mono text-[#d4a843]">{member.gameStyle}</p>
                </div>
                <div className="mt-4">
                  <h3 className="font-bebas text-xl text-[#d4a843] mb-2">Signature Quote</h3>
                  <p className="text-base italic text-white border-l-2 border-[#d4a843] pl-4">“{member.quote}”</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[rgba(212,168,67,0.2)] text-center">
              <button onClick={onClose} className="px-6 py-2 bg-gradient-to-r from-[#d4a843] to-[#e8822a] text-black font-mono text-[10px] tracking-[3px] uppercase rounded hover:shadow-lg transition-all">Close Profile</button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Cinematic Card
const CinematicCard: React.FC<{ label: string; visualClass: string }> = ({ label, visualClass }) => (
  <div className="cine-card w-[320px] h-[200px] relative overflow-hidden flex-shrink-0 bg-[#1a1a1a]">
    <div className={`absolute inset-0 overflow-hidden ${visualClass}`} />
    <div className="absolute inset-0 flex items-end p-5">
      <span className="relative z-10 font-bebas text-sm tracking-[3px] text-[rgba(212,168,67,0.7)]">{label}</span>
    </div>
  </div>
);

// ----------------------------- Main App Component ---------------------------
const App: React.FC = () => {
  const { cursorRef, ringRef, onElementHover, isMobile } = useCustomCursor();
  const [scrolled, setScrolled] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('a, button, .service-card, .sw-card, .stat-box, .client-type, .team-card, .process-step, .tag');
    const handleMouseEnter = () => onElementHover(true);
    const handleMouseLeave = () => onElementHover(false);
    elements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });
    return () => {
      elements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [onElementHover]);

  // Service Icons
  const serviceIcons = {
    cinema: <svg viewBox="0 0 44 44" fill="none"><circle cx="22" cy="22" r="10" stroke="#d4a843" strokeWidth="1.5" /><path d="M22 4v5M22 35v5M4 22h5M35 22h5" stroke="#d4a843" strokeWidth="1.5" strokeLinecap="round" /><path d="M18 22l6-4v8l-6-4z" fill="#d4a843" /></svg>,
    hype: <svg viewBox="0 0 44 44" fill="none"><path d="M6 34l8-12 8 6 8-16 8 10" stroke="#d4a843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="38" cy="10" r="4" stroke="#e8822a" strokeWidth="1.5" /><path d="M6 38h32" stroke="#555" strokeWidth="1" strokeLinecap="round" /></svg>,
    algorithm: <svg viewBox="0 0 44 44" fill="none"><rect x="6" y="14" width="32" height="20" rx="2" stroke="#d4a843" strokeWidth="1.5" /><path d="M14 14v-4a8 8 0 0116 0v4" stroke="#d4a843" strokeWidth="1.5" strokeLinecap="round" /><circle cx="22" cy="24" r="3" fill="#e8822a" /><path d="M22 27v4" stroke="#e8822a" strokeWidth="1.5" strokeLinecap="round" /></svg>,
    viral: <svg viewBox="0 0 44 44" fill="none"><path d="M10 34V18l12-8 12 8v16" stroke="#d4a843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><rect x="18" y="26" width="8" height="8" stroke="#e8822a" strokeWidth="1.5" /><path d="M22 10v4" stroke="#d4a843" strokeWidth="1.5" strokeLinecap="round" /></svg>,
    visibility: <svg viewBox="0 0 44 44" fill="none"><circle cx="22" cy="22" r="15" stroke="#d4a843" strokeWidth="1.5" /><path d="M22 7v4M22 33v4M7 22h4M33 22h4" stroke="#d4a843" strokeWidth="1" opacity="0.4" strokeLinecap="round" /><circle cx="22" cy="22" r="6" stroke="#e8822a" strokeWidth="1.5" /></svg>,
    event: <svg viewBox="0 0 44 44" fill="none"><rect x="6" y="6" width="14" height="14" rx="1" stroke="#d4a843" strokeWidth="1.5" /><rect x="24" y="6" width="14" height="14" rx="1" stroke="#d4a843" strokeWidth="1.5" /><rect x="6" y="24" width="14" height="14" rx="1" stroke="#d4a843" strokeWidth="1.5" /><rect x="24" y="24" width="14" height="14" rx="1" stroke="#e8822a" strokeWidth="1.5" /></svg>,
  };

  // Software Icons
  const softwareIcons = {
    ps: <span className="text-[#31A8FF] font-black text-xl">Ps</span>,
    ai: <span className="text-[#FF9A00] font-black text-xl">Ai</span>,
    pr: <span className="text-[#9999FF] font-black text-xl">Pr</span>,
    lr: <span className="text-[#31A8FF] font-black text-xl">Lr</span>,
    ae: <span className="text-[#9999FF] font-black text-xl">Ae</span>,
    blender: <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8"><circle cx="22" cy="18" r="8" stroke="#EA7600" strokeWidth="2" /><circle cx="22" cy="18" r="3" fill="#EA7600" /><path d="M6 28l8-10" stroke="#EA7600" strokeWidth="2" strokeLinecap="round" /><circle cx="13" cy="12" r="4" stroke="#EA7600" strokeWidth="1.5" /></svg>,
    davinci: <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8"><circle cx="18" cy="18" r="14" stroke="#E8B94F" strokeWidth="1.5" /><circle cx="18" cy="18" r="5" fill="#E8B94F" opacity="0.5" /><path d="M18 4v28M4 18h28" stroke="#E8B94F" strokeWidth="1" opacity="0.3" /></svg>,
    canva: <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8"><circle cx="18" cy="18" r="13" stroke="#00C4CC" strokeWidth="2" /><path d="M12 18a6 6 0 0110.4-6M24 18a6 6 0 01-10.4 6" stroke="#00C4CC" strokeWidth="2" strokeLinecap="round" /></svg>,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,600;1,9..40,300&family=Space+Mono:wght@400;700&display=swap');
        
        :root { --black: #050505; --white: #f5f0e8; --gold: #d4a843; --amber: #e8822a; --ember: #ff6b35; --dim: #111111; --dim2: #1a1a1a; --muted: #555; --text-dim: #777; }
        
        body { background: var(--black); color: var(--white); font-family: 'DM Sans', sans-serif; overflow-x: hidden; cursor: none; margin: 0; }
        @media (max-width: 768px) { body { cursor: auto; } }
        
        /* Noise overlay */
        body::before { content: ''; position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); background-size: 200px; pointer-events: none; z-index: 1000; opacity: 0.45; }
        
        /* Hero specific animations */
        .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 60% 40%, rgba(212,168,67,0.07) 0%, transparent 55%), radial-gradient(ellipse 50% 80% at 20% 90%, rgba(232,130,42,0.06) 0%, transparent 55%), radial-gradient(ellipse 60% 40% at 80% 10%, rgba(192,57,43,0.04) 0%, transparent 50%); animation: bgPulse 8s ease-in-out infinite; }
        @keyframes bgPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
        
        .lens-flare { position: absolute; width: 2px; height: 2px; background: var(--gold); border-radius: 50%; box-shadow: 0 0 60px 40px rgba(212,168,67,0.06), 0 0 120px 80px rgba(212,168,67,0.03); top: 30%; left: 65%; animation: flareFloat 10s ease-in-out infinite; pointer-events: none; }
        @keyframes flareFloat { 0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; } 33% { transform: translate(-30px, 20px) scale(1.3); opacity: 1; } 66% { transform: translate(20px, -15px) scale(0.8); opacity: 0.4; } }
        
        .hero-scanlines { position: absolute; inset: 0; z-index: 1; background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px); opacity: 0.3; pointer-events: none; }
        
        .hero-lines::before { content: ''; position: absolute; top: -20%; right: -3%; width: 1px; height: 140%; background: linear-gradient(to bottom, transparent, rgba(212,168,67,0.25), transparent); transform: rotate(10deg); animation: linePulse 5s ease-in-out infinite; }
        .hero-lines::after { content: ''; position: absolute; top: -20%; right: 18%; width: 1px; height: 140%; background: linear-gradient(to bottom, transparent, rgba(212,168,67,0.1), transparent); transform: rotate(10deg); animation: linePulse 5s ease-in-out infinite 2s; }
        @keyframes linePulse { 0%, 100% { opacity: .4; } 50% { opacity: 1; } }
        
        .orbit { position: absolute; border-radius: 50%; pointer-events: none; top: 50%; left: 50%; transform: translate(-50%, -50%); border: 1px solid rgba(212,168,67,0.05); animation: orbitSpin 30s linear infinite; }
        @keyframes orbitSpin { to { transform: translate(-50%, -50%) rotate(360deg); } }
        
        .film-strip { position: absolute; top: 0; left: 0; bottom: 0; width: 40px; border-right: 1px solid rgba(212,168,67,0.08); background: repeating-linear-gradient(to bottom, rgba(212,168,67,0.05) 0, rgba(212,168,67,0.05) 12px, transparent 12px, transparent 28px); z-index: 2; pointer-events: none; }
        .film-strip-right { left: auto; right: 0; border-right: none; border-left: 1px solid rgba(212,168,67,0.08); }
        
        /* Ticker */
        .ticker-track { display: flex; animation: ticker 30s linear infinite; width: max-content; }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        
        /* Cinematic Strip */
        .cine-track { display: flex; gap: 3px; animation: cineSlide 30s linear infinite; width: max-content; flex-shrink: 0; }
        @keyframes cineSlide { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .cine-strip:hover .cine-track { animation-play-state: paused; }
        .cine-strip::before, .cine-strip::after { content: ''; position: absolute; top: 0; bottom: 0; width: 120px; z-index: 3; pointer-events: none; }
        .cine-strip::before { left: 0; background: linear-gradient(to right, var(--dim), transparent); }
        .cine-strip::after { right: 0; background: linear-gradient(to left, var(--dim), transparent); }
        
        /* Cinematic Visual Classes */
        .cv1 { background: radial-gradient(circle at 50% 50%, #1a0a00, #050505); }
        .cv1::before { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 120px; height: 120px; border-radius: 50%; border: 2px solid rgba(212,168,67,0.4); box-shadow: 0 0 0 10px rgba(212,168,67,0.05), 0 0 0 20px rgba(212,168,67,0.03), 0 0 60px rgba(212,168,67,0.08) inset; }
        .cv1::after { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 50px; height: 50px; border-radius: 50%; background: radial-gradient(circle, rgba(212,168,67,0.15), transparent); box-shadow: 0 0 30px rgba(212,168,67,0.2); }
        .cv2 { background: linear-gradient(to top, #0a0500, #050505); }
        .cv2::before { content: ''; position: absolute; top: -20%; left: 30%; width: 2px; height: 80%; transform: rotate(-15deg); background: linear-gradient(to bottom, rgba(212,168,67,0.4), transparent); box-shadow: 0 0 20px rgba(212,168,67,0.3), -40px 0 2px 0 rgba(232,130,42,0.3), 40px 0 2px 0 rgba(255,107,53,0.25); }
        .cv2::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 40%; background: radial-gradient(ellipse at center bottom, rgba(212,168,67,0.08), transparent); }
        .cv3 { background: #050505; }
        .cv3::before { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100px; height: 100px; border-radius: 50%; border: 3px solid rgba(212,168,67,0.25); background: repeating-conic-gradient(rgba(212,168,67,0.03) 0deg 30deg, transparent 30deg 60deg); }
        .cv3::after { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 30px; height: 30px; border-radius: 50%; background: rgba(212,168,67,0.12); border: 1px solid rgba(212,168,67,0.3); }
        .cv4 { background: #050505; background-image: radial-gradient(circle 20px at 30% 40%, rgba(212,168,67,0.15), transparent), radial-gradient(circle 35px at 70% 60%, rgba(232,130,42,0.1), transparent), radial-gradient(circle 15px at 50% 20%, rgba(212,168,67,0.08), transparent), radial-gradient(circle 25px at 20% 70%, rgba(255,107,53,0.08), transparent), radial-gradient(circle 40px at 85% 25%, rgba(212,168,67,0.06), transparent); }
        .cv5 { background: linear-gradient(135deg, #1a0a00 0%, #050505 40%, #00051a 100%); }
        .cv5::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(212,168,67,0.015) 20px, rgba(212,168,67,0.015) 40px); }
        .cv5::after { content: ''; position: absolute; top: 20%; left: 10%; right: 10%; bottom: 20%; border: 1px solid rgba(212,168,67,0.15); box-shadow: 0 0 40px rgba(212,168,67,0.05) inset; }
        .cv6 { background: #050505; background-image: repeating-linear-gradient(85deg, transparent, transparent 3px, rgba(212,168,67,0.03) 3px, rgba(212,168,67,0.03) 6px); }
        .cv6::before { content: ''; position: absolute; left: 0; right: 0; top: 40%; height: 2px; background: linear-gradient(90deg, transparent, rgba(212,168,67,0.6), rgba(232,130,42,0.4), transparent); box-shadow: 0 0 20px rgba(212,168,67,0.3); }
        
        /* Scroll hint animation */
        .scroll-line { width: 1px; height: 50px; background: linear-gradient(to bottom, var(--gold), transparent); animation: scrollLine 2s ease-in-out infinite; }
        @keyframes scrollLine { 0%, 100% { transform: scaleY(1); opacity: .6; } 50% { transform: scaleY(1.3); opacity: 1; } }
        
        .font-bebas { font-family: 'Bebas Neue', sans-serif; }
        .font-mono-custom { font-family: 'Space Mono', monospace; }
        .text-stroke-gold { color: transparent; -webkit-text-stroke: 1px rgba(212,168,67,0.25); }
        .text-stroke-gold-light { color: transparent; -webkit-text-stroke: 1px rgba(212,168,67,0.2); }
      `}</style>

      {/* Custom Cursor Elements */}
      {!isMobile && (
        <>
          <div ref={cursorRef} className="fixed w-[10px] h-[10px] bg-[#d4a843] rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-all duration-200" />
          <div ref={ringRef} className="fixed w-[38px] h-[38px] border border-[rgba(212,168,67,0.4)] rounded-full pointer-events-none z-[9998] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300" />
        </>
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[900] px-6 md:px-12 py-5 flex justify-between items-center transition-all duration-300 ${scrolled ? 'bg-[rgba(5,5,5,0.97)] backdrop-blur-md' : 'bg-gradient-to-b from-[rgba(5,5,5,0.97)] to-transparent'}`}>
     <img 
  src="https://res.cloudinary.com/dvcbhvxd6/image/upload/v1780201405/6116066441082638571_121_ockknf.jpg" 
  alt="1CARUS Logo"
  className="h-44 w-auto"   // was h-8, now h-12 (48px)
/>
        <ul className="hidden md:flex gap-9">
          <li><a href="#manifesto" className="font-mono text-[9px] tracking-[3px] uppercase text-[#777] hover:text-[#d4a843] transition-colors">About</a></li>
          <li><a href="#services" className="font-mono text-[9px] tracking-[3px] uppercase text-[#777] hover:text-[#d4a843] transition-colors">Services</a></li>
          <li><a href="#software" className="font-mono text-[9px] tracking-[3px] uppercase text-[#777] hover:text-[#d4a843] transition-colors">Arsenal</a></li>
          <li><a href="#process" className="font-mono text-[9px] tracking-[3px] uppercase text-[#777] hover:text-[#d4a843] transition-colors">Process</a></li>
          <li><a href="#team" className="font-mono text-[9px] tracking-[3px] uppercase text-[#777] hover:text-[#d4a843] transition-colors">Team</a></li>
        </ul>
        <a href="#contact" className="font-mono text-[9px] tracking-[3px] uppercase text-black bg-gradient-to-r from-[#d4a843] to-[#e8822a] py-2.5 px-5 transition-transform hover:scale-105 hover:shadow-[0_6px_30px_rgba(212,168,67,0.4)]">Let's Create</a>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="film-strip" />
        <div className="film-strip film-strip-right" />
        <div className="hero-bg" />
        <div className="hero-scanlines" />
        <div className="hero-lines absolute inset-0 overflow-hidden z-1" />
        <div className="lens-flare" />
        <div className="orbit" style={{ width: 500, height: 500, animationDuration: '28s' }} />
        <div className="orbit" style={{ width: 800, height: 800, animationDuration: '46s', animationDirection: 'reverse', borderColor: 'rgba(232,130,42,0.04)' }} />
        <div className="orbit" style={{ width: 1100, height: 1100, animationDuration: '70s', borderColor: 'rgba(212,168,67,0.02)' }} />

        <div className="relative z-10 text-center px-6 max-w-[1100px]">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-mono text-[10px] tracking-[6px] uppercase text-[#d4a843] mb-7">Science in our roots · Cinema in our souls · Impact in our mission</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="font-bebas text-[clamp(68px,13vw,170px)] leading-[0.88] tracking-[-1px] mb-1">
            <span className="block text-stroke-gold text-[clamp(58px,10vw,135px)]">We Turn</span>
            <span className="block bg-gradient-to-r from-[#d4a843] via-[#e8822a] to-[#ff6b35] bg-clip-text text-transparent">Attention</span>
          </motion.h1>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="font-bebas text-[clamp(68px,13vw,170px)] leading-[0.88]">
            <span className="block text-stroke-gold-light text-[clamp(58px,10vw,135px)]">Into</span>
            <span className="block text-white">Impact.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="text-[clamp(13px,1.6vw,17px)] font-light text-[#777] tracking-wide mt-8 mb-12 max-w-[500px] mx-auto leading-relaxed">Cinematic storytelling meets retention-driven strategy. We engineer moments people feel — not content they skip.</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="flex gap-3.5 justify-center flex-wrap">
            <a href="#contact" className="btn-primary font-mono text-[10px] tracking-[3px] uppercase text-black bg-gradient-to-r from-[#d4a843] to-[#e8822a] py-3.5 px-9 relative overflow-hidden transition-all hover:scale-105 hover:shadow-[0_8px_40px_rgba(212,168,67,0.35)] inline-block">Build Your Hype Machine →</a>
            <a href="#services" className="btn-secondary font-mono text-[10px] tracking-[3px] uppercase text-white border border-[rgba(212,168,67,0.35)] py-3.5 px-9 transition-all hover:border-[#d4a843] hover:text-[#d4a843] inline-block">Our Arsenal</a>
          </motion.div>
        </div>

        <div className="absolute right-[6%] bottom-[12%] font-bebas text-[220px] leading-none text-transparent [-webkit-text-stroke:1px_rgba(212,168,67,0.06)] pointer-events-none z-2 transition-transform duration-200" style={{ transform: `translateY(${typeof window !== 'undefined' ? window.scrollY * 0.28 : 0}px)` }}>1</div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-[fadeUp_0.8s_ease_forwards_1.6s]">
          <span className="font-mono text-[8px] tracking-[4px] uppercase text-[#777]">Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* Ticker */}
      <div className="bg-[#d4a843] overflow-hidden py-2.5 relative z-5">
        <div className="ticker-track flex w-max">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="ticker-item font-bebas text-[17px] tracking-[4px] text-black px-7 whitespace-nowrap">Brand Films</span>
              <span className="ticker-item text-[#e8822a] px-0">✦</span>
              <span className="ticker-item font-bebas text-[17px] tracking-[4px] text-black px-7 whitespace-nowrap">Social Media Strategy</span>
              <span className="ticker-item text-[#e8822a] px-0">✦</span>
              <span className="ticker-item font-bebas text-[17px] tracking-[4px] text-black px-7 whitespace-nowrap">Cinematic Production</span>
              <span className="ticker-item text-[#e8822a] px-0">✦</span>
              <span className="ticker-item font-bebas text-[17px] tracking-[4px] text-black px-7 whitespace-nowrap">Event Coverage</span>
              <span className="ticker-item text-[#e8822a] px-0">✦</span>
              <span className="ticker-item font-bebas text-[17px] tracking-[4px] text-black px-7 whitespace-nowrap">Algorithm Hacking</span>
              <span className="ticker-item text-[#e8822a] px-0">✦</span>
              <span className="ticker-item font-bebas text-[17px] tracking-[4px] text-black px-7 whitespace-nowrap">Hype-Cycle Engineering</span>
              <span className="ticker-item text-[#e8822a] px-0">✦</span>
              <span className="ticker-item font-bebas text-[17px] tracking-[4px] text-black px-7 whitespace-nowrap">Digital Marketing</span>
              <span className="ticker-item text-[#e8822a] px-0">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Manifesto Section */}
      <section id="manifesto" className="px-6 md:px-12 py-20 md:py-[130px] max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 md:gap-20">
        <div>
          <SectionLabel>Our Origin</SectionLabel>
          <RevealOnScroll delay={1}>
            <h2 className="font-bebas text-[clamp(44px,5.5vw,76px)] leading-[1.02] mb-7">Grabbing attention is <em className="not-italic bg-gradient-to-r from-[#d4a843] to-[#e8822a] bg-clip-text text-transparent">science</em> —<br />keeping it is <em className="not-italic bg-gradient-to-r from-[#d4a843] to-[#e8822a] bg-clip-text text-transparent">art.</em></h2>
          </RevealOnScroll>
          <RevealOnScroll delay={2}>
            <p className="text-[15px] font-light leading-relaxed text-[#999] mb-8">Born between the precision of <strong className="text-white font-semibold">ISER labs</strong> and the hustle of <strong className="text-white font-semibold">Indore</strong>, we learned one thing early. We don't make cookie-cutter reels.</p>
            <p className="text-[15px] font-light leading-relaxed text-[#999] mb-8">We bring <strong className="text-white font-semibold">cinematic storytelling to mobile screens</strong>, blending retention-driven strategy with Hollywood-level production. No "post and pray" — we put the plan into a system. Whether we're building the hype cycle for a festival or capturing a massive crowd, <strong className="text-white font-semibold">we engineer moments people feel.</strong></p>
          </RevealOnScroll>
          <RevealOnScroll delay={3}>
            <a href="#contact" className="btn-primary font-mono text-[10px] tracking-[3px] uppercase text-black bg-gradient-to-r from-[#d4a843] to-[#e8822a] py-3.5 px-9 inline-block mt-2 hover:scale-105 transition-transform">Start the Conversation</a>
          </RevealOnScroll>
        </div>
        <div className="stats-grid border border-[rgba(212,168,67,0.08)] bg-[rgba(212,168,67,0.08)]">
          <StatBox target={52.4} suffix="K+" label="Unique<br>Reach" isDecimal />
          <StatBox target={114.6} suffix="K+" label="Video<br>Plays" isDecimal />
          <StatBox target={84.2} suffix="%" label="Non-Follower<br>Recruitment" isDecimal />
          <StatBox target={4800} suffix="+" label="Saves &<br>Shares" />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-[#111] py-20 md:py-[120px] px-6 md:px-12 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4a843] to-transparent opacity-25" />
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-18 gap-5">
            <div>
              <SectionLabel>Core Arsenal</SectionLabel>
              <RevealOnScroll delay={1}>
                <h2 className="font-bebas text-[clamp(44px,6.5vw,90px)] leading-[0.92]">What We<br /><em className="not-italic bg-gradient-to-r from-[#d4a843] to-[#ff6b35] bg-clip-text text-transparent">Deploy</em></h2>
              </RevealOnScroll>
            </div>
            <RevealOnScroll delay={2}>
              <p className="max-w-[280px] text-[13px] text-[#777] leading-relaxed font-light">Strategy, storytelling, and cinematic production — all engineered to turn attention into impact.</p>
            </RevealOnScroll>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-[rgba(212,168,67,0.07)]">
            <ServiceCard num="01" name="Cinematic Firepower" subtitle="Brand Films & Ads" desc="No shaky phone footage. Cinema rigs, prime lenses, Hollywood-grade color — making your brand look premium, cinematic, and impossible to skip." icon={serviceIcons.cinema} delay={0} />
            <ServiceCard num="02" name="Hype-Cycle Engineering" subtitle="Events & Launches" desc="From product drops to massive festivals — teasers, countdowns, reveals, campaigns that create digital hype machines and turn curiosity into sellouts." icon={serviceIcons.hype} delay={1} />
            <ServiceCard num="03" name="Algorithm Hacking" subtitle="Social SEO & SMM" desc="Posting and praying is dead. Content crafted around watch-time, holding psychology, and platform strategies. Decode trends, dominate the feed." icon={serviceIcons.algorithm} delay={2} />
            <ServiceCard num="04" name="Viral Recruitment" subtitle="Audience Growth" desc="84% non-follower recruitment. We don't make content for you — we make it for your future community. Convert cold viewers into loyal customers." icon={serviceIcons.viral} delay={0} />
            <ServiceCard num="05" name="Algo Visibility" subtitle="Strategic Positioning" desc="524K+ unique reach through strategic algorithm positioning. We decode platform trends, optimize keywords, engineer discoverability that compounds." icon={serviceIcons.visibility} delay={1} />
            <ServiceCard num="06" name="Event Coverage" subtitle="Festivals & Productions" desc="4,800+ saves and shares. Real engagement, real FOMO, real walk-ins. Large-scale events captured with the same cinematic care as premium brand films." icon={serviceIcons.event} delay={2} />
          </div>
        </div>
      </section>

      {/* Software Arsenal Section */}
      <section id="software" className="py-20 md:py-[120px] px-6 md:px-12 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,67,0.2)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,67,0.2)] to-transparent" />
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-18 gap-5">
            <div>
              <SectionLabel>Tech Stack</SectionLabel>
              <RevealOnScroll delay={1}>
                <h2 className="font-bebas text-[clamp(44px,6vw,86px)] leading-[0.92]">Our Creative<br /><em className="not-italic bg-gradient-to-r from-[#d4a843] to-[#e8822a] bg-clip-text text-transparent">Arsenal</em></h2>
              </RevealOnScroll>
            </div>
            <RevealOnScroll delay={2}>
              <p className="max-w-[280px] text-[13px] text-[#777] leading-relaxed font-light">Hollywood-grade tools in the hands of storytellers. Every frame, every cut, every pixel — precision crafted.</p>
            </RevealOnScroll>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[rgba(212,168,67,0.07)]">
            <SoftwareCard name="Photoshop" desc="Photo Editing<br>Compositing" bgColor="#001e36" icon={softwareIcons.ps} delay={0} />
            <SoftwareCard name="Illustrator" desc="Vector Art<br>Brand Design" bgColor="#310000" icon={softwareIcons.ai} delay={1} />
            <SoftwareCard name="Premiere Pro" desc="Video Editing<br>Post Production" bgColor="#00005b" icon={softwareIcons.pr} delay={2} />
            <SoftwareCard name="Lightroom" desc="Color Grading<br>Retouching" bgColor="#001a3d" icon={softwareIcons.lr} delay={3} />
            <SoftwareCard name="After Effects" desc="Motion Graphics<br>VFX" bgColor="#1b003b" icon={softwareIcons.ae} delay={0} />
            <SoftwareCard name="Blender" desc="3D Rendering<br>Animation" bgColor="#1a1a2e" icon={softwareIcons.blender} delay={1} />
            <SoftwareCard name="DaVinci Resolve" desc="Pro Color Grading<br>Audio Mastering" bgColor="#0a1628" icon={softwareIcons.davinci} delay={2} />
            <SoftwareCard name="Canva" desc="Rapid Design<br>Social Assets" bgColor="#0a1f1a" icon={softwareIcons.canva} delay={3} />
          </div>
        </div>
      </section>

      {/* Cinematic Showcase */}
      <section id="cinematic-showcase" className="bg-[#111]">
        <div className="px-6 md:px-12 pt-20 md:pt-[100px] pb-10 max-w-[1200px] mx-auto">
          <SectionLabel>Visual Language</SectionLabel>
          <RevealOnScroll delay={1}>
            <h2 className="font-bebas text-[clamp(44px,7vw,100px)] leading-[0.9]">Cinematic<br /><em className="not-italic bg-gradient-to-r from-[#d4a843] to-[#ff6b35] bg-clip-text text-transparent">Craft</em></h2>
          </RevealOnScroll>
        </div>
        <div className="cine-strip relative overflow-x-hidden">
          <div className="cine-track flex">
            {[...Array(2)].map((_, idx) => (
              <React.Fragment key={idx}>
                <CinematicCard label="CINEMA RIG" visualClass="cv1" />
                <CinematicCard label="STAGE LIGHTING" visualClass="cv2" />
                <CinematicCard label="FILM CRAFT" visualClass="cv3" />
                <CinematicCard label="BOKEH & DEPTH" visualClass="cv4" />
                <CinematicCard label="COLOR GRADE" visualClass="cv5" />
                <CinematicCard label="MOTION & TIME" visualClass="cv6" />
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="px-6 md:px-12 py-12 md:py-[100px] max-w-[1200px] mx-auto">
          <div className="flex flex-wrap gap-2.5">
            {['Brand Films', 'Festival Coverage', 'Product Launches', 'Reels & Shorts', 'Event Teasers', 'Countdowns', 'Reveal Campaigns', 'Social Ads', 'Color Grading', 'Motion Graphics'].map(tag => (
              <span key={tag} className="tag font-mono text-[8px] tracking-[3px] uppercase text-[#777] border border-[rgba(212,168,67,0.15)] py-2 px-4 transition-all hover:border-[rgba(212,168,67,0.5)] hover:text-[#d4a843] cursor-default">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 md:py-[130px] px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <SectionLabel>How We Work</SectionLabel>
          <RevealOnScroll delay={1}>
            <h2 className="font-bebas text-[clamp(44px,6.5vw,90px)] leading-[0.9] mb-12 md:mb-20">The System<br /><span className="bg-gradient-to-r from-[#d4a843] to-[#ff6b35] bg-clip-text text-transparent">Behind the Magic</span></h2>
          </RevealOnScroll>
          <div className="process-steps">
            {[
              { num: '01', name: 'Decode', desc: 'We study your brand, audience, and competition. We decode the algorithm, identify content gaps, and map the psychological hooks that make your audience stop scrolling.' },
              { num: '02', name: 'Engineer', desc: 'Strategy before a single frame is shot. We engineer a hype cycle — teasers, reveals, campaign beats — designed to build anticipation and convert curiosity into action.' },
              { num: '03', name: 'Produce', desc: 'Full cinema rigs, prime lenses, Hollywood-grade color. Every frame intentional. We don\'t hand you footage — we hand you a finished cinematic asset ready to dominate.' },
              { num: '04', name: 'Deploy', desc: 'We optimize for platform algorithms, schedule for peak engagement, and monitor performance in real time. Content goes out with strategy — not hope.' },
              { num: '05', name: 'Amplify', desc: 'Analyze, double down on winners, iterate continuously. Your brand reaches the right audience — and stays there. Impact compounds. Growth is engineered.' },
            ].map((step, idx) => (
              <RevealOnScroll key={step.num} delay={idx}>
                <div className="process-step group grid grid-cols-[55px_1fr] md:grid-cols-[72px_1fr_1fr] gap-5 md:gap-10 py-12 border-b border-[rgba(212,168,67,0.08)] last:border-b-0 transition-all hover:pl-4 cursor-default">
                  <div className="step-num font-bebas text-5xl md:text-6xl leading-none text-transparent [-webkit-text-stroke:1px_rgba(212,168,67,0.25)] group-hover:[-webkit-text-stroke-color:#d4a843] transition-all">{step.num}</div>
                  <div className="step-name font-bebas text-2xl md:text-3xl tracking-[2px] pt-2">{step.name}</div>
                  <p className="step-desc text-[13px] font-light text-[#888] leading-relaxed pt-3 md:col-span-1 md:pt-0">{step.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="py-20 md:py-[110px] px-6 md:px-12 bg-gradient-to-br from-[rgba(212,168,67,0.03)] to-transparent border-t border-[rgba(212,168,67,0.08)]">
        <div className="max-w-[1200px] mx-auto">
          <SectionLabel className="justify-center">Who We Work With</SectionLabel>
          <RevealOnScroll delay={1}>
            <h2 className="font-bebas text-[clamp(36px,5vw,60px)] text-center mb-14">Built for Bold <span className="bg-gradient-to-r from-[#d4a843] to-[#e8822a] bg-clip-text text-transparent">Ambitions</span></h2>
          </RevealOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[rgba(212,168,67,0.07)]">
            {['Brands', 'Startups', 'Institutions', 'Events'].map((client, idx) => (
              <RevealOnScroll key={client} delay={idx}>
                <div className="client-type bg-black py-14 text-center transition-all hover:bg-[rgba(212,168,67,0.05)] cursor-default">
                  <span className="client-icon text-3xl mb-4 block">{['◈', '◉', '◫', '◬'][idx]}</span>
                  <div className="client-name font-bebas text-xl md:text-2xl tracking-[3px]">{client}</div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Updated with Game-style Cards and Modal */}
      <section id="team" className="py-20 md:py-[130px] px-6 md:px-12 bg-[#111] border-t border-[rgba(212,168,67,0.08)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-18 gap-3.5">
            <div>
              <SectionLabel>The Crew</SectionLabel>
              <RevealOnScroll delay={1}>
                <h2 className="font-bebas text-[clamp(44px,6.5vw,90px)] leading-[0.9]">8 Minds.<br /><em className="not-italic bg-gradient-to-r from-[#d4a843] to-[#e8822a] bg-clip-text text-transparent">One Mission.</em></h2>
              </RevealOnScroll>
            </div>
            <RevealOnScroll delay={2}>
              <p className="team-note text-xs text-[#777] italic font-light max-w-[200px] text-right leading-relaxed md:text-left">Click on any agent to view the full dossier.</p>
            </RevealOnScroll>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                onClick={() => setSelectedMember(member)}
                delay={idx % 4}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal for Team Member Details */}
      <AnimatePresence>
        {selectedMember && <TeamModal member={selectedMember} onClose={() => setSelectedMember(null)} />}
      </AnimatePresence>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-[150px] px-6 md:px-12 text-center relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial-[circle_at_center] from-[rgba(212,168,67,0.05)] to-transparent pointer-events-none" />
        <p className="contact-eyebrow font-mono text-[9px] tracking-[5px] uppercase text-[#d4a843] mb-6">Available for Projects, Partnerships & Productions</p>
        <RevealOnScroll delay={1}>
          <h2 className="font-bebas text-[clamp(52px,9.5vw,130px)] leading-[0.9] mb-9">Let's Build<br /><em className="not-italic bg-gradient-to-r from-[#d4a843] to-[#ff6b35] bg-clip-text text-transparent">Your Hype Machine.</em></h2>
        </RevealOnScroll>
        <RevealOnScroll delay={2}>
          <p className="text-[15px] font-light text-[#777] leading-relaxed max-w-[480px] mx-auto mb-11">Strategy, storytelling, cinematic production — all engineered to turn attention into impact. Indore · Bhopal and beyond.</p>
          <a href="mailto:1carus.reach@gmail.com" className="contact-email font-mono text-sm tracking-[2px] text-[#d4a843] border-b border-[rgba(212,168,67,0.3)] pb-1 inline-block mb-13 hover:border-[#d4a843] hover:text-[#e8822a] transition-all">1carus.reach@gmail.com</a>
        </RevealOnScroll>
        <RevealOnScroll delay={3}>
          <div className="contact-cta-group flex gap-3.5 justify-center flex-wrap">
            <a href="mailto:1carus.reach@gmail.com" className="btn-primary font-mono text-[10px] tracking-[3px] uppercase text-black bg-gradient-to-r from-[#d4a843] to-[#e8822a] py-3.5 px-9 inline-block">Let's Create →</a>
            <a href="#services" className="btn-secondary font-mono text-[10px] tracking-[3px] uppercase text-white border border-[rgba(212,168,67,0.35)] py-3.5 px-9 inline-block transition-all hover:border-[#d4a843] hover:text-[#d4a843]">Explore Services</a>
          </div>
        </RevealOnScroll>
      </section>

      {/* Footer */}
      <footer className="py-9 px-6 md:px-12 border-t border-[rgba(212,168,67,0.08)] flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="footer-logo font-bebas text-xl tracking-[4px]"><span className="text-[#d4a843]">1</span>CARUS</div>
        <div className="footer-tagline font-mono text-[7px] tracking-[3px] uppercase text-[#777] text-center">Science in our roots · Cinema in our souls · Impact in our mission</div>
        <div className="footer-location font-mono text-[8px] tracking-[2px] uppercase text-[#777] flex items-center gap-2"><span className="text-[#d4a843] text-[11px]">◎</span> Indore · Bhopal</div>
      </footer>

      <style>{`
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
        .animate-fadeUp { animation: fadeUp 0.8s ease forwards; }
        .btn-primary::before { content: ''; position: absolute; inset: 0; background: rgba(255,255,255,0.2); transform: translateX(-100%); transition: transform 0.4s ease; }
        .btn-primary:hover::before { transform: translateX(0); }
        .btn-primary, .btn-secondary { position: relative; z-index: 1; }
        .btn-primary { overflow: hidden; }
      `}</style>
    </>
  );
};

export default App;