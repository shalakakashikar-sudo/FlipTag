
import React from 'react';
import { LearnUnit, Polarity, MascotState, InfographicStep } from '../types.ts';
import { Mascot } from './Mascot.tsx';

interface InfographicProps {
  unit: LearnUnit;
  currentMascotPolarity: Polarity;
  currentMascotState: MascotState;
  isJumping: boolean;
  onMascotClick: () => void;
  idleColor: { main: string, shadow: string, accent: string };
}

export const Infographic: React.FC<InfographicProps> = ({
  unit,
  currentMascotPolarity,
  currentMascotState,
  isJumping,
  onMascotClick,
  idleColor
}) => {
  const steps = unit.infographicData.steps;

  return (
    <div className="bg-gray-900/50 p-6 md:p-10 rounded-[3rem] border-2 border-gray-800 space-y-12 shadow-2xl animate-fadeIn">
      {/* Title & Mascot Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 border-b border-gray-800 pb-10">
        <div className="flex-grow space-y-4 text-center md:text-left">
           <h4 className="text-3xl font-black text-white tracking-tighter">
             {unit.infographicData.title || "The Grammar Logic"}
           </h4>
           <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 max-w-lg shadow-inner">
            <p className="text-green-400 font-black text-2xl leading-tight">💡 {unit.infographicData.ruleSummary}</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 shrink-0">
          <div className="relative w-full aspect-square max-w-[180px] flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-dashed border-gray-700 animate-[spin_25s_linear_infinite]" />
            <Mascot 
              polarity={currentMascotPolarity} 
              state={currentMascotState} 
              isJumping={isJumping}
              onClick={onMascotClick}
              customColor={idleColor}
              size={150}
            />
          </div>
          <p className="text-base font-black text-green-500 uppercase tracking-widest bg-green-500/10 px-6 py-2 rounded-full">Tutor Mode</p>
        </div>
      </div>

      {/* Logic Steps Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step: InfographicStep, idx: number) => (
          <div key={idx} className="relative group">
            <div className="h-full bg-gray-800/40 rounded-[2.5rem] p-8 border-2 border-transparent hover:border-white/10 transition-all flex flex-col items-center text-center gap-4 shadow-xl">
               {step.icon && <span className="text-4xl filter drop-shadow-md mb-2">{step.icon}</span>}
               <div className="space-y-1">
                 <p className="text-xs font-black text-gray-500 uppercase tracking-widest">When you see</p>
                 <p className="text-xl font-black text-white px-4 py-2 bg-gray-900 rounded-xl border border-gray-700">
                   {step.trigger}
                 </p>
               </div>
               <div className="w-1 h-6 bg-gray-700 rounded-full my-1" />
               <div className="space-y-1">
                 <p className="text-xs font-black text-gray-500 uppercase tracking-widest">{step.summon ? "Summon" : "Result"}</p>
                 <p className="text-2xl font-black rounded-2xl px-6 py-3 shadow-lg transform group-hover:scale-105 transition-transform" style={{ backgroundColor: step.color, color: 'white' }}>
                   {step.summon || step.action}
                 </p>
               </div>
            </div>
            {idx < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 z-10 text-gray-700">
                <i className="fas fa-chevron-right text-2xl"></i>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pro Tips & Pitfalls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-red-500/5 border-2 border-red-500/20 rounded-[2.5rem] p-8 md:p-10 space-y-6">
          <h4 className="text-red-400 text-2xl font-black flex items-center gap-3">
            <i className="fas fa-exclamation-triangle"></i> Common Pitfalls
          </h4>
          <div className="space-y-6">
            {unit.commonMistakes.map((m, idx) => (
              <div key={idx} className="space-y-3 border-b border-red-500/10 pb-6 last:border-0 last:pb-0">
                <p className="text-base font-bold text-red-500 line-through bg-red-500/10 px-4 py-2 rounded-xl inline-block">WRONG: "{m.bad}"</p>
                <p className="text-xl font-black text-green-500">RIGHT: "{m.good}"</p>
                <p className="text-base text-gray-200 font-medium italic leading-relaxed">Note: {m.reason}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-500/5 border-2 border-blue-500/20 rounded-[2.5rem] p-8 md:p-10 space-y-6">
          <h4 className="text-blue-400 text-2xl font-black flex items-center gap-3">
            <i className="fas fa-star"></i> Pro Tips
          </h4>
          <ul className="space-y-6">
            {unit.proTips.map((tip, idx) => (
              <li key={idx} className="flex gap-4 text-lg font-medium text-gray-100">
                <span className="text-blue-500 text-2xl font-black mt-1">•</span>
                <div className="flex flex-col space-y-1">
                  {tip.title && <span className="font-black text-blue-400 text-base uppercase tracking-widest">{tip.title}</span>}
                  <span className="leading-relaxed">{tip.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
