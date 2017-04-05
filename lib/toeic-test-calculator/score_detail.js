'use strict'
var _ = require('underscore');
var ScoreDetail = function() {
};

Tests.Reading = Reading;
Tests.Listening = Listening;

module.exports = ScoreDetail;

module TOEICTestCalculator
  class ScoreDetail
    def initialize(score_detail)
      @scores = score_detail.fetch(:scores)
      process_scores
    end

    def self.hash(score_detail)
      new(score_detail).hash
    end

    def hash
      {
        scores: scores,
        total: {
          scaled_score: total_scaled_score,
          band: band
        }
      }
    end

    def total_scaled_score
      scaled_scores.inject(:+)
    end

    def max_total
      max_scores.inject(:+)
    end

    def min_total
      min_scores.inject(:+)
    end

    private

    attr_reader :scores

    def process_scores
      scores.each do |score|
        category = score.fetch(:category)
        percentage = Rational(score.fetch(:score), score.fetch(:max_score))*100.0
        scaled_score = TOEICTestCalculator.for(percentage, category)
        scaled_scores << scaled_score
        max_scores << TOEICTestCalculator.for(percentage+3, category)
        min_scores << TOEICTestCalculator.for(percentage-3, category)

        score[:scaled_score] = scaled_score
      end
    end

    def band
      [min_total, max_total].join '-'
    end

    def scaled_scores
      @scaled_scores ||= []
    end

    def max_scores
      @max_scores ||= []
    end

    def min_scores
      @min_scores ||= []
    end
  end
end
