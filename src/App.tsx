import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import FeatureSection from './sections/FeatureSection';
import ContactSection from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Global snap for pinned sections
    const setupGlobalSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;

            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: "power2.out"
        }
      });
    };

    // Delay to allow all ScrollTriggers to initialize
    const timer = setTimeout(setupGlobalSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-[#0B0B0D]">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Sections */}
      <main className="relative">
        {/* Section 1: Hero */}
        <HeroSection />
        
        {/* Section 2: Built for Teams */}
        <FeatureSection
          id="section-2"
          microLabel="BUILT FOR TEAMS"
          headline="COLLABORATE WITHOUT CHAOS"
          body="Shared workflows, clear ownership, and decisions that don't get lost in threads."
          cta="Meet the team"
          ctaLink="#team"
          image="/images/collaboration.jpg"
          gradientType="teal"
          zIndex={20}
        />
        
        {/* Section 3: Clear Process */}
        <FeatureSection
          id="section-3"
          microLabel="CLEAR PROCESS"
          headline="PLAN. BUILD. SHIP."
          body="We map the real workflow first—then implement tools your team will actually use."
          cta="See how we work"
          ctaLink="#approach"
          image="/images/process.jpg"
          gradientType="none"
          largeCircle={true}
          zIndex={30}
        />
        
        {/* Section 4: Results That Last */}
        <FeatureSection
          id="section-4"
          microLabel="RESULTS THAT LAST"
          headline="MEASURABLE CHANGE, NOT JUST REPORTS"
          body="We build dashboards and rituals that keep performance visible—week after week."
          cta="Explore case studies"
          ctaLink="#results"
          image="/images/results.jpg"
          gradientType="none"
          fullBleed={true}
          zIndex={40}
        />
        
        {/* Section 5: Built to Scale */}
        <FeatureSection
          id="section-5"
          microLabel="BUILT TO SCALE"
          headline="GROW WITHOUT LOSING THE STANDARD"
          body="Playbooks, approvals, and audit-ready records—designed for speed and control."
          cta="View scaling options"
          ctaLink="#services"
          image="/images/scale.jpg"
          gradientType="teal"
          zIndex={50}
        />
        
        {/* Section 6: Partners in Change (Light) */}
        <FeatureSection
          id="section-6"
          microLabel="PARTNERS IN CHANGE"
          headline="WE INTEGRATE, NOT DISRUPT"
          body="We work inside your constraints—then upgrade them without drama."
          cta="Talk to an advisor"
          ctaLink="#contact"
          image="/images/partners.jpg"
          gradientType="blue"
          lightMode={true}
          zIndex={60}
        />
        
        {/* Section 7: Systems That Stick */}
        <FeatureSection
          id="section-7"
          microLabel="SYSTEMS THAT STICK"
          headline="ADOPTION BY DESIGN"
          body="If the team won't use it, it's not a system. We build for real behavior."
          cta="See implementation"
          ctaLink="#approach"
          image="/images/systems.jpg"
          gradientType="teal"
          zIndex={70}
        />
        
        {/* Section 8: Secure by Default */}
        <FeatureSection
          id="section-8"
          microLabel="SECURE BY DEFAULT"
          headline="PROTECTED WITHOUT THE FRICTION"
          body="Access controls, audit trails, and policy guardrails—built into the workflow."
          cta="Review security"
          ctaLink="#services"
          image="/images/security.jpg"
          gradientType="slate"
          zIndex={80}
        />
        
        {/* Section 9: Advisory That Delivers */}
        <FeatureSection
          id="section-9"
          microLabel="ADVISORY THAT DELIVERS"
          headline="EXPERTISE YOU CAN ACT ON"
          body="Clear recommendations, realistic roadmaps, and hands-on support until it's live."
          cta="Request a proposal"
          ctaLink="#contact"
          image="/images/advisory.jpg"
          gradientType="teal"
          zIndex={90}
        />
        
        {/* Section 10: Always Improving */}
        <FeatureSection
          id="section-10"
          microLabel="ALWAYS IMPROVING"
          headline="ITERATE WITH CONFIDENCE"
          body="We measure, refine, and retrain—so your operations keep getting sharper."
          cta="See metrics we track"
          ctaLink="#results"
          image="/images/improving.jpg"
          gradientType="teal"
          zIndex={100}
        />
        
        {/* Section 11: Ready When You Are */}
        <FeatureSection
          id="section-11"
          microLabel="READY WHEN YOU ARE"
          headline="FAST SETUP. REAL SUPPORT."
          body="From kickoff to first win in weeks—not quarters—with a team that answers."
          cta="Start a project"
          ctaLink="#contact"
          image="/images/ready.jpg"
          gradientType="teal"
          zIndex={110}
        />
        
        {/* Section 12: Built for Impact */}
        <FeatureSection
          id="section-12"
          microLabel="BUILT FOR IMPACT"
          headline="OUTCOMES OVER DECKS"
          body="We ship working systems, train your people, and leave you stronger than we found you."
          cta="See recent wins"
          ctaLink="#results"
          image="/images/impact.jpg"
          gradientType="teal"
          zIndex={120}
        />
        
        {/* Section 13: Contact */}
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
