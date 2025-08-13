import React from 'react';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className = '' }) => {
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className={`w-full bg-slate-200 rounded-full ${className}`}>
      <div
        className={`bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-300 ease-in-out w-[${normalizedProgress}%]`}
      />
    </div>
  );
};
