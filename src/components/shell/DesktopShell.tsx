import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { GuideContent } from "../../types/guide";
import { DemoBadge, DemoFooter } from "./DemoBadge";
import { MobileShell, SectionList } from "./MobileShell";
import { PhoneFrame } from "./PhoneFrame";
import { ViewToggle, type ViewMode } from "./ViewToggle";
import { SectionScreen } from "../screens/SectionScreen";
import { SearchOverlay } from "../SearchOverlay";
import { ThemeSwitcher } from "../ThemeSwitcher";

export function DesktopShell({ content }: { content: GuideContent }) {
  const [mode, setMode] = useState<ViewMode>("desktop");
  const [activeId, setActiveId] = useState(content.pages[0].id);
  const [searching, setSearching] = useState(false);
  const paneRef = useRef<HTMLElement>(null);
  const page = content.pages.find((p) => p.id === activeId) ?? content.pages[0];

  useLayoutEffect(() => {
    paneRef.current?.scrollTo({ top: 0 });
  }, [activeId]);

  const open = useCallback((id: string) => {
    setActiveId(id);
    setMode("desktop");
    setSearching(false);
  }, []);
  const closeSearch = useCallback(() => setSearching(false), []);

  return (
    <div className="desktop-shell">
      <header className="desk-header">
        <div className="desk-header__id">
          <span className="desk-header__name">{content.property.name}</span>
          <DemoBadge />
        </div>
        <div className="desk-header__actions">
          <ViewToggle mode={mode} onChange={setMode} />
          {mode === "desktop" && (
            <button type="button" className="search-trigger" onClick={() => setSearching(true)}>
              <i className="ti ti-search" aria-hidden="true" />
              Search the guide
            </button>
          )}
        </div>
      </header>

      {mode === "desktop" ? (
        <div className="desk-body">
          <nav className="sidebar" aria-label="Guide sections">
            <SectionList content={content} onOpen={open} activeId={activeId} />
          </nav>
          <main className="content-pane" ref={paneRef}>
            <div className="content-pane__inner">
              <SectionScreen key={page.id} page={page} content={content} />
              <DemoFooter />
            </div>
          </main>
        </div>
      ) : (
        <main className="phone-stage">
          <PhoneFrame>
            <MobileShell content={content} embedded />
          </PhoneFrame>
          <p className="phone-stage__caption">
            This is the live phone version. Tap around; everything works the same as on a real phone.
          </p>
        </main>
      )}

      <ThemeSwitcher placement="desktop" />
      {searching && <SearchOverlay content={content} onSelect={open} onClose={closeSearch} variant="modal" />}
    </div>
  );
}
