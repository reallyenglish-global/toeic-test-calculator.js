'use strict'

var Tests = function() {
};

Tests.min_scaled_score = 5;
Tests.max_scaled_score = 495;

var Reading = function() { };
module.exports = Tests;

Reading.low_score_threshold = 21;
Reading.high_score_threshold = 100;

var Listening = function() {};

Listening.low_score_threshold = 17;
Listening.high_score_threshold = 93;

Tests.Reading = Reading;
Tests.Listening = Listening;

// Default configuration for TOEIC best fit based on conversion tables.
// NB We have been asked to use a linear scale from 0-100% for both
// reading and listening, however this has yet to be confirmed so will be
// using these defaults until that has been agreed.
//
// TODO at range when determined.
