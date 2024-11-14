---
title: "Getting Started Tutorial"
bookHidden: true
---
<script src="https://kit.fontawesome.com/c412915ffb.js" crossorigin="anonymous"></script>

# Getting Started

I recommend using the online editor to get started. It lets you to write code, start/stop prints, connect to MIDI devices, and connect to a camera in one place.

## Step 0: Gather materials
You'll need:
- A 3D printer + filament
- Google Chrome browser
- a USB cable to connect your computer to your printer 

## Step 1: The online editor
Using Chrome, open the <a href="https://bsubbaraman.github.io/test-interface/" target="_blank"> online editor</a>. (We have to use Chrome because it's the only browser that supports WebSerial). It should look something like this:

<img src="../images/editor-thumbnail.png" width="100%">

The left side is a code editor, the right side shows a simple preview of your object. There are various menu items at the top:

- <i class="fa-solid fa-file"></i>: Open a blank code template
- <i class="fa-solid fa-download"></i>: Download the current code
- <i class="fa-solid fa-upload"></i>: Upload a js file
- <i class="fa-solid fa-book"></i>: Open an example
- <i class="fa-solid fa-play"></i>: Run the current code; this will not interrupt your machine connection
- <i class="fa-solid fa-rotate-right"></i>: Restart the sketch; this will interrupt the machine connection
- <i class="fa-solid fa-gear"></i>: Toggle the machine info pane
- <i class="fa-solid fa-music"></i>: Toggle the midi info pane
- <i class="fa-solid fa-video"></i>: Toggle the video info pane

Try changing the <code>sideLength</code> variable on line 11 to a new number, then press <i class="fa-solid fa-play"></i> (or Shift+Enter):

<video autoplay muted loop width="100%">
  <source src="../images/cube-resize.mp4" type="video/mp4" />
</video>

You'll see the code flash orange (indicating that you ran the code) and the preview update accordingly.

## Step 2: Add some code
Open a blank template with the <i class="fa-solid fa-file"></i> button. You'll see five default functions:

{{< highlight javascript >}}
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function fabDraw() {

}

function midiSetup() {

}

function midiDraw(moveCommand) {

  return moveCommand;
}

function draw() {
  background(255);
  fab.render();
}
{{< / highlight >}}

The `setup()` and `draw()` functions are from p5.js (see the <a href="https://p5js.org/" target="_blank">p5 reference</a> for more info). The `midiSetup()` and `midiDraw()` functions can be used to setup interactive modifications for prints. In the `fabDraw()` function, we'll write code to define our toolpaths. 

The `fab` object is created automatically and represents your machine. Add the following line to auto home:

{{< highlight javascript >}}
function fabDraw() {
  fab.autoHome();
}
{{< / highlight >}}

Run the code (Shift+Enter); you won't see the preview change, since there's no filament being laid down. You can find other commands in the <a href="../../../reference" target="_blank">reference</a>.

## Step 3: Connect + run
Connect your computer to your printer using a USB cable. Open the machine pane <i class="fa-solid fa-gear"></i> and press connect. You'll be prompted to choose a device:

<img src="../images/connect-to-machine.png" width="100%">

Choose the USB serial device (if there are multiple and you're not sure which one is the printer, try unplugging/replugging the cable and see which one reappears). The connection status in the machine pane should now say 'connected'.

Press start print in the machine pane, and the machine should home. Hooray!

## Step 4: Print a line
To print, we need to heat up the nozzle. We can set the nozzle and bed temperatures with `setTemps(<nozzleTemp>, <bedTemp>)`. To get filament flowing, we can use `introLine()` to draw purge lines on the left side of the bed. Then you can make absolute or relative moves as we'd like, e.g.:

{{< highlight javascript >}}
function fabDraw() {
  fab.autoHome();
  fab.setTemps(205, 60);

  // .2 mm is a reasonable first layer height for a .4mm nozzle
  // change this as needed!
  const printHeight = 0.2;
  fab.introLine(printHeight);
  fab.moveRetract(50, 50, printHeight);
  fab.extrudeX(100);
}
{{< / highlight >}}

You can find other commands in the <a href="../../../reference" target="_blank">reference</a>. Run the code to preview (Shift+Enter), then press start print to print your line :).

## Next Steps
 - <a href="../cube-tutorial">Printing a Cube</a>