---
title: "Move"
bookHidden: true
---

<h2 class="ref-header">move()</h2>
Move relative to the current position without extruding material.

### Syntax
```
fab.move(dx, dy, dz, [velocity])
```

### Parameters
<div class="grid-container">
 <div class="grid-item">dx</div>
 <div class="grid-item">Number, the relative x distance to move (in current units, mm by default)</div>

 <div class="grid-item">dy</div>
 <div class="grid-item">Number, the relative y distance to move (in current units, mm by default)</div>

 <div class="grid-item">dz</div>
 <div class="grid-item">Number, the relative z distance to move (in current units, mm by default)</div>

 <div class="grid-item">velocity</div>
 <div class="grid-item">Number, optional, the speed to move at (in current units/sec, inherited or 25 mm/sec by default)</div>
</div>