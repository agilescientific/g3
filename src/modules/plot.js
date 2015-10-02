// Attach horizon creation function to g3
g3.plot = function(elem){
  return new plot(elem);
};

// Constructor
// Only  variables that are  by items passed in, otherwise  using prototype
var plot = function plot(elem){
  if(!elem){ return 'Param: elem is missing. A div to attach to is required'; }
  this._elem = elem;
  this._margin = {top: 50, right: 0, bottom: 30, left: 0};
  this._width = $(this._elem).width() - this._margin.left;
  return this;
};

//  Defaults
plot.prototype._height = 800;
plot.prototype._xDomain = [0,0];
plot.prototype._yDomain = [0,0];
plot.prototype._xAxisVisible = true;
plot.prototype._yAxisVisible = true;
plot.prototype._x2AxisVisible = true;
plot.prototype._y2AxisVisible = true;
plot.prototype._xOrient = 'top';
plot.prototype._x2Orient = 'bottom';
plot.prototype._yOrient = 'left';
plot.prototype._y2Orient = 'right';
plot.prototype._duration = 5;

// Setters
plot.prototype.duration = function(duration){
  if(duration === undefined){ return this._duration; }
  this._duration = duration;
  return this;
};

plot.prototype.margin = function(top, right, bottom, left){
  if(top === undefined){ return this._margin; }
  this._margin = {top: top, right: right, bottom: bottom, left: left};
  return this;
};

plot.prototype.width = function(width){
  if(width === undefined){ return this._width; }
  this._width = width;
  return this;
};

plot.prototype.height = function(height){
  if(height === undefined){ return this._height; }
  this._height = height;
  return this;
};

plot.prototype.xDomain = function(domain){
  if(domain === undefined){ return this._xDomain; }
  this._xDomain = domain;
  return this;
};

plot.prototype.yDomain = function(domain){
  if(domain === undefined){ return this._yDomain; }
  this._yDomain = domain;
  return this;
};

plot.prototype.y2Domain = function(domain){
  if(domain === undefined){ return this._y2Domain; }
  this._x2Domain = domain;
  return this;
};

plot.prototype.y2Domain = function(domain){
  if(domain === undefined){ return this._y2Domain; }
  this._y2Domain = domain;
  return this;
};

plot.prototype.toggleXAxis = function(bool){
  if(bool === undefined){ return this._xAxisVisible; }
  this._xAxisVisible = bool;
  return this;
};

plot.prototype.toggleX2Axis = function(bool){
  if(bool === undefined){ return this._x2AxisVisible; }
  this._x2AxisVisible = bool;
  return this;
};

plot.prototype.toggleYAxis = function(bool){
  if(bool === undefined){ return this._yAxisVisible; }
  this._yAxisVisible = bool;
  return this;
};

plot.prototype.toggleY2Axis = function(bool){
  if(bool === undefined){ return this._y2AxisVisible; }
  this._y2AxisVisible = bool;
  return this;
};

plot.prototype.xTicks = function(ticks){
  if(ticks === undefined){ return this._xTicks; }
  this._xTicks = ticks;
  return this;
};

plot.prototype.yTicks = function(ticks){
  if(ticks === undefined){ return this._yTicks; }
  this._yTicks = ticks;
  return this;
};

plot.prototype.x2Ticks = function(ticks){
  if(ticks === undefined){ return this._x2Ticks; }
  this._x2Ticks = ticks;
  return this;
};

plot.prototype.y2Ticks = function(ticks){
  if(ticks === undefined){ return this._y2Ticks; }
  this._y2Ticks = ticks;
  return this;
};

plot.prototype.xTitle = function(title){
  if(title === undefined){ return this._yTitle; }
  this._xTitle = title;
  return this;
};

plot.prototype.yTitle = function(title){
  if(title === undefined){ return this._yTitle; }
  this._yTitle = title;
  return this;
};

plot.prototype.y2Title = function(title){
  if(title === undefined){ return this._y2Title; }
  this._y2Title = title;
  return this;
};

plot.prototype.x2Title = function(title){
  if(title === undefined){ return this._x2Title; }
  this._x2Title = title;
  return this;
};

plot.prototype.xOrient = function(orient){
  if(orient === undefined){ return this._xOrient; }
  this._xOrient = orient;
  return this;
};

plot.prototype.x2Orient = function(orient){
  if(orient === undefined){ return this._x2Orient; }
  this._x2Orient = orient;
  return this;
};

plot.prototype.yOrient = function(orient){
  if(orient === undefined){ return this._yOrient; }
  this._yOrient = orient;
  return this;
};

plot.prototype.y2Orient = function(orient){
  if(orient === undefined){ return this._y2Orient; }
  this._y2Orient = orient;
  return this;
};

plot.prototype.xTickFormat = function(format){
  if(format === undefined){ return this._xTickFormat; }
  this._xTickFormat = format;
  return this;
};

plot.prototype.yTickFormat = function(format){
  if(format === undefined){ return this._yTickFormat; }
  this._yTickFormat = format;
  return this;
};

plot.prototype.x2TickFormat = function(format){
  if(format === undefined){ return this._x2TickFormat; }
  this._x2TickFormat = format;
  return this;
};

plot.prototype.y2TickFormat = function(format){
  if(format === undefined){ return this._y2TickFormat; }
  this._y2TickFormat = format;
  return this;
};

plot.prototype.xScale = function(scale){
  if(scale === undefined){ return this._xScale; }
  this._xScale = scale;
  return this;
};

plot.prototype.x2Scale = function(scale){
  if(scale === undefined){ return this._x2Scale; }
  this._x2Scale = scale;
  return this;
};

plot.prototype.yScale = function(scale){
  if(scale === undefined){ return this._yScale; }
  this._yScale = scale;
  return this;
};

