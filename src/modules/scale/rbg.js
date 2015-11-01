
g3.scale.rgb = function(){
  return new rgb();
};

var rgb = function(){
	var	_domain = [[0, 1], [0, 1], [0, 1]],
	_range = [[0, 255], [0, 255], [0, 255]];

	function rgbScale(r, g, b){
		var rScale = d3.scale.linear().domain(_domain[0]).range(_range[0]);
		var gScale = d3.scale.linear().domain(_domain[1]).range(_range[1]);
		var bScale = d3.scale.linear().domain(_domain[2]).range(_range[2]);
		return d3.rgb(rScale(r), gScale(g), bScale(b));
	}

	rgbScale.domain = function(domain){
		if(domain === undefined){ return _domain; }
		_domain = domain;
		return rgbScale;
	};

	rgbScale.range = function(range){
		if(range === undefined){ return _range; }
		_range = range;
		return rgbScale;
	}
	return rgbScale;
};

