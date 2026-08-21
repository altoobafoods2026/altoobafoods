export default function TiltCard({ children, className }) {
  return (
    <div
      className={`relative transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1 ${className}`}
    >
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  );
}
