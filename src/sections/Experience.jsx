import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";

import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Experience data
  const expCards = [
    {
      title: "Research Intern",
      company: "Thapar Institute of Engineering and Technology",
      date: "June 2025 – August 2025",
      location: "Patiala, Punjab",
      logoPath: "/images/thaparlogo.png",
      color: "from-red-500 to-orange-500",
      responsibilities: [
        "Designed and executed research on multimodal stress detection systems, analyzing data from 200+ subjects across 3 physiological sensors and achieving 15% improvement in detection accuracy",
        "Authored 2 technical research papers on emotion recognition systems and physiological signal analysis, currently under peer review at IEEE conferences with potential impact factor of 3.2+",
        "Optimized Vision Transformer and ResNet architectures on WESAD, FER-2013, and CK+ datasets, achieving 85% accuracy and reducing inference time by 30% through model compression techniques",
      ],
    },
    {
      title: "External Secretary - Public Relations & Marketing",
      company: "Indian Society for Technical Education (ISTE)",
      date: "September 2023 – Present",
      location: "Thapar Institute",
      logoPath: "/images/istelogo.png",
      color: "from-blue-500 to-purple-500",
      responsibilities: [
        "Spearheaded external communications for 200+ member organization, increasing social media engagement by 150% and growing membership by 30% year-over-year",
        "Negotiated and secured 8 strategic MOUs with industry partners, generating INR 1.5+ lakhs in sponsorships and creating internship opportunities for 50+ students",
        "Coordinated 12 technical workshops on emerging technologies for 300+ participants, achieving 95% satisfaction rating",
      ],
    },
  ];

  useGSAP(() => {
    // Skip complex animations on mobile for better performance
    if (isMobile) {
      // Simple fade-in only for mobile
      gsap.utils.toArray(".exp-item").forEach((item) => {
        gsap.set(item, { opacity: 1, y: 0 });
      });
      gsap.set(".timeline-progress", { height: "100%" });
      return;
    }

    // Desktop animations
    gsap.set(".timeline-progress", { height: "0%" });

    gsap.to(".timeline-progress", {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".timeline-container",
        start: "top 65%",
        end: "bottom 70%",
        scrub: 1,
      },
    });

    // Animate each experience card
    gsap.utils.toArray(".exp-item").forEach((item) => {
      gsap.from(item, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, [isMobile]);

  return (
    <section
      id="experience"
      className="flex-center md:mt-40 mt-16 section-padding xl:px-0"
    >
      <div className="w-full h-full md:px-20 px-4 sm:px-6">
        <TitleHeader title="Experience" sub="College Journey" />

        <div className="timeline-container mt-12 sm:mt-16 md:mt-32 relative max-w-6xl mx-auto">
          {/* Timeline - Static on mobile, animated on desktop */}
          <div className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-[2px] md:w-0.5">
            <div className="absolute inset-0 bg-white-10 rounded-full"></div>
            <div
              className="timeline-progress absolute top-0 left-0 w-full rounded-full"
              style={{
                height: isMobile ? "100%" : "0%",
                background:
                  "linear-gradient(180deg, #ef4444 0%, #a855f7 50%, #6366f1 100%)",
              }}
            ></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-br from-red-500 to-orange-500 rounded-full z-10"></div>
          </div>

          {/* Experience Items */}
          <div className="space-y-10 sm:space-y-12 md:space-y-16 ml-12 sm:ml-14 md:ml-20">
            {expCards.map((card, index) => (
              <div key={index} className="exp-item relative">
                <div className="bg-gradient-to-br from-white-5 to-transparent border border-white-10 rounded-xl p-4 sm:p-5 md:p-6 lg:p-8">
                  {/* Header */}
                  <div className="flex flex-col gap-3 mb-4 sm:mb-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg bg-gradient-to-br ${card.color} p-0.5 flex-shrink-0`}
                      >
                        <div className="w-full h-full bg-black-200 rounded-lg flex items-center justify-center">
                          <img
                            src={card.logoPath}
                            alt={`${card.company} logo`}
                            className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white mb-1 leading-tight">
                          {card.title}
                        </h3>
                        <p className="text-sm sm:text-base text-white-80 leading-snug">
                          {card.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:gap-4">
                      <span className="text-xs sm:text-sm text-white-60 flex items-center gap-1">
                        🗓️ {card.date}
                      </span>
                      <span className="text-xs sm:text-sm text-white-60 flex items-center gap-1">
                        📍 {card.location}
                      </span>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#839CB5] uppercase tracking-wide mb-3">
                      Key Achievements
                    </h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {card.responsibilities.map((resp, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-white-50 text-xs sm:text-sm md:text-base leading-relaxed"
                        >
                          <span
                            className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br ${card.color} flex-shrink-0`}
                          ></span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
