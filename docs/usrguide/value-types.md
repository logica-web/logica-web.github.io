---
outline: deep
---
# Value Types

As discussed in [Facts](/usrguide/facts.html#values), understanding value types is crucial for working with Logica. Logica supports two value types including basic types and composite types.

## Basic Types

Logica handles numbers, strings, and booleans.

- **Numbers**: Examples include `1`, `5`, `10`, `42`, `3.1415`, etc.
- **Strings**: Examples include `"Hello World"`, `"Ekaterinburg"`, `"Athens"`, etc.
- **Booleans**: `true`, `false`
>[!caution]
> `true` and `false` must be lowercase

All data types are _optional_, meaning any variable or argument can take a special `null` value, indicating that the value is missing. The `null` value is also used in aggregation, which will be covered in the [Aggregation](/usrguide/aggregation.html) section.

## Composite Types

Logica includes two composite types: _arrays_ and _records_.
>[!TIP]
> Elements of composite types can also take the `null` value.

## Arrays

In Logica, "list" and "array" are synonymous and can be used interchangeably. An array is an ordered sequence of elements of the same type. The syntax for lists is identical to Python: `[element1, element2, …]`.

**Example 1:**

```
Person(name: "Victoria", children: ["Edward", "Leopold"]);
Person(name: "Edward", children: ["George V", "Maud"]);
```

The `in` operator allows a variable to iterate over elements of the list.

**Example 2:**

```
Centaur(x) :-
     x in ["Chiron", "Hylonome", "Dictys"];
```

This is equivalent to:

```
Centaur("Chiron");
Centaur("Hylonome");
Centaur("Dictys");
```

## Records

A record is a data type consisting of one or more named fields, each storing an element of some data type. Records are similar to JSON objects, [PostgreSQL composite types](https://www.postgresql.org/docs/current/rowtypes.html), and [Google ProtoBuffers](https://en.wikipedia.org/wiki/Protocol_Buffers). The syntax for records is similar to JavaScript object syntax: `{field_name_1: value_1, field_name_2: value_2, …}`.

Fields are accessed using the syntax `record_name.field_name`.

**Example 1:**

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
