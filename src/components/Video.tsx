"use client";

export default function Video(
  props: React.VideoHTMLAttributes<HTMLVideoElement> & {
    active?: boolean;
  }
) {
  const isActive = props.active === undefined ? true : props.active;

  return (
    <video
      autoPlay
      muted
      loop
      playsInline={isActive}
      {...props}
    />
  );
}
