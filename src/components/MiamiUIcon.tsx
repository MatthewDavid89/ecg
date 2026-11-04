import React from 'react';

interface MiamiUIconProps {
  className?: string;
  size?: number;
}

/**
 * Official University of Miami "The U" Split Icon
 * Left side: Miami Green (#005030)
 * Right side: Miami Orange (#F47321)
 */
export const MiamiUIcon: React.FC<MiamiUIconProps> = ({ className = 'w-6 h-6', size }) => {
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="University of Miami The U"
    >
      {/* Left Stalk & Curve: Miami Green */}
      <path
        d="M18 12 H37 V58 C37 68.5 42.5 74 50 74 V92 C31 92 18 78 18 58 Z"
        fill="#005030"
      />
      {/* Right Stalk & Curve: Miami Orange */}
      <path
        d="M82 12 H63 V58 C63 68.5 57.5 74 50 74 V92 C69 92 82 78 82 58 Z"
        fill="#F47321"
      />
    </svg>
  );
};

/**
 * Academic Nursing & Hospital Badge
 */
export const UHealthBadge: React.FC<{ text?: string; subtext?: string }> = ({
  text = 'University of Miami',
  subtext = 'School of Nursing & Health Studies'
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg bg-white border border-[#E0EAE4] shadow-xs flex items-center justify-center p-1 shrink-0">
        <MiamiUIcon className="w-6 h-6" />
      </div>
      <div className="leading-tight">
        <div className="text-xs font-bold text-[#005030] tracking-tight flex items-center gap-1.5">
          <span>{text}</span>
          <span className="bg-[#FEF2EB] text-[#F47321] text-[10px] px-1.5 py-0.2 rounded font-mono font-bold border border-[#F47321]/30">
            UHealth
          </span>
        </div>
        <div className="text-[10px] text-[#4B6358] font-medium tracking-wide">
          {subtext}
        </div>
      </div>
    </div>
  );
};
