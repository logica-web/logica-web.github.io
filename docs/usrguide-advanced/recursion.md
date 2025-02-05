---
outline: deep
---
# Recursion

Logica does allow recursion, for example given predicate `Parent` we can find acnestors
via rules:

```
Ancestor(x, y) :- Parent(x, y);
Ancestor(x, z) :- Parent(x, y), Ancestor(y, z);
```

Recursion is only allowed for concrete predicates in Logica. Recursive predicates are computed
via iteration, starting from an empty predicate and applying the rules a fixed number of steps,
which is 8 (eitght) by default. For example predicate `N` defined as

```
N(0);
N(n + 1) :- N(n);
```

evaluates to

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

You can change the number of recursion iterations with `@Recursive` annotation. So to make `N` contain all numbers
upto 20 one would need to define it as


```
@Recursive(N, 20);
N(0);
N(n + 1) :- N(n);
```

For iteration to kick-off predicate in DNF should have a disjunct that is not recursive. Which means it either needs to
be defined via multiple rules, at least one of which is non-recursive, or be defined via a disjunction, where at least
one disjunct is not recursive. For instance `Ancestor` can also be defined as:

```
Ancestor(x, z) distinct :- Parent(x, z) | Parent(x, y), Ancestor(y, z);
```

Aggregation is fine in recursive predictes. We just need to make sure that it is a well defined predicate, that is
signature of all rules is the same.
For example if `E(a, b)` is a predicate represending an
edge going from `a` to `b` in a directed graph, then we can find the length `D(x, y)` of the shortest path
between `x` and `y`, aka distance, as follows.

```
D(x, y) Min= 1 :- E(x, y);
D(x, z) Min= D(x, y) + D(y, z);
```

First rule states that if there is an edge from x to y then distance is 1 or less.
It will never be less, but we are using Min aggregation operator to be compatible with the second rule.
The second rule states that distance is subject to triangle inequality.


Using functional value for aggregation, like in the example above is often
helping readability. Of course, you are free to use aggregation of positional arguments as well.

Let us extend the example to also find the shortest path in the named argument `path`.
It is convenient to store the path excluding the final destination because in this case
paths before and after mid-point simply concatenate to the path from source to target. We leave it as a
simple exersice to the reader to write a post-processing predicate that holds the full path.

```
D(x, y, path? ArgMin= [x] -> 1) Min= 1 :- E(x, y);
D(x, z, path? ArgMin= ArrayConcat(path1, path2) -> d) Min= d :-
  d = D(x, y, path: path1) + D(y, z, path: path2);
```

First rule states that if there is an edge from `x` to `y` then you just go through `x` 
efore getting to your destination. Second rule states that if there is a path from `x` to `y`
and a path from `y` to `z` then path from `x` to `z` is concatenation of paths.
