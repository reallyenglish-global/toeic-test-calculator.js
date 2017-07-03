'use strict';

var ScoreDetail = require('../../../lib/toeic-test-calculator/score_detail.js');

var sandbox = sinon.sandbox.create();

function teardown() {
  sandbox.restore();
}

var subject = new ScoreDetail({scores:[
        {category:'reading', score:46, max_score:50},
        {category:'listening', score:20, max_score:50},
    ]});

describe('ScoreDetail', function() {

  describe('hash', function() {
    var hash = subject.hash();
    it('scores', function() {
       var h = {scores:[
            { category: 'reading', score: 46, max_score: 50, percentage: 92, scaled_score: 440 },
            { category: 'listening', score: 20, max_score: 50, percentage: 40, scaled_score: 190 } ],
           total: { scaled_score: 630, band: "600-645", percentage: 66 }
        };

       expect(hash).to.be.eql(h);
    });
  });

  describe('score_table', function() {
    it('output scores', function() {
      var table = ScoreDetail.score_table();
      console.log(table);
      var total = table[0]['total'];
      expect(table.length).to.be.eql(2601);
      expect(table[0]['total']['band']).to.be.eql('10-45');
    });
  });
});

