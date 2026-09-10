import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { GuideContent } from "../../types/guide";
import { DemoBadge, DemoFooter } from "./DemoBadge";
import { HomeScreen } from "../screens/HomeScreen";
import { SectionScreen } from "../screens/SectionScreen";
import { PlacesScreen } from "../screens/PlacesScreen";
import { SearchOverlay } from "../SearchOverlay";
import { ThemeSwitcher } from "../ThemeSwitcher";

type Tab = "home" | "guide" | "places" | "host";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "guide", label: "Guide", icon: "book" },
  { id: "places", label: "Places", icon: "map-pin" },
  { id: "host", label: "Host", icon: "users" },
];

interface Props {
  content: GuideContent;
  /** Inside the desktop PhoneFrame: the desktop page owns the theme switcher. */
  embedded?: boolean;
}

export function MobileShell({ content, embedded = false }: Props) {
  const [tab, setTab] = useState<Tab>("home");
  const [sectionId, setSectionId] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const page = sectionId ? content.pages.find((p) => p.id === sectionId) : undefined;
  const hostPage = content.pages.find((p) => p.type === "host");
  const explorePage = content.pages.find((p) => p.type === "places");
  const exploreIntro = explorePage?.blocks.find((b) => b.type === "text");

  useLayoutEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [tab, sectionId]);

  const openSection = useCallback((id: string) => {
    setSectionId(id);
    setSearching(false);
  }, []);
  const closeSearch = useCallback(() => setSearching(false), []);

  function goTab(t: Tab) {
    setTab(t);
    setSectionId(null);
  }

  let screen;
  if (page) {
    screen = <SectionScreen page={page} content={content} />;
  } else if (tab === "guide") {
    screen = (
      <article className="section-screen">
        <header className="section-screen__head">
          <h1 className="section-screen__title">The guide</h1>
        </header>
        <SectionList content={content} onOpen={openSection} />
      </article>
    );
  } else if (tab === "places") {
    screen = <PlacesScreen places={content.places} intro={exploreIntro?.type === "text" ? exploreIntro.body : undefined} />;
  } else if (tab === "host" && hostPage) {
    screen = <SectionScreen page={hostPage} content={content} />;
  } else {
    screen = <HomeScreen content={content} onOpen={openSection} />;
  }

  return (
    <div className={`mobile-shell${embedded ? " mobile-shell--embedded" : ""}`}>
      <header className="topbar">
        {page ? (
          <button type="button" className="icon-btn topbar__back" onClick={() => setSectionId(null)} aria-label="Back">
            <i className="ti ti-chevron-left" aria-hidden="true" />
          </button>
        ) : null}
        <div className="topbar__id">
          <span className="topbar__name">{content.property.name}</span>
          <DemoBadge />
        </div>
        <button type="button" className="icon-btn" onClick={() => setSearching(true)} aria-label="Search the guide">
          <i className="ti ti-search" aria-hidden="true" />
        </button>
      </header>

      <main className="mobile-shell__scroll" ref={scrollRef}>
        {screen}
        <DemoFooter />
      </main>

      <nav className="bottom-nav" aria-label="Main">
        {TABS.map((t) => {
          const active = !page && tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              className="bottom-nav__item"
              aria-current={active ? "page" : undefined}
              onClick={() => goTab(t.id)}
            >
              <i className={`ti ti-${t.icon}`} aria-hidden="true" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </nav>

      {!embedded && <ThemeSwitcher placement="mobile" />}
      {searching && <SearchOverlay content={content} onSelect={openSection} onClose={closeSearch} />}
    </div>
  );
}

/** Vertical list of all sections: used by the mobile Guide tab and the desktop sidebar. */
export function SectionList({
  content,
  onOpen,
  activeId,
}: {
  content: GuideContent;
  onOpen: (id: string) => void;
  activeId?: string;
}) {
  return (
    <ul className="section-list">
      {content.pages.map((p) => (
        <li key={p.id}>
          <button
            type="button"
            className={`section-list__item${p.type === "emergency" ? " section-list__item--urgent" : ""}`}
            aria-current={activeId === p.id ? "page" : undefined}
            onClick={() => onOpen(p.id)}
          >
            <i className={`ti ti-${p.icon}`} aria-hidden="true" />
            <span>{p.title}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
