
import React, { useState, useMemo } from 'react';
import { Mascot } from './Mascot.tsx';
import { Question, QuestionOption, Polarity, MascotState, View } from '../types.ts';
import { flipDialogues } from '../data/dialogues.ts';

interface UserAnswer {
  question: Question;
  selectedText: string;
  isCorrect: boolean;
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
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrectCurrent, setIsCorrectCurrent] = useState<boolean | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [activePool, setActivePool] = useState<Question[]>([]);

  const handleStart = (count: number) => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setActivePool(shuffled.slice(0, Math.min(count, questions.length)));
    setPhase('active');
    setCurrentQuestionIdx(0);
    setScore(0);
    setUserAnswers([]);
    if (scrollToTop) scrollToTop();
  };

  const q = activePool[currentQuestionIdx];

  const handleAnswer = (option: QuestionOption) => {
    if (feedback) return;

    const success = option.text === q.correctAnswer;
    setIsCorrectCurrent(success);
    
    // Store for review
    setUserAnswers(prev => [...prev, {
      question: q,
      selectedText: option.text,
      isCorrect: success
    }]);
    
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
  };

  const nextQuestion = () => {
    setFeedback(null);
    setIsCorrectCurrent(null);
    triggerFlip(Polarity.POSITIVE, true);
    
    if (scrollToTop) scrollToTop();

    if (currentQuestionIdx < activePool.length - 1) {
      setCurrentQuestionIdx(idx => idx + 1);
    } else {
      setPhase('finished');
    }
  };

  if (phase === 'selection') {
    return (
      <div className="flex flex-col items-center text-center space-y-12 animate-fadeIn py-12">
        <div className="space-y-4">
          <h2 className="text-5xl font-black text-white tracking-tighter">{title}</h2>
          <p className="text-2xl text-green-400 font-bold">Choose your challenge level</p>
        </div>

        <Mascot 
          polarity={Polarity.POSITIVE} 
          state={MascotState.HAPPY} 
          onClick={onMascotClick}
          size={180}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-xl">
          {COUNT_OPTIONS.map(count => (
             <button
               key={count}
               disabled={count > questions.length && !isFinal}
               onClick={() => handleStart(count)}
               className={`group p-8 rounded-[2rem] bg-gray-800 border-2 border-gray-700 hover:border-green-500 hover:bg-gray-750 transition-all transform active:scale-95 shadow-xl ${count > questions.length ? 'opacity-30 cursor-not-allowed' : ''}`}
             >
               <span className="block text-4xl font-black text-white group-hover:text-green-400">{count}</span>
               <span className="block text-sm font-bold text-gray-500 uppercase tracking-widest mt-2">Questions</span>
             </button>
          ))}
        </div>

        <button 
          onClick={onBack}
          className="text-gray-400 hover:text-white text-lg font-bold px-8 py-3 rounded-full hover:bg-white/5 transition-all"
        >
          <i className="fas fa-arrow-left mr-2"></i> Nevermind, let's go back
        </button>
      </div>
    );
  }

  if (phase === 'finished') {
    return (
      <div className="flex flex-col items-center text-center space-y-12 animate-fadeIn py-12 max-w-3xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-green-500/10 blur-3xl rounded-full" />
          <Mascot 
            polarity={score === activePool.length ? Polarity.POSITIVE : Polarity.GREY} 
            state={score === activePool.length ? MascotState.HAPPY : MascotState.CONFUSED} 
            onClick={onMascotClick}
            size={200}
            isJumping={isJumping}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-5xl font-black text-white tracking-tighter">Results for {title}</h2>
          <div className="inline-flex items-center gap-6 px-10 py-5 bg-gray-800 rounded-[2.5rem] border-2 border-gray-700 shadow-2xl">
             <div className="text-left">
                <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Final Score</p>
                <p className="text-5xl font-black text-green-400">{score} <span className="text-2xl text-gray-600">/ {activePool.length}</span></p>
             </div>
             <div className="w-px h-12 bg-gray-700" />
             <div className="text-left">
                <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Accuracy</p>
                <p className="text-4xl font-black text-white">{Math.round((score / activePool.length) * 100)}%</p>
             </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="w-full space-y-8 text-left bg-gray-900/50 p-6 md:p-10 rounded-[3rem] border border-gray-800">
           <h3 className="text-3xl font-black text-white flex items-center gap-4">
             <i className="fas fa-list-check text-green-500"></i> Question Review
           </h3>
           <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
             {userAnswers.map((ans, idx) => (
               <div key={idx} className={`p-6 rounded-[2rem] border-2 flex flex-col gap-4 ${ans.isCorrect ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                 <div className="flex justify-between items-start gap-4">
                   <p className="text-xl font-black text-white">
                     {idx + 1}. {ans.question.sentence}, <span className={ans.isCorrect ? 'text-green-400' : 'text-red-400'}>{ans.selectedText}</span>
                   </p>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${ans.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                      <i className={`fas ${ans.isCorrect ? 'fa-check' : 'fa-xmark'}`}></i>
                   </div>
                 </div>
                 
                 {!ans.isCorrect && (
                   <div className="bg-gray-950/50 p-4 rounded-xl space-y-1">
                     <p className="text-sm font-bold text-gray-400 uppercase tracking-tight">Correct Answer:</p>
                     <p className="text-xl font-black text-green-400">{ans.question.correctAnswer}</p>
                   </div>
                 )}

                 <p className="text-base text-gray-300 italic font-medium">
                   {ans.question.explanation}
                 </p>
               </div>
             ))}
           </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button 
            onClick={() => setPhase('selection')}
            className="flex-grow px-10 py-5 bg-gray-800 text-white rounded-2xl text-xl font-black hover:bg-gray-700 transition-all border-b-4 border-gray-900 shadow-xl"
          >
            Retry Quiz
          </button>
          <button 
            onClick={() => onNavigate('home')}
            className="flex-grow px-10 py-5 bg-green-500 text-white rounded-2xl text-xl font-black hover:bg-green-400 transition-all border-b-4 border-green-700 shadow-xl"
          >
            Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn max-w-2xl mx-auto pb-20">
      <div className="flex justify-between items-center bg-gray-900/50 p-4 rounded-2xl border border-gray-800">
        <button 
          onClick={onBack}
          className="text-gray-300 hover:text-white flex items-center gap-2 font-black transition-colors px-5 py-3 bg-gray-800/50 rounded-xl"
        >
          <i className="fas fa-chevron-left"></i> Stop
        </button>
        <span className="text-sm font-black text-gray-500 uppercase tracking-widest">Question {currentQuestionIdx + 1} of {activePool.length}</span>
        <div className="flex items-center gap-3">
           <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 transition-all duration-500" style={{width: `${((currentQuestionIdx + 1) / activePool.length) * 100}%`}} />
           </div>
           <span className="text-base font-black text-green-500">{score} pts</span>
        </div>
      </div>

      <div className="relative flex justify-center py-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-gray-900 px-8 py-5 rounded-[2.5rem] shadow-2xl w-80 text-base text-center font-bold border-2 border-green-500 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-white z-10 animate-float-bubble">
          {mascotDialogue}
        </div>
        <Mascot 
          polarity={currentMascotPolarity} 
          state={currentMascotState} 
          isJumping={isJumping} 
          onClick={onMascotClick}
        />
      </div>

      <div className="space-y-6">
        <div className="bg-gray-800/80 p-10 rounded-[3rem] border-2 border-gray-700 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
          <p className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">{q.sentence} <span className="text-green-500">...</span></p>
          {q.context && (
            <span className="inline-block text-xs font-black text-gray-400 bg-gray-900 px-5 py-2 rounded-full border border-gray-800 tracking-wider uppercase">SCENARIO: {q.context}</span>
          )}
        </div>

        <div className="grid gap-4">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              disabled={!!feedback}
              onClick={() => handleAnswer(opt)}
              className={`group relative p-7 rounded-[1.75rem] text-2xl font-black transition-all transform active:scale-95 text-left border-2 ${
                feedback 
                  ? (opt.text === q.correctAnswer ? 'bg-green-500 border-green-400 text-white shadow-lg' : (opt.text === userAnswers[userAnswers.length - 1]?.selectedText ? 'bg-red-500 border-red-400 text-white' : 'bg-gray-800/40 border-gray-800 opacity-40')) 
                  : 'bg-gray-800 border-gray-700 hover:border-green-500 hover:bg-gray-750 text-white hover:shadow-xl'
              }`}
            >
              <div className="flex items-center justify-between">
                 <span>{opt.text}</span>
                 {!feedback && <i className="fas fa-arrow-right text-gray-700 group-hover:text-green-500 group-hover:translate-x-2 transition-all"></i>}
                 {feedback && opt.text === q.correctAnswer && <i className="fas fa-check-circle text-white animate-bounce text-3xl"></i>}
              </div>
            </button>
          ))}
        </div>

        {feedback && (
          <div className={`p-8 rounded-[2.5rem] border-2 shadow-2xl animate-fadeIn ${isCorrectCurrent ? 'bg-green-900/20 border-green-500/50' : 'bg-red-900/20 border-red-500/50'}`}>
            <div className="flex items-start gap-6">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shrink-0 ${isCorrectCurrent ? 'bg-green-500' : 'bg-red-500 shadow-lg shadow-red-500/20'}`}>
                {isCorrectCurrent ? '✨' : '⚠️'}
              </div>
              <div className="space-y-2">
                <p className={`font-black text-3xl ${isCorrectCurrent ? 'text-green-400' : 'text-red-400'}`}>{isCorrectCurrent ? 'Perfect logic!' : 'Logic slip!'}</p>
                <p className="text-lg text-gray-100 font-bold leading-relaxed">{feedback}</p>
              </div>
            </div>
            <button 
              onClick={nextQuestion}
              className="w-full mt-8 py-6 bg-white text-gray-900 text-2xl font-black rounded-3xl hover:bg-gray-100 transition-all shadow-2xl transform active:scale-95 border-b-4 border-gray-300"
            >
              Next Question <i className="fas fa-chevron-right ml-2"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
