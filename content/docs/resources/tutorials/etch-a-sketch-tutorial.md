---
title: "Etch A Sketch"
bookHidden: true
---
<script src="https://kit.fontawesome.com/c412915ffb.js" crossorigin="anonymous"></script>

# Etch A Sketch
Instead of modifying toolpaths design asynchronously, we can try sending commands continuously to the machine. This tutorial will talk through a simple 'etch a sketch' example using a MIDI controller.

## Step 0: Gather Materials
You'll need:
- A 3D printer + filament
- a USB cable to connect your computer to your printer 
- A MIDI controller + USB cable

## Step 1: Define MIDI inputs 
Go to the <a href="https://bsubbaraman.github.io/test-interface/" target="_blank"> online editor</a> and open the 'etch-a-sketch' example. Connect to your MIDI device, but don't connect to your printer yet (unplug it if you have).

In this example, we're going to use 4 continuous inputs (knobs/sliders) and one button. The continuous inputs will be used to control X/Y/Z postions and speed, the button will be used to toggle extrusion. Choose buttons and knobs on your MIDI controller to use, then edit the `midiData.note ==` lines in the example sketch accordingly and run the code (Shift+Enter).

## Step 2: Toggling Extrusion
For our etch a sketch, we'll toggle between extruding and just moving around with a button press. Confirm your button press functionality by pressing your button and monitoring the MIDI info pane. You might notice that the value changes from 127 to 0 on depression/release, or that the Type changes, or that there are only message sent on button presses. If necessary, edit the if statement on line 63 to match up with your button functionality so that you can toggle the value of `extrudeToggle`. You can open your console (Cmd+option+i or more tools-->developer tools in your browser) to check the value. 


## Step 3: Print
Connect to your print and start the print: the machine will home and set temperatures (as defined in `fabDraw`). Then, you can use your knobs to move the machine around. Press your button to start extruding; make sure you raise the z height up a little bit so filament can exit the nozzle.