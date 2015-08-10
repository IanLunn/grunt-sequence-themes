/*
 * grunt-sequence-themes
 *
 *
 * Copyright © 2015 Ian Lunn Design Limited
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  var i = 0;

  grunt.registerMultiTask('zip_themes', 'Packages Sequence.js themes into zip files', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      type: '',
      dest: ''
    });

    var themeType = options.type;

    if (i === 0) {

      // Clean previously packaged themes on first run
      grunt.config.set('clean.packaged', ["products/"]);
      grunt.task.run('clean:packaged');

      grunt.config.set('copy.free', {
        expand: true,
        dot: 'first',
        cwd: '../sequence-themes/free/',
        src: [
          '*/**',
          '!**/bower_components/**',
          '!**/node_modules/**',
          '!**/.DS_Store',
          '!**/.sass-cache/**',
          '!**/images/raw/**',
          '!**/_notes/**'
        ],
        dest: '../Products/free/'
      });

      grunt.config.set('copy.premium', {
        expand: true,
        dot: 'first',
        cwd: '../sequence-themes/premium/',
        src: [
          '*/**',
          '!**/bower_components/**',
          '!**/node_modules/**',
          '!**/.DS_Store',
          '!**/.sass-cache/**',
          '!**/images/raw/**',
          '!**/_notes/**'
        ],
        dest: '../Products/premium/'
      });

      grunt.task.run('copy:free');
      grunt.task.run('copy:premium');
    }
    i++;

    // Iterate over all specified file groups.
    this.files.forEach(function (file) {

      var dest = file.dest;
      var src = file.src.filter(function (filepath) {

        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      // Be certain the src is a directory
      if (!grunt.file.isDir(src[0])) {
        grunt.log.warn('Source must be a theme directory');
      } else {

        // Get the theme name by splitting the directories and taking
        // the name of the last one
        var path = src[0].split('/');
        var theme = path[path.length-1];

        // Convert each theme into a zip
        grunt.config.set('compress.' + theme, {
          options: {
            archive: dest + '.zip',
          },
          files: [{
            expand: true,
            dot: 'first',
            cwd: '../Products/' +  themeType + '/',
            src: [theme + '/**'],
            dest: ''
          }]
        });

        // Remove theme files leaving just the zipped theme behind
        grunt.config.set('clean.' + theme,
        {
          options: {
            force: true
          },
          src: ['../Products/' + themeType + '/' + theme + '/']
        });

        // Run the tasks now they're set up
        grunt.task.run('compress:' + theme);
        grunt.task.run('clean:' + theme);
      }
    });
  });

  var i = 0;

  grunt.registerMultiTask('demo_themes', 'Makes demo packages out of Sequence.js themes', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      type: '',
      dest: ''
    });

    var themeType = options.type;

    if (i === 0) {

      grunt.config.set('clean.demos', ["demo.sequencejs.com/"]);
      grunt.task.run('clean:demos');

      grunt.config.set('copy.demos-free', {
        expand: true,
        dot: 'first',
        cwd: '../sequence-themes/free/',
        src: [
          '*/index.html',
          '*/css/sequence-theme.*.css',
          '!*/css/sequence-theme.*.min.css',
          '*/LICENSE.md',
          '*/scripts/*.min.js',
          '*/scripts/sequence-theme.*.js',
          '!*/scripts/sequence-theme.*.min.js',
          '*/images/*',
          '!*/images/_notes/**',
          '!*/images/raw/**',
          '!**/.DS_Store'
        ],
        dest: '../demo.sequencejs.com'
      });

      grunt.config.set('copy.demos-premium', {
        expand: true,
        dot: 'first',
        cwd: '../sequence-themes/premium/',
        src: [
          '*/index.html',
          '*/css/sequence-theme.*.css',
          '!*/css/sequence-theme.*.min.css',
          '*/LICENSE.md',
          '*/scripts/*.min.js',
          '*/scripts/sequence-theme.*.js',
          '!*/scripts/sequence-theme.*.min.js',
          '*/images/*',
          '!*/images/_notes/**',
          '!*/images/raw/**',
          '!**/.DS_Store'
        ],
        dest: '../demo.sequencejs.com'
      });

      grunt.config.set('copy.assets', {
        expand: true,
        dot: 'first',
        cwd: 'demo-assets/',
        src: [
          '.htaccess',
          'demo/**',
          'robots.txt'
        ],
        dest: '../demo.sequencejs.com'
      });

      grunt.task.run('copy:demos-free');
      grunt.task.run('copy:demos-premium');
      grunt.task.run('copy:assets');
    }
    i++;

    // Iterate over all specified file groups.
    this.files.forEach(function (file) {

      var dest = file.dest;
      var src = file.src.filter(function (filepath) {

        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      // Be certain the src is a directory
      if (!grunt.file.isDir(src[0])) {
        grunt.log.warn('Source must be a theme directory');
      } else {

        // Get the theme name by splitting the directories and taking
        // the name of the last one
        var path = src[0].split('/');
        var theme = path[path.length-1];

        // Replace instances of scripts with reference to one concantenated file
        grunt.config.set('replace.' + theme, {
            src: ['../demo.sequencejs.com/' + theme + '/index.html'],
            overwrite: true,
            replacements: [{
              from: '<!DOCTYPE html>',
              to: '<!--\n*\n* ▄▓▓▓▄\n* ▓▌      ▄▄▄  ▄▄▄▄▄  ▄   ▄   ▄▄▄  ▄▄▄▄▄   ▄▄▄▄  ▄▄▄\n* ▀▓▓▓▓  ▓▓ ▓▌ ▓▌ ▓▓▌ ▓▌  ▓▌ ▓▓ ▓▌ ▓▌ ▐▓▌ ▓▓▀   ▓▓ ▓▌\n*     ▓▌ ▓▓▀▀▀ ▓▌  ▓▌ ▓▓  ▓▌ ▓▓▀▀▀ ▓▌  ▓▌ ▓▓    ▓▓▀▀▀\n* ▀▓▓▓▀   ▀▓▓▀ ▀▓▓▓▓▌ ▀▓▓▓▓   ▀▓▓▀ ▓▌  ▓▌  ▀▓▓▀  ▀▓▓▀\n*                  ▓▌\n*\n* This is a demo for the Sequence.js theme: ' + theme + '\n*\n* Please see http://sequencejs.com/themes/' + theme + '/ before using this theme as you may be required\n* to purchase a license\n*\n* This demo is minified to protect its source. An unminified version along with instructions\n* can be found at: http://sequencejs.com/themes/' + theme + '/\n--><!DOCTYPE html>'
            }, {
              from: '<script src="scripts/imagesloaded.pkgd.min.js"></script>',
              to: ''
            }, {
              from: '<script src="scripts/hammer.min.js"></script>',
              to: ''
            }, {
              from: '<script src="scripts/sequence.min.js"></script>',
              to: ''
            }, {
              from: '<script src="scripts/sequence-theme.' + theme + '.js"></script>',
              to: '<script src="scripts/scripts.min.js"></script>'
            }, {
              from: '</body>',
              to: '<script>var slug = "' + theme + '";</script><script src="../demo/demo.js"></script></body>'
            }]
        });

        // Uglify all scripts and remove comments
        grunt.config.set('uglify.' + theme, {
          options: {
            preserveComments: false
          },
          files: [{
            expand: true,
            cwd: '../demo.sequencejs.com/',
            src: [theme + '/scripts/*.js'],
            dest: '../demo.sequencejs.com/'
          }]
        });

        // Create the concatenated file
        grunt.config.set('concat.' + theme, {
          options: {
            separator: ';\n'
          },
          files: [{
            src: [
              '../demo.sequencejs.com/' + theme + '/scripts/imagesloaded.pkgd.min.js',
              '../demo.sequencejs.com/' + theme + '/scripts/hammer.min.js',
              '../demo.sequencejs.com/' + theme + '/scripts/sequence.min.js',
              '../demo.sequencejs.com/' + theme + '/scripts/sequence-theme.' + theme + '.js'
            ],
            dest: '../demo.sequencejs.com/' + theme + '/scripts/scripts.min.js'
          }]
        });

        grunt.config.set('clean.' + theme, {
          expand: true,
          options: {
            force: true
          },
          cwd: '../demo.sequencejs.com/',
          src: [
            theme + '/scripts/hammer.min.js',
            theme + '/scripts/imagesloaded.pkgd.min.js',
            theme + '/scripts/sequence-theme.' + theme + '.js',
            theme + '/scripts/sequence.min.js'
          ]
        });

        // Minify index.html
        grunt.config.set('htmlmin.' + theme, {
          options: {
            removeComments: false,
            collapseWhitespace: true,
          },
          files: [{
            expand: true,
            cwd: '../demo.sequencejs.com/',
            src: [theme + '/index.html'],
            dest: '../demo.sequencejs.com/'
          }]
        });

        // Minify CSS
        grunt.config.set('cssmin.' + theme, {
          options: {
            roundingPrecision: -1
          },
          files: [{
            expand: true,
            cwd: '../demo.sequencejs.com/',
            src: [theme + '/css/*.css'],
            dest: '../demo.sequencejs.com/'
          }]
        });

        // Run the tasks now they're set up
        grunt.task.run('replace:' + theme);
        grunt.task.run('uglify:' + theme);
        grunt.task.run('concat:' + theme);
        grunt.task.run('clean:' + theme);
        grunt.task.run('htmlmin:' + theme);
        grunt.task.run('cssmin:' + theme);
      }
    });
  });
};
