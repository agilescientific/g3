function defineg3() {
	var g3 = {};
	this.width = 300;
	return g3;
}
if(typeof(g3) === 'undefined') {
	window.g3 = defineg3();
}