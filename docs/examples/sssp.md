
# Single-Source Shortest Paths (SSSP)

## Problem Definition

Given a weighted directed graph and a source node, find the shortest path from the source to all other nodes in the graph. The weight of a path is the sum of the weights of its edges.

## Test Data

```
# Sample weighted edge data
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
# Single-Source Shortest Paths from "s" using a more concise functional style
# For direct edges from the source
SSSP("s") = 0;  # Distance to source is always 0
SSSP(target) Min= weight :- WEdge("s", target, weight);

# For paths through intermediate nodes
SSSP(target) Min= SSSP(middle) + weight :- 
  SSSP(middle),  # We have a path to the intermediate node
  WEdge(middle, target, weight);  # And an edge from intermediate to target
```

## Expected Results

```
+--------+----------+
| target | distance |
+--------+----------+
| s      | 0        |
| a      | 3        |
| b      | 5        |
| c      | 6        |
| d      | 8        |
| t      | 9        |
+--------+----------+
```

The results show the shortest distance from source node "s" to each node in the graph. This solution doesn't track the actual paths taken, only the minimum distances. The `Min=` aggregation ensures that only the shortest path distance to each node is kept.

Note that unlike the previous solution, this elegant functional approach doesn't track the actual paths - just the distances. It also naturally handles cycles in the graph without needing explicit cycle detection.