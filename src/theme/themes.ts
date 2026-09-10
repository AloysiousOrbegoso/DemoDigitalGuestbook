import type { ThemeId } from "../types/guide";

/**
 * Three moods of the same villa. Each token maps to a CSS custom property
 * (`--bg`, `--surface`, ...). The token *roles* are stable across themes;
 * only the values change, so components never need to know the theme.
 */
export interface ThemeTokens {
  bg: string;          // page background (sand)
  surface: string;     // tiles, cards
  surfaceSunk: string; // inset areas: wifi password field, sidebar
  heading: string;     // property name, titles (pine)
  ink: string;         // body text
  muted: string;       // secondary text
  line: string;        // hairlines and tile borders
  accent: string;      // icons, links, active states (teal)
  accentInk: string;   // text on top of accent fills
  urgent: string;      // emergency and primary actions only (terracotta)
  urgentSoft: string;  // emergency tile background
  highlight: string;   // active marker and focus ring
}

export interface ThemeDef {
  id: ThemeId;
  label: string;
  /** Two colours shown in the switcher swatch */
  swatch: [string, string];
  tokens: ThemeTokens;
}

export const themes: ThemeDef[] = [
  {
    id: "daytime",
    label: "Daytime",
    swatch: ["#F7F2EA", "#3E7C7B"],
    tokens: {
      bg: "#F7F2EA",
      surface: "#FFFFFF",
      surfaceSunk: "#EFE8DC",
      heading: "#1F3B3A",
      ink: "#2B2B26",
      muted: "#66665B",
      line: "#E2D9CA",
      accent: "#3E7C7B",
      accentInk: "#FFFFFF",
      urgent: "#C4622D",
      urgentSoft: "#F6E1D3",
      highlight: "#3E7C7B",
    },
  },
  {
    id: "golden-hour",
    label: "Golden Hour",
    swatch: ["#F2E3D0", "#D9A441"],
    tokens: {
      bg: "#F2E3D0",
      surface: "#FBF4EA",
      surfaceSunk: "#EAD6BD",
      heading: "#2E3230",
      ink: "#2F2A22",
      muted: "#6E6150",
      line: "#E0CBAF",
      accent: "#3F6F66",
      accentInk: "#FFFFFF",
      urgent: "#A94E1F",
      urgentSoft: "#F1D2BC",
      highlight: "#D9A441",
    },
  },
  {
    id: "reef",
    label: "Reef",
    swatch: ["#DCE8E5", "#C9A97A"],
    tokens: {
      bg: "#DCE8E5",
      surface: "#F5F9F7",
      surfaceSunk: "#CCDDD9",
      heading: "#123332",
      ink: "#1E2B2A",
      muted: "#4F6361",
      line: "#C2D6D2",
      accent: "#2B6867",
      accentInk: "#FFFFFF",
      urgent: "#B4552A",
      urgentSoft: "#F0DACB",
      highlight: "#B48E57",
    },
  },
];

const toVar = (key: string) => `--${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`;

/** Builds the `[data-theme="..."] { --bg: ...; }` rules injected once at startup. */
export function themeCss(): string {
  return themes
    .map((t) => {
      const body = Object.entries(t.tokens)
        .map(([k, v]) => `  ${toVar(k)}: ${v};`)
        .join("\n");
      return `[data-theme="${t.id}"] {\n${body}\n}`;
    })
    .join("\n");
}
