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
          light: "#faf8f8", /* Helles Weiß */
          lightgray: "#f2f2f2", /* Helles Hellgrau */
          gray: "#e0e0e0", /* Mittleres Hellgrau */
          darkgray: "#cfcfcf", /* Dunkles Hellgrau */
          dark: "#a8a8a8", /* Dunkles Grau */
          secondary: "#284b63", /* Akzentfarbe (aus Darkmode übernommen) */
          tertiary: "#84a59d", /* Akzentfarbe (aus Darkmode übernommen) */
          highlight: "rgba(143, 159, 169, 0.15)", /* Highlightfarbe (aus Darkmode übernommen) */
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
