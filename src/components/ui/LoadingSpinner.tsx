export default function LoadingSpinner() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--nude-100)" }}
    >
      <div className="text-center">
        <div
          className="w-11 h-11 rounded-full border-2 animate-spin mx-auto mb-3"
          style={{ borderColor: "#C4956A", borderTopColor: "transparent" }}
        />
        <p className="text-[#A67C52] text-sm">Carregando...</p>
      </div>
    </div>
  );
}
