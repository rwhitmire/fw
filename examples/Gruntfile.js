module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'js/lib/package.js': '../dist/package.js',
          'js/dist/app.js': 'js/src/app.js',
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-babel');

  grunt.registerTask('default', ['babel']);

};