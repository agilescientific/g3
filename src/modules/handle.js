
g3.handle = {};

g3.handle.line = function(plot, x, y, x2, y2){
  return new line(plot, x, y, x2, y2);
};

// Constructor
// Only set variables that are set by items passed in, otherwise set using prototype
var line = function line(plot, x, y, x2, y2){
	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }
  this._plot = plot;
  this._x = x;
  this._y = y;

  if(x2 === undefined){
  	this._x2 = x;
  } else {
  	this._x2 = x2;
  }

  if(y2 === undefined){
  	this._y2 = y;
  } else {
  	this._y2 = y2;
  }
  return this;
};

line.prototype._strokeWidth = 30;
line.prototype._stroke = "black";
line.prototype._cursor = "pointer";
line.prototype._opacity = 0;
line.prototype._duration = 5;

line.prototype.class = function(cl){
	if(cl === undefined){ return this._class; }
	this._class = cl;
	return this;
};

line.prototype.strokeWidth = function(strokeWidth){
	if(strokeWidth === undefined){ return this._strokeWidth; }
	this._strokeWidth = strokeWidth;
	return this;
};

line.prototype.stroke = function(color){
	if(color === undefined){ return this._color; }
	this._color = color;
	return this;
};

line.prototype.cursor = function(cursor){
	if(cursor === undefined){ return this._cursor; }
	this._cursor = cursor;
	return this;
};

line.prototype.opacity = function(opacity){
	if(opacity === undefined){ return this._opacity; }
	this._opacity = opacity;
	return this;
};

line.prototype.line = function(line){
	if(line === undefined){ return this._line; }
	this._line = line;
	return this;
};

line.prototype.draw = function(){
	this._line = this._plot._svg.append('line')
		.attr('class', this._class)
		.style('stroke-width', this._strokeWidth)
		.style('stroke', this._stroke)
		.style('cursor', this._cursor)
		.style('opacity', this._opacity)
		.attr('x1', this._plot._xScale(this._x))
		.attr('y1', this._plot._yScale(this._y))
		.attr('x2', this._plot._xScale(this._x2))
		.attr('y2', this._plot._yScale(this._y2));
	return this;
};

line.prototype.reDraw = function(x, y, x2, y2){
	this._line
		.transition()
		.duration(this._duration)
		.attr('x1', this._plot._xScale(x))
		.attr('y1', this._plot._yScale(y))
		.attr('x2', this._plot._xScale(x2))
		.attr('y2', this._plot._yScale(y2));
	return this;
};




// handle.circle code
// var drag = d3.behavior.drag()  // capture mouse drag event
//   .on('drag', oGCirRedraw);

        // var position = [$scope.oGPlot.xScale($scope.offset), $scope.oGPlot.yScale($scope.twt)];
        // $scope.oGCir = $scope.oGPlot.svg.append('circle')
        //   .attr("class", "ogcir")
        //   .attr("r", 5)
        //   .attr("cx", position[0])
        //   .attr("cy", position[1])
        //   .style("opacity", 0.5)
        //   .call(drag);

        // $(".ogcir").mouseup(function(e){
        //   e.preventDefault();
        //   $scope.update_data();
        // });
   // } else {
      // position = [$scope.oGPlot.xScale($scope.offset), $scope.oGPlot.yScale($scope.twt)];
      // $scope.oGCir
      //   .attr("cx", position[0])
      //   .attr("cy", position[1]);


  // function oGCirRedraw(){
  //   var x = Math.floor($scope.oGPlot.xScale.invert(d3.event.x));
  //   var y = Math.floor($scope.oGPlot.yScale.invert(d3.event.y));

  //   // Check to make sure we are within the boundaries
  //   if(x < 0){
  //     x = 0;
  //   } else if(x > $scope.data.offset_gather.length - 1) {
  //     x = $scope.data.offset_gather.length - 1;
  //   }

  //   if(y < 0){
  //     y = 0;
  //   } else if(y > $scope.data.seismic[0].length - 1){
  //     y = $scope.data.seismic[0].length - 1;
  //   }

  //   $scope.offsetStr = x.toString();
  //   $scope.twtStr = y.toString();
  //   $scope.changeOffsetStr();
  //   $scope.changeTWTStr();
  //   $scope.wGCir
  //     .attr("cy", $scope.wGPlot.yScale($scope.twt));
  //   $scope.vDCir
  //     .attr("cy", $scope.vDPlot.yScale($scope.twt));
  //   $scope.oGCir
  //     .attr("cx", $scope.oGPlot.xScale($scope.offset))
  //     .attr("cy", $scope.oGPlot.yScale($scope.twt));
  // };

  // Register mouseup trigger for wgcir
// $(".wgcir").mouseup(function(e){
//   e.preventDefault();
//   $scope.update_data();
// });