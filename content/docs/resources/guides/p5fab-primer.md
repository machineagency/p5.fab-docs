---
title: "p5.fab Primer"
bookHidden: true
---

## <span class="fab">p5.fab</span> Primer
This page provides an introduction to using <span class="fab">p5.fab</span>. If you’re new to digital fabrication and/or creative code and want some more context for the information presented here, check out the <a href="../dfab-intro">digital fabrication</a> and <a href="../cc-intro">creative coding</a> introductions. 

### Anatomy of a <span class="fab">p5.fab</span> Sketch
<span class="fab">p5.fab</span> adds to the default `setup()` and `draw()` functions a `fabDraw()` function. `fabDraw()` is run once, immediately after setup and before the first draw loop, and is where any code which generates toolpath should go! A typical sketch will look something like this:

{{< highlight javascript >}}
let fab;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL); // we need to use WEBGL mode to draw 3D things
    fab = createFab(); // fab represents our machine
}

function fabDraw() {
    // fabDraw will be run immediately after the setup function!
    // Machine control commands will go here
}

function draw() {
    background(255); // a solid white background
    fab.render();
}
{{< / highlight >}}

In this example sketch, we declare a `fab` variable and use `createFab` to instantiate a fab object. By default, this will use default values for a Creality Ender3 3D printer. In `createCanvas`, we use WEBGL mode to support 3D shapes; then in `draw()`, we use the built-in `fab.render()` to show a simple visualization of our toolpaths. Since our `fabDraw()` loop is empty, this sketch would show and empty work envelope for now.

### Moving, Grooving, and Extruding
Let's send some toolpath commands for 3D printing! Most of the time, we'll want to send a few starting commands:

{{< highlight javascript >}}
function fabDraw() {
    // Set the machine up for printing
    fab.setAbsolutePosition(); // set all axes (x/y/z/extruder) to absolute
    fab.setERelative(); // put extruder in relative mode, independent of other axes
    fab.autoHome();
    fab.setTemps(205, 60); // (nozzle, bed) °C - you should use a temperature best suited for your material
}
{{< / highlight >}}
The first two commands will explicitly set the machine into absolute positioning mode, and use relative mode for the extrusion axis. This is worth doing in case your machine ended in a different mode in whatever you were last doing. Then, we'll home the machine and wait for the nozzle and bed to heat up to the specified temperatures.

Now we're ready to send some movement commands! Let's move to the point (100, 100, 0.2) on the bed; we choose 0.2 for the height because this is approximately a good starting height to lay filament down on the bed[^1]:

{{< highlight javascript >}}
function fabDraw() {
    // Set the machine up for printing
    fab.setAbsolutePosition();
    fab.setERelative();
    fab.autoHome();
    fab.setTemps(205, 60);
 
    // Now move around!
    fab.move(100, 100, 0.2); // (x, y, z)
}
{{< / highlight >}}
If you were to send this code to your machine, you should see the printer (1) autohome, (2) get up to temperature, and then (c) move to the (x, y, z) point (100, 100, 1). All movement commands will use a default speed of 20 mm/sec.  If we want to move to the center of the bed, we can also access the machine's `maxX` and `maxY` properties: 

{{< highlight javascript >}}
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
{{< / highlight >}}

where `createVector` is <a href="https://p5js.org/reference/#/p5/createVector">a handy p5.js function</a>.While moving, we might find that a bit of filament oozes out of the nozzle. This is because filament might melt and fall out of the hot nozzle. To prevent this, we can instead use a `moveRetract()` command which will pull the filament away from the nozzle. We can also try moving a bit faster:


{{< highlight javascript >}}
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
{{< / highlight >}}

`moveRetract` will pull the filament away from the nozzle before moving, and then restore the position (or 'prime') once it arrives at its destination. By contrast, `moveExtrude` will lay down filament along the specified path. By default, it will calculate the amount of filament needed based on the distance and the nozzle & filament diameter:

{{< highlight javascript >}}
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
{{< / highlight >}}

Now, we should have a 100mm line of filament printed on the bed! The `presentPart()` command will push the bed plate out and the hotend up so that it's easy to grab the printed part when complete.


### Next Steps
We're ready to 3D print an object now! Jump to the <a href="../../tutorials/cube-tutorial">printing a cube</a> tutorial for some more details on 3D printing with <span class="fab">p5.fab</span>.

[^1]: In practice, you'll have to find a start height that works well for you based on your bed leveling, filament & nozzle diameter, etc. Typically, a height of 0 is too close to the bed (filament can't get out of the nozzle), and too large a value means the filament won't stick to the bed.