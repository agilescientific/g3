
// Attach canvas creation function to g3
g3.canvas = function(plot, data){
  return new canvas(plot, data);
}

// Constructor
// Only set variables that are set by items passed in, otherwise set using prototype
var canvas = function canvas(plot, data){
	if(!data || !$.isArray(data)){ return 'Param: data is missing, An array required'; }
	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }
  this._data = data;
  this._plot = plot;
  var padding = $(this._plot._elem).css('padding-left');
  padding = Number(padding.replace('px', ''));
  this._canvas = d3.select(this._plot._elem)
		.append('canvas')
    .attr('width', this._data[0].length)
    .attr('height', this._data[0][0].length)
    .style('width', this._plot._width +  'px')
    .style('height', this._plot._height + 'px')
    .style('opacity', this._opacity)
    .style('top', this._plot._margin.top + 'px')
    .style('left', this._plot._margin.left + padding + 'px');
  return this;
};

canvas.prototype._gain = 1;

canvas.prototype.opacity = function(opacity){
	if(opacity === undefined){ return this._opacity; }
	this._opacity = opacity;
	this._canvas.style('opacity', opacity);
	return this;
};

canvas.prototype.gain = function(gain){
	if(gain === undefined){ return this._gain; }
	this._gain = gain;
	return this;
};

canvas.prototype.nDColorMap = function(nDColorMap){
	if(nDColorMap === undefined){ return this._nDColorMap; }
	this._nDColorMap = nDColorMap;
	return this;
};

canvas.prototype.draw = function(){
	this._context = this._canvas.node().getContext('2d');
	this.drawImage();
	return this;
};

canvas.prototype.reDraw = function(data){
	this._context.clearRect(0, 0, this._data[0].length, this._data[0][0].length);
	this._canvas
    .attr('width', data[0].length)
    .attr('height', data[0][0].length);
  this._data = data;
  this.drawImage();
  return this;
};

canvas.prototype.drawImage = function(){
	var x = this._data[0].length,
			y = this._data[0][0].length;
	this._image = this._context.createImageData(x,y);
	
	var r, g, b;
	for(var i = 0, p = -1; i < y; ++ i){
		for(var j = 0; j < x; ++j){
			r = 0, g = 0, b = 0;
			for(var k = 0; k < this._data.length; k++){
				var d = d3.rgb(this._nDColorMap[k](this._data[k][j][i]));
				r = r + (d.r / 255);
				g = g + (d.g / 255);
				b = b + (d.b / 255);
			}
			this._image.data[++p] = r * 255;
			this._image.data[++p] = g * 255;
			this._image.data[++p] = b * 255;
			this._image.data[++p] = 255;
		}
	}
	this._context.putImageData(this._image, 0, 0);

	return this;
};