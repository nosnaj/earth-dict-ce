const grunt = require('grunt');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-watch');

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
                'assets/scripts/jquery.min.js',
                'assets/scripts/bootstrap.min.js',
                'assets/scripts/material.min.js',
                'assets/scripts/waypoints.min.js',
                'assets/scripts/countto.min.js',
                // 'assets/scripts/ekkolightbox.min.js',
                'assets/scripts/wow.min.js',
                'assets/scripts/owlcarousel.min.js',
                'assets/scripts/device.min.js',
                // 'assets/scripts/mb.YTPlayer.min.js',
                // 'assets/scripts/masonry.min.js',
                'assets/scripts/isotope.min.js',
                'assets/scripts/hans.js'
            ],
            dest: 'assets/scripts/all.js',
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