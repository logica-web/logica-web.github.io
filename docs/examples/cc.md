# Connected Components (CC)

## Problem Definition

Given an undirected graph, partition its nodes into connected components and label every node with an identifier for the component it belongs to. A common labeling scheme, used here, is to label each node with the smallest node identifier reachable from it — nodes end up sharing a label exactly when they are in the same component.

## Test Data

```
# Undirected edges are represented in both directions
UEdge("a", "b");
UEdge("b", "a");
UEdge("b", "c");
UEdge("c", "b");
UEdge("d", "e");
UEdge("e", "d");

Node(x) distinct :- UEdge(x, _);
```

## Solution

```
# Every node starts out labeled with itself
CC(x) Min= x :- Node(x);

# A node's label shrinks to the smallest label among its neighbors
CC(x) Min= CC(y) :- UEdge(x, y);
```

## Expected Results

```
+------+--------------+
| col0 | logica_value |
+------+--------------+
| a    | a            |
| b    | a            |
| c    | a            |
| d    | d            |
| e    | d            |
+------+--------------+
```

Nodes `a`, `b`, and `c` form one component labeled `a` (its smallest member), while `d` and `e` form a separate component labeled `d`. The label propagates through the graph one hop per recursive iteration until it stabilizes.

:::tip
Both rules use the same aggregation operator (`Min=`). Mixing a plain `=` base case with an aggregating recursive case on the same predicate is not allowed — see [Aggregation in Recursion](/usrguide/recursion#aggregation-in-recursion).
:::
