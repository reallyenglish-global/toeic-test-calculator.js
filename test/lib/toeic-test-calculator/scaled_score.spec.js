'use strict';

var ScaledScore = require('../../../lib/toeic-test-calculator/scaled_score.js');

var sandbox = sinon.sandbox.create();

function teardown() {
  sandbox.restore();
}

var subject, opts = {
      low_score_threshold: 3,
      high_score_threshold: 7,
      min_scaled_score: 1,
      max_scaled_score: 21,
    };

describe('LinearScaleScore', function() {

  describe('#new', function() {
    describe('score', function() {
      it('is rounded to the nearest 5', function() {
        roundings = [
          [7.44444444, 5],
          [12.44444444, 10],
          [12.5, 15],
          [17.4, 15]
        ];

        for(var i=0, len=roundings.length; i<len; i++) {
          rational = roundings[i][0];
          score = roundings[i][1];
          expect((new ScaledScore(rational).score)).to.be.eql(score);
        }
      });
    });
  });
});
