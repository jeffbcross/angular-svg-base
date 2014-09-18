var protractor = require('protractor')
    , tractor = protractor.getInstance();

describe('e2e tests', function() {
  beforeEach(function() {
    browser.get('http://localhost:8080/test/e2e/index.html');
  });


  it('should load the right index', function() {
    browser.get('http://localhost:8080/test/e2e/index.html');
    expect(browser.getTitle()).toBe('SVG E2E Test App');
  });


  it('should have a base pointing to /test/e2e/subpath', function() {
    expect(element(by.tagName('base')).getAttribute('href')).toBe('http://localhost:8080/test/e2e/subpath');
  });


  it('should load the clip-path from the definition in the same document', function() {
    var counter = element(by.binding('clicked'));
    var rect = element(by.id('clipped'));

    expect(rect.getAttribute('clip-path')).toBe('url(http://localhost:8080/test/e2e/index.html#myClip)');

    //Click just to the left of the rectangle
    moveToOffset(9, 10);
    //Check that click counter did increment
    expect(counter.getText()).toBe('');

    //Click inside the top-left (non-clipped) portion of rectangle
    moveToOffset(1, 0);
    //Check that click counter did increment
    expect(counter.getText()).toBe('1');

    //Click inside the bottom-left (non-clipped) portion of rectangle
    moveToOffset(0, 9);
    //Check that click counter did increment
    expect(counter.getText()).toBe('2');

    //Click inside the bottom-middle (clipped) portion of rectangle
    moveToOffset(31, 0);
    //Check that click counter did NOT increment
    expect(counter.getText()).toBe('2');

    //Click the unclipped portion one more time for good measure
    moveToOffset(-30, 0);
    //Check that click counter did increment
    expect(counter.getText()).toBe('3');

    function moveToOffset (x, y) {
      browser.actions().
        mouseMove({x: x, y: y}).
        click().
        perform();
    }
  });
});
