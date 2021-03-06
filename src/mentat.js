var moment = require("moment");

// Libraries
var Choropleth = require("./lib/Choropleth");
var Line = require("./lib/Line");
var Bar = require("./lib/Bar");
var XBar = require("./lib/XBar");
var Bump = require("./lib/Bump");
var Zoom = require("./lib/Zoom");

function mentat(selector, type, data, key, opts) {
  // We want to make sure all our required components
  // are available
  if (typeof selector === "undefined") {
    console.warn("Mentat: A valid selector is required.");
    return;
  }
  if (typeof type === "undefined") {
    console.warn("Mentat: Pick a visualization type.");
    return;
  }
  if (typeof key === "undefined") {
    console.warn("Mentat: Need a dimension/metric definition in key.");
    return;
  }
  if (typeof data === "undefined") {
    console.warn("Mentat: Missing data.");
    return;
  }
  if (data.length < 1) {
    console.warn("Mentat: Data array is empty");
    return;
  }

  // Mentat Visualization library
  switch (type) {
    // Choropleth - e.g https://bl.ocks.org/mbostock/4060606
    // A map that uses differences in shading, coloring, or the
    // placing of symbols within predefined areas to indicate
    // the average values of a property or quantity in those areas.
    case "choropleth":
      return new Choropleth(
        selector,
        data,
        key,
        opts.country || "ca",
        opts.color,
        opts.tooltip
      );

    // Line Graph - http://bl.ocks.org/mbostock/3884955
    case "line":
      return new Line(
        selector,
        data,
        key,
        opts.scale,
        opts.color,
        opts.tooltip,
        opts.grid,
        opts.zoom
      );

    // Bar Graph - http://bl.ocks.org/mbostock/3886208
    case "bar":
      return new Bar(selector, data, key, opts.scale, opts.color, opts.tooltip);

    // X Bar Graph (horizontal)
    case "xbar":
      return new XBar(
        selector,
        data,
        key,
        opts.scale,
        opts.color,
        opts.tooltip
      );

    case "zoom":
      return new Zoom(selector, data, key, opts.color, opts.tooltip);

    // Bump Chart - http://www.visualcinnamon.com/babynamesus
    case "bump":
    // [WIP]
    // return new Bump(
    //   selector, data, key,
    //   opts.scale,
    //   opts.color,
    //   opts.tooltip
    // );

    default:
      console.warn(type + " is not implemented by mentat");
  }
}

// TODO
// - introduce modes into various visualizations
// - add click callback
// - legend duh

// TODO tier 2
// some sort of gantt chart
// http://dataaddict.fr/prenoms/#christelle,christophe,carole,berengere,aurelie,isabelle,david,jean,michel,philippe
// http://bl.ocks.org/mbostock/3943967
// http://bl.ocks.org/mbostock/1256572
// Expand DataSet to fetch from ajax endpoint
// Work on updatable graph
module.exports = mentat;
