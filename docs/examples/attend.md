# Attend Party (ATTEND)

## Problem Definition

A classic benchmark for recursive aggregation: given a symmetric `Friend` relation and a set of natural extroverts who will attend a party regardless, a person also decides to attend if **at least half of their friends are attending**. Because attendance depends on friends' attendance, which in turn depends on their friends, the query must be evaluated iteratively until the set of attendees stabilizes — a good illustration of aggregation combined with recursion.

## Test Data

```
Friend("alice", "bob");
Friend("bob", "alice");
Friend("alice", "carol");
Friend("carol", "alice");
Friend("bob", "carol");
Friend("carol", "bob");
Friend("dave", "erin");
Friend("erin", "dave");
Friend("dave", "frank");
Friend("frank", "dave");
Friend("erin", "frank");
Friend("frank", "erin");
Friend("dave", "carol");
Friend("carol", "dave");

Extrovert("alice");
```

## Solution

```
# Extroverts always attend
WillAttend(x) distinct :- Extrovert(x);

# Everyone else attends once at least half of their friends do
WillAttend(x) distinct :-
  Friend(x, _),
  total = Count{y :- Friend(x, y)},
  attending = Count{y :- Friend(x, y), WillAttend(y)},
  2 * attending >= total;
```

## Expected Results

```
+-------+
| col0  |
+-------+
| alice |
| bob   |
| carol |
+-------+
```

`alice` attends because she's an extrovert. `bob` attends once `alice` (one of his two friends) attends, meeting the half threshold. `carol` then attends once both `alice` and `bob` (two of her three friends) attend. `dave`, `erin`, and `frank` form an isolated friend cluster with no extrovert to kick off the cascade, so none of them ever cross the threshold and the group stays home.
