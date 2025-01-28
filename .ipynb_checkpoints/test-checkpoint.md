```python
from logica import colab_logica
```

    Could not import google.cloud.bigquery.
    Could not import google.cloud.auth.
    Could not import google.colab.widgets.



```python
%%logica Greeting
@Engine("sqlite");
Greeting("Hello World!");
```

    Query is stored at [1mGreeting_sql[0m variable.



    
![svg](test_files/test_1_1.svg)
    


    Running predicate: Greeting (1 ms)
    The following table is stored at [1mGreeting[0m variable.



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>col0</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Hello World!</td>
    </tr>
  </tbody>
</table>
</div>


     

