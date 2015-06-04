'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dev: {
        files: {
          'static/css/main.css': 'static/css/scss/main.scss'
        }
      }
    },
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer-core')({browsers: 'last 1 version'}),
          require('csswring')
        ]
      },
      dist: {
        src: 'static/css/*.css'
      }
    },
    watch: {
      sass : {
        files: ['static/css/scss/**/*.scss'],
        tasks: ['sass', 'postcss', 'build']
      }
    }
  });

  // LOADS ABOVE TASKS / Note, need to add to package.json as well
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');

  // NEVER REMOVE THESE LINES, OR ELSE YOUR PROJECT MAY NOT WORK
  require('./options/generatorOptions.js')(grunt);
  grunt.loadTasks('tasks');
};
