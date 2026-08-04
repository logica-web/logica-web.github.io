# Non-Linear Transitive Closure (NLTC)

## Problem Definition

Transitive closure can be computed with two different recursive strategies:

- **Linear recursion**: the recursive rule joins the closure so far with a single base `Edge` fact (`TC(x, z), Edge(z, y)`). Each iteration extends paths by exactly one hop.
- **Non-linear recursion**: the recursive rule joins the closure with *itself* (`TC(x, z), TC(z, y)`). Each iteration can double the length of the paths already discovered, similar to the "doubling" algorithm for computing reachability.

Both formulations compute the same relation, but the non-linear form typically needs far fewer recursive iterations to converge on graphs with long paths, which matters because Logica evaluates recursion for a bounded number of steps (8 by default, see [Recursion](/usrguide/recursion)).

## Test Data

```
Edge("a", "b");
Edge("b", "c");
Edge("c", "d");
Edge("d", "e");
Edge("a", "c");
Edge("b", "d");
```

## Solution

```
# Linear recursion: recursive step joins TC with a base Edge fact
LinearTC(x, y) distinct :- Edge(x, y);
LinearTC(x, y) distinct :- LinearTC(x, z), Edge(z, y);

# Non-linear recursion: recursive step joins TC with itself
NonLinearTC(x, y) distinct :- Edge(x, y);
NonLinearTC(x, y) distinct :- NonLinearTC(x, z), NonLinearTC(z, y);
```

## Expected Results

Both `LinearTC` and `NonLinearTC` evaluate to the same table:

```
+------+------+
| col0 | col1 |
+------+------+
| a    | b    |
| a    | c    |
| a    | d    |
| a    | e    |
| b    | c    |
| b    | d    |
| b    | e    |
| c    | d    |
| c    | e    |
| d    | e    |
+------+------+
```

The results are identical, but on graphs with long chains, `NonLinearTC` reaches the full closure in roughly `log(n)` iterations instead of `n`, since each step can combine two already-discovered paths rather than extending by a single edge.
