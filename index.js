var Canvas = require('canvas');
var Image = Canvas.Image;
var qrcode = require('jsqrcode')(Canvas);
var util = require("util");
var events = require("events");

var QR = function (pngStream) {
  events.EventEmitter.call(this);
  this.pngStream = pngStream;
};

util.inherits(QR, events.EventEmitter);

QR.prototype.start = function () {
  this.pngStream.on('data', scanForCode);

  var self = this;
  function scanForCode(image) {
    try {
      var result = qrcode.decode(image);
      self.emit('qrcode', result);
    } catch (e) {
    }
  }
};

module.exports = QR;