---
title: "Fab"
bookHidden: true
---

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