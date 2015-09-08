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
	    	.attr('class', 'x2 axis')
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
		    .attr('class', 'y2 axis')
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

  plot.reDraw = function(xDomain, yDomain, x2Domain, y2Domain){    
    if(xDomain){
      this.xScale.domain(xDomain);
      this.svg.select('.x.axis')
        .transition()
        .duration(500)
        .call(this.xAxis)
        .ease('linear')
        .selectAll("text")  
          .style("text-anchor", "start")
          .attr("transform", "rotate(-45)");
    }

    if(yDomain){
      this.yScale.domain(yDomain);
      this.svg.select('.y.axis')
        .transition()
        .duration(500)
        .call(this.yAxis)
        .ease('linear');
    }

    if(x2Domain){
      this.x2Scale.domain(x2Domain);
      this.svg.select('.x2.axis')
        .transition()
        .duration(500)
        .call(this.x2Axis)
        .ease('linear')
        .selectAll("text")  
          .style("text-anchor", "start")
          .attr("transform", "rotate(-45)");
    }

    if(y2Domain){
      this.y2Scale.domain(y2Domain);
      this.svg.select('.y2.axis')
        .transition()
        .duration(500)
        .call(this.y2Axis)
        .ease('linear');
    }
  }

	return plot;
}