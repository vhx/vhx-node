# VHX Node.js API Bindings

### Installation

`npm install vhx`

### Documentation

Documentation is available at http://dev.vhx.tv/docs/api/node.
Full API reference is available at http://dev.vhx.tv/docs/api?node.

### Overview

Every resource is accessed via your `vhx` instance:

```js
var vhx = require('vhx')(' your VHX API key ');
```

Every resource method has two argmuents. The first argument is an options object and the second, an optional callback:

```js
vhx.customers.create({
  email: 'customer@email.com',
  name: 'First Last',
  subscription: customer.subscription
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