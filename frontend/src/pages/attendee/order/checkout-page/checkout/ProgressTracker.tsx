export const ProgressTracker = ({ step }: { step: number }) => {
  const steps = ["Details", "Rewards", "Review", "Payment"];

  return (
    <div className="flex justify-between mb-8">
      {steps.map((s, i) => (
        <div key={i} className="flex-1 text-center">
          <div
            className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm
            ${i <= step ? "bg-blue-600 text-white" : "bg-zinc-200"}`}
          >
            {i + 1}
          </div>
          <p className="text-xs mt-1">{s}</p>
        </div>
      ))}
    </div>
  );
};