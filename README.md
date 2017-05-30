# diffset

[![Greenkeeper badge](https://badges.greenkeeper.io/observing/diffset.svg)](https://greenkeeper.io/)

A small set numbers where only the diff of the previously added value is stored.
So if your previous value was 120 and you store 123 it will only store the
number 3.

## Installation

The module is published in the public npm registry and can be installed by
running:

```
npm install --save diffset
```

## API

```js
var Diffset = require('diffset');

var ds = new Diffset(100);
```

In the example above we import the `diffset` module and give it a starting value
of `100`. If no starting value is provided it will default to `0`.

#### push

Add a new value to the set, the method accepts multiple arguments if you want to
do a bulk add.

```js
ds.push(120, 122, 130, 100, 101);
ds.push(111);
```

#### flush

Clear the internally stored diff set that you created by pushing in new values
and return a copy of the data.

```js
var data = ds.flush();
console.log(data) // 20, 2, 8, -30, 1, 10
```

## License

MIT
