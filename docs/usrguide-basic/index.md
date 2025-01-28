---
outline: deep
---
# Logica Basics

## Predicates

Predicate is a statement with variables. Application of predicate to a given variables/expressions/constants is called predicate call.

Example 1: Let `Parent(x, y)` stand for "x is a parent of y". Then:

* `Parent("Adam", "Abel")` is true.
* `Parent("Philip of Macedon", "Alexander of Macedon")` is true.
* `Parent("Philip of Macedon", "Julius Caesar")` is false.

Example 2: Let `NumLegs(x, y)` stand for "x has y legs." Then

* `NumLegs("cat", 4)` is true.
* `NumLegs("black widow spider", 4)` is false.

Logic program is a collection of _rules_. These rules define predicates.

## Facts

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

## Implications

Rules can specify how to derive new facts from known ones. These rules rules of derivation are called _implications_.

Implication has form: `<conclusion> :- <condition>`.

Implications state conditions under which a predicate holds for a tuple of values given that some predicates already hold for come tuples of values.

Example 1: To state "X is grandparent of Z if X is a parent of parent of Z." in Logica we would write:

```
Grandparent(x, z) :- Parent(x, y), Parent(y, z);
```

Example 2: To state "X is quadropod if it has 4 legs" in Logica we would write:

```
Quadropod(x) :- NumLegs(x, 4);
```

Example 3: x is sibling of y if they are children of the same parent.

```
Sibling(x, y) :- Parent(z, x), Parent(z, y);
```

Example 4: x is close relative of y if x is a parent, a child, or a sibling of y.

```
CloseRelative(x, y) :-
  Parent(x, y) |
  Parent(y, x) |
  (Parent(z, x), Parent(z, y));
```

Multiple rules for a predicate are allowed. Multiple rules are equivalent to a single rule which body is disjunction of bodies of those.

Example 5. Equivalent to _Example 4_.
"`x` is close relative of `y` if `x` is parent of `y`. `x` is close relative of `y` if `x` is child of `y`.
`x` is close relative of `y` if `x` is a sibling of `y`."

```
CloseRelative(x, y) :- Parent(x, y);
CloseRelative(x, y) :- Parent(y, x);
CloseRelative(x, y) :- Parent(z, x), Parent(z, y);
```

:::tip
Logica is case-sensitive and case is used for semantics:
Variables are to be latin lower_case: `x`, `y`, `my_variable`.
Predicates are to be CamelCase starting with capital: `P`, `Q`, `MyPredicate`
:::