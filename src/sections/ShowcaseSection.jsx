import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);
  const [projectsPerView, setProjectsPerView] = useState(3);

  // 6 projects data - updated with actual project info
  const projects = [
    {
      id: 1,
      type: "featured",
      image: "/images/project1.png",
      title: "Safe Space - Stress Management and Detection",
      description: "An intelligent platform that helps detect and manage stress through advanced monitoring and personalized wellness solutions.",
      bg: null
    },
    {
      id: 2,
      type: "regular",
      image: "/images/project2.png",
      title: "Revoice - Voice Cloning and ASL",
      description: "Revolutionary voice cloning technology with American Sign Language integration for enhanced communication accessibility.",
      bg: null
    },
    {
      id: 3,
      type: "regular",
      image: "/images/project3.png",
      title: "FinTech - Financial Buddy Track Expenses",
      description: "Your personal financial companion that helps track expenses, manage budgets, and achieve financial goals with smart insights.",
      bg: null
    },
    {
      id: 4,
      type: "featured",
      image: "/images/project4.png",
      title: "Digi-Doc - Doctor Patient Portal",
      description: "A comprehensive digital platform that seamlessly connects doctors and patients for better healthcare management.",
      bg: null
    },
    {
      id: 5,
      type: "regular",
      image: "/images/project5.png",
      title: "LearnOSphere - Kids Learning with Games",
      description: "Interactive educational platform that makes learning fun for kids through engaging games and interactive activities.",
      bg: null
    },
    {
      id: 6,
      type: "regular",
      image: "/images/project6.png",
      title: "Sahayak - NGO Platform for Orphans",
      description: "Connecting hearts and homes - a comprehensive NGO platform dedicated to supporting orphan welfare and adoption services.",
      bg: null
    }
  ];

  const maxIndex = projects.length - projectsPerView; // Maximum scroll position based on projects per view

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );
  }, []);

  // Auto-timer for infinite loop - increased interval to reduce CPU usage
  useEffect(() => {
    const startTimer = () => {
      timerRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => {
          return prevIndex >= maxIndex ? 0 : prevIndex + 1;
        });
      }, 8000); // Increased to 8 seconds to reduce frequent updates
    };

    startTimer();

    // Clear timer on component unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [maxIndex]);

  // Handle responsive projects per view
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768; // md breakpoint
      setProjectsPerView(isMobile ? 1 : 3);
      // Reset currentIndex if it exceeds new maxIndex
      setCurrentIndex(prevIndex => {
        const newMaxIndex = projects.length - (isMobile ? 1 : 3);
        return prevIndex > newMaxIndex ? 0 : prevIndex;
      });
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [projects.length]);

  // Reset timer when user manually navigates
  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => {
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 8000); // Increased interval
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
    } else {
      setCurrentIndex(0); // Loop back to first project
    }
    resetTimer();
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
    } else {
      setCurrentIndex(maxIndex); // Loop to last project
    }
    resetTimer();
  };

  const getVisibleProjects = () => {
    const visibleProjects = [];
    for (let i = 0; i < projectsPerView; i++) {
      if (projects[currentIndex + i]) {
        visibleProjects.push(projects[currentIndex + i]);
      }
    }
    return visibleProjects;
  };

  const visibleProjects = getVisibleProjects();

  return (
    <div id="projects" ref={sectionRef} className="app-showcase py-20">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="relative overflow-hidden">
          {/* Current view - responsive: 1 project on mobile, 3 on desktop */}
          <div className="showcaselayout">
            {visibleProjects[0] && (
              <div className="first-project-wrapper">
                <div className="image-wrapper">
                  <img
                    src={visibleProjects[0].image}
                    alt={visibleProjects[0].title}
                    className="object-cover object-left-top w-full h-full"
                  />
                </div>
                <div className="text-content">
                  <h2>{visibleProjects[0].title}</h2>
                  {visibleProjects[0].description && (
                    <p className="text-white-50 md:text-xl">
                      {visibleProjects[0].description}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Only show additional projects on desktop */}
            {projectsPerView > 1 && (
              <div className="project-list-wrapper overflow-hidden">
                {visibleProjects[1] && (
                  <div className="project">
                    <div className="image-wrapper">
                      <img
                        src={visibleProjects[1].image}
                        alt={visibleProjects[1].title}
                        className="object-cover object-left-top w-full h-full"
                      />
                    </div>
                    <h2>{visibleProjects[1].title}</h2>
                    {visibleProjects[1].description && (
                      <p className="text-white-50 text-sm mt-2">
                        {visibleProjects[1].description}
                      </p>
                    )}
                  </div>
                )}

                {visibleProjects[2] && (
                  <div className="project">
                    <div className="image-wrapper">
                      <img
                        src={visibleProjects[2].image}
                        alt={visibleProjects[2].title}
                        className="object-cover object-left-top w-full h-full"
                      />
                    </div>
                    <h2>{visibleProjects[2].title}</h2>
                    {visibleProjects[2].description && (
                      <p className="text-white-50 text-sm mt-2">
                        {visibleProjects[2].description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full transition-all bg-white text-black hover:bg-gray-200"
              aria-label="Previous project"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    resetTimer();
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-white"
                      : "w-2 bg-gray-600 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to position ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full transition-all bg-white text-black hover:bg-gray-200"
              aria-label="Next project"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Progress indicator */}
          <div className="text-center mt-4 text-gray-400">
            Showing {currentIndex + 1}-{currentIndex + projectsPerView} of {projects.length} projects
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;