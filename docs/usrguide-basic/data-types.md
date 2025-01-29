---
outline: deep
---
# Value types

## Basic types

Logica operates on numbers, strings, booleans and composite data types.

Numbers: `1`, `5`, `10`, `42`, `3.1415`, …

Strings: `"Hello World"`, `"Ekaterinburg"`, `"Athens"`, …

Booleans: `true`, `false`

All data types are _optional_, that is any variable or argument may be taking a special `null` value, which
roughly stands for stating that the value is missing. Value `null` occurs in aggregation which will be discussed in
the Aggregation section.

## Composite types

Logica has two composite types: _arrays_ and _records_. A variable or argument of composite type can also be
taking `null` value.

## Arrays

Words "list" and "array" are synonyms in Logica and can used interchangably.

Array is an ordered sequence of elements of the same type.

Syntax for lists is identical to Python: `[element1, element2, …]`

Example 1:

Person(name: "Victoria", children: ["Edward", "Leopold"]);
Person(name: "Edward", children: ["George V", "Maud"]);

Operator `in` makes a variable to run over elements of the list.

Example 2:

```
Centaur(x) :-
  x in ["Chiron",
        "Hylonome",
        "Dictys"];
```

is equivalent to

```
Centaur("Chiron");
Centaur("Hylonome");
Centaur("Dictys");
```

## Records

A record is a data type that consists of one or many named fields. Each field stores an element of some data type.
Records are analogous to JSON objects, PostreSQL composite types, Google ProtoBuffers.
Record syntax is similar to JavaScript object syntax:
  ```{field_name_1: value_1, field_name_2: value_2, …}```

Field is addressed with usual syntax of `record_name.field_name`

Example 1:

```
Book(title: "To Kill a Mockingbird", 
     info: {author: "Harper Lee", publication_year: 1960});
Book(title: "1984", 
     info: {author: "George Orwell", publication_year: 1949});
Book(title: "The Great Gatsby", 
     info: {author: "F. Scott Fitzgerald", publication_year: 1925});

RecentBook(title:) :-
  Book(title:, info:),
  info.publication_year > 1950;
```