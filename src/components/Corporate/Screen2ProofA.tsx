import VideoStage from "./VideoStage";

export default function Screen2ProofA() {
  return (
    <div className="screen-2 absolute inset-0 h-full w-full opacity-0 bg-white">
      <div className="h-full w-full relative">
        <h2 className="absolute top-20 left-1/2 -translate-x-1/2 text-4xl font-semibold text-black">Our Work in Action</h2>
        <VideoStage classBig="screen-2-big absolute left-[10%] top-1/2 -translate-y-1/2" classSmallA="screen-2-small-a absolute right-[15%] top-[20%]" classSmallB="screen-2-small-b absolute right-[10%] bottom-[15%]" />
      </div>
    </div>
  );
}
