import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import FeatureCards from "./sections/FeatureCards";
import Navbar from "./components/NavBar";
import Chatbot from "./components/Chatbot";

const App = () => (
  <>
    <Navbar />
    <Hero />
    <ShowcaseSection />
    <FeatureCards />
    <Experience />
    <TechStack />
    <Contact />
    <Footer />
    <Chatbot />
  </>
);

export default App;
