'use strict';

describe('Directive: usd', function () {

  beforeEach(module('input-usd'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should turn values into currency', inject(function ($compile) {
    scope.test = '1234.123';
    element = angular.element('<input ng-model="test" usd />');
    element = $compile(element)(scope);
    scope.$digest();
    expect(element.val()).toBe('$1,234.12');
  }));
});
