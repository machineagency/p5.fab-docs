# p5.fab docs

Documentation site for [p5.fab](https://github.com/machineagency/p5.fab), built with Astro 6. The site has two content areas: **Reference** (auto-generated from JSDoc) and **Resources** (hand-written Markdown guides and tutorials).

The extraction script (`scripts/extract-jsdoc.mjs`) reads `static/p5.fab.js` from that repo and writes `src/content/reference.json`. **Do not edit `reference.json` by hand** — it is regenerated on every dev/build run.

Set `PUBLIC_EDITOR_URL` in `.env` for the interactive embed iframes:
```
PUBLIC_EDITOR_URL=http://localhost:5173   # local dev (default)
PUBLIC_EDITOR_URL=https://copypastes.xyz  # production
```

---

## Adding a reference method

Reference pages are generated automatically from JSDoc in `p5.fab.js`. A method appears in the docs when it has:

- `@memberof Fab` in its JSDoc comment
- `access` is not `private` (i.e., no `@private` tag)

**Supported JSDoc tags:**

| Tag | Renders as |
|---|---|
| `@group GroupName` | Sidebar group assignment (required — see below) |
| `@param {type} name description` | Parameters table row |
| `@returns {type} description` | Returns section |
| `@example` (code block) | Interactive embed iframe |

**Sidebar grouping via `@group`:** Every documented method must include a `@group` tag. Valid group names are defined by `groupOrder` in `src/layouts/DocsLayout.astro`. To add a new group, add its name to that array — no other changes needed.

```
Setup | Motion | Extrusion | Temperature | Print control | Configuration | Utilities
```

Methods are sorted alphabetically within their group. The sidebar is built dynamically from `reference.json` — no manual edits to `DocsLayout.astro` are needed when adding a method.

A method missing `@group` will produce a build-time warning and will not appear in the sidebar.

After editing the JSDoc in `p5.fab.js`, run `npm run extract` (or restart `npm run dev`) to regenerate `reference.json`.

---

## Adding a guide or tutorial

1. Create a Markdown file in the appropriate directory:
   - `src/content/resources/guides/your-guide.md`
   - `src/content/resources/tutorials/your-tutorial.md`

2. Add required frontmatter at the top:
   ```md
   ---
   title: "Your Page Title"
   ---
   ```

3. Add an entry to the sidebar in `src/layouts/DocsLayout.astro` — find `resourceGroups` (this list is still manual, unlike the reference sidebar) and add an item:
   ```js
   const resourceGroups = [
     {
       label: 'Guides',
       items: [
         { title: 'Your Guide Title', slug: 'guides/your-guide' },
       ],
     },
     ...
   ];
   ```

The slug must match the file path under `src/content/resources/` without the `.md` extension.

Images for guides/tutorials go in `src/content/resources/guides/images/` or `src/content/resources/tutorials/images/` and are referenced with relative paths in Markdown.

---

## File map

| Path | What it is |
|---|---|
| `src/content/reference.json` | Auto-generated method data — do not edit |
| `src/content/resources/` | Markdown source for all guides and tutorials |
| `src/layouts/DocsLayout.astro` | Shared layout + **sidebar navigation** (edit here to add items) |
| `src/pages/reference/[method].astro` | Template that renders each method page from `reference.json` |
| `src/pages/resources/[...slug].astro` | Template that renders each guide/tutorial from Markdown |
| `scripts/extract-jsdoc.mjs` | Reads `p5.fab.js` JSDoc → writes `reference.json` |
| `public/` | Static assets (favicon, images referenced from non-content pages) |
