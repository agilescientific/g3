
// Attach seismic creation function to g3
g3.seismic = function(plot, data){
  return new seismic(plot, data);
};

// Constructor
// Only set variables that are set by items passed in, otherwise set using prototype
var seismic = function seismic(plot, data){
	if(!data || !$.isArray(data)){ return 'Param: data is missing, An array required'; }
	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }
  this._data = data;
  this._plot = plot;
  return this;
};

// Set remaining variables
seismic.prototype._max = 1;
seismic.prototype._gain = 1;
seismic.prototype._duration = 5;

// Default Color Scale
if(seismic._colorScale === undefined){
	seismic.prototype._colorScale = function(){
		return d3.scale.linear()
			.domain([-this._max, 0, this._max])
			.range(['#FF0000', '#FFFFFF', '#0000FF']);
	};
}

// Setters
seismic.prototype.colorScale = function(colorScale){
	if(colorScale === undefined){ return this._colorScale; }
	this._colorScale = colorScale;
	return this;
};

seismic.prototype.duration = function(duration){
	if(duration === undefined){ return this._duration; }
	this._duration = duration;
	return this;
};

seismic.prototype.gain = function(gain){
	if(gain === undefined){ return this._gain; }
	this._gain = gain;
	return this;
};

seismic.prototype.max = function(max){
	if(max === undefined){ return this._max; }
	this._max = max;
	return this;
};

// Draw method
seismic.prototype.draw = function(){
	this._canvas = g3.canvas(this._plot, this._data)
		.gain(this._gain)
		.colorScale(this._colorScale)
		.draw();
  return this;
};

seismic.prototype.reDraw = function(data){
	this._canvas.reDraw(data);
};