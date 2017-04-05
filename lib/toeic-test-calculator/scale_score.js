'use strict'

var LinearScaleScore = require('linear_scale_score');

var ScaleScore = function(score_detail) {
  this.initialize(score_detail);
};

module.exports = ScaleScore;

var score, test;
ScaleScore.prototype = {
  initialize: function initialize(options) {
  },

  scaled_score: function() {
    if (score <= test.low_score_threshold) {
      return min_scaled_score;
    } else if (score >= test.high_score_threshold) {
      return max_scaled_score;
    } else {
      new LinearScaleScore(
          score,
          low_score_threshold: test.low_score_threshold,
          high_score_threshold: test.high_score_threshold,
          min_scaled_score: min_scaled_score,
          max_scaled_score: max_scaled_score
        ).calculate();
    }
  },

  min_scaled_score: function() {
    Tests.min_scaled_score
  },

  max_scaled_score: function() {
    Tests.max_scaled_score
  }

  for: function(percentage, test) {
    new(percentage, test).scaled_score
  }
}
