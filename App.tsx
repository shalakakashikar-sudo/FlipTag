
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Layout } from './components/Layout.tsx';
import { Mascot } from './components/Mascot.tsx';
import { Quiz } from './components/Quiz.tsx';
import { Infographic } from './components/Infographic.tsx';
import { View, Polarity, MascotState, LearnUnit } from './types.ts';
import { LEARN_UNITS } from './data/content.ts';
import { flipDialogues } from './data/dialogues.ts';

const IDLE_COLORS = [
  { main: '#4ade80', shadow: '#22c55e', accent: '#dcfce7' },
  { main: '#38bdf8', shadow: '#0284c7', accent: '#e0f2fe' },
  { main: '#a78bfa', shadow: '#7c3aed', accent: '#f5f3ff' },
  { main: '#fb7185', shadow: '#e11d48', accent: '#fff1f2' },
  { main: '#fbbf24', shadow: '#d97706', accent: '#fffbeb' },
];

export const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const [currentMascotPolarity, setCurrentMascotPolarity] = useState<Polarity>(Polarity.POSITIVE);
  const [currentMascotState, setCurrentMascotState] = useState<MascotState>(MascotState.IDLE);
  const [mascotDialogue, setMascotDialogue] = useState<string>("");
  const [isJumping, setIsJumping] = useState(false);
  const [idleColorIdx, setIdleColorIdx] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const randomIdx = Math.floor(Math.random() * flipDialogues.idle.length);
    setMascotDialogue(flipDialogues.idle[randomIdx]);
  }, [view]);

  useEffect(() => {
    if (currentMascotState === MascotState.IDLE) {
      const interval = setInterval(() => {
        setIdleColorIdx(prev => (prev + 1) % IDLE_COLORS.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentMascotState]);

  const triggerFlip = useCallback((targetPolarity: Polarity, success: boolean) => {
    if (success) {
      setIsJumping(true);
      setCurrentMascotState(MascotState.HAPPY);
      setCurrentMascotPolarity(targetPolarity);
      setTimeout(() => {
        setIsJumping(false);
        setCurrentMascotState(MascotState.IDLE);
      }, 800);
    } else {
      setCurrentMascotState(MascotState.CONFUSED);
      setCurrentMascotPolarity(Polarity.GREY);
      setTimeout(() => setCurrentMascotState(MascotState.IDLE), 1500);
    }
  }, []);

  const handleMascotClick = () => {
    if (isJumping) return;
    const randomIdx = Math.floor(Math.random() * flipDialogues.poked.length);
    setMascotDialogue(flipDialogues.poked[randomIdx]);
    const nextPolarity = currentMascotPolarity === Polarity.POSITIVE ? Polarity.NEGATIVE : Polarity.POSITIVE;
    triggerFlip(nextPolarity, true);
  };

  const navigateTo = (newView: View) => {
    setView(newView);
    setCurrentMascotState(MascotState.IDLE);
    setCurrentMascotPolarity(Polarity.POSITIVE);
    scrollToTop();
  };

  const currentUnit = useMemo(() => LEARN_UNITS.find(u => u.id === selectedUnitId), [selectedUnitId]);
  
  const challengeQuestions = useMemo(() => {
    if (view === 'challenge') {
      return LEARN_UNITS.flatMap(u => u.practiceQuestions).sort(() => Math.random() - 0.5);
    }
    return [];
  }, [view]);

  const renderHome = () => (
    <div className="flex flex-col items-center text-center space-y-8 animate-fadeIn pt-10">
      <div className="relative group">
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 z-20 transition-all animate-float-bubble">
          <div className="bg-white text-gray-900 px-8 py-5 rounded-[2.5rem] shadow-2xl text-base font-bold border-2 border-green-500 relative after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-white">
            {mascotDialogue}
          </div>
        </div>
        <Mascot 
          polarity={currentMascotPolarity} 
          state={currentMascotState} 
          isJumping={isJumping}
          onClick={handleMascotClick}
          customColor={IDLE_COLORS[idleColorIdx]}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-7xl font-extrabold text-white soft-neon tracking-tighter">FlipTag</h2>
        <p className="text-2xl text-green-400 font-bold">Master Question Tags by Flipping Smartly</p>
      </div>

      <button 
        onClick={() => navigateTo('unit-selection')}
        className="group relative px-16 py-7 bg-green-500 hover:bg-green-400 text-white text-3xl font-black rounded-full shadow-[0_15px_50px_rgba(34,197,94,0.3)] transition-all transform hover:scale-105 active:scale-95 border-b-8 border-green-700"
      >
        <span className="relative z-10">Start Your Journey</span>
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
      </button>
    </div>
  );

  const renderUnitSelection = () => (
    <div className="space-y-10 animate-fadeIn max-w-2xl mx-auto">
      <div className="text-center space-y-3">
        <h2 className="text-5xl font-black text-white tracking-tight">Select a Topic</h2>
        <p className="text-xl text-gray-400 font-medium">Choose a level to start your journey</p>
      </div>
      
      <div className="flex flex-col gap-6">
        {LEARN_UNITS.map((unit, idx) => (
          <div 
            key={unit.id}
            onClick={() => {
              setSelectedUnitId(unit.id);
              setView('learn');
              scrollToTop();
            }}
            className="group relative flex items-center gap-8 p-10 bg-gray-800/40 border-2 border-gray-700 rounded-[3rem] cursor-pointer hover:border-green-500 hover:bg-gray-800/60 transition-all transform hover:-translate-y-2 shadow-xl"
          >
            <div className="w-20 h-20 rounded-3xl bg-gray-900 border border-gray-700 flex items-center justify-center text-4xl font-black text-green-500 shrink-0 group-hover:scale-110 transition-transform">
              {idx + 1}
            </div>
            <div className="flex-grow">
              <h3 className="text-3xl font-black text-white group-hover:text-green-400 mb-2">{unit.title}</h3>
              <p className="text-lg text-gray-300 leading-relaxed font-medium">{unit.concept}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-gray-500 group-hover:text-green-500 transition-colors">
              <i className="fas fa-chevron-right text-xl"></i>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-8 flex justify-center">
        <button 
          onClick={() => navigateTo('home')}
          className="text-gray-300 hover:text-white text-xl font-bold transition-all px-10 py-4 rounded-full hover:bg-white/10 border-2 border-transparent hover:border-white/20"
        >
          <i className="fas fa-arrow-left mr-3"></i> Back to Home
        </button>
      </div>
    </div>
  );

  const renderLearn = (unit: LearnUnit) => (
    <div className="space-y-12 animate-fadeIn pb-10">
      <div className="flex justify-between items-center">
        <button 
          onClick={() => navigateTo('unit-selection')} 
          className="text-gray-300 hover:text-white flex items-center gap-3 text-xl font-black transition-colors px-8 py-4 bg-gray-800/50 rounded-2xl hover:bg-gray-800 shadow-md"
        >
          <i className="fas fa-chevron-left"></i> Change Topic
        </button>
      </div>

      <div className="text-center space-y-4">
        <h2 className="text-6xl font-black text-white tracking-tight">{unit.title}</h2>
        {unit.subtitle && (
          <p className="text-2xl text-green-400 font-black uppercase tracking-[0.2em]">{unit.subtitle}</p>
        )}
        <div className="bg-gray-800/80 border-2 border-green-500/20 p-10 rounded-[3rem] shadow-2xl mt-6">
          <p className="text-2xl text-green-50 text-center leading-relaxed font-bold">{unit.concept}</p>
        </div>
      </div>

      <Infographic 
        unit={unit}
        currentMascotPolarity={currentMascotPolarity}
        currentMascotState={currentMascotState}
        isJumping={isJumping}
        onMascotClick={handleMascotClick}
        idleColor={IDLE_COLORS[idleColorIdx]}
      />

      <div className="space-y-10">
        <h3 className="text-4xl font-black flex items-center gap-5 text-white px-4">
          <span className="w-16 h-16 bg-green-500/20 rounded-[1.5rem] flex items-center justify-center text-green-500 text-3xl">
            <i className="fas fa-eye"></i>
          </span>
          Watch the Logic Flip
        </h3>
        <div className="grid gap-8">
          {unit.examples.map((ex, idx) => (
            <div 
              key={idx}
              onMouseEnter={() => {
                setCurrentMascotPolarity(ex.polarity);
                setCurrentMascotState(ex.isCorrect ? MascotState.HAPPY : MascotState.CONFUSED);
              }}
              onMouseLeave={() => {
                setCurrentMascotState(MascotState.IDLE);
              }}
              className={`group p-10 rounded-[3rem] border-2 transition-all cursor-default ${ex.isCorrect ? 'border-green-500/20 bg-green-500/5 hover:border-green-500/50 shadow-2xl' : 'border-gray-700 bg-gray-800/40 opacity-80'}`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                <div className="flex-grow space-y-4">
                  <div className="flex items-center gap-4">
                    <span className={`px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest ${ex.isCorrect ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-200'}`}>
                      {ex.verbType || (ex.isCorrect ? 'Correct Flip' : 'Logic Fail')}
                    </span>
                  </div>
                  <p className="text-5xl text-white font-black leading-tight">
                    {ex.sentence}, <span className={ex.isCorrect ? 'text-orange-400' : 'text-gray-500'}>{ex.tag}</span>
                  </p>
                </div>
                <div className="text-lg text-gray-200 bg-gray-950 p-10 rounded-[2.5rem] md:max-w-sm border border-gray-800 italic font-bold leading-relaxed shadow-inner">
                  {ex.explanation}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-16">
        <button 
          onClick={() => setView('practice')}
          className="px-20 py-10 bg-orange-500 hover:bg-orange-400 text-white text-4xl font-black rounded-full shadow-2xl transition-all transform hover:scale-105 active:scale-95 border-b-[12px] border-orange-700"
        >
          Let's Practice!
        </button>
      </div>
    </div>
  );

  return (
    <Layout currentView={view} onNavigate={navigateTo}>
      {view === 'home' && renderHome()}
      {view === 'unit-selection' && renderUnitSelection()}
      {view === 'learn' && currentUnit && renderLearn(currentUnit)}
      {(view === 'practice' || view === 'challenge') && currentUnit && (
        <Quiz 
          questions={view === 'practice' ? currentUnit.practiceQuestions : challengeQuestions} 
          isFinal={view === 'challenge'}
          triggerFlip={triggerFlip}
          mascotDialogue={mascotDialogue}
          setMascotDialogue={setMascotDialogue}
          currentMascotPolarity={currentMascotPolarity}
          currentMascotState={currentMascotState}
          isJumping={isJumping}
          onNavigate={navigateTo}
          onMascotClick={handleMascotClick}
          scrollToTop={scrollToTop}
          onBack={() => view === 'practice' ? setView('learn') : navigateTo('home')}
        />
      )}
    </Layout>
  );
};
