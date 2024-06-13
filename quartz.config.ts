import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Reiners 🥈 🧠",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "de-DE",
    baseUrl: "reinerbalschun.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Nabla",
        body: "Raleway",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f7f9fe", /* Helles Hellblau */
          lightgray: "#e6edf6", /* Mittleres Hellblau */
          gray: "#d1d9e1", /* Helles Grau */
          darkgray: "#b0bec5", /* Dunkles Grau */
          dark: "#80868c", /* Dunkles Grau */
          secondary: "#00BCD4", /* Akzentfarbe (Teal) */
          tertiary: "#FF4081", /* Akzentfarbe (Hot Pink) */
          highlight: "rgba(0, 188, 212, 0.15)", /* Teal mit Transparenz */
        },
        darkMode: {
          light: "#2B2B2B", /* Black */
          lightgray: "#333333", /* Very Dark Gray */
          gray: "#444444", /* Dark Gray */
          darkgray: "#666666", /* Medium Gray */
          dark: "#888888", /* Light Gray */
          secondary: "#00BCD4", /* Teal */
          tertiary: "#FF4081", /* Hot Pink */
          highlight: "rgba(0, 188, 212, 0.15)", /* Teal with Transparency */
        },        
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
