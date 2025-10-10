import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import TitleHeader from "../components/TitleHeader";

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if environment variables are set
    const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;
    const autoReplyTemplateId = import.meta.env.VITE_APP_EMAILJS_AUTO_REPLY_TEMPLATE_ID;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS configuration missing. Please check your environment variables:");
      console.error("VITE_APP_EMAILJS_SERVICE_ID:", serviceId ? "✓" : "✗");
      console.error("VITE_APP_EMAILJS_TEMPLATE_ID:", templateId ? "✓" : "✗");
      console.error("VITE_APP_EMAILJS_PUBLIC_KEY:", publicKey ? "✓" : "✗");
      alert("Email configuration is missing. Please contact the developer.");
      setLoading(false);
      return;
    }

    try {
      // Send the main email to you
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );

      console.log("Main email sent successfully:", result);

      // Send auto-reply to the user if auto-reply template is configured
      if (autoReplyTemplateId) {
        try {
          // Use proper EmailJS parameter structure for auto-reply
          const autoReplyParams = {
            // These should match your EmailJS auto-reply template variables
            user_name: form.name,
            user_email: form.email,
            reply_to: form.email, // This should be used in the "To" field of your template
            from_name: "Haryiank Kumra",
            from_email: "haryiank1kumra@gmail.com",
            subject: "Thank you for contacting me!",
            message_body: `Hi ${form.name},

Thank you for reaching out through my portfolio! 

I've received your message and will get back to you within 24-48 hours. In the meantime, feel free to check out my other projects and connect with me on social media.

Your message: "${form.message.substring(0, 150)}${form.message.length > 150 ? '...' : ''}"

Best regards,
Haryiank Kumra
Full Stack Developer & AI Enthusiast

---
This is an automated response. Please do not reply to this email.`
          };

          const autoReplyResult = await emailjs.send(
            serviceId,
            autoReplyTemplateId,
            autoReplyParams,
            publicKey
          );

          console.log("Auto-reply sent successfully:", autoReplyResult);
        } catch (autoReplyError) {
          console.error("Auto-reply failed:", autoReplyError);
          console.error("Auto-reply error details:", {
            status: autoReplyError.status,
            text: autoReplyError.text
          });
          
          // Log the parameters that were sent for debugging
          console.error("Auto-reply parameters:", {
            user_email: form.email,
            user_name: form.name
          });
        }
      }

      // Success message
      alert("Message sent successfully! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
      
    } catch (error) {
      console.error("Main email failed:", error);
      console.error("Error details:", {
        status: error.status,
        text: error.text
      });
      
      // More specific error handling
      if (error.status === 400) {
        alert("There was an issue with the message format. Please check all fields and try again.");
      } else if (error.status === 422) {
        alert("Email service configuration error. The message couldn't be sent. Please contact me directly at haryiank1kumra@gmail.com");
      } else if (error.status === 404) {
        alert("Email service not found. Please contact me directly at haryiank1kumra@gmail.com");
      } else {
        alert("Failed to send message. Please try again or contact me directly at haryiank1kumra@gmail.com");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Get in Touch – Let's Connect"
          sub="💬 Have questions or ideas? Let's talk! 🚀"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-16">
          {/* Left Side - Contact Form */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="card-border rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Send me a message
              </h3>
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-6"
              >
                <div className="form-group">
                  <label
                    htmlFor="name"
                    className="block text-white text-sm font-medium mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What's your good name?"
                    className="w-full px-4 py-3 bg-black-200 border border-white-10 rounded-lg text-white placeholder-white-50 focus:outline-none focus:border-white-20 transition-colors"
                    required
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="email"
                    className="block text-white text-sm font-medium mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What's your email address?"
                    className="w-full px-4 py-3 bg-black-200 border border-white-10 rounded-lg text-white placeholder-white-50 focus:outline-none focus:border-white-20 transition-colors"
                    required
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="message"
                    className="block text-white text-sm font-medium mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows="6"
                    className="w-full px-4 py-3 bg-black-200 border border-white-10 rounded-lg text-white placeholder-white-50 focus:outline-none focus:border-white-20 transition-colors resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4"
                >
                  <div className="cta-button group w-full">
                    <div className="bg-circle" />
                    <p className="text">
                      {loading ? "Sending..." : "Send Message"}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>
              </form>
            </div>
          </div>

          {/* Right Side - Image and Contact Details */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            {/* Profile Image */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white-10 shadow-2xl">
                  <img
                    src="https://haryiank.me/Haryiank/assets/images/IMG_1760.jpg"
                    alt="Haryiank Kumra"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl -z-10"></div>
              </div>
            </div>

            {/* Name */}
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Haryiank Kumra
              </h2>
              <p className="text-white-60 text-base">
                Full Stack Developer & AI Enthusiast
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {/* Location */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white-5 border border-white-10">
                <div className="text-xl">📍</div>
                <div>
                  <h4 className="text-white font-semibold mb-1 text-sm">
                    Address
                  </h4>
                  <p className="text-white-70 text-sm">
                    Thapar University, Patiala
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white-5 border border-white-10">
                <div className="text-xl">📞</div>
                <div>
                  <h4 className="text-white font-semibold mb-1 text-sm">Phone</h4>
                  <p className="text-white-70 text-sm">+91-123-456-789</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white-5 border border-white-10">
                <div className="text-xl">✉️</div>
                <div>
                  <h4 className="text-white font-semibold mb-1 text-sm">Email</h4>
                  <p className="text-white-70 text-sm">
                    haryiank1kumra@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
