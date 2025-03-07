---
outline: deep
---
# Multiset Semantics

Logica, like most other logic programming languages, follows multiset semantics. This means there is no ordering of rows in predicates, and each row may occur one or more times in the predicate.

## Multiplicity
The number of occurrences of a row is called its _multiplicity_.

**Example:** Consider the predicate `Fruit` defined with the following facts:

```
Fruit("apple");
Fruit("apple");
Fruit("orange");
Fruit("banana");
Fruit("banana");
Fruit("banana");
```

This evaluates to:

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

Here, "apple" has a multiplicity of 2, "orange" has a multiplicity of 1, and "banana" has a multiplicity of 3.

## Disjunction Sums Multiplicities

Disjunction in Logica combines the results of two predicates, summing their multiplicities.

**Example:**

```
MyFruit("apple");
MyFruit("banana");

YourFruit("apple");
YourFruit("orange");

OurFruit(x) :- MyFruit(x) | YourFruit(x);
```

This evaluates to:

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

Here, "apple" appears twice because it is present in both `MyFruit` and `YourFruit`.

## Conjunction Multiplies Multiplicities

Conjunction in Logica combines predicates by multiplying their multiplicities.

**Example:** Consider the predicates `Q` and `R` defined as:

```
Q("a", "b");
Q("a", "b");
Q("x", "y");

R("b", "t");
R("b", "t");
R("b", "t");

P(x, z) :- Q(x, y), R(y, z);
```

This evaluates to:

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

Here, the multiplicity of the pair ("a", "t") is 6 because "a" appears twice in `Q` and "t" appears three times in `R`.

## Multiset for Applications

Multiset semantics is natural for applications. Disjunction is analogous to consecutive for-loops, while conjunction is analogous to nested loops.

### Disjunction
For example, the program:

```
C(x) :- A(x) | B(x);
```

acts like the Python program:

```python
C = []
for x in A:
  C.append(x)
for x in B:
  C.append(x)
```

### Conjunction

And the program:

```
C(x) :- A(x), B(x);
```

acts like:

```python
C = []
for x1 in A:
  for x2 in B:
    if x1 == x2:
      C.append(x1)
```

## From Multisets to Sets

The keyword `distinct` makes a predicate represent a set, ensuring each row occurs exactly once.

**Example:**

```
MyFruit("apple");
MyFruit("banana");

YourFruit("apple");
YourFruit("orange");

OurFruitSet(x) distinct :- MyFruit(x) | YourFruit(x);
```

This evaluates to:

```
+--------+
| col0   |
+--------+
| apple  |
| banana |
| orange |
+--------+
```

Here, each fruit appears only once, regardless of how many times it appears in `MyFruit` or `YourFruit`.