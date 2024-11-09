---
title: "Set Temps"
bookHidden: true
---

<h2 class="ref-header">setTemps()</h2>
Set the printer nozzle and bed temperature at the same time. By default, this command will wait for the temperatures to reach the target temperature. This command is faster than setting the nozzle and bed temperatures independently, as both will heat simultaneously.

Most firmware won't wait for temperatures less than 40C since they will never be reached due to ambient temperature.

### Syntax
```
fab.setTemps(nozzleTemperature, bedTemperature, [wait])
```

### Parameters
<div class="grid-container">
 <div class="grid-item">nozzleTemperature</div>
 <div class="grid-item">Number, the temperature to heat the nozzle to in degrees Celcius</div>

 <div class="grid-item">bedTemperature</div>
 <div class="grid-item">Number, the temperature to heat the bed to in degrees Celcius</div>

 <div class="grid-item">wait</div>
 <div class="grid-item">Boolean, optional parameter to wait for the target temperature to be reached before proceeding. True by default.</div>
</div>