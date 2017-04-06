'use strict'

var LinearScaleScore = require('./linear_scale_score');
var Tests = require('./tests');

var ScaleScore = function(score, test) {
  this.initialize(score, test);
};

module.exports = ScaleScore;

ScaleScore.prototype = {
  initialize: function initialize(score, test) {
    this.score = score;
    this.test = test;
  },

  scaled_score: function() {
    var score = this.score, test = this.test;
    if (this.score <= this.test.low_score_threshold) {
      return this.min_scaled_score();
    } else if (this.score >= this.test.high_score_threshold) {
      return this.max_scaled_score();
    } else {
      return (new LinearScaleScore(
          score,
          {low_score_threshold: test.low_score_threshold,
          high_score_threshold: test.high_score_threshold,
          min_scaled_score: min_scaled_score,
          max_scaled_score: max_scaled_score}
        )).calculate();
    }
  },

  min_scaled_score: function() {
    return Tests.min_scaled_score;
  },

  max_scaled_score: function() {
    return Tests.max_scaled_score;
  },

  for: function(percentage, test) {
    var score = new ScaleScore(percentage, test);
    return score.scaled_score();
  }
};
