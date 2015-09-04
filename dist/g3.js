/*! g3 - v0.0.1 - 2015-09-04 - justinkheisler */
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

function createAxis(scale, innerTickSize, orient, ticks){
	return d3.svg.axis()
		.scale(scale)
		.innerTickSize(innerTickSize)
		.outerTickSize(3)
		.tickPadding(5)
		.orient(orient)
		.ticks(ticks);
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

g3.log = function(plot, data, options){
	
	if(!data || !$.isArray(data)){ return 'Param: data is missing, An array required'; }
	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }

	var log = {};
	log.xInt = 1;
	log.xMin = plot.xDomain[0];
	log.yInt = 1;
	log.yMin = plot.yDomain[0];
	log.color = "blue";

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

	log.setColor = function(color){
		this.color = color;
		return this;
	}

  log.draw = function(){
    this.svg = plot.svg.append("path")  
      .datum(data)
      .attr("d", lineFunc)
      .attr("stroke", this.color)
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

	log.reDraw = function(data, xDomain, yDomain){
		plot.xScale.domain(xDomain);
		plot.yScale.domain(yDomain);
		
		plot.svg.select('.x.axis')
			.transition()
			.duration(600)
			.call(plot.xAxis)
			.ease('linear')
			.selectAll("text")  
        .style("text-anchor", "start")
        .attr("transform", "rotate(-45)");

		plot.svg.select('.y.axis')
			.transition()
			.duration(600)
			.call(plot.yAxis)
			.ease('linear');

		this.svg.transition()
			.duration(600)
			.attr('d', lineFunc(data))
			.ease('linear');

		return this;
	}


	return log;
}

g3.plot = function(elem, options){
  
  if(!elem){ return 'Param: elem is missing. A div to attach to is required'; }

	var plot = {};
	plot.margin = {top: 50, right: 0, bottom: 30, left: 0};
	plot.width = $(elem).width() - plot.margin.left;
	plot.height = 800;
	plot.xDomain = [0,0];
	plot.yDomain = [0,0];
	plot.elem = elem;
	plot.xAxisVisible = true;
	plot.yAxisVisible = true;
	plot.x2AxisVisible = false;
	plot.y2AxisVisible = false;
	plot.xOrient = 'top';
	plot.x2Orient = 'bottom';
	plot.yOrient = 'left';
	plot.y2Orient = 'right';

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

  plot.setX2Domain = function(domain){
  	this.x2Domain = domain;
  	return this;
  }

  plot.setY2Domain = function(domain){
  	this.y2Domain = domain;
  	return this;
  }

  plot.toggleXAxis = function(bool){
  	this.xAxisVisible = bool;
  	return this;
  }

  plot.toggleX2Axis = function(bool){
  	this.x2AxisVisible = bool;
  	return this;
  }

  plot.toggleYAxis = function(bool){
  	this.yAxisVisible = bool;
  	return this;
  }

  plot.toggleY2Axis = function(bool){
  	this.y2AxisVisible = bool;
  	return this;
  }

  plot.setXTicks = function(ticks){
  	this.xTicks = ticks;
  	return this;
  }

  plot.setYTicks = function(ticks){
  	this.yTicks = ticks;
  	return this;
  }

  plot.setX2Ticks = function(ticks){
  	this.xTicks = ticks;
  	return this;
  }

  plot.setY2Ticks = function(ticks){
  	this.yTicks = ticks;
  	return this;
  }

  plot.setYTitle = function(title){
  	this.yTitle = title;
  	return this;
  }

  plot.setXTitle = function(title){
  	this.xTitle = title;
  	return this;
  }

  plot.setY2Title = function(title){
  	this.y2Title = title;
  	return this;
  }

  plot.setX2Title = function(title){
  	this.x2Title = title;
  	return this;
  }

  plot.setXOrient = function(orient){
  	this.xOrient = orient;
  	return this;
  }

  plot.setX2Orient = function(orient){
  	this.x2Orient = orient;
  	return this;
  }

  plot.setYOrient = function(orient){
  	this.yOrient = orient;
  	return this;
  }

  plot.sety2Orient = function(orient){
  	this.y2Orient = orient;
  	return this;
  }

  plot.setXTickFormat = function(format){
  	this.xTickFormat = format;
  	return this;
  }
  
  plot.setYTickFormat = function(format){
  	this.yTickFormat = format;
  	return this;
  }
  
  plot.setX2TickFormat = function(format){
  	this.x2TickFormat = format;
  	return this;
  }

  plot.setY2TickFormat = function(format){
  	this.y2TickFormat = format;
  	return this;
  }

  plot.draw = function() {
	  this.xScale = d3.scale.linear()
    	.domain(this.xDomain)
    	.range([0, this.width]);
    this.yScale = d3.scale.linear()
    	.domain(this.yDomain)
    	.range([0, this.height]);

	  // Append svg object to dom element
	  this.svg = d3.select(elem).append('svg')
	    .attr('class', 'log_plot')
	    .attr('width', this.width + this.margin.right + this.margin.left)
	    .attr('height', this.height + this.margin.bottom + this.margin.top) 
	    .append('g')
	    .attr('height', this.height)
	    .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

	  // Set axis
	  if(this.xAxisVisible){
	  	this.xAxis = createAxis(this.xScale, -this.height, this.xOrient, this.xTicks);
	  	this.xAxis.tickFormat(this.xTickFormat);
	  	this.svg.append('g')
	    	.attr('class', 'x axis')
	    	.call(this.xAxis)
	    	.selectAll("text")  
	        .style("text-anchor", "start")
	        .attr("transform", "rotate(-45)" );
	  }
	  if(this.yAxisVisible){
	  	this.yAxis = createAxis(this.yScale, -this.width, this.yOrient, this.yTicks);
	  	this.yAxis.tickFormat(this.yTickFormat);
	  	this.svg.append('g')
		    .attr('class', 'y axis')
		    .call(this.yAxis);
	  }
	  if(this.x2AxisVisible){
	  	this.x2Scale = d3.scale.linear()
	    	.domain(this.x2Domain)
	    	.range([0, this.width]);
	  	this.x2Axis = createAxis(this.x2Scale, -this.height, this.x2Orient, this.x2Ticks);
	  	this.x2Axis.tickFormat(this.x2TickFormat);
	  	this.svg.append('g')
	    	.attr('class', 'x axis')
		    .attr("transform", "translate(" + "0," + this.height + ")")
	    	.call(this.x2Axis)
	    	.selectAll("text")  
	        .style("text-anchor", "start")
	        .attr("transform", "rotate(45)" );
	  }
	 	if(this.y2AxisVisible){
	 		this.y2Scale = d3.scale.linear()
	    	.domain(this.y2Domain)
	    	.range([0, this.height]);
	  	this.y2Axis = createAxis(this.y2Scale, -this.width, this.y2Orient, this.y2Ticks);
	  	this.y2Axis.tickFormat(this.y2TickFormat);
	  	this.svg.append('g')
		    .attr('class', 'y axis')
		    .attr("transform", "translate(" + this.width + ",0)")
		    .call(this.y2Axis);
	  }

		if(this.xTitle){
			this.svg.append("text")
					.attr("x", (this.width) / 2)
					.attr("y", -30)
					.style("text-anchor", "middle")
					.text(this.xTitle);
		}
		if(this.yTitle){
			this.svg.append("text")
				.attr("transform", "rotate(-90)")
				//.attr("x", -15)
				.attr("y", -20)
				.attr("dy", "1em")
				.style("text-anchor", "end")
				.text(this.yTitle);
		}
	  return this;
	};

	return plot;
}
g3.seismic = function(plot, data, options){
	if(!data || !$.isArray(data)){ return 'Param: data is missing, An array required'; }
	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }
	
	var seismic = {};
	seismic.max = 1;
	seismic.gain = 1;

  seismic.draw = function(){
	seismic.color = d3.scale.linear()
		.domain([-this.max, 0, this.max])
		.range(['#FF0000', '#FFF', '#0000FF']);

  	var elem = $(plot.elem);
    this.canvas = d3.select(plot.elem)
      .append('canvas')
      .attr('width', data.length)
      .attr('height', data[0].length)
      .style('width', plot.width +  'px')
      .style('height', plot.height + 'px')
      .style('opacity', 0.95)
      .style('top', plot.margin.top + 'px')
      .style('left', plot.margin.left + 'px')
      .call(seismic.drawImage);
    return this;
  }

	seismic.drawImage = function(canvas){
		var context = canvas.node().getContext('2d'),
		x = data.length,
		y = data[0].length,
		image = context.createImageData(x,y);

		for(var i = 0, p = -1; i < y; ++ i){
			for(var j = 0; j < x; ++j){
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

	seismic.setGain = function(gain){
		this.gain = gain;
		return this;
	}

	return seismic;
}
g3.wiggle = function(plot, data, options){

	if(!data || !$.isArray(data)){ return 'Param: data is missing, An array required'; }
	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }

	var wiggle = {};
	wiggle.skip = 0;
	wiggle.gain = 30;
	wiggle.xInt = 1;
	wiggle.xMin = plot.xDomain[0];
	wiggle.yInt = 1;
	wiggle.yMin = plot.yDomain[0];
	wiggle.sampleRate = 1;

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

	wiggle.setSampleRate = function(sampleRate){
		this.sampleRate = sampleRate;
		return this;
	}

	wiggle.draw = function() {
		for(var k = data.length - 1; k >= 0; k--){
	    if(this.skip === 0 || k % this.skip === 0){
	      var mean = d3.mean(data[k]); 

	      // Line function
		    var line = d3.svg.area()
		      .interpolate('basis')
		      .x(function (d) {
		        return plot.xScale(d * wiggle.gain + wiggle.xMin + k * wiggle.sampleRate);
		      })
		      .y(function (d, i){
		        return plot.yScale(i * wiggle.yInt + wiggle.yMin);
		      });

		    // Clip path area function
		    var area = d3.svg.area()
		      .interpolate('basis')
		      .x(function (d, i) {
		        return plot.xScale(mean * wiggle.gain + wiggle.xMin + k * wiggle.sampleRate);
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
          .attr('id', 'area-below' + k)
          .attr('clip-path', 'url(#clip-below' + k)
          .attr('fill', 'grey')
          .attr('d', area.x0(function (d, i){ 
            return plot.xScale(d * wiggle.gain + wiggle.xMin + k * wiggle.sampleRate);
          }));
	    }
	  }
	  return this;
	}

wiggle.reDraw = function(data, xDomain, yDomain){

	// Redraw the Axis
	plot.xScale.domain(xDomain);
	plot.yScale.domain(yDomain);
		
	plot.svg.select('.x.axis')
		.transition()
		.duration(600)
		.call(plot.xAxis)
		.selectAll("text")  
		.style("text-anchor", "start")
    	.attr("transform", "rotate(-45)" );

	plot.svg.select('.y.axis')
		.transition()
		.duration(600)
		.call(plot.yAxis);

  for(var k = data.length - 1; k >= 0; k--){
    if(this.skip === 0 || k % this.skip === 0){
			var mean = d3.mean(data[k]); 
      
      // Line function
      var line = d3.svg.area()
        .interpolate('basis')
        .x(function (d) {
          return plot.xScale(d * wiggle.gain + wiggle.xMin + k * wiggle.sampleRate);
        })
        .y(function (d, i){
          return plot.yScale(i * wiggle.yInt + wiggle.yMin);
        });

      // Clip path area function
      var area = d3.svg.area()
        .interpolate('basis')
        .x(function (d, i) {
          return plot.xScale(mean * wiggle.gain + wiggle.xMin + k * wiggle.sampleRate);
        })
        .y(function (d, i){
          return plot.yScale(i * wiggle.yInt + wiggle.yMin);
        });

      plot.svg.select(".line" + k)
        .transition()
        .duration(600)
        .attr('d', line(data[k]))
        .ease("linear");

      plot.svg.datum(data[k]);

      plot.svg.select("#clip-below" + k)
        .transition()
        .duration(600)
        .attr('d', area.x0(plot.width))
        .ease('linear');
        
      plot.svg.select("#area-below" + k)
        .transition()
        .duration(600)
        .attr('d', area.x0(function (d, i){ 
          return plot.xScale(d * wiggle.gain + wiggle.xMin + k * wiggle.sampleRate);
        }))
        .ease('linear');
    	} 
  	}
    return this;
  }
	return wiggle;
};

} (window));
