---
outline: deep
---

# Run In Notebook

## Prerequisite
To get started with Logica quickly, ensure that Logica and Jupyter are installed on your system, or use Google Colab with Logica pre-installed.
Additionally, install the following Python packages to ensure proper functionality (Yes, you can use DuckDB!!!):
```
pip install duckdb pandas graphviz
```

:::warning
Without graphviz, you can still run Logica in a notebook, but the execution process visualization will be limited to an ASCII version instead of the full graphical representation.
:::

## Package Import

```python
from logica import colab_logica
```

## Cell Magic
Logica uses [Cell Magic](https://ipython.readthedocs.io/en/stable/interactive/magics.html#cell-magics) in Notebooks to support its Datalog-like syntax. To enable this feature, start the cell with `%%logica`. The first line of the cell should specify the predicates to be printed as output.

For example, to write a "Hello, World!" program in a Notebook, use:

```
%%logica Greeting
@Engine("sqlite");
Greeting("Hello World!");
```
After `%%logica`, specify the predicate to output, similar to Clingo's `#show`. Also, don't forget to specify the engine to use.

## Result Interpretation
With this script, you will get the following:
<iframe src="/quickstart_result_interpret.html" width="100%" height="280px" frameborder="0.3"></iframe>

From this, we know that the compiled query is stored in the `Greeting_sql` variable. The output of the Logica query is stored in a table variable named `Greeting`, which contains one row (0) and one column (col0) with the value `Hello World!`.

<iframe src="/quickstart_variable_access.html" width="100%" height="280px" frameborder="0.3"></iframe>

With a foundational understanding of using Logica in both the terminal and a notebook, let's explore the basics in greater detail.