plot.prototype.y2Scale = function(scale){
  if(scale === undefined){ return this._y2Scale; }
  this._y2Scale = scale;
  return this;
};

plot.prototype.svg = function(svg){
  if(svg === undefined){ return this._svg; }
  this._svg = svg;
  return this;
};

plot.prototype.createSVG = function(){
  // Append svg object to dom element
  return d3.select(this._elem).append('svg')
    .attr('class', 'log_plot')
    .attr('width', this._width + this._margin.right + this._margin.left)
    .attr('height', this._height + this._margin.bottom + this._margin.top) 
    .append('g')
    .attr('height', this.height)
    .attr('transform', 'translate(' + this._margin.left + ',' + this._margin.top + ')');
};

plot.prototype.setScales = function(){
  this._xScale = d3.scale.linear()
    .domain(this._xDomain)
    .range([0, this._width]);

  this._yScale = d3.scale.linear()
    .domain(this._yDomain)
    .range([0, this._height]);

  if(this._x2Domain === undefined){ 
    this._x2Domain = this._xDomain;
  }
  this._x2Scale = d3.scale.linear()
    .domain(this._x2Domain)
    .range([0, this._width]);

  if(this._y2Domain === undefined){
    this._y2Domain = this._yDomain;
  }
  this._y2Scale = d3.scale.linear()
    .domain(this._y2Domain)
    .range([0, this._height]);
};

plot.prototype.createAxis = function(scale, innerTickSize, orient, ticks){
  return d3.svg.axis()
    .scale(scale)
    .innerTickSize(innerTickSize)
    .outerTickSize(3)
    .tickPadding(5)
    .orient(orient)
    .ticks(ticks);
};

plot.prototype.setAxis = function(){
  if(this._xAxisVisible){
    this._xAxis = this.createAxis(this._xScale, -this._height, this._xOrient, this._xTicks);
    this._xAxis.tickFormat(this._xTickFormat);
    this._svg.append('g')
      .attr('class', 'x axis')
      .call(this._xAxis);
  }
  if(this._yAxisVisible){
    this._yAxis = this.createAxis(this._yScale, -this._width, this._yOrient, this._yTicks);
    this._yAxis.tickFormat(this._yTickFormat);
    this._svg.append('g')
      .attr('class', 'y axis')
      .call(this._yAxis);
  }
  if(this._x2AxisVisible){
    this._x2Axis = this.createAxis(this._x2Scale, -this._height, this._x2Orient, this._x2Ticks);
    this._x2Axis.tickFormat(this._x2TickFormat);
    this._svg.append('g')
      .attr('class', 'x2 axis')
      .attr("transform", "translate(" + "0," + this._height + ")")
      .call(this._x2Axis);
  }
  if(this._y2AxisVisible){
    this._y2Axis = this.createAxis(this._y2Scale, -this._width, this._y2Orient, this._y2Ticks);
    this._y2Axis.tickFormat(this._y2TickFormat);
    this._svg.append('g')
      .attr('class', 'y2 axis')
      .attr("transform", "translate(" + this._width + ",0)")
      .call(this._y2Axis);
  }
};

plot.prototype.setTitles = function(){
  if(this._xTitle){
    if(this._xTickFormat === ""){
      var margin = -10;
    } else {
      var margin = -30;
    }
    this._svg.append("text")
      .attr("x", (this._width) / 2)
      .attr("y", margin)
      .style("text-anchor", "middle")
      .style("font-size", 12)
      .text(this._xTitle);
  }

  if(this._yTitle){
    if(this._yTickFormat === ""){
      var yMargin = -10;
    } else {
      var yMargin = -40;
    }

    this._svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", yMargin)
      .attr("dy", "1em")
      .style("text-anchor", "end")
      .style("font-size", 12)
      .text(this._yTitle);
  }

  if(this._x2Title){
    if(this._x2TickFormat === ""){
      var margin = 10;
    } else {
      var margin = 30;
    }

    this._svg.append("text")
      .attr("transform", "translate(" + "0," + this._height + ")")
      .attr("x", (this._width) / 2)
      .attr("y", margin)
      .style("text-anchor", "middle")
      .style("font-size", 12)
      .text(this._x2Title);
  }

  if(this._y2Title){
    if(this._yTickFormat === ""){
      var yMargin = -10;
    } else {
      var yMargin = -40;
    }

    this._svg.append("text")
      .attr("transform", "translate(" + "0," + this._height + ")")
      .attr("y", yMargin)
      .attr("dy", "1em")
      .style("text-anchor", "end")
      .style("font-size", 12)
      .text(this._y2Title);
  }
};

plot.prototype.draw = function() {
  this.setScales();
  this._svg = this.createSVG();
  this.setAxis();
  this.setTitles();
  return this;
};

plot.prototype.reDraw = function(xDomain, yDomain, x2Domain, y2Domain){    
  if(xDomain){
    this._xScale.domain(xDomain);
    this._svg.select('.x.axis')
      .transition()
      .duration(this._duration)
      .call(this._xAxis)
      .ease('linear');
  }

  if(yDomain){
    this._yScale.domain(yDomain);
    this._svg.select('.y.axis')
      .transition()
      .duration(this._duration)
      .call(this._yAxis)
      .ease('linear');
  }

  if(x2Domain === undefined){
      x2Domain = xDomain;
  }
  this._x2Scale.domain(x2Domain);
  this._svg.select('.x2.axis')
    .transition()
    .duration(this._duration)
    .call(this._x2Axis)
    .ease('linear');

  if(y2Domain === undefined){
    y2Domain = yDomain;
  }
  this._y2Scale.domain(y2Domain);
  this._svg.select('.y2.axis')
    .transition()
    .duration(this._duration)
    .call(this._y2Axis)
    .ease('linear');
};