# Reachability (REACH)

## Problem Definition

Given a directed graph `Edge(x, y)` and a designated start node, compute the set of all nodes reachable from that start node. Unlike [Transitive Closure](/examples/tc), which computes reachability between *every* pair of nodes, reachability is single-source: it only tracks which nodes can be reached from one fixed origin. This makes it a cheaper, more targeted recursive query.

## Test Data

```
Edge("a", "b");
Edge("b", "c");
Edge("c", "d");
Edge("d", "e");
Edge("a", "c");
Edge("b", "d");
Edge("f", "g");  # disconnected from the rest of the graph

Start("a");
```

## Solution

```
Reach(x) distinct :- Start(x);
Reach(y) distinct :- Reach(x), Edge(x, y);
```

## Expected Results

```
+------+
| col0 |
+------+
| a    |
| b    |
| c    |
| d    |
| e    |
+------+
```

Nodes `f` and `g` are excluded because they aren't reachable from `a`, even though they participate in an edge elsewhere in the graph.
