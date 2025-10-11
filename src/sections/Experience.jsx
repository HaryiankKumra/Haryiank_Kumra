import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
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
    // Check if user prefers reduced motion or is on mobile
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // Set initial state - line hidden
    gsap.set(".timeline-progress", { height: "0%" });

    // Animate timeline progress starting from the first dot position
    gsap.to(".timeline-progress", {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".timeline-container",
        start: isMobile ? "top 75%" : "top 65%",
        end: isMobile ? "bottom 80%" : "bottom 70%",
        scrub: 1,
      },
    });

    // Animate flowing gradient effect (disabled on mobile for performance)
    if (!isMobile && !prefersReducedMotion) {
      gsap.to(".timeline-progress", {
        backgroundPosition: "0% 200%",
        ease: "none",
        repeat: -1,
        duration: 3,
      });
    }

    // Animate each experience card with stagger
    gsap.utils.toArray(".exp-item").forEach((item, index) => {
      // Card fade in and slide up
      gsap.from(item, {
        opacity: 0,
        y: prefersReducedMotion || isMobile ? 30 : 80,
        duration: prefersReducedMotion ? 0.3 : isMobile ? 0.6 : 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: isMobile ? "top 90%" : "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Animate responsibilities one by one (simplified on mobile)
    gsap.utils.toArray(".resp-item").forEach((item, index) => {
      gsap.from(item, {
        opacity: 0,
        x: prefersReducedMotion || isMobile ? 0 : -20,
        duration: prefersReducedMotion ? 0.2 : isMobile ? 0.3 : 0.5,
        delay: (prefersReducedMotion || isMobile) ? 0 : index * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
        },
      });
    });
  }, []);

  return (
    <section
      id="experience"
      className="flex-center md:mt-40 mt-16 section-padding xl:px-0"
    >
      <div className="w-full h-full md:px-20 px-4 sm:px-6">
        <TitleHeader title="Experience" sub="College Journey" />

        <div className="timeline-container mt-12 sm:mt-16 md:mt-32 relative max-w-6xl mx-auto">
          {/* Animated Timeline with bold start */}
          <div className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-[2px] md:w-0.5">
            {/* Background line */}
            <div className="absolute inset-0 bg-white-10 rounded-full"></div>
            {/* Animated progress line with flowing gradient */}
            <div
              className="timeline-progress absolute top-0 left-0 w-full h-0 rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, #ff0000 0%, #ef4444 15%, #ec4899 30%, #a855f7 50%, #6366f1 70%, #1e3a8a 100%)",
                backgroundSize: "100% 200%",
                filter: "drop-shadow(0 0 6px rgba(255, 0, 0, 0.3)) drop-shadow(0 0 8px rgba(255, 0, 0, 0.2))",
              }}
            ></div>
            {/* Bold starting point */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 bg-gradient-to-br from-red-500 to-orange-500 rounded-full shadow-lg z-10" 
                 style={{ filter: "drop-shadow(0 0 6px rgba(239, 68, 68, 0.5))" }}></div>
          </div>

          {/* Experience Items */}
          <div className="space-y-12 sm:space-y-14 md:space-y-16 lg:space-y-20 ml-12 sm:ml-14 md:ml-20">
            {expCards.map((card, index) => (
              <div key={index} className="exp-item relative">
                {/* Timeline Dot */}
                {/* <div className="absolute -left-[2.6rem] sm:-left-[2.8rem] md:-left-16 top-6 md:top-8 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-white-20 to-white-5 border-2 border-white-30 z-10"
                     style={{ filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.2))" }}></div> */}

                {/* Content Card */}
                <div className="bg-gradient-to-br from-white-5 to-transparent border border-white-10 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 backdrop-blur-sm hover:border-white-20 transition-all duration-300 overflow-hidden">
                  {/* Header */}
                  <div className="flex flex-col gap-4 mb-5 sm:mb-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl bg-gradient-to-br ${card.color} p-0.5 flex-shrink-0`}
                      >
                        <div className="w-full h-full bg-black-200 rounded-lg sm:rounded-xl flex items-center justify-center">
                          <img
                            src={card.logoPath}
                            alt={`${card.company} logo`}
                            className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2 leading-tight">
                          {card.title}
                        </h3>
                        <p className="text-sm sm:text-base md:text-lg text-white-80 leading-snug">
                          {card.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pl-0 sm:pl-0">
                      <span className="text-xs sm:text-sm text-white-60 flex items-center gap-1.5">
                        <span className="text-base sm:text-lg">🗓️</span>
                        <span className="leading-tight">{card.date}</span>
                      </span>
                      <span className="text-xs sm:text-sm text-white-60 flex items-center gap-1.5">
                        <span className="text-base sm:text-lg">📍</span>
                        <span className="leading-tight">{card.location}</span>
                      </span>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#839CB5] uppercase tracking-wide mb-3 sm:mb-4">
                      Key Achievements
                    </h4>
                    <ul className="space-y-2.5 sm:space-y-3">
                      {card.responsibilities.map((resp, idx) => (
                        <li
                          key={idx}
                          className="resp-item flex items-start gap-2 sm:gap-3 text-white-50 text-xs sm:text-sm md:text-base leading-relaxed"
                        >
                          <span
                            className={`mt-1.5 sm:mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-br ${card.color} flex-shrink-0`}
                          ></span>
                          <span className="flex-1">{resp}</span>
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
