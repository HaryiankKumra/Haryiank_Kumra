import { useState, useEffect } from "react";
import { Github, ExternalLink, ArrowLeft, Award, Code, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    const handleMouseMove = (e) => {
      // Show header when cursor is near the top (within 100px)
      if (e.clientY < 100) {
        setShowHeader(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [lastScrollY]);

  const handleContactClick = (e) => {
    e.preventDefault();
    navigate("/");
    // Small delay to allow navigation, then scroll to contact
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const projects = [
    {
      id: 1,
      title: "Safe Space - Stress Management and Detection",
      description: "An intelligent platform that helps detect and manage stress through advanced monitoring and personalized wellness solutions.",
      longDescription: "Safe Space uses machine learning algorithms to analyze user behavior patterns and physiological indicators to detect stress levels. The platform provides personalized recommendations, guided meditation sessions, and connects users with mental health resources.",
      image: "/images/project1.png",
      technologies: ["React", "Python", "TensorFlow", "Node.js", "MongoDB"],
      github: "https://github.com/HaryiankKumra/source-code-sniffer-easy",
      live: "https://safespace-indol.vercel.app/",
      category: "AI/ML"
    },
    {
      id: 2,
      title: "Revoice - Voice Cloning and ASL",
      description: "Revolutionary voice cloning technology with American Sign Language integration for enhanced communication accessibility.",
      longDescription: "Revoice combines cutting-edge voice synthesis technology with ASL recognition to bridge communication gaps. Users can clone voices for text-to-speech applications while the ASL feature translates sign language in real-time.",
      image: "/images/project2.png",
      technologies: ["Python", "PyTorch", "OpenCV", "React", "FastAPI"],
      github: "https://github.com/HaryiankKumra/rev-voice-anyway",
      live: "https://rev-voice-anyway.vercel.app/",
      category: "AI/ML"
    },
    {
      id: 3,
      title: "FinTech - Financial Buddy Track Expenses",
      description: "Your personal financial companion that helps track expenses, manage budgets, and achieve financial goals with smart insights.",
      longDescription: "FinTech offers comprehensive financial management with expense tracking, budget planning, investment insights, and bill reminders. The AI-powered analytics provide personalized saving tips and spending patterns analysis.",
      image: "/images/project3.png",
      technologies: ["React Native", "Node.js", "PostgreSQL", "Chart.js", "Plaid API"],
      github: "https://github.com/HaryiankKumra/Fintech",
      live: "https://fintech-psi-three.vercel.app/landingpage.html",
      category: "Web"
    },
    {
      id: 4,
      title: "Digi-Doc - Doctor Patient Portal",
      description: "A comprehensive digital platform that seamlessly connects doctors and patients for better healthcare management.",
      longDescription: "Digi-Doc streamlines healthcare with appointment scheduling, telemedicine consultations, prescription management, and medical record storage. Features include real-time chat, video consultations, and integrated pharmacy services.",
      image: "/images/project4.png",
      technologies: ["React", "Node.js", "MongoDB", "WebRTC", "Socket.io"],
      github: "https://github.com/HaryiankKumra/Digi-Doc",
      live: "https://digi-doc.vercel.app/",
      category: "Web"
    },
    {
      id: 5,
      title: "LearnOSphere - Kids Learning with Games",
      description: "Interactive educational platform that makes learning fun for kids through engaging games and interactive activities.",
      longDescription: "LearnOSphere gamifies education for children aged 4-12 with interactive lessons in math, science, language, and arts. Features adaptive learning paths, progress tracking for parents, and reward systems to keep kids motivated.",
      image: "/images/project5.png",
      technologies: ["React", "Three.js", "Node.js", "MongoDB", "Canvas API"],
      github: "https://github.com/HaryiankKumra/Learnosphere",
      live: "https://learnosphere.vercel.app/",
      category: "Web"
    },
    {
      id: 6,
      title: "Sahayak - NGO Platform for Orphans",
      description: "Connecting hearts and homes - a comprehensive NGO platform dedicated to supporting orphan welfare and adoption services.",
      longDescription: "Sahayak facilitates orphan support through donation management, volunteer coordination, adoption process guidance, and awareness campaigns. The platform connects donors, volunteers, and families with verified orphanages.",
      image: "/images/project6.png",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "SendGrid"],
      github: "https://github.com/HaryiankKumra/sahayak12",
      live: "https://sahayak-nu.vercel.app/",
      category: "Web"
    }
  ];

  // Empty certifications array - add your real certifications here
  const certifications = [];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div 
        className={`fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-black-50 transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-20 py-4 flex items-center justify-between">
          {/* Left - Name */}
          <a href="/" className="text-white font-bold text-lg hover:text-white-50 transition-colors">
            Haryiank Kumra
          </a>

          {/* Center - Tabs */}
          <div className="flex gap-2 md:gap-4">
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-1 md:gap-2 px-3 md:px-5 py-2 rounded-full font-medium text-sm md:text-base transition-all ${
                activeTab === "projects"
                  ? "bg-white text-black"
                  : "text-white-50 hover:text-white hover:bg-black-50"
              }`}
            >
              <Code size={16} className="hidden md:block" />
              Projects
            </button>
            <button
              onClick={() => setActiveTab("certifications")}
              className={`flex items-center gap-1 md:gap-2 px-3 md:px-5 py-2 rounded-full font-medium text-sm md:text-base transition-all ${
                activeTab === "certifications"
                  ? "bg-white text-black"
                  : "text-white-50 hover:text-white hover:bg-black-50"
              }`}
            >
              <Award size={16} className="hidden md:block" />
              Certifications
            </button>
          </div>

          {/* Right - Back Home */}
          <a
            href="/"
            className="flex items-center gap-2 text-white-50 hover:text-white transition-colors"
          >
            <span className="hidden md:inline">Back to Home</span>
            <ArrowLeft size={20} />
          </a>
        </div>
      </div>

      {/* Main Content - Added top padding to account for fixed header */}
      <div className="max-w-7xl mx-auto px-5 md:px-20 pt-24 pb-8">
        {/* Projects Grid */}
        {activeTab === "projects" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-black-100 rounded-2xl overflow-hidden border border-black-50 hover:border-white-50/50 transition-all duration-300 hover:shadow-xl"
              >
                {/* Image with blur background effect */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-50"
                  />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="relative z-10 w-full h-full object-contain"
                  />
                  <div className="absolute top-3 right-3 z-20">
                    <span className="px-3 py-1 bg-white/90 text-black text-xs font-semibold rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-white-50 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-blue-50 text-sm mb-4 line-clamp-3">
                    {project.longDescription}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-black-200 text-white-50 text-xs rounded-md border border-black-50"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-black-200 text-blue-50 text-xs rounded-md border border-black-50">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-black-200 hover:bg-black-50 border border-black-50 rounded-lg text-sm transition-colors text-white-50"
                    >
                      <Github size={16} />
                      Code
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-200 text-black rounded-lg text-sm transition-colors font-medium"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications Grid */}
        {activeTab === "certifications" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="group bg-black-100 rounded-2xl overflow-hidden border border-black-50 hover:border-white-50/50 transition-all duration-300 hover:shadow-xl"
              >
                {/* Certificate Image */}
                <div className="relative h-40 overflow-hidden bg-black-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Award size={64} className="text-white-50/20" />
                  </div>
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="relative z-10 w-full h-full object-contain p-4"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-1 text-white group-hover:text-white-50 transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-white-50 text-sm mb-1">{cert.issuer}</p>
                  <p className="text-blue-50 text-xs mb-3">{cert.date}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {cert.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-black-200 text-white-50 text-xs rounded border border-black-50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Verify Link */}
                  <a
                    href={cert.credential}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-black-200 hover:bg-black-50 border border-black-50 rounded-lg text-sm transition-colors text-white-50"
                  >
                    <Layers size={16} />
                    Verify Credential
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-5 md:px-20 py-12 text-center">
        <p className="text-blue-50">
          Want to collaborate?{" "}
          <a
            href="/#contact"
            onClick={handleContactClick}
            className="text-white-50 hover:text-white cursor-pointer"
          >
            Get in touch!
          </a>
        </p>
      </div>
    </div>
  );
};

export default ProjectsPage;
