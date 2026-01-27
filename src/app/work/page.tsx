import DeviceStorySection from "@/components/work/DeviceStorySection";
export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Some content before the section */}
      <div className="h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center text-white space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Device Transformation</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Scroll to experience the seamless morphing between mobile, tablet, and desktop interfaces</p>
          <div className="animate-bounce mt-8">
            <svg className="w-6 h-6 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* The main device story section */}
      <DeviceStorySection />

      {/* Some content after the section */}
      <div className="h-screen bg-gradient-to-b from-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white space-y-4">
          <h2 className="text-4xl font-bold">Experience Complete</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">The device transformation showcases responsive design and smooth animations</p>
        </div>
      </div>
    </main>
  );
}
