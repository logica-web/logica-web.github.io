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


## Aggregating Expressions

Aggregating expressions in Logica are similar to mathematical [Set builder](https://en.wikipedia.org/wiki/Set-builder_notation#Sets_defined_by_a_predicate) notation, but they allow combining elements using any aggregating function.

You can apply an aggregating operator to a multiset using curly braces: `<AggregatingOperator>{<aggregated value> :- <proposition>}`.

For example, consider a predicate `Purchase` that contains information about movie ticket purchases, with arguments `purchase_id` for the purchase entry ID and `tickets` holding a list of tickets.

**Example**: Calculating the total purchase value and identifying the most expensive tickets.
Suppose we have the following facts:
```
Purchase(purchase_id: 1, 
  tickets: [ {ticket: "Movie1", price: 50}, 
    {ticket: "Movie2", price: 30}, 
    {ticket: "Movie3", price: 20} ]);
Purchase(purchase_id: 2, 
  tickets: [ {ticket: "MovieA", price: 100}, 
    {ticket: "MovieB", price: 150} ]);
Purchase(purchase_id: 3, 
  tickets: [ {ticket: "FilmX", price: 10}, 
    {ticket: "FilmY", price: 5}, 
    {ticket: "FilmZ", price: 15}, 
    {ticket: "FilmW", price: 10} ]);
Purchase(purchase_id: 4, 
  tickets: [ {ticket: "Blockbuster", price: 200} ]);
Purchase(purchase_id: 5, 
  tickets: [ {ticket: "Movie5", price: 25}, 
    {ticket: "Movie6", price: 50}, 
    {ticket: "Movie7", price: 75} ]);
```
By running the following:
```
PurchaseSummary(purchase_id:, total_value:, most_expensive:) :-
  Purchase(purchase_id:, tickets:),
  total_value = Sum{ticket.price :- ticket in tickets},
  most_expensive = Max{ticket.price :- ticket in tickets};
```
We will get the table:

```
+-------------+-------------+----------------+
| purchase_id | total_value | most_expensive |
+-------------+-------------+----------------+
| 1           | 100         | 50             |
| 2           | 250         | 150            |
| 3           | 40          | 15             |
| 4           | 200         | 200            |
| 5           | 150         | 75             |
+-------------+-------------+----------------+
```
### List Comprehension

The `List` aggregation operator allows the use of aggregating expressions as list comprehensions.

**Example**: Retain only expensive tickets for each purchase.

```
ExpensiveTickets(purchase_id:, expensive_tickets:) :-
  Purchase(purchase_id:, tickets:),
  expensive_tickets = List{ticket :- ticket in tickets, ticket.price > 100};
```

### Outer Joins

Aggregating expressions can be utilized to retrieve information, similar to how _outer joins_ function in SQL.

**Example**: Combine phones and emails of individuals into a single table.

```
PeopleContacts(person:, emails:, phones:) :-
  Person(person),
  emails = List{email :- PersonEmail(person:, email:)},
  phones = List{phone :- PersonPhone(person:, phone:)};
```

### Aggregating nothing to `null`

When the proposition of an aggregating expression is not satisfied by any values, the built-in aggregating operators result in `null`. For example, if no emails are found for a person in Example above, the `emails` argument will be `null` for that person. To check if a value is `null`, use the `is` operator. 

The following rule finds people who have no emails listed:

```
PersonWithNoEmails(person) :-
  PeopleContacts(person:, emails:), emails is null;
```

>[!caution]
> Since Logica compiles to SQL, you cannot use `==` to check for `null`.

### Negation as an aggregating expression

To negate a proposition, use the ~ operator, which represents an aggregating expression. Consider the following set of facts:

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

Suppose we want to find all birds that can sing but cannot fly. This can be achieved with the following rule:

```
InterestingBird(x) :-
  Bird(x), CanSing(x), ~CanFly(x);
```

Logica interprets the negation in this rule as follows:

```
InterestingBird(x) :-
  Bird(x), CanSing(x), Max{1 :- CanFly(x)} is null;
```

The aggregating expression `Max{1 :- CanFly(x)}` will aggregate over a non-empty multiset of `1` values if and only if the proposition CanFly(x) holds. Otherwise, it will run over an empty set, resulting in `null`.

> [!NOTE]
> An inquisitive reader may observe that any other built-in aggregating operator could work here. For example, we could use `Sum{42 :- CanFly(x)}` with the same outcome.