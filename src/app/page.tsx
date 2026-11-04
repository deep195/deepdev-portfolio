import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import Method from "@/components/Method";
import ManyHands from "@/components/ManyHands";
import Work from "@/components/Work";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <Journey />
        <Method />
        <ManyHands />
        <Work />
        <Contact />
      </main>
    </>
  );
}
