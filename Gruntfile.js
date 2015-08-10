/*
 * grunt-sequence-themes
 * https://github.com/IanLunn/grunt-sequence-themes
 *
 * Copyright © 2015 Ian Lunn Design Limited
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    zip_themes: {
      free: {
        options: {
          type: 'free',
          dest: 'Products'
        },
        expand: true,
        cwd: '../sequence-themes/free',
        src: ['*', '!*.zip'],
        dest: '../Products/free/'
      },

      premium: {
        options: {
          type: 'premium',
          dest: 'Products'
        },
        expand: true,
        cwd: '../sequence-themes/premium',
        src: ['*', '!*.zip'],
        dest: '../Products/premium/'
      }
    },

    demo_themes: {
      free: {
        options: {
          type: 'free',
          dest: 'Products'
        },
        expand: true,
        cwd: '',
        src: ['../sequence-themes/free/*', '../sequence-themes/premium/*'],
        dest: 'demos.sequencejs.com/'
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
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('zip', 'Packages Sequence.js themes into zip files', ['zip_themes']);

  grunt.registerTask('demo', 'Makes demo packages for Sequence.js themes', ['demo_themes']);
};
