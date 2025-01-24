---
outline: deep
---

# Query Engines

## Supported Query Engines
Logica compiles to SQL, enabling users to work seamlessly with their existing data stored in various systems. Initially designed for Google BigQuery, Logica also supports other query engines to varying extents:

- Google BigQuery
- DuckDB
- PostgreSQL
- SQLite

## Specify Query Engines
To execute a Logica script, specify the query engine at the beginning of the script. For example, let's print `Hello World` using Logica. Assuming the command is:
```bash
logica greeting.l run Greeting
```
The content of `greeting.l` should be:
```
@Engine("sqlite");
Greeting("Hello World!");
```


:::tip 
To run a Logica script from the terminal, specify the file name (e.g., `greeting.l`) and use the run keyword followed by the predicate you want to display (e.g., `Greeting`).
:::

## Setting Up an Engine
The main engine used in this tutorial is SQLite, which comes bundled with Python, so no additional installation is required.

Logica engines behave consistently, making it straightforward to transfer skills from one engine (e.g., SQLite) to another (e.g., BigQuery or DuckDB).

To experiment with Google BigQuery for running Logica:

- Obtain a Google Cloud Project ID.
- Use BigQuery's free tier, which offers up to 1TB of free data processing per month—sufficient for most exploratory tasks.
