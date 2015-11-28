# VHX Node.js API Client (BETA)

The VHX API is currently Private Beta. You can request an API key by emailing api@vhx.tv.

### Installation

`npm install vhx@1.0.0-beta.3`

### Documentation

Documentation, including a step-by-step tutorial is available on the [VHX Developer Docs ](http://dev.vhx.tv/api?node) site.
For Full API reference [go here](http://dev.vhx.tv/docs/api?node).

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
  name: 'First Last',
  subscription: 'https://api.vhx.tv/subscriptions/1'
}, function(err, customer){
  err; // error is false if no error occurred
  customer; // the created customer object
});
```

### Resources & methods

videos
  * [`create`](http://dev.vhx.tv/docs/api/?node#videos-create)
  * [`retrieve`](http://dev.vhx.tv/docs/api?node#videos-retrieve)
  * [`list`](http://dev.vhx.tv/docs/api?node#videos-list)

customers
  * [`create`](http://dev.vhx.tv/docs/api/?node#customer-create)
  * [`retrieve`](http://dev.vhx.tv/docs/api/?node#customer-retrieve)
  * [`list`](http://dev.vhx.tv/docs/api/?node#customer-list)

authorizations
  * [`create`](http://dev.vhx.tv/docs/api/?node#authorizations-create)

collections
  * [`create`](http://dev.vhx.tv/docs/api?node#collections-create)
  * [`update`](http://dev.vhx.tv/docs/api?node#collections-update)
  * [`retrieve`](http://dev.vhx.tv/docs/api?node#collections-retrieve)
  * [`list`](http://dev.vhx.tv/docs/api?node#collections-list)
  * [`items`](http://dev.vhx.tv/docs/api?node#collections-items)
