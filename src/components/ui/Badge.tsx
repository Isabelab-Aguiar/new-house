"use client";

interface BadgeProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "default" | "dark";
}

export default function Badge({ children, icon, variant = "default" }: BadgeProps) {
  const styles = {
    default: { background: "#EDE3D4", border: "1px solid #D4C4B0", color: "#8B5E3C" },
    dark: { background: "#2C1A0E", border: "none", color: "white" },
  };

  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
      style={styles[variant]}
    >
      {icon && <span className="text-current">{icon}</span>}
      <span className="text-xs font-medium tracking-wide uppercase">{children}</span>
    </div>
  );
}
