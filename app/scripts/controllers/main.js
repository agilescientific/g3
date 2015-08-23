'use strict';

/**
 * @ngdoc function
 * @name visualizrApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the visualizrApp
 */
angular.module('visualizrApp')
	.controller('MainCtrl', function ($scope) {

		$scope.width = 300;
		$scope.height = 500;
		$scope.gain = 25;
		$scope.skip = 20;

		// Well Log 
		$.getJSON("seismic.json", function(logData) {
			$scope.logData = logData;
			// G3.logPlot(logData, ".seis_plot", true, "Vp");
			// G3.logPlot(logData, ".seis_plot", false, "Vs");	
			// G3.logPlot(logData, ".seis_plot", false, "p");
			// G3.logPlot(logData, ".seis_plot", false, "Evan");
			//G3.logPlot(logData, ".seis_plot", false, "matt");	
			G3.drawWiggles($scope.logData, ".seis_plot", null, $scope.height, $scope.skip, $scope.gain);
		});

		$scope.update = function(){
			// G3.updateWiggles($scope.logData, ".seis_plot", null, $scope.height, $scope.skip, $scope.gain);
		};
	});
