

## Data

```
Owns("A", "B", 0.3);
Owns("B", "C", 0.8);
Owns("C", "D", 0.3);
Owns("C", "E", 0.6);
Owns("E", "D", 0.4);
Owns("C", "F", 0.3);
```

## Program

```
Company(x) distinct :- x in [a,b], Owns(a, b);

Controls(x, x) distinct :- Company(x);
Controls(x, z) distinct :-
  Company(x),
  Company(z),
  x != z,
  stock_control > 0.5,
  stock_control += (v :- Controls(x, y), Owns(y, z, v));
```
