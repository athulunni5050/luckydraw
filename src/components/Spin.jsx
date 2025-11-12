import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import spinBtnImg from "../assets/spinbutton.png";

// Configuration constants
const SPIN_CONFIG = {
  REEL_COUNT: 6,
  MIN_NUMBER: 1,
  MAX_NUMBER: 9,
  STAGGER_DELAY_MS: 150,
  BASE_DURATION_MS: 2600,
  DURATION_INCREMENT_MS: 300,
  TICK_INTERVAL_MS: 70,
};

const INITIAL_NUMBERS = Array.from({ length: SPIN_CONFIG.REEL_COUNT }, (_, i) => i + 1);

export default function Spin() {
  const [numbers, setNumbers] = useState(INITIAL_NUMBERS);
  const [spinning, setSpinning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const intervalsRef = useRef([]);
  const timeoutsRef = useRef([]);


  const cleanup = useCallback(() => {
    intervalsRef.current.forEach((id) => clearInterval(id));
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    intervalsRef.current = [];
    timeoutsRef.current = [];
  }, []);

 
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const handleSpin = useCallback(() => {
    if (spinning) return;
    
    setShowResult(false);
    setSpinning(true);
    cleanup();

    let finishedCount = 0;
    const totalReels = SPIN_CONFIG.REEL_COUNT;

    const onReelFinish = () => {
      finishedCount += 1;
      if (finishedCount === totalReels) {
        setSpinning(false);
        setShowResult(true);
      }
    };

    for (let i = 0; i < totalReels; i++) {
      const startDelayMs = i * SPIN_CONFIG.STAGGER_DELAY_MS;
      const totalDurationMs = SPIN_CONFIG.BASE_DURATION_MS + i * SPIN_CONFIG.DURATION_INCREMENT_MS;

      const startTimeout = setTimeout(() => {
        // Start cycling numbers
        const intervalId = setInterval(() => {
          setNumbers((prev) => {
            const next = [...prev];
            next[i] = ((next[i] % SPIN_CONFIG.MAX_NUMBER) + SPIN_CONFIG.MIN_NUMBER);
            return next;
          });
        }, SPIN_CONFIG.TICK_INTERVAL_MS);
        
        intervalsRef.current.push(intervalId);

        // Stop cycling and set final value
        const stopTimeout = setTimeout(() => {
          clearInterval(intervalId);
          setNumbers((prev) => {
            const next = [...prev];
            next[i] = Math.floor(Math.random() * SPIN_CONFIG.MAX_NUMBER) + SPIN_CONFIG.MIN_NUMBER;
            return next;
          });
          onReelFinish();
        }, totalDurationMs);
        
        timeoutsRef.current.push(stopTimeout);
      }, startDelayMs);

      timeoutsRef.current.push(startTimeout);
    }
  }, [spinning, cleanup]);

  // Platform rings - using static classes for better Tailwind optimization
  const PlatformRing = useCallback(({ width, bottom, height, colorClass, shadowClass = '' }) => (
    <div className={`absolute left-1/2 -translate-x-1/2 ${bottom} ${width} ${height} rounded-full bg-gradient-to-r from-transparent ${colorClass} to-transparent ${shadowClass}`}></div>
  ), []);

 
  const NumberTile = useCallback(({ num, index, isSpinning }) => (
    <div className="flex flex-col items-center">
      <motion.div
        animate={isSpinning ? { rotateX: 360 } : { rotateX: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-20 h-32 md:w-24 md:h-36 rounded-xl flex items-center justify-center text-5xl font-extrabold border-[3px] border-purple-400 shadow-[0_0_30px_#a855f7,0_0_50px_#9333ea,0_0_20px_#a855f7_inset] overflow-hidden bg-gradient-to-b from-[#1a0a3a]/60 via-[#1f0a44]/50 to-[#1a0a3a]/65 backdrop-blur-[1px]"
      >
      
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-purple-800/25 to-purple-900/35"></div>
      
        <div className="absolute inset-0 opacity-50">
          <div className="absolute left-2 top-3 w-0.5 h-0.5 bg-white rounded-full"></div>
          <div className="absolute right-3 top-8 w-0.5 h-0.5 bg-white rounded-full"></div>
          <div className="absolute left-4 bottom-6 w-0.5 h-0.5 bg-white rounded-full"></div>
          <div className="absolute right-2 bottom-10 w-0.5 h-0.5 bg-white rounded-full"></div>
          <div className="absolute left-1/2 top-1/3 w-0.5 h-0.5 bg-white rounded-full"></div>
          <div className="absolute left-3 top-12 w-0.5 h-0.5 bg-white rounded-full"></div>
          <div className="absolute right-4 bottom-8 w-0.5 h-0.5 bg-white rounded-full"></div>
        </div>
      
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent"></div>
      
        <div className="absolute inset-x-4 -bottom-8 top-1/4 bg-gradient-to-t from-cyan-400/40 via-cyan-300/20 to-transparent blur-lg"></div>
        <div className="absolute inset-x-6 -bottom-6 top-1/3 bg-gradient-to-t from-purple-400/30 via-fuchsia-300/15 to-transparent blur-md"></div>
      
        <span className="relative z-10 neon-digit-metallic">{num}</span>
      </motion.div>
    
      <div className="relative mt-3 w-24 h-8 md:w-28 md:h-9">
     
        <div className="absolute inset-x-0.5 top-0 h-2.5 rounded-full bg-gradient-to-b from-cyan-300/80 via-cyan-400/60 to-purple-600/40 border border-cyan-300/50 shadow-[0_0_15px_#67e8f9_inset,0_0_20px_#22d3ee]"></div>
      
        <div className="absolute inset-x-1 top-1 h-2 rounded-full bg-gradient-to-b from-purple-400/70 via-fuchsia-500/50 to-purple-700/40 border border-purple-300/40 shadow-[0_0_12px_#a78bfa_inset]"></div>
     
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#2a0a5b] via-[#1a0538] to-[#170338] border border-purple-400/50 shadow-[0_0_20px_#7c3aed_inset,0_0_30px_#6d28d9]"></div>
      
        <div className="absolute inset-x-4 top-0 h-1 rounded-full bg-cyan-300/70 blur-[1px]"></div>
       
        <div className="absolute inset-x-3 -bottom-3 h-5 bg-[radial-gradient(closest-side,#22d3ee_30%,#a855f7_20%,transparent_70%)] blur-lg opacity-80"></div>
      </div>
    </div>
  ), []);

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-8">
        <h2 className="text-5xl md:text-6xl font-extrabold text-cyan-400 tracking-wider drop-shadow-[0_0_25px_#00e5ff]">
          CONGRATULATIONS
        </h2>
        {showResult && (
          <p className="mt-2 text-2xl md:text-3xl font-black drop-shadow-[0_0_12px_#ef4444] animate-[prizeFlash_1.2s_steps(2)_infinite]">
            1st prize
          </p>
        )}
      </div>

      <div className="relative flex gap-6 mb-24">
        {/* Circular platform base - enhanced */}
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-20 w-[980px] h-[200px]">
          {/* Radial purple glow beneath platform */}
          <div className="absolute inset-x-0 bottom-8 h-32 bg-[radial-gradient(ellipse_at_center,#6d28d9_35%,#9333ea_20%,transparent_75%)] blur-3xl opacity-90"></div>
          {/* Main deck */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-[92%] h-24 rounded-full bg-gradient-to-t from-[#1f0a44]/95 via-[#2d0a5a]/80 to-[#3b0b6f]/30 border-t border-purple-300/40 shadow-[0_-20px_90px_0_#6d28d9,0_-10px_40px_0_#9333ea]"></div>
          {/* Prominent concentric rings - outer to inner */}
          <PlatformRing width="w-[88%]" bottom="bottom-14" height="h-[4px]" colorClass="via-purple-400/80" shadowClass="shadow-[0_0_20px_#a855f7]" />
          <PlatformRing width="w-[84%]" bottom="bottom-12" height="h-[3px]" colorClass="via-cyan-300/70" shadowClass="shadow-[0_0_18px_#22d3ee]" />
          <PlatformRing width="w-[78%]" bottom="bottom-10" height="h-[3px]" colorClass="via-fuchsia-400/70" shadowClass="shadow-[0_0_16px_#e879f9]" />
          <PlatformRing width="w-[72%]" bottom="bottom-8" height="h-[2px]" colorClass="via-purple-300/60" />
          <PlatformRing width="w-[66%]" bottom="bottom-6" height="h-[2px]" colorClass="via-cyan-200/50" />
          <PlatformRing width="w-[60%]" bottom="bottom-4" height="h-[2px]" colorClass="via-fuchsia-300/50" />
          {/* Tick marks on outer ring */}
          <div className="absolute left-1/2 -translate-x-1/2 w-[90%] h-[3px] rounded-full overflow-hidden" style={{ bottom: '3.375rem' }}>
            <div className="w-full h-full bg-[repeating-linear-gradient(90deg,transparent_0_22px,rgba(255,255,255,0.7)_22px_24px,transparent_24px_46px)] opacity-80"></div>
          </div>
          {/* Additional inner tick marks */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-[88%] h-[2px] rounded-full overflow-hidden">
            <div className="w-full h-full bg-[repeating-linear-gradient(90deg,transparent_0_24px,rgba(168,85,247,0.7)_24px_26px,transparent_26px_50px)] opacity-75"></div>
          </div>
          {/* Right side flare */}
          <div className="absolute right-4 bottom-10 w-28 h-28 rounded-full bg-[radial-gradient(circle_at_center,#a78bfa_25%,#e879f9_15%,transparent_65%)] blur-xl opacity-80"></div>
        </div>
        
        {/* Capsule base */}
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-10 w-[920px] h-[88px] rounded-[44px] bg-gradient-to-b from-[#2b0a61] to-[#1b0640] shadow-[0_18px_60px_#3b0764_inset,0_0_60px_#6d28d9]">
          <div className="absolute left-12 right-12 top-1/2 -translate-y-1/2 h-[10px] rounded-full bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent shadow-[0_0_12px_#22d3ee]"></div>
          <div className="absolute left-12 right-12 bottom-4 h-[2px] bg-[repeating-linear-gradient(90deg,transparent_0_40px,rgba(255,255,255,0.25)_40px_42px,transparent_42px_80px)] opacity-40"></div>
        </div>
        
        {numbers.map((num, i) => (
          <NumberTile key={i} num={num} index={i} isSpinning={spinning} />
        ))}
      </div>

      {/* Spin button image - anchored above bottom HUD */}
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-8 w-[360px] h-[100px] z-50">
        <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(closest-side,#7e22ce_25%,transparent_70%)] blur-xl opacity-70"></div>
        <button
          onClick={handleSpin}
          onPointerDown={(e) => e.preventDefault()}
          disabled={spinning}
          className="pointer-events-auto absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
          aria-label="Spin the lucky draw"
        >
          <img src={spinBtnImg} alt="Spin" className={`h-[82px] w-auto select-none ${spinning ? "opacity-60 cursor-not-allowed" : ""}`} draggable="false" />
        </button>
      </div>

      {/* Subtle particles */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-16 top-32 w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_14px_#67e8f9]"></div>
        <div className="absolute right-24 top-24 w-1 h-1 bg-fuchsia-300 rounded-full shadow-[0_0_14px_#f0abfc]"></div>
        <div className="absolute right-40 bottom-40 w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_14px_#67e8f9]"></div>
      </div>
    </div>
  );
}
