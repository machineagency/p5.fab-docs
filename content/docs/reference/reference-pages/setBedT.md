---
title: "Set Bed Temp"
bookHidden: true
---

<h2 class="ref-header">setBedT()</h2>
Set the printer's bed temperature. By default, this command will wait for the nozzle temperature to reach the target temperature.

Most firmware won't wait for temperatures less than 40C since they will never be reached due to ambient temperature.

### Syntax
```
fab.setBedT(temperature, [wait])
```

### Parameters
<div class="grid-container">
 <div class="grid-item">temperature</div>
 <div class="grid-item">Number, the temperature to heat the bed to in degrees Celcius</div>

 <div class="grid-item">wait</div>
 <div class="grid-item">Boolean, optional, parameter to wait for the target temperature to be reached before proceeding. True by default.</div>
</div>