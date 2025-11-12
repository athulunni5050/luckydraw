import { useMemo } from "react";
import Spin from "./components/Spin";
import bottomHud from "./assets/bottom.png";

// Particle configuration
const PARTICLES = [
  { left: 'left-10', top: 'top-24', colorClass: 'bg-cyan-300', shadow: 'shadow-[0_0_14px_#67e8f9]' },
  { left: 'right-12', top: 'top-40', colorClass: 'bg-fuchsia-300', shadow: 'shadow-[0_0_14px_#f0abfc]' },
  { left: 'left-1/3', top: 'bottom-28', colorClass: 'bg-cyan-300', shadow: 'shadow-[0_0_14px_#67e8f9]' },
];

const Particle = ({ left, top, colorClass, shadow }) => (
  <div className={`absolute ${left} ${top} w-1 h-1 ${colorClass} rounded-full ${shadow}`}></div>
);

export default function App() {
  const backgroundStyle = useMemo(() => ({
    backgroundImage: `url(${bottomHud})`,
  }), []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0025] to-[#130045] text-white relative overflow-hidden">
      {/* Top neon halo and linework */}
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-56">
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(closest-side,#7c3aed_20%,transparent_60%)] blur-2xl opacity-60"></div>
        <div className="absolute inset-x-0 top-10 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"></div>
        <div className="absolute left-8 top-14 h-1 w-44 bg-cyan-400/60 rounded-full shadow-[0_0_18px_#22d3ee]"></div>
        <div className="absolute right-8 top-14 h-1 w-44 bg-cyan-400/60 rounded-full shadow-[0_0_18px_#22d3ee]"></div>
        <div className="absolute left-24 top-20 h-[2px] w-64 bg-cyan-300/70"></div>
        <div className="absolute left-24 top-20 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]"></div>
        <div className="absolute right-24 top-24 h-[2px] w-64 bg-cyan-300/70"></div>
        <div className="absolute right-24 top-24 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]"></div>
        <div className="absolute left-56 top-24 h-[2px] w-40 bg-cyan-300/40 rotate-12 origin-left"></div>
        <div className="absolute right-56 top-28 h-[2px] w-40 bg-cyan-300/40 -rotate-12 origin-right"></div>
      </div>
      <Spin />
      {/* Bottom image from assets */}
      <div
        className="pointer-events-none absolute bottom-0 inset-x-0 h-64 bg-no-repeat bg-center bg-cover"
        style={backgroundStyle}
        aria-hidden="true"
      ></div>
      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {PARTICLES.map((particle, idx) => (
          <Particle key={idx} {...particle} />
        ))}
      </div>
    </div>
  );
}
