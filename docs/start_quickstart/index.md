---
outline: deep
---

# Notebook

In addition to running in a terminal, Logica seamlessly integrates with Jupyter Notebooks and Google Colab, offering state-of-the-art environments for data analysis.

## Package Import

``` python
from google.colab import auth
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