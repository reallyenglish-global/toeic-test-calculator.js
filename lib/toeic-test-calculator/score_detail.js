'use strict'
var TOEICTestCalculator = require('../toeic-test-calculator');
var RationalNumber = require('rational-number');
var ScoreDetail = function(score_detail) {
  this.initialize(score_detail);
};

function round(value, exp) {
  if (typeof exp === 'undefined' || +exp === 0)
    return Math.round(value);

  value = +value;
  exp = +exp;

  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
    return NaN;

  // Shift
  value = value.toString().split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
}

module.exports = ScoreDetail;

ScoreDetail.hash = function(score_detail) {
  return (new ScoreDetail(score_detail)).hash();
};

ScoreDetail.score_table = function() {
  var score, scores = [];
  for(var listening_score=0; listening_score<= 50; listening_score++) {
    for(var reading_score=0; reading_score<= 50; reading_score++) {
      score={scores:[{category:"listening",score:listening_score,max_score:50},{category:"reading",score:reading_score,max_score:50}]};
      scores.push(ScoreDetail.hash(score));
    }
  }
  return scores;
};

ScoreDetail.prototype.initialize = function(score_detail) {
  this.scores = score_detail.scores;
  this.scaled_scores = [];
  this.process_scores();
};

ScoreDetail.prototype.scaled_score_for_score = function(score) {
  return round((parseInt(score)*(0.223+9.308))*2, -1)/2
};

ScoreDetail.prototype.process_scores = function() {
  var score = 0, category, percentage, scaled_score;
  for (var i = 0, len = this.scores.length; i < len; i++) {
    score = this.scores[i];
    scaled_score = this.scaled_score_for_score(score.score)
    this.scaled_scores.push(scaled_score);
    score['scaled_score'] = scaled_score;
    score['percentage'] = Math.round(score.score/score.max_score*100);
  }
};

ScoreDetail.prototype.hash = function() {
  return {
    scores: this.scores,
    total: {
      scaled_score: this.total_scaled_score(),
      band: this.band(),
      percentage: this.total_percentage()
    }
  };
};

ScoreDetail.prototype.total_percentage = function() {
  var total_score=0, total_max_score=0;
  for (var i = 0, len = this.scores.length; i < len; i++) {
    total_score += this.scores[i]['score'];
    total_max_score += this.scores[i]['max_score'];
  }
  return Math.round(total_score/total_max_score*100);
};

ScoreDetail.prototype.total_scaled_score = function() {
  var total_score = 0;
  for (var i = 0, len = this.scores.length; i < len; i++) {
    total_score += this.scores[i]['scaled_score'];
  }
  return total_score;
};

ScoreDetail.prototype.band = function() {
  var band = this.fetch_band();
  if (band.length > 1) {
    return band[1];
  }
  return null;
};

ScoreDetail.prototype.fetch_band = function() {
  var bands = {
        "45":   "10-45",
        "95":   "50-95",
        "145": "100-145",
        "195": "150-195",
        "245": "200-245",
        "295": "250-295",
        "345": "300-345",
        "395": "350-395",
        "445": "400-445",
        "495": "450-495",
        "545": "500-545",
        "595": "550-595",
        "645": "600-645",
        "695": "650-695",
        "745": "700-745",
        "795": "750-795",
        "845": "800-845",
        "895": "850-895",
        "945": "900-945",
        "990": "950-990"
      };
  var score, band, rtn={};
  var total_scaled_score = this.total_scaled_score();
  for (var score in bands) {
    if (parseInt(score) >= total_scaled_score) {
      return [score, bands[score]];
    }
  }
  return [];
};
