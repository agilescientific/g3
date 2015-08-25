'use strict';

// Helper functions 
function findMax(a, b){
	var max = 0;
	if(Math.abs(a) > Math.abs(b)){
		max = Math.abs(a);
	} else {
		max = Math.abs(b);
	}
	return max;
}

function createAxis(scale, innerTickSize, orient){
	return d3.svg.axis()
		.scale(scale)
		.innerTickSize(innerTickSize)
		.outerTickSize(3)
		.tickPadding(5)
		.orient(orient);
}

// G3 Functions
(function (window) {
	function defineG3() {
		var G3 = {};

		G3.alert = function() {
			alert("this is a test alert");
		};

		G3.oneDModel = function(elem){
			var width = 900;
			var height = 600;

			var yScale = d3.scale.linear()
				.range([0, height])
				.domain([0,1]);
			var xScale = d3.scale.linear()
				.range([0, width])
				.domain([0,1]);

			var svg = d3.select(elem)
				.append("svg")
				.attr("viewBox", "0 0 900 500")
  				.attr("preserveAspectRatio", "xMinYMin meet");
		};

		// G3.updateWiggles = function(wigData, elem, width, height, skip, gain){
		// 	// Select the section we want to apply our changes to
		// 	var svg = d3.select(elem).transition();
		// 	var max = findMax(wigData.metadata.max, wigData.metadata.min);

		// 				var x = d3.scale.linear()
		// 		.domain([wigData.geometry.xline_min, wigData.geometry.xline_max])
		// 		.range([0, width]);
		// 	var y = d3.scale.linear()
		// 		.domain([wigData.z.min, wigData.z.max])
		// 		.range([0, height]);
		// 	for(var k = wigData.data.length - 1; k >= 0; k--){
		// 		if(k % skip === 0){
		// 			var mean = d3.mean(wigData.data[k]);
		// 			var c = wigData.geometry.xline_min;

		// 			// Hard Coded value here needs to be thought about and changed	
		// 			var s = gain / max;
		// 			var line = d3.svg.area()
		// 				.interpolate("basis")
		// 				.x(function (d) {
		// 					return x(d * s + c + k);
		// 				})
		// 				.y(function (d, i){
		// 					return y(i * wigData.z.int + wigData.z.min);
		// 				});
		// 			var area = d3.svg.area()
		// 				.interpolate("basis")
		// 				.x(function (d, i) {
		// 					return x(mean * s + c + k);
		// 				})
		// 				.y(function (d, i){
		// 					return y(i * wigData.z.int + wigData.z.min);
		// 				});

		// 			// Make the changes
		// 			svg.select(".line" + k)   // change the line
		// 				.duration(750)
		// 				.attr("d", line(wigData.data[k]));
		// 			}
		// 		}
		// }

		G3.drawWiggles = function(wigData, elem, width, height, skip, gain){

			var margin = {top: 50, right: 10, bottom: 30, left: 30};

			if(!width){
				width = $(elem).width() - 2 * margin.left;
			}
			var max = findMax(wigData.metadata.max, wigData.metadata.min);
			
			// Set x y scales
			var x = d3.scale.linear()
				.domain([wigData.geometry.xline_min, wigData.geometry.xline_max])
				.range([0, width]);
			var y = d3.scale.linear()
				.domain([wigData.z.min, wigData.z.max])
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
				if(k % skip === 0){
					var mean = d3.mean(wigData.data[k]);
					var c = wigData.geometry.xline_min;

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
						.attr("d", area.x0(height));

					svg.append("path")
						.attr("class", "area below")
						.attr("clip-path", "url(#clip-below" + k)
						.attr("fill", "grey")
						.attr("d", area.x0(function (d, i){ 
							return x(d * s + c + k);
						}));
				}
			}
			$.getJSON("horizon.json", function(horizon) {
				G3.horizon(horizon, svg, x, y, wigData.geometry.xline_min);
			});
		};

		G3.logPlot = function(logData, elem, zAx, xAxisText){

			var width = 100;
			var height = 200;

			if(elem === undefined){
				elem = '.seis_plot';
			}

			var x = d3.scale.linear()
				.domain([0, logData.metadata.global_max])
				.range([0, width]);
			var y = d3.scale.linear()
				.domain([0,logData.z.max + 200])
				.range([0, height]);
			var xAxis = d3.svg.axis()
				.scale(x)
				.ticks(4)
				.innerTickSize(-height)
			    .outerTickSize(3)
			    .tickPadding(5)
    			.orient("top");

			var yAxis = d3.svg.axis()
				.scale(y)
				.innerTickSize(-width)
				.tickPadding(5)
				.outerTickSize(3)
			    .orient("left");

			if(!zAx){
				yAxis.tickFormat("");
			}
			if(zAx){
				var margin = {top: 50, right: 10, bottom: 10, left: 50};
			} else {
				var margin = {top: 50, right: 10, bottom: 10, left: 10};
			}

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

			var lineFunc = d3.svg.line()
				.x(function (d) {
					return x(d);
				})
				.y(function (d, i){
					return y(i * logData.z.int + logData.z.min);
				})
				.interpolate('basis');
			
			var lineFunc2 = d3.svg.line()
				.x(function (d) {
					return x(d * 0.75);
				})
				.y(function (d, i){
					return y(i * logData.z.int * 0.78 + logData.z.min);
				})
				.interpolate('basis');

			svg.append("svg:path")
				.attr("d", lineFunc2(logData.data))
				.attr("stroke", "green")
				.attr("stroke-width", 0.25)
				.attr("fill", "none");

			svg.append("svg:path")
				.attr("d", lineFunc(logData.data))
				.attr("stroke", "blue")
				.attr("stroke-width", 0.25)
				.attr("fill", "none");

			svg.append("text")
				.attr("x", (width) / 2)
				.attr("y", -15)
				.style("text-anchor", "middle")
				.text(xAxisText);
		};

		G3.horizon = function(horizon, svg, x, y, min) {
			var lineFunc = d3.svg.line()
				.x(function (d, i) {
					return x(i + min);
				})
				.y(function (d) {
					return y(d / 1000);
				})
				.interpolate('basis');

			svg.append("svg:path")
				.attr("d", lineFunc(horizon.data))
				.attr("stroke", "blue")
				.attr("stroke-width", 2)
				.attr("fill", "none");
		};

		G3.seismicMap = function(seismic, svg, elem, x, y, width, height, margin) {

			// Set default variables
			var max = findMax(seismic.metadata.min, seismic.metadata.max);
			var dx = seismic.data.length;
			var dy = seismic.data[0].length;
			
			// Set color scale
			var color = d3.scale.linear()
				.domain([-max, max])
				.range(["#000", "#FFF"]);

			// var arr = [];
			// for(var i = 0; i < seismic.data.length; i++){
			// 	for(var j = 0; j < seismic.data[i].length; j++){
			// 		arr.push([i, j, d3.rgb(color(seismic.data[i][j]))]);
			// 	}
			// }

			// svg.selectAll("rect")
			// .data(arr)
			// .enter()
			// .append("rect")
			// .attr("width", 1)
			// .attr("height", 1)
			// .attr("x", function(d){
			// 	return d[0];
			// })
			// .attr("y", function(d){
			// 	return d[1];
			// })
			// .attr("fill", function(d){
			// 	return d[2];
			// })

			// console.log(arr);

			// Define Axis 
			var xAxis = d3.svg.axis()
				.scale(x)
				.orient(['top']);
			var yAxis = d3.svg.axis()
				.scale(y)
				.orient(['left']);
			var y1Axis = d3.svg.axis()
				.scale(y)
				.orient(['right']);
			// Create and append SVG axis 
			svg.append("g")
				.attr("class", "x axis")
				.call(xAxis);
			svg.append("g")
				.attr("class", "y axis")
				.call(yAxis);
			svg.append("g")
				.attr("class", "y axis")
				.call(yAxis);

			//Create and append seismic canvas object
			// var canvas = d3.select(elem).append("canvas")
			// 	.attr("width", dx)
			// 	.attr("height", dy)
			// 	.style("width", width + margin.left + margin.right + "px")
			// 	.style("height", height + margin.top + margin.bottom + "px")
			// 	.style("padding", margin.top + "px")
			// 	.call(drawImage);

			// Create and append Axis Titles
			svg.append("text")
				.attr("x", (width) / 2)
				.attr("y", -30)
				.style("text-anchor", "middle")
				.text("Trace");
			svg.append("text")
				.attr("transform", "rotate(90)")
				.attr("x", (height) / 2)
				.attr("y", 30)
				.attr("dy", "1em")
				.style("text-anchor", "middle")
				.text("Time");
			svg.append("text")
				.attr("transform", "rotate(-90)")
				.attr("x", (height) / 2)
				.attr("y", 30)
				.attr("dy", "1em")
				.style("text-anchor", "middle")
				.text("Time");

			// Draw Seismic Image
			function drawImage(canvas) {
				var context = canvas.node().getContext("2d"),
				image = context.createImageData(dx, dy);
				console.log(image);

				for(var i = 0, p = -1; i < dy; ++ i){
					for(var j = 0; j < dx; ++j){
						var c = d3.rgb(color(seismic.data[j][i]));
						image.data[++p] = c.r;
						image.data[++p] = c.g;
						image.data[++p] = c.b;
						image.data[++p] = 255;
					}
				}
				context.putImageData(image, 0, 0);
			}
		};
		return G3;
	}
	if(typeof(G3) === 'undefined') {
		window.G3 = defineG3();
	}
})(window);