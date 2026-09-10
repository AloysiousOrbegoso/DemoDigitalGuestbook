import type { GuideContent, Page } from "../../types/guide";
import { BlockRenderer } from "../blocks/BlockRenderer";
import { PlacesList } from "./PlacesScreen";

function initials(name: string) {
  return name.split(/\s+/).filter((w) => /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join("");
}

export function HostCard({ host }: { host: GuideContent["host"] }) {
  return (
    <div className="host-card">
      {host.photo ? (
        <img className="host-card__photo" src={host.photo} alt={host.name} />
      ) : (
        <div className="host-card__photo host-card__photo--monogram" aria-hidden="true">{initials(host.name)}</div>
      )}
      <div>
        <p className="host-card__name">{host.name}</p>
        <p className="host-card__bio">{host.bio}</p>
      </div>
    </div>
  );
}

export function Cover({ property, as: Tag = "p" }: { property: GuideContent["property"]; as?: "h1" | "p" }) {
  return (
    <div className="cover">
      <img className="cover__img" src={property.coverImage} alt="" />
      <div className="cover__text">
        <Tag className="cover__name">{property.name}</Tag>
        <p className="cover__tagline">{property.tagline}</p>
      </div>
    </div>
  );
}

/**
 * Renders one page. Shell-agnostic: the same component fills the desktop
 * content pane, the phone frame, and the full-screen mobile view.
 */
export function SectionScreen({ page, content }: { page: Page; content: GuideContent }) {
  const isWelcome = page.type === "welcome";
  return (
    <article className={`section-screen section-screen--${page.type}`} aria-labelledby={`title-${page.id}`}>
      {isWelcome && <Cover property={content.property} />}
      <header className="section-screen__head">
        {!isWelcome && <i className={`ti ti-${page.icon} section-screen__icon`} aria-hidden="true" />}
        <h1 id={`title-${page.id}`} className={`section-screen__title${isWelcome ? " visually-hidden" : ""}`}>
          {page.title}
        </h1>
      </header>
      {page.type === "host" && <HostCard host={content.host} />}
      <div className="section-screen__blocks">
        {page.blocks.map((b, i) => <BlockRenderer key={i} block={b} />)}
        {page.type === "places" && <PlacesList places={content.places} />}
      </div>
    </article>
  );
}
