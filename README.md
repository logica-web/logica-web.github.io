# Logica Online Tutorial Setup

### Credit

Huge thanks to [Vitepress](https://vitepress.dev/)

### Implementation

```
conda create -n logica_web
conda activate logica_web
conda install conda-forge::nodejs
npm install vitepress --save-dev
npm run docs:dev
```

### Rendering Existing Notebook
```bash
jupyter nbconvert %target%.ipynb --to html --template=lab
```
After generating the HTML file, add the following CSS to the `<style>` section of the HTML to eliminate extra spacing:
```css
<style>
    html, body {
        margin: 0;
        padding: 0;
        overflow: hidden; /* Avoid scrollbars inside the iframe */
    }
</style>
```