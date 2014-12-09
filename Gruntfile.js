'use strict';

var paths = {
  js: ['*.js', 'test/**/*.js', '!test/coverage/**', '!bower_components/**', 'public/js/*.js', 'controllers/*.js', 'routes/*.js'],
  html: ['views/**'],
  css: ['public/css/*.css']
};

module.exports = function(grunt) {

  if (process.env.NODE_ENV !== 'production') {
    require('time-grunt')(grunt);
  }

  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['bower_components/build'],
    watch: {
      js: {
        files: paths.js,
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      html: {
        files: paths.html,
        options: {
          livereload: true,
          interval: 500
        }
      },
      css: {
        files: paths.css,
        tasks: ['csslint'],
        options: {
          livereload: true
        }
      }
    },
    /*
    uglify: {
      core: {
        options: {
          mangle: false
        },
        files: '<%= assets.core.js %>'
      }
    },
    */
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      src: paths.css
    },
    jshint: {
      all: paths.js,
      options: {
        jshintrc: '.jshintrc'
      }
    },
    /*
    cssmin: {
      core: {
        files: '<%= assets.core.css %>'
      }
    },
    */
    nodemon: {
      dev: {
        script: './bin/www',
        options: {
          args: [],
          ignore: ['node_modules/**'],
          ext: 'js,html',
          nodeArgs: ['--debug'],
          delayTime: 1,
          cwd: __dirname
        }
      }
    },
    concurrent: {
      tasks: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    },
    env: {
      test: {
        NODE_ENV: 'test'
      }
    }
  });

  //Load NPM tasks
  require('load-grunt-tasks')(grunt);

  //Default task(s).
  if (process.env.NODE_ENV === 'production') {
    grunt.registerTask('default', ['clean', 'cssmin', 'uglify', 'concurrent']);
  } else {
    grunt.registerTask('default', ['clean', 'jshint', 'csslint', 'concurrent']);
  }

  //Test task.
  grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);

  // For Heroku users only.
  // Docs: https://github.com/linnovate/mean/wiki/Deploying-on-Heroku
  grunt.registerTask('heroku:production', ['cssmin', 'uglify']);
};
