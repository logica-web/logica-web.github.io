# PageRank

## Problem Definition

PageRank assigns every node in a directed graph a score representing its relative importance, based on the idea that a node is important if it's linked to by other important nodes. It's computed by power iteration: starting from a uniform score, repeatedly recompute each node's score as a damped mix of an even baseline and the scores its inbound neighbors pass along (each neighbor splitting its own score evenly across its outbound edges), until the scores converge.

Since this update has to *replace* each iteration's scores rather than accumulate them, we track the iteration number explicitly as an argument, mirroring the counter pattern from [Recursive Settings](/usrguide/recursion#recursive-settings).

## Test Data

```
Edge("a", "b");
Edge("b", "c");
Edge("c", "a");
Edge("c", "b");

Node(x) distinct :- Edge(x, _);
OutDegree(x) += 1 :- Edge(x, _);
TotalNodes() = Count{x :- Node(x)};
```

## Solution

```
# Iteration counter, 0 through 8
Step(0);
Step(i + 1) :- Step(i);

# Every node starts with an equal share of rank
R(0, x) = 1.0 / TotalNodes() :- Node(x);

# Each step, a node's rank is a damped baseline plus the rank passed on
# by its inbound neighbors (split evenly across each neighbor's outbound edges)
R(i + 1, x) = (1 - 0.85) / TotalNodes() +
  0.85 * Sum{ r / od :- Edge(y, x), r = R(i, y), od = OutDegree(y) } :-
  Step(i), Node(x);

# Take the final iteration as the answer
PageRank(x) = r :- R(8, x) = r;
```

## Expected Results

```
+------+---------------------+
| col0 | logica_value        |
+------+---------------------+
| a    | 0.2168291471199544  |
| b    | 0.3963085691243489  |
| c    | 0.38686228375569653 |
+------+---------------------+
```

Node `a` only receives rank from `c` (split three ways with `b`), while `b` and `c` receive rank from two inbound edges each, so they converge to noticeably higher scores. The scores sum to 1, as expected for PageRank.
