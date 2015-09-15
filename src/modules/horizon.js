g3.horizon = function(plot, data, options){

	if(!data || !$.isArray(data)){ return 'Param: data is missing, An array required'; }
	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }

	var horizon = {};
	horizon.interpolate = 'basis';
	horizon.xInt = 1;
	horizon.xMin = plot.xDomain[0];
	horizon.yInt = 1;
	horizon.yMin = plot.yDomain[0];
	horizon.duration = 500;

	if(options){
		if(options.interpolate){ horizon.interpolate = options.interpolate; }
		if(options.xInt){ horizon.xInt = options.xInt; }
		if(options.xMin){ horizon.xMin = options.xMin; }
		if(options.yInt){ horizon.yInt = options.yInt; }
		if(options.yMin){ horizon.yMin = options.yMin; }
	}

	horizon.setInterpolate = function(interpolate){
		this.interpolate = interpolate;
		return this;
	}

	horizon.setXMin = function(xMin){
		this.xMin = xMin; 
		return this;
	}

	horizon.setDuration = function(duration){
		this.duration = duration;
		return this;
	}

	horizon.draw = function(){
		var lineFunc = d3.svg.line()
			.x(function (d, i) {
				return plot.xScale(i + horizon.xMin);
			})
			.y(function (d) {
				return plot.yScale(d);
			})
			.interpolate(this.interpolate);

		this.svg = plot.svg.append('svg:path')
			.attr('d', lineFunc(data))
			.attr('stroke', 'green')
			.attr('stroke-width', 1)
			.attr('fill', 'none');
		return this;
	}

	horizon.reDraw = function(data){
		var lineFunc = d3.svg.line()
			.x(function (d, i) {
				return plot.xScale(i + horizon.xMin);
			})
			.y(function (d) {
				return plot.yScale(d);
			})
			.interpolate(this.interpolate);
		
		this.svg.transition()
			.duration(this.duration)
			.attr('d', lineFunc(data));
		return this;
	}

	return horizon;
};
