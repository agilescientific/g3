/*! g3 - v0.0.1 - 2015-08-28 - justinkheisler */
'use strict';
;(function (window) {

function defineg3() {
	var g3 = {};
	return g3;
}
if(typeof(g3) === 'undefined') {
	window.g3 = defineg3();
}

const DEBUG = false;

function createAxis(scale, innerTickSize, orient){
	return d3.svg.axis()
		.scale(scale)
		.innerTickSize(innerTickSize)
		.outerTickSize(3)
		.tickPadding(5)
		.orient(orient);
}
g3.horizon = function(options, plot, data){

	if(!data || !$.isArray(data)){ return 'Param: data is missing, An array required'; }
	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }

	var horizon = {};
	horizon.interpolate = 'basis';
	horizon.xInt = 1;
	horizon.xMin = plot.xDomain[0];
	horizon.yInt = 1;
	horizon.yMin = plot.yDomain[0];

	if(options){
		if(options.interpolate){ horizon.interpolate = options.interpolate; }
		if(options.xInt){ horizon.xInt = options.xInt; }
		if(options.xMin){ horizon.xMin = options.xMin; }
		if(options.yInt){ horizon.yInt = options.yInt; }
		if(options.yMin){ horizon.yMin = options.yMin; }
	}

	horizon.setInterpolate = function(interpolate){
		this.interpolate = interpolate;
		return this;
	}

	horizon.setXMin = function(xMin){
		this.xMin = xMin; 
		return this;
	}

	horizon.draw = function(){
		var lineFunc = d3.svg.line()
			.x(function (d, i) {
				return plot.xScale(i + horizon.xMin);
			})
			.y(function (d) {
				return plot.yScale(d / 1000);
			})
			.interpolate(this.interpolate);

		this.svg = plot.svg.append('svg:path')
			.attr('d', lineFunc(data))
			.attr('stroke', 'blue')
			.attr('stroke-width', 2)
			.attr('fill', 'none');
		return this;
	}

	horizon.reDraw = function(){
		this.svg.transition()
			.duration(600)
			.attr('d', lineFunc(data));
		return this;
	}

	return horizon;
};

g3.log = function(options, plot, data){
	
	if(!data || !$.isArray(data)){ return 'Param: data is missing, An array required'; }
	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }

	var log = {};
	log.xInt = 1;
	log.xMin = plot.xDomain[0];
	log.yInt = 1;
	log.yMin = plot.yDomain[0];

	if(options){
		if(options.yInt){ log.yInt = options.zInt; }
		if(options.yMin){ log.yMin = options.yMin; }
		if(options.xInt){ log.xInt = options.xInt; }
		if(options.xMin){ log.xMin = options.xMin; }
	}

	// Setters
	log.setYInt = function(yInt){
		this.yInt = yInt;
		return this;
	}

	log.setYMin = function(yMin){
		this.yMin = yMin;
		return this;
	}

	log.setXInt = function(xInt){
		this.xInt = xInt;
		return this;
	}

	log.setXMin = function(xMin){
		this.xMin = xMin;
		return this;
	}

	log.setData = function(data){
		this.data = data;
		return this;
	}

  log.draw = function(){
    this.svg = plot.svg.append("path")  
      .datum(data)
      .attr("d", lineFunc)
      .attr("stroke", "blue")
      .attr("stroke-width", 0.25)
      .attr("fill", "none");

    // var sorted = data.sort(function(a, b) {
    //   return a - b;
    // });

    // var focus = plot.svg.append("g")
    //     .attr("class", "focus")
    //     .style("display", "none");

    // focus.append("circle")
    //     .attr("r", 4.5);

    // focus.append("text")
    //     .attr("x", 9)
    //     .attr("dy", ".35em");
    //     var bisectDate = d3.bisector(function(d) { return d; }).left;
    // plot.svg.append("rect")
    //     .attr("class", "overlay")
    //     .attr("width", plot.width)
    //     .attr("height", plot.height)
    //     .on("mouseover", function() { focus.style("display", null); })
    //     .on("mouseout", function() { focus.style("display", "none"); })
    //     .on("mousemove", mousemove);

    // function mousemove() {
    //   var x0 = plot.xScale.invert(d3.mouse(this)[0]),
    //       i = bisectDate(data, x0, 1),
    //       d0 = data[i - 1],
    //       d1 = data[i],
    //       d = x0 - d0 > d1 - x0 ? d1 : d0;
    //   focus.attr("transform", "translate(" + plot.xScale(d) + "," + plot.yScale(d) + ")");
    //   focus.select("text").text(d);
    // };
    return this;
  }

	var lineFunc = d3.svg.line()
	.x(function (d) {
		return plot.xScale(d);
	})
	.y(function (d, i){
		return plot.yScale(i * log.yInt + log.yMin);
	})
	.interpolate('basis');

	log.reDraw = function(data){
		this.svg.transition()
			.duration(600)
			.attr('d', lineFunc(data));
		return this;
	}


	return log;
}

