module.exports = function(grunt) {
  var port = grunt.option('port') || 8000
    , jsFiles = ['src/*.js']
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
    mocha: {
      test: {
        src: ['tests/**/test.html']
      }
    },
    watch: {
      main: {
        files: ['Gruntfile.js'].concat(jsFiles),
        tasks: 'default'
      }
    }
  })

  // Chargement des tâches npm
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-mocha')

  // Tache par défaut
  grunt.registerTask('default', ['synthax', 'uglify:dist'])
  // Tache de vérification de la synthaxe
  grunt.registerTask('synthax', ['jshint'])
  // Tache de tests unitaires
  grunt.registerTask('tests', ['synthax', 'mocha'])
  // Tache serveur
  grunt.registerTask('server', ['connect', 'watch'])
}
