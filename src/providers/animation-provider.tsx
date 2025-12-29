"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const AnimationProvider = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default AnimationProvider;
