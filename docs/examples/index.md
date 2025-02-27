# Examples

## Hello World

```
Greeting("Hello world!");
```

## Transitive Closure (TC)

### Problem Definition

Given a directed graph represented by an edge relation `Edge(x, y)`, compute the transitive closure - all pairs of nodes `(x, y)` such that there exists a path from `x` to `y` in the graph.

### Test Data

```
# A simple directed graph
Edge("a", "b");
Edge("b", "c");
Edge("c", "d");
Edge("d", "e");
Edge("a", "c");  # This edge creates a shortcut from a to c
Edge("b", "d");  # This edge creates a shortcut from b to d
```

### Solution

```
# Base case: If there is a direct edge from x to y, then y is reachable from x
TC(x, y) :- Edge(x, y);

# Recursive case: If x can reach z and z can reach y, then x can reach y
TC(x, y) :- TC(x, z), TC(z, y);
```

### Expected Results

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

## Same Generation (SG)

### Problem Definition

Given a parent-child relationship `Parent(parent, child)`, identify pairs of individuals who are in the same generation. Two individuals are in the same generation if they are the same distance from some common ancestor in the family tree.

### Test Data

```
# Sample parent-child data in a tree structure
Parent("root", "a");
Parent("root", "b");
Parent("a", "a1");
Parent("a", "a2");
Parent("a1", "a11");
Parent("a1", "a12");
Parent("b", "b1");
Parent("b", "b2");
Parent("b2", "b21");
Parent("b2", "b22");
```

### Solution 1: Conventional Recursive Approach

```
# Same generation relation
# Base case: Siblings are in the same generation
SG(x, y) :- Parent(p, x), Parent(p, y), x != y;

# Recursive case: If p1 and p2 are in the same generation, and they are parents of x and y respectively,
# then x and y are in the same generation
SG(x, y) :- Parent(p1, x), Parent(p2, y), SG(p1, p2), x != y;
```

### Solution 2: Generation Depth Approach

```
# Calculate the depth (generation) of each node from the root
# Base case: Root nodes have depth 0
Depth(x, 0) :- Parent(x, y), ~Parent(z, x);

# Children have depth one more than their parents
Depth(y, d + 1) :- Parent(x, y), Depth(x, d);

# Two nodes are in the same generation if they have the same depth
SameGen(x, y) :- Depth(x, d), Depth(y, d), x != y;
```

### Expected Results

```
+------+------+
| col0 | col1 |
+------+------+
| a    | b    |
| b    | a    |
| a1   | a2   |
| a2   | a1   |
| a1   | b1   |
| a1   | b2   |
| a2   | b1   |
| a2   | b2   |
| b1   | a1   |
| b1   | a2   |
| b1   | b2   |
| b2   | a1   |
| b2   | a2   |
| b2   | b1   |
| a11  | a12  |
| a12  | a11  |
| a11  | b21  |
| a11  | b22  |
| a12  | b21  |
| a12  | b22  |
| b21  | a11  |
| b21  | a12  |
| b21  | b22  |
| b22  | a11  |
| b22  | a12  |
| b22  | b21  |
+------+------+
```

These results represent all pairs of individuals who are in the same generation. The result is symmetric (if x is in the same generation as y, then y is in the same generation as x).


## Triangle Counting

### Problem Definition

Given an undirected graph, count the number of triangles in the graph. A triangle consists of three nodes that are all connected to each other.

### Test Data

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

### Solution

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

### Expected Results

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
