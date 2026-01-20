import VideoCard from "./VideoCard";

type Props = {
  classBig: string;
  classSmallA: string;
  classSmallB: string;
};

// example video config
export const corporateVideos = [
  {
    id: "big",
    youtubeId: "dQw4w9WgXcQ",
    title: "Corporate Brand Film",
  },
  {
    id: "small-a",
    youtubeId: "3fumBcKC6RE",
    title: "Factory Tour",
  },
  {
    id: "small-b",
    youtubeId: "l482T0yNkeo",
    title: "Founder Interview",
  },
];

export default function VideoStage({ classBig, classSmallA, classSmallB }: Props) {
  return (
    <>
      <VideoCard id="big" youtubeId={corporateVideos[0].youtubeId} className={`absolute ${classBig} w-[60vw] max-w-4xl`} />

      <VideoCard id="small-a" youtubeId={corporateVideos[1].youtubeId} className={`absolute ${classSmallA} w-[26vw]`} />

      <VideoCard id="small-b" youtubeId={corporateVideos[2].youtubeId} className={`absolute ${classSmallB} w-[26vw]`} />
    </>
  );
}
