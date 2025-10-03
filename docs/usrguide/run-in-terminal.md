---
outline: deep
---
# Run in Terminal

From the installation, we know that Logica can be executed using:

```sh
logica - print Greet <<<'Greet(greeting: "Hello world!")'
```
However, in logic programming, it is more common to run a file instead of a string as shown above.


### run
To execute a file, we can create a file named `test.l` with the following content:
```
Greet("hello world");
```
>[!caution]
>Ensure to add the ; to indicate the end of the statement. 


Then, running the command `logica <filename> run <predicate name>`
```bash
logica test.l run Greet
``` 
will produce the following output:

```
+-------------+
|    col0     |
+-------------+
| hello world |
+-------------+
```

and you can use `logica file.l run predicate1,predicate2,...` to run multiple predicates in the file.

### run_in_terminal
You can also run the file `test.l` in the terminal using:
```
logica test.l run_in_terminal Greet

```

> [!caution]
> If you are using the installed Logica locally, you might encounter a Google authentication error because it uses Google BigQuery as the default engine. The simplest way to fix this is to add `@Engine("sqlite");` to enforce the use of SQLite.

You might be wondering about the difference between `run_in_terminal` and `run`. `run` is designed for newcomers who don't need the advanced capabilities of Logica. Here's a simple example `run_diff.l`:

```
@Recursive(N, 100, iterative: true);
N() = 0;
N() = N() + 1;
```

Using `run` will produce the following result:
```
+--------------+
| logica_value |
+--------------+
|            8 |
|            7 |
|            6 |
|            5 |
|            4 |
|            3 |
|            2 |
|            1 |
|            0 |
+--------------+
```

In contrast, using `run_in_terminal` will produce:
```
╥  ▚  N_ifr0 (0 ms)          
╨╥ ▚  N_ifr1 (0 ms)          
╥╨ ▚  N_ifr2 (0 ms)          
╨╥ ▚  N_ifr3 (0 ms) 48 / 48
╥╨ ▚  N_ifr4 (0 ms) 48 / 48
╨╥ ▚  N_ifr5 (0 ms)          
 ╨ ▚  N (0 ms)          
[     Execution complete.      ]  99.01% complete.
+--------------+
| logica_value |
+--------------+
| 100          |
| 99           |
| 98           |
| 97           |
| 96           |
| 95           |
| 94           |
| 93           |
...
```

Same as `run`, you can also use `logica file.l run_in_terminal predicate1,predicate2,...`.

The main difference is that `run_in_terminal` supports complete iterations.
>[!TIP]
>In most cases, we recommend using `run_in_terminal` to perform your task.