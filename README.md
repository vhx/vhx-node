# VHX Node.js API Client

API applications can be created in the [VHX admin](https://www.vhx.tv/admin/platforms) or by emailing [api@vhx.tv](mailto:api@vhx.tv)

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

Every resource method has two arguments. The first argument is an options object or identifier and the second, an optional callback:

```js

// example customer create
vhx.customers.create({
  email: 'customer@email.com',
  name: 'First Last'
}, function(err, customer) {
  // err, = error is false if no error occurred
  // customer = the created customer object
});
```

Headers can be passed in as the last argument, which would either be the second or third argument depending on the method. See each individual method for specifics.
```js
// example video create with header
vhx.videos.create({
  title: 'My Video',
}, { 'VHX-Client-IP': '0.0.0.0' }, function(err, customer) {
});
```

### Resources & methods

products
  * [`retrieve`](http://dev.vhx.tv/docs/api/?node#product-retrieve)
  * [`all`](http://dev.vhx.tv/docs/api/?node#product-list)

customers
  * [`create`](http://dev.vhx.tv/docs/api/?node#customer-create)
  * [`retrieve`](http://dev.vhx.tv/docs/api/?node#customer-retrieve)
  * [`update`](http://dev.vhx.tv/docs/api/?node#customer-update)
  * [`all`](http://dev.vhx.tv/docs/api/?node#customer-list)
  * [`del`](http://dev.vhx.tv/docs/api/?node#customer-delete)
  * [`addProduct`](http://dev.vhx.tv/docs/api/?node#customer-add-product)
  * [`removeProduct`](http://dev.vhx.tv/docs/api/?node#customer-remove-product)

videos
  * [`create`](http://dev.vhx.tv/docs/api/?node#videos-create)
  * [`retrieve`](http://dev.vhx.tv/docs/api?node#videos-get)
  * [`update`](http://dev.vhx.tv/docs/api?node#videos-update)
  * [`all`](http://dev.vhx.tv/docs/api?node#videos-list)
  * [`files`](http://dev.vhx.tv/docs/api/?node#videos-list-files)

collections
  * [`create`](http://dev.vhx.tv/docs/api?node#collections-create)
  * [`update`](http://dev.vhx.tv/docs/api?node#collections-update)
  * [`retrieve`](http://dev.vhx.tv/docs/api?node#collections-retrieve)
  * [`all`](http://dev.vhx.tv/docs/api?node#collections-list)
  * [`items`](http://dev.vhx.tv/docs/api?node#collection-items-list)

authorizations
  * [`create`](http://dev.vhx.tv/docs/api?node#authorizations-create)

analytics
  * [`report`](http://dev.vhx.tv/docs/api?node#analytics-report)
