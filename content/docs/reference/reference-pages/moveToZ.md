---
title: "MoveToZ"
bookHidden: true
---

<h2 class="ref-header">moveToZ()</h2>
Move directly to an absolute Z position without extruding material.

### Syntax
```
fab.moveToZ(z, [velocity])
```

### Parameters
<div class="grid-container">
 <div class="grid-item">z</div>
 <div class="grid-item">Number, the z position to move to (in current units, mm by default)</div>

 <div class="grid-item">v</div>
 <div class="grid-item">v: Number, optional. The speed to move at (in current units/sec, inherited or 25 mm/sec by default)</div>
</div>