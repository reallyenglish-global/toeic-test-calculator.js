'use strict'

var RationalNumber = require('rational-number');
var LinearScaleScore = function(percentage, opts) {
  this.initialize(percentage, opts);
};
module.exports = LinearScaleScore;

LinearScaleScore.prototype.initialize = function(percentage, opts) {
  this.percentage = percentage;
  this.low_score_threshold = opts['low_score_threshold'];
  this.high_score_threshold = opts['high_score_threshold'];
  this.min_scaled_score = opts['min_scaled_score'];
  this.max_scaled_score = opts['max_scaled_score'];
  this.validate();
};

LinearScaleScore.prototype.calculate = function() {
  var f = new RationalNumber(this.max_scaled_score - this.min_scaled_score, this.high_score_threshold-this.low_score_threshold);
  return (this.min_scaled_score + (this.percentage - this.low_score_threshold)*f);
};


LinearScaleScore.prototype.validate = function() {
 if (this.percentage < this.low_score_threshold || this.percentage > this.high_score_threshold) {
   throw 'Score is outside of range for linear scale';
 }
};
