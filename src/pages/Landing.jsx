import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import TrustIndicators from "../components/landing/TrustIndicators";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-brand-bg-start">

      <Navbar />

      <Hero />

      <TrustIndicators />

      <Features />

      <HowItWorks />

      <CTA />

      <Footer />

    </div>
  );
}