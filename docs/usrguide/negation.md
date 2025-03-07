---
outline: deep
---
# Negation

Negation is a fundamental concept in logic programming, serving as a tool to exclude unwanted facts or to set conditions. After understanding aggregation in Logica, we can gain a clearer insight into how negation operates within Logica.

In Logica, **Negation as an aggregating expression**. To negate a proposition, use the `~` operator, which functions as an aggregating expression. Consider the following set of facts:

```
Bird("sparrow");
Bird("eagle");
Bird("canary");
Bird("cassowary");

CanFly("sparrow");
CanFly("eagle");
CanFly("canary");

CanSing("sparrow");
CanSing("canary");
CanSing("cassowary");
```

Suppose we want to identify all birds that can sing but cannot fly. This can be achieved with the following rule:

```
InterestingBird(x) :-
  Bird(x), CanSing(x), ~CanFly(x);
```

Logica interprets the negation in this rule as follows:

```
InterestingBird(x) :-
  Bird(x), CanSing(x), Max{1 :- CanFly(x)} is null;
```

The aggregating expression `Max{1 :- CanFly(x)}` will aggregate over a non-empty multiset of `1` values if and only if the proposition `CanFly(x)` holds. Otherwise, it will aggregate over an empty set, resulting in `null`.

> [!NOTE]
> An observant reader may note that any other built-in aggregating operator could be used here. For example, `Sum{42 :- CanFly(x)}` would yield the same result.