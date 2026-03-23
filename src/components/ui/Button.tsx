"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
}

const variants = {
  primary: {
    background: "linear-gradient(135deg, #6B4423, #A67C52)",
    color: "white",
    border: "none",
    boxShadow: "0 8px 24px rgba(107,68,35,0.3)",
  },
  ghost: {
    background: "transparent",
    color: "#8B5E3C",
    border: "1px solid #EDE3D4",
    boxShadow: "none",
  },
  outline: {
    background: "#F5EFE6",
    color: "#6B4423",
    border: "1px solid #D4C4B0",
    boxShadow: "none",
  },
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 ${sizes[size]} ${className}`}
      style={variants[variant]}
    >
      {loading ? <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : icon}
      {children}
    </button>
  );
}
