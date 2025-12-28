import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import TitleHeader from "../components/TitleHeader";
import { techStackImgs } from "../constants";

const TechStack = () => {
  // Check if mobile once at module level
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Animate the tech cards in the skills section
  useGSAP(() => {
    // Completely skip all GSAP animations on mobile
    if (isMobile) return;

    // Desktop only - simple fade in animation
    gsap.fromTo(
      ".tech-card",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: "#skills",
          start: "top 80%",
        },
      }
    );
  }, []);

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
              className={`card-border tech-card group xl:rounded-full rounded-lg transition-shadow duration-300 cursor-pointer relative ${isMobile ? '' : 'hover:shadow-2xl hover:shadow-white/10'}`}
              style={{ opacity: isMobile ? 1 : undefined }}
            >
              <div className="tech-card-content relative z-10 py-4 md:py-6">
                <div className="tech-icon-wrapper w-16 h-16 md:w-20 md:h-20 mx-auto flex items-center justify-center">
                  <img
                    src={techStackIcon.imgPath}
                    alt={techStackIcon.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="padding-x w-full mt-3">
                  <p className="text-center text-sm md:text-base font-medium text-gray-300">
                    {techStackIcon.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
