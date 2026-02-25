"use client";

import { useState } from 'react';
import { Zap } from 'lucide-react';
import Image from 'next/image'; 

export default function SwingSpeedCalculator() {
  const [club, setClub] = useState('7');
  const [yardage, setYardage] = useState('');
  const [result, setResult] = useState<{ speed: number | string; diff: number | null; status: string; isJoke?: boolean } | null>(null);

  const clubMultipliers: Record<string, { divisor: number; avgSpeed: number }> = {
    '4': { divisor: 2.15, avgSpeed: 84 },
    '5': { divisor: 2.05, avgSpeed: 81 },
    '6': { divisor: 1.95, avgSpeed: 78 },
    '7': { divisor: 1.85, avgSpeed: 75 },
    '8': { divisor: 1.75, avgSpeed: 72 },
    '9': { divisor: 1.65, avgSpeed: 69 },
    'PW': { divisor: 1.55, avgSpeed: 66 },
  };

  const handleCalculate = () => {
    const yards = parseInt(yardage);

    if (!yardage || isNaN(yards)) {
      setResult({ speed: '???', diff: null, status: "Please enter a valid number! 😅", isJoke: true });
      return;
    }
    if (yards < 30) {
      setResult({ speed: 'Oops!', diff: null, status: "Did you just drop the ball from your pocket?", isJoke: true });
      return;
    }
    if (yards < 60) {
      setResult({ speed: 'Putt?', diff: null, status: "Are you putting with an iron?", isJoke: true });
      return;
    }
    if (yards > 400) {
      setResult({ speed: 'UFO', diff: null, status: "NASA called. They want their rocket back.", isJoke: true });
      return;
    }
    if (yards > 250) {
      setResult({ speed: 'OMG', diff: null, status: "Calm down, Bryson DeChambeau. Sir, this is an iron.", isJoke: true });
      return;
    }

    // 정상 계산 로직
    const data = clubMultipliers[club];
    const estimatedSpeed = Math.round(yards / data.divisor);
    const diff = estimatedSpeed - data.avgSpeed;
    
    let status = "Average";
    if (diff > 5) status = "Fast (Tour Level)";
    else if (diff > 0) status = "Above Average";
    else if (diff < -5) status = "Below Average";

    setResult({ speed: estimatedSpeed, diff, status, isJoke: false });
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 font-sans relative">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-stone-200 z-10">
        <div className="flex items-center gap-3 mb-6 border-b border-stone-100 pb-6">
          <div className="bg-stone-900 text-white p-3 rounded-2xl"><Zap size={24} /></div>
          <div>
            <h1 className="text-2xl font-black text-stone-800">Iron Speed Calc</h1>
            <p className="text-xs text-stone-500 font-medium">Estimate your clubhead speed instantly.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Select Iron</label>
            <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {Object.keys(clubMultipliers).map((c) => (
                <button
                  key={c}
                  onClick={() => setClub(c)}
                  className={`w-12 h-12 flex-shrink-0 rounded-xl font-black text-lg transition-all ${club === c ? 'bg-stone-900 text-white shadow-md' : 'bg-stone-100 text-stone-400 hover:bg-stone-200'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Total Carry Distance (Yards)</label>
            <input
              type="number"
              placeholder="e.g. 150"
              value={yardage}
              onChange={(e) => setYardage(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 text-3xl font-black text-center py-4 rounded-2xl focus:outline-none focus:border-stone-400 focus:ring-0 transition-all"
            />
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            Calculate Speed
          </button>
        </div>

        {result && (
          <div className={`mt-8 border rounded-2xl p-6 text-center animate-in fade-in slide-in-from-bottom-4 ${result.isJoke ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-stone-100 border-stone-200 text-stone-800'}`}>
            {!result.isJoke && <p className="text-stone-500 text-[10px] font-bold uppercase tracking-widest mb-1">Estimated Clubhead Speed</p>}
            
            <div className={`font-black mb-2 ${result.isJoke ? 'text-3xl' : 'text-5xl'}`}>
              {result.speed} {!result.isJoke && <span className="text-lg font-medium text-stone-400">mph</span>}
            </div>
            
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-1 ${result.isJoke ? 'bg-amber-200 text-amber-900' : result.diff! >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
              {result.status} {!result.isJoke && result.diff !== null && `(${result.diff > 0 ? '+' : ''}${result.diff} mph vs avg)`}
            </div>

            {!result.isJoke && result.diff !== null && result.diff < 0 && (
               <p className="text-xs text-stone-500 mt-4 italic">"Time to hit the gym, or maybe check the wind."</p>
            )}
          </div>
        )}
      </div>

      {/*   */}
      <div className="mt-8">
        <a 
          href="https://golfweatherscore.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:opacity-80 transition-opacity"
        >
          {/* */}
          <Image 
            src="/image_6.png" 
            alt="Golf Weather Score Link" 
            width={40} 
            height={40} 
            className="mx-auto"
          />
        </a>
      </div>
    </div>
  );
}