# Transitive Closure (TC)

## Problem Definition

Given a directed graph represented by an edge relation `Edge(x, y)`, compute the transitive closure - all pairs of nodes `(x, y)` such that there exists a path from `x` to `y` in the graph.

## Test Data

```
# A simple directed graph
Edge("a", "b");
Edge("b", "c");
Edge("c", "d");
Edge("d", "e");
Edge("a", "c");  # This edge creates a shortcut from a to c
Edge("b", "d");  # This edge creates a shortcut from b to d
```

## Solution

```
# Base case: If there is a direct edge from x to y, then y is reachable from x
TC(x, y) :- Edge(x, y);

# Recursive case: If x can reach z and z can reach y, then x can reach y
TC(x, y) :- TC(x, z), TC(z, y);
```

## Expected Results

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

These results represent all pairs of nodes (x, y) where there exists a path from x to y in the graph.



