import VideoStage from "./VideoStage";

export default function Screen3ProofB() {
  return (
    <div className="screen-3 absolute inset-0 h-full w-full opacity-0 bg-white">
      <div className="h-full w-full relative">
        <h2 className="absolute top-20 left-1/2 -translate-x-1/2 text-4xl font-semibold text-black">More of Our Work</h2>
        <VideoStage classBig="screen-3-big absolute right-[10%] top-1/2 -translate-y-1/2" classSmallA="screen-3-small-a absolute left-[12%] top-[20%]" classSmallB="screen-3-small-b absolute left-[18%] bottom-[18%]" />
      </div>
    </div>
  );
}
