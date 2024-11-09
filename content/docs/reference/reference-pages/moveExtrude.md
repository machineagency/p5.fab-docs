---
title: "Move Extrude"
bookHidden: true
---

<h2 class="ref-header">moveExtrude()</h2>
Move directly to an absolute (x,y,z) position while extruding material. Default extrusion amounts are calculated if not specified.

### Syntax
```
fab.moveExtrude(x, y, z, [velocity], [extrusion], [multiplication])
```

### Parameters
<div class="grid-container">
 <div class="grid-item">x</div>
 <div class="grid-item">Number, the x position to move to (in current units, mm by default)</div>

 <div class="grid-item">y</div>
 <div class="grid-item">Number, the y position to move to (in current units, mm by default)</div>

 <div class="grid-item">z</div>
 <div class="grid-item">Number, the z position to move to (in current units, mm by default)</div>

 <div class="grid-item">v</div>
 <div class="grid-item">v: Number, optional. The speed to move at (in current units/sec, inherited or 25 mm/sec by default)</div>

<div class="grid-item">extrusion</div>
 <div class="grid-item">Number, optional. Interpreted as either (a) the total amount of filament to be deposited over the move, or (b) a multiplication value to modify default caluclations, depending on value of `[multiplication]` parameter</div>

<div class="grid-item">multiplication</div>
 <div class="grid-item">Boolean, optional. If true, `extrusion` value is used as a multiplication modifier to default extrusion calculation. If fase, `extrusion` value is used a total amount of filament to deposit in mm. False by default.</div>
</div>