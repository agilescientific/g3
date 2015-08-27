g3.wiggle = function(options, plot, data){
	var wiggle = {};

	if(!options){ var options = {}; }
  if(!plot){ return 'Plot Required'; }
  if(!data || !$.isArray(data)){ return 'Data array required'; }

	wiggle.skip = options.skip || 20;
	wiggle.gain = options.gain || 20;
	wiggle.max = options.max; // Add an OR case here
	wiggle.xMin = options.xMin || plot.xDomain[0];
	wiggle.xInt = options.xInt || 1;
	wiggle.yMin = options.yMin || plot.yDomain[0];
	wiggle.yInt = options.yInt || 1;

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

	wiggle.draw = function() {
		for(var k = data.length - 1; k >= 0; k--){
	    if(this.skip === 0 || k % this.skip === 0){
	      var mean = d3.mean(data[k]); 
        var line = d3.svg.area()
          .interpolate('basis')
          .x(function (d) {
            return plot.xScale(d * s + wiggle.xMin + k);
          })
          .y(function (d, i){
            return plot.yScale(i * wiggle.yInt + wiggle.yMin);
          });
        var area = d3.svg.area()
          .interpolate('basis')
          .x(function (d, i) {
            return plot.xScale(mean * s + wiggle.xMin + k);
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
          .attr('class', 'area below')
          .attr('clip-path', 'url(#clip-below' + k)
          .attr('fill', 'grey')
          .attr('d', area.x0(function (d, i){ 
            return plot.xScale(d * s + wiggle.xMin + k);
          }));
	    }
	  }
	  return this;
	}
	return wiggle;
};