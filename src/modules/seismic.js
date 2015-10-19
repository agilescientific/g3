
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

// Setters
seismic.prototype.nDColorMap = function(nDColorMap){
	if(nDColorMap === undefined){ return this._nDColorMap; }
	this._nDColorMap = nDColorMap;
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
		.nDColorMap(this._nDColorMap)
		.draw();
  return this;
};

seismic.prototype.reDraw = function(data){
	this._canvas.gain(this._gain)
	.nDColorMap(this._nDColorMap)
	.reDraw(data);
};