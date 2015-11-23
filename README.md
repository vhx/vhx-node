# VHX Node.js API Client (BETA)

You can sign up for a VHX account at https://vhx.tv.

### Installation

`npm install vhx`

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
  * [`create`](http://dev.vhx.tv/docs/api?node#create_customer)
  * [`update`](http://dev.vhx.tv/docs/api?node#update_customer)
  * [`retrieve`](http://dev.vhx.tv/docs/api?node#retrieve_customer)
  * [`list`](http://dev.vhx.tv/docs/api?node#list_customers)

 customers
  * [`create`](http://dev.vhx.tv/docs/api?node#create_customer)
  * [`update`](http://dev.vhx.tv/docs/api?node#update_customer)
  * [`retrieve`](http://dev.vhx.tv/docs/api?node#retrieve_customer)
  * [`list`](http://dev.vhx.tv/docs/api?node#list_customers)

authorizations
  * [`create`](http://dev.vhx.tv/docs/api?node#create_authorization)

collections
  * [`create`](http://dev.vhx.tv/docs/api?node#create_collection)
  * [`update`](http://dev.vhx.tv/docs/api?node#update_collection)
  * [`retrieve`](http://dev.vhx.tv/docs/api?node#retrieve_collection)
  * [`list`](http://dev.vhx.tv/docs/api?node#list_collections)
  * [`items`](http://dev.vhx.tv/docs/api?node#list_collection_items)
