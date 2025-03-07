---
outline: deep
---
# Multiset Semantics

Logica, as well as most other logic programming languages follows multiset semantics.That there is no ordering of rows in predicates, but  each row may occur 1, or many times in the predicate.

## 
Number of occurrences of a row is called _multiplicity_.

Example 1: Predicate `Fruit` defined with facts

```
Fruit("apple");
Fruit("apple");
Fruit("orange");
Fruit("banana");
Fruit("banana");
Fruit("banana");
```

evaluates to

```
+--------+
| col0   |
+--------+
| apple  |
| apple  |
| orange |
| banana |
| banana |
| banana |
+--------+
```

Disjunction sums multiplicities.

Example 2: Predicate `OurFruit` defined as

```
MyFruit("apple");
MyFruit("banana");

YourFruit("apple");
YourFruit("orange");

OurFruit(x) :- MyFruit(x) | YourFruit(x);
```

evaluates to

```
+--------+
|  col0  |
+--------+
| apple  |
| banana |
| apple  |
| orange |
+--------+
```


Conjunction multiplies multiplicities.

To illustrate the concept we will use an abstract predicate this time.

Example 3: Predicate `Q` defined as

```
Q("a", "b");
Q("a", "b");
Q("x", "y");

R("b", "t");
R("b", "t");
R("b", "t");

P(x, z) :- Q(x, y), R(y, z);
```

evaluates to

```
+------+------+
| col0 | col1 |
+------+------+
| a    | t    |
| a    | t    |
| a    | t    |
| a    | t    |
| a    | t    |
| a    | t    |
+------+------+
```

Multiset semantics is natural for applications.

Disjunction is anaolgous to consequent for loops while conjunction is analogous to nested loops.

For example program 
```
C(x) :- A(x) | B(x);
```

acts like Python program

```
C = []
for x in A:
  C.append(x);
for x in B:
  C.append(x);
```

And program

```
C(x) :- A(x), B(x);
```

Acts like:

```
C = []
for x1 in A:
  for x2 in B:
    if x1 == x2:
      C.append(x1)
```
