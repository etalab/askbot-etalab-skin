module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: [
            "askbot_etalab/skin/etalab/media/{css,fonts,img}",
            "askbot_etalab/skin/etalab/media/js/{etalab,modernizr}*.js"
        ],
        copy: {
            bower: {
                files: [{
                    expand: true,
                    cwd: 'bower/bootstrap/fonts',
                    src: ['*'],
                    dest: 'askbot_etalab/skin/etalab/media/fonts/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: 'bower/etalab-assets/fonts',
                    src: ['*'],
                    dest: 'askbot_etalab/skin/etalab/media/fonts/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: 'bower/flags/flags/flags-iso/shiny/16',
                    src: ['*.png'],
                    dest: 'askbot_etalab/skin/etalab/media/img/flags',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: 'bower/etalab-assets/img',
                    src: ['*'],
                    dest: 'askbot_etalab/skin/etalab/media/img',
                    filter: 'isFile'
                }]
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            main: {
                src: [
                    'bower/jquery/jquery.js',
                    'bower/bootstrap/dist/js/bootstrap.js',
                    'bower/typeahead.js/dist/typeahead.js',
                    'bower/jquery.cookie/jquery.cookie.js',
                    'bower/swig/index.js',
                    'bower/etalab-assets/js/etalab-site.js',
                    'js/etalab-askbot.js'
                ],
                dest: 'askbot_etalab/skin/etalab/media/js/etalab-askbot.js',
            },
            legacy: {
                src: [
                    'bower/jquery-legacy/index.js',
                    'bower/bootstrap/dist/js/bootstrap.js',
                    'bower/etalab-assets/js/etalab-site.js',
                    'bower/swig/index.js',
                    'js/etalab-askbot.js'
                ],
                dest: 'askbot_etalab/skin/etalab/media/js/etalab-askbot-legacy.js'
            },
            modernizr: {
                src: [
                    'bower/modernizr/modernizr.js',
                    'bower/respond/respond.src.js'
                ],
                dest: 'askbot_etalab/skin/etalab/media/js/modernizr.js'
            }
        },
        less: {
            options: {
                paths: [
                    'bower/etalab-assets/less',
                    'bower/bootstrap/less'
                ]
            },
            dev: {
                files: {
                    'askbot_etalab/skin/etalab/media/css/etalab-askbot.css': ['less/etalab-askbot.less']
                }
            },
            prod: {
                options: {
                    yuicompress: true
                },
                files: {
                    'askbot_etalab/skin/etalab/media/css/etalab-askbot.min.css': ['less/etalab-askbot.less']
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> v<%= pkg.version %> \n' + '* http://noirbizarre.github.com/bootstrap-pickers \n' + '* Copyright (c) <%= grunt.template.today("yyyy") %> Axel Haustant \n' + '* MIT License \n' + '*/'
            },
            build: {
                files: {
                    'askbot_etalab/skin/etalab/media/js/etalab-askbot.min.js': ['askbot_etalab/skin/etalab/media/js/etalab-askbot.js'],
                    'askbot_etalab/skin/etalab/media/js/etalab-askbot-legacy.min.js': ['askbot_etalab/skin/etalab/media/js/etalab-askbot-legacy.js'],
                    'askbot_etalab/skin/etalab/media/js/modernizr.min.js': ['askbot_etalab/skin/etalab/media/js/modernizr.js']
                }
            }
        },
        watch: {
            javascript: {
                files: ['js/etalab-askbot.js'],
                tasks: ['concat', 'uglify']
            },
            style: {
                files: ['less/etalab-askbot.less'],
                tasks: ['less']
            }
        }
    });

    // Load libs
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Register the default tasks
    grunt.registerTask('default', ['copy', 'concat', 'less', 'uglify']);
    grunt.registerTask('serve', ['default', 'watch']);
    grunt.registerTask('dist', ['clean', 'default']);

};
