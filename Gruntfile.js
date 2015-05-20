'use strict';
module.exports = function(grunt) {

  // ----------------------------------------------------------
  // WARNING, BRAVE DEVELOPER
  // ----------------------------------------------------------
  // Webhook allows you to use local grunt tasks and files.
  // However, these tasks are ONLY RUN LOCALLY and not when
  // your live site needs to be rebuilt. This means you should
  // only use grunt for pre-processing tasks like building
  // Sass, less or coffescript files, not for reading things
  // from your templates and making dynamic changes during
  // the build process. Doing so will cause your live site
  // not to regenerate.
  //
  // You have been warned!
  grunt.initConfig({
    sass: {
      dev: {
        options: {
          style: 'compressed'
        },
        files: {
          'static/css/main.css': 'static/css/scss/main.scss'
        }
      }
    },
    autoprefixer: {
      single_file: {
        options: {
        },
        src: 'static/css/main.css',
        dest: 'static/css/main.css'
      }
    },
    watch: {
      sass : {
        files: ['static/css/scss/**/*.scss'],
        tasks: ['sass', 'autoprefixer', 'build']
      }
    }
  });

  // THIS LOADS THE TASKS WE NEED ABOVE IN FROM OUR NPM
  // Note, that we need to have these installed through the package.json file as well
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // NEVER REMOVE THESE LINES, OR ELSE YOUR PROJECT MAY NOT WORK
  require('./options/generatorOptions.js')(grunt);
  grunt.loadTasks('tasks');
};
