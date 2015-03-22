module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    concat: {
      dist: {
        src: [
          'src/lib.js',
          'src/view.js',
          'src/*.js'
        ],
        dest: 'dist/package.js',
      },
    },


  });

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat']);

};