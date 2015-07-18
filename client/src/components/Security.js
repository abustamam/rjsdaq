var React = require('react');
var PriceAge = require('./PriceAge');

var Security = React.createClass({
  // propTypes: {
  //   name: PropTypes.string.isRequired,
  //   price: PropTypes.number,
  //   symbol: PropTypes.string.isRequired,
  //   unitsHeld: PropTypes.number.isRequired,
  // },

  // SPECIAL METHODS

  getInitialState: function() {
    return {
      changePercent: null,
    };
  },

  componentWillReceiveProps: function(nextProps){
    var changePercent = (nextProps.price - this.props.price)/this.props.price;
    this.setState({
      changePercent: changePercent,
    });
  },

  render: function() {
    console.log(this.props.name, this.state.changePercent);
    var classname = "";
    var sign = "";
    if (this.state.changePercent > 0) {
      classname = "increasing";
      sign = "+"
    } else if (this.state.changePercent < 0) {
      classname = "decreasing";
    }


    console.log(classname);

    return (
      <li>
        <h2>{this.props.name}<small>({this.props.symbol.toUpperCase()})</small></h2>
        <p className="price">{this.props.price}¢</p>

        <PriceAge />

        <ul className="quotes">
          <li style={{height: '59.09%'}}>42¢</li>
        </ul>

        <section className="analytics">
          <h3>Change</h3>
          <p className={"change " + classname}>{sign + Math.round( this.state.changePercent*100 * 10 ) / 10}%</p>

          <h3>Trend</h3>
          <p className="trend decreasing">-36.5%</p>
        </section>
      </li>
    )
  }
})


module.exports = Security;
