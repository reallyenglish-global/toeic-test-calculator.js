'use strict';

var ScoreDetail = require('../../../lib/toeic-test-calculator/score_detail.js');

var sandbox = sinon.sandbox.create();

function teardown() {
  sandbox.restore();
}

var subject = new ScoreDetail({scores:[
        {category:'reading', score:20, max_score:50},
        {category:'listening', score:20, max_score:50},
    ]});

describe('ScoreDetail', function() {

  describe('hash', function() {
    var hash = subject.hash();
    it('scores', function() {
       console.log(hash);

       var h = {scores:[
            { category: 'reading', score: 20, max_score: 50, scaled_score: 125 },
            { category: 'listening', score: 20, max_score: 50, scaled_score: 155 } ],
          total: { scaled_score: 280, band: "240-315" }
        };

       expect(hash).to.be.eql(h);
    });
  });
});

