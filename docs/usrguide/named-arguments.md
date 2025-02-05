---
outline: deep
---
# Named arguments

Named arguments enable operations with tables with large number of columns and help with readability of output.

Example 1: Here are some facts about people of ancient Greece.

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

When calling a predicate with named arguments you only specify the ones that you need.

Example 2: AthenianPhilosopher is any person from Athens with an IQ greater than 200.

```
AthenianPhilosopher(philosopher:) :-
  Human(name: philosopher,
        location: "Athens", iq: iq),
  iq > 200;
```

With the facts from Example 1 we have `AthenianPhilosopher` evaluate to:

```
+-------------+
| philosopher |
+-------------+
| Socrates    |
| Aristotle   |
+-------------+
```

Often you will call a predicate with a positional argument extracting its value to a variable of 
the same name, like it happens with argument `iq` in the call
`Human(name: philosopher, location: "Athens", iq: iq)` in Example 2.
In these situations Logica allows a shorthand: simply skip the name of the variable.

Example 2: Equivalent to _Example 2_ using implicit variable name for argument `iq`.

```
AthenianPhilosopher(philosopher:) :-
  Human(name: philosopher,
        location: "Athens", iq:),
  iq > 200;
```

> [!NOTE]
> Positional arguments are internally interpreted as named arguments with names `col0`, `col1`, `col2`, etc.
> For example a call
> ```
> P(x, y, z)
> ```
> is equivalent to call
> ```
> P(col0: x, col1: y, col2: z)
> ```