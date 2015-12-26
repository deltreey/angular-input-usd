'use strict';

angular.module('input-usd', [])
  .directive('usd', function () {

  	function Money(value) {
  		var result = {
  			dollars: '',
  			cents: null,
  			negative: false,
  			raw: function () {
  				var rawData = '';

  				if (result.negative) {
  					rawData += '-'
  				}

  				rawData += result.dollars.toString();
  				
  				if (result.cents || result.cents === 0) {
  					rawData += '.';
  					if (result.cents !== true) {
  						rawData += result.cents.toString();
  					}
  				}

  				return rawData;
  			},
  			pretty: function () {
  				var prettyData = '$';

  				if (result.negative) {
  					prettyData += '-';
  				}

  				var dollarString = result.dollars.toString();
  				var prettyDollars = '';

	        while (dollarString.length > 3) {
	          prettyDollars = ',' + dollarString.substr(-3) + prettyDollars;
	          dollarString = dollarString.substr(0, dollarString.length - 3);
	        }
	        prettyDollars = dollarString + prettyDollars;
	        prettyData += prettyDollars;

	        if (result.cents) {
	        	prettyData += '.';
  					if (result.cents !== true) {
  						prettyData += result.cents.toString();
  					}
	        }

	        return prettyData;
  			}
  		};

  		if (value) {
	  		var nonDigits = /[^0-9\.]/g;
	  		value = value.toString();
	      var rawText = value.replace(nonDigits, '');

        // deal with negative values
        if (value.indexOf('-') === 0) {
          result.negative = true;
        }
        // now we calculate the numbers
        var money = rawText.split('.');
        result.dollars = money[0] ? money[0].toString() : '';
        if (money[1] || money[1] === '0') {
        	result.cents = money[1].toString().substring(0, 2);
        }
        else if (value.indexOf('.') === value.length - 1) {
          result.cents = true;
        }
	    }

  		return result;
  	}

    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        ngModel.$formatters.push(function (value) {
        	var money = new Money(value);
          return money.pretty();
        });

        // clean output as digits
        ngModel.$parsers.push(function (value) {
          var cursorPosition = element[0].selectionStart;
          var oldLength = value.toString().length;
          var money = new Money(value);
          var newValue = money.pretty();
          ngModel.$setViewValue(newValue);
          ngModel.$render();
          element[0].setSelectionRange(cursorPosition + newValue.length - oldLength, cursorPosition + newValue.length - oldLength);
          return money.raw();
        });
      }
    };
  });
