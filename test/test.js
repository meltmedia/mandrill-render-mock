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

  it('should handle an unsub variable', function(done) {

    MandrillRender.render({
      'template': fixtures.unsubTemplate,
      'merge_vars': []
    }, function(result) {

      expect(result.html).to.equal('<table>http://google.com?tbd</table>');
      done();

    });

  });

  it('should handle a complex template', function(done) {

    MandrillRender.render({
      'template': fixtures.largeTemplateWithConditionals,
      'merge_vars': [{
        'name': 'custom_message',
        'content': 'A message!'
      }, {
        'name': 'signature',
        'content': 'Sincerely, Person'
      }]
    }, function(result) {

      expect(result.html).to.contain('A message!');
      expect(result.html).to.contain('Sincerely, Person');
      expect(result.html).to.contain('google.com?tbd');
      done();

    });

  });

});