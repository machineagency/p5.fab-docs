# Reference


## Fab
A class to describe a fabrication machine.

A `fab` object represents a 3D printer. It is comprised of the following information:
- `workEnvelope`: maximum X, Y, and Z dimensions of the machine
- `nozzleDiameter`: Diameter of the nozzle in mm
- `filamentDiameter`: Diameter of filament in mm
- `name`: a human readable string to identify this machine

### Syntax
```fab([config])```

### Parameters
- config: a json object specifying requisite machine information

---

## autoHome
Autohome the machine (with a `G28` command) and zero the extruder position (with a `G92 E0` command). 

### Syntax
```fab.autoHome()```

### Parameters
None

---

## setNozzleT
Set the printer's nozzle temperature. By default, this command will wait for the nozzle temperature to reach the target temperature.

Most firmware won't wait for temperatures less than 40C since they will never be reached due to ambient temperature.

### Syntax
```fab.setNozzleT(temperature, [wait])```

### Parameters
- temperature: Number, the temperature to heat the nozzle to in degrees Celcius
- wait: Boolean, optional parameter to wait for the target temperature to be reached before proceeding. True by default.

---

## setBedT
Set the printer's bed temperature. By default, this command will wait for the bed temperature to reach the target temperature.

Most firmware won't wait for temperatures less than 40C since they will never be reached due to ambient temperature.

### Syntax
```fab.setNozzleT(temperature, [wait])```

### Parameters
- temperature: Number, the temperature to heat the bed to in degrees Celcius
- wait: Boolean, optional parameter to wait for the target temperature to be reached before proceeding. True by default.

---

## setTemps
Set the printer nozzle and bed temperature at the same time. By default, this command will wait for the temperatures to reach the target temperature. This command is faster than setting the nozzle and bed temperatures independently, as both will heat simultaneously.

Most firmware won't wait for temperatures less than 40C since they will never be reached due to ambient temperature.

### Syntax
```fab.setTemps(nozzleTemperature, bedTemperature, [wait])```

### Parameters
- nozzleTemperature: Number, the temperature to heat the nozzle to in degrees Celcius
- bedTemperature: Number, the temperature to heat the bed to in degrees Celcius
- wait: Boolean, optional parameter to wait for the target temperature to be reached before proceeding. True by default.

---

## moveTo
Move directly to an absolute (x,y,z) position without extruding material.

### Syntax
```fab.moveTo(x, y, z, [velocity])```

### Parameters
- x: Number, the x position to move to (in current units, mm by default)
- y: Number, the y position to move to (in current units, mm by default)
- z: Number, the z position to move to (in current units, mm by default)
- v: Number, optional, the speed to move at (in current units/sec, 25 mm/sec by default)

---

## moveToX
Move directly to an absolute X position without extruding material.

### Syntax
```fab.moveToX(x, [velocity])```

### Parameters
- x: Number, the x position to move to (in current units, mm by default)
- v: Number, optional, the speed to move at (in current units/sec, 25 mm/sec by default)

---

## moveToY
Move directly to an absolute Y position without extruding material.

### Syntax
```fab.moveToY(y, [velocity])```

### Parameters
- y: Number, the y position to move to (in current units, mm by default)
- v: Number, optional, the speed to move at (in current units/sec, 25 mm/sec by default)

---

## moveToZ
Move directly to an absolute Z position without extruding material.

### Syntax
```fab.moveToZ(z, [velocity])```

### Parameters
- z: Number, the z position to move to (in current units, mm by default)
- v: Number, optional, the speed to move at (in current units/sec, 25 mm/sec by default)

---

## moveToE
Move directly to an absolute E position.

### Syntax
```fab.moveToE(e, [velocity])```

### Parameters
- e: Number, the e position to move to (in current units, mm by default)
- v: Number, optional, the speed to move at (in current units/sec, 25 mm/sec by default)

---

## move
Move relative to the current position without extruding material.

### Syntax
```fab.move(dx, dy, dz, [velocity])```

### Parameters
- dx: Number, the relative x distance to move (in current units, mm by default)
- dy: Number, the relative y distance to move (in current units, mm by default)
- dz: Number, the relative z distance to move (in current units, mm by default)
- v: Number, optional, the speed to move at (in current units/sec, 25 mm/sec by default)

---

## moveX
Move in X relative to the current position without extruding material.

### Syntax
```fab.moveX(dx, [velocity])```

### Parameters
- dx: Number, the relative x distance to move (in current units, mm by default)
- v: Number, optional, the speed to move at (in current units/sec, 25 mm/sec by default)

- dx: Number, the relative x distance to move (in current units, mm by default)

## moveY
Move in Y relative to the current position without extruding material.

### Syntax
```fab.moveY(dy, [velocity])```

### Parameters
- dy: Number, the relative y distance to move (in current units, mm by default)
- v: Number, optional, the speed to move at (in current units/sec, 25 mm/sec by default)

---

## moveZ
Move in Z relative to the current position without extruding material.

### Syntax
```fab.moveZ(dz, [velocity])```

### Parameters
- dz: Number, the relative z distance to move (in current units, mm by default)
- v: Number, optional, the speed to move at (in current units/sec, 25 mm/sec by default)

---

## moveE
Move in E relative to the current position.

### Syntax
```fab.moveE(de, [velocity])```

### Parameters
- de: Number, the relative e distance to move (in current units, mm by default)
- v: Number, optional, the speed to move at (in current units/sec, 25 mm/sec by default)

---

## travelTo
Travel directly to an absolute (x,y,z) position with a z-hop (popping the nozzle away from the bed before moving, and restoring z position upon arrival), without extruding material.

The hop distance is set in the current working units, and is 2mm by default. Edit this value in the printer configuration.

### Syntax
```fab.travelTo(x, y, z, [velocity])```

### Parameters
- x: Number, the x position to move to (in current units, mm by default)
- y: Number, the y position to move to (in current units, mm by default)
- z: Number, the z position to move to (in current units, mm by default)
- v: Number, optional, the speed to move at (in current units/sec, 25 mm/sec by default)

---

## moveExtrude
Move directly to an absolute (x,y,z) position while extruding material. Default extrusion amounts are calculated if not specified.

### Syntax
```fab.moveExtrude(x, y, z, [velocity], [extrusion], [multiplication])```

### Parameters
- x: Number, the x position to move to (in current units, mm by default)
- y: Number, the y position to move to (in current units, mm by default)
- z: Number, the z position to move to (in current units, mm by default)
- v: Number, optional, the speed to move at (in current units/sec, 25 mm/sec by default)
- extrusion:  Number, optional. Interpreted as either (a) the total amount of filament to be deposited over the move, or (b) a multiplication value to modify default caluclations, depending on value of `[multiplication]` parameter
- multiplication: Boolean, optional. If true, `extrusion` value is used as a multiplication modifier to default extrusion calculation. If fase, `extrusion` value is used a total amount of filament to deposit in mm. False by default.

---

