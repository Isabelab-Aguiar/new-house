interface SectionHeaderProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeader({
  badge,
  badgeIcon,
  title,
  subtitle,
  center = true,
}: SectionHeaderProps) {
  return (
    <div className={center ? "text-center" : ""}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 ${center ? "" : ""}`}
          style={{ background: "#EDE3D4", border: "1px solid #D4C4B0" }}>
          {badgeIcon}
          <span className="text-xs text-[#8B5E3C] font-medium tracking-wide uppercase">{badge}</span>
        </div>
      )}
      <h1
        className="text-4xl sm:text-5xl text-[#2C1A0E] font-light mb-3"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="text-[#8B5E3C] text-base max-w-lg mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
