# Triangle Counting

## Problem Definition

Given an undirected graph, count the number of triangles in the graph. A triangle consists of three nodes that are all connected to each other.

## Test Data

```
# Sample undirected edge data
# For undirected graphs, we represent each edge twice
UEdge("a", "b");
UEdge("b", "a");
UEdge("b", "c");
UEdge("c", "b");
UEdge("c", "a");
UEdge("a", "c");
UEdge("c", "d");
UEdge("d", "c");
UEdge("d", "a");
UEdge("a", "d");
UEdge("d", "e");
UEdge("e", "d");
UEdge("e", "b");
UEdge("b", "e");
```

## Solution

```
# Define a triangle as three nodes that are all connected to each other
Triangle(a, b, c) distinct :-
  UEdge(a, b),
  UEdge(b, c),
  UEdge(c, a),
  a < b, b < c;  # Avoid counting the same triangle multiple times

# Count the triangles
TriangleCount(count?) += 1 :- Triangle(a, b, c);
```

## Expected Results

For the triangle listing:
```
+------+------+------+
| col0 | col1 | col2 |
+------+------+------+
| a    | b    | c    |
| a    | b    | e    |
| a    | c    | d    |
+------+------+------+
```

For the triangle count:
```
+-------+
| count |
+-------+
| 3     |
+-------+
```
