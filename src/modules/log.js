// Attach canvas creation function to g3
g3.log = function(plot, data){
  return new log(plot, data);
};

// Constructor
// Only set variables that are set by items passed in, otherwise set using prototype
var log = function log(plot, data){
	if(!data || !$.isArray(data)){ return 'Param: data is missing, An array required'; }
	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }
  this._data = data;
  this._plot = plot;
  this._xMin = 0;
  this._yMin = 0;
  return this;
};

// Set remaining variables
log.prototype._xInt = 1;
log.prototype._yInt = 1;
log.prototype._color = "blue";
log.prototype._duration = 5;
log.prototype._strokeWidth = 0.25;

// Setters 
log.prototype.duration = function(duration){
	if(duration === undefined){ return this._duration; }
	this._duration = duration;
	return this;
};

log.prototype.xTrans = function(xMin){
	if(xMin === undefined){ return this._xMin; }
	this._xMin = xMin;
	return this;
};

log.prototype.xMult = function(xInt){
	if(xInt === undefined){ return this._xInt; }
	this._xInt = xInt;
	return this;
};

log.prototype.yTrans = function(yMin){
	if(yMin === undefined){ return this._yMin; }
	this._yMin = yMin;
	return this;
};

log.prototype.yMult = function(yInt){
	if(yInt === undefined){ return this._yInt; }
	this._yInt = yInt;
	return this;
};

log.prototype.color = function(color){
	if(color === undefined){ return this._color; }
	this._color = color;
	return this;
};

log.prototype.strokeWidth = function(strokeWidth){
	if(strokeWidth === undefined){ return this._strokeWidth; }
	this._strokeWidth = strokeWidth;
	return this;
};

log.prototype.draw = function(){
	var lineFunc = this.lineFunc();
	this._svg = this._plot._svg.append('path')
		.datum(this._data)
		.attr('d', lineFunc)
		.attr('stroke', this._color)
		.attr('stroke-width', this._strokeWidth)
		.attr('fill', 'none');
	return this;
};

log.prototype.reDraw = function(data){
	var lineFunc = this.lineFunc();
	this._svg.transition()
		.duration(this._duration)
		.attr('d', lineFunc(data))
		.ease('linear');
	return this;
};

log.prototype.lineFunc = function(){
	var plot = this._plot,
			yInt = this._yInt,
			yMin = this._yMin,
			xInt = this._xInt,
			xMin = this._xMin,
			interpolate = this._interpolate;

	return d3.svg.line()
		.x(function (d) {
			return plot._xScale(d * xInt + xMin);
		})
		.y(function (d, i){
			return plot._yScale(i * yInt + yMin);
		})
		.interpolate(interpolate);
};