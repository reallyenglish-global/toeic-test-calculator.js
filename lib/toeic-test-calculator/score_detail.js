'use strict'
var TOEICTestCalculator = require('../toeic-test-calculator');
var RationalNumber = require('rational-number');
var ScoreDetail = function(score_detail) {
  this.initialize(score_detail);
};

module.exports = ScoreDetail;

ScoreDetail.hash = function(score_detail) {
  return (new ScoreDetail(score_detail)).hash();
};

ScoreDetail.prototype.initialize = function(score_detail) {
  this.scores = score_detail.scores;
  this.total_scores = [];
  this.scaled_scores = [];
  this.max_scores = [];
  this.min_scores = [];
  this.process_scores();
};

ScoreDetail.prototype.hash = function() {
  return {
        scores: this.scores,
        total: {
          scaled_score: this.total_scaled_score(),
          band: this.band(),
          percentage: this.total_percentage(),
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

ScoreDetail.prototype.total_percentage = function() {
  var sum = 0;
  for (var i = 0, len = this.total_scores.length; i < len; i++) {
    sum += this.total_scores[i]/len;
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
  var score = 0, category, percentage, toeic_percentage, scaled_score;
  for (var i = 0, len = this.scores.length; i < len; i++) {
    score = this.scores[i];
    category = score['category'];
    toeic_percentage = (new RationalNumber(score['score'], score['max_score']))*100.0;
    scaled_score = TOEICTestCalculator.for(toeic_percentage, category);
    this.scaled_scores.push(scaled_score);
    percentage = score['score']/score['max_score']*100;
    this.total_scores.push(percentage);
    this.max_scores.push(TOEICTestCalculator.for(toeic_percentage+3, category));
    this.min_scores.push(TOEICTestCalculator.for(toeic_percentage-3, category));
    score['scaled_score'] = scaled_score;
    score['percentage'] = percentage;
  }
};

ScoreDetail.prototype.band = function() {
  return this.min_total() + '-' + this.max_total();
};
