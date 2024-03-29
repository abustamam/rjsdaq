var React = require('react');
var PriceAge = require('./PriceAge');

var GRAPH_BAR_MARGIN = 5;
var GRAPH_BAR_WIDTH = 18;

var PropTypes = React.PropTypes;

var Security = React.createClass({
  propTypes: {
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    symbol: PropTypes.string.isRequired,
    unitsHeld: PropTypes.number.isRequired,
  },

  // SPECIAL METHODS

  getInitialState: function() {
    return {
      priceHistory: this.props.price == null
        ? []
        : [this.props.price],
      changePercent: null,
      graphWidth: null,
    };
  },

  calculateGraphWidth: function() {
    var graphElement = React.findDOMNode(this.refs.priceGraph);
    this.setState({
      graphWidth: graphElement.clientWidth,
    })
  },

  componentDidMount: function(){
    window.addEventListener('resize', this.calculateGraphWidth);
    this.calculateGraphWidth();
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.calculateGraphWidth);
  },

  componentWillReceiveProps: function(nextProps){
    if (this.props.price != nextProps.price) {
      var newPriceHistory = [].concat(this.state.priceHistory);
      newPriceHistory.push(nextProps.price);
      var changePercent = (nextProps.price - this.props.price)/this.props.price;
      this.setState({
        priceHistory: newPriceHistory,
        changePercent: changePercent,
      });
    }
  },

  renderPriceBars: function() {
    var maxPrice;
    var minPrice;
    var displayPrices;
    var howManyBarsFit = Math.floor(
      (this.state.graphWidth - GRAPH_BAR_MARGIN) /
      (GRAPH_BAR_WIDTH + GRAPH_BAR_MARGIN)
    );

    displayPrices = this.state.priceHistory.slice(-howManyBarsFit);


    displayPrices.forEach(function(price){
      if (!maxPrice || price > maxPrice) {
        maxPrice = price;
      }
      if (!minPrice || price < minPrice) {
        minPrice = price;
      }
    })

    return displayPrices.map(function(price){
      return this.renderPriceBar(price,minPrice,maxPrice);
    }.bind(this));
  },

  renderPriceBar: function(price, minPrice, maxPrice) {
    var delta = maxPrice - minPrice;
    var percentHeight;

    if (delta === 0) {
      percentHeight = 100;
    } else {
      var percentHeight = 10 + (
        (1 - ((maxPrice - price) / delta)) * 90
      );
    }
    return (
      <li style={{height: percentHeight + '%'}}>
        {price}¢
      </li>
    )
  },

  renderChange: function(price){
    var classname = "";
    var sign = "";
    if (this.state.changePercent > 0) {
      classname = "increasing";
      sign = "+"
    } else if (this.state.changePercent < 0) {
      classname = "decreasing";
    }
    return <p className={"change " + classname}>{sign + Math.round( this.state.changePercent*100 * 10 ) / 10}%</p>
  },

  render: function() {
    return (
      <li>
        <h2>{this.props.name}<small>({this.props.symbol.toUpperCase()})</small></h2>
        <p className="price">{this.props.price}¢</p>

        <PriceAge price={this.props.price}/>

        <ul className="quotes" ref="priceGraph">
          {this.renderPriceBars()}
        </ul>

        <section className="analytics">
          <h3>Change</h3>
          {this.renderChange()}

          <h3>Trend</h3>
          <p className="trend decreasing">-36.5%</p>
        </section>
      </li>
    )
  }
})


module.exports = Security;
