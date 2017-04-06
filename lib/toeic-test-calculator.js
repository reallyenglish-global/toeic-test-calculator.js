'use strict';

var LinearScaleScore = require('./toeic-test-calculator/linear_scale_score');
var ScoreConversionChart = require('./toeic-test-calculator/score_conversion_chart');
var ScaleScore = require('./toeic-test-calculator/scale_score');
var ScaledScore = require('./toeic-test-calculator/scaled_score');
var ScoreDetail =  require('./toeic-test-calculator/score_detail');
var Tests = require('./toeic-test-calculator/tests');

var TOEICTestCalculator = {};
TOEICTestCalculator.for = function(score, test_type) {
  var split = test_type.split('_');
  //iterate through each of the "words" and capitalize them
  for (var i = 0, len = split.length; i < len; i++) {
    split[i] = split[i].charAt(0).toUpperCase() + split[i].slice(1);
  }
  test_type = split.join(' ');

  var test = Tests[test_type];
  var score_rational = ScaleScore.for(score, test);
  return ScaledScore.new(score_rational).score;
}
module.exports = TOEICTestCalculator;
