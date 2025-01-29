---
outline: deep
---
# Functional notation

Functions are mathematical objects that take some value as an input and return some value as an output.
Modern imperative programming language extensively use functions, and there is a whole programming
paradigm _functional programming_ that doubles down on using functions to express the computation.
Functions are indeed a conventient way to express data items transformation.

In mathematics functions are often defined as sets of pairs, where the first element is the input of
the function and the second element is the output. Logica follows the same path, allowing predicates
to be used as functions.

Let's consider a toy example, where our input data is defined by predicate `T` and consists of some numbers,
our tranformation is defined by a predicates `S` which squares the numbers and predicate `D` which doubles the
numbers. We obtain output data `R` applying those two transformations to each element of `T`.

```
T(1);
T(2);
T(5);
T(8);
T(9);

S(x, y) :- y == x * x;
D(x, y) :- y == 2 * x;

R(z) :-
  T(x),
  S(x, y);
  D(y, z);
```

To apply the sequence of transformations using regular predicates we need to introduce variables for intermediate
results. Composition of functions is more readable. Let us first see how we can implement the same computation
using functions in Logica and then discuss internal semantics.

```
T(1);
T(2);
T(5);
T(8);
T(9);

S(x) = x * x;
D(x) = 2 * x;

R(D(S(x))) :-
  T(x);
```

In general when a predicate is defined with functional value `= <functional value>` this value is simply
represented as a column named `logica_value: <functional value>`.

For example if we define a predicate

```
BookAuthor(title: "To Kill a Mockingbird", year: 1960) = "Harper Lee";
BookAuthor(title: "1984", year: 1949) = "George Orwell";
BookAuthor(title: "The Great Gatsby", year: 1925) = "F. Scott Fitzgerald";
BookAuthor(title: "Brave New World", year: 1932) = "Aldous Huxley";
BookAuthor(title: "Catch-22", year: 1961) = "Joseph Heller";
```

then it would be evaluating to

```
+-----------------------+------+---------------------+
|         title         | year |    logica_value     |
+-----------------------+------+---------------------+
| To Kill a Mockingbird | 1960 | Harper Lee          |
| 1984                  | 1949 | George Orwell       |
| The Great Gatsby      | 1925 | F. Scott Fitzgerald |
| Brave New World       | 1932 | Aldous Huxley       |
| Catch-22              | 1961 | Joseph Heller       |
+-----------------------+------+---------------------+
```

When defining functional predicates you have all the regular
arsenal available, i.e. you can have rule body, variables, named and
positional arguments etc.

For example if we already had `Book` predicate we could define
`BookAuthor` functional predicate as follows:

```
Book(title: "To Kill a Mockingbird", 
     info: {author: "Harper Lee", publication_year: 1960});
Book(title: "1984", 
     info: {author: "George Orwell", publication_year: 1949});
Book(title: "The Great Gatsby", 
     info: {author: "F. Scott Fitzgerald", publication_year: 1925});

BookAuthor(title:, year: info.publication_year) = info.author :-
  Book(title:, info:);
```

When functional predicate is used as function, its occurence is replaced with the
an auxiliary variable and call to the predicate is added conjunctively to extract
the value of this variable from `logica_value` column.

For example proposition

```F1(x) + 1 == F2(y) + 10```

is interpreted as a conjunction

```f1 + 1 == f2 + 10, F1(x, logica_value: f1), F2(y, logica_value: f2)```

