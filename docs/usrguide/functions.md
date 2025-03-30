---
outline: deep
---
# Functions 


# Injectable Predicates

A Logica predicate is referred to as _concrete_ when it evaluates to a specific table of values. All the predicates we have discussed so far fall into this category, as they are defined either by:
- A set of facts, or
- Finite multisets derived from other predicates.

:::tip
An easy way to determine if a predicate is concrete is to check whether it can be output as a table.
:::

Injectable predicates, on the other hand, compute some of their arguments dynamically based on input arguments provided during evaluation.

**Example**: Adjusting employee salaries using an auxiliary predicate.

```
Employee(name: "Alice", salary: 50000);
Employee(name: "Bob", salary: 60000);
Employee(name: "Charlie", salary: 55000);

AdjustedSalary(employee_salary, increase_percent, new_salary) :-
  new_salary == employee_salary * (1 + increase_percent / 100);

EmployeeSalaryIncrease(name:, adjusted_salary:) :-
  Employee(name:, salary:),
  AdjustedSalary(salary, 100, adjusted_salary);
```

In this example, the `AdjustedSalary` predicate cannot be represented as a simple table. While it mathematically represents a set of triples, this set is either infinite or impractically large (considering finite floating-point precision). Storing or displaying it directly is not feasible.

However, when evaluating the concrete predicate `EmployeeSalaryIncrease`, we can _inject_ the `AdjustedSalary` predicate. Injecting a predicate involves replacing its invocation with its definition. For instance, the call to `AdjustedSalary(salary, 100, adjusted_salary)` is replaced with `adjusted_salary == salary * (1 + 100 / 100)`, enabling the computation of `adjusted_salary`.

To qualify as injectable, a predicate must be defined using a single non-aggregating conjunctive rule.