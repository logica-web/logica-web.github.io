# People You May Know (PYMK)

## Problem Definition

A classic social-network recommendation query: for each person, suggest people who share at least one mutual friend but aren't already directly connected. This combines a two-hop join (friend-of-friend), negation (excluding existing friends), and aggregation (counting mutual friends to rank suggestions).

## Test Data

```
Friend("alice", "bob");
Friend("bob", "alice");
Friend("alice", "carol");
Friend("carol", "alice");
Friend("bob", "dave");
Friend("dave", "bob");
Friend("carol", "dave");
Friend("dave", "carol");
Friend("bob", "carol");
Friend("carol", "bob");
```

## Solution

```
PYMK(person, suggestion, mutual_friends? += 1) distinct :-
  Friend(person, friend),
  Friend(friend, suggestion),
  person != suggestion,
  ~Friend(person, suggestion);
```

## Expected Results

```
+-------+-------+----------------+
| col0  | col1  | mutual_friends |
+-------+-------+----------------+
| alice | dave  | 2              |
| dave  | alice | 2              |
+-------+-------+----------------+
```

`alice` and `dave` aren't friends, but they share two mutual friends (`bob` and `carol`), so they're suggested to each other with a mutual-friend count of 2. No other pair qualifies: `bob` and `carol` share a mutual friend (`alice`) too, but they're already directly connected, so the `~Friend(person, suggestion)` negation excludes that pair.
