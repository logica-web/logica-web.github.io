---
outline: deep
---

# What is Logica?
Logica, short for "Logic with Aggregation," is an open-source declarative logic programming language designed for data manipulation. It extends the syntax of traditional logic programming to enable intuitive and efficient data handling. By compiling to SQL, Logica combines the expressive syntax of logic programming with the power and efficiency of SQL engines.

## Logica Programming

Logic programming is a declarative paradigm where programs are composed of logical statements. Originating in academia during the late 1960s, prominent examples of logic programming languages include [Prolog](https://en.wikipedia.org/wiki/Prolog) and [Datalog](https://en.wikipedia.org/wiki/Datalog). Logica is a successor to [Yedalog](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.SNAPL.2015.63), a logic programming language developed at Google, and belongs to the Datalog family.

Both Datalog and relational databases share a foundational idea: representing data as relations and manipulating it through operations on these relations. However, Datalog and SQL differ in their descriptive approaches. Datalog draws inspiration from the mathematical syntax of first-order propositional logic, while SQL adopts a natural language-inspired syntax.

SQL's natural language-based syntax was intended to make databases accessible to individuals without formal training in programming or mathematics. However, this accessibility can become a limitation when expressing complex logic, leading to verbose and hard-to-read queries. Logica, following in Yedalog's footsteps, bridges this gap by combining the elegance of logic programming syntax with the practical capabilities of modern SQL infrastructure.

## How does Logica work?

Logica translates logic programs into SQL expressions, allowing them to be executed on platforms like BigQuery, a state-of-the-art SQL engine. While Datalog and SQL are theoretically equivalent in database theory, their practical implementation involves nuances, such as handling disjunction and negation. Logica makes deliberate design choices to simplify the resulting SQL structure, enabling users to write comprehensible and efficient programs that leverage SQL's advanced execution capabilities.