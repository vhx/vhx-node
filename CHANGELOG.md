### 1.8.0
**2017-03-01**

* Add support for padding custom headers with each request.

### 1.7.0
**2017-02-13**

* Add watching resource (an alias to customers/:id/watching) with the items method.
* Add watchlist resource (an alias to customers/:id/watchlist) with items, addItem, removeItem methods.
* Add proper specs

### 1.6.0
**2017-02-01**

* Add update method for video resource.

### 1.5.1
**2016-08-24**

* Fix bug with multiple callbacks being fired during async calls to resource methods, due to improper construction of request instances (stemming from cached modules).

### 1.5.0
**2016-08-19**

* Add analytics resources with `report` method
* Update readme with new node scoped links

### 1.4.0
**2016-02-18**

* Add customers `addProduct` and `removeProduct` methods

### 1.3.1
**2016-02-18**

* Update readme intro

### 1.3.0
**2016-02-16**

* Add customers `update` method for updating customers
* For consistency with other libraries, make `list` be `all` (support for `list` will remain)
* Fix bug with using href as param (instead of ID)
* Restore readme to reference `files` (videos resource) and `items` (collections resource)

### 1.2.0
**2016-01-08**

* Add customers `del` method for deleting customers
* Add `listItems` (collections) and `listFiles` (videos) methods
* Fix bug introduced from typo in 1.1.2

### 1.1.2
**2016-01-07**

* Fix bug with collection items request
* Allow for both id as stand alone param, and id as part of options object

### 1.1.1
**2015-12-22**

* Bump to align with npm

### 1.1.0
**2015-12-22**

* Add methods for products endpoint
* Fix readme links

### 1.0.2
**2015-12-21**

* Add method for listing video resource files method
* Add change log

### 1.0.1
**2015-12-15**

Initial non-beta release.
* Bump version to 1.0.1 (to avoid issue with 1.0.0 due to accidentally publishing on npm)

### 1.0.0-beta.4
**2015-11-28**

Refactored code (made it DRYer).

### 1.0.0-beta.3
**2015-11-27**

Update version and readme to be in sync for npm.

### 1.0.0-beta.2
**2015-11-27**

Fixes glaring issues in the "Initial Beta":


### 1.0.0-beta
**2015-11-24**

Initial Beta Pre-release
