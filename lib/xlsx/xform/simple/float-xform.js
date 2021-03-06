'use strict';

var utils = require('../../../utils/utils');
var BaseXform = require('../base-xform');

var FloatXform = module.exports = function(options) {
  this.tag = options.tag;
  this.attr = options.attr;
  this.attrs = options.attrs;
};

utils.inherits(FloatXform, BaseXform, {

  render: function(xmlStream, model) {
    if (model !== undefined) {
      xmlStream.openNode(this.tag);
      if (this.attrs) {
        xmlStream.addAttributes(this.attrs);
      }
      if (this.attr) {
        xmlStream.addAttribute(this.attr, model);
      } else {
        xmlStream.writeText(model);
      }
      xmlStream.closeNode();
    }
  },

  parseOpen: function(node) {
    if (node.name === this.tag) {
      if (this.attr) {
        this.model = parseFloat(node.attributes[this.attr]);
      } else {
        this.text = [];
      }
    }
  },
  parseText: function(text) {
    if (!this.attr) {
      this.text.push(text);
    }
  },
  parseClose: function() {
    if (!this.attr) {
      this.model = parseFloat(this.text.join(''));
    }
    return false;
  }
});
