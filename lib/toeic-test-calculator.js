'use strict';
var _ = require('underscore');

var LinearScaleScore = require('toeic_test_calculator/linear_scale_score');
var ScaleScore = require ('toeic_test_calculator/scale_score');
var ScoreConversionChart = require('toeic_test_calculator/score_conversion_chart');
var ScaleScore = require('toeic_test_calculator/scale_score');
var ScaledScore = require('toeic_test_calculator/scaled_score');
var ScoreDetail =  require('toeic_test_calculator/score_detail');
var Tests = require('toeic_test_calculator/tests');

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
