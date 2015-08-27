g3.log = function(options, plot, data){
	
	if(!data || !$.isArray(data)){ return 'Param: data is missing, An array required'; }
	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }

	var log = {};
	log.xInt = 1;
	log.xMin = plot.xDomain[0];
	log.yInt = 1;
	log.yMin = plot.yDomain[0];

	if(options){
		if(options.yInt){ log.yInt = options.zInt; }
		if(options.yMin){ log.yMin = options.yMin; }
		if(options.xInt){ log.xInt = options.xInt; }
		if(options.xMin){ log.xMin = options.xMin; }
	}

	// Setters
	log.setYInt = function(yInt){
		this.yInt = yInt;
		return this;
	}

	log.setYMin = function(yMin){
		this.yMin = yMin;
		return this;
	}

	log.setXInt = function(xInt){
		this.xInt = xInt;
		return this;
	}

	log.setXMin = function(xMin){
		this.xMin = xMin;
		return this;
	}

	log.setData = function(data){
		this.data = data;
		return this;
	}

	log.draw = function(){
		this.svg = plot.svg.append("path")  
			.attr("d", lineFunc(data))
			.attr("stroke", "blue")
			.attr("stroke-width", 0.25)
			.attr("fill", "none");
		return this;
	}

	var lineFunc = d3.svg.line()
	.x(function (d) {
		return plot.xScale(d);
	})
	.y(function (d, i){
		return plot.yScale(i * log.yInt + log.yMin);
	})
	.interpolate('basis');

	log.reDraw = function(data){
		this.svg.transition()
			.duration(600)
			.attr('d', lineFunc(data));
		return this;
	}

	return log;
}
