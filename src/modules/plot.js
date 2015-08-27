g3.plot = function(options, elem){
  
  if(!elem){ return 'Param: elem is missing. A div to attach to is required'; }

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
