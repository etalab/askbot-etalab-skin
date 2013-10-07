module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['askbot_etalab/skin/etalab/media/{css,fonts,img,js/libs}'],
        copy: {
            assets: {
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
            },
            js: {
                expand: true,
                cwd: 'bower',
                src: [
                    'bootstrap/dist/js/bootstrap.js',
                    'etalab-assets/js/etalab-site.js',
                    'jquery-legacy/index.js',
                    'jquery.cookie/jquery.cookie.js',
                    'jquery.validation/jquery.validate.js',
                    'jquery/jquery.js',
                    'swig/index.js',
                    'typeahead.js/dist/typeahead.js',
                    'bootstrap-select/bootstrap-select.js',
                    'flot/jquery.flot.js',
                    'flot/jquery.flot.time.js',
                    'flot/excanvas.min.js',
                ],
                dest: 'askbot_etalab/skin/etalab/media/js/libs/',
                rename: function(dest, src) {
                    var parts = src.split('/');
                    console.log(dest, src);
                    if (parts[parts.length - 1] === 'index.js') {
                        return dest + parts[parts.length - 2] + '.js';
                    } else {
                        return dest + parts[parts.length - 1];
                    }
                }
            }
        },
        less: {
            options: {
                paths: [
                    'bower/etalab-assets/less',
                    'bower/bootstrap/less',
                    'bower/bootstrap-select'
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
                    'askbot_etalab/skin/etalab/media/js/libs/modernizr.min.js': [
                        'bower/modernizr/modernizr.js',
                        'bower/respond/respond.src.js'
                    ]
                }
            }
        },
        watch: {
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
    grunt.registerTask('default', ['copy', 'less', 'uglify']);
    grunt.registerTask('serve', ['default', 'watch']);
    grunt.registerTask('dist', ['clean', 'default']);

};
