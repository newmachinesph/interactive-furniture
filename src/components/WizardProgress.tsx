interface Step {
  number: number;
  label: string;
}

interface Props {
  steps: Step[];
  currentStep: number;
}

export default function WizardProgress({ steps, currentStep }: Props) {
  return (
    <div className="bg-white border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex items-center">
          {steps.map((step, i) => (
            <div key={step.number} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-2 shrink-0">
                <div
                  className={`w-8 h-8 flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    currentStep > step.number
                      ? 'bg-[#aa323e] text-white'
                      : currentStep === step.number
                      ? 'bg-[#aa323e] text-white ring-4 ring-[#aa323e]/20'
                      : 'bg-[#bbb6b3]/30 text-stone-400'
                  }`}
                >
                  {currentStep > step.number ? '✓' : step.number}
                </div>
                <span
                  className={`text-sm hidden sm:block whitespace-nowrap ${
                    currentStep === step.number
                      ? 'text-[#aa323e] font-semibold'
                      : currentStep > step.number
                      ? 'text-stone-600'
                      : 'text-stone-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-3 transition-all duration-300 ${
                    currentStep > step.number ? 'bg-[#aa323e]' : 'bg-[#bbb6b3]/40'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
