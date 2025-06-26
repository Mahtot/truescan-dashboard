import About from "@/components/ui/About";
import Contact from "@/components/ui/Contact";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import HeroSection from "@/components/ui/HeroSection";
import HowItWorks from "@/components/ui/HowItWorks";
import Manufacturer from "@/components/ui/Manufacturer";

export default function Home() {
  const items = [
    {
      name: "About",
      to: "about"
    }, {
      name: "How it works",
      to: "how"
    }, {
      name: "Manufacturer Dashboard",
      to: "manufacturer"
    }, {
      name: "Contact",
      to: "contact"
    }
  ]
  return (
    <div className="flex flex-col">
      <Header items={items} />
      <HeroSection />
      <About />
      <HowItWorks />
      <Manufacturer />
      <Contact />
      <Footer />
    </div>
  );
}
