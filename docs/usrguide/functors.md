---
outline: deep
---
# Functors

Logica introduces _functors_ to re-use pieces of high level logica.

For example, let's say we implemented predicate `MostExpensiveTicket`, which finds
most expensive ticked in each purches of movie tickets recorded in table `Purchase`.


```
MostExpensiveTicket(purchase_id:, price:) :-
  Purchase(purchase_id:, tickets:),
  price = Max{ticket.price :- ticket in tickets};
```

What if we now want to apply the same logic of finding most expensive ticket to a table
`PurchaseZoo`? There is no way to pass the input data with the tools that we have learned.

Functor is a function from named tuples of predicates to predicates.
Functors are second order functions, which are functions from tuples of sets to sets. In Logica they map named tuples, as regular functions.

Any predicate defined in the program can act as a functor using any subset of predicates that are involved in its definition.

To create a predicate via functor call use syntax 

```
NewPredicate := FunctorPredicate(Arg1: Value1, Arg2: Value2, …);
```

Functor calls can only be made at the top level. You can not call functor in a body of a rule.

Functor call obtains new predicate by substituting predicates in the rules of the functor.
Functor application is similar to (class inference + methods override) in common imperative languages.

For example program

```
F(x) :- A(x) | B(x);
G := F(A: C, B: D);
```

results in `G` that acts as if defined as

```
G(x) :- C(x) | D(x);
```

With functors we can build `MostExpensiveZooTicket` from `MostExpensiveTicket` as follows.

```
MostExpensiveZooTicket := MostExpensiveTicket(Purchase: PurchaseZoo);
```
