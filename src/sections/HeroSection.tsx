import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const microLabelRef = useRef<HTMLSpanElement>(null);
  const goldLineRef = useRef<HTMLDivElement>(null);

  // Load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Image entrance
      tl.fromTo(
        imageRef.current,
        { scale: 0.85, opacity: 0, x: '6vw' },
        { scale: 1, opacity: 1, x: 0, duration: 1.1 },
        0
      );

      // Micro label
      tl.fromTo(
        microLabelRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 0.75, duration: 0.8 },
        0.2
      );

      // Headline words
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.03 },
          0.3
        );
      }

      // Gold line
      tl.fromTo(
        goldLineRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 0.8 },
        0.5
      );

      // Subheadline
      tl.fromTo(
        subheadlineRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.6
      );

      // CTAs
      tl.fromTo(
        ctaRef.current?.children || [],
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.06 },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([imageRef.current, headlineRef.current, subheadlineRef.current, ctaRef.current, microLabelRef.current], {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            });
          },
        },
      });

      // EXIT animations (70-100%)
      // Headline exits left
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Micro label exits
      scrollTl.fromTo(
        microLabelRef.current,
        { x: 0, opacity: 0.75 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Gold line exits
      scrollTl.fromTo(
        goldLineRef.current,
        { scaleX: 1, opacity: 1 },
        { scaleX: 0, opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Subheadline exits
      scrollTl.fromTo(
        subheadlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      // Image exits right
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, scale: 1, opacity: 1 },
        { x: '10vw', scale: 0.92, opacity: 0, ease: 'power2.in' },
        0.7
      );

      // CTAs exit down
      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-pinned bg-[#0B0B0D] z-10"
    >
      {/* Circular Image */}
      <div
        ref={imageRef}
        className="absolute circle-image"
        style={{
          left: '62vw',
          top: '18vh',
          width: 'clamp(280px, 34vw, 520px)',
          height: 'clamp(280px, 34vw, 520px)',
        }}
      >
        <img
          src="/images/hero_portrait.jpg"
          alt="Modern Operations"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Micro Label */}
      <span
        ref={microLabelRef}
        className="absolute font-mono-label text-white/75"
        style={{
          left: '8vw',
          top: '16vh',
        }}
      >
        LINKED PASTED DUE MANAGEMENT
      </span>

      {/* Gold Decorative Line */}
      <div
        ref={goldLineRef}
        className="absolute h-0.5 bg-[#D4A03A]/35"
        style={{
          left: '7.5vw',
          top: '36vh',
          width: '18vw',
        }}
      />

      {/* Headline */}
      <h1
        ref={headlineRef}
        className="absolute headline-xl text-white"
        style={{
          left: '8vw',
          top: '26vh',
          width: '42vw',
        }}
      >
        <span className="word inline-block">MODERN</span>{' '}
        <span className="word inline-block">OPERATIONS</span>
      </h1>

      {/* Subheadline */}
      <p
        ref={subheadlineRef}
        className="absolute body-text max-w-md"
        style={{
          left: '8vw',
          top: '52vh',
          width: '34vw',
        }}
      >
        Strategy, systems, and execution for teams that move fast—without breaking standards.
      </p>

      {/* CTA Buttons */}
      <div
        ref={ctaRef}
        className="absolute flex items-center gap-4"
        style={{
          left: '8vw',
          top: '66vh',
        }}
      >
        <button
          onClick={() => scrollToSection('#contact')}
          className="btn-primary flex items-center gap-2 group"
        >
          Book a discovery call
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
        <button
          onClick={() => scrollToSection('#approach')}
          className="btn-secondary"
        >
          See our approach
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
