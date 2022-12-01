## Introduction

This is demo project to demonstrate how source map works.

Here, it uses [typescript](https://www.typescriptlang.org/) and [rollup.js](https://rollupjs.org/guide/en/) to bundle code located in the src folder and put it in the `dist` folder.

Then the tool - `restore-source-map.js` will restore the bundle code from `dist` into original code put in the `output` folder.

## Usage

### To bundle code

```bash
yarn run build
```

### To restore code

```bash
yarn run restore-source-map
```

## Git Commit

Use this command to commit in order to follow the commit message style

```bash
git commit
# finish the rest of commit options
```

## Git Commit Message - [Conventional Commits](https://www.conventionalcommits.org/en)

Add scope if possible (ex. `feat(operator): add new feature`).

| Type     | Description                                                                                            |
| -------- | ------------------------------------------------------------------------------------------------------ |
| feat     | A new feature                                                                                          |
| fix      | A bug fix                                                                                              |
| docs     | Documentation only changes                                                                             |
| style    | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) |
| refactor | A code change that neither fixes a bug nor adds a feature                                              |
| perf     | A code change that improves performance                                                                |
| test     | Adding missing tests or correcting existing tests                                                      |
| build    | Changes that affect the build system or external dependencies (example scopes: Cargo, Docker)          |
| ci       | Changes to our CI configuration files and scripts (example scopes: Drone)                              |
| chore    | Other changes that don't modify src or test files                                                      |
