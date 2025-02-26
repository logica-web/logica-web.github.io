---
outline: deep
---

# Installation

## Using pip

Logica can be installed by using pip.

```bash
pip install logica
```

With the package installed, users can directly use Logica in terminal
```bash
logica - print Greet <<<'Greet(greeting: "Hello world!")'
```

<!-- :::info
You will get the following 
```
SELECT
  "Hello world!" AS greeting;
```
::: -->
:::tip
To learn how to use it in a notebook or execute other commands in the terminal, refer to the Logica Execution under User Guide .
:::

## Development
If you'd like to explore the latest features or test the ones you've implemented, you can clone the GitHub repository and use it directly:
```bash
git clone https://github.com/evgskv/logica
cd logica
./logica - print Greet <<<'Greet(greeting: "Hello world!")'
```

## Online PlayGround

In addition, you can explore Logica using our online playground and start experimenting right away.

[🏈 Play Ground](https://logica.dev/sandbox.html)