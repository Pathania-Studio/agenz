"use client";

export default function Video(props: React.VideoHTMLAttributes<HTMLVideoElement>) {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      {...props}
    />
  );
}
