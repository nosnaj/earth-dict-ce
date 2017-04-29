const grunt = require('grunt');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');

// Project configuration.
grunt.initConfig({
    watch: {
        markup: {
            files: ['**/*.html'],
            options: {
                livereload: true
            },
        },
        css : {
            files: ['dist/styles.css'],
            tasks: [],
            options: {
                spawn: true,
                livereload: true
            }
        },
        less: {
            files: ['src/*.less'],
            tasks: ['less'],
            options: {
                spawn: true,
                livereload: false
            },
        },

    },

    concat: {
        options: {
            separator: ';\n',
        },
        dist: {
            src: [
                'src/main.js'
            ],
            dest: 'dist/main.js',
        },
    },
    less: {
        development: {
            files: {
                'dist/styles.css': 'src/style.less'
            }
        }
    }
}); 
grunt.registerTask('default' , ['less' , 'watch']);