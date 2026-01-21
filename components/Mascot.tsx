
import React, { useMemo } from 'react';
import { Polarity, MascotState } from '../types.ts';

interface MascotProps {
  polarity: Polarity;
  state: MascotState;
  isJumping?: boolean;
  size?: number;
  onClick?: () => void;
  customColor?: { main: string, shadow: string, accent: string };
}

export const Mascot: React.FC<MascotProps> = ({ 
  polarity, 
  state, 
  isJumping,
  size = 200,
  onClick,
  customColor
}) => {

  const colors = useMemo(() => {
    if (customColor && state === MascotState.IDLE) {
      return customColor;
    }
    switch (polarity) {
      case Polarity.POSITIVE: 
        return { main: '#4ade80', shadow: '#22c55e', accent: '#dcfce7' };
      case Polarity.NEGATIVE: 
        return { main: '#fb923c', shadow: '#ea580c', accent: '#ffedd5' };
      case Polarity.GREY: 
        return { main: '#9ca3af', shadow: '#4b5563', accent: '#f3f4f6' };
      default: 
        return { main: '#4ade80', shadow: '#22c55e', accent: '#dcfce7' };
    }
  }, [polarity, customColor, state]);

  const getPupilPosition = (isLeftEye: boolean) => {
    switch (state) {
      case MascotState.CONFUSED:
        return isLeftEye ? { cx: 0, cy: -3 } : { cx: 0, cy: 3 }; 
      case MascotState.THINKING:
        return { cx: 3, cy: -3 };
      case MascotState.HAPPY:
      case MascotState.IDLE:
      default:
        return { cx: 2, cy: 0 };
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`relative flex items-center justify-center transition-all duration-1000 ease-in-out
        ${onClick ? 'cursor-pointer hover:scale-110 active:scale-90' : ''}
        ${isJumping ? 'animate-happy-jump' : ''}
        ${state === MascotState.IDLE && !isJumping ? 'animate-float' : ''}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl overflow-visible">
        <defs>
          <linearGradient id={`bodyGradient-${colors.main}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="10%" stopColor={colors.accent} />
            <stop offset="40%" stopColor={colors.main} />
            <stop offset="100%" stopColor={colors.shadow} />
          </linearGradient>
        </defs>

        <path
          d="M140,130 C170,130 185,110 175,90 C165,70 140,80 145,100"
          fill="none"
          stroke={`url(#bodyGradient-${colors.main})`}
          strokeWidth="18"
          strokeLinecap="round"
          className="transition-all duration-[2000ms] ease-in-out"
        />

        <path
          d="M60,140 C40,140 30,110 40,90 C50,60 90,50 120,60 C150,70 160,110 140,140 Z"
          fill={`url(#bodyGradient-${colors.main})`}
          className="transition-all duration-[2000ms] ease-in-out"
        />
        
        <ellipse cx="60" cy="140" rx="10" ry="8" fill={colors.shadow} className="transition-all duration-[2000ms] ease-in-out" />
        <ellipse cx="120" cy="140" rx="10" ry="8" fill={colors.shadow} className="transition-all duration-[2000ms] ease-in-out" />

        <g transform="translate(60, 80)">
           <circle r="16" fill="white" stroke={colors.shadow} strokeWidth="2" className="transition-all duration-[2000ms] ease-in-out" />
           <circle 
             cx={getPupilPosition(true).cx} 
             cy={getPupilPosition(true).cy} 
             r="5" fill="#111" 
             className="transition-all duration-300"
           />
           <path d="M-16,0 A16,16 0 0,1 16,0" fill={`url(#bodyGradient-${colors.main})`} opacity="0.8" transform="rotate(-20)" className="transition-all duration-[2000ms] ease-in-out" />
        </g>

        <g transform="translate(95, 80)">
           <circle r="16" fill="white" stroke={colors.shadow} strokeWidth="2" className="transition-all duration-[2000ms] ease-in-out" />
           <circle 
             cx={getPupilPosition(false).cx} 
             cy={getPupilPosition(false).cy} 
             r="5" fill="#111" 
             className="transition-all duration-300"
           />
           <path d="M-16,0 A16,16 0 0,1 16,0" fill={`url(#bodyGradient-${colors.main})`} opacity="0.8" transform="rotate(20)" className="transition-all duration-[2000ms] ease-in-out" />
        </g>

        <g transform="translate(50, 110)">
           {state === MascotState.HAPPY && (
             <>
               <path d="M10,0 Q25,15 40,0" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" />
               <path d="M25,5 Q25,20 15,20" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
             </>
           )}
           {state === MascotState.CONFUSED && (
             <path d="M15,5 Q25,0 35,5" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" />
           )}
           {state === MascotState.IDLE && (
             <path d="M15,0 L35,0" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" />
           )}
        </g>

        <g transform="translate(130, 90) rotate(15)">
          <text 
            fontSize="50" 
            fontWeight="900" 
            fill="white" 
            stroke={colors.shadow}
            strokeWidth="2"
            className="transition-all duration-[2000ms] ease-in-out"
            style={{ filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.2))' }}
          >
            ?
          </text>
        </g>
      </svg>

      {state === MascotState.THINKING && (
        <div className="absolute -top-2 -right-2 bg-white px-4 py-2 rounded-full border-2 border-gray-200 shadow-lg animate-pulse z-10">
          <span className="text-2xl">🤔</span>
        </div>
      )}
    </div>
  );
};
