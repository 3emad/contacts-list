// Karma configuration

module.exports = function(config) {
    config.set({ // jshint ignore:line

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
          'app/bower_components/angular/angular.js',
          'app/bower_components/angular-mocks/angular-mocks.js',
          'app/bower_components/angular-ui-router/release/angular-ui-router.js',
          'app/bower_components/angular-*/*.min.js',
          'app/bower_components/firebase/firebase.js',
          'app/bower_components/angularfire/dist/angularfire.js',

          // FIXME move it to test bower folder
          // jasmine jquery helper
          'app/bower_components/jquery/dist/jquery.js',
          'app/bower_components/jasmine-jquery/lib/jasmine-jquery.js',
          'test/bower_components/underscore/underscore.js',

          // fixtues
          'test/fixtures/*.json',

          // test setup enviorement to use Active model
          'test/test-env.js',

          // load webapp
          'app/scripts/app.js',
          'app/scripts/services/**/*.js',
          'app/scripts/directives/**/*.js',
          'app/scripts/directives/**/*.html',
          'app/scripts/controllers/**/*.js',
          'app/views/**/*.html',
          //'test/e2e/**/*.js',
          'test/spec/**/*.js',
        ],

        // list of files to exclude
        exclude: [
            'app/bower_components/angular/angular-loader.js',
            'app/bower_components/angular/*.min.js',
            'app/bower_components/angular/angular-scenario.js'
        ],

        plugins: [
          'karma-firefox-launcher',
          'karma-chrome-launcher',
          'karma-phantomjs-launcher',
          'karma-jasmine',
          'karma-ng-html2js-preprocessor'
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'app/scripts/**/*.html': 'ng-html2js',
            'app/views/**/*.html': 'ng-html2js',
        },

        ngHtml2JsPreprocessor: {
          stripPrefix: 'app/',
          moduleName: 'my.templates'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        // browsers: ['Chrome', 'Firefox', 'PhantomJS'],
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};
