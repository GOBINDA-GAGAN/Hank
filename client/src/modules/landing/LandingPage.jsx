import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Navbar from "./components/Navbar";
import Pricing from "./components/Pricing";
import Security from "./components/Security";

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Continuous landing background */}
      <div className="relative overflow-hidden">
        {/* Global background */}
        <div className=" pointer-events-none absolute inset-0 hero-bg" />

        {/* Landing content */}
        <div className="relative">
          <Hero />
          <Features />
          <HowItWorks />
          {/* <Pricing /> */}
          <Security />
        </div>
          <Footer    />
      </div>
    </main>
  );
};

export default LandingPage;
