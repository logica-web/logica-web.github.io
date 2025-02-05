---
outline: deep
---
# Query Engines

Logica is native to the SQL ecosystem; it is designed to compile to SQL and run on data that customers already have in their databases. As of January 2025, Logica runs on DuckDB, Google BigQuery, SQLite, and PostgreSQL. In this guide, we will be using SQLite, a highly efficient, free database that is omnipresent and part of the Python standard library.

To specify that you would like to run your Logica program in SQLite, include the line `@Engine("sqlite");` in your program. For example, you could write the following into file `socrates.l` :

```
@Engine("sqlite");
Human("Socrates");
Mortal(x) :- Human(x);
```

Now you can find out who is mortal with the command:

```
$ logica socrates.l run Mortal
```

and it will run with the built-in SQLite engine.

The line `@Engine("sqlite");` that you have added looks like a fact, and it is. The predicate here is `@Engine`. Special predicates that start with `@Engine` are called _imperatives_. These predicates are used to command the Logica engine on what to do.

:::tip
If you are not familiar with predicates, facts, or rules, no worries, we will walk you through the concepts one by one.
:::
<!-- 
## Connecting and reading from database

By default when running on SQLite Logica connects to in-memory database. If you want to connect to an existing
file use `@AttachDatabase` imperative, which you give database alias and database filename. Use `logica_home`
alias to use this database by default. Any undefined predicate that you call is interpreted by Logica
to be an existing table in the database. So if you have a table called `employee` with column `name` and `salary`
in your SQLite database file `i_learn_logica.db`, then predicate `WellPaidEmployee` defined as such will hold
well paid employees.

```
# File: find_well_paid.l
@Engine("sqlite");
@AttachDatabase("logica_home", "i_learn_logica.db");
WellPaidEmployee(name:) :- employee(name:, salary:), salary > 1000;
```

Run this program as usual.

```
python3 -m logica find_well_paid.l run WellPaidEmployee
```

## Writing to database

To write to a database use imperative `@Ground(P)`. Logica will write _grounded_
predicate `P` when you evalute a predicate that depends on `P`.

Consider a program `test_saving.l`.
```
@Engine("sqlite");
@AttachDatabase("logica_home", "wall.db");

@Ground(T);
T("mene");
T("mene");
T("tekel");
T("upharsin");

S() += 1 :- T();
```

Predicate `T` is commanded to be grounded and predicate `S` simply counts the number of rows of `T`.

When you run `python3 -m logica test_saving.l run S` you will see that `S` has 4 rows and predicate `T` will
be written to table `T` in database `wall.db`.

Running  `python3 -m logica test_saving.l run T` will simply show you what Belshazzar has read on the wall without
affecting the database. That is Logica saves grounded intermediates and does not save a predicate if user
asked to print it directly.

> [!TIP]
> If you want your program to write multiple predicates to the database, then define an
> auxiliary predicate that counts the total number of rows in all the predicates that
> you want to write. For example if you want predicates `A`, `B` and `C` be written then
> define in your program
>
> ```
> # File: my_workflow.l
> Workflow() += 1 :- A() | B() | C();
> ```
>
> and run `python3 -m logica my_workflow.l run Workflow`. -->