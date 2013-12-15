module.exports = function(grunt) {
  var port = grunt.option('port') || 8000
    , jsFiles = ['src/base.js', 'src/dom.js', 'src/event.js', 'src/class.js', 'src/controller.js', 'src/storage.js', 'src/form.js']
  // Configuration de Grunt
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner:
        '/*\n' +
        ' * <%= pkg.name %> <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
        ' * <%= pkg.homepage %>\n' +
        ' * MIT licensed\n' +
        ' *\n' +
        ' * Copyright (C) 2014 Grégory Houllier\n' +
        ' */\n'
    },
    uglify: {
      options: {
        sourceMap: '../dist/core.js.map',
        sourceMapRoot: '/',
        banner: '<%= meta.banner %>',
        separator: ';'
      },
      dist: {
        src: jsFiles,
        dest: 'dist/core.js'
      }
    },
    connect: {
      server: {
        options: {
          port: port,
          base: '.'
        }
      }
    },
    jshint: {
      options: {
        asi: true,
        laxcomma: true,
        boss: true,
        globals: {
          console: false
        }
      },
      files: ['Gruntfile.js'].concat(jsFiles)
    },
    watch: {
      main: {
        files: ['Gruntfile.js'].concat(jsFiles),
        tasks: 'default'
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-contrib-watch')

  // Définition des tâches Grunt
  grunt.registerTask('default', ['jshint', 'uglify:dist'])
  grunt.registerTask('server', ['connect', 'watch'])
}
