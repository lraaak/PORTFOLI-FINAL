import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PathDrawingPortfolioHero from './components/ui/path-drawing-portfolio-hero';
import { AnimatedFeatureSpotlight } from './components/ui/feature-spotlight';
import { PinoyBotDemo } from './components/PinoyBotDemo';
import { GithubIcon, LinkedinIcon } from './components/Icons';
import {
  Mail,
  Phone,
  FileDown,
  ExternalLink,
  Award,
  BookOpen,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  ChevronRight,
  Database,
  Compass,
  CheckCircle2,
  Activity,
  Flame,
  MapPin,
  GraduationCap,
} from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function App() {
  const mainContainerRef = useRef<HTMLDivElement>(null);

  // GSAP animations with proper React scoping & automatic cleanup
  useGSAP(
    () => {
      // 1. Fade & slide in the table of contents items with smooth stagger
      gsap.from('.index-item', {
        opacity: 0,
        y: 18,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.4,
      });

      // 2. Scroll-triggered editorial reveals for major sections
      const sections = gsap.utils.toArray<HTMLElement>('.gsap-section');
      sections.forEach((sec) => {
        gsap.from(sec.querySelectorAll('.gsap-fade-up'), {
          scrollTrigger: {
            trigger: sec,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 32,
          duration: 0.9,
          stagger: 0.14,
          ease: 'power2.out',
        });
      });

      // 3. Project spotlight cards stagger entrance
      ScrollTrigger.batch('.gsap-spotlight', {
        start: 'top 82%',
        onEnter: (batch) => {
          gsap.from(batch, {
            opacity: 0,
            y: 40,
            duration: 0.85,
            stagger: 0.2,
            ease: 'power2.out',
            overwrite: true,
          });
        },
      });
    },
    { scope: mainContainerRef }
  );

  const additionalProjects = [
    {
      id: 'pinoybot-archive',
      num: '04',
      title: 'PinoyBot & PinoyBot-Cebu',
      subtitle: 'Code-Switched NLP Token Classifier (AILRIC 2026)',
      description:
        'Scikit-learn token classification pipeline for informal Filipino-English discourse. Evaluates sub-word n-grams and Tagalog affix rules over 42,000+ COHFIE tokens.',
      tags: ['Python', 'Jupyter', 'NLP', 'Scikit-Learn'],
      github: 'https://github.com/lraaak/pinoybot',
    },
    {
      id: 'hiker-app',
      num: '05',
      title: 'HikerApp Database Management System',
      subtitle: 'Relational Platform for Hikers & Mountain Guides',
      description:
        'Full relational database management system in Java & MySQL with itinerary indexing, guide verification, and structured SQL transaction management.',
      tags: ['Java', 'MySQL', 'Relational DBMS', 'JDBC'],
      github: 'https://github.com/lraaak/hikerApp',
    },
    {
      id: 'data-pipeline',
      num: '06',
      title: 'Kotlin Data Pipeline & Telemetry Ingestion',
      subtitle: 'High-Performance ETL Processing',
      description:
        'Automated ETL pipelines in Kotlin and Python processing sports telemetry and analytical datasets from REST APIs.',
      tags: ['Kotlin', 'Python', 'ETL Pipelines', 'REST APIs'],
      github: 'https://github.com/lraaak/MCO2-Data-Pipeline---Kotlin',
    },
  ];

  return (
    <div
      ref={mainContainerRef}
      className="relative min-h-screen bg-[#0e0c0b] text-[#f5efe8] selection:bg-[#BFAC95] selection:text-[#0e0c0b] bg-grain"
    >
      {/* Warm sand ambient glow */}
      <div className="fixed inset-0 pointer-events-none editorial-glow z-0" />

      {/* Top Header / Monograph */}
      <header className="relative z-20 flex items-center justify-between px-6 py-5 md:px-12 border-b border-[#8C7764]/20 bg-[#0e0c0b]/85 backdrop-blur-md">
        <a href="#" className="group flex items-center gap-3">
          <img
            src="/karl.jpg"
            alt="Karl Divinagracia"
            className="w-8 h-8 rounded-full object-cover object-top border border-[#BFAC95]/50 shadow-sm transition-transform group-hover:scale-105"
          />
          <span className="font-serif text-xl font-bold tracking-widest text-[#D9C6B0] group-hover:text-[#BFAC95] transition-colors">
            KD
          </span>
          <span className="hidden sm:inline font-mono text-xs uppercase tracking-[0.25em] text-[#D9CEC5]/60">
            Karl Divinagracia
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-[0.2em] text-[#D9CEC5]/70">
          <a href="#about" className="hover:text-[#D9C6B0] transition-colors">
            I. About
          </a>
          <a href="#research" className="hover:text-[#D9C6B0] transition-colors">
            II. Research
          </a>
          <a href="#work" className="hover:text-[#D9C6B0] transition-colors">
            III. Work
          </a>
          <a href="#demo" className="hover:text-[#D9C6B0] transition-colors">
            IV. Sandbox
          </a>
          <a href="#arsenal" className="hover:text-[#D9C6B0] transition-colors">
            V. Arsenal
          </a>
          <a href="#contact" className="hover:text-[#D9C6B0] transition-colors">
            VI. Contact
          </a>
        </nav>

        <a
          href="/Divinagracia_Karl_Resume.pdf"
          download
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#BFAC95]/40 bg-[#1c1815] hover:bg-[#BFAC95] text-[#f5efe8] hover:text-[#0e0c0b] text-xs font-mono tracking-wider transition-all duration-200 shadow-sm"
        >
          <FileDown className="w-3.5 h-3.5 text-[#BFAC95] group-hover:text-[#0e0c0b]" />
          <span>Resume (PDF)</span>
        </a>
      </header>

      {/* HERO SECTION — Lynn Fisher Vibe with Beige & Espresso Palette */}
      <section className="relative z-10 flex flex-col items-center justify-center pt-8 pb-16 px-6 text-center">
        {/* Animated Path Drawing Component */}
        <div className="w-full max-w-5xl mx-auto">
          <PathDrawingPortfolioHero
            brand="KARL DIVINAGRACIA"
            eyebrow="DE LA SALLE UNIVERSITY • MANILA"
            tagline="Software Engineer & Machine Learning Researcher"
            fromColor="#D9C6B0"
            toColor="#BFAC95"
          />
        </div>

        {/* The Lynn Fisher Table of Contents / Index */}
        <div id="index" className="w-full max-w-xl mx-auto mt-6 pt-8 border-t border-[#8C7764]/25">
          <div className="space-y-4 text-left font-serif text-sm sm:text-base tracking-widest text-[#D9C6B0]">
            <a
              href="#about"
              className="index-item flex items-center justify-between group hover:text-[#f5efe8] transition-colors"
            >
              <span className="font-semibold uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform">
                ABOUT & PROFILE
              </span>
              <span className="dotted-leader group-hover:border-[#D9C6B0] transition-colors" />
              <span className="font-mono text-xs sm:text-sm font-semibold text-[#BFAC95]">I</span>
            </a>

            <a
              href="#research"
              className="index-item flex items-center justify-between group hover:text-[#f5efe8] transition-colors"
            >
              <span className="font-semibold uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform">
                AILRIC 2026 RESEARCH & COLLOQUIUM
              </span>
              <span className="dotted-leader group-hover:border-[#D9C6B0] transition-colors" />
              <span className="font-mono text-xs sm:text-sm font-semibold text-[#BFAC95]">II</span>
            </a>

            <a
              href="#work"
              className="index-item flex items-center justify-between group hover:text-[#f5efe8] transition-colors"
            >
              <span className="font-semibold uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform">
                FEATURED WORK & SYSTEMS
              </span>
              <span className="dotted-leader group-hover:border-[#D9C6B0] transition-colors" />
              <span className="font-mono text-xs sm:text-sm font-semibold text-[#BFAC95]">III</span>
            </a>

            <a
              href="#demo"
              className="index-item flex items-center justify-between group hover:text-[#f5efe8] transition-colors"
            >
              <span className="font-semibold uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform">
                INTERACTIVE EXPERIMENT: PINOYBOT
              </span>
              <span className="dotted-leader group-hover:border-[#D9C6B0] transition-colors" />
              <span className="font-mono text-xs sm:text-sm font-semibold text-[#BFAC95]">IV</span>
            </a>

            <a
              href="#arsenal"
              className="index-item flex items-center justify-between group hover:text-[#f5efe8] transition-colors"
            >
              <span className="font-semibold uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform">
                TECHNICAL ARSENAL
              </span>
              <span className="dotted-leader group-hover:border-[#D9C6B0] transition-colors" />
              <span className="font-mono text-xs sm:text-sm font-semibold text-[#BFAC95]">V</span>
            </a>

            <a
              href="#contact"
              className="index-item flex items-center justify-between group hover:text-[#f5efe8] transition-colors"
            >
              <span className="font-semibold uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform">
                CONTACT & TRANSMISSIONS
              </span>
              <span className="dotted-leader group-hover:border-[#D9C6B0] transition-colors" />
              <span className="font-mono text-xs sm:text-sm font-semibold text-[#BFAC95]">VI</span>
            </a>
          </div>

          {/* Roman Edition & Glyph */}
          <div className="mt-12 text-center text-[#BFAC95]/80 space-y-2">
            <p className="font-mono text-xs uppercase tracking-[0.3em] font-semibold">v. MMXXVI</p>
            <p className="text-xl select-none text-[#D9C6B0]">☽</p>
          </div>
        </div>
      </section>

      {/* SECTION I: ABOUT — Smoothly Integrated Photo & Dossier */}
      <section
        id="about"
        className="gsap-section relative z-10 py-24 px-6 md:px-12 max-w-5xl mx-auto border-t border-[#8C7764]/20"
      >
        <div className="gsap-fade-up flex items-center gap-4 mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#BFAC95] font-bold">
            01 / Profile
          </span>
          <div className="flex-1 h-px bg-[#8C7764]/25" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Left Column: Framed Archival Photo + Quick Meta */}
          <div className="gsap-fade-up md:col-span-5 space-y-4">
            <div className="relative group rounded-2xl overflow-hidden border border-[#8C7764]/40 bg-[#151210] shadow-2xl">
              <img
                src="/karl.jpg"
                alt="Karl Matthew T. Divinagracia"
                className="w-full h-auto aspect-[4/5] object-cover object-top filter contrast-[1.02] brightness-[0.98] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0b] via-transparent to-transparent opacity-85" />
              
              <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#BFAC95]/20 border border-[#BFAC95]/40 text-[#D9C6B0] text-[10px] font-mono uppercase tracking-wider font-semibold mb-2 backdrop-blur-md">
                  <GraduationCap className="w-3.5 h-3.5" />
                  De La Salle University
                </span>
                <h3 className="font-serif text-lg font-bold text-[#f5efe8] leading-snug">
                  Karl Matthew T. Divinagracia
                </h3>
                <p className="font-mono text-xs text-[#BFAC95] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" />
                  Manila, Philippines
                </p>
              </div>
            </div>

            {/* Coursework snippet card */}
            <div className="p-5 rounded-xl border border-[#8C7764]/30 bg-[#151210]/90 backdrop-blur-sm space-y-2 shadow-xl text-left">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#BFAC95] font-bold block">
                Coursework Foundations
              </span>
              <p className="text-xs font-mono leading-relaxed text-[#D9CEC5]/80">
                Algorithms &bull; Data Structures &bull; Machine Learning &bull; Database Systems &bull; Software
                Development &bull; Distributed Systems
              </p>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Key Highlights */}
          <div className="gsap-fade-up md:col-span-7 space-y-6 text-left">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f5efe8] tracking-tight font-bold">
              Engineering rigorous software, scalable architectures, and intelligent systems.
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#D9CEC5]/85 font-sans">
              I am a Computer Science undergraduate majoring in Software Technology at{' '}
              <strong className="text-[#f5efe8] font-semibold">De La Salle University - Manila</strong>, where I maintain First Dean&apos;s Honors with a{' '}
              <strong className="text-[#D9C6B0] font-mono font-bold">3.82 GWA</strong>.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-[#D9CEC5]/85 font-sans">
              My work converges at the intersection of natural language processing, machine learning
              heuristics, and production-grade full-stack systems. Whether presenting peer-reviewed token
              classification research at national colloquiums, building full-scale facility
              management systems for Animo Labs, or engineering data pipelines, I focus on clean software
              craftsmanship and empirical problem-solving.
            </p>

            {/* Key Highlights Grid */}
            <div className="p-6 rounded-xl border border-[#8C7764]/30 bg-[#151210]/90 backdrop-blur-sm space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#8C7764]/20">
                <span className="font-mono text-xs uppercase tracking-widest text-[#BFAC95] font-bold">
                  Key Highlights
                </span>
                <Award className="w-4 h-4 text-[#BFAC95]" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <div className="font-serif text-2xl font-bold text-[#f5efe8]">3.82</div>
                  <div className="font-mono text-[10px] text-[#D9CEC5]/60 uppercase tracking-wider">
                    Cumulative GWA (DLSU)
                  </div>
                </div>

                <div>
                  <div className="font-serif text-2xl font-bold text-[#D9C6B0]">1st</div>
                  <div className="font-mono text-[10px] text-[#D9CEC5]/60 uppercase tracking-wider">
                    Dean&apos;s Honor Lister
                  </div>
                </div>

                <div>
                  <div className="font-serif text-2xl font-bold text-[#f5efe8]">42,000+</div>
                  <div className="font-mono text-[10px] text-[#D9CEC5]/60 uppercase tracking-wider">
                    Tokens in Research Corpus
                  </div>
                </div>

                <div>
                  <div className="font-serif text-2xl font-bold text-[#D9C6B0]">Top 3</div>
                  <div className="font-mono text-[10px] text-[#D9CEC5]/60 uppercase tracking-wider">
                    STEM Capstone (DLSZ)
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#BFAC95] hover:bg-[#D9C6B0] text-[#0e0c0b] text-xs font-mono uppercase tracking-wider font-bold transition-all active:scale-95 shadow-md shadow-[#BFAC95]/15"
              >
                <span>Initiate Contact</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/lraaak"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#8C7764]/35 bg-[#151210] hover:border-[#BFAC95] text-xs font-mono text-[#f5efe8] transition-colors shadow-sm"
              >
                <GithubIcon className="w-4 h-4 text-[#BFAC95]" />
                <span>github.com/lraaak</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION II: RESEARCH & COLLOQUIUM */}
      <section
        id="research"
        className="gsap-section relative z-10 py-24 px-6 md:px-12 max-w-5xl mx-auto border-t border-[#8C7764]/20"
      >
        <div className="gsap-fade-up flex items-center gap-4 mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#BFAC95] font-bold">
            02 / Peer-Reviewed Research
          </span>
          <div className="flex-1 h-px bg-[#8C7764]/25" />
        </div>

        <div className="gsap-fade-up p-8 md:p-10 rounded-2xl border border-[#8C7764]/35 bg-[#151210]/95 backdrop-blur-md relative overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[#8C7764]/20">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BFAC95]/15 border border-[#BFAC95]/30 text-[#D9C6B0] text-xs font-mono uppercase tracking-wider font-semibold">
                <BookOpen className="w-3.5 h-3.5 text-[#BFAC95]" />
                <span>AILRIC 2026 Colloquium &bull; University of San Carlos, Cebu</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#f5efe8] tracking-tight">
                Word-Level Language Identification in Code-Switched Filipino-English Documents
              </h3>
              <p className="font-mono text-xs text-[#BFAC95] font-semibold">
                Lead Author & Presenter &bull; AI, Language, and Robotics Industry Colloquium (Aug 2026)
              </p>
            </div>

            <div className="shrink-0 text-right">
              <span className="font-mono text-xs text-[#D9CEC5]/60 block">Evaluation Corpus</span>
              <span className="font-serif text-xl font-bold text-[#D9C6B0]">COHFIE (42K+ tokens)</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed text-[#D9CEC5]/85">
            <div className="space-y-3">
              <h4 className="font-serif text-base font-semibold text-[#f5efe8] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#BFAC95]" />
                The Core Problem
              </h4>
              <p>
                Informal discourse in the Philippines relies on dense, non-linear code-switching
                (intersentential, intrasentential, and intra-word hybrid morphology). Conventional linear
                classifiers (like Logistic Regression) sum up independent n-gram weights and systematically
                fail on hybrid loanwords such as <code className="text-[#D9C6B0] font-mono font-bold">&ldquo;nag-coffee&rdquo;</code> or{' '}
                <code className="text-[#D9C6B0] font-mono font-bold">&ldquo;maghaircut&rdquo;</code> because English character
                sub-clusters outweigh Tagalog prefix markers.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-serif text-base font-semibold text-[#f5efe8] flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#BFAC95]" />
                The Architectural Solution
              </h4>
              <p>
                We engineered an end-to-end token classification pipeline using Random Forest and SVM
                architectures. By prioritizing rule-based decision trees with sub-word character n-grams, Tagalog
                affix extraction (prefixes, infixes, suffixes, reduplication), and sequential context, the model
                learns hierarchical logic gates rather than naive linear sums, drastically reducing cross-language
                homograph errors.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#8C7764]/20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded bg-[#0e0c0b] border border-[#8C7764]/30 text-[#f5efe8]">
                Random Forest
              </span>
              <span className="px-2.5 py-1 rounded bg-[#0e0c0b] border border-[#8C7764]/30 text-[#f5efe8]">
                Support Vector Machine
              </span>
              <span className="px-2.5 py-1 rounded bg-[#0e0c0b] border border-[#8C7764]/30 text-[#f5efe8]">
                Sub-Word N-Grams
              </span>
              <span className="px-2.5 py-1 rounded bg-[#0e0c0b] border border-[#8C7764]/30 text-[#f5efe8]">
                Tagalog Affixes
              </span>
            </div>

            <a
              href="#demo"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#BFAC95] hover:text-[#D9C6B0] font-semibold transition-colors"
            >
              <span>Test Model in Sandbox Below</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* SECTION III: FEATURED WORK — AnimatedFeatureSpotlight */}
      <section
        id="work"
        className="gsap-section relative z-10 py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-[#8C7764]/20"
      >
        <div className="gsap-fade-up flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#BFAC95] font-bold">
              03 / Selected Works & Spotlights
            </span>
            <div className="w-16 h-px bg-[#8C7764]/25" />
          </div>
          <span className="font-mono text-xs text-[#D9CEC5]/60">Engineered Platforms & Systems</span>
        </div>

        {/* Feature Spotlight 1: FYI Student Dashboard */}
        <div className="gsap-spotlight mb-12">
          <AnimatedFeatureSpotlight
            preheaderIcon={<Cpu className="h-4 w-4 text-[#BFAC95]" />}
            preheaderText="Full-Stack Machine Learning • DLSU Manila"
            heading={
              <>
                Predict Workload & <span className="text-[#D9C6B0]">Forecast Grades</span>
              </>
            }
            description="FYI is an intelligent academic dashboard built for CS students. Powered by Scikit-Learn Random Forest Regressors tuned with GridSearchCV (5-Fold CV), it forecasts completion hours (R² = 0.68) and grade outcomes (MAE = 0.3 GPA) through automated MySQL relational schemas and a snappy React interface."
            buttonText="Inspect FYI Repository"
            buttonProps={{
              onClick: () => window.open('https://github.com/lraaak/fyi-student-dashboard', '_blank'),
            }}
            renderVisual={
              <div className="w-full max-w-md p-6 rounded-2xl bg-[#1c1815] border border-[#8C7764]/35 shadow-2xl space-y-4 text-left font-mono">
                <div className="flex items-center justify-between pb-3 border-b border-[#8C7764]/20">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#BFAC95]" />
                    <span className="text-xs uppercase font-bold text-[#f5efe8]">FYI_Inference_Engine</span>
                  </div>
                  <span className="text-[10px] text-[#D9C6B0] font-semibold">Active Model: v2.4</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-[#14110f] border border-white/5">
                    <div className="text-[10px] text-[#D9CEC5]/60">Duration Predictor</div>
                    <div className="text-xl font-bold text-[#D9C6B0]">R² = 0.68</div>
                    <div className="text-[9px] text-[#D9CEC5]/40">MAE: 2.7 Hours</div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#14110f] border border-white/5">
                    <div className="text-[10px] text-[#D9CEC5]/60">Grade Forecaster</div>
                    <div className="text-xl font-bold text-[#BFAC95]">MAE = 0.3</div>
                    <div className="text-[9px] text-[#D9CEC5]/40">GPA Scale Target</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#14110f] border border-white/5 space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#f5efe8]/90">
                    <span>Validation Schema:</span>
                    <span className="text-[#D9C6B0] font-bold">5-Fold Cross-Val</span>
                  </div>
                  <div className="flex justify-between text-[#f5efe8]/90">
                    <span>Tuning Engine:</span>
                    <span className="text-[#D9C6B0] font-bold">GridSearchCV (54 params)</span>
                  </div>
                  <div className="flex justify-between text-[#f5efe8]/90">
                    <span>Core Stack:</span>
                    <span className="text-[#BFAC95]">FastAPI + MySQL + React Vite</span>
                  </div>
                </div>
              </div>
            }
          />
        </div>

        {/* Feature Spotlight 2: VGC Mega-Meta Architect */}
        <div className="gsap-spotlight mb-12">
          <AnimatedFeatureSpotlight
            preheaderIcon={<Flame className="h-4 w-4 text-[#BFAC95]" />}
            preheaderText="Simulation Engine • Competitive Pokémon VGC"
            heading={
              <>
                Custom 4v4 Simulation & <span className="text-[#D9C6B0]">Meta Architect</span>
              </>
            }
            description="A comprehensive data-driven analytical simulator and battle engine. It directly scrapes and parses live mechanical TypeScript/JS endpoints from Pokémon Showdown, evaluates defensive overlaps and speed tiers, and resolves 4v4 turn orders dynamically with a heuristic SmartVGCAgent."
            buttonText="Explore VGC Engine"
            buttonProps={{
              onClick: () => window.open('https://github.com/lraaak/vgc-optimizer', '_blank'),
            }}
            renderVisual={
              <div className="w-full max-w-md p-6 rounded-2xl bg-[#1c1815] border border-[#8C7764]/35 shadow-2xl space-y-4 text-left font-mono">
                <div className="flex items-center justify-between pb-3 border-b border-[#8C7764]/20">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#BFAC95]" />
                    <span className="text-xs uppercase font-bold text-[#f5efe8]">VGC_Turn_Resolver</span>
                  </div>
                  <span className="text-[10px] text-[#86efac] font-semibold">● Engine Running</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded bg-[#14110f] border border-white/5 flex items-center justify-between">
                    <span className="text-[#f5efe8]/80">Turn Order Priority:</span>
                    <span className="text-[#D9C6B0] font-bold">Trick Room / Priority +3</span>
                  </div>
                  <div className="p-2.5 rounded bg-[#14110f] border border-white/5 flex items-center justify-between">
                    <span className="text-[#f5efe8]/80">Mechanical DNA:</span>
                    <span className="text-[#BFAC95]">Pivots, Redirection, Stat Stages</span>
                  </div>
                  <div className="p-2.5 rounded bg-[#14110f] border border-white/5 flex items-center justify-between">
                    <span className="text-[#f5efe8]/80">Autonomous Decision:</span>
                    <span className="text-[#D9C6B0] font-bold">SmartVGCAgent (Heuristic)</span>
                  </div>
                </div>

                <div className="text-[10px] text-[#D9CEC5]/50 italic pt-1">
                  * Live Showdown AST parser extracts moves, BST, items, and volatiles into structured dataframes.
                </div>
              </div>
            }
          />
        </div>

        {/* Feature Spotlight 3: FabLab Management System */}
        <div className="gsap-spotlight mb-16">
          <AnimatedFeatureSpotlight
            preheaderIcon={<Layers className="h-4 w-4 text-[#BFAC95]" />}
            preheaderText="Production Enterprise System • Animo Labs DLSU"
            heading={
              <>
                Role-Based Portals & <span className="text-[#D9C6B0]">Automated Dispatch</span>
              </>
            }
            description="Developed for DLSU Animo Labs, featuring segregated Maker, Client, and Administrator security roles. Automates digital machine reservation queues, tracks equipment operational status, dispatches automated Python email microservices synced with Google Apps Script, and validates reliability with Playwright E2E suites."
            buttonText="Review Architecture"
            buttonProps={{
              onClick: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),
            }}
            renderVisual={
              <div className="w-full max-w-md p-6 rounded-2xl bg-[#1c1815] border border-[#8C7764]/35 shadow-2xl space-y-4 text-left font-mono">
                <div className="flex items-center justify-between pb-3 border-b border-[#8C7764]/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#86efac]" />
                    <span className="text-xs uppercase font-bold text-[#f5efe8]">FabLab_Ecosystem</span>
                  </div>
                  <span className="text-[10px] text-[#BFAC95] font-semibold">Animo Labs DLSU</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded bg-[#14110f] border border-white/5">
                    <span className="text-[10px] text-[#D9CEC5]/60 block">Portal</span>
                    <span className="font-bold text-[#D9C6B0]">Client</span>
                  </div>
                  <div className="p-2 rounded bg-[#14110f] border border-white/5">
                    <span className="text-[10px] text-[#D9CEC5]/60 block">Portal</span>
                    <span className="font-bold text-[#D9C6B0]">Maker</span>
                  </div>
                  <div className="p-2 rounded bg-[#14110f] border border-white/5">
                    <span className="text-[10px] text-[#D9CEC5]/60 block">Portal</span>
                    <span className="font-bold text-[#D9C6B0]">Admin</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#14110f] border border-white/5 space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#f5efe8]/90">
                    <span>Queue Automation:</span>
                    <span className="text-[#86efac] font-bold">Real-time Machine Sync</span>
                  </div>
                  <div className="flex justify-between text-[#f5efe8]/90">
                    <span>Microservices:</span>
                    <span className="text-[#BFAC95]">Python + Google Apps Script</span>
                  </div>
                  <div className="flex justify-between text-[#f5efe8]/90">
                    <span>Test Suite:</span>
                    <span className="text-[#D9C6B0]">Playwright End-to-End</span>
                  </div>
                </div>
              </div>
            }
          />
        </div>

        {/* Additional Project Archive Grid */}
        <div className="pt-8 border-t border-[#8C7764]/25">
          <div className="flex items-center justify-between mb-8">
            <h4 className="font-serif text-xl font-bold text-[#f5efe8]">Additional Repository Archives</h4>
            <a
              href="https://github.com/lraaak"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-[#BFAC95] hover:text-[#D9C6B0] font-semibold flex items-center gap-1"
            >
              <span>Explore all on GitHub</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalProjects.map((proj) => (
              <div
                key={proj.id}
                className="p-6 rounded-xl border border-[#8C7764]/25 bg-[#151210]/80 hover:border-[#BFAC95]/50 transition-colors flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="font-mono text-xs text-[#BFAC95] font-bold mb-2">{proj.num}</div>
                  <h5 className="font-serif text-lg font-bold text-[#f5efe8] mb-1">{proj.title}</h5>
                  <p className="font-mono text-xs text-[#D9CEC5]/60 mb-3">{proj.subtitle}</p>
                  <p className="text-xs text-[#D9CEC5]/80 leading-relaxed font-sans mb-4">
                    {proj.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0e0c0b] text-[#D9CEC5]/75 border border-[#8C7764]/25">
                        {t}
                      </span>
                    ))}
                  </div>
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#BFAC95] hover:text-[#D9C6B0] font-semibold"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>View Source</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION IV: INTERACTIVE SANDBOX DEMO */}
      <section
        id="demo"
        className="gsap-section relative z-10 py-24 px-6 md:px-12 max-w-5xl mx-auto border-t border-[#8C7764]/20"
      >
        <div className="gsap-fade-up flex items-center gap-4 mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#BFAC95] font-bold">
            04 / Interactive Experiment
          </span>
          <div className="flex-1 h-px bg-[#8C7764]/25" />
        </div>

        <div className="gsap-fade-up mb-6 space-y-2">
          <h2 className="font-serif text-3xl font-bold text-[#f5efe8]">
            Live Token Classification Playground
          </h2>
          <p className="text-sm font-sans text-[#D9CEC5]/80 max-w-2xl leading-relaxed">
            Test an interactive client-side preview of the PinoyBot language identification logic.
            Please note this browser sandbox is a simplified simulation for demonstration purposes and
            is not 100% accurate; the complete peer-reviewed machine learning model runs in Python with
            Random Forest cross-validated across 42,000+ COHFIE corpus tokens.
          </p>
        </div>

        <div className="gsap-fade-up">
          <PinoyBotDemo />
        </div>
      </section>

      {/* SECTION V: TECHNICAL ARSENAL */}
      <section
        id="arsenal"
        className="gsap-section relative z-10 py-24 px-6 md:px-12 max-w-5xl mx-auto border-t border-[#8C7764]/20"
      >
        <div className="gsap-fade-up flex items-center gap-4 mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#BFAC95] font-bold">
            05 / Technical Arsenal
          </span>
          <div className="flex-1 h-px bg-[#8C7764]/25" />
        </div>

        <div className="gsap-fade-up grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-[#8C7764]/25 bg-[#151210]/90 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-[#BFAC95]">
              <Code2 className="w-4 h-4" />
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold">Languages</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Python', 'TypeScript', 'JavaScript', 'Java', 'C', 'SQL', 'Kotlin'].map((l) => (
                <span
                  key={l}
                  className="px-2.5 py-1 rounded bg-[#0e0c0b] border border-[#8C7764]/30 text-xs font-mono text-[#f5efe8]"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl border border-[#8C7764]/25 bg-[#151210]/90 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-[#BFAC95]">
              <Cpu className="w-4 h-4" />
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold">
                Machine Learning & Data
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'Scikit-learn',
                'PyTorch',
                'Model Evaluation',
                'Feature Extraction',
                'Pandas',
                'NumPy',
                'K-Fold CV',
                'GridSearchCV',
              ].map((m) => (
                <span
                  key={m}
                  className="px-2.5 py-1 rounded bg-[#0e0c0b] border border-[#8C7764]/30 text-xs font-mono text-[#f5efe8]"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl border border-[#8C7764]/25 bg-[#151210]/90 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-[#BFAC95]">
              <Layers className="w-4 h-4" />
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold">Web & Backend</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'React',
                'GSAP & ScrollTrigger',
                'FastAPI',
                'Node.js',
                'Express.js',
                'Tailwind CSS',
                'RESTful APIs',
                'JWT Auth',
              ].map((w) => (
                <span
                  key={w}
                  className="px-2.5 py-1 rounded bg-[#0e0c0b] border border-[#8C7764]/30 text-xs font-mono text-[#f5efe8]"
                >
                  {w}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl border border-[#8C7764]/25 bg-[#151210]/90 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-[#BFAC95]">
              <Database className="w-4 h-4" />
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold">Databases</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {['MySQL', 'PostgreSQL', 'MongoDB', 'Relational Schemas'].map((d) => (
                <span
                  key={d}
                  className="px-2.5 py-1 rounded bg-[#0e0c0b] border border-[#8C7764]/30 text-xs font-mono text-[#f5efe8]"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl border border-[#8C7764]/25 bg-[#151210]/90 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-[#BFAC95]">
              <Compass className="w-4 h-4" />
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold">
                Platforms & Testing
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'Git / GitHub',
                'VS Code',
                'Jupyter Notebook',
                'Postman',
                'Playwright E2E',
                'Vite',
              ].map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded bg-[#0e0c0b] border border-[#8C7764]/30 text-xs font-mono text-[#f5efe8]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl border border-[#8C7764]/25 bg-[#151210]/90 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-[#BFAC95]">
              <Sparkles className="w-4 h-4" />
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold">Methodologies</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'Figma UI/UX',
                'Prototyping',
                'Usability Testing',
                'User Research',
                'Agile/Scrum',
                'Colloquium Presentations',
              ].map((m) => (
                <span
                  key={m}
                  className="px-2.5 py-1 rounded bg-[#0e0c0b] border border-[#8C7764]/30 text-xs font-mono text-[#f5efe8]"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION VI: TRANSMISSIONS & CONTACT */}
      <section
        id="contact"
        className="gsap-section relative z-10 py-24 px-6 md:px-12 max-w-5xl mx-auto border-t border-[#8C7764]/20"
      >
        <div className="gsap-fade-up flex items-center gap-4 mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#BFAC95] font-bold">
            06 / Transmissions
          </span>
          <div className="flex-1 h-px bg-[#8C7764]/25" />
        </div>

        <div className="gsap-fade-up p-8 md:p-12 rounded-2xl border border-[#8C7764]/35 bg-[#151210]/95 text-center space-y-6 shadow-2xl">
          <div className="flex justify-center mb-2">
            <img
              src="/karl.jpg"
              alt="Karl Divinagracia"
              className="w-16 h-16 rounded-full object-cover object-top border-2 border-[#BFAC95] shadow-lg"
            />
          </div>

          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#BFAC95] font-bold block">
            Open For Collaborations, Engineering Roles & Research Inquiries
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#f5efe8] tracking-tight">
            Let&apos;s build intelligent systems together.
          </h2>

          <p className="text-sm sm:text-base text-[#D9CEC5]/80 max-w-xl mx-auto font-sans leading-relaxed">
            Feel free to reach out directly via email, connect on LinkedIn, or inspect my open source
            laboratories on GitHub.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:karldivinagracia08@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#BFAC95] hover:bg-[#D9C6B0] text-[#0e0c0b] font-mono text-xs uppercase tracking-wider font-bold transition-all active:scale-95 shadow-md shadow-[#BFAC95]/15"
            >
              <Mail className="w-4 h-4" />
              <span>karldivinagracia08@gmail.com</span>
            </a>

            <a
              href="/Divinagracia_Karl_Resume.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[#BFAC95]/50 bg-[#1c1815] hover:border-[#D9C6B0] text-[#f5efe8] font-mono text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              <FileDown className="w-4 h-4 text-[#BFAC95]" />
              <span>Download Full Resume</span>
            </a>
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-8 font-mono text-xs text-[#D9CEC5]/70">
            <a
              href="https://github.com/lraaak"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-[#D9C6B0] transition-colors"
            >
              <GithubIcon className="w-4 h-4 text-[#BFAC95]" />
              <span>GitHub: @lraaak</span>
            </a>

            <a
              href="https://www.linkedin.com/in/karl-divinagracia"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-[#D9C6B0] transition-colors"
            >
              <LinkedinIcon className="w-4 h-4 text-[#BFAC95]" />
              <span>LinkedIn: karl-divinagracia</span>
            </a>

            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#BFAC95]" />
              <span>+63 962 813 9088</span>
            </span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-12 px-6 border-t border-[#8C7764]/20 text-center text-xs font-mono text-[#BFAC95]/80 space-y-3">
        <div className="text-xl select-none text-[#D9C6B0]">☽</div>
        <p className="tracking-[0.25em] uppercase font-semibold">
          Karl Matthew T. Divinagracia &bull; v. MMXXVI
        </p>
        <p className="text-[10px] text-[#D9CEC5]/50">
          De La Salle University &bull; Software Technology &bull; First Dean&apos;s Honor Roll
        </p>
      </footer>
    </div>
  );
}
