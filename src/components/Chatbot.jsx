import { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle, Minimize2, Download } from "lucide-react";
import gsap from "gsap";
import { GoogleGenAI } from "@google/genai";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hi! I'm Haryiank's assistant. Ask me about his experience, skills, or projects! 🚀",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [apiCallCount, setApiCallCount] = useState(0);
  const [lastApiCall, setLastApiCall] = useState(0);
  const messagesEndRef = useRef(null);
  const chatWindowRef = useRef(null);
  const buttonRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize AI silently
  const ai = import.meta.env.VITE_GEMINI_API_KEY 
    ? new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY })
    : null;

  // Resume download handler
  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume/Haryiank_Kumra_Resume.pdf";
    link.download = "Haryiank_Kumra_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    const downloadMessage = {
      type: "bot",
      text: "📄 Resume downloaded! Feel free to reach out if you have any questions.",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, downloadMessage]);
  };

  // Portfolio context for AI
  const portfolioContext = `
You are Haryiank Kumra's personal assistant helping visitors learn about his portfolio.
NEVER reveal that you are an AI, chatbot, or automated system. If asked, say you're Haryiank's assistant managing his portfolio inquiries.
Be conversational, witty, and helpful. Use emojis naturally but don't overdo it.

ABOUT HARYIANK:

EXPERIENCE:
- Research Intern at TIET Patiala (June 2025 - Aug 2025): Worked on multimodal stress detection systems, analyzed data from 200+ subjects, achieved 85% accuracy with Vision Transformer and ResNet
- External Secretary at ISTE (Sept 2023 - Present): Manages 200+ members, secured INR 1.5+ lakhs in sponsorships, coordinated 12 technical workshops for 300+ participants
- Authored 2 IEEE research papers on emotion recognition and physiological signal analysis

SKILLS: React.js, Python, Node.js, Three.js, Git, Full-stack development, 3D web experiences, AI/ML

PROJECTS:
1. Safe Space - Stress management and detection platform
2. Revoice - Voice cloning with ASL integration
3. FinTech - Financial tracking app
4. Digi-Doc - Healthcare portal for doctors and patients
5. LearnOSphere - Educational games for kids
6. Sahayak - NGO platform for orphan welfare

EDUCATION: CS Undergraduate at TIET Patiala, 5th semester, 200+ LeetCode problems solved

ACHIEVEMENTS: 7+ hackathons, 2 IEEE papers, 10+ projects

CONTACT & SOCIAL MEDIA:
- Email: haryiank1kumra@gmail.com
- LinkedIn: https://www.linkedin.com/in/haryiank-kumra-09374b202/
- GitHub: https://github.com/HaryiankKumra
- Twitter/X: https://x.com/KumraHaryiank
- Instagram: https://www.instagram.com/haryiank

LEETCODE: Username is "haryiank" - He's solved 200+ problems and actively practices competitive programming

PERSONALITY GUIDELINES:
- Be witty and conversational
- NEVER say "I'm an AI" or "I'm a chatbot" or "I'm automated"
- If asked what you are, say "I'm Haryiank's assistant helping manage his portfolio inquiries"
- Keep responses concise (2-3 sentences max unless explaining projects)
- If asked about social media, provide the relevant links
- If you don't know something specific, suggest they contact Haryiank directly

IMPORTANT - If asked about being AI/bot/automated:
Respond like: "I'm just here to help answer questions about Haryiank's work! What would you like to know?" or "I'm managing his portfolio inquiries. How can I help?"

SOCIAL MEDIA RESPONSES:
- If asked about LinkedIn/professional profile: "You can connect with Haryiank on LinkedIn at https://www.linkedin.com/in/haryiank-kumra-09374b202/"
- If asked about GitHub/code: "Check out his code on GitHub: https://github.com/HaryiankKumra"
- If asked about Twitter/X: "Follow him on X (Twitter): https://x.com/KumraHaryiank"
- If asked about Instagram: "Find him on Instagram: https://www.instagram.com/haryiank"
- If asked about all social media: List all platforms with links
`;

  // Knowledge base for quick responses (fallback)
  const knowledgeBase = {
    resume: {
      keywords: ["resume", "cv", "download", "curriculum vitae", "pdf"],
      response: "You can download Haryiank's resume using the button below! 📄",
      action: "download_resume",
    },
    // Remove other knowledge base entries to let AI handle everything
  };

  const quickReplies = [
    "Tell me about your experience",
    "What are your skills?",
    "Show me your projects",
    "Download Resume",
  ];

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Animate chatbot open/close
  useEffect(() => {
    if (isOpen && chatWindowRef.current) {
      gsap.fromTo(
        chatWindowRef.current,
        { scale: 0, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  }, [isOpen]);

  // Get response from Gemini AI with rate limiting
  const getGeminiResponse = async (userMessage) => {
    if (!import.meta.env.VITE_GEMINI_API_KEY || !ai) {
      return null;
    }

    try {
      const now = Date.now();
      const timeSinceLastCall = now - lastApiCall;
      
      if (timeSinceLastCall < 60000 && apiCallCount >= 15) {
        return { 
          text: "Whoa there! 🛑 I'm getting too many questions too fast. Let me catch my breath for a minute, or try using the quick replies below! 😅", 
          isAI: false 
        };
      }

      const prompt = `${portfolioContext}\n\nUser question: "${userMessage}"\n\nRespond as Haryiank's assistant (keep it under 100 words):`;
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      
      setApiCallCount(timeSinceLastCall < 60000 ? apiCallCount + 1 : 1);
      setLastApiCall(now);
      
      return { text: response.text, isAI: false }; // Don't mark as AI
    } catch (error) {
      console.error("Chatbot error:", error); // Changed from "Gemini API error"
      
      if (error.message?.includes("429") || error.message?.includes("RATE_LIMIT_EXCEEDED")) {
        return { 
          text: "Oops! I'm getting a lot of questions right now 😅 Try the quick replies below!", 
          isAI: false 
        };
      }
      
      return null;
    }
  };

  // Get bot response (minimal fallback)
  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Only check for resume download
    if (knowledgeBase.resume.keywords.some((keyword) => lowerMessage.includes(keyword))) {
      return { text: knowledgeBase.resume.response, action: knowledgeBase.resume.action, isAI: false };
    }

    // Everything else goes to AI
    return null;
  };

  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim()) return;

    const userMessage = {
      type: "user",
      text: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Check for resume download first
    let response = getBotResponse(messageText);
    
    // For everything else, use AI
    if (!response && import.meta.env.VITE_GEMINI_API_KEY && ai) {
      response = await getGeminiResponse(messageText);
    }
    
    // Fallback to default response
    if (!response) {
      response = {
        text: "I'm here to help you learn about Haryiank's experience, skills, and projects. What would you like to know?",
        isAI: false
      };
    }

    setTimeout(() => {
      const botResponse = {
        type: "bot",
        text: response.text,
        timestamp: new Date(),
        action: response.action,
        isAI: false, // Never mark as AI
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleSend = async () => {
    if (!inputMessage.trim()) return;
    
    // Blur the input to close keyboard on mobile
    if (inputRef.current) {
      inputRef.current.blur();
    }
    
    const userMessage = {
      type: "user",
      text: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Check for resume download first
    let response = getBotResponse(inputMessage);
    
    // For everything else, use AI
    if (!response && import.meta.env.VITE_GEMINI_API_KEY && ai) {
      response = await getGeminiResponse(inputMessage);
    }
    
    // Fallback to default response
    if (!response) {
      response = {
        text: "I'm here to help you learn about Haryiank's experience, skills, and projects. What would you like to know?",
        isAI: false
      };
    }

    setTimeout(() => {
      const botResponse = {
        type: "bot",
        text: response.text,
        timestamp: new Date(),
        action: response.action,
        isAI: false, // Never mark as AI
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[200] size-14 md:size-16 bg-black border-2 border-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all duration-300 group"
        aria-label="Open chat"
      >
        {isOpen ? (
          <Minimize2 className="text-white" size={20} />
        ) : (
          <MessageCircle className="text-white" size={20} />
        )}
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-75"></span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className="fixed bottom-20 right-4 md:bottom-28 md:right-8 z-[199] w-[calc(100vw-2rem)] sm:w-96 md:w-[28rem] max-w-[calc(100vw-2rem)] h-[70vh] sm:h-[500px] md:h-[550px] bg-black border-2 border-white rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.2)] flex flex-col overflow-hidden backdrop-blur-xl"
        >
          {/* Header */}
          <div className="bg-white text-black p-3 md:p-4 flex items-center justify-between border-b-2 border-black">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="size-8 md:size-10 rounded-full border-2 border-black flex items-center justify-center overflow-hidden shadow-lg">
                <img src="/images/Haryiank.jpg" alt="Avatar" className="size-full rounded-full object-cover" />
              </div>
              <div>
                <h3 className="text-black font-bold text-sm md:text-base">Haryiank's Assistant</h3>
                <p className="text-xs text-gray-700">Online now</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-black hover:bg-black/10 rounded-full p-1.5 md:p-2 transition-colors"
            >
              <X size={18} className="md:w-5 md:h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {messages.map((msg, index) => (
              <div key={index}>
                <div
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-[80%] rounded-2xl px-3 md:px-4 py-2 md:py-2.5 transition-all duration-200 ${
                      msg.type === "user"
                        ? "bg-white text-black shadow-lg"
                        : "bg-white/5 text-white border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    }`}
                  >
                    <p className="text-xs md:text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                    <span className="text-[10px] md:text-xs opacity-60 mt-1 block">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>

                {/* Download Resume Button */}
                {msg.action === "download_resume" && msg.type === "bot" && (
                  <div className="flex justify-start mt-2">
                    <button
                      onClick={handleDownloadResume}
                      className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white text-black rounded-xl hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] border border-white/20"
                    >
                      <Download size={16} className="md:w-[18px] md:h-[18px]" />
                      <span className="text-xs md:text-sm font-semibold">Download Resume</span>
                    </button>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/20 rounded-2xl px-3 md:px-4 py-2 md:py-3 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white/70 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-3 md:px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-none">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(reply)}
                className="px-2.5 md:px-3 py-1 md:py-1.5 bg-white/10 border border-white/30 rounded-full text-[10px] md:text-xs text-white hover:bg-white/20 hover:border-white/50 transition-all duration-200 whitespace-nowrap shadow-sm"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 md:p-4 border-t-2 border-white/20">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 px-3 md:px-4 py-2 md:py-2.5 bg-white/5 border border-white/30 rounded-xl text-white text-sm md:text-base placeholder-white/50 focus:outline-none focus:border-white focus:bg-white/10 transition-all duration-200 shadow-inner"
              />
              <button
                onClick={() => handleSendMessage()}
                className="px-3 md:px-4 py-2 md:py-2.5 bg-white text-black hover:bg-gray-200 rounded-xl transition-all duration-200 shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                <Send size={18} className="md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
