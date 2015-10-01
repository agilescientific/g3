// Attach horizon creation function to g3
g3.horizon = function(plot, data){
  return new horizon(plot, data);
};

// Constructor
// Only set variables that are set by items passed in, otherwise set using prototype
var horizon = function horizon(plot, data){
	if(!data || !$.isArray(data)){ return 'Param: data is missing, An array required'; }
	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }
  this._data = data;
  this._plot = plot;
  this._xMin = plot.xDomain[0];
  this._yMin = plot.yDomain[0];
  return this;
};

// Set remaining variables
horizon.prototype._xInt = 1;
horizon.prototype._yInt = 1;
horizon.prototype._duration = 500;
horizon.prototype._gain = 1;
horizon.prototype._interpolate = 'basis';
horizon.prototype._color = 'green';
horizon.prototype._strokeWidth = 1.5;

// Horizon Setting functions
horizon.prototype.interpolate = function(interpolate){
	if(interpolate === undefined){ return this._interpolate; }
	this._interpolate = interpolate;
	return this;
};

horizon.prototype.xMin = function(xMin){
	if(xMin === undefined){ return this._xMin; }
	this._xMin = xMin;
	return this;
};

horizon.prototype.yMin = function(yMin){
	if(yMin === undefined){ return this._yMin; }
	this._yMin = yMin;
	return this;
};

horizon.prototype.xInt = function(xInt){
	if(xInt === undefined){ return this._xInt; }
	this._xInt = xInt;
	return this;
};

horizon.prototype.yInt = function(yInt){
	if(yInt === undefined){ return this._yInt; }
	this._yInt = yInt;
	return this;
};

horizon.prototype.duration = function(duration){
	if(duration === undefined){ return this._duration; }
	this._duration = duration;
	return this;
};

horizon.prototype.gain = function(gain){
	if(gain === undefined){ return this._gain; }
	this._gain = gain;
	return this;
};

horizon.prototype.color = function(color){
	if(color === undefined){ return this._color; }
	this._color = color;
	return this;
};

horizon.prototype.strokeWidth = function(strokeWidth){
	if(strokeWidth === undefined){ return this._strokeWidth; }
	this._strokeWidth = strokeWidth;
	return this;
};

horizon.prototype.lineFunc = function(){
	var plot = this._plot,
			xMin = this._xMin,
			gain = this._gain,
			interpolate = this._interpolate;

	var lineFunc = d3.svg.line()
		.x(function (d, i){
			return plot.xScale(i + xMin);
		})
		.y( function (d) {
			return plot.yScale(d * gain);
		})
		.interpolate(interpolate);

	return lineFunc;
};

// Horizon Drawing functions
horizon.prototype.draw = function() {
	var lineFunc = this.lineFunc();
	this._svg = this._plot.svg.append('path')
		.attr('d', lineFunc(this._data))
		.attr('stroke', this._color)
		.attr('stroke-width', this._strokeWidth)
		.attr('fill', 'none');

	return this;
};

horizon.prototype.reDraw = function(data){
	var lineFunc = this.lineFunc();
	
	this._svg.transition()
		.duration(this._duration)
		.attr('d', lineFunc(data));
	return this;
};