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
          light: "#3D3342", /* Aubergine */
          lightgray: "#584C5B", /* Pflaumenlila */
          gray: "#736770", /* Schiefergrau */
          darkgray: "#A69D8D", /* Lavendelgrau */
          dark: "#C9B8A5", /* Hellgrau mit leichtem Violett-Ton */
          secondary: "#673AB7", /* Hyazinthblau */
          tertiary: "#F08A4F", /* Orange */
          highlight: "rgba(240, 138, 79, 0.15)", /* Orange mit Transparenz */
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
