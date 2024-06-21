---
title: 'Feature Ideen'
---

> [!todo] Recent Files Feature
> diesen Quellcode in "*quartz.layout.ts*" nach dem "Component.DesktopOnly" in "PageLayout" 
> **Brauche aber noch etwas Zeit beim ersetzen der anderen Plugins!**
> 
> ```typescript
> Component.RecentNotes({
>         title: "Recent Writing",
>         limit: 4,
>         filter: (f) =>
>           f.slug!.startsWith("posts/") && f.slug! !== "posts/index" && !f.frontmatter?.noindex,
>         linkToMore: "posts/" as SimpleSlug,
>       }),
>     ),
>     Component.DesktopOnly(
>       Component.RecentNotes({
>         title: "Recent Notes",
>         limit: 2,
>         filter: (f) => f.slug!.startsWith("thoughts/"),
>         linkToMore: "thoughts/" as SimpleSlug,
>       }),
>     ),
>     Component.DesktopOnly(Component.TableOfContents()),


> [!todo]- Liste mit allen Notes
> **WORK IN PROGRESS!**

> [!todo]- Kommentare 
> läuft über  [giscus](https://giscus.app/de)