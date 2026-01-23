import WorkRow from "./WorkRow";

export default function SelectedWorkSection() {
  const works = [
    { video: "/videos/hero-bg.mp4", images: ["/images/1.jpg", "/images/2.jpg"] },
    { video: "/videos/splash.mp4", images: ["/img/3.jpg", "/img/4.jpg"] },
    // { video: "/videos/pin-video.mp4", images: ["/img/5.jpg", "/img/6.jpg"] },
  ];

  return (
    <section className="bg-transparent text-white max-w-[90%] m-auto py-32 space-y-48">
      {works.map((work, i) => (
        <WorkRow key={i} index={i} {...work} />
      ))}
    </section>
  );
}
