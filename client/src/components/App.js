var Security = require('./Security');
var Holding = require('./Holding')
var React = require('react');

var App = React.createClass({
  render: function() {
    var securityElements = Object.keys(this.props.securities).map(function(symbol){
      var security = this.props.securities[symbol];
      return (
        <Security
          name={security.name}
          symbol={symbol}
          price={security.price}
        />
      );
    }.bind(this));

    return (
      <div>
        <section className="console">

          <h1>The RJSDAQ</h1>

          <label htmlFor="sortKey">Sort by</label>
          <select id="sortKey">
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
          <select id="sortOrder">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

          <h2>My portfolio</h2>

          <p>You have <strong>$100.00</strong> in cash reserves</p>

          <section id="portfolio">
            <table>
              <tbody>
                <Holding />
              </tbody>
            </table>
          </section>

          <h2>Go public</h2>
          <p>You've earned it</p>

          <form id="goPublic">
            <input id="newSecurityName" placeholder="Name (eg. Alphabet soup)" type="text" />
            <input id="newSecuritySymbol" placeholder="Symbol (eg. ABC)" type="text" />
            <input disabled="disabled" type="submit" value="Go public!" />
          </form>
        </section>

        <ul id="securities">
          {securityElements}
        </ul>
      </div>
    );
  }
});

module.exports = App;
