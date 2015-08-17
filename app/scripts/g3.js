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

// G3 Functions
(function (window) {
	function defineG3() {
		var G3 = {};
		G3.alert = function() {
			alert("this is a test alert");
		};

		G3.seismicMap = function(file, elem) {
			d3.json(file, function(error, seismic) {
				if(error){
					alert("There was an error with loading the json file");
					return;
				}

				var width = 960;
				var height = 500;

				// Set default variables
				var max = findMax(seismic.dmin, seismic.dmax);
				var dx = seismic.data.length;
				var dy = seismic.data[0].length;
				var margin = {top: 5, right: 5, bottom: 5, left: 5};

				// Set x, y & color scales
				var x = d3.scale.linear()
					.domain([0, dx])
					.range([0, width - margin.left - margin.right]);
				var y = d3.scale.linear()
					.domain([0, dy])
					.range([0, height - margin.top - margin.bottom]);
				var color = d3.scale.linear()
					.domain([-max, max])
					.range(["#000", "#FFF"]);

				// Define Axis 
				var xAxis = d3.svg.axis()
					.scale(x)
					.orient(['top']);
				var yAxis = d3.svg.axis()
					.scale(y)
					.orient(['left']);

				// Create and append seismic canvas object
				var canvas =  d3.select(elem).append("canvas")
					.attr("class", "seis_canvas")
					.attr("width", 623)
					.attr("height", 330)
					.style("width", 623 + "px")
					.style("height", 330 + "px")
					.call(drawImage);

				// Create and append SVG axis 
				var svg = d3.select(elem).append("svg")
					.attr("class", "seis_svg")
					.attr("viewBox", "0 0 900 500")
					.attr("preserveAspectRatio", "xMinYMin meet")
					.append("g")
					.attr("transform",
						"translate(" + 50 + "," + 50 + ")");
				var xAxisGroup = svg.append("g")
					.attr("class", "x axis")
					.call(xAxis);
				var yAxisGroup = svg.append("g")
					.attr("class", "y axis")
					.call(yAxis);

					// var container = $(elem);

				 //    //Run function when browser resizes
				 //    $(window).resize( respondCanvas );

				 //    function respondCanvas(){
				 //    	//console.log(container.width());
				 //        // canvas.attr('width', 960); //max width
				 //        // canvas.attr('height', container.height()); //max height
				 //  //      	canvas.style("width", container.width() - margin.left - margin.right + "px")
					// 	// canvas.style("height", container.height() - margin.top - margin.bottom + "px")

				 //        //Call a function to redraw other content (texts, images etc)
				 //        drawImage(canvas);
				 //    }

				 //    //Initial call 
				 //    respondCanvas();

				// Create and append Axis Titles
				svg.append("text")
					.attr("x", (width - margin.left - margin.right) / 2)
					.attr("y", -30)
					.style("text-anchor", "middle")
					.text("X LABEL");
				svg.append("text")
					.attr("transform", "rotate(90)")
					.attr("x", (height - margin.top - margin.bottom) / 2)
					.attr("y", 30)
					.attr("dy", "1em")
					.style("text-anchor", "middle")
					.text("Y LABEL");

				// Draw Seismic Image
				function drawImage(canvas) {
					var context = canvas.node().getContext("2d"),
					image = context.createImageData(dx, dy);

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

				// Remove Zero Values
				function removeZero(axis) {
					axis.selectAll("g").filter(function(d) { 
						return !d;
					}).remove();
				}
			});
		};
		return G3;
	}
	if(typeof(G3) === 'undefined') {
		window.G3 = defineG3();
	}
})(window);