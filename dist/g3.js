/*! g3 - v0.0.1 - 2015-08-26 - justinkheisler */
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

	var horizon = {};
	horizon.interpolate = options.interpolate || 'basis';
	horizon.color = options.color || 'blue';
	horizon.strokeWidth = options.strokeWidth || 2;
	horizon.xMin = options.xMin || plot.xDomain[0];

	horizon.setInterpolate = function(interpolate){
		this.interpolate = interpolate;
		return this;
	}
	horizon.setColor = function(color){
		this.color = color;
		return this;
	}
	horizon.setStrokeWidth = function(strokeWidth){
		this.strokeWidth = strokeWidth;
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

		this.line = plot.svg.append('svg:path')
			.attr('d', lineFunc(data))
			.attr('stroke', this.color)
			.attr('stroke-width', this.strokeWidth)
			.attr('fill', 'none');
		return this;
	}

	return horizon;
};
g3.log = function(options, plot, data){
	var log = {};
	log.yInt = 1;
	log.yMin = plot.yDomain[0];

	if(options){
		if(options.yInt){ log.yInt = options.zInt; }
		if(options.yMin){ log.yMin = options.yMin; }
	}

	log.setYInt = function(yInt){
		this.yInt = yInt;
		return this;
	}

	log.setYMin = function(yMin){
		this.yMin = yMin;
		return this;
	}

	log.draw = function() {
		var lineFunc = d3.svg.line()
			.x(function (d) {
				return plot.xScale(d);
			})
			.y(function (d, i){
				return plot.yScale(i * log.yInt + log.yMin);
			})
			.interpolate('basis');
		plot.svg.append("svg:path")
			.attr("d", lineFunc(data))
			.attr("stroke", "blue")
			.attr("stroke-width", 0.25)
			.attr("fill", "none");
		return this;
	};
	return log;
}
g3.plot = function(options, elem){

	var plot = {};

	plot.margin = {top: 50, right: 10, bottom: 30, left: 30};
	plot.width = $(elem).width() - 2 * plot.margin.left;
	plot.height = 800;
	plot.xDomain = [0,0];
	plot.yDomain = [0,0];

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


g3.wiggle = function(options, plot, data){
	var wiggle = {};

	if(!options){ var options = {}; }
  if(!plot){ return 'Plot Required'; }
  if(!data || !$.isArray(data)){ return 'Data array required'; }

	wiggle.skip = options.skip || 20;
	wiggle.gain = options.gain || 20;
	wiggle.max = options.max; // Add an OR case here
	wiggle.xMin = options.xMin || plot.xDomain[0];
	wiggle.xInt = options.xInt || 1;
	wiggle.yMin = options.yMin || plot.yDomain[0];
	wiggle.yInt = options.yInt || 1;

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
          .attr('fill', 'grey')
          .attr('d', area.x0(function (d, i){ 
            return plot.xScale(d * s + wiggle.xMin + k);
          }));
	    }
	  }
	  return this;
	}
	return wiggle;
};
} (window));