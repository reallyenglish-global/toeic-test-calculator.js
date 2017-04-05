'use strict';

var ScaleScore = require('../../../lib/toeic-test-calculator/scaled_score.js');

var sandbox = sinon.sandbox.create();
var scaledscore;

function teardown() {
  sandbox.restore();
}

describe('ScaleScore', function() {
  before(function() {
    Observee.prototype = {
      relay: ['relay:event'],
      broadcast: ['broadcast:event'],
      transpose: {'onTransposeEvent': 'transpose:event' },
    }
    Observable.call(Observee.prototype);
    observee = new Observee();
  });
  after(teardown);

  describe('scaled_score', function() {
    var subject;
    before(function() {
      subject = {
        onRelayEvent: sandbox.spy()
      };
      observee.addObserver(subject, 'relay:event');
      observee.onRelayEvent('foo');
    });

    after(teardown);
    it('relays to observers', function() {
       expect(subject.onRelayEvent).to.be.calledWith('foo');
    });
  });

  describe('for', function() {
    var subject;
    before(function() {
      subject = {
        onBroadcastEvent: sandbox.spy()
      };
      observee.addObserver(subject, 'broadcast:event');
      observee.onBroadcastEvent('foo');
    });

    after(teardown);
    it('broadcasts with prepended inspect', function() {
       expect(subject.onBroadcastEvent).to.be.calledWith('bob', 'foo');
    });
  });

  describe('min_scaled_score', function() {
    before(function() {
      observee.trigger = sandbox.spy();
      observee.onTransposeEvent('transpose args');
    });

    after(teardown);
    it('broadcasts with only the observee inspection', function() {
       expect(observee.trigger).to.be.calledWith('transpose:event', 'transpose args');
    });
  });

});

