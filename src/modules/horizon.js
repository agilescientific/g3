g3.horizon = function(options, plot, data){

	var horizon = {};
	horizon.interpolate = options.interpolate || 'basis';
	horizon.color = options.color || 'blue';
	horizon.strokeWidth = options.strokeWidth || 2;
	horizon.xMin = options.xMin || plot.xDomain[0];

	horizon.setInterpolate = function(interpolate){
		this.interpolate = interpolate;
		return this;
	}
	horizon.setColor = function(color){
		this.color = color;
		return this;
	}
	horizon.setStrokeWidth = function(strokeWidth){
		this.strokeWidth = strokeWidth;
		return this;
	}
	horizon.setXMin = function(xMin){
		this.xMin = xMin; 
		return this;
	}
	horizon.draw = function(){
		var lineFunc = d3.svg.line()
			.x(function (d, i) {
				return plot.xScale(i + horizon.xMin);
			})
			.y(function (d) {
				return plot.yScale(d / 1000);
			})
			.interpolate(this.interpolate);

		this.line = plot.svg.append('svg:path')
			.attr('d', lineFunc(data))
			.attr('stroke', this.color)
			.attr('stroke-width', this.strokeWidth)
			.attr('fill', 'none');
		return this;
	}

	return horizon;
};