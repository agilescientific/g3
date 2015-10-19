
// // Attach vd creation function to g3.log
// g3.log.vd = function(plot, data, data1){
//   return new vd(plot, data);
// };

// // Constructor
// // Only set variables that are set by items passed in, otherwise set using prototype
// var vd = function vd(plot, data, data1){
// 	if(!data || !$.isArray(data)){ return 'Param: data is missing, An array required'; }
// 	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }
//   this._data = data;
//   if(!data1){ this._data1 = data; }
//   this._plot = plot;
//   this._xTrans = 0;
//   this._yTrans = 0;
//   return this;
// };

// // Set remaining variables
// vd.prototype._xMult = 1;
// vd.prototype._yMult = 1;
// vd.prototype._duration = 5;
// vd.prototype._strokeWidth = 0.25;
// vd.prototype._barHeight = this._plot._height / (this._data1.length - 2);
// vd.prototype._max = d3.max(this._data1);

// // Default Color Scale
// if(vd._colorScale === undefined){
// 	vd.prototype._colorScale = function(){
// 		return d3.scale.linear()
// 			.domain([-this._max, 0, this._max])
// 			.range(['#FF0000', '#FFFFFF', '#0000FF']);
// 	};
// }

// // Setters 
// vd.prototype.duration = function(duration){
// 	if(duration === undefined){ return this._duration; }
// 	this._duration = duration;
// 	return this;
// };

// vd.prototype.xTrans = function(xTrans){
// 	if(xTrans === undefined){ return this._xTrans; }
// 	this._xTrans = xTrans;
// 	return this;
// };

// vd.prototype.xMult = function(xMult){
// 	if(xMult === undefined){ return this._xMult; }
// 	this._xMult = xMult;
// 	return this;
// };

// vd.prototype.yTrans = function(yTrans){
// 	if(yTrans === undefined){ return this._yTrans; }
// 	this._yTrans = yTrans;
// 	return this;
// };

// vd.prototype.yMult = function(yMult){
// 	if(yMult === undefined){ return this._yMult; }
// 	this._yMult = yMult;
// 	return this;
// };

// vd.prototype.colorScale = function(color){
// 	if(color === undefined){ return this._color; }
// 	this._color = color;
// 	return this;
// };

// vd.prototype.strokeWidth = function(strokeWidth){
// 	if(strokeWidth === undefined){ return this._strokeWidth; }
// 	this._strokeWidth = strokeWidth;
// 	return this;
// };

// vd.prototype.barHeight = function(barHeight){
// 	if(barHeight === undefined){ return this._barHeight; }
// 	this._barHeight = barHeight;
// 	return this;
// };

// vd.prototype.draw = function(){
// 			var barHeight = 600 / (posdata.length - 2);
// 			var bar = logPlot._svg.selectAll("rect")
//       	.data(posdata.slice(0, posdata.length - 1))
//     		.enter().append("rect")
//       	.attr("transform", function(d, i) { return "translate(0," + (logPlot._yScale(i)) + ")"; })
//       	.attr("width", function(d) { return logPlot._width; })
//       	.attr("height", barHeight)
//       	.attr('fill', function(d){ return colorScale(d);});

//       var area = d3.svg.area()
// 		    .x(function(d) { return logPlot._xScale(d); })
// 		    .x1(logPlot._width)
// 		    .y1(logPlot._height)
// 		    .y(function(d, i) { return logPlot._yScale(i); });

// 			logPlot._svg.append("path")
// 			  .datum(arr2)
// 			  .attr('transform', function(d, i) { return "translate(0," + logPlot._yScale(i) + ")";})
// 			  .attr("class", "area")
// 			  .attr("stroke", "black")
// 			  .attr("stroke-width", 0.5)
// 			  .attr("fill", 'white')
// 			  .attr("d", area);
// 	return this;
// };

// vd.prototype.reDraw = function(data){
// 	return this;
// };