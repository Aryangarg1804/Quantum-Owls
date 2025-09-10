export default function Preloader() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-white via-pink-50 to-purple-50">
      <div className="absolute top-[20%] text-center text-saheli-purple">
        <h1 className="text-3xl font-bold">Saheli</h1>
        <p className="opacity-70">Empowering Women</p>
      </div>
      <div
        className="w-16 h-16 rounded-full border-4 border-saheli-pink/30 border-t-saheli-pink border-r-saheli-purple animate-spin"
        aria-label="Loading"
      />
    </div>
  );
}
