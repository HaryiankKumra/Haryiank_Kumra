import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import TitleHeader from "../components/TitleHeader";
import { techStackImgs } from "../constants";

const TechStack = () => {
  // Animate the tech cards in the skills section
  useGSAP(() => {
    // This animation is triggered when the user scrolls to the #skills wrapper
    // The animation starts when the top of the wrapper is at the center of the screen
    // The animation is staggered, meaning each card will animate in sequence
    // The animation ease is set to "power2.inOut", which is a slow-in fast-out ease
    gsap.fromTo(
      ".tech-card",
      {
        // Initial values
        y: 50, // Move the cards down by 50px
        opacity: 0, // Set the opacity to 0
      },
      {
        // Final values
        y: 0, // Move the cards back to the top
        opacity: 1, // Set the opacity to 1
        duration: 1, // Duration of the animation
        ease: "power2.inOut", // Ease of the animation
        stagger: 0.2, // Stagger the animation by 0.2 seconds
        scrollTrigger: {
          trigger: "#skills", // Trigger the animation when the user scrolls to the #skills wrapper
          start: "top center", // Start the animation when the top of the wrapper is at the center of the screen
        },
      }
    );

    // Enhanced hover animations for tech cards
    gsap.utils.toArray(".tech-card").forEach((card, index) => {
      const img = card.querySelector("img");
      const text = card.querySelector("p");
      const animatedBg = card.querySelector(".tech-card-animated-bg");

      // Set initial states
      gsap.set(animatedBg, { scale: 0, opacity: 0 });

      card.addEventListener("mouseenter", () => {
        // Create a timeline for coordinated animations
        const tl = gsap.timeline();

        tl.to(card, {
          y: -20,
          scale: 1.08,
          rotationY: 5,
          duration: 0.5,
          ease: "back.out(1.4)",
        })
          .to(
            img,
            {
              scale: 1.3,
              rotation: 15,
              y: -5,
              duration: 0.6,
              ease: "elastic.out(1, 0.5)",
            },
            0
          )
          .to(
            text,
            {
              y: -10,
              scale: 1.15,
              color: "#ffffff",
              fontWeight: "bold",
              duration: 0.4,
              ease: "power2.out",
            },
            0.1
          )
          .to(
            animatedBg,
            {
              scale: 1.5,
              opacity: 0.1,
              duration: 0.5,
              ease: "power2.out",
            },
            0
          );

        // Add continuous floating animation
        gsap.to(card, {
          y: "-=8",
          duration: 2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });

        // Add subtle rotation animation
        gsap.to(img, {
          rotation: "+=360",
          duration: 4,
          repeat: -1,
          ease: "none",
        });
      });

      card.addEventListener("mouseleave", () => {
        // Kill all animations
        gsap.killTweensOf([card, img, text]);

        const tl = gsap.timeline();

        tl.to(card, {
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.4,
          ease: "power2.out",
        })
          .to(
            img,
            {
              scale: 1,
              rotation: 0,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
            },
            0
          )
          .to(
            text,
            {
              y: 0,
              scale: 1,
              color: "#e5e7eb",
              fontWeight: "medium",
              duration: 0.3,
              ease: "power2.out",
            },
            0
          )
          .to(
            animatedBg,
            {
              scale: 0,
              opacity: 0,
              duration: 0.3,
              ease: "power2.out",
            },
            0
          );
      });

      // Add click animation with ripple effect
      card.addEventListener("click", () => {
        gsap.to(card, {
          scale: 0.9,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        });

        // Ripple effect
        gsap.fromTo(
          animatedBg,
          { scale: 0, opacity: 0.3 },
          {
            scale: 3,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          }
        );

        // Image bounce
        gsap.to(img, {
          scale: 1.5,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "back.out(2)",
        });
      });

      // Random subtle breathing animations for idle state
      gsap.to(card, {
        delay: index * 0.3,
        duration: 4 + Math.random() * 3,
        scale: 1.02,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // Subtle image rotation on idle
      gsap.to(img, {
        delay: index * 0.5,
        duration: 8 + Math.random() * 4,
        rotation: 5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
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
              className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg hover:shadow-2xl hover:shadow-white/10 transition-all duration-500 cursor-pointer relative"
            >
              <div className="tech-card-animated-bg absolute inset-0 bg-white/5 rounded-lg xl:rounded-full" />
              <div className="tech-card-content relative z-10">
                <div className="tech-icon-wrapper w-16 h-16 md:w-20 md:h-20 mx-auto">
                  <img
                    src={techStackIcon.imgPath}
                    alt={techStackIcon.name}
                    className="w-full h-full object-contain transition-all duration-500 drop-shadow-2xl filter brightness-110"
                  />
                </div>
                <div className="padding-x w-full mt-3">
                  <p className="text-center text-sm md:text-base font-medium transition-all duration-300 text-gray-300">
                    {techStackIcon.name}
                  </p>
                </div>
              </div>

              {/* Enhanced glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1500"></div>
              </div>

              {/* Border glow effect */}
              <div className="absolute inset-0 rounded-lg xl:rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 rounded-lg xl:rounded-full border border-white/20 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
