
// Attach canvas creation function to g3
g3.scatter = function(plot, data){
  return new scatter(plot, data);
};

// Constructor
// Only set variables that are set by items passed in, otherwise set using prototype
var scatter = function scatter(plot, data){
	if(!data || !$.isArray(data)){ return 'Param: data is missing, An array required'; }
	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }
  this._data = data;
  this._plot = plot;

  this._colorScale = d3.scale.linear()
	.domain([d3.min(this._data), d3.max(this._data)])
	.range([d3.rgb(255, 0, 0), d3.rgb(0, 255, 0), d3.rgb(0, 0, 255)]);

	this._radiusScale = d3.scale.linear()
	.domain([d3.min(this._data), d3.max(this._data)])
	.range([1, 5]);
  return this;
};

// Set remaining variables
scatter.prototype._xMult = 1;
scatter.prototype._yMult = 1;
scatter.prototype._xTrans = 0;
scatter.prototype._yTrans = 0;

scatter.prototype.xMult = function(xMult){
	if(xMult === undefined){ return this._xMult; }
	this._xMult = xMult;
	return this;
};

scatter.prototype.yMult = function(yMult){
	if(yMult === undefined){ return this._yMult; }
	this._yMult = yMult;
	return this;
};

scatter.prototype.xTrans = function(xTrans){
	if(xTrans === undefined){ return this._xTrans; }
	this._xTrans = xTrans;
	return this;
};

scatter.prototype.yTrans = function(yTrans){
	if(yTrans === undefined){ return this._yTrans; }
	this._yTrans = yTrans;
	return this;
};

scatter.prototype.colorScale = function(colorScale){
	if(colorScale === undefined){ return this._colorScale; }
	this._colorScale = colorScale;
	return this;
};

scatter.prototype.radiusScale = function(radiusScale){
	if(radiusScale === undefined){ return this._radiusScale ; }
	this._radiusScale = radiusScale;
	return this;
};

scatter.prototype.draw = function(){
	var radius = this._radiusScale,
	xMult = this._xMult,
	yMult = this._yMult,
	xTrans = this._xTrans,
	yTrans = this._yTrans,
	colorScale = this._colorScale,
	xScale = this._plot._xScale,
	yScale = this._plot._yScale;

	this._plot._svg.selectAll('.scatter')
	  .data(this._data)
	.enter().append("circle")
		.attr('class', 'scatter')
	  .attr('r', function(d) { return radius(d); })
	  .attr('cx', function(d) { return xScale(d * xMult + xTrans); })
	  .attr('cy', function(d, i) { return yScale(i * yMult + yTrans); })
	  .style('stroke', 'black')
	  .style('fill', function(d) { return colorScale(d); });
	return this;
};

scatter.prototype.reDraw = function(data){
	var radius = this._radiusScale,
	xMult = this._xMult,
	yMult = this._yMult,
	xTrans = this._xTrans,
	yTrans = this._yTrans,
	colorScale = this._colorScale,
	xScale = this._plot._xScale,
	yScale = this._plot._yScale;

	this._data = data;
	this._plot._svg.selectAll('.scatter')
		.data(data)
		.transition()
		.duration(500)
		.attr('r', function(d) { return radius(d)})
		.attr('cx', function(d) { return xScale(d * xMult + xTrans); })
		.attr('cy', function(d, i) { return yScale(i * yMult + yTrans); })
		.style('fill', function(d) { return colorScale(d); });
	return this;
};