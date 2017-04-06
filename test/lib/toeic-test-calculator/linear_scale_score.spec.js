'use strict';

var LinearScaleScore = require('../../../lib/toeic-test-calculator/linear_scale_score.js');

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

  describe('.calculate', function() {
    it('raise an error if score is outside the range', function() {
      subject = new LinearScaleScore(1, opts);
      expect(subject.calculate()).to.be.eql(h);
    });
    it('returns the correct score for percentages within range', function() {
      expect((new LinearScaleScore(3, opts)).calculate()).to.be.eql(1);
      expect((new LinearScaleScore(4, opts)).calculate()).to.be.eql(6);
      expect((new LinearScaleScore(5, opts)).calculate()).to.be.eql(11);
      expect((new LinearScaleScore(6, opts)).calculate()).to.be.eql(16);
      expect((new LinearScaleScore(7, opts)).calculate()).to.be.eql(21);
    });
  });
});

