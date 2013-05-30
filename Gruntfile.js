'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
    return connect.static(path.resolve(point));
};

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
      connect: {
          server: {
              options: {
                  port: 9001,
                  base: 'public/'
              }
          },
          livereload: {
              options: {
                  middleware: function (connect) {
                      return [
                        lrSnippet,
                        folderMount(connect, 'public')
                      ];
                  }
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
          livereload: {
              files: [
                'public/*.html',
                'html/*.{sass,scss}',
                'public/js/*.js'
              ],
              tasks: ['livereload']
          }
      }
    });

    grunt.loadNpmTasks('grunt-regarde');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['jshint','coffee', 'compass', 'livereload-start', 'connect', 'regarde']);
};
