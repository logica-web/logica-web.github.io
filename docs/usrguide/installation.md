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

:::info
If you see the following output, it means Logica is ready to use:
```
SELECT
  "Hello world!" AS greeting;
```
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