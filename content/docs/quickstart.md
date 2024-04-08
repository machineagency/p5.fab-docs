---
title: "Quickstart"
weight: 1
---

## <span class="fab">p5.fab</span> Quickstart
Here are a couple of ways to get started with <span class="fab">p5.fab</span>.
### Online Editor
1. Using Chrome[^1], open the [online editor](https://machineagency.github.io/p5.fab/editor/index.html).
2. Design your artifact! You can start from one of the examples; try changing some of the values in the sketch to see what happens to the resulting object.
3. Physically connect your computer to your fabrication machine[^2] with a USB cable and click 'Connect'.
4. Start making! Press 'Print' to start streaming commands to your machine. Be sure to keep an eye out for anything that goes wrong; there's no guarantee that your code will 'work' in any conventional sense, but that's part of the fun!

[^1]: We use serial communication to communicate with the machine; Chrome is the only browser which supports [WebSerial](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API), which let's us get up and running even quicker!
[^2]: Check out the <a href="docs/machine-compatibility.md">Machine Compatability Page</a> for more information on what machines are currently supported.


### Alternative Option: Local Installation
If you'd like to use your preferred code editor while using <span class='fab'>p5.fab</span>:
1. Download the <a href="https://github.com/machineagency/p5.fab/blob/main/lib/p5.fab.js">p5.fab.js library file</a> and add the path to the `<head>` tag of your `index.html` file:

    `<script src="p5.fab.js"></script>`

    You should also add it's dependencies, the p5.js library and the webserial communication:

       <script src="https://cdn.jsdelivr.net/npm/p5@1.9.2/lib/p5.js"></script>
       <script src="https://unpkg.com/p5-webserial@0.1.1/build/p5.webserial.js"></script>

2. Run a local server; this is required for communicating between the machine and your computer. See <a href="https://github.com/processing/p5.js/wiki/Local-server">this guide</a> for details on how to do this!
3. Open your sketch in Chrome[^1] and start making!