'use strict';

angular.module('input-usd', [])
  .directive('usd', function () {
    function makeCurrency (value) {
      var result = '';

      var negative = false;
      if (value) {
        value = value.toString();
        // deal with negative values
        if (value.indexOf('-') === 0) {
          negative = true;
        }
        // no other hyphens allowed
        value = value.replace(/\-/g, '');
        // now we calculate the numbers
        if (value) {
          var money = value.toString().split('.');
          result = money[1] ? '.' + money[1].substring(0, 2) : '';
          if (value.toString().indexOf('.') === value.length - 1) {
            result += '.';
          }
          var dollars = money[0] || '0';
          while (dollars.length > 3) {
            result = ',' + dollars.substr(-3) + result;
            dollars = dollars.substr(0, dollars.length - 3);
          }
          result = dollars + result;
        }
      }
      if (negative) {
        result = '-' + result;
      }

      return result;
    }

    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        ngModel.$formatters.push(function (value) {
          return '$' + makeCurrency(value);
        });

        // clean output as digits
        ngModel.$parsers.push(function (value) {
          var cursorPosition = element[0].selectionStart;
          var oldLength = value.toString().length;
          var nonDigits = /[^0-9\.\-]/g;
          var floatValue = value.replace(nonDigits, '');
          var newValue = '$' + makeCurrency(floatValue);
          ngModel.$setViewValue(newValue);
          ngModel.$render();
          element[0].setSelectionRange(cursorPosition + newValue.length - oldLength, cursorPosition + newValue.length - oldLength);
          return floatValue;
        });
      }
    };
  });
