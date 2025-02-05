---
outline: deep
---
# Computation

We have described Logica's declarative syntax and semantics. But how can the predicates be
evaluated to concrete tables?

## Concrete predicates

Logica predicate is called _concrete_ if it is being evaluated to a specific table of values. All predicates
that we defined so far were concrete, they were either defined by a collection of facts, or finite
multisets computable from other predicates. In particular see `Fruit`, `Book` or `RecentBook` above.

## Injectible predicates

Injectible predicates are predicates that perform calculation of some of it's arguments based on other
arguments which are provided as input.

Example: Computing adjusted employee salary using an auxiliary predicate.

```
Employee(name: "Alice", salary: 50000);
Employee(name: "Bob", salary: 60000);
Employee(name: "Charlie", salary: 55000);

AdjustedSalary(employee_salary, increase_percent, new_salary) :-
  new_salary == employee_salary * (1 + increase_percent / 100);

EmployeeSalaryIncrease(name:, adjusted_salary:) :-
  Employee(name:, salary:),
  AdjustedSalary(salary, 10, adjusted_salary);
```

In this example predicate `AdjustedSalary` could not be just printed out as a table. Mathematically
it is a set of triples, but this is an infinite set of triples (or very large if we consider finite
precision of floats) and it is not practical to represent it verbatim in memory or on disk.

However when we are evaluating concrete predicate `EmployeeSalaryIncrease` we can _inject_
 `AdjustedSalary`. Inject predicate means replace call to the predicate with its body.
 So in this case we replace
`AdjustedSalary(salary, 10, adjusted_salary)` with
`adjusted_salary == salary * (1 + 10 / 100)` and thus being able to compute `adjusted_salary`.

For a predicate to be injectible it must be defined with a signle non-aggregating conjunctive rule.


