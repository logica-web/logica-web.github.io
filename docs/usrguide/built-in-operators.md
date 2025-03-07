---
outline: deep
---

# Build-in Operators
## Aggregating Functions

| Aggregating function <div style="width: 140pt;"></div>   | What it does |
|------------------------|--------------|
| `Sum= x`, `+= x`       | Summation of all x |
| `Min= x`               | Minimum of all x |
| `Max= x`               | Maximum of all x |
| `StringAgg= x`         | A comma-separated concatenation of all x's. Also can be used to define concatenations via other symbol: `JoinWithDash(x) = StringAgg(x "-")`; JoinWithDash will join the x's with a dash. |
| `ArgMin= x -> y`       | One of x's corresponding to the smallest y |
| `ArgMax= x -> y`       | One of x's corresponding to the largest y |
| `Count= x`             | Approximate count of the number of distinct x. |
| `List= x`              | An array of all x's. |
| `Set= x`               | An array of all distinct x's. |
| `ArgMaxK(x -> y, k)`   | A list of length k containing x's corresponding to largest y's. To be used via defining an auxiliary aggregating function like: `ArgMax5(a) = ArgMaxK(a, 5)`; And then use `ArgMax5= x -> y`. |
| `ArgMinK(x -> y, k)`   | A list of length k containing x's corresponding to smallest y's. |
| `Array= x -> y`        | An array of all y's sorted by corresponding x. |
| `Avg= x`               | Average over values of x. |
| `1= x`                 | One (arbitrary) value from what x runs over. This is useful for left joins. |

## String Manipulation Functions

| Function <div style="width: 140pt;"></div>        | What it does |
|----------------|--------------|
| `x ++ y`       | Concatenation of x and y |
| `Substr(s, i, l)` | Substring of s starting at position i of length l. Position starts from 1. |
| `Length(s)`    | Length of string s. |
| `Join(l, c)`   | String join of elements of l interleaved with c. E.g., `Join(["a", "b", "c"], "-") == "a-b-c"` |
| `Split(s, c)`  | Splits the string s on separator c into an array of string components. E.g., `Split("a-b-c", "-") = ["a", "b", "c"]` |
| `Like(s, p)`   | Boolean answering whether string s matches pattern p. Corresponds to SQL’s `s LIKE p`. Pattern p allows `%` wildcard matching any string. |
| `Upper(s)`     | Turns s into upper case. |

## Array Manipulation Functions

| Function         | What it does |
|------------------|--------------|
| `Size(a)`        | Length of the array a. |
| `Element(a, i)`  | Element of a at index i. Indices start with 0. |
| `ArrayConcat(a, b)` | Concatenation of arrays a and b. |

## Type Casting Functions

| Function       | What it does |
|----------------|--------------|
| `ToInt64(x)`   | Casts x to an integer number. |
| `ToFloat64(x)` | Casts x to a float number. |
| `ToString(x)`  | Casts x to a string. |

## Mathematical Functions

| Function | What it does |
|----------|--------------|
| `Exp(x)` | Exponent of x. |
| `Sin(x)` | Sin of x. |
| `Cos(x)` | Cos of x. |
| `Log(x)` | Natural logarithm of x. |

## Some Other Functions

| Function  <div style="width: 140pt;"></div>              | What it does |
|-----------------------|--------------|
| `IsNull(x)`           | Boolean answering whether x is null. |
| `Constraint(x)`       | A proposition that x is a boolean which is true. Use it in the body of the predicate to filter on a boolean variable or boolean function value. E.g., `Q(x, y) :- T(x, y, z), Constraint(z), Constraint(F(x));` Here z is a boolean column and F is a boolean function. |
| `Constraint(x in l)`  | Boolean value that checks that x is an element of a list l. |
| `Range(n)`            | An array of natural numbers from 0 to n - 1. |
| `SqlExpr(s, r)`       | Compiles to an SQL expression equal to Python’s s.format(r) where record r is interpreted as a dictionary. |
