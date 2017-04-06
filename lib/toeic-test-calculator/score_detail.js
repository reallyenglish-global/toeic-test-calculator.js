'use strict'
var TOEICTestCalculator = require('../toeic-test-calculator');
var RationalNumber = require('rational-number');
var ScoreDetail = function() {
};

Tests.Reading = Reading;
Tests.Listening = Listening;

module.exports = ScoreDetail;

ScoreDetail.hash = function(score_detail) {
  return (new ScoreDetail(score_detail)).hash();
};

ScoreDetail.prototype.initialize = function(score_detail) {
  this.scores = score_detail.scores;
  this.process_scores();
};

ScoreDetail.prototype.hash = function(score_detail) {
  return {
        scores: scores,
        total: {
          scaled_score: total_scaled_score,
          band: band
        }
      };
};

ScoreDetail.prototype.total_scaled_score = function() {
  var sum = 0;
  for (var i = 0, len = this.scaled_scores.length; i < len; i++) {
    sum += this.scaled_scores[i];
  }
  return sum;
};

ScoreDetail.prototype.max_total = function() {
  var sum = 0;
  for (var i = 0, len = this.max_scores.length; i < len; i++) {
    sum += this.max_scores[i];
  }
  return sum;
};

ScoreDetail.prototype.min_total = function() {
  var sum = 0;
  for (var i = 0, len = this.min_scores.length; i < len; i++) {
    sum += this.min_scores[i];
  }
  return sum;
};

ScoreDetail.prototype.process_scores = function() {
  var score = 0;
  for (var i = 0, len = this.scores.length; i < len; i++) {
    score = this.scores[i];
    category = score.category;
    percentage = (new RationalNumber(score.score, score.max_score))*100.0;
    scaled_score = TOEICTestCalculator.for(percentage, category);
    scaled_scores.push(scaled_score);
    max_scores.push(TOEICTestCalculator.for(percentage+3, category));
    min_scores.push(TOEICTestCalculator.for(percentage-3, category));
    score['scaled_score'] = scaled_score;
  }
};

ScoreDetail.prototype.band = function() {
  return this.min_total + '-' + this.max_total;
};
