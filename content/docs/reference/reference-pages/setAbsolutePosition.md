---
title: "Set Absolute Position"
bookHidden: true
---

<h2 class="ref-header">setAbsolutePosition()</h2>
Set coordinates to absolute positioning, relative to the origin of the machine (using a <code>G90</code> command).

Note that <code>G90</code> behaviour differs depending on firmware. For example, Marlin will set the extruder to absolute position as well, whereas Duet does not. To set absolute/relative position of dimensional and extruder positions independently, see <a href="../setAbsolutePositionXYZ" class="ref-item">setAbsolutePositionXYZ()</a>, <a href="../setRelativePositionXYZ" class="ref-item">setRelativePositionXYZ()</a>, <a href="../reference-pages/setEAbsolute" class="ref-item">setEAbsolute()</a>, & <a href="../reference-pages/setERelative" class="ref-item">setERelative()</a>.

### Syntax
```
fab.setAbsolutePosition()
```

### Parameters
None