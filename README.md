angular-input-usd
=====

Add this attribute to your input element to make it display as US Dollars.

It's a simple angularjs directive that changes the way an input looks without changing the value that angular sees for it.  It restricts the user to type only numeric characters and a decimal point and adds commas and a dollar sign at the front

Because it's such a small amount of code, it should be able to read and understand so you can even tweak it for your needs.  In fact, I encourage it!

Available on Bower
-----

`bower install angular-input-usd`

How To
-----
Simply include the input-usd module

```javascript
var app = angular.module('app', [ 'input-usd' ]);
```

Then use the usd attribute on input fields in your html

```html
<input type="text" usd />
```

Note that the input type must be `text` in order for angular to allow it to watch where your cursor is and not reset where your typing after each character.

This was designed for simplicity.  If you want something with more features (and the complexity that comes with that) check out: [angular-currency](https://github.com/BrandonCKrueger/angular-currency)

That's it!

Check out the github pages example here: http://deltreey.github.io/angular-input-usd/
