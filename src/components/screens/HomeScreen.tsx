import type { GuideContent } from "../../types/guide";
import { Cover } from "./SectionScreen";

/** Mobile home: the one bold moment (cover), then the 12-tile grid. */
export function HomeScreen({ content, onOpen }: { content: GuideContent; onOpen: (pageId: string) => void }) {
  return (
    <div className="home">
      <Cover property={content.property} as="h1" />
      <nav aria-label="Guide sections">
        <ul className="tiles">
          {content.pages.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                className={`tile${p.type === "emergency" ? " tile--urgent" : ""}`}
                onClick={() => onOpen(p.id)}
              >
                <i className={`ti ti-${p.icon} tile__icon`} aria-hidden="true" />
                <span className="tile__title">{p.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
