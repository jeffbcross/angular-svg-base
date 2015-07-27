
# angular-svg-base

> Note: If you open an issue or PR here, please tweet me at jeffbcross so I will notice it.

This is a set of auto directives to fix SVG attributes that reference fragments
within the same document via FuncIRI notation (`mask="url(#someFragment)"`) where a base tag is
present. Blink and gecko incorrectly apply these references to the `base href`.

The attributes that will be automatically rewritten include:

 * clip-path
 * color-profile
 * src
 * cursor
 * fill
 * filter
 * marker
 * marker-start
 * marker-mid
 * marker-end
 * mask
 * stroke

The attributes will only be rewritten if the value matches FuncIRI notation
(i.e. `mask="url(#aMask)"`) and the url contains a hash.

See AngularJS issue [#8934](https://github.com/angular/angular.js/issues/8934).

## Installation

`$ bower install angular-svg-base`

## Usage

Just add the module as a dependency and it rewrites all `#fragment` urls to be
absolute urls relative to the current document, regardless of base.

(Note: directives only apply in html5 mode, as everything works as expected otherwise).

```javascript
angular.module('myApp', ['ngSVGAttributes']).
  config(function($locationProvider) {
    $locationProvider.html5Mode(true);
  });
```

## Testing

Unit Tests:

```shell
$ npm install .
$ ./node_modules/.bin/karma start
```

E2E (from project root directory):

Installs npm and webdriver dependencies, then starts server and runs e2e tests.

```shell
$ ./e2etest.sh
```

