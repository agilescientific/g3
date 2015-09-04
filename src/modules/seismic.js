g3.seismic = function(plot, data, options){
	if(!data || !$.isArray(data)){ return 'Param: data is missing, An array required'; }
	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }
	
	var seismic = {};
	seismic.max = 1;
	seismic.gain = 1;

  seismic.draw = function(){
	seismic.color = d3.scale.linear()
		.domain([-this.max, 0, this.max])
		.range(['#FF0000', '#FFF', '#0000FF']);

  	var elem = $(plot.elem);
    this.canvas = d3.select(plot.elem)
      .append('canvas')
      .attr('width', data.length)
      .attr('height', data[0].length)
      .style('width', plot.width +  'px')
      .style('height', plot.height + 'px')
      .style('opacity', 0.95)
      .style('top', plot.margin.top + 'px')
      .style('left', plot.margin.left + 'px')
      .call(seismic.drawImage);
    return this;
  }

	seismic.drawImage = function(canvas){
		var context = canvas.node().getContext('2d'),
		x = data.length,
		y = data[0].length,
		image = context.createImageData(x,y);

		for(var i = 0, p = -1; i < y; ++ i){
			for(var j = 0; j < x; ++j){
				var c = d3.rgb(seismic.color(data[j][i]));
				image.data[++p] = c.r;
				image.data[++p] = c.g;
				image.data[++p] = c.b;
				image.data[++p] = 255;
			}
		}
		context.putImageData(image, 0, 0);
		return this;
	}

	seismic.setMax = function(max){
		this.max = max;
		return this;
	}	

	seismic.setGain = function(gain){
		this.gain = gain;
		return this;
	}

	return seismic;
}