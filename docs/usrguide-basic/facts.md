---
outline: deep
---
# Facts

Simplest rules are facts. Facts simply state that a certain predicate holds (i.e. is true) for those values.

For example Logica program may state:
```
Parent("Adam", "Abel");
Parent("Philip of Macedon", "Alexander of Macedon");
```

In Logica you specify at execution time which predicate you would like to produce.
Thus to see table of parent relationship you would run:
```
$ logica socrates.l run Parent
```
and get
```
+-------------------+----------------------+
|       col0        |         col1         |
+-------------------+----------------------+
| Adam              | Abel                 |
| Philip of Macedon | Alexander of Macedon |
+-------------------+----------------------+
```