
// Attach horizon creation function to g3
g3.wiggle = function(plot, data){
  return new wiggle(plot, data);
};

// Constructor
// Only set variables that are set by items passed in, otherwise set using prototype
var wiggle = function wiggle(plot, data){
	if(!data || !$.isArray(data)){ return 'Param: data is missing, An array required'; }
	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }
  this._data = data;
  this._plot = plot;
  this._xMin = plot.xDomain[0];
  this._yMin = plot.yDomain[0];
  this._rand = Math.floor((Math.random() * 100) + 100);
  return this;
};

// Set defaults
wiggle.prototype._skip = 0;
wiggle.prototype._gain = 30;
wiggle.prototype._xInt = 1;
wiggle.prototype._yInt = 1;
wiggle.prototype._duration = 5;
wiggle.prototype._sampleRate = 1;
wiggle.prototype._strokeWidth = 0.5;
wiggle.prototype._color = 'black';
wiggle.prototype._fillColor = 'black';
wiggle.prototype._opacity = 0.4;

//var s = wiggle.gain / wiggle.max;

wiggle.prototype.skip = function(skip){
	if(skip === undefined){ return this._skip; }
	this._skip = skip;
	return this;
};

wiggle.prototype.gain = function(gain){
	if(gain === undefined){ return this._gain; }
	this._gain = gain;
	return this;
};

wiggle.prototype.max = function(max){
	if(max === undefined){ return this._max; }
	this._max = max;
	return this;
};

wiggle.prototype.xMin = function(xMin){
	if(xMin === undefined){ return this._xMin; }
	this._xMin = xMin;
	return this;
};

wiggle.prototype.yMin = function(yMin){
	if(yMin === undefined){ return this._yMin; }
	this._yMin = yMin;
	return this;
};

wiggle.prototype.xInt = function(xInt){
	if(xInt === undefined){ return this._xInt; }
	this._xInt = xInt;
	return this;
};

wiggle.prototype.yInt = function(yInt){
	if(yInt === undefined){ return this._yInt; }
	this._yInt = yInt;
	return this;
};

wiggle.prototype.fillColor = function(color){
	if(color === undefined){ return this._fillColor; }
	this._fillColor = color;
	return this;
};

wiggle.prototype.color = function(color){
	if(color === undefined){ return this._color; }
	this._color = color;
	return this;
};

wiggle.prototype.strokeWidth = function(strokeWidth){
	if(strokeWidth === undefined){ return this._strokeWidth; }
	this._strokeWidth = strokeWidth;
	return this;
};

wiggle.prototype.sampleRate = function(sampleRate){
	if(sampleRate === undefined){ return this._sampleRate; }
	this._sampleRate = sampleRate;
	return this;
};

wiggle.prototype.duration = function(duration){
	if(duration === undefined){ return this._duration; }
	this._duration = duration;
	return this;
};

wiggle.prototype.opacity = function(opacity){
	if(opacity === undefined){ return this._opacity; }
	this._opacity = opacity;
	return this;
};

wiggle.prototype.lineFunc = function(k){
	var plot = this._plot,
			gain = this._gain,
			xMin = this._xMin,
			sampleRate = this._sampleRate,
			yInt = this._yInt,
			yMin = this._yMin;

	return d3.svg.area()
    .x(function (d) {
      return plot._xScale(d * gain + xMin + k * sampleRate);
    })
    .y(function (d, i){
      return plot._yScale(i * yInt + yMin);
    })
   	.interpolate('basis');
};

wiggle.prototype.areaFunc = function(k, mean){
	var plot = this._plot,
			gain = this._gain,
			xMin = this._xMin,
			sampleRate = this._sampleRate,
			yMin = this._yMin,
			yInt = this._yInt;

	return d3.svg.area()
	  .x(function (d, i) {
	    return plot._xScale(mean * gain + xMin + k * sampleRate);
	  })
	  .y(function (d, i){
	    return plot._yScale(i * yInt + yMin);
	  })
	 	.interpolate('basis');
};

wiggle.prototype.draw = function() {
	for(var k = this._data.length - 1; k >= 0; k--){
    if(this._skip === 0 || k % this._skip === 0){
      var mean = d3.mean(this._data[k]); 

      // Line function
	    var line = this.lineFunc(k);
	    var area = this.areaFunc(k, mean);

      this._plot._svg.datum(this._data[k]);

      this._plot._svg.append('clipPath')
        .attr('id', 'clip-below' + this._rand + k)
        .append('path')
        .attr('d', area.x0(this._plot._width));

      var plot = this._plot,
      		gain = this._gain,
      		xMin = this._xMin,
      		sampleRate = this._sampleRate;

      this._plot._svg.append('path')
        .attr('id', 'area-below' + k)
        .attr('clip-path', 'url(#clip-below' + this._rand + k)
        .attr('fill', this._fillColor)
        .style('opacity', this._opacity)
        .attr('d', area.x0(function (d, i){ 
          return plot._xScale(d * gain + xMin + k * sampleRate);
        }));

      this._plot._svg.append('path')
        .attr('class', 'line' + k)
        .attr('d', line(this._data[k]))
        .attr('stroke', this._color)
        .attr('stroke-width', this._strokeWidth)
        .attr('fill', 'none');
    }
  }
  return this;
};

wiggle.prototype.reDraw = function(data, xDomain, yDomain){

	// Redraw the Axis
	this._plot._xScale.domain(xDomain);
	this._plot._yScale.domain(yDomain);
		
	this._plot._svg.select('.x.axis')
		.transition()
		.duration(this._duration)
		.call(this._plot._xAxis)
		.selectAll("text")  
		.style("text-anchor", "start")
    	.attr("transform", "rotate(-45)" );

	this._plot._svg.select('.y.axis')
		.transition()
		.duration(this._duration)
		.call(this._plot._yAxis);

  for(var k = data.length - 1; k >= 0; k--){
    if(this._skip === 0 || k % this._skip === 0){
			var mean = d3.mean(data[k]); 
      
      this._plot._svg.select("#clip-below" + this._rand + k)
        .remove()

      var line = this.lineFunc(k);
      var area = this.areaFunc(k, mean);

      this._plot._svg.select(".line" + k)
        .transition()
        .duration(this._duration)
        .attr('d', line(data[k]))
        .ease("linear");

      this._plot._svg.datum(data[k]);

      this._plot._svg.append('clipPath')
        .attr('id', 'clip-below' + this._rand + k)
        .append('path')
        .attr('d', area.x0(this._plot._width));
        
      var plot = this._plot,
      		gain = this._gain,
      		xMin = this._xMin,
      		sampleRate = this._sampleRate;

      this._plot._svg.select("#area-below" + k)
        .attr('clip-path', 'url(#clip-below' + this._rand + k)
        .transition()
        .duration(this._duration)
        .attr('d', area.x0(function (d, i){ 
          return plot._xScale(d * gain + xMin + k * sampleRate);
        }))
        .ease('linear');
    	} 
		}
  return this;
};