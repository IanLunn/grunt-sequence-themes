/*
 * grunt-sequence-themes
 * https://github.com/IanLunn/grunt-sequence-themes
 *
 * Copyright (c) 2014 Ian Lunn
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    package_sequence_themes: {
      themes: {
        options: {
          type: 'free'
        },
        expand: true,
        cwd: 'free',
        src: ['*'],
        dest: 'packaged-themes/free/'
      },

      premium_themes: {
        options: {
          type: 'premium'
        },
        expand: true,
        cwd: 'premium',
        src: ['*'],
        dest: 'packaged-themes/premium/'
      }
    }
  });



  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-rename');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-compress');

  grunt.registerTask('package-themes', ['package_sequence_themes']);

};
