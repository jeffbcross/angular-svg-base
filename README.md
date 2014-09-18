
# angular-svg-base

See AngularJS issue [#8934](https://github.com/angular/angular.js/issues/8934).

## Development

 * npm install .
 * ./node_modules/.bin/webdriver-manager update

### Testing

Unit Tests: `./node_modules/.bin/karma start`

E2E (from project root directory):
```shell
$ ./node_modules/.bin/http-server
$ ./node_modules/.bin/webdriver-manager start
$ ./node_modules/.bin/protractor protractor.conf.js
```

