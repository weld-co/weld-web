'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'static/css/main.css': 'scss/main.scss'
        }
      }
    },
    postcss: {
      options: {
        processors: [
          require('autoprefixer')({ browsers: 'last 1 version' })
        ]
      },
      dist: {
        src: 'static/css/main.css'
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'static/css/main.css',
            '.build/static/css/main.css',
            '.build/*.html'
          ]
        },
        options: {
          open: 'ui',
          watchTask: true,
          server: '.build'
        }
      }
    },
    watch: {
      sass: {
        files: ['scss/**/*.scss'],
        tasks: ['sass', 'postcss', 'build-static']
      }
    }
  });

  // Loads above tasks / Note, need to add to package.json as well
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-browser-sync');

  // NEVER REMOVE THESE LINES, OR ELSE YOUR PROJECT MAY NOT WORK
  require('./options/generatorOptions.js')(grunt);
  grunt.loadTasks('tasks');

  // Compile site and start Browsersync with `wh serve` command
  grunt.renameTask('default', 'webhook');
  grunt.registerTask('default', ['sass', 'postcss', 'browserSync', 'webhook']);
};
