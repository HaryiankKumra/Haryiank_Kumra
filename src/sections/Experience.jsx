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
    // Animate timeline progress on scroll with flowing gradient
    gsap.to(".timeline-progress", {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".timeline-container",
        start: "top 30%",
        end: "bottom 70%",
        scrub: 1,
      },
    });

    // Animate flowing gradient effect
    gsap.to(".timeline-progress", {
      backgroundPosition: "0% 200%",
      ease: "none",
      repeat: -1,
      duration: 3,
    });

    // Animate each experience card with stagger
    gsap.utils.toArray(".exp-item").forEach((item, index) => {
      // Card fade in and slide up
      gsap.from(item, {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Glow effect on scroll
      gsap.from(item.querySelector(".content-card"), {
        boxShadow: "0 0 0px rgba(255, 255, 255, 0)",
        scrollTrigger: {
          trigger: item,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
        },
      });
    });

    // Animate timeline dots with scale and glow
    gsap.utils.toArray(".timeline-dot").forEach((dot, index) => {
      gsap.from(dot, {
        scale: 0,
        duration: 0.6,
        ease: "back.out(3)",
        scrollTrigger: {
          trigger: dot,
          start: "top 65%",
        },
      });

      // Pulsing glow effect
      gsap.to(dot, {
        boxShadow: "0 0 20px 5px rgba(255, 255, 255, 0.5)",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: dot,
          start: "top 65%",
        },
      });
    });

    // Animate responsibilities one by one
    gsap.utils.toArray(".resp-item").forEach((item, index) => {
      gsap.from(item, {
        opacity: 0,
        x: -20,
        duration: 0.5,
        delay: index * 0.1,
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
      className="flex-center md:mt-40 mt-20 section-padding xl:px-0"
    >
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader title="Experience" sub="College Journey" />

        <div className="timeline-container mt-20 md:mt-32 relative max-w-6xl mx-auto">
          {/* Animated Timeline */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-1">
            {/* Background line */}
            <div className="absolute inset-0 bg-white-10 rounded-full"></div>
            {/* Animated progress line with flowing gradient */}
            <div 
              className="timeline-progress absolute top-0 left-0 w-full h-0 rounded-full"
              style={{
                background: "linear-gradient(180deg, #ef4444 0%, #a855f7 25%, #3b82f6 50%, #ef4444 75%, #a855f7 100%)",
                backgroundSize: "100% 200%",
                filter: "drop-shadow(0 0 10px rgba(239, 68, 68, 0.5))"
              }}
            ></div>
          </div>

          {/* Experience Items */}
          <div className="space-y-16 md:space-y-20 ml-10 md:ml-20">
            {expCards.map((card, index) => (
              <div key={index} className="exp-item relative">
                {/* Timeline Dot */}
                <div
                  className={`timeline-dot absolute -left-10 md:-left-20 w-5 h-5 md:w-6 md:h-6 bg-gradient-to-br ${card.color} rounded-full border-4 border-black-200 shadow-lg`}
                ></div>

                {/* Content Card */}
                <div className="bg-gradient-to-br from-white-5 to-transparent border border-white-10 rounded-2xl p-6 md:p-8 backdrop-blur-sm hover:border-white-20 transition-all duration-300">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${card.color} p-0.5 flex-shrink-0`}
                      >
                        <div className="w-full h-full bg-black-200 rounded-xl flex items-center justify-center">
                          <img
                            src={card.logoPath}
                            alt="logo"
                            className="w-8 h-8 md:w-10 md:h-10 object-contain"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                          {card.title}
                        </h3>
                        <p className="text-base md:text-lg text-white-80">
                          {card.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 md:text-right">
                      <span className="text-sm text-white-60">
                        🗓️ {card.date}
                      </span>
                      <span className="text-sm text-white-60">
                        📍 {card.location}
                      </span>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div>
                    <h4 className="text-sm font-semibold text-[#839CB5] uppercase tracking-wide mb-4">
                      Key Achievements
                    </h4>
                    <ul className="space-y-3">
                      {card.responsibilities.map((resp, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-white-50 text-sm md:text-base leading-relaxed"
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