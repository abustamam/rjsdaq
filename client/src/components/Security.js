var React = require('react');
var PriceAge = require('./PriceAge');

var Security = React.createClass({
  render: function() {
    return (
      <li>
        <h2>Bunnies <small>(BNY)</small></h2>
        <p className="price">33¢</p>

        <PriceAge />

        <ul className="quotes">
          <li style={{height: '59.09%'}}>42¢</li>
        </ul>

        <section className="analytics">
          <h3>Change</h3>
          <p className="change increasing">+10.0%</p>

          <h3>Trend</h3>
          <p className="trend decreasing">-36.5%</p>
        </section>
      </li>
    )
  }
})


module.exports = Security;
