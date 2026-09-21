export type ThemeName =
  | "softExecutive"
  | "lavenderGlass"
  | "mintGlass"
  | "roseQuartz"
  | "midnight"
  | "obsidian"
  | "titanium"
  | "paper";

export type ThemeColors = {
  background: string;
  surface: string;
  surfaceRaised: string;
  border: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentSoft: string;
  success: string;
  warning: string;
  track: string;
  profile: string;
  education: string;
  career: string;
  projects: string;
  achievements: string;
  certifications: string;
  documents: string;
  neutral: string;
};

export type ThemeDefinition = {
  name: ThemeName;
  label: string;
  description: string;
  colors: ThemeColors;
};

const category = {
  profile: "#7B72E8",
  education: "#5D8DEE",
  career: "#3BBF9B",
  projects: "#8B6CE8",
  achievements: "#E3A93D",
  certifications: "#DD78A6",
  documents: "#E48A4A",
  neutral: "#7D8798",
};

export const themes: ThemeDefinition[] = [
  {
    name: "softExecutive",
    label: "Soft Executive",
    description: "Light glass, cool neutrals and a calm lavender accent.",
    colors: { background: "#EEF2F8", surface: "#F7F9FD", surfaceRaised: "#FFFFFF", border: "#D4DCE8", text: "#172033", textSecondary: "#667085", textMuted: "#818A9A", accent: "#6D6AEF", accentSoft: "#E4E5FF", success: "#37B987", warning: "#E8A93A", track: "#DDE2EC", ...category },
  },
  {
    name: "lavenderGlass",
    label: "Lavender Glass",
    description: "More violet depth while keeping the interface bright.",
    colors: { background: "#F0EEFA", surface: "#F8F6FF", surfaceRaised: "#FFFFFF", border: "#DDD5F1", text: "#25203A", textSecondary: "#716A86", textMuted: "#9189A5", accent: "#8068E8", accentSoft: "#E9E1FF", success: "#3BBF9B", warning: "#E3A93D", track: "#E2DDF0", ...category, profile: "#8068E8", projects: "#9A72EA" },
  },
  {
    name: "mintGlass",
    label: "Mint Glass",
    description: "Fresh, restrained green with soft glass surfaces.",
    colors: { background: "#EDF5F3", surface: "#F6FBFA", surfaceRaised: "#FFFFFF", border: "#D2E3DF", text: "#172B2A", textSecondary: "#607673", textMuted: "#80928F", accent: "#38AE91", accentSoft: "#DDF3EC", success: "#2DAE78", warning: "#D99B38", track: "#D9E8E4", ...category, profile: "#6F82D9", career: "#38AE91" },
  },
  {
    name: "roseQuartz",
    label: "Rose Quartz",
    description: "Soft blush accents with an editorial professional feel.",
    colors: { background: "#F7F0F4", surface: "#FCF7FA", surfaceRaised: "#FFFFFF", border: "#E8D7E0", text: "#30212B", textSecondary: "#76636D", textMuted: "#99858F", accent: "#D477A0", accentSoft: "#F6DCE8", success: "#4AAE8A", warning: "#D79A3D", track: "#E9DDE4", ...category, profile: "#C96E99", certifications: "#D477A0" },
  },
  {
    name: "midnight",
    label: "Midnight",
    description: "Deep blue professional surfaces with a restrained violet accent.",
    colors: { background: "#0D1424", surface: "#141D31", surfaceRaised: "#19243A", border: "#293650", text: "#F4F7FC", textSecondary: "#AAB5C8", textMuted: "#7F8BA1", accent: "#8A84F5", accentSoft: "#292B59", success: "#4BC79F", warning: "#E6AF4B", track: "#27324A", ...category },
  },
  {
    name: "obsidian",
    label: "Obsidian",
    description: "Dark executive contrast for a focused workspace.",
    colors: { background: "#0A0B0F", surface: "#11131A", surfaceRaised: "#171A22", border: "#272B35", text: "#F5F6F8", textSecondary: "#B0B5BF", textMuted: "#7B828F", accent: "#9A93FF", accentSoft: "#302D58", success: "#46B98F", warning: "#E1A641", track: "#272B35", ...category },
  },
  {
    name: "titanium",
    label: "Titanium",
    description: "Monochrome dark minimalism with a cool metallic accent.",
    colors: { background: "#121416", surface: "#1A1D20", surfaceRaised: "#202428", border: "#30353A", text: "#F3F5F6", textSecondary: "#B7BDC2", textMuted: "#858C92", accent: "#C8D0D8", accentSoft: "#343A40", success: "#68B49B", warning: "#D6AA5D", track: "#30353A", ...category, profile: "#B5AEEA", neutral: "#AEB7C0" },
  },
  {
    name: "paper",
    label: "Paper",
    description: "Clean editorial surfaces for a classic professional profile.",
    colors: { background: "#F3F0E9", surface: "#FAF8F2", surfaceRaised: "#FFFEFA", border: "#DED8CB", text: "#25231F", textSecondary: "#6E6A61", textMuted: "#8D887D", accent: "#5E6B9A", accentSoft: "#E4E7F1", success: "#4C9276", warning: "#B9873F", track: "#DED9CE", ...category, profile: "#6876A9", education: "#607D9E" },
  },
];

export const defaultTheme: ThemeName = "softExecutive";
export const getTheme = (name: ThemeName) => themes.find(theme => theme.name === name) ?? themes[0];
