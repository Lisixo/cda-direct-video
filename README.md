# CDA Direct Video Link

If you searching module for gathering direct video links from [cda.pl][cda], you just found it!

# Requirements
* [Node.js][nodejs] (16 or better)
* ESM Modules
  
# Installation
**1.** You can install the package using the following commands:
* npm
```sh
npm install cda-direct-video
```
* yarn
```sh
yarn add cda-direct-video
```
* pnpm
```sh
pnpm add cda-direct-video
```

# Usage

```js
import { getDirectLinks } from 'cda-direct-video'

const data = await getDirectLinks('https://www.cda.pl/video/10359422ad')
```

[cda]: https://www.cda.pl
[nodejs]: https://nodejs.org/