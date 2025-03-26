```

Other(White()) = Black();
Other(Black()) = White();
    
Color(ComponentStart()) = White() distinct;
Color(y) = Other(Color(x)) distinct :- E(x, y);

```
