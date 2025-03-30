---
outline: deep
---

# Rules

## Overview

In logic programming, rules define how new facts can be inferred from existing ones. These rules are called _implications_ because they specify the conditions under which a certain fact holds based on other known facts.

A rule follows this general format:

```
<conclusion> :- <condition>;
```
- The head (on the left of `:- `) represents the conclusion—the new fact being inferred.
- The body (on the right of `:-` ) lists the conditions that must be met for the conclusion to hold.

:::tip
`:-` sign is called turnstile.
:::

This syntax is read as:

>The conclusion holds if the conditions in the body hold.

Rules in Logica are built by combining predicate calls through two 2 fundamental logic operators:
* Conjunction denoted as `,` which stands for logical AND.
* Disjunction denoted as `|` which stands for logical OR.

## Example Rules

**Example 1**: To state "X is a quadruped if it has 4 legs" in Logica, we would write:

```
Quadruped(x) :- NumLegs(x, 4);
```

The body of this rule is a single call to pre-existing `NumLegs` predicate.

**Example 2**: To state "X is the grandparent of Z if X is the parent of the parent of Z" in Logica, we would write:

```
Grandparent(x, z) :- Parent(x, y), Parent(y, z);
```

The body of this rule is a conjunction of calls to pre-existing `Parent` predicate.

:::tip
Logica uses `,` to indicate "AND"
:::


**Example 3**: X is a sibling of Y if they are children of the same parent.

```
Sibling(x, y) :- Parent(z, x), Parent(z, y);
```

**Example 4**: X is a very close relative of Y if X is a parent of Y or Y is a parent of X.


```
VeryCloseRelative(x, y) :- Parent(x, y) | Parent(y, x);
```

The body of this rule is a disjunction of calls to pre-existing `Parent` predicate.

:::tip
Logica uses `|` to indicate "OR"
:::

**Example 5**: X is a close relative of Y if X is a parent, a child, or a sibling of Y.

```
CloseRelative(x, y) :-
  Parent(x, y) |
  Parent(y, x) |
  (Parent(z, x), Parent(z, y));
```

Multiple rules for a predicate are also allowed. This means that you can define a predicate with several rules, and it is equivalent to a single rule whose body is the disjunction (logical OR) of the bodies of those rules.

**Example 6**: Equivalent to _Example 4_.
"X is a close relative of Y if X is the parent of Y. X is a close relative of Y if X is the child of Y.
X is a close relative of Y if X is a sibling of Y."

```
CloseRelative(x, y) :- Parent(x, y);
CloseRelative(x, y) :- Parent(y, x);
CloseRelative(x, y) :- Parent(z, x), Parent(z, y);
```
## Alternative Rule Formats

The base format for rules in Logica is ```<conclusion> :- <condition>;```. However, Logica also supports additional rule formats, which will be introduced and explained on a case-by-case basis.
