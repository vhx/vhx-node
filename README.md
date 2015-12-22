# VHX Node.js API Client

The VHX API is currently Private Beta. You can request an API key by emailing api@vhx.tv.

### Installation

`npm install vhx`

### Documentation

Documentation, including a step-by-step tutorial is available on the [VHX Developer Docs ](http://dev.vhx.tv/api?javascript) site.
For Full API reference [go here](http://dev.vhx.tv/docs/api?javascript).

### Getting Started

Before requesting your first resource, you must setup your instance of the VHX Client:

```js
var vhx = require('vhx')('your VHX API key');
```

Every resource method has two arguments. The first argument is an options object and the second, an optional callback:

```js

// example customer create
vhx.customers.create({
  email: 'customer@email.com',
  name: 'First Last'
}, function(err, customer){
  err; // error is false if no error occurred
  customer; // the created customer object
});
```

### Resources & methods

products
  * [`retrieve`](http://dev.vhx.tv/docs/api/?javascript#product-retrieve)
  * [`all`](http://dev.vhx.tv/docs/api/?javascript#product-list)

customers
  * [`create`](http://dev.vhx.tv/docs/api/?javascript#customer-create)
  * [`retrieve`](http://dev.vhx.tv/docs/api/?javascript#customer-retrieve)
  * [`list`](http://dev.vhx.tv/docs/api/?javascript#customer-list)

videos
  * [`create`](http://dev.vhx.tv/docs/api/?javascript#videos-create)
  * [`retrieve`](http://dev.vhx.tv/docs/api?javascript#videos-get)
  * [`list`](http://dev.vhx.tv/docs/api?javascript#videos-list)
  * [`files`](http://dev.vhx.tv/docs/api/?javascript#videos-list-files)

collections
  * [`create`](http://dev.vhx.tv/docs/api?javascript#collections-create)
  * [`update`](http://dev.vhx.tv/docs/api?javascript#collections-update)
  * [`retrieve`](http://dev.vhx.tv/docs/api?javascript#collections-retrieve)
  * [`list`](http://dev.vhx.tv/docs/api?javascript#collections-list)
  * [`items`](http://dev.vhx.tv/docs/api?javascript#collection-items-list)

authorizations
  * [`create`](http://dev.vhx.tv/docs/api/?javascript#authorizations-create)
