---
outline: deep
---

# Quickstart

Logica integrates effortlessly with Jupyter Notebooks and Google Colab, providing cutting-edge platforms for data analysis. In the following example, we'll explore a simple Datalog program to get you started.

## Package Import

``` python
from logica import colab_logica
```

## Magic Cell
Logica uses Magic Cells in Notebooks to support its Datalog-like syntax. To enable this feature, start the cell with `%%logica`. The first line of the cell should specify the predicates to be printed as the output.

For example, to write a "Hello, World!" program in a Notebook, you can use:

```notebook
%%logica Greeting
@Engine("sqlite");
Greeting("Hello World!");
```

## Result Interpretation
With such script, you can get the followings
<iframe src="/quickstart_result_interpret.html" width="100%" height="280px" frameborder="0.3"></iframe>

Okie, now we have several things to learn about