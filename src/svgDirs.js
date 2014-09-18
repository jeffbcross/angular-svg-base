'use strict';

(function(){
  var svgDirectives = {};

  angular.forEach([
      'clipPath',
      'colorProfile',
      'src',
      'cursor',
      'fill',
      'filter',
      'marker',
      'markerStart',
      'markerMid',
      'markerEnd',
      'mask',
      'stroke'
    ],
    function(attr) {
      svgDirectives[attr] = [
          '$rootScope', '$location', '$interpolate', 'urlResolve', 'computeSVGAttrValue', 'svgAttrExpressions',
          function($rootScope, $location, $interpolate, urlResolve, computeSVGAttrValue, svgAttrExpressions) {
            return {
              restrict: 'A',
              link: function(scope, element, attrs) {
                var initialUrl;
                //TODO: verify whether or not attribute must end with )
                //TODO: support expressions

                //Only apply to svg elements to avoid unnecessary observing
                if (!svgAttrExpressions.SVG_ELEMENT.test(element[0] &&
                    element[0].toString()) || !$location.$$html5) return;
                //Assumes no expressions, since svg is unforgiving of xml violations
                initialUrl = attrs[attr];
                attrs.$observe(attr, updateValue);
                if ($location.$$html5) $rootScope.$on('$locationChangeSuccess', updateValue);

                function updateValue () {
                  var newVal = computeSVGAttrValue(initialUrl);
                  //Prevent recursive updating
                  if (newVal && attrs[attr] !== newVal) attrs.$set(attr, newVal);
                }
              }
            };
          }];
  });

  angular.module('ngSVGAttributes', []).
    factory('urlResolve', [function() {
      //Duplicate of urlResolve & urlParsingNode in angular core
      var urlParsingNode = document.createElement('a');
      return function urlResolve(url) {
        urlParsingNode.setAttribute('href', url);
        return urlParsingNode;
      };
    }]).
    value('svgAttrExpressions', {
      FUNC_URI: /^url\((.*)\)$/,
      SVG_ELEMENT: /SVG[a-zA-Z]*Element/
    }).
    factory('computeSVGAttrValue', [
                '$location', 'svgAttrExpressions', 'urlResolve',
        function($location,   svgAttrExpressions,   urlResolve) {
          return function computeSVGAttrValue(url) {
            var match, fullUrl;
            if (match = svgAttrExpressions.FUNC_URI.exec(url)) {
              //hash in html5Mode, forces to be relative to current url instead of base
              if (match[1].indexOf('#') === 0 && $location.$$html5) {
                fullUrl = $location.absUrl() + match[1];
              }
              //Non-hash URLs in any mode
              else {
                var parsingNode = document.createElement('a');
                parsingNode.setAttribute('href', match[1]);
                fullUrl = parsingNode.href;
              }
            }
            return fullUrl ? 'url(' + fullUrl + ')' : null;
          };
        }
      ]
    ).
    directive(svgDirectives);
}());
