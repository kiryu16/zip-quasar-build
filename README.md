# Zip Quasar Build

Zip the quasar build folder

## Installation

With NPM

```
npm install --save-dev zip-quasar-build
```

With Yarn

```
yarn add -D zip-quasar-build
```

## Usage

At the beginning of the quasar.conf file import the library

```js
const { zipQuasarBuild } = require("zip-quasar-build");
```

or in module type

```js
import { zipQuasarBuild } from "zip-quasar-build";
```

The zipQuasarBuild function accepts an object with 4 parameters; path of the folder to compress, zip name, quasar mode and open file explorer.

The zipQuasarBuild function must be added inside the afterBuild parameter found inside build in the quasar.conf configuration object.

Example:

```js
afterBuild({ quasarConf }) {
  zipQuasarBuild({
    input: quasarConf.build.distDir,
    fileName: 'zip-name',
    quasarMode: quasarConf.ctx.modeName,
    openFE: true
  })
}
```

After performing a build the zipQuasarBuild function will compress the folder and open a window where the folder was compressed.
