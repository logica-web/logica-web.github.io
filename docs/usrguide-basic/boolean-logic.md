---
outline: deep
---
# Boolean logic

There is a boolean type in Logica. Careful reader may have already concluded that there is a difference
between preicates and boolean funcitons in Logica.

Consider an example of a boolean function `SweetF` and a predicate `SweetP` that describe which of the foods
are sweet.

```
Food("salami");
Food("strawberry");
Food("cake");
Food("potato");

SweetF("samami") = false;
SweetF("strawberry") = true;
SweetF("cake") = true;
SweetF("potato") = false;

SweetP("strawberry");
SweetP("cake");
```

Predicate `SweetP` is to be used in propositions, while `SweetF` in expressions.

For example you can use `SweetF` to define predicate `FoodInfo` as follows.

```
FoodInfo(food:,
         food_is_sweet: SweetF(food_name));
```

Predicate `SweetF` in this formula is used to both retrieve `food_name` from its first positional
argument and the sweetness of food from its `logica_value` argument.

If you used `SweetP` in this context then you would get an error that there is no `logica_value` in
the predicate `SweetP`.

Consider an example of use of `SweetP` in a propsition.

```
SweetForLunch(food) :- Lunch(food), SweetP(food);
```

Using `SweetF` in this context would be incorrect, as in the proposition `SweetF` would work as a predicate
and any item that holds as `SweetF` first argument (which is all possible food) in our example would
pass. Argument `logica_value` would be ignored.

If you do want to use a boolean function for filterig then pass the result to a `Constratint` predicate.

```
SweetForLunch(food) :- Lunch(food), Constraint(SweetF(food));
```

or you can explicitly check for equality with `true`.

```
SweetForLunch(food) :- Lunch(food), SweetF(food) == true;
```


## Logica's special treatment of binary relations

For the sake of ergonomics Logica has special case treatment for binary relations such as
`==`, `<`, `<=` as well as for boolean operators `&&`, `||`, `!`.

So for instance you can use `<=` in both of these rules.

```
FifteenToNineteen(x) :- x in Range(20), x >= 15;

NumberInfo(number:, number_is_fifteen_to_nineteen: (x >= 15)) :-
  number in Range(20);
```

Operator `<=` is interpreted as a predicate in the first rule and performes filtering
and is interpreted as a boolean function in the second rule and will result
in `false` value for numbers below 15 and `true` value for numbers after 15.

This behavior is happening **only** for the operators and is not happening for
boolean functions built-in or not.

## Assignment operator `=`

A reader with previous background in a contentional programming launguage such as `C`, `Python`, `C++`, `Java` 
is probably used to a singular `=` sign being used as an assignment.

And luckily Logica does have a singular assignment operator `=` which works analogously to the way it does in `C`,
that is it returns the assigned value, unline `==` which returns boolean when used as a function.


Example 1: Using `=` in a proposition.

```
Cube(side: 10, density: 0.5);
Cube(side: 5, density: 2);

CubeInfo(side:, density:, volume:, mass:) :-
  Cube(side:, density:),
  volume = side * side * side,
  mass = volume * density;
```

In this example we may have used `==` with the same result.

> [!NOTE]
> When used in propostion opereators `=` and `==` exhibit identical behavior.

Whether ever using `=` to remember a value is good for readability is a matter
of taste and we leave it to the reader to make the choice.

Example 2: Using `=` as a function to remember assigned value.

```
Cube(side: 10, density: 0.5);
Cube(side: 5, density: 2);

CubeInfo(side:, density:, volume:, mass:) :-
  Cube(side:, density:),
  # This code reads "mass is the volue (which is a cube of a side) times density."
  mass = (volume = side * side * side) * density;
```

If you used `==` in instead of `=` in Example 2 expression `(volume = side * side * side)`
you would get an error because `==` as a boolean function works `(in, in) -> out` mode and thus
there is no assignment happening to volume.

## Using boolean expressions for efficiency

Anything that is done with boolean operations can be achieved with propositional conjunction and
disjunction. But using boolean operations leads to simpler evaluation strategy.

Example: Computing club membership eligibility. Person to be eligible must be at least 25 years old and
reside in New York or San Francisco.

```
Person(name: "Alice", age: 30, city: "New York");
Person(name: "Bob", age: 22, city: "San Francisco");
Person(name: "Charlie", age: 35, city: "Los Angeles");
Person(name: "Diana", age: 28, city: "New York");

EligibleForClub(name:) :-
  Person(name:, age:, city:),
  (age >= 25 && (city == "New York" || city == "San Francisco"));
```

Predicate `ClubEligibility` is computed with a single pass over `Person` predicate rows, while if
propositional disjunction was used it would be computed as union of two rules and would naively
result in two passes.

We can also logic of eligibility expressed with boolean connectives to an auxiliary predicate
and it will be injectible since it is a single conjunctive rule

```
IsEiligible(age, city) :-
  age >= 25 && (city == "New York" || city == "San Francisco");

EligibleForClub(name:) :-
  Person(name:, age:, city:), IsEligible(age, city);
```
