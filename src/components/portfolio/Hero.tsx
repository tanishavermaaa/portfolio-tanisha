import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

declare global {
  interface Window {
    gsap?: any;
  }
}

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap || !headlineRef.current) return;

    const ctx = gsap.context(() => {
      // Split headline into per-word spans for staggered reveal
      const headline = headlineRef.current!;
      const originalHTML = headline.innerHTML;
      const text = headline.textContent || "";
      const words = text.trim().split(/\s+/);

      // Preserve gradient on "Verma"
      headline.innerHTML = words
        .map((w) => {
          const isGradient = w.toLowerCase().includes("verma");
          const cls = isGradient ? "text-gradient" : "";
          return `<span class="reveal-word inline-block overflow-hidden align-bottom"><span class="reveal-inner inline-block ${cls}">${w}</span></span>`;
        })
        .join(" ");

      const inners = headline.querySelectorAll(".reveal-inner");

      // Set initial states
      gsap.set(inners, { yPercent: 110, opacity: 0 });
      gsap.set(
        [badgeRef.current, subRef.current, metaRef.current, ctaRef.current, descRef.current],
        { y: 24, opacity: 0 }
      );

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.to(badgeRef.current, { y: 0, opacity: 1, duration: 1.0 }, 0.1)
        .to(
          inners,
          { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.08 },
          0.2
        )
        .to(subRef.current, { y: 0, opacity: 1, duration: 1.0 }, 0.5)
        .to(metaRef.current, { y: 0, opacity: 1, duration: 1.0 }, 0.65)
        .to(ctaRef.current, { y: 0, opacity: 1, duration: 1.0 }, 0.8)
        .to(descRef.current, { y: 0, opacity: 1, duration: 1.0 }, 0.95);

      // Floating loop on orbs (infinite, smooth)
      const orbs = [orb1Ref.current, orb2Ref.current, orb3Ref.current].filter(Boolean);
      orbs.forEach((orb, i) => {
        gsap.to(orb, {
          y: i % 2 === 0 ? -30 : 30,
          x: i % 2 === 0 ? 20 : -20,
          duration: 6 + i * 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Subtle glow pulse on headline gradient word
      const gradientWord = headline.querySelector(".text-gradient");
      if (gradientWord) {
        gsap.to(gradientWord, {
          filter: "drop-shadow(0 0 24px hsl(270 100% 75% / 0.55))",
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Parallax on mouse move
      const xTo = orbs.map((orb) =>
        gsap.quickTo(orb, "x", { duration: 1.2, ease: "power3.out" })
      );
      const yTo = orbs.map((orb) =>
        gsap.quickTo(orb, "y", { duration: 1.2, ease: "power3.out" })
      );
      const bgX = bgRef.current
        ? gsap.quickTo(bgRef.current, "x", { duration: 1.4, ease: "power3.out" })
        : null;
      const bgY = bgRef.current
        ? gsap.quickTo(bgRef.current, "y", { duration: 1.4, ease: "power3.out" })
        : null;

      const onMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const nx = (e.clientX / innerWidth - 0.5) * 2; // -1..1
        const ny = (e.clientY / innerHeight - 0.5) * 2;
        orbs.forEach((_, i) => {
          const depth = 20 + i * 14;
          xTo[i](nx * depth);
          yTo[i](ny * depth);
        });
        bgX?.(nx * 12);
        bgY?.(ny * 12);
      };

      window.addEventListener("mousemove", onMove, { passive: true });
      return () => {
        window.removeEventListener("mousemove", onMove);
        headline.innerHTML = originalHTML;
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
    >
      {/* Background image */}
      <div
        ref={bgRef}
        className="absolute inset-0 -z-10 opacity-60 will-change-transform"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/60 to-background" />

      {/* Aurora */}
      <div className="aurora -z-10" />

      {/* Floating orbs */}
      <div
        ref={orb1Ref}
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px] -z-10 will-change-transform"
      />
      <div
        ref={orb2Ref}
        className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-accent/20 blur-[140px] -z-10 will-change-transform"
      />
      <div
        ref={orb3Ref}
        className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-primary-glow/15 blur-[100px] -z-10 will-change-transform"
      />

      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs md:text-sm text-muted-foreground mb-8"
          >
            <Sparkles size={14} className="text-primary-glow" />
            Available for freelance & internship opportunities
          </div>

          <h1
            ref={headlineRef}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.05] mb-6"
          >
            Tanisha <span className="text-gradient">Verma</span>
          </h1>

          <p
            ref={subRef}
            className="text-base md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed mb-5 font-light"
          >
            Blending logic and design into living products
            <span className="inline-block w-[2px] h-5 md:h-7 ml-1 align-middle bg-primary-glow animate-blink" />
          </p>

          <p
            ref={metaRef}
            className="text-xs md:text-base text-muted-foreground mb-10 tracking-wide"
          >
            Final-year IT Student <span className="text-primary-glow/60 mx-2">•</span> MERN Stack Developer
            <span className="text-primary-glow/60 mx-2">•</span> Creative Designer
          </p>

          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <button
              onClick={() =>
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
              }
              className="magnetic group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-primary text-primary-foreground font-medium shadow-elegant hover:shadow-glow-primary transition-all duration-500 ease-smooth"
            >
              View My Work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=tanishavermaa4@gmail.com&su=Lets%20work%20together"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 cursor-pointer inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full glass-strong text-foreground font-medium hover:bg-foreground/5 transition-all duration-500 ease-smooth hover:-translate-y-0.5"
            >
              Let's Connect
            </a>
          </div>

          <p
            ref={descRef}
            className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            A developer who blends logic with creativity to build digital products that are functional,
            polished, and meaningful - work that solves real problems and leaves a strong impression.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
        <div className="w-6 h-10 rounded-full border border-foreground/20 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-gradient-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
