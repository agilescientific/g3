
// // Attach line creation function to g3.log
// g3.log.line = function(plot, data){
//   return new line(plot, data);
// };

// // Constructor
// // Only set variables that are set by items passed in, otherwise set using prototype
// var line = function line(plot, data){
// 	if(!data || !$.isArray(data)){ return 'Param: data is missing, An array required'; }
// 	if(!plot){ return 'Param: plot is missing, a div to attach the svg is required'; }
//   this._data = data;
//   this._plot = plot;
//   this._xTrans = 0;
//   this._yTrans = 0;
//   return this;
// };

// // Set remaining variables
// line.prototype._xTrans = 1;
// line.prototype._yTrans = 1;
// line.prototype._color = "blue";
// line.prototype._duration = 5;
// line.prototype._strokeWidth = 0.25;

// // Setters 
// line.prototype.duration = function(duration){
// 	if(duration === undefined){ return this._duration; }
// 	this._duration = duration;
// 	return this;
// };

// line.prototype.xTrans = function(xTrans){
// 	if(xTrans === undefined){ return this._xTrans; }
// 	this._xTrans = xTrans;
// 	return this;
// };

// line.prototype.xMult = function(xMult){
// 	if(xMult === undefined){ return this._xMult; }
// 	this._xMult = xMult;
// 	return this;
// };

// line.prototype.yTrans = function(yTrans){
// 	if(yTrans === undefined){ return this._yTrans; }
// 	this._yTrans = yTrans;
// 	return this;
// };

// line.prototype.yMult = function(yMult){
// 	if(yMult === undefined){ return this._yMult; }
// 	this._yMult = yMult;
// 	return this;
// };

// line.prototype.color = function(color){
// 	if(color === undefined){ return this._color; }
// 	this._color = color;
// 	return this;
// };

// line.prototype.strokeWidth = function(strokeWidth){
// 	if(strokeWidth === undefined){ return this._strokeWidth; }
// 	this._strokeWidth = strokeWidth;
// 	return this;
// };

// line.prototype.draw = function(){
// 	var lineFunc = this.lineFunc();
// 	this._svg = this._plot._svg.append('path')
// 		.datum(this._data)
// 		.attr('d', lineFunc)
// 		.attr('stroke', this._color)
// 		.attr('stroke-width', this._strokeWidth)
// 		.attr('fill', 'none');
// 	return this;
// };

// line.prototype.reDraw = function(data){
// 	var lineFunc = this.lineFunc();
// 	this._svg.transition()
// 		.duration(this._duration)
// 		.attr('d', lineFunc(data))
// 		.ease('linear');
// 	return this;
// };

// line.prototype.lineFunc = function(){
// 	var plot = this._plot,
// 			yMult = this._yMult,
// 			yTrans = this._yTrans,
// 			xMult = this._xMult,
// 			xTrans = this._xTrans,
// 			interpolate = this._interpolate;

// 	return d3.svg.line()
// 		.x(function (d) {
// 			return plot._xScale(d * xMult + xTrans);
// 		})
// 		.y(function (d, i){
// 			return plot._yScale(i * yMult + yTrans);
// 		})
// 		.interpolate(interpolate);
// };