/*
 * grunt-sequence-themes
 *
 *
 * Copyright (c) 2014 Ian Lunn
 * Licensed under the MIT license.
 */

'use strict';

var i = 0;

module.exports = function (grunt) {

  function removePackagedThemesDirectory() {
    grunt.config.set('clean.packaged', ["packaged-themes/"]);
    grunt.task.run('clean:packaged');
  }

  grunt.registerMultiTask('package_sequence_themes', 'Packages Sequence themes into zip files', function () {


    if(i === 0) {
      removePackagedThemesDirectory();

      grunt.config.set('copy.themes', {
        expand: true,
        cwd: 'themes/',
        src: ['**'],
        dest: 'packaged-themes/free/'
      });

      grunt.config.set('copy.packaged_themes', {
        expand: true,
        cwd: 'premium-themes/',
        src: ['**'],
        dest: 'packaged-themes/premium/'
      });

      grunt.task.run('copy:themes');
      grunt.task.run('copy:packaged_themes');
    }
    i++;

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      type: ''
    });

    var themeType = options.type;

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
      if(!grunt.file.isDir(src[0])) {
        grunt.log.warn('Source must be a theme directory');
      }else{

        // Get the theme name
        var theme = src[0].split('/')[1];

        // Copy theme files to the packaged-themes directory
        grunt.config.set('copy.' + theme + '.files', [{
          expand: true,
          flatten: true,
          cwd: 'text-files',
          src: [themeType + '-readme.txt', themeType + '-theme-license.txt', 'sequencejs-license.txt'],
          dest: dest
        }]);

        // Rename global text files
        grunt.config.set('rename.' + theme + '.files', [{
          src: [dest + '/' + themeType + '-readme.txt'],
          dest: dest + '/' + 'readme.txt'
        }, {
          src: [dest + '/' + themeType + '-theme-license.txt'],
          dest: dest + '/' + 'theme-license.txt'
        }]);


        // Replace any instance of <theme-name> within text files with a theme's actual name
        grunt.config.set('replace.' + theme, {
          src: [dest + '/*.txt'],
          overwrite: true,
          replacements: [{
            from: '<theme-name>',
            to: theme
          }]
        });


        // Convert each theme into a zip
        grunt.config.set('compress.' + theme, {
          options: {
            archive: dest + '.zip',
          },
          files: [{
            expand: true,
            cwd: 'packaged-themes/' +  themeType + '/',
            src: [theme + '/**'],
            dest: ''
          }]
        });

        // Remove theme files leaving just the zipped theme behind
        grunt.config.set('clean.' + theme, ['packaged-themes/' + themeType + '/' + theme + '/']);


        grunt.task.run('copy:' + theme);
        grunt.task.run('rename:' + theme);
        grunt.task.run('replace:' + theme);
        grunt.task.run('compress:' + theme);
        grunt.task.run('clean:' + theme);
      }
    });
  });
};
