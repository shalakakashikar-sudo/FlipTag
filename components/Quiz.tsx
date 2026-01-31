
import React, { useState, useMemo } from 'react';
import { Mascot } from './Mascot.tsx';
import { Question, QuestionOption, Polarity, MascotState, View } from '../types.ts';
import { flipDialogues } from '../data/dialogues.ts';
import { LEARN_UNITS } from '../data/content.ts';

interface UserAnswer {
  question: Question;
  selectedText: string;
  isCorrect: boolean;
  feedbackText: string;
}

interface QuizProps {
  title: string;
  questions: Question[];
  isFinal?: boolean;
  triggerFlip: (targetPolarity: Polarity, success: boolean) => void;
  mascotDialogue: string;
  setMascotDialogue: (d: string) => void;
  currentMascotPolarity: Polarity;
  currentMascotState: MascotState;
  isJumping: boolean;
  onNavigate: (view: View) => void;
  onMascotClick?: () => void;
  scrollToTop?: () => void;
  onBack?: () => void;
}

const COUNT_OPTIONS = [5, 10, 20, 30, 40, 50];

export const Quiz: React.FC<QuizProps> = ({
  title,
  questions,
  isFinal = false,
  triggerFlip,
  mascotDialogue,
  setMascotDialogue,
  currentMascotPolarity,
  currentMascotState,
  isJumping,
  onNavigate,
  onMascotClick,
  scrollToTop,
  onBack
}) => {
  const [phase, setPhase] = useState<'selection' | 'active' | 'finished'>('selection');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [viewingIdx, setViewingIdx] = useState(0); // For navigating history
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrectCurrent, setIsCorrectCurrent] = useState<boolean | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [activePool, setActivePool] = useState<Question[]>([]);
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>(LEARN_UNITS.map(u => u.id));

  const handleStart = (count: number) => {
    let pool = [...questions];
    
    // Filter by topics if it's the final challenge
    if (isFinal) {
      pool = LEARN_UNITS
        .filter(u => selectedTopicIds.includes(u.id))
        .flatMap(u => u.practiceQuestions);
    }

    const shuffled = pool.sort(() => Math.random() - 0.5);
    setActivePool(shuffled.slice(0, Math.min(count, pool.length)));
    setPhase('active');
    setCurrentQuestionIdx(0);
    setViewingIdx(0);
    setScore(0);
    setUserAnswers([]);
    if (scrollToTop) scrollToTop();
  };

  const toggleTopic = (id: string) => {
    setSelectedTopicIds(prev => 
      prev.includes(id) 
        ? (prev.length > 1 ? prev.filter(tid => tid !== id) : prev) 
        : [...prev, id]
    );
  };

  // The question currently being viewed (might be a past one)
  const q = activePool[viewingIdx];
  const isViewingHistory = viewingIdx < currentQuestionIdx;
  const historyAnswer = isViewingHistory ? userAnswers[viewingIdx] : null;

  const handleAnswer = (option: QuestionOption) => {
    if (feedback || isViewingHistory) return;

    const success = option.text === q.correctAnswer;
    setIsCorrectCurrent(success);
    
    let feedbackText = q.explanation;
    
    if (!success) {
      if (option.polarity === q.sentencePolarity) {
        const randomIdx = Math.floor(Math.random() * flipDialogues.wrong_no_flip.length);
        setMascotDialogue(flipDialogues.wrong_no_flip[randomIdx]);
        feedbackText = "You matched the polarity! Remember, the tag must be the OPPOSITE of the sentence.";
      } else {
        const randomIdx = Math.floor(Math.random() * flipDialogues.wrong_auxiliary.length);
        setMascotDialogue(flipDialogues.wrong_auxiliary[randomIdx]);
        feedbackText = "Good flip, but the helping verb is wrong. Check the auxiliary!";
      }
      triggerFlip(Polarity.GREY, false);
    } else {
      setScore(s => s + 1);
      const randomIdx = Math.floor(Math.random() * flipDialogues.correct_flip.length);
      setMascotDialogue(flipDialogues.correct_flip[randomIdx]);
      triggerFlip(q.tagPolarity, true);
    }
    
    setFeedback(feedbackText);

    // Store for review
    setUserAnswers(prev => [...prev, {
      question: q,
      selectedText: option.text,
      isCorrect: success,
      feedbackText: feedbackText
    }]);
  };

  const nextQuestion = () => {
    if (viewingIdx < currentQuestionIdx) {
      setViewingIdx(v => v + 1);
      if (scrollToTop) scrollToTop();
      return;
    }

    setFeedback(null);
    setIsCorrectCurrent(null);
    triggerFlip(Polarity.POSITIVE, true);
    
    if (scrollToTop) scrollToTop();

    if (currentQuestionIdx < activePool.length - 1) {
      setCurrentQuestionIdx(idx => idx + 1);
      setViewingIdx(idx => idx + 1);
    } else {
      setPhase('finished');
    }
  };

  const prevQuestion = () => {
    if (viewingIdx > 0) {
      setViewingIdx(v => v - 1);
      if (scrollToTop) scrollToTop();
    }
  };

  if (phase === 'selection') {
    return (
      <div className="flex flex-col items-center text-center space-y-12 animate-fadeIn py-12">
        <div className="space-y-4">
          <h2 className="text-5xl font-black text-white tracking-tighter">{title}</h2>
          <p className="text-2xl text-green-400 font-bold">Configure your session</p>
        </div>

        {isFinal && (
          <div className="w-full max-w-2xl bg-gray-800/50 p-8 rounded-[2.5rem] border border-gray-700 space-y-6">
            <h3 className="text-xl font-black text-gray-400 uppercase tracking-widest">Select Topics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {LEARN_UNITS.map(unit => (
                <div 
                  key={unit.id}
                  onClick={() => toggleTopic(unit.id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer border-2 transition-all ${selectedTopicIds.includes(unit.id) ? 'bg-green-500/10 border-green-500/50' : 'bg-gray-900 border-gray-800 opacity-50'}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedTopicIds.includes(unit.id) ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
                    {selectedTopicIds.includes(unit.id) && <i className="fas fa-check"></i>}
                  </div>
                  <span className="font-black text-white">{unit.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-6">
          <h3 className="text-xl font-black text-gray-400 uppercase tracking-widest">Number of Questions</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 w-full max-w-xl">
            {COUNT_OPTIONS.map(count => (
               <button
                 key={count}
                 onClick={() => handleStart(count)}
                 className="group p-4 rounded-2xl bg-gray-800 border-2 border-gray-700 hover:border-green-500 hover:bg-gray-750 transition-all transform active:scale-95 shadow-xl"
               >
                 <span className="block text-2xl font-black text-white group-hover:text-green-400">{count}</span>
               </button>
            ))}
          </div>
        </div>

        <button 
          onClick={onBack}
          className="text-gray-400 hover:text-white text-lg font-bold px-8 py-3 rounded-full hover:bg-white/5 transition-all"
        >
          <i className="fas fa-arrow-left mr-2"></i> Go Back
        </button>
      </div>
    );
  }

  if (phase === 'finished') {
    return (
      <div className="flex flex-col items-center text-center space-y-12 animate-fadeIn py-12 max-w-3xl mx-auto">
        <Mascot 
          polarity={score === activePool.length ? Polarity.POSITIVE : Polarity.GREY} 
          state={score === activePool.length ? MascotState.HAPPY : MascotState.CONFUSED} 
          onClick={onMascotClick}
          size={200}
          isJumping={isJumping}
        />

        <div className="space-y-4">
          <h2 className="text-5xl font-black text-white tracking-tighter">Great Job!</h2>
          <div className="inline-flex items-center gap-6 px-10 py-5 bg-gray-800 rounded-[2.5rem] border-2 border-gray-700 shadow-2xl">
             <div className="text-left">
                <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Score</p>
                <p className="text-5xl font-black text-green-400">{score} <span className="text-2xl text-gray-600">/ {activePool.length}</span></p>
             </div>
             <div className="w-px h-12 bg-gray-700" />
             <div className="text-left">
                <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Accuracy</p>
                <p className="text-4xl font-black text-white">{Math.round((score / activePool.length) * 100)}%</p>
             </div>
          </div>
        </div>

        <div className="w-full space-y-8 text-left bg-gray-900/50 p-10 rounded-[3rem] border border-gray-800">
           <h3 className="text-3xl font-black text-white">Review Results</h3>
           <div className="space-y-6">
             {userAnswers.map((ans, idx) => (
               <div key={idx} className={`p-6 rounded-[2rem] border-2 ${ans.isCorrect ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                 <p className="text-xl font-black text-white">
                   {idx + 1}. {ans.question.sentence}, <span className={ans.isCorrect ? 'text-green-400' : 'text-red-400'}>{ans.selectedText}</span>
                 </p>
                 <p className="text-gray-400 mt-2 font-medium italic">{ans.feedbackText}</p>
               </div>
             ))}
           </div>
        </div>

        <button 
          onClick={() => onNavigate('home')}
          className="px-12 py-6 bg-green-500 text-white rounded-3xl text-2xl font-black hover:bg-green-400 transition-all border-b-8 border-green-700"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn max-w-2xl mx-auto pb-20">
      <div className="flex justify-between items-center bg-gray-900/50 p-4 rounded-2xl border border-gray-800">
        <button 
          onClick={prevQuestion}
          disabled={viewingIdx === 0}
          className={`flex items-center gap-2 font-black transition-colors px-5 py-3 rounded-xl ${viewingIdx === 0 ? 'text-gray-700 cursor-not-allowed' : 'text-gray-300 hover:text-white bg-gray-800/50'}`}
        >
          <i className="fas fa-chevron-left"></i> Previous
        </button>
        <span className="text-sm font-black text-gray-500 uppercase tracking-widest">
          Question {viewingIdx + 1} of {activePool.length}
        </span>
        <div className="flex items-center gap-3">
           <span className="text-base font-black text-green-500">{score} pts</span>
        </div>
      </div>

      <div className="relative flex justify-center py-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-gray-900 px-8 py-5 rounded-[2.5rem] shadow-2xl w-80 text-base text-center font-bold border-2 border-green-500 z-10 animate-float-bubble">
          {isViewingHistory ? "Looking back at your flip!" : mascotDialogue}
        </div>
        <Mascot 
          polarity={currentMascotPolarity} 
          state={currentMascotState} 
          isJumping={isJumping} 
          onClick={onMascotClick}
        />
      </div>

      <div className="space-y-6">
        <div className="bg-gray-800/80 p-10 rounded-[3rem] border-2 border-gray-700 text-center shadow-2xl relative">
          {isViewingHistory && (
             <div className="absolute top-4 right-6 text-2xl">
               {historyAnswer?.isCorrect ? <span className="text-green-500">✅</span> : <span className="text-red-500">❌</span>}
             </div>
          )}
          <p className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">{q.sentence} <span className="text-green-500">...</span></p>
        </div>

        <div className="grid gap-4">
          {q.options.map((opt, idx) => {
            const isSelectedInHistory = isViewingHistory && historyAnswer?.selectedText === opt.text;
            const isCorrectInHistory = isViewingHistory && q.correctAnswer === opt.text;
            
            let btnClass = "bg-gray-800 border-gray-700 hover:border-green-500 hover:bg-gray-750 text-white";
            
            if (isViewingHistory) {
              if (isCorrectInHistory) btnClass = "bg-green-500 border-green-400 text-white opacity-100";
              else if (isSelectedInHistory) btnClass = "bg-red-500 border-red-400 text-white opacity-100";
              else btnClass = "bg-gray-900 border-gray-800 text-gray-500 opacity-40";
            } else if (feedback) {
              if (opt.text === q.correctAnswer) btnClass = "bg-green-500 border-green-400 text-white";
              else if (opt.text === userAnswers[userAnswers.length-1]?.selectedText) btnClass = "bg-red-500 border-red-400 text-white";
              else btnClass = "bg-gray-900 border-gray-800 text-gray-500 opacity-40";
            }

            return (
              <button
                key={idx}
                disabled={!!feedback || isViewingHistory}
                onClick={() => handleAnswer(opt)}
                className={`p-7 rounded-[1.75rem] text-2xl font-black transition-all transform active:scale-95 text-left border-2 ${btnClass}`}
              >
                <div className="flex items-center justify-between">
                   <span>{opt.text}</span>
                   {isCorrectInHistory && <i className="fas fa-check-circle text-white"></i>}
                   {isSelectedInHistory && !isCorrectInHistory && <i className="fas fa-times-circle text-white"></i>}
                </div>
              </button>
            );
          })}
        </div>

        {(feedback || isViewingHistory) && (
          <div className={`p-8 rounded-[2.5rem] border-2 shadow-2xl animate-fadeIn ${ (isViewingHistory ? historyAnswer?.isCorrect : isCorrectCurrent) ? 'bg-green-900/20 border-green-500/50' : 'bg-red-900/20 border-red-500/50'}`}>
            <div className="flex items-start gap-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${ (isViewingHistory ? historyAnswer?.isCorrect : isCorrectCurrent) ? 'bg-green-500' : 'bg-red-500'}`}>
                {(isViewingHistory ? historyAnswer?.isCorrect : isCorrectCurrent) ? '✨' : '⚠️'}
              </div>
              <div className="space-y-1">
                <p className="text-lg text-gray-100 font-bold leading-relaxed">
                  {isViewingHistory ? historyAnswer?.feedbackText : feedback}
                </p>
              </div>
            </div>
            <button 
              onClick={nextQuestion}
              className="w-full mt-8 py-6 bg-white text-gray-900 text-2xl font-black rounded-3xl hover:bg-gray-100 transition-all border-b-4 border-gray-300"
            >
              {viewingIdx < currentQuestionIdx ? "Go to Current" : (currentQuestionIdx === activePool.length - 1 ? "Finish Quiz" : "Next Question")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
