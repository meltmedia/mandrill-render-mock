var expect = require('chai').expect;
var MandrillRender = require('../');
var fixtures = require('./fixtures');

describe('Mandrill render mock', function() {

  it('should template basic content', function(done) {

    var merge_vars = [{
      'name': 'code',
      'content': 'some content'
    }, {
      'name': 'more_code',
      'content': 'Event better content!'
    }];

    MandrillRender.render({
      'template': fixtures.simpleTemplate,
      'merge_vars': merge_vars
    }, function(result) {

      var expected = fixtures.simpleTemplate.replace('{{code}}', merge_vars[0].content);
      expected = expected.replace('{{more_code}}', merge_vars[1].content);

      expect(result.html).to.equal(expected);
      done();

    }, function(error) {
      done(error);
    });

  });

  it('should not template content when values are not passed in', function(done) {

    var merge_vars = [{
      'name': 'code',
      'content': 'some content'
    }];

    MandrillRender.render({
      'template': fixtures.simpleTemplate,
      'merge_vars': merge_vars
    }, function(result) {

      var expected = fixtures.simpleTemplate.replace('{{code}}', merge_vars[0].content);

      expect(result.html).to.equal(expected);
      done();

    }, function(error) {
      done(error);
    });

  });

});