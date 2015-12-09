'use strict';

angular.module('multistagebox', [])
  .directive('multiStageBox', function () {
    return {
      template: '<i class="{{ statusClass[status || 0] }} clickable" ng-click="updateStatus();"></i>',
      restrict: 'EA',
      scope: {
      	status: '='
      },
      link: function (scope, element) {
      	scope.statusClass = [
      		'fa fa-circle-o',
      		'fa fa-adjust',
      		'fa fa-circle'
      	];
      	scope.updateStatus = function () {
      		if (!scope.status) {
      			scope.status = 0;
      		}
      		if (scope.status === 2) {
      			scope.status = 0;
      		}
      		else {
      			scope.status++;
      		}
      		element[0].childNodes[0].className = scope.statusClass[scope.status];
      	};
      }
    };
  });