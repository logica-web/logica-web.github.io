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
:::warning
Ensure to add the ; to indicate the end of the statement. 
:::

Then, running the command 
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

### run_in_terminal
You can also run the file `test.l` in the terminal using:
```
logica test.l run_in_terminal Greet

```