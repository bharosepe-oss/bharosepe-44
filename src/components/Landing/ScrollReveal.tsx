import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  className?: string;
}

const ScrollReveal = ({ children, className = "" }: ScrollRevealProps) => {
  return <div className={className}>{children}</div>;
};

export default ScrollReveal;

