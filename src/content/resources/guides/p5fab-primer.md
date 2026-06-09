---
title: "p5.fab Primer"
---

# p5.fab Primer
This page provides an introduction to using p5.fab. If you’re new to digital fabrication and/or creative code and want some more context for the information presented here, check out the <a href="../dfab-intro">digital fabrication</a> and <a href="../cc-intro">creative coding</a> introductions.

### Sending commands
There are two ways to use p5.fab to control a machine: using a direct serial connection, or standalone printing using an SD card/USB drive.

**Live serial connection:** Many printers can accept GCode commands over a wired USB connection; look for a USB port somewhere on the machine. The copypastes.xyz editor supports connecting to the machine and streaming commands over serial. See the [editor guide](/resources/guides/editor-guide) for details. In general, using a live serial connection can speed up prototyping times by removing the need to transfer files. There are also helpful checks and hints built into the editor that leverage live data from the machine. Note that if the connection is lost, the print will stop; you may need to change your computer's sleep settings for longer prints.

**Standalone**: Some machines don't accept commands over serial (e.g. Bambu Labs and Ultimaker machines)[^1]. You can also download the generated GCode from the copypastes editor and transfer it to a printer on an SD card or USB drive. If you're not sure which your machine uses, check your machine-specific documentation.

### Anatomy of a <span class="fab">p5.fab</span> Sketch
A typical p5.js sketch has a `setup()` function which runs once, and a `draw()` loop which runs continuously.p5.fab adds a `fabDraw()` function which is run once, immediately after setup and before the first draw loop. This is where you can write any code that will control the machine! The structure of a typical sketch will look something like this:

```javascript
function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL); // we need to use WEBGL mode to draw 3D things
}

function fabDraw() {
    // fabDraw will be run immediately after the setup function!
    // Machine control commands will go here
}

function draw() {
    background(255); // a solid white background
    fab.render();    // a visualization of the machine and commands
}
```

A global `fab` object is created automatically[^2].  By default, this will use generic values similar to that of a Creality Ender3 3D printer. In `createCanvas`, we use WEBGL mode to support drawing 3D shapes; then in `draw()`, we use the built-in `fab.render()` to show a simple visualization of our toolpaths. Since our `fabDraw()` loop is empty, this sketch would show and empty work envelope for now.

### Moving, Grooving, and Extruding
"Homing" the machine establishes the origin point (0,0,0). Before homing, be sure to clear off any objects on the print bed. Then, you can home the machine with the `authoHome()` command:

```javascript
function fabDraw() {
    // Home the machine
    fab.autoHome();
}
```
The machine should be homed at the beginning of any print. However, having to constantly re-home can become time consuming if you are in the midst of prototyping. The `autoHome()` command can be safely commented out after being run once. Note that if streaming commands over a wired serial connection, some older printers will reboot whenever a connection is established; the printer would need to be re-homed in these cases.

With the printer homed, we're ready to send some movement commands. There are two movement modes: absolute and relative. Absolute moves will move directly to the specified point on the machine. Relative moves will move relative to the current position. In p5.fab, methods ending in `To` use absolute coordinates (e.g. `moveTo`), while their counterparts without the suffix use relative coordinates (e.g. `move`). All commands assume units are in millimeters.

```javascript
function fabDraw() {
    // Set the machine up for printing
    fab.autoHome();

    fab.moveTo(100, 100, 5); // Move to the absolute position (100, 100, 5)
    fab.moveX(10);           // Move in X relative to the current position by 5mm.
                             // The machine will end up at X = 110mm
    fab.moveY(-5);           // Move -5mm in the Y direction
                             // The machine will end up at Y = 95mm
    fab.moveToZ(10);         // Move to the an absolute Z position of 10mm
}
```
There are move/moveTo variations for each axis; check the reference for a complete list.

To print a traditional thermoplastic like PLA, we have to heat up the nozzle and bed. `setTemps(nozzleTemp, bedTemp)` will set the target temperatures for the nozzle and bed respectively. Every material/brand of material requires its own temperature; check the manufacturer recommended settings for your filament. Like homing, heating up the machine needs to be done once before printing. If prototyping over a live serial connection, this line can be safely commented out to save time.

<!-- Let's move to the point (100, 100, 0.2) on the bed; we choose 0.2 for the height because this is approximately a good starting height to lay filament down on the bed[^3]:
```javascript
function fabDraw() {
    // Set the machine up for printing
    fab.autoHome();
    fab.setTemps(205, 60);

    // Now move around!
    fab.move(100, 100, 0.2); // (x, y, z)
}
```
If you were to send this code to your machine, you should see the printer (1) autohome, (2) get up to temperature, and then (c) move to the (x, y, z) point (100, 100, 1). All movement commands will use a default speed of 20 mm/sec.  If we want to move to the center of the bed, we can also access the machine's `maxX` and `maxY` properties:

```javascript
function fabDraw() {
    // Set the machine up for printing
    fab.setAbsolutePosition();
    fab.setERelative();
    fab.autoHome();
    fab.setTemps(205, 60);

    // Now move around!
    let center = createVector(fab.maxX/2, fab.maxY/2)
    fab.move(center.x, center.y, 0.2); // (x, y, z)
}
```

where `createVector` is <a href="https://p5js.org/reference/#/p5/createVector">a handy p5.js function</a>.While moving, we might find that a bit of filament oozes out of the nozzle. This is because filament might melt and fall out of the hot nozzle. To prevent this, we can instead use a `moveRetract()` command which will pull the filament away from the nozzle. We can also try moving a bit faster:


```javascript
function fabDraw() {
    // Set the machine up for printing
    fab.setAbsolutePosition();
    fab.setERelative();
    fab.autoHome();
    fab.setTemps(205, 60);

    // Now move around!
    let center = createVector(fab.maxX/2, fab.maxY/2)
    fab.moveRetract(center.x, center.y, 0.2, 30); // (x, y, z, speed in mm/s)
}
```

`moveRetract` will pull the filament away from the nozzle before moving, and then restore the position (or 'prime') once it arrives at its destination. By contrast, `moveExtrude` will lay down filament along the specified path. By default, it will calculate the amount of filament needed based on the distance and the nozzle & filament diameter:

```javascript
function fabDraw() {
    // Set the machine up for printing
    fab.setAbsolutePosition();
    fab.setERelative();
    fab.autoHome();
    fab.setTemps(205, 60);

    // Now move around!
    let center = createVector(fab.maxX/2, fab.maxY/2)
    fab.moveRetract(center.x, center.y, 1, 30); // (x, y, z, speed in mm/s)
    fab.moveExtrude(center.x + 100, center.y, 1, 30); // (x, y, z, speed in mm/s)

    fab.presentPart();
}
```

Now, we should have a 100mm line of filament printed on the bed! The `presentPart()` command will push the bed plate out and the hotend up so that it's easy to grab the printed part when complete.


### Next Steps
We're ready to 3D print an object now! Jump to the <a href="../../tutorials/cube-tutorial">printing a cube</a> tutorial for some more details on 3D printing with <span class="fab">p5.fab</span>.

[^1]: Development is onging to support interactive workflows with these machines. Stay tuned!
[^2]: See the documentation for [`createFab()`](/reference/createFab) if you want to e.g., name your fab object something else.
[^3]: In practice, you'll have to find a start height that works well for you based on your bed leveling, filament & nozzle diameter, etc. Typically, a height of 0 is too close to the bed (filament can't get out of the nozzle), and too large a value means the filament won't stick to the bed. -->
