import type { VideoBlockData } from "../../types/guide";

const embedUrl = ({ provider, videoId }: VideoBlockData) =>
  provider === "youtube"
    ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?rel=0`
    : `https://player.vimeo.com/video/${encodeURIComponent(videoId)}?dnt=1`;

export function VideoBlock(props: VideoBlockData) {
  return (
    <div className="block block-video">
      <div className="video-frame">
        <iframe
          src={embedUrl(props)}
          title={props.title}
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  );
}
