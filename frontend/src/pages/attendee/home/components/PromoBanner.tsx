interface PromoBannerProps {
  title: string;
  description: string;
  image: string;
  onClick?: () => void;
}

export default function PromoBanner({
  title,
  description,
  image,
}: PromoBannerProps) {
  return (
    <div className="relative rounded-3xl overflow-hidden h-56 md:h-64 group shadow-sm">
      <img
        src={image}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-75"
        alt={title}
      />

      <div className="absolute inset-0 bg-black/40 group-hover:bg-indigo-900/50 transition-colors duration-300" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h3 className="text-white text-xl md:text-2xl font-light tracking-wide mb-2 uppercase">
          {title}
        </h3>
        <p className="text-zinc-200 text-xs md:text-sm font-light max-w-[80%] leading-relaxed">
          {description}
        </p>

        <div className="mt-4 w-10 h-px bg-white/50 group-hover:w-20 transition-all duration-500" />
      </div>
    </div>
  );
}
