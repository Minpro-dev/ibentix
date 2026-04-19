import { type ButtonHTMLAttributes, type ReactNode } from "react";

// Mendefinisikan tipe untuk varian dan ukuran
type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg" | "full";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string; // Untuk custom styling tambahan
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  // 1. Base Styles
  const baseStyles =
    "inline-flex items-center justify-center transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed gap-2 cursor-pointer";

  // 2. Variant Styles
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100",
    secondary:
      "bg-white text-indigo-600 border border-indigo-100 hover:bg-indigo-50 hover:border-indigo-200",
    danger: "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100",
    ghost:
      "bg-transparent text-zinc-500 hover:bg-slate-100 hover:text-zinc-900",
  };

  // 3. Size Styles
  const sizes: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-xs rounded-lg",
    md: "px-6 py-2.5 text-sm rounded-xl",
    lg: "px-8 py-3.5 text-base rounded-2xl",
    full: "w-full py-3 text-sm rounded-xl",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
