'use strict'
// Quick and dirty csv conversion chart for a given test.
// TODO tidy up and spec.
var ScoreConversionChart = function(percentage, opts) {
  this.initialize(percentage, opts);
};
module.exports = ScoreConversionChart;
ScoreConversionChart.csv = function(test_type) {
  var test_type = test_type;
  for(var p=0; p<=50; p++) {
    p = p*2;
    score = TOEICTestCalculator.for(p, test_type);
    low = TOEICTestCalculator.for(p-6, test_type);
    high = TOEICTestCalculator.for(p+6, test_type);
    range = low == high ? high.to_s : "#{low}-#{high}";
    console.log(p/2,',',score,',',range);
  }
};
