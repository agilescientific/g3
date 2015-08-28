function createAxis(scale, innerTickSize, orient){
	return d3.svg.axis()
		.scale(scale)
		.innerTickSize(innerTickSize)
		.outerTickSize(3)
		.tickPadding(5)
		.orient(orient);
}