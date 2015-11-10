# VHX Node.js API Client

You can sign up for a VHX account at https://vhx.tv.

### Installation

`npm install vhx`

### Documentation

Documentation is available at http://dev.vhx.tv/docs/api/node.
Full API reference is available at http://dev.vhx.tv/docs/api?node.

## Getting Started

Before requesting your first resource, you must setup your instance of the VHX Client:

```js
var vhx = require('vhx')('your VHX API key');
```

Every resource method has two arguments. The first argument is an options object and the second, an optional callback:

```js

// vhx.{resource}.{method}(options, callback);

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

 customers
  * [`create`](http://dev.vhx.tv/docs/api?node#create_customer)
  * [`update`](http://dev.vhx.tv/docs/api?node#update_customer)
  * [`retrieve`](http://dev.vhx.tv/docs/api?node#retrieve_customer)
  * [`list`](http://dev.vhx.tv/docs/api?node#list_customers)

authorizations
  * [`create`](http://dev.vhx.tv/docs/api?node#create_authorization)

videos
  * [`create`](http://dev.vhx.tv/docs/api?node#create_customer)
  * [`update`](http://dev.vhx.tv/docs/api?node#update_customer)
  * [`retrieve`](http://dev.vhx.tv/docs/api?node#retrieve_customer)
  * [`list`](http://dev.vhx.tv/docs/api?node#list_customers)

collections
  * [`create`](http://dev.vhx.tv/docs/api?node#create_collection)
  * [`update`](http://dev.vhx.tv/docs/api?node#update_collection)
  * [`retrieve`](http://dev.vhx.tv/docs/api?node#retrieve_collection)
  * [`list`](http://dev.vhx.tv/docs/api?node#list_collections)
  * [`items`](http://dev.vhx.tv/docs/api?node#list_collection_items)
