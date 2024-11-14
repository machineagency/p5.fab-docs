---
title: "Interactive Cube"
bookHidden: true
---

# Interactive Cube

## Step 0: Gather Materials
You'll need:
- A 3D printer + filament
- a USB cable to connect your computer to your printer 
- A MIDI controller + USB cable

## Step 1: Connect a MIDI controller
Go to the <a href="https://bsubbaraman.github.io/test-interface/" target="_blank"> online editor</a> and open the 'interactive cube' tutorial. 


## Step 2: The midiSetup and midiDraw functions
The code in `fabDraw` is the same as the normal cube example, but now we've added `midiSetup` and `midiDraw` loops. 

The `midiSetup()` function is run everytime data from the midi controller arrives. 
