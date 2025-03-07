---
outline: deep
---

# Basic Operators

To manipulate the values we learned from the facts part, now we need to learn some fundamental basic operators to do the job.

## Comparison Operators

| Symbol | Meaning                |
|--------|------------------------|
| ==     | Equals, assignment     |
| <      | Less than              |
| <=     | Less than or equal     |
| >      | Greater than           |
| >=     | Greater than or equal  |
| !=     | Not equal              |

## Binary Operators

| Symbol | Meaning                     |
|--------|-----------------------------|
| +      | Add                         |
| -      | Subtract                    |
| *      | Multiply                    |
| /      | Divide                      |
| %      | Remainder of integer division|
| ^      | Raise to power              |
| ++     | String concatenation        |

:::tip
Logic Programming is declarative, and thus there is no difference between equality and assignment, operator `==` stands for both.
:::

**Example 1**
```
Grandparent(a, d) :- Parent(a, b), Parent(c, d), b == c;
```

**Example 2**
```
Grandparent(x, y) :-
    Parent(a, b), Parent(b, c), x == a, y == c;
```

Assignment can be used to store results of intermediate computation. Example: Compute volumes and mass of metal cubes.

**Example 3**
```
MetalCube("cube1", 10, 15);
MetalCube("cube2", 20, 8);

CubeInfo(cube_id, volume, mass) :-
    MetalCube(cube_id, side, density),
    volume == side * side * side,
    mass == volume * density;
```
