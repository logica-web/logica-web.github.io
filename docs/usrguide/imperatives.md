# Logica Imperatives
Logica imperatives are special directives that start with `@` and provide instructions to the Logica engine. They control how the program is processed, executed, or how results are presented.

| Imperative <div style="width: 120pt;"></div> | Description | Arguments |
|------------|-------------|-----------|
| `@Engine(engine)` | Specifies which SQL engine to use for query execution | `engine`: String with engine name ("sqlite", "bigquery", "postgres", "duckdb") |
| `@Ground(predicate, table)` | Instructs Logica to save a predicate to the database | `predicate`: Predicate name to be saved<br>`table`: (Optional) String with target table name. By default saves to `logica_test.Predicate` in BigQuery and SQLite, or `logica_home.Predicate` in DuckDB and PostgreSQL |
| `@Limit(predicate, limit)` | Instructs Logica to limit the number of rows in the `predicate` to `limit` | `predicate`: Name of the predicate<br>`limit`: Integer limit |
| `@OrderBy(predicate, column1, column2, ...)` | Specifies the sort order for a predicate's results | `predicate`: Predicate name<br>`column1, column2, ...`: Strings with column names and optional sort direction ("DESC") |
| `@Recursive(predicate, iterations, stop, satellites)` | Controls recursion properties for recursive predicates | `predicate`: Predicate name<br>`iterations`: Integer number of iterations<br>`stop`: (Optional) Predicate that stops recursion when it has rows<br>`satellites`: (Optional) List of predicates to iterate along |
| `@AttachDatabase(alias, path)` | Connects to a database file (primarily for SQLite) | `alias`: String with database alias name<br>`path`: String with path to database file |

## Examples

### `@Engine`
```
@Engine("sqlite");  # Use SQLite engine for this program.

# The rest of the program uses the specified engine.
Edge("a", "b");
Edge("b", "c");
Path(x, y) distinct :- Edge(x, y) | (Edge(x, z), Path(z, y));
```

### `@Ground`
```
@Engine("sqlite");
@Ground(MyPredicate);  # Save MyPredicate to default table.
             # In BigQuery/SQLite: saved to logica_test.MyPredicate.
             # In PostgreSQL/DuckDB: saved to logica_home.MyPredicate.

# Define the predicate.
MyPredicate(user:, score:) :-
  UserActivity(user:, actions:),
  score = Sum{action.cost :- action in actions};

# Using a custom table name.
@Ground(TopUsers, "analytics.high_value_users");
TopUsers(user:) :- MyPredicate(user:, score:), score > 100;
```

### `@OrderBy`
```
@OrderBy(ExpensiveItems, "price DESC");  # Sort ExpensiveItems by price in descending order.
ExpensiveItems(name:, price:) :- Product(name:, price:), price > 100;

# Multiple OrderBy directives can be used for different predicates.
@OrderBy(NewCustomers, "signup_date DESC");
NewCustomers(id:, name:, signup_date:) :- Customer(id:, name:, signup_date:), 
                      signup_date > "2023-01-01";

# Sort by multiple columns with mixed directions.
@OrderBy(SalesReport, "region", "total_sales DESC", "product_name");
SalesReport(region:, product_name:, total_sales:) :- 
  Sales(region:, product_name:, sales:),
  total_sales = Sum{amount :- sale in sales, amount = sale.amount};
```

### `@Recursive`
```
# Define a graph with edges.
Edge("a", "b");
Edge("b", "c");
Edge("c", "d");

# Compute transitive closure with 10 iterations.
@Recursive(Path, 10);
Path(x, y) distinct :- Edge(x, y);
Path(x, y) distinct :- Path(x, z), Edge(z, y);

# Using a stop condition.
@Recursive(ShortPath, 20, stop: ReachedTarget);
ShortPath(node) Min= distance :- node = "start", distance = 0;
ShortPath(node) Min= distance + 1 :- ShortPath(prev, distance), Edge(prev, node);
ReachedTarget() :- ShortPath("target");
```

### `@AttachDatabase`
```
@AttachDatabase("db", "some_db_file.db");  # Connect to some_db_file.db as db.
# Querying the database.
Person(name:) :- db.Engineer(name:) | db.Analyst(name:);
```
