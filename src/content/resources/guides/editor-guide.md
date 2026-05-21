---
title: Working in the Editor
description: How hot-reload works in the copypastes.xyz editor, and what to keep in mind when writing setup().
---

# Working in the Editor

## Hot-reload

Every time you run your sketch in the [copypastes.xyz](https://copypastes.xyz) editor, the following happens:

1. **`setup()` re-runs** — changes to printer config, canvas size, or any other setup code take effect immediately.
2. **`fabDraw()` re-runs** — a fresh GCode model is generated from your latest code.
3. **The serial connection is preserved** — `createFab()` is a singleton, so the existing `fab` object (and any open connection to your printer) carries over across runs.

This means you can edit your sketch and see results immediately without reconnecting to your printer.

## Limitation: DOM elements in `setup()`

Because `setup()` re-runs on every run, any p5.js DOM elements created there — `createButton()`, `createSlider()`, `createInput()`, etc. — will be **duplicated** each time you run the sketch.

```js
// Avoid: button is created again on every run
function setup() {
  fab = createFab();
  createCanvas(400, 400, WEBGL);
  let btn = createButton('Print');  // duplicates on each run
  btn.mousePressed(() => fab.print());
}
```

**Workaround:** Use a guard variable to create DOM elements only once.

```js
let btn;

function setup() {
  fab = createFab();
  createCanvas(400, 400, WEBGL);
  if (!btn) {
    btn = createButton('Print');
    btn.mousePressed(() => fab.print());
  }
}
```

Or move DOM element creation entirely into `draw()` with the same guard pattern.