g3.plot = function(options, elem){
  
  if(!elem){ return 'Param: elem is missing. A div to attach to is required'; }

	var plot = {};
	plot.margin = {top: 50, right: 10, bottom: 30, left: 30};
	plot.width = $(elem).width() - 2 * plot.margin.left;
	plot.height = 800;
	plot.xDomain = [0,0];
	plot.yDomain = [0,0];
	plot.elem = elem;
	plot.axisVisible = true;

	if(options){
	  if(options.margin){ plot.margin = options.margin; }
	  if(options.width){ plot.width = options.width; }
	  if(options.height){ plot.height = options.height; }
	  if(options.xDomain){ plot.xDomain = options.xDomain; }
	  if(options.yDomain){ plot.yDomain = options.yDomain; }
	}

  plot.setMargin = function(top, right, bottom, left){
  	this.margin = {top: top, right: right, bottom: bottom, left: left};
  	return this;
  }

  plot.setWidth = function(width){
  	this.width = width;
  	return this;
  }

  plot.setHeight = function(height){
  	this.height = height;
  	return this;
  }

  plot.setXDomain = function(domain){
  	this.xDomain = domain;
  	return this;
  }

  plot.setYDomain = function(domain){
  	this.yDomain = domain;
  	return this;
  }

  plot.toggleAxis = function(bool){
  	this.axisVisible = bool;
  	return this;
  }

  plot.draw = function() {
	  // Set x y scales
	  this.xScale = d3.scale.linear()
	    .domain(this.xDomain)
	    .range([0, this.width]);
	  this.yScale = d3.scale.linear()
	    .domain(this.yDomain)
	    .range([0, this.height]);

	  // Set x y axis
	  this.xAxis = createAxis(this.xScale, -this.height, 'top');
	  this.yAxis = createAxis(this.yScale, -this.width, 'left');

	  // Append svg object to dom element
	  this.svg = d3.select(elem).append('svg')
	    .attr('class', 'log_plot')
	    .attr('width', this.width + this.margin.right + this.margin.left)
	    .attr('height', this.height + this.margin.bottom + this.margin.top) 
	    .append('g')
	    .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

	  // Create and append SVG axis
	  if(!this.axisVisible){ 
	  	this.yAxis.tickFormat(""); 
	  }

	  this.svg.append('g')
	    .attr('class', 'x axis')
	    .call(this.xAxis);
	  this.svg.append('g')
	    .attr('class', 'y axis')
	    .call(this.yAxis);
	  return this;
	};
	return plot;
}

