var React = require('react');

var HelloWorld = React.createClass({
  render: function() {
    console.log(this.props)
    return (
      <h1>
        Hello {this.props.name}!
      </h1>
    );
  },
});

module.exports = HelloWorld;
