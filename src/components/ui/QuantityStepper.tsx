'use client';

interface Props {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export default function QuantityStepper({ value, min = 0, max = 99, onChange, disabled = false }: Props) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label="Decrease"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={disabled || value <= min}
        className="w-7 h-7 bg-[#aa323e] text-white flex items-center justify-center text-base font-medium leading-none hover:bg-[#8f2a34] disabled:opacity-30 disabled:cursor-not-allowed transition-colors select-none"
      >
        −
      </button>
      <span className="w-7 text-center text-sm font-medium tabular-nums text-stone-800 select-none">
        {String(value).padStart(2, '0')}
      </span>
      <button
        type="button"
        aria-label="Increase"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={disabled || value >= max}
        className="w-7 h-7 bg-[#aa323e] text-white flex items-center justify-center text-base font-medium leading-none hover:bg-[#8f2a34] disabled:opacity-30 disabled:cursor-not-allowed transition-colors select-none"
      >
        +
      </button>
    </div>
  );
}
