module.exports = function(grunt) {

    grunt.initConfig({
        'babel': {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'dist/rye.js': 'src/rye.js'
                }
            }
        },

        'watch': {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['babel']
            }
        }
    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['babel']);

};