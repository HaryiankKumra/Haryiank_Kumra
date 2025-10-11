import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import TitleHeader from "../components/TitleHeader";
import { techStackImgs } from "../constants";

const TechStack = () => {
  // Animate the tech cards in the skills section
  useGSAP(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // This animation is triggered when the user scrolls to the #skills wrapper
    gsap.fromTo(
      ".tech-card",
      {
        y: prefersReducedMotion ? 0 : 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: prefersReducedMotion ? 0.3 : 1,
        ease: "power2.out",
        stagger: prefersReducedMotion ? 0 : 0.1,
        scrollTrigger: {
          trigger: "#skills",
          start: "top center",
        },
      }
    );

    // Enhanced hover animations for tech cards (optimized)
    gsap.utils.toArray(".tech-card").forEach((card, index) => {
      const img = card.querySelector("img");
      const text = card.querySelector("p");
      const animatedBg = card.querySelector(".tech-card-animated-bg");

      // Set initial states
      gsap.set(animatedBg, { scale: 0, opacity: 0 });
      
      // Store animation references for cleanup
      let hoverTimeline = null;
      let floatAnim = null;
      let rotateAnim = null;
      let idleBreathing = null;
      let idleRotation = null;

      // Debounce function to prevent rapid firing
      let hoverTimeout = null;

      // Only add complex animations on non-mobile devices
      const isMobile = window.innerWidth < 768;

      card.addEventListener("mouseenter", () => {
        if (prefersReducedMotion || isMobile) return;

        clearTimeout(hoverTimeout);
        
        // Kill any existing animations
        if (hoverTimeline) hoverTimeline.kill();
        if (floatAnim) floatAnim.kill();
        if (rotateAnim) rotateAnim.kill();
        if (idleBreathing) idleBreathing.pause();
        if (idleRotation) idleRotation.pause();

        // Create a new timeline
        hoverTimeline = gsap.timeline();

        hoverTimeline
          .to(card, {
            y: -15,
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out",
          })
          .to(
            img,
            {
              scale: 1.2,
              rotation: 10,
              duration: 0.4,
              ease: "power2.out",
            },
            0
          )
          .to(
            text,
            {
              y: -5,
              scale: 1.1,
              color: "#ffffff",
              duration: 0.3,
              ease: "power2.out",
            },
            0.1
          )
          .to(
            animatedBg,
            {
              scale: 1.2,
              opacity: 0.08,
              duration: 0.4,
              ease: "power2.out",
            },
            0
          );

        // Simpler floating animation
        floatAnim = gsap.to(card, {
          y: "-=5",
          duration: 1.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      });

      card.addEventListener("mouseleave", () => {
        if (prefersReducedMotion || isMobile) return;

        clearTimeout(hoverTimeout);
        
        hoverTimeout = setTimeout(() => {
          // Kill hover animations
          if (hoverTimeline) hoverTimeline.kill();
          if (floatAnim) floatAnim.kill();
          if (rotateAnim) rotateAnim.kill();

          // Reset to default state
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
              if (idleBreathing) idleBreathing.resume();
              if (idleRotation) idleRotation.resume();
            }
          });

          gsap.to(img, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(text, {
            y: 0,
            scale: 1,
            color: "#d1d5db",
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(animatedBg, {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }, 50);
      });

      // Simplified click animation
      card.addEventListener("click", () => {
        gsap.to(card, {
          scale: 0.95,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        });

        // Ripple effect
        gsap.fromTo(
          animatedBg,
          { scale: 0, opacity: 0.2 },
          {
            scale: 2,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          }
        );
      });

      // Subtle idle animations (only on desktop and if not reduced motion)
      if (!prefersReducedMotion && !isMobile) {
        idleBreathing = gsap.to(card, {
          delay: index * 0.2,
          duration: 3,
          scale: 1.01,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          paused: false,
        });

        idleRotation = gsap.to(img, {
          delay: index * 0.3,
          duration: 6,
          rotation: 3,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          paused: false,
        });
      }
    });
  });

  return (
    <div id="skills" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="How I Can Contribute & My Key Skills"
          sub="🤝 What I Bring to the Table"
        />
        <div className="tech-grid">
          {techStackImgs.map((techStackIcon, index) => (
            <div
              key={index}
              className="card-border tech-card group xl:rounded-full rounded-lg hover:shadow-2xl hover:shadow-white/10 transition-shadow duration-300 cursor-pointer relative"
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="tech-card-animated-bg absolute inset-0 bg-white/5 rounded-lg xl:rounded-full pointer-events-none" />
              <div className="tech-card-content relative z-10 py-4 md:py-6">
                <div className="tech-icon-wrapper w-16 h-16 md:w-20 md:h-20 mx-auto flex items-center justify-center">
                  <img
                    src={techStackIcon.imgPath}
                    alt={techStackIcon.name}
                    className="w-full h-full object-contain transition-all duration-300 drop-shadow-lg filter brightness-110"
                    loading="lazy"
                    style={{ willChange: 'transform' }}
                  />
                </div>
                <div className="padding-x w-full mt-3">
                  <p className="text-center text-sm md:text-base font-medium transition-all duration-300 text-gray-300">
                    {techStackIcon.name}
                  </p>
                </div>
              </div>

              {/* Simplified glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg xl:rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12"></div>
              </div>

              {/* Border glow effect */}
              <div className="absolute inset-0 rounded-lg xl:rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-lg xl:rounded-full border border-white/10"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
