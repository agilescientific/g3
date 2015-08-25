var wiggle = g3.wiggle = {};

wiggle.draw = function(options, wigData, elem){

  var margin = {top: 50, right: 10, bottom: 30, left: 30},
  width = options.width || $(elem).width() - 2 * margin.left,
  height = options.height || 800,
  skip = options.skip || 20,
  gain = options.gain || 20,
  max = options.max, // ADD A WAY TO GRAB MAX IF NONE IS GIVEN
  xDomain = options.xDomain || [0, data.length],
  yDomain = options.yDomain || [0, data[0].length],
  c = options.c;
  
  // Set x y scales
  var x = d3.scale.linear()
    .domain(xDomain)
    .range([0, width]);
  var y = d3.scale.linear()
    .domain(yDomain)
    .range([0, height]);

  // Set x y axis
  var xAxis = createAxis(x, -height, "top");
  var yAxis = createAxis(y, -width, "left");

  // Append svg object to dom element
  var svg = d3.select(elem).append("svg")
    .attr("class", "log_plot")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.bottom + margin.top) 
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Create and append SVG axis
  svg.append("g")
    .attr("class", "x axis")
    .call(xAxis);
  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  for(var k = wigData.data.length - 1; k >= 0; k--){
    if(skip === 0 || k % skip === 0){
      var mean = d3.mean(wigData.data[k]);

      // Hard Coded value here needs to be thought about and changed  
      var s = gain / max;
      var line = d3.svg.area()
        .interpolate("basis")
        .x(function (d) {
          return x(d * s + c + k);
        })
        .y(function (d, i){
          return y(i * wigData.z.int + wigData.z.min);
        });
      var area = d3.svg.area()
        .interpolate("basis")
        .x(function (d, i) {
          return x(mean * s + c + k);
        })
        .y(function (d, i){
          return y(i * wigData.z.int + wigData.z.min);
        });

      svg.append("path")
        .attr("class", "line" + k)
        .attr("d", line(wigData.data[k]))
        .attr("stroke", "black")
        .attr("stroke-width", 0.25)
        .attr("fill", "none");

      svg.datum(wigData.data[k]);

      svg.append("clipPath")
        .attr("id", "clip-below" + k)
        .append("path")
        .attr("d", area.x0(width));

      svg.append("path")
        .attr("class", "area below")
        .attr("clip-path", "url(#clip-below" + k)
        .attr("fill", "grey")
        .attr("d", area.x0(function (d, i){ 
          return x(d * s + c + k);
        }));
    }
  }
  // $.getJSON("horizon.json", function(horizon) {
  //   G3.horizon(horizon, svg, x, y, wigData.geometry.xline_min);
  // });

  return this;
};

