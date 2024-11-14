---
title: "Print"
bookHidden: true
---

<h2 class="ref-header">print()</h2>
Start streaming commands to the printer. This is what e.g. the 'start print' button in the online editor calls to start printing. 

All commands in `fabDraw` are added to a queue to be sent to the machine. `print()` will send commands until this queue is empty. By default, this queue will refresh with your `fabDraw` commands upon completion. To only run `fabDraw` once, see <a href="../continuous-mode">continuous mode</a>.

### Syntax
```
fab.print()
```

### Parameters
None