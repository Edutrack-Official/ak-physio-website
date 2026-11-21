import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Specialties } from "@/components/sections/specialties";
import { BodyMap } from "@/components/sections/body-map";
import { Gym } from "@/components/sections/gym";
import { Journey } from "@/components/sections/journey";
import { WhyUs } from "@/components/sections/why-us";
import { Faq } from "@/components/sections/faq";
import { Visit } from "@/components/sections/visit";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Specialties />
      <BodyMap />
      <Gym />
      <Journey />
      <WhyUs />
      <Faq />
      <Visit />
    </>
  );
}
