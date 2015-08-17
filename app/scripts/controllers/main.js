'use strict';

/**
 * @ngdoc function
 * @name visualizrApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the visualizrApp
 */
angular.module('visualizrApp')
	.controller('MainCtrl', function () {
		G3.seismicMap("seismic.json", "#seis_plot");
	});
