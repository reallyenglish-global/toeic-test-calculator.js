'use strict'

var ScaledScore = function(rational_score) {
  this.initialize(rational_score);
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

module.exports = ScaledScore;

ScaledScore.prototype = {
  //attr_reader :score, :range, :text
  initialize: function initialize(rational_score) {
    this.score = this.round_5(rational_score);
  },
  round_5: function (rational) {
    return  round(rational*2, -1)/2;
  }
};
