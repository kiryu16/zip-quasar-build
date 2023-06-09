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

The zipQuasarBuild function accepts 3 parameters; path of the folder to compress, zip name and quasar mode.

la función zipQuasarBuild debe ser agregada dentro del parametro afterBuild que se encuentra dentro de build en el objeto de configuración de quasar.conf.

Example:

```js
afterBuild({ quasarConf }) {
  zipQuasarBuild(quasarConf.build.distDir, 'zip-name', quasarConf.ctx.modeName)
}
```

After performing a build the zipQuasarBuild function will compress the folder and open a window where the folder was compressed.
