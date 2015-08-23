/**
 * Created by cvetelina on 4/6/15.
 */
module.exports = function(grunt) {

    // Load Grunt tasks declared in the package.json file
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    //All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // grunt-contrib-connect will serve the files of the project
        // on specified port and hostname
        connect: {
            all: {
                options:{
                    port: 9000,
                    hostname: "0.0.0.0",
                    // Prevents Grunt to close just after the task (starting the server) completes
                    // This will be removed later as `watch` will take care of that
                    keepalive: true
                }
            }
        },

        // grunt-open will open your browser at the project's URL
        open: {
            all: {
                // Gets the port from the connect configuration
                path: 'http://localhost:9000'
            }
        },
        concat: {
            dist: {
                src: [
                    'app/js/app.js'  // This specific file
                ],
                dest: 'app/js/app.min.js'
            }
        },
        uglify: {
            build: {
                src: 'app/js/app.min.js',
                dest: 'app/js/mad.js'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'app/raw/img/',
                    src: ['*.{png,jpg,gif}'],
                    dest: 'app/img/'
                }]
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['app/js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['app/css/scss/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            },
            images: {
                files: ['app/img/*.{png,jpg,gif}'],
                tasks: ['imagemin'],
                options: {
                    spawn: false
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'app/css/mad.css': 'app/css/scss/global.scss'
                }
            }
        }
    });

    //Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-serve');

    //Where we tell Grunt what to do when we type "grunt" into the terminal.
    // Creates the `server` task
    grunt.registerTask('server',['connect', 'open']);
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'sass', 'watch']);

};