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
        model: "gemini-2.0-flash-exp",
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-[200] size-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
        aria-label="Open chat"
      >
        {isOpen ? (
          <Minimize2 className="text-white" size={24} />
        ) : (
          <MessageCircle className="text-white" size={24} />
        )}
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75"></span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className="fixed bottom-28 right-8 z-[199] w-96 max-w-[calc(100vw-2rem)] h-[500px] bg-black-100 border border-white-10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img src="/images/Haryiank.jpg" alt="Avatar" className="size-full rounded-full object-cover" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Haryiank's Assistant</h3>
                <p className="text-xs text-white-50">Online now</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index}>
                <div
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.type === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-white-5 text-white-50 border border-white-10"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    <span className="text-xs opacity-60 mt-1 block">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>

                {/* Download Resume Button */}
                {msg.action === "download_resume" && msg.type === "bot" && (
                  <div className="flex justify-start mt-2">
                    <button
                      onClick={handleDownloadResume}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <Download size={18} />
                      <span className="text-sm font-medium">Download Resume</span>
                    </button>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white-5 border border-white-10 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-white-50 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white-50 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-white-50 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(reply)}
                className="px-3 py-1.5 bg-white-5 border border-white-10 rounded-full text-xs text-white-50 hover:bg-white-10 transition-colors whitespace-nowrap"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white-10">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 bg-white-5 border border-white-10 rounded-lg text-white placeholder-white-50 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                onClick={() => handleSendMessage()}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
              >
                <Send size={20} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;