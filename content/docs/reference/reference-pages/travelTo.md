---
title: "Travel To"
bookHidden: true
---

<h2 class="ref-header">travelTo()</h2>
Travel directly to an absolute (x,y,z) position with a z-hop (popping the nozzle away from the bed before moving, and restoring z position upon arrival), without extruding material.

The hop distance is set in the current working units, and is 2mm by default. Edit this value in the printer configuration.

### Syntax
```
fab.travelTo(x, y, z, [velocity])
```

### Parameters
<div class="grid-container">
 <div class="grid-item">x</div>
 <div class="grid-item">Number, the x position to move to (in current units, mm by default)</div>

 <div class="grid-item">y</div>
 <div class="grid-item">y: Number, the y position to move to (in current units, mm by default)</div>

 <div class="grid-item">z</div>
 <div class="grid-item">Number, the z position to move to (in current units, mm by default)</div>

 <div class="grid-item">v</div>
 <div class="grid-item">v: Number, optional. The speed to move at (in current units/sec, inherited or 25 mm/sec by default)</div>
</div>
