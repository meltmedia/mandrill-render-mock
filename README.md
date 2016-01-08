# Mandrill Render Mock

The goal of this project is to create a temporary nodejs mock of the Mandrill API template#render function until handlebars
is fully supported as it currently functions in the message#send and message#send-template functions. Once Mandrill supports
this functionality, this library will be deprecated.

**Note:** This library does not support the Mailchimp language as Mandrill already supports its usage.

## Usage
```
var MandrillRender = require('./index');
MandrillRender.render({
  .render({
    "template_name": name,
    "template_content": content,
    "merge_vars": merge_vars
  }, function(result) {
  
  }, function(error) {
  
  });
```