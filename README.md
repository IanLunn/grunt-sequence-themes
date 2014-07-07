# grunt-sequence-themes

> Packages Sequence.js themes for distribution

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sequence-themes --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sequence-themes');
```

## The "package_sequence_themes" task

### Overview
In your project's Gruntfile, add a section named `package_sequence_themes` to the data object passed into `grunt.initConfig()`.

```js
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
```

### Options

#### options.type
Type: `String`
Default value: `''`

A string value that determines the theme type. Either 'free' or 'premium'.

### Usage Examples

#### Default Options
In this example, free themes are packaged and placed in the directories `packaged-themes/free/`.

```js
grunt.initConfig({
  package_sequence_themes: {
    themes: {
      options: {
        type: 'free'
      },
      expand: true,
      cwd: 'themes',
      src: ['*'],
      dest: 'packaged-themes/free/'
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Fair Warning

grunt-sequence-themes is used internally but is made publicly available for Sequence theme authors that may find it useful. It is by no means heavily tested or extensive; neither is it particularly nice code. If you would like to improve grunt-sequence-themes, please feel free to submit a pull request.
