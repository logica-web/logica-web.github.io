---
outline: deep
---
# Named arguments 🌟

Now, we have some basic understanding of Logic Programming. Before we dive deeper into the operations, we want to introduce a special feature provided by Logica called "named arguments." 

:::tip
Named arguments enable operations with tables that have a large number of columns and help with the readability of the output.
:::


Traditional logic programming has the strict principle that we must list all variables when writing rules. Suppose we only need the salary column from the Salary table; we would have to use `Salary(_, _, _, n)` to get the target information. Named arguments simplify this process by allowing us to specify only the needed arguments by name.


Let's take the following example (a list of people from ancient Greece) for instance.

```
Human(name: "Socrates", iq: 250, year_of_birth: -470, location: "Athens");
Human(name: "Aristotle", iq: 240, year_of_birth: -384, location: "Athens");
Human(name: "Archimedes", iq: 245, year_of_birth: -287, location: "Syracuse");
Human(name: "Themistocles", iq: 130, year_of_birth: -524, location: "Athens");
```

When rendered as table names of arguments become column names. Predicate `Human` defined above would result in a table:


```
+--------------+-----+---------------+----------+
|     name     | iq  | year_of_birth | location |
+--------------+-----+---------------+----------+
| Socrates     | 250 |          -470 | Athens   |
| Aristotle    | 240 |          -384 | Athens   |
| Archimedes   | 245 |          -287 | Syracuse |
| Themistocles | 130 |          -524 | Athens   |
+--------------+-----+---------------+----------+
```

:::tip
All named arguments are written in snake case
:::


When calling a predicate with named arguments you only specify the ones that you need.

**Example 1**: AthenianPhilosopher is any philosopher from Athens with an IQ greater than 200.

```
AthenianPhilosopher(name:philosopher) :-
  Human(name:philosopher, location: "Athens", iq: x ), 
  x > 200;
```

By omitting the column `year`, we can focus on necessary information to get  `AthenianPhilosopher` :

```
+-------------+
| philosopher |
+-------------+
| Socrates    |
| Aristotle   |
+-------------+
```

Often you will call a predicate with a positional argument extracting its value to a variable of  the same name, like it happens with argument `iq` in the call `Human(name: philosopher, location: "Athens", iq: x)` in Example 1.

In these situations Logica allows a shorthand: simply skip the name of the variable.

**Example 2**: Equivalent to _Example 2_ using implicit variable name for argument `iq`.

```
AthenianPhilosopher(name:) :-
  Human(name: ,
        location: "Athens", iq:),
  iq > 200;
```
:::tip
Named arguments and variables are usually interchangeable.
:::

:::warning
Positional arguments, such as x, y, m, n in `Salary(x, y, m, n)`, are internally interpreted as named arguments with names `col0`, `col1`, `col2`, etc. For example, a call:
```
P(x, y, z)
```
is equivalent to the call:
```
P(col0: x, col1: y, col2: z)
```
:::
