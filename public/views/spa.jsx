
'use strict';

var Layout = require('./layout.jsx');
var React = require('react');
var Nav = require('./nav.jsx');
var Router = require('react-router');

module.exports = React.createClass({

  render: function render() {

    return (
      <Layout {...this.props} addBundle='true'>
        <Nav {...this.props}/>
          <div>Test by Nguyen Hong Hien </div>
        <Router.RouteHandler {...this.props}/>
      </Layout>
    );
  }
});
