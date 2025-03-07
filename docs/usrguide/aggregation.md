---
outline: deep
---
# Aggregation

Now that we have covered some basic concepts of Logica, let's explore more advanced features, focusing on the powerful aggregation capabilities🔥.

Logica supports two types of aggregation: predicate-level aggregation and aggregating expressions.

## Predicate-Level Aggregation

To define a set, we consider it as a multiset where each row's multiplicity is exactly 1. Predicate-level aggregation enables the construction of such sets.

Use the `distinct` keyword in the rule's head to make it aggregating. Aggregating rules always generate predicates that represent sets, ensuring all rows in the resulting tables are unique.

Consider the predicate `FruitPurchase`, which specifies the fruits and their weights that we have purchased. It is defined with the following facts:

```
FruitPurchase(fruit: "apple", weight: 0.5);
FruitPurchase(fruit: "apple", weight: 0.4);
FruitPurchase(fruit: "orange", weight: 0.6);
FruitPurchase(fruit: "orange", weight: 0.4);
FruitPurchase(fruit: "orange", weight: 0.5);
FruitPurchase(fruit: "pineapple", weight: 0.9);
FruitPurchase(fruit: "pineapple", weight: 1.1);
```
Now, suppose we need to define the predicate `Fruit(fruit:)` to list all the fruits mentioned in `FruitPurchase` exactly once. If we define it as `Fruit(fruit:) :- FruitPurchase(fruit:)`, the multiplicities of each fruit would match their multiplicities in the original table. To ensure we get a set, we use the `distinct` keyword as follows:

```
Fruit(fruit:) distinct :- FruitPurchase(fruit:);
```

This way, `Fruit` would evaluate to:

```
+-----------+
| fruit     |
+-----------+
| apple     |
| orange    |
| pineapple |
+-----------+
```

Aggregating predicates can also include aggregating arguments, which are not just values computed by the body but aggregations of those values. Unlike regular arguments specified as `<argument_name>: <argument_value>`, aggregating arguments are specified as `<argument_name>? <AggregatingOperator>= <aggregated_value>`.

For example, to compute the total weight and maximal weights of each type of purchased fruit, you can use the `+` and `Max` aggregating operators as follows:

```
Fruit(fruit:,
  total_weight? += weight,
  maximal_weight? Max= weight) distinct :- FruitPurchase(fruit:, weight:);
```

This would evaluate to:

```
+-----------+--------------+----------------+
| fruit     | total_weight | maximal_weight |
+-----------+--------------+----------------+
| apple     | 0.9          | 0.5            |
| orange    | 1.5          | 0.6            |
| pineapple | 2.0          | 1.1            |
+-----------+--------------+----------------+
```

:::tip
Special value `null` is ignored by all built-in aggregating operators. For instance, if there is a fact `FruitPurchase(fruit: "apple", weight: null);`, it will not affect the output.
:::


There are additional built-in aggregation operators available, which you can find in the [Cheat Sheet](/usrguide/built-in-operators.md#aggregating-functions). Here, we will discuss two of them: `ArgMax` and `ArgMin`. These functions allow selecting a key with the highest or lowest value, respectively. They aggregate key-value pairs, represented in Logica as records `{arg:, value:}`. The infix operator `->` constructs such records.

For example, consider the predicate `Q` defined as:
```
Q("apple" -> 2);
Q("banana" -> 4);
Q("cantaloupe" -> 6);
```

This evaluates to:
```
+--------------------------------+
| col0                           |
+--------------------------------+
| {"arg":"apple","value":2}      |
| {"arg":"banana","value":4}     |
| {"arg":"cantaloupe","value":6} |
+--------------------------------+
```

To select the key corresponding to the maximum value, apply the `ArgMax` aggregation operation to the `key -> value` pair. 

Example: Selecting the wisest person in each city.
```
Human(name: "Socrates", iq: 250, year_of_birth: -470, location: "Athens");
Human(name: "Aristotle", iq: 240, year_of_birth: -384, location: "Athens");
Human(name: "Archimedes", iq: 245, year_of_birth: -287, location: "Syracuse");
Human(name: "Themistocles", iq: 130, year_of_birth: -524, location: "Athens");

WisestHuman(city:, person? ArgMax= name -> iq) distinct :-
  Human(name:, iq:, location: city);
```

The output looks like
```
+----------+------------+
| city     | person     |
+----------+------------+
| Athens   | Socrates   |
| Syracuse | Archimedes |
+----------+------------+
```


## Aggregating expressions

Aggregating expressions of Logica are similar to mathematical 
[Set builder](https://en.wikipedia.org/wiki/Set-builder_notation#Sets_defined_by_a_predicate) notation,
but they allow combining elements with an arbitrary aggregating function.

You can call aggregating operator on a multiset using figure parenthesis:
` <AggregatingOperator>{<aggregated value> :- <proposition>)}`.

For example let us assume we have a predicate `Purchase` which holds information about movie ticket purchases, in particular it has
argument `purchase_id` with the id of the purchase entry and `ticket` holding a list of tickets.

Example 1: Finding total purchase value and most expensive tickets.

```
PurchaseSummary(purchase_id:, total_value:, most_expensive:) :-
  Purchase(purchase_id:, tickets:),
  total_value = Sum{ticket.price :- ticket in tickets},
  most_expensive = Max{ticket.price :- ticket in tickets};
```

### List comprehension

Using `List` aggregation operator enables the use of aggregating expressions as list comprehensions.

Example 3: For each purchase keep only expensive tickets.

```
ExpensiveTickets(purchase_id:, expensive_tickets:) :-
  Purchase(purchase_id:, tickets:),
  expensive_tickets = List{ticket :- ticket in tickets, ticket.price > 100};

```

### Outer joins

Aggregating expressions can be used to look up information, which serves the same purpose as _outer joins_ in SQL.

Example 4: Assemble phones and emails of people in a single table.

```
PeopleContacts(person:, emails:, phones:) :-
  Person(person),
  emails = List{email :- PersonEmail(person:, email:)},
  phones = List{phone :- PersonPhone(person:, phone:)};
```

### Aggregating nothing to `null`

When proposition of the aggregating expressions is not satisfied by any values then
built-in aggregating operators result in a `null`.

So for instance if for some person from Example 4 there were no emails found then
`emails` argument would be equal to `null` in their row.

You can check if some value is null using `is` operator. As Logica compiles to SQL you can
not use `==` for checking if a value is `null`.

For instance the following rule can be used to find people who has no emails listed.

```
PersonWithNoEmails(person) :-
  PeopleContacts(person:, emails:), emails is null;
```

### Negation as an aggregating expression

To negate a proposition use `~` operator. This operator stands for an aggregating expression.
Consider a set of facts

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

and lets say we want to find all birds that can sing, but can not fly. It can be done
with the following rule.

```
InterestingBird(x) :-
  Bird(x), CanSing(x), ~CanFly(x);
```

Logica interprets negation in this rule as follows:

```
InterestingBird(x) :-
  Bird(x), CanSing(x), Max{1 :- CanFly(x)} is null;
```

Indeed aggregating expression `Max{1 :- CanFly(x)}` will be aggregating over a non-empty
multiset of `1` values if and only if proposition `CanFly(x)` holds, and would run over an empty
set otherwise, resulting in a `null`. 

> [!NOTE]
> Inquisitive reader may have observed that any other built-in
> aggregating operator could have worked here, e.g. we could have used `Sum{42 :- CanFly(x)}`
> with the same outcome.