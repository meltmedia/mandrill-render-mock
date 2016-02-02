'use strict';

var Handlebars = require('handlebars');
var _ = require('lodash');

// This helper allows us to prevent removing template code for missing data
Handlebars.registerHelper('helperMissing', function(options) {;
  return ['{{', options.name, '}}'].join('');
});

Handlebars.registerHelper('unsub', function(options) {
  return options + "?tbd";
});

module.exports = {

  render: function(params, success, failure) {

    var template = params.template;
    if (!template) {
      failure({
        name: 'UnknownTemplate',
        message: 'You must supply a template'
      });
      return;
    }

    var compiledTemplate = Handlebars.compile(template);
    var data = {};

    _.each(params.merge_vars, function(merge_var) {
      data[merge_var.name] = merge_var.content;
    });

    success({
      html: compiledTemplate(data)
    });

  }

};