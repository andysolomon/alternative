'use strict';
var path = require('path');

module.exports = function(grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      jshint: {
        files:['html/**.js']
      },
      coffee: {
          compile: {
              files: {
                  'html/js/coffee.js': 'html/scripts/*.coffee'
              }
          }
      },
      compass: {
          dist: {
            options: {
              sassDir: 'html/sass',
              cssDir: 'public/css',
              javascriptsDir: 'html/js',
              fontsDir: 'html/fonts'
            }
          }
      },
      regarde: {
          compass: {
              files: ['html/sass/*.{sass,scss}'],
              tasks: 'compass'
          },
          coffee: {
              files: ['html/scripts/*.coffee'],
              tasks: 'coffee'
          },
      }
    });

    grunt.loadNpmTasks('grunt-regarde');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['jshint','coffee', 'compass', 'regarde']);
};
