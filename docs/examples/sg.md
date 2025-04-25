
# Same Generation (SG)

## Problem Definition

Given a parent-child relationship `Parent(parent, child)`, identify pairs of individuals who are in the same generation. Two individuals are in the same generation if they are the same distance from some common ancestor in the family tree.

## Test Data

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

## Solution 1: Conventional Recursive Approach

::: code-group

```sh [logica]
# Same generation relation
# Base case: Siblings are in the same generation
SG(x, y) :- Parent(p, x), Parent(p, y), x != y;

# Recursive case: If p1 and p2 are in the same generation, and they are parents of x and y respectively,
# then x and y are in the same generation
SG(x, y) :- Parent(p1, x), Parent(p2, y), SG(p1, p2), x != y;
```

```sh [souffle]
.decl Edge(x:number, y:number)
.input Edge(filename="x.csv", delimiter=",", headers=true)
.decl SG(x: number, y: number)
.output SG

SG(x,y) :- Edge(p,x), Edge(p,y), x!=y.
SG(x,y) :- Edge(a,x), SG(a,b), Edge(b,y).
```

```sh [radlog(bigdatalog)]
database({
  arc(fromnodeid: integer, tonodeid: integer)
}).

sg(X,Y) <- arc(P,X), arc(P,Y), X!=Y.
sg(X,Y) <- arc(A,X), sg(A,B), arc(B,Y).
```
:::


## Solution 2: Generation Depth Approach

```
# Calculate the depth (generation) of each node from the root
# Base case: Root nodes have depth 0
Depth(x, 0) :- Parent(x, y), ~Parent(z, x);

# Children have depth one more than their parents
Depth(y, d + 1) :- Parent(x, y), Depth(x, d);

# Two nodes are in the same generation if they have the same depth
SameGen(x, y) :- Depth(x, d), Depth(y, d), x != y;
```

## Expected Results

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
