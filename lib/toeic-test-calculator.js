'use strict';

var TOEICTestCalculator = function(){};
module.exports = TOEICTestCalculator;

var ScoreDetail =  require('./toeic-test-calculator/score_detail');
TOEICTestCalculator.hash = function(score_detail) {
  return ScoreDetail.hash(score_detail);
};
