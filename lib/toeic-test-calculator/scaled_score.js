'use strict'

var ScaledScore = function(rational_score) {
  this.initialize(rational_score);
};

module.exports = ScaledScore;

ScaledScore.prototype = {
  //attr_reader :score, :range, :text
  initialize: function initialize(rational_score) {
    this.score = this.round_5(rational_score);
  },
  round_5:  function (rational) {
    return  Math.round(rational*2, -1)/2;
  }
};
