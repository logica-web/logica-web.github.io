---
outline: deep
---
# Recursion


## Overview
Logica supports recursion but recursion in Logica is restricted to [Concrete Predicates](./functions.md). For example, given the predicate `Parent`, we can define ancestors using the following rules:

```
Ancestor(x, y) distinct :- Parent(x, y);
Ancestor(x, z) distinct :- Parent(x, y), Ancestor(y, z);
```
>[!caution]
> For recursive queries, it is advisable to always include the `distinct`.

Recursive predicates are computed iteratively, starting from an empty predicate and applying the rules for a fixed number of steps, which defaults to 8 in Logica. For instance, the predicate `N` defined as:

```
N(0);
N(n + 1) :- N(n);
```

evaluates to:

```
+------+
| col0 |
+------+
|    8 |
|    7 |
|    6 |
|    5 |
|    4 |
|    3 |
|    2 |
|    1 |
|    0 |
+------+
```

:::tip

For recursion to work, the predicate in Disjunctive Normal Form (DNF) must have at least one non-recursive disjunct. This means the predicate should either be defined using multiple rules, with at least one being non-recursive, or include a disjunction where at least one disjunct is non-recursive. For example, `Ancestor` can also be defined as:

```
Ancestor(x, z) distinct :- Parent(x, z) | Parent(x, y), Ancestor(y, z);
```
:::

## Recursive Settings

You can adjust the number of recursion iterations using the `@Recursive` imperative. For example, to make `N` include all numbers up to 20, you would define it as:

```
@Recursive(N, 20);
N(0);
N(n + 1) :- N(n);
```



## Aggregation in Recursion

Aggregation is allowed in recursive predicates, provided the predicate is well-defined, meaning all rules must share the same signature. For instance, if `E(a, b)` represents an edge from `a` to `b` in a directed graph, the shortest path length `D(x, y)` between `x` and `y` (also known as the distance) can be computed as follows:

```
D(x, y) Min= 1 :- E(x, y);
D(x, z) Min= D(x, y) + D(y, z);
```

The first rule specifies that if there is an edge from `x` to `y`, the distance is 1. The second rule enforces the triangle inequality by stating that the distance is the minimum sum of distances through intermediate nodes.

Using functional values for aggregation, as shown above, often improves readability. However, you are free to use positional argument aggregation as well.

To extend this example, we can also compute the shortest path and store it in the named argument `path`. It is convenient to store the path excluding the final destination, as this allows paths before and after a midpoint to concatenate into the full path from source to target. Writing a post-processing predicate to include the final destination is left as an exercise for the reader.

```
D(x, y, path? ArgMin= [x] -> 1) Min= 1 :- E(x, y);
D(x, z, path? ArgMin= ArrayConcat(path1, path2) -> d) Min= d :-
  d = D(x, y, path: path1) + D(y, z, path: path2);
```

The first rule states that if there is an edge from `x` to `y`, the path consists of just `x` before reaching the destination. The second rule specifies that if there is a path from `x` to `y` and another from `y` to `z`, the path from `x` to `z` is the concatenation of the two paths.
