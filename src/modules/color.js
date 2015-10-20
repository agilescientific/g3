
g3.colorScale = {
	red_white_black: d3.scale.linear()
		.domain([0, 1])
		.range([d3.rgb(255, 0, 0), d3.rgb(255, 255, 255), d3.rgb(0, 0, 0)]),
	red_white_blue: d3.scale.linear()
		.domain([0, 1])
		.range([d3.rgb(255, 0, 0), d3.rgb(255, 255, 255), d3.rgb(0, 0, 255)]),
	greyscale: d3.scale.linear()
		.domain([0, 1])
		.range([d3.rgb(0, 0, 0), d3.rgb(127.5, 127.5, 127.5), d3.rgb(255, 255, 255)]),
	seismic: d3.scale.linear()
		.domain([0, 1])
		.range([d3.rgb(0, 0, 76.5), d3.rgb(253, 253, 1.0), d3.rgb(127.5, 0, 0)])
};