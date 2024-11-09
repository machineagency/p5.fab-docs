---
title: "Move To"
bookHidden: true
---

<h2 class="ref-header">moveTo()</h2>
Move directly to an absolute (x,y,z) position without extruding material.

### Syntax
```
fab.moveTo(x, y, z, [velocity])
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