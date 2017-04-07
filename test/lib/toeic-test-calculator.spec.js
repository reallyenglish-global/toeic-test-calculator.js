'use strict';

var TOEICTestCalculator = require('../../lib/toeic-test-calculator.js');

var sandbox = sinon.sandbox.create();

function teardown() {
  sandbox.restore();
}

describe('TOEICTestCalculator', function() {

  describe('Listening test score', function() {
    describe('when percentage score is minimum threshold', function() {
      it('returns score of 5', function() {
        for (var percentage=1; percentage<=17; percentage++) {
          expect(TOEICTestCalculator.for(percentage, 'listening')).to.be.eql(5);
        }
      });
    });

    describe('percentage score is 93 or higher', function() {
      it('returns score of 495', function() {
        for (var percentage=93; percentage<=100; percentage++) {
          expect(TOEICTestCalculator.for(percentage, 'listening')).to.be.eql(495);
        }
      });
    });
  });

  describe('Reading test score', function() {
    describe('percentage score is lesson than 21', function() {
      it('returns score of 5', function() {
        for (var percentage=1; percentage<=21; percentage++) {
          expect(TOEICTestCalculator.for(percentage, 'reading')).to.be.eql(5);
        }
      });
    });

    describe('percentage score is 100', function() {
      it('returns score of 495', function() {
        expect(TOEICTestCalculator.for(100, 'reading')).to.be.eql(495);
      });
    });

    describe('percentage score < 100', function() {
      it('returns score below 495', function() {
        expect(TOEICTestCalculator.for(99, 'reading')).to.be.below(495);
      });
    });
  });
});

