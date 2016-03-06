/*-------------------------------------------------------------------------------------------------------------------*\
|  Copyright (C) 2015 PayPal                                                                                          |
|                                                                                                                     |
|  Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance     |
|  with the License.                                                                                                  |
|                                                                                                                     |
|  You may obtain a copy of the License at                                                                            |
|                                                                                                                     |
|       http://www.apache.org/licenses/LICENSE-2.0                                                                    |
|                                                                                                                     |
|  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed   |
|  on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for  |
|  the specific language governing permissions and limitations under the License.                                     |
\*-------------------------------------------------------------------------------------------------------------------*/

'use strict';

// make `.jsx` file requirable by node
require('node-jsx').install();

var path = require('path');
var express = require('express');
var renderer = require('react-engine');
var compress = require("compression");

var app = express();

app.set('port', process.env.PORT || 3000);

/**
 * 0. the directory where the template files are located
 */
app.set('views', __dirname + '/public/views');

/**
 * 1. Set up a rendering engine (i.e. react-egine)
 */
// 1.0 create an instance of react-engine as a rendering instance
var engine = renderer.server.create({
  reactRoutes: path.join(__dirname + '/public/routes.jsx')
});

// 1.1 link the react-engine to a file extension -
// By default, Express will require() the engine based on the file extension.
// If you try to render a “foo.jade” file, Express invokes the following internally,
// and caches the require() on subsequent calls to increase performance.
app.engine('.jsx', engine);

// NOTE I think it's specific to react-engine (but I'm not very sure here)
app.set('view', renderer.expressView);

/**
 * 2. the default engine extension to use when omitted - set jsx as the view engine.
 * After the view engine is set, you don’t have to specify the engine or load the template engine module in your app;
 * Express loads the module internally, as shown below (for the above example).
 */
app.set('view engine', 'jsx');

/**
 * 3. How to serve static files
 */
app.use(express.static(__dirname + '/public'));

app.use(compress());


app.get('/', function(req, res) {
  /**
   * Express-compliant template engines such as Jade export a function named __express(filePath, options, callback),
   * which is called by the res.render() function to render the template code.
   *
   * Some template engines do not follow this convention.
   * The Consolidate.js library follows this convention by mapping all of the popular Node.js template engines,
   * and therefore works seamlessly within Express.
   */
  res.render('home', {
    title: 'React Engine Demo',
    name: 'Home',
    selection: 'header-home'
  });
});

app.get('/page2', function(req, res) {
  res.render('page2', {
    title: 'React Engine Demo',
    name: 'Page 2',
    selection: 'header-page2'
  });
});

app.get('/spa*', function(req, res) {

  console.log('SPA request at %s', req.url);
  
  res.render(req.url, {
    title: 'SPA - React Engine Demo',
    name: 'React SPA',
    selection: 'header-spa'
  });
});

var server = app.listen(app.get('port'), function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
