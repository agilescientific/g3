g3.seismic = function(options, plot, data){
	if(!data || !$.isArray(data)){ return 'Param: data is missing, An array required'; }
	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }
	
	var seismic = {};
	var max = 13532;
	seismic.color = d3.scale.linear()
		.domain([-max, max])
		.range(['#000', '#FFF']);

  seismic.draw = function(){
    this.canvas = d3.select(plot.elem)
      .append('canvas')
      .attr('width', data.length)
      .attr('height', data[0].length)
      .style('width', plot.width + plot.margin.left + plot.margin.right - 2 + 'px')
      .style('height', plot.height + plot.margin.bottom + 8 + 'px')
      .style('padding', 19 + 'px')
      .style('top', plot.margin.top + 'px')
      .style('left', plot.margin.left + 'px')
      .call(seismic.drawImage);
    return this;
  }

	seismic.drawImage = function(canvas){
		var context = canvas.node().getContext('2d'),
		image = context.createImageData(data.length, data[0].length);

		for(var i = 0, p = -1; i < data[0].length; ++ i){
			for(var j = 0; j < data.length; ++j){
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

	return seismic;
}