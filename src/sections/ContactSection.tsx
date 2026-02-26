import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Linkedin, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );

      // Info animation
      gsap.fromTo(
        infoRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', company: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-[#0B0B0D] min-h-screen py-24"
      style={{ zIndex: 130 }}
    >
      <div className="w-full px-8 lg:px-16">
        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <h2 className="headline-lg text-white mb-6">
            Let's build your next<br />
            <span className="text-[#D4A03A]">operating system.</span>
          </h2>
          <p className="body-text max-w-lg">
            Tell us what you're optimizing. We'll reply within 2 business days.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6 max-w-lg"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white/70 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4A03A] focus:ring-1 focus:ring-[#D4A03A] transition-all"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white/70 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4A03A] focus:ring-1 focus:ring-[#D4A03A] transition-all"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-white/70 mb-2"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4A03A] focus:ring-1 focus:ring-[#D4A03A] transition-all"
                placeholder="Your company"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-white/70 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4A03A] focus:ring-1 focus:ring-[#D4A03A] transition-all resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitted}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSubmitted ? (
                'Message sent!'
              ) : (
                <>
                  Send message
                  <Send size={18} />
                </>
              )}
            </button>
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="lg:pl-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Contact
                </h3>
                <div className="space-y-4">
                  <a
                    href="mailto:hello@lpdm.co"
                    className="flex items-center gap-3 text-[#B9B9B9] hover:text-[#D4A03A] transition-colors"
                  >
                    <Mail size={20} />
                    hello@lpdm.co
                  </a>
                  <a
                    href="tel:+12125550138"
                    className="flex items-center gap-3 text-[#B9B9B9] hover:text-[#D4A03A] transition-colors"
                  >
                    <Phone size={20} />
                    +1 (212) 555-0138
                  </a>
                  <div className="flex items-center gap-3 text-[#B9B9B9]">
                    <MapPin size={20} />
                    New York • London • Remote
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Follow us
                </h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="p-3 bg-white/5 rounded-full text-white/70 hover:text-[#D4A03A] hover:bg-white/10 transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="#"
                    className="p-3 bg-white/5 rounded-full text-white/70 hover:text-[#D4A03A] hover:bg-white/10 transition-all"
                    aria-label="Twitter"
                  >
                    <Twitter size={20} />
                  </a>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <p className="text-sm text-white/50">
                  By submitting this form, you agree to our Privacy Policy and
                  Terms of Service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 pt-8 border-t border-white/10">
        <div className="w-full px-8 lg:px-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-xl font-bold text-white">LPDM</div>
            <div className="flex gap-8 text-sm text-white/50">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Twitter
              </a>
            </div>
            <div className="text-sm text-white/30">
              © 2026 Linked Pasted Due Management. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;
