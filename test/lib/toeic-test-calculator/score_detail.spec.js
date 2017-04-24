'use strict';

var ScoreDetail = require('../../../lib/toeic-test-calculator/score_detail.js');

var sandbox = sinon.sandbox.create();

function teardown() {
  sandbox.restore();
}

var subject = new ScoreDetail({scores:[
        {category:'reading', score:20, max_score:30},
        {category:'listening', score:20, max_score:50},
    ]});

describe('ScoreDetail', function() {

  describe('hash', function() {
    var hash = subject.hash();
    it('scores', function() {
       var h = {scores:[
            { category: 'reading', score: 20, max_score: 30, percentage: 67, scaled_score: 290 },
            { category: 'listening', score: 20, max_score: 50, percentage: 40, scaled_score: 155 } ],
           total: { scaled_score: 445, band: "405-480", percentage: 54 }
        };

       expect(hash).to.be.eql(h);
    });
  });
});

