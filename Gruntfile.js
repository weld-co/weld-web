'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true,
        sourceMapContents: true
      },
      dist: {
        files: {
          'static/css/main.css': 'scss/main.scss'
        }
      }
    },
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({ browsers: 'last 1 version' })
        ]
      },
      dist: { src: 'static/css/main.css' }
    },
    watch: {
      sass: {
        files: ['scss/**/*.scss'],
        tasks: ['sass', 'postcss', 'build']
      }
    }
  });

  // Loads above tasks / Note, need to add to package.json as well
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');

  // NEVER REMOVE THESE LINES, OR ELSE YOUR PROJECT MAY NOT WORK
  require('./options/generatorOptions.js')(grunt);
  grunt.loadTasks('tasks');
};
