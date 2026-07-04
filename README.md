# vue-gen-comp-cli

A simple CLI tool to generate a 4-file split Vue component structure.

## Features

This command creates:
- a Vue file
- an HTML file
- a JavaScript file
- a CSS file

inside a new component folder.

## Installation

Install it globally with:

```bash
npm install -g vue-gen-comp-cli
```

Or use it locally in a project:

```bash
npm install --save-dev vue-gen-comp-cli
```

## Generate a component

From your Vue project root, run:

```bash
make-vue-comp MyComponent
```

This will create a folder like:

```bash
src/MyComponent/
```

with these files:

```bash
src/MyComponent/MyComponent.vue
src/MyComponent/MyComponent.html
src/MyComponent/MyComponent.js
src/MyComponent/MyComponent.css
```

## Create a component in a subfolder

```bash
make-vue-comp components/forms/UserCard
```

This will generate the component under:

```bash
src/components/forms/UserCard/
```
