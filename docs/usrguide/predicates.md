---
outline: deep
---

# Predicates

Predicate is a statement with variables. Application of predicate to a given variables/expressions/constants is called predicate call.

Example 1: Let `Parent(x, y)` stand for "x is a parent of y". Then:

* `Parent("Adam", "Abel")` is true.
* `Parent("Philip of Macedon", "Alexander of Macedon")` is true.
* `Parent("Philip of Macedon", "Julius Caesar")` is false.

Example 2: Let `NumLegs(x, y)` stand for "x has y legs." Then

* `NumLegs("cat", 4)` is true.
* `NumLegs("black widow spider", 4)` is false.

Logic program is a collection of _rules_. These rules define predicates.