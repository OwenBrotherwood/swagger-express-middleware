Swagger Express Middleware
============================
#### Swagger middleware and mocks for Express.js

[![Build Status](https://img.shields.io/travis/BigstickCarpet/swagger-express-middleware.svg)](https://travis-ci.org/BigstickCarpet/swagger-express-middleware)
[![Dependencies](https://img.shields.io/david/bigstickcarpet/swagger-express-middleware.svg)](https://david-dm.org/bigstickcarpet/swagger-express-middleware)
[![Code Climate Score](https://img.shields.io/codeclimate/github/BigstickCarpet/swagger-express-middleware.svg)](https://codeclimate.com/github/BigstickCarpet/swagger-express-middleware)
[![Codacy Score](http://img.shields.io/codacy/011f89f6f0dd46e5b9b5d3662a51213d.svg)](https://www.codacy.com/public/jamesmessinger/swagger-express-middleware)
[![Coverage Status](https://img.shields.io/coveralls/BigstickCarpet/swagger-express-middleware.svg)](https://coveralls.io/r/BigstickCarpet/swagger-express-middleware)

[![npm](http://img.shields.io/npm/v/swagger-express-middleware.svg)](https://www.npmjs.com/package/swagger-express-middleware)
[![License](https://img.shields.io/npm/l/swagger-express-middleware.svg)](LICENSE)

Features
--------------------------
* __Supports Swagger 2.0 specs in JSON or YAML__ <br>
Swagger Express Middleware uses [Swagger-Parser](https://github.com/BigstickCarpet/swagger-parser) to parse, validate, and dereference Swagger files.  You can even split your spec into multiple different files using `$ref` pointers. 

* __Thoroughly tested__<br>
Over 1,000 unit tests and integration tests with 100% code coverage.  Tested on [over 100 public Google APIs](https://github.com/APIs-guru/api-models/tree/master/google).  All tests are run on Mac, Linux, and Windows using the past 3 versions of Node. But nothing's perfect, so if you find a bug, [please report it](https://github.com/BigstickCarpet/swagger-express-middleware/issues).

* __[Mock middleware](https://github.com/BigstickCarpet/swagger-express-middleware/blob/master/docs/middleware/mock.md)__<br>
__Fully-functional mock__ implementations for every operation in your API, including data persistence, all with __zero code!__  This is a great way to test-drive your API as you write it, or for quick demos and POCs.  You can even extend the mock middleware with your own logic and data to fill in any gaps.

* __[Metadata middleware](https://github.com/BigstickCarpet/swagger-express-middleware/blob/master/docs/middleware/metadata.md)__<br>
Annotates each request with all the relevant information from the Swagger definition.  The path, the operation, the parameters, the security requirements - they're all easily accessible at `req.swagger`.
	
* __[Parse Request middleware](https://github.com/BigstickCarpet/swagger-express-middleware/blob/master/docs/middleware/parseRequest.md)__<br>
Parses incoming requests and converts everything into the correct data types, according to your Swagger API definition.

* __[Validate Request middleware](https://github.com/BigstickCarpet/swagger-express-middleware/blob/master/docs/middleware/validateRequest.md)__<br>
Ensures that every request complies with your Swagger API definition, or returns the appropriate HTTP error codes if needed.  Of course, you can catch any validation errors and handle them however you want.

* __[CORS middleware](https://github.com/BigstickCarpet/swagger-express-middleware/blob/master/docs/middleware/CORS.md)__<br>
Adds the appropriate CORS headers to each request and automatically responds to CORS preflight requests, all in compliance with your Swagger API definition.

* __[Files middleware](https://github.com/BigstickCarpet/swagger-express-middleware/blob/master/docs/middleware/files.md)__<br>
Serves the Swagger API file(s) in JSON or YAML format so they can be used with front-end tools like [Swagger UI](http://www.swagger.io), [Swagger Editor](http://editor.swagger.io), and [Postman](http://getpostman.com).


Installation and Use
--------------------------
Install using [NPM](https://docs.npmjs.com/getting-started/what-is-npm).

````bash
npm install swagger-express-middleware
````
Then use it in your [Node.js](http://nodejs.org/) script like this: 

````javascript
var express = require('express');
var middleware = require('swagger-express-middleware');

var app = express();

middleware('PetStore.yaml', app, function(err, middleware) {
    // Add all the Swagger Express Middleware, or just the ones you need.
    // NOTE: Some of these accept optional options (omitted here for brevity)
    app.use(
        middleware.metadata(),
        middleware.files(),
        middleware.CORS(),
        middleware.parseRequest(),
        middleware.validateRequest(),
        middleware.mock()
    );

    app.listen(8000, function() {
        console.log('The PetStore sample is now running at http://localhost:8000');
    });
});
````

Samples & Walkthroughs
--------------------------
Swagger Express Middleware comes two samples that use the [Swagger Pet Store API](https://github.com/BigstickCarpet/swagger-express-middleware/blob/master/samples/PetStore.yaml).

#### Sample 1
This sample demonstrates the most simplistic usage of Swagger Express Middleware. It simply creates a new Express Application and adds all of the Swagger middleware without changing any options, and without adding any custom middleware.

* [Source Code](https://github.com/BigstickCarpet/swagger-express-middleware/blob/master/samples/sample1.js)
* [Walkthrough](https://github.com/BigstickCarpet/swagger-express-middleware/blob/master/docs/samples/running.md)


#### Sample 2
This sample demonstrates a few more advanced features of Swagger Express Middleware, such as setting a few options, initializing the mock data store, and adding custom middleware logic.

* [Source Code](https://github.com/BigstickCarpet/swagger-express-middleware/blob/master/samples/sample2.js)
* [Walkthrough](https://github.com/BigstickCarpet/swagger-express-middleware/blob/master/docs/samples/walkthrough2.md)


Contributing
--------------------------
I welcome any contributions, enhancements, and bug-fixes.  [File an issue](https://github.com/BigstickCarpet/swagger-express-middleware/issues) on GitHub and [submit a pull request](https://github.com/BigstickCarpet/swagger-express-middleware/pulls).  Use JSHint to make sure your code passes muster.  (see [.jshintrc](.jshintrc)).

Here are some things currently on the __to-do list__:

* __Response validation__ - The plan is to add code that intercepts calls to `res.send()` and validates the response against the Swagger API.

* __Security middleware__ - The [Metadata middleware](https://github.com/BigstickCarpet/swagger-express-middleware/blob/master/docs/middleware/metadata.md) already exposes security metadata for each request, and the [Validate Request middleware](https://github.com/BigstickCarpet/swagger-express-middleware/blob/master/docs/middleware/validateRequest.md) does some very basic authentication checks, but any _real_ authentication/authorization logic currently requries the developer to write custom middleware.  It'll be dead-simple to implement `basic` and `apiKey` authentication.  `oauth2` might be a bit more complicated, but still doable.

* __XML Support__ - You can already use XML with Swagger Express Middleware, but it simply gets parsed as a string.  You get no schema validation or automatic parsing.  Now that Swagger 2.0 [officially supports XML](https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md#xmlObject), I intend to add support for XML with the same features as JSON.


License
--------------------------
Swagger-Server is 100% free and open-source, under the [MIT license](LICENSE). Use it however you want.

