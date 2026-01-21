
import React from 'react';
import { View } from '../types.ts';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  onNavigate: (view: View) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-4xl mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-10">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-lg shadow-green-500/20">
            🦎
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white soft-neon">FlipTag</h1>
        </div>
        
        <nav className="flex gap-5">
          <button 
            onClick={() => onNavigate('learn')}
            className={`px-6 py-2.5 rounded-full text-lg font-bold transition-all ${currentView === 'learn' || currentView === 'unit-selection' ? 'bg-green-500 text-white shadow-xl' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
          >
            Learn
          </button>
          <button 
            onClick={() => onNavigate('challenge')}
            className={`px-6 py-2.5 rounded-full text-lg font-bold transition-all ${currentView === 'challenge' ? 'bg-orange-500 text-white shadow-xl' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
          >
            Challenge
          </button>
        </nav>
      </header>

      <main className="flex-grow pb-24">
        {children}
      </main>

      <footer className="fixed bottom-0 left-0 w-full bg-gray-900/90 backdrop-blur-md border-t border-gray-800 p-6 text-center z-50">
        <p className="text-gray-300 text-base font-bold tracking-wide">
          © Created by <span className="text-green-400">Shalaka Kashikar</span>
        </p>
      </footer>
    </div>
  );
};
