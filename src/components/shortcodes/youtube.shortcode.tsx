"use client";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

type YoutubeProps = {
  id: string;
  title: string;
  thumbnail?: string;
};

const Youtube = ({ id, title, thumbnail }: YoutubeProps) => {
  return (
    <LiteYouTubeEmbed
      wrapperClass="yt-lite rounded-xl !bg-[transparent] "
      id={id}
      title={title}
      poster="hqdefault"
      thumbnail={thumbnail}
    />
  );
};

export default Youtube;
