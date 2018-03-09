'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'mapdwell-test',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-eval' *.googleapis.com maps.gstatic.com",
      'font-src': "'self' fonts.gstatic.com",
      'connect-src': "'self' maps.gstatic.com",
      'img-src': "'self' *.googleapis.com maps.gstatic.com csi.gstatic.com data:",
      'style-src': "'self' 'unsafe-inline' fonts.googleapis.com maps.gstatic.com assets-cdn.github.com"
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  ENV['ember-google-maps'] = {
    key: 'AIzaSyCTJkCzFF8WJQSeAue7wBfhzPgniXi8yBI',
    language: 'en',
    region: 'US',
    protocol: 'https',
    version: '3.31',
    libraries: ['places', 'drawing']
  }

  ENV['place-autocomplete'] = {
    exclude: true,
    key: 'AIzaSyCTJkCzFF8WJQSeAue7wBfhzPgniXi8yBI',
  };

  return ENV;
};