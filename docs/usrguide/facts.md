---
outline: deep
---

# Concepts
Logic programming is built on a few key concepts, which we frequently encounter when writing code. To illustrate these concepts, let's consider an example using a `salary` table.

| First Name | Last Name | Department  | Salary |
|------------|-----------|-------------|--------|
| Robert     | Smith     | Marketing   | 8500   |
| Jane       | Doe       | Engineering | 8000   |
| Alice      | Johnson   | Sales       | 7500   |

## Facts

In Logica, a fact is a fundamental assertion about the world. Facts are the simplest form of logical statements and serve as the foundation for reasoning in a logic program. They consist of predicates applied to constant values, representing known relationships or properties.

In the previous tutorials, both `Greeting("Hello World!");` and `Human("Socrates");` are facts. If we want to use logic programming scripts to query or reason over a given dataset, the provided inputs usually serve as the facts.

If we use the table `Salary`, we can write all the information in logic format

```
Salary("Robert", "Smith", "Marketing", 8500);
Salary("Jane", "Doe", "Engineering", 8000);
Salary("Alice", "Johnson", "Sales", 7500);
```

In Logica, you specify at execution which predicate you would like to produce. To see the table of the parent relationship, you would run:

```
$ logica salary.l run Salary
```

and get:

```
+--------+---------+-------------+------+
| col0   | col1    | col2        | col3 |
+--------+---------+-------------+------+
| Robert | Smith   | Marketing   | 8500 |
| Jane   | Doe     | Engineering | 8000 |
| Alice  | Johnson | Sales       | 7500 |
+--------+---------+-------------+------+
```

## Predicates

A predicate is a statement with variables. In `Salary("Robert", "Smith", "Marketing", 8500);`, we know `Salary` is a predicate, which usually corresponds to a relationship or an entity.

:::tip
Logica uses Pascal case for predicates.
:::

## Variables

Sometimes, we can use letters to represent values. For example, we use `x`, `y`, `m`, `n` to represent the relationship in `Salary(x, y, m, n)`. In such cases, these letters are called variables, which usually correspond to columns.

:::tip
Logica uses snake case for variables.
:::

## Values

In the provided example, everything following the variables such as `"Robert"`, `"Smith"`, `"Marketing"`, `8500` are the **values**.

## Atom
Although we don't usually use atoms in the context of Logica, they are also a key concept in logic programming. Facts are grounded atoms and are always true. An atom can include variables, so `Salary(x, y, m, n)` is an atom but not a fact. Thus, every fact is an atom, but not all atoms are facts.

To further demonstrate the concept, let's have a dataset (facts):

```
Parent("Adam", "Abel");
Parent("Philip of Macedon", "Alexander of Macedon");
```

and an atom `Parent(x, y)` which stands for "x is a parent of y". Then:

* `Parent("Adam", "Abel")` is true.
* `Parent("Philip of Macedon", "Alexander of Macedon")` is true.
* `Parent("Philip of Macedon", "Julius Caesar")` is false.

:::tip
Facts cannot be used in rules and are usually represented by atoms.
:::

## Literal

A literal is an atom or its negation. For instance, `Salary(x, y, m, n)` is both an atom and a literal, but `not Salary(x, y, m, n)` is a literal but not an atom. Literals are used in rules to express conditions that must be met for the rule to apply.


<!-- ## Facts from Database

By default, when running on SQLite, Logica connects to an in-memory database. If you want to connect to an existing file, use the `@AttachDatabase` imperative, which requires a database alias and a database filename. Use the `logica_home` alias to use this database by default. Any undefined predicate that you call is interpreted by Logica to be an existing table in the database. So if you have a table called `employee` with columns `name` and `salary` in your SQLite database file `i_learn_logica.db`, then the predicate `WellPaidEmployee` defined as such will hold well-paid employees.

```
@Engine("sqlite");
@AttachDatabase("logica_home", "i_learn_logica.db");
WellPaidEmployee(name:) :- employee(name:, salary:), salary > 1000;
```

Run this program as usual:

```
logica find_well_paid.l run WellPaidEmployee
``` -->
