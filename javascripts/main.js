'use strict';
var app = angular.module('app', [ 'input-usd' ]);

app.controller('MainCtrl', function ($scope) {
	$scope.money = 86753.09;
});
