import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FeatureSectionProps {
  id: string;
  microLabel: string;
  headline: string;
  body: string;
  cta: string;
  ctaLink: string;
  image: string;
  gradientType: 'teal' | 'blue' | 'slate' | 'none';
  largeCircle?: boolean;
  fullBleed?: boolean;
  lightMode?: boolean;
  zIndex: number;
}

const FeatureSection = ({
  id,
  microLabel,
  headline,
  body,
  cta,
  ctaLink,
  image,
  gradientType,
  largeCircle = false,
  fullBleed = false,
  lightMode = false,
  zIndex,
}: FeatureSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const circleARef = useRef<HTMLDivElement>(null);
  const circleBRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);

  const getGradient = () => {
    switch (gradientType) {
      case 'teal':
        return 'radial-gradient(circle at 30% 30%, #2B6E75 0%, #0F3A40 55%, #0B0B0D 100%)';
      case 'blue':
        return 'radial-gradient(circle at 30% 30%, #7AA7FF 0%, #3A6BD6 55%, #F4F1EA 100%)';
      case 'slate':
        return 'radial-gradient(circle at 30% 30%, #4A5568 0%, #2D3748 55%, #0B0B0D 100%)';
      default:
        return 'none';
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      if (fullBleed) {
        // Full-bleed circular image (Section 4 style)
        scrollTl.fromTo(
          circleBRef.current,
          { scale: 0.65, opacity: 0 },
          { scale: 1, opacity: 1, ease: 'none' },
          0
        );
        scrollTl.to(circleBRef.current, {
          scale: 0.85,
          opacity: 0,
          ease: 'power2.in',
        }, 0.7);

        // Text overlay
        scrollTl.fromTo(
          textBlockRef.current,
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        );
        scrollTl.to(textBlockRef.current, {
          y: '-6vh',
          opacity: 0,
          ease: 'power2.in',
        }, 0.7);
      } else if (largeCircle) {
        // Large circle left (Section 3 style)
        scrollTl.fromTo(
          circleBRef.current,
          { x: '-70vw', scale: 0.8, opacity: 0 },
          { x: 0, scale: 1, opacity: 1, ease: 'none' },
          0
        );
        scrollTl.to(circleBRef.current, {
          x: '-20vw',
          scale: 0.95,
          opacity: 0,
          ease: 'power2.in',
        }, 0.7);

        // Text block
        scrollTl.fromTo(
          textBlockRef.current,
          { x: '20vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.1
        );
        scrollTl.to(textBlockRef.current, {
          x: '10vw',
          opacity: 0,
          ease: 'power2.in',
        }, 0.7);
      } else {
        // Two circles layout (Sections 2, 5-12 style)
        // Circle A (tinted)
        if (gradientType !== 'none') {
          scrollTl.fromTo(
            circleARef.current,
            { x: '-60vw', scale: 0.85, opacity: 0 },
            { x: 0, scale: 1, opacity: 1, ease: 'none' },
            0
          );
          scrollTl.to(circleARef.current, {
            x: '-35vw',
            scale: 0.92,
            opacity: 0,
            ease: 'power2.in',
          }, 0.7);
        }

        // Circle B (photo)
        scrollTl.fromTo(
          circleBRef.current,
          { x: '-40vw', scale: 0.75, opacity: 0 },
          { x: 0, scale: 1, opacity: 1, ease: 'none' },
          0.05
        );
        scrollTl.to(circleBRef.current, {
          x: '-18vw',
          scale: 0.95,
          opacity: 0,
          ease: 'power2.in',
        }, 0.7);

        // Text block
        scrollTl.fromTo(
          textBlockRef.current,
          { x: '20vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.1
        );
        scrollTl.to(textBlockRef.current, {
          x: '10vw',
          opacity: 0,
          ease: 'power2.in',
        }, 0.7);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [fullBleed, largeCircle, gradientType]);

  const scrollToSection = () => {
    const element = document.querySelector(ctaLink);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const textColor = lightMode ? 'text-[#0B0B0D]' : 'text-white';
  const bodyColor = lightMode ? 'text-[#3F3F3F]' : 'text-[#B9B9B9]';
  const microColor = lightMode ? 'text-[#0B0B0D]/60' : 'text-white/60';

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`section-pinned ${lightMode ? 'bg-[#F4F1EA]' : 'bg-[#0B0B0D]'}`}
      style={{ zIndex }}
    >
      {!fullBleed && gradientType !== 'none' && !largeCircle && (
        /* Circle A (tinted background circle) */
        <div
          ref={circleARef}
          className="absolute circle-image"
          style={{
            left: '-10vw',
            top: '10vh',
            width: '46vw',
            height: '46vw',
            background: getGradient(),
          }}
        />
      )}

      {/* Circle B (photo circle) */}
      <div
        ref={circleBRef}
        className="absolute circle-image overflow-hidden"
        style={
          fullBleed
            ? {
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'clamp(600px, 110vw, 1600px)',
                height: 'clamp(600px, 110vw, 1600px)',
              }
            : largeCircle
            ? {
                left: '-6vw',
                top: '14vh',
                width: 'clamp(400px, 56vw, 800px)',
                height: 'clamp(400px, 56vw, 800px)',
              }
            : {
                left: '22vw',
                top: '26vh',
                width: 'clamp(280px, 34vw, 520px)',
                height: 'clamp(280px, 34vw, 520px)',
                zIndex: 2,
              }
        }
      >
        <img
          src={image}
          alt={headline}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Block */}
      <div
        ref={textBlockRef}
        className="absolute"
        style={
          fullBleed
            ? {
                left: '50%',
                top: '52%',
                transform: 'translate(-50%, -50%)',
                width: '72vw',
                textAlign: 'center',
              }
            : {
                left: '62vw',
                top: '26vh',
                width: '30vw',
                minWidth: '280px',
              }
        }
      >
        {/* Micro Label */}
        <span className={`font-mono-label ${microColor} block mb-6`}>
          {microLabel}
        </span>

        {/* Headline */}
        <h2
          className={`headline-lg ${textColor} mb-8 ${
            fullBleed ? 'text-white drop-shadow-lg' : ''
          }`}
        >
          {headline}
        </h2>

        {/* Body */}
        <p
          className={`body-text mb-10 max-w-md ${
            fullBleed ? 'text-white/90 mx-auto' : bodyColor
          }`}
        >
          {body}
        </p>

        {/* CTA */}
        <button
          onClick={scrollToSection}
          className={fullBleed ? 'btn-primary' : lightMode ? 'btn-primary' : 'btn-secondary'}
        >
          {cta}
          <ArrowRight size={18} className="inline-block ml-2" />
        </button>
      </div>
    </section>
  );
};

export default FeatureSection;
