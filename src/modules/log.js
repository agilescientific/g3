g3.log = function(plot, data, options){
	
	if(!data || !$.isArray(data)){ return 'Param: data is missing, An array required'; }
	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }

	var log = {};
	log.xInt = 1;
	log.xMin = plot.xDomain[0];
	log.yInt = 1;
	log.yMin = plot.yDomain[0];
	log.color = "blue";

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

	log.setColor = function(color){
		this.color = color;
		return this;
	}

  log.draw = function(){
    this.svg = plot.svg.append("path")  
      .datum(data)
      .attr("d", lineFunc)
      .attr("stroke", this.color)
      .attr("stroke-width", 0.25)
      .attr("fill", "none");

    // var sorted = data.sort(function(a, b) {
    //   return a - b;
    // });

    // var focus = plot.svg.append("g")
    //     .attr("class", "focus")
    //     .style("display", "none");

    // focus.append("circle")
    //     .attr("r", 4.5);

    // focus.append("text")
    //     .attr("x", 9)
    //     .attr("dy", ".35em");
    //     var bisectDate = d3.bisector(function(d) { return d; }).left;
    // plot.svg.append("rect")
    //     .attr("class", "overlay")
    //     .attr("width", plot.width)
    //     .attr("height", plot.height)
    //     .on("mouseover", function() { focus.style("display", null); })
    //     .on("mouseout", function() { focus.style("display", "none"); })
    //     .on("mousemove", mousemove);

    // function mousemove() {
    //   var x0 = plot.xScale.invert(d3.mouse(this)[0]),
    //       i = bisectDate(data, x0, 1),
    //       d0 = data[i - 1],
    //       d1 = data[i],
    //       d = x0 - d0 > d1 - x0 ? d1 : d0;
    //   focus.attr("transform", "translate(" + plot.xScale(d) + "," + plot.yScale(d) + ")");
    //   focus.select("text").text(d);
    // };
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

	log.reDraw = function(data, xDomain, yDomain){
		plot.xScale.domain(xDomain);
		plot.yScale.domain(yDomain);
		
		plot.svg.select('.x.axis')
			.transition()
			.duration(600)
			.call(plot.xAxis)
			.ease('linear')
			.selectAll("text")  
        .style("text-anchor", "start")
        .attr("transform", "rotate(-45)");

		plot.svg.select('.y.axis')
			.transition()
			.duration(600)
			.call(plot.yAxis)
			.ease('linear');

		this.svg.transition()
			.duration(600)
			.attr('d', lineFunc(data))
			.ease('linear');

		return this;
	}


	return log;
}
