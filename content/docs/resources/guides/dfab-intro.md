---
title: "A Gentle Introduction to Digital Fabrication"
bookHidden: true
---

## A Gentle Introduction to Digital Fabrication
This page provides a brief introduction to some key concepts in digital fabrication. It is by no means exhaustive, but provides helpful background information for newcomers to digital fabrication machines. If you’re already familiar with computer-controlled machines but want to learn a bit about creative coding, check out the <a href="../cc-intro">creative coding intro</a>, or if you want to learn how to make things with <span class="fab">p5.fab</span>, jump ahead to the <a href="../p5fab-primer">primer</a>.

<!-- ### Historical Context -->
<!-- Maybe I'll add this later -->

### The ABCs of CAD, CAM, & CNC
Digital fabrication is the process of using computer-controlled machines to create physical objects. This process might be additive (e.g. 3D printing), subtractive (e.g. milling, laser cutting), or something else entirely (e.g. using a liquid handling robot for science experiments). Typically, we would follow the following steps to make an object:

1. **Design a model.** Using computer-aided design (CAD) software, we first need to design the object we want to make. There are lots of different CAD softwares; popular options include Rhino, Fusion360, FreeCAD, and TinkerCAD. There are also websites where makers can share premade models, like <a href="https://www.thingiverse.com/">Thingiverse</a> for 3D printing.
2. **Choose fabrication settings.** Computer-aided manufacturing (CAM) software is used to plan the machines toolpaths--or the path the machine will take as it moves through space--based on the model. For 3D printing, this is called the 'slicer' since the model is divided into a series of flat, 2D contours which are stacked vertically. In the CAM software, we can choose a bunch of different settings depending on the machine we're using. For a 3D printer we can set how fast the machine should move and at what temperature should be set to melt the plastic; for a laser cutter, we can set the power of the laser.
3. **Run the machine.** The CAM software will generate instructions for the computer-numeric control (CNC) machine.

This process is incredibly powerful for a lot of use cases! There are a some drawbacks, though, which motivate the design of <span class="fab">p5.fab</span>. It's hard to experiment creatively with different settings, since existing software assumes you want to precicely replicate the same thing many times. If you want to change a model, you need to return back to your CAD software and start again. And it requires owning and learning CAD software. <span class="fab">p5.fab</span> tries to offer an alternate entry point into digital fabrication by way of creative coding, integrating toolpath design and machine execution into a single environment.

### G-Code
G-Code (or ‘geometry code’) is the standard language used by CNC machines[^1]. We can use G-Code to move the machine around! By default, the machine will use millimeter for its units. To move to the (x, y, z) position (100mm, 50mm, 200mm) using G-Code, we can use the command:

`G1 X100 Y50 Z200 ; move the the position (100, 50, 200)`

where G1 is the command for a ‘linear move’. Everything after the semicolon is a comment and is ignored by the machine. We could also set a speed to move at using an `F` parameter:

```
G1 X100 Y50 Z200 F6000 ; move the the position (100, 50, 200)
                       ; at a speed of 6000 mm/min`
```

The `F` parameter sets the feedrate, or speed, to move. Of course, these settings are subject to the physical realities. If your machine is only 300mm tall, then sending a `G1 Z500` will only move to a height of 300. Similarly, the machine might not be able to move as fast as you tell it to. G-Code is used in tandem with M-Codes (or ‘miscellaneous codes’) which control non-movement related functions. For example, the command `M203` will set the maximum speed which each axis can move.

Different machines might use slightly different sets (or 'flavors') of GCode. This depends on the control board which the machine uses (which turns G-Code commands into machine movements) and the firmware which the control board uses. <span class="fab">p5.fab</span> works with any machine running <a href="https://marlinfw.org">Marlin firmware</a>. This is the firmware that many companies (e.g. Creality, Prusa, Ultimaker) use on their machines, as well as various custom/open-source machines. For a complete list of G and M Codes supported on Marline, check out the <a href="https://marlinfw.org/meta/gcode/">G-Code Dictionary</a>.  

Already, you might see how tedious it would be to plan movements using GCode directly. <span class="fab">p5.fab</span> lets you use Javascript code to build up many commands.

### Coordinate Systems
To send the machine to a position to move to, the machine has to know where it is. This is accomplished by ‘homing’ the machine when you first power it on. Most machines have 3 dimensional axes (X, Y, & Z). Other machines might have more; a 3D printer also has an extruder, or E axis which tracks how much filament is being extruded.

Our G-Code movement commands can be interpreted as absolute or relative moves by the machine. In absolute positioning mode, the machine will move relative to the origin. In relative positioning mode, the machine will move relative to its last position. We can change our positioning mode using G-Codes: `G90` to use absolute positions and `G91` for relative. For example, say we start at the origin (0,0,0). Consider the following move commands:

```
; to start, we are at the origin (0,0,0)
G90              ; use absolute positioning
G1 X100 Y50 Z200 ; move to the absolute position (100, 50, 200)
G91              ; use relative positioning
G1 X100          ; move 100mm in X relative to the last position
```

In this example, the machine will end up at the position (200, 50, 200). Note that all subsequent commands will be in relative mode unless we explicitly return to absolute mode with a `G90` command.

[^1]: There are others, too! These are often machine-specific. For example, the popular AxiDraw pen plotter uses the <a href="https://evil-mad.github.io/EggBot/ebb.html">EBB</a> command set, or the ShopBot CNC machines uses <a href="https://www.shopbottools.com/ShopBotDocs/files/ComRef.pdf">SBP</a> codes.