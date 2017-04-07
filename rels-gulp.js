var build = {
  source: 'toeic-test-calculator.js',
  bundle: {
    entries: [
      './lib/toeic-test-calculator'
    ],
    standalone: 'TOEICTestCalcultor',
    noParse: []
  }
};

module.exports = {
  dist: {
    build: build,
    dest: 'dist',
    vendor: {
      source: 'vendor.js'
    }
  },

  test: {
    dest: 'test',
    runner: 'test/runner.html',
    lint: [ './test/**/*.spec.js' ],
    build: {
      source: 'spec-manifest.js',
      bundle: {
        entries: [
          './test/lib/**/*.spec.js',
          './test/support/setup.js'
        ]
      }
    },
    vendor: {
      source: 'vendor.js'
    },
    clean: [
      './test/spec-manifest.js',
      './test/vendor.js',
      './test/rels-web.css'
    ],
    watch: [
      {
        files: ['test/**/*.spec.js', 'lib/**/*.js'],
        tasks: ['build:test', 'test-runner']
      }
    ]
  }
};
