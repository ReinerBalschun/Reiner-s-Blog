import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [ Component.Comments({
    provider: 'giscus',
    options: {
      // from data-repo
      repo: 'ReinerBalschun/Reiners-zweite-Gehirn',
      // from data-repo-id
      repoId: 'R_kgDOMFWvHQ',
      // from data-category
      category: 'Announcements',
      // from data-category-id
      categoryId: 'DIC_kwDOMFWvHc4CjVdB',
    }
  }),],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/ReinerBalschun",
      "GitHub Repo": "https://github.com/ReinerBalschun/Reiners-zweite-Gehirn",
      "LinkedIn": "https://www.linkedin.com/in/reiner-balschun-a123442b0/"
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    /*Component.Darkmode(),*/ // ist damit der Button nicht zu sehen ist für lightmode!
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    /*Component.Backlinks(),*/ // benutze keine Backlinks
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
