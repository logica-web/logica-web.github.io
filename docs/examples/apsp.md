# All Pairs Shortest Path (APSP)

## Problem Definition

Given a weighted directed graph, find the shortest path distance between *every* pair of nodes that has a connecting path. This generalizes [Single-Source Shortest Paths](/examples/sssp), which only computes distances from one fixed source, to all sources at once — the source simply becomes an extra argument that's carried through the recursion.

## Test Data

```
WEdge("s", "a", 3);
WEdge("s", "b", 5);
WEdge("a", "b", 2);
WEdge("a", "c", 4);
WEdge("b", "c", 1);
WEdge("b", "d", 3);
WEdge("c", "d", 2);
WEdge("c", "t", 4);
WEdge("d", "t", 1);
```

## Solution

```
# For every direct edge, the shortest distance is at most its weight
APSP(source, target) Min= weight :- WEdge(source, target, weight);

# For paths through an intermediate node
APSP(source, target) Min= APSP(source, mid) + weight :-
  APSP(source, mid),
  WEdge(mid, target, weight);
```

## Expected Results

```
+------+------+--------------+
| col0 | col1 | logica_value |
+------+------+--------------+
| a    | b    | 2            |
| a    | c    | 3            |
| a    | d    | 5            |
| a    | t    | 6            |
| b    | c    | 1            |
| b    | d    | 3            |
| b    | t    | 4            |
| c    | d    | 2            |
| c    | t    | 3            |
| d    | t    | 1            |
| s    | a    | 3            |
| s    | b    | 5            |
| s    | c    | 6            |
| s    | d    | 8            |
| s    | t    | 9            |
+------+------+--------------+
```

The rows with source `s` match exactly the distances computed in the [SSSP example](/examples/sssp), since APSP subsumes single-source shortest paths as one slice of its result.
