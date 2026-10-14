import Motion from "@/components/Motion";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Motion />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Gallery />
      </main>
      <Contact />
    </>
  );
}
