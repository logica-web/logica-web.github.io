---
outline: deep
---
# Facts

In Logica, a fact is a fundamental assertion about the world that is always true. Facts are the simplest form of logical statements and serve as the foundation for reasoning in a logic program. They consist of predicates applied to constant values, representing known relationships or properties.

A more familiar term for facts is inputs. Essentially, if we want to use logic programming scripts to query or reason over a given dataset, the provided inputs serve as the facts.

:::tip
In the previous tutorials, both `Greeting("Hello World!");` and `Human("Socrates");` are facts.
:::

A more complex example can demonstrate the parent relationship:

```
Parent("Adam", "Abel");
Parent("Philip of Macedon", "Alexander of Macedon");
```

In Logica, you specify at execution which predicate you would like to produce. To see the table of the parent relationship, you would run:

```
$ logica socrates.l run Parent
```

and get:

```
+-------------------+----------------------+
|       col0        |         col1         |
+-------------------+----------------------+
| Adam              | Abel                 |
| Philip of Macedon | Alexander of Macedon |
+-------------------+----------------------+
```

## Facts from Database

By default, when running on SQLite, Logica connects to an in-memory database. If you want to connect to an existing file, use the `@AttachDatabase` imperative, which requires a database alias and a database filename. Use the `logica_home` alias to use this database by default. Any undefined predicate that you call is interpreted by Logica to be an existing table in the database. So if you have a table called `employee` with columns `name` and `salary` in your SQLite database file `i_learn_logica.db`, then the predicate `WellPaidEmployee` defined as such will hold well-paid employees.

```
# File: find_well_paid.l
@Engine("sqlite");
@AttachDatabase("logica_home", "i_learn_logica.db");
WellPaidEmployee(name:) :- employee(name:, salary:), salary > 1000;
```

Run this program as usual:

```
logica find_well_paid.l run WellPaidEmployee
```
