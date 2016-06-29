/// <reference path="../dts/d3.d.ts"/>

export module mentat {
  class Map {
    constructor() {
      console.log("HI");

    }

    country(code: string) {
      if (code === 'ca') {
        return function(width, height) {
          var projection = d3.geo.azimuthalEqualArea()
              .rotate([100, -45])
              .center([5, 20])
              .scale(850)
              .translate([width/2, height/2])

          var path = d3.geo.path()
              .projection(projection);

          d3.json("//s3.amazonaws.com/f.wishabi.ca/development_ezdz/mentat/1.0.0/canada.json", function(error, ca) {
            if (error) throw error;

            g.append("g")
                .attr("id", "states")
              .selectAll("path")
                .data(ca.features)
              .enter().append("path")
                .attr("d", path)
                .on("click", clicked);
          });
        }
      } else {
        return function(width, height) {
          var projection = d3.geo.albersUsa()
              .scale(1070)
              .translate([width / 2, height / 2]);

          var path = d3.geo.path()
              .projection(projection);

          d3.json("//s3.amazonaws.com/f.wishabi.ca/development_ezdz/mentat/1.0.0/us.json", function(error, us) {
            if (error) throw error;

            g.append("g")
                .attr("id", "states")
              .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
              .enter().append("path")
                .attr("d", path)
                .on("click", clicked);
          });
        }
      }
    }

    build(data: any?) {
      var width = 960,
          height = 640,
          centered;

      var svg = d3.select("body").append("svg")
          .attr("width", width)
          .attr("height", height);

      svg.append("rect")
          .attr("class", "background")
          .attr("width", width)
          .attr("height", height)
          .on("click", clicked);

      var g = svg.append("g");

      // Construct svg paths based on geoJson data,
      // all we need to pass is country and width/height information
      country('ca')(width, height);

      // functionailty for when a state/province is clicked
      // We zoom in on the centroid by a factor of 2
      function clicked(d) {
        var x, y, k;

        if (d && centered !== d) {
          var centroid = path.centroid(d);
          x = centroid[0];
          y = centroid[1];
          k = 4;
          centered = d;
        } else {
          x = width / 2;
          y = height / 2;
          k = 1;
          centered = null;
        }

        g.selectAll("path")
            .classed("active", centered && function(d) { return d === centered; });

        g.transition()
            .duration(750)
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
            .style("stroke-width", 1.5 / k + "px");
      }
    }
  }
}


// TODO
// 1) refactor this code so its good
// 2) queuejs for importing geojsons
// 3) upload geojson files with deploy