import type { ImageBlockData } from "../../types/guide";

export function ImageBlock({ src, alt, caption }: ImageBlockData) {
  return (
    <figure className="block block-image">
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
