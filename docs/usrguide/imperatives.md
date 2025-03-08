# Logica Imperatives

Logica imperatives are special directives that start with `@` and provide instructions to the Logica engine. They control how the program is processed, executed, or how results are presented.

| Imperative | Description | Arguments |
|------------|-------------|-----------|
| `@Engine(engine)` | Specifies which SQL engine to use for query execution | `engine`: String with engine name ("sqlite", "bigquery", "postgres", "duckdb") |
| `@Ground(predicate, table)` | Instructs Logica to save a predicate to the database | `predicate`: Predicate name to be saved<br>`table`: (Optional) String with target table name. By default saves to `logica_test.Predicate` in BigQuery and SQLite, or `logica_home.Predicate` in DuckDB and PostgreSQL |
| `@OrderBy(predicate, column)` | Specifies the sort order for a predicate's results | `predicate`: Predicate name<br>`column`: String with column name |
| `@Recursive(predicate, iterations, stop, satellites)` | Controls recursion properties for recursive predicates | `predicate`: Predicate name<br>`iterations`: Integer number of iterations<br>`stop`: (Optional) Predicate that stops recursion when it has rows<br>`satellites`: (Optional) List of predicates to iterate along |
| `@AttachDatabase(alias, path)` | Connects to a database file (primarily for SQLite) | `alias`: String with database alias name<br>`path`: String with path to database file |

## Examples

### @Engine
```
@Engine("sqlite");  # Use SQLite
@Engine("bigquery");  # Use BigQuery
@Engine("postgres");  # Use PostgreSQL
@Engine("duckdb");  # Use DuckDB
```

### @Ground
```
@Ground(MyPredicate);  # Save MyPredicate to default table
                       # In BigQuery/SQLite: saved to logica_test.MyPredicate
                       # In PostgreSQL/DuckDB: saved to logica_home.MyPredicate

@Ground(MyPredicate, "custom_dataset.my_table");  # Save to a specific table
```

### @OrderBy
```
@OrderBy(MyPredicate, "column_name");  # Sort MyPredicate results by column_name
```

### @Recursive
```
# Basic usage with iteration limit
@Recursive(TC, 10);  # TC predicate will iterate up to 10 times

# Using the stop condition
@Recursive(TC, 10, stop: StopCondition);  # Stops when StopCondition has any rows

# Including satellite predicates
@Recursive(TC, 10, satellites: [Helper1, Helper2]);  # Helper1 and Helper2 iterate along with TC
```

### @AttachDatabase
```
@AttachDatabase("logica_home", "wall.db");  # Connect to wall.db as logica_home
```
