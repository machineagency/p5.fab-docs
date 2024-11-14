---
title: "Interactive Cube"
bookHidden: true
---
<script src="https://kit.fontawesome.com/c412915ffb.js" crossorigin="anonymous"></script>

# Interactive Cube

We can use a MIDI controller to interactively edit commands as they're being sent to the machine. This tutorial will walk through and example to change the print speed, extrusion, and deposition height of a simple cube.

## Step 0: Gather Materials
You'll need:
- A 3D printer + filament
- a USB cable to connect your computer to your printer 
- A MIDI controller + USB cable

## Step 1: Connect a MIDI controller
Go to the <a href="https://bsubbaraman.github.io/test-interface/" target="_blank"> online editor</a> and open the 'interactive cube' example. Connect to your printer as usual; then press the <i class="fa-solid fa-music"></i> icon to open the MIDI info pane. Connect your MIDI controller over USB and press 'connect'. It should automatically connect to your MIDI controller, and the connection status should now read 'connected'.

Try turning different knobs and pressing buttons on the MIDI controller. You should see some incoming data in the info pane:

- Note: A unique ID for the button/slider/knob 
- Value: a number between 0-127. 
- Type: Some MIDI devices send additional info for some inputs

Different MIDI controllers might have slightly different behaviours to watch out for, especially around button presses: some send a value of 127 when a button is pressed and 0 when it is released; others always use a value of 127 but send a different 'type' when depressed/released; and others don't register release at all.  


## Step 2: midiSetup()
The code in `fabDraw` is the same as the normal cube example, but now we've added `midiSetup` and `midiDraw` loops. 

The `midiSetup()` function is run whenever data from the MIDI controller arrives. We can access the incoming data, e.g. `midiData.note`, `midiData.value`, `midiData.type`. The `midiController` object is created automatically, and we can use it to keep track of incoming data by connecting any incoming data to custom properties on this object:

{{< highlight javascript >}}
if (midiData.note == 16) { 
    midiController.speed = midiData.mapValue(10, 60); // values in mm/sec
}
{{< / highlight >}}

This code creates a property called `speed` and stores incoming data from MIDI input with id 16. The `mapValue` is a convenience function to map incoming data from the default range of 0-127 to something usable in your interactive print. Here, we'll plan to use the incoming data to edit the print speed, so we're mapping values to a range of 10-60 millimeters per second.

In this example, we are editing speed, extrusion, and deposition height. Choose 3 knobs/sliders on your MIDI input and make sure that the note values match the values in the `midiSetup` function. Make sure you run the code (Shift+Enter) after making changes.

## Step 3: midiDraw()
Any GCode move commands being sent to the machine will first pass through the `midiDraw` function. Here we can use the incoming MIDI data to modify commands.

Move commands (i.e. `G0` and `G1` commands) are sent in the form:

```X<x_position> Y<y_position> Z<z_position> E<extrusion_amount> F<speed_to_move>```

In `midiDraw`, we can access each of these fields: `moveCommand.x`, `moveCommand.y`, and so on. We can modify any fields as we'd like:

{{< highlight javascript >}}
 if (midiController.speed) {
    // the GCode will use mm/min
    moveCommand.f = mmPerMin(midiController.speed);
}
{{< / highlight >}}

In this example, we overwrite any existing speed with a new speed set by the MIDI controller. Note that in GCode, speeds are set in mm/min, not mm/sec. Since we used mm/sec as our unit in step 2, we use the `mmPerMin` function to convert to mm/min. In the interactive cube example, we also modify extrusion using an extrusion multiplier value (`moveCommand.e *= midiController.extrusionMultiplier`) and modify the deposition height (` moveCommand.z += midiController.zOff`).  

## Step 4: Print!
Start the print, and try chaging the knobs you've set!


## Step 5: Troubleshooting
- If your printer is slow to respond to input or is stalling:

To modify commands interactively, and GCode commands are being subdivided into a bunch of smaller ones (e.g. sending 200 1mm commands instead of 1 200mm command). The default subdivision length is 1mm; if you're printing very slowly, you may want to decrease the subdivision length the get a more realtime response. To do so, change `fab.segmentationLength` to something <1. On the other hand, if you're printing very fast, you might be noticing buffer underruns where the printer is executing commands faster than it recieves them. Try increasing the segmentation length to accommodate.

## Next Steps
- <a href="../etch-a-sketch-tutorial">Etch a sketch</a> tutorial