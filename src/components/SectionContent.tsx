
import React from 'react';

interface SectionContentProps {
  title: string;
  subtitle: string;
  description: string;
  className?: string;
}

const SectionContent: React.FC<SectionContentProps> = ({ 
  title, 
  subtitle, 
  description, 
  className = '' 
}) => {
  return (
    <div className={`flex flex-col justify-center w-full max-w-lg mx-auto ${className}`}>
      <div className="inline-flex items-center gap-2 mb-6">
        <span className="w-8 h-[2px] bg-blue-500"></span>
        <span className="text-blue-500 font-bold tracking-[0.2em] uppercase text-xs">
          {subtitle}
        </span>
      </div>
      
      <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight leading-[1.1]">
        {title}
      </h2>
      
      <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-normal mb-10">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-5">
        <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20">
          Try it Now
        </button>
        <button className="px-8 py-4 border border-zinc-800 text-zinc-300 font-semibold rounded-xl hover:bg-white/5 transition-all">
          View Docs
        </button>
      </div>
    </div>
  );
};

export default SectionContent;
