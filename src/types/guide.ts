/**
 * GuideContent and friends. Kept identical in shape to the main product's
 * schema so this file can become packages/schema later.
 *
 * `Block` is a discriminated union rather than an open `[key: string]: unknown`
 * bag: the JSON on the wire is the same, but each block component gets typed props.
 */

export type BlockType =
  | "text" | "steps" | "image" | "video"
  | "link" | "wifi" | "contact" | "map-link" | "list";

export interface TextBlockData { type: "text"; heading?: string; body: string }
export interface StepsBlockData { type: "steps"; heading?: string; steps: string[] }
export interface ImageBlockData { type: "image"; src: string; alt: string; caption?: string }
export interface VideoBlockData {
  type: "video";
  provider: "youtube" | "vimeo";
  videoId: string;
  title: string;
}
export interface LinkBlockData { type: "link"; label: string; href: string; description?: string }
export interface WifiBlockData { type: "wifi"; network: string; password: string; note?: string }

export type ContactKind = "call" | "sms" | "messenger" | "email";
export interface ContactMethod {
  kind: ContactKind;
  label: string;
  /** Phone number, messenger username, or email address depending on kind */
  value: string;
  detail?: string;
}
export interface ContactBlockData {
  type: "contact";
  heading?: string;
  methods: ContactMethod[];
  /** Renders in the urgent (terracotta) accent. Emergency only. */
  urgent?: boolean;
}
export interface MapLinkBlockData { type: "map-link"; label: string; query: string; note?: string }
export interface ListItem { title: string; detail?: string; icon?: string }
export interface ListBlockData { type: "list"; heading?: string; items: ListItem[] }

export type Block =
  | TextBlockData | StepsBlockData | ImageBlockData | VideoBlockData
  | LinkBlockData | WifiBlockData | ContactBlockData | MapLinkBlockData | ListBlockData;

// Compile-time guarantee that the Block union and BlockType never drift apart.
type AllCovered = [BlockType] extends [Block["type"]]
  ? ([Block["type"]] extends [BlockType] ? true : never)
  : never;
export const blockTypesCovered: AllCovered = true;

export type PageType =
  | "welcome" | "host" | "steps" | "list" | "wifi" | "rules"
  | "places" | "emergency" | "text" | "contact";

export interface Page {
  id: string;
  type: PageType;
  title: string;
  /** Tabler icon name, no "ti-" prefix */
  icon: string;
  blocks: Block[];
}

export interface Place {
  name: string;
  category: string;
  note: string;
  mapsUrl: string;
}

export interface GuideContent {
  property: {
    name: string;
    tagline: string;
    address: string;
    mapsUrl: string;
    coverImage: string;
  };
  host: {
    name: string;
    /** Empty string renders an initials monogram until a photo is added */
    photo: string;
    phone: string;
    /** Messenger username; empty string hides the Messenger option */
    messenger: string;
    bio: string;
  };
  pages: Page[];
  places: Place[];
  emergency: {
    hospital: string;
    police: string;
    barangay: string;
  };
}

export type ThemeId = "daytime" | "golden-hour" | "reef";