g3.seismic = function(options, plot, data){
	if(!data || !$.isArray(data)){ return 'Param: data is missing, An array required'; }
	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }
	
	var seismic = {};
	var max = 13532;
	seismic.color = d3.scale.linear()
		.domain([-max, max])
		.range(['#000', '#FFF']);

  seismic.draw = function(){
    this.canvas = d3.select(plot.elem)
      .append('canvas')
      .attr('width', data.length)
      .attr('height', data[0].length)
      .style('width', plot.width + plot.margin.left + plot.margin.right - 2 + 'px')
      .style('height', plot.height + plot.margin.bottom + 8 + 'px')
      .style('padding', 19 + 'px')
      .style('top', plot.margin.top + 'px')
      .style('left', plot.margin.left + 'px')
      .call(seismic.drawImage);
    return this;
  }

	seismic.drawImage = function(canvas){
		var context = canvas.node().getContext('2d'),
		image = context.createImageData(data.length, data[0].length);

		for(var i = 0, p = -1; i < data[0].length; ++ i){
			for(var j = 0; j < data.length; ++j){
				var c = d3.rgb(seismic.color(data[j][i]));
				image.data[++p] = c.r;
				image.data[++p] = c.g;
				image.data[++p] = c.b;
				image.data[++p] = 255;
			}
		}
		context.putImageData(image, 0, 0);
		return this;
	}

	seismic.setMax = function(max){
		this.max = max;
		return this;
	}	

	return seismic;
}
g3.wiggle = function(options, plot, data){

	if(!data || !$.isArray(data)){ return 'Param: data is missing, An array required'; }
	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }

	var wiggle = {};
	wiggle.skip = 20;
	wiggle.gain = 20;
	wiggle.xInt = 1;
	wiggle.xMin = plot.xDomain[0];
	wiggle.yInt = 1;
	wiggle.yMin = plot.yDomain[0];

	if(options){
		if(options.skip){ wiggle.skip = options.skip; }
		if(options.gain){ wiggle.gain = options.gain; }
		if(options.xMin){ wiggle.xMin = options.xMin; }
		if(options.xMin){ wiggle.xInt = options.xInt; }
		if(options.yMin){ wiggle.yMin = options.yMin; }
		if(options.yInt){ wiggle.yInt = options.yInt };
		if(options.max){ wiggle.max = options.max; } // Add an OR case here
	}

	var s = wiggle.gain / wiggle.max;

	wiggle.setSkip = function(skip){
		this.skip = skip;
		return this;
	}

	wiggle.setGain = function(gain){
		this.gain = gain;
		return this;
	}

	wiggle.setMax = function(max){
		this.max = max;
		return this;
	}

	wiggle.setXMin = function(xMin){
		this.xMin = xMin;
		return this;
	}

	wiggle.setYMin = function(yMin){
		this.yMin = yMin;
		return this;
	}

	wiggle.setXInt = function(xInt){
		this.xInt = xInt;
		return this;
	}

	wiggle.setYInt = function(yInt){
		this.yInt = yInt;
		return this;
	}

	wiggle.setFillColor = function(color){
		this.fillColor = color;
		return this;
	}

	wiggle.setColor = function(color){
		this.color = color;
		return this;
	}

	wiggle.setStrokeWidth = function(strokeWidth){
		this.strokeWidth = strokeWidth;
		return this;
	}

	wiggle.draw = function() {
		for(var k = data.length - 1; k >= 0; k--){
	    if(this.skip === 0 || k % this.skip === 0){
	      var mean = d3.mean(data[k]); 

		    var line = d3.svg.area()
		      .interpolate('basis')
		      .x(function (d) {
		        return plot.xScale(d * s + wiggle.xMin + k);
		      })
		      .y(function (d, i){
		        return plot.yScale(i * wiggle.yInt + wiggle.yMin);
		      });
		    var area = d3.svg.area()
		      .interpolate('basis')
		      .x(function (d, i) {
		        return plot.xScale(mean * s + wiggle.xMin + k);
		      })
		      .y(function (d, i){
		        return plot.yScale(i * wiggle.yInt + wiggle.yMin);
		      });
        plot.svg.append('path')
          .attr('class', 'line' + k)
          .attr('d', line(data[k]))
          .attr('stroke', 'black')
          .attr('stroke-width', 0.25)
          .attr('fill', 'none');

        plot.svg.datum(data[k]);

        plot.svg.append('clipPath')
          .attr('id', 'clip-below' + k)
          .append('path')
          .attr('d', area.x0(plot.width));

        plot.svg.append('path')
          .attr('class', 'area below')
          .attr('clip-path', 'url(#clip-below' + k)
          .attr('fill', 'black')
          .attr('d', area.x0(function (d, i){ 
            return plot.xScale(d * s + wiggle.xMin + k);
          }));
	    }
	  }
	  return this;
	}

	wiggle.reDraw = function(){

		return this;
	}
	return wiggle;
};

} (window));
