module.exports = function(grunt) {
  var port = grunt.option('port') || 8000
    , coreFiles = ['core/*.js']
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
      dist: {
        files: {
          'example/base/index.min.js': ['example/base/index.js'],
          'example/template/index.min.js': ['example/template/index.js']
        }
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
      files: ['Gruntfile.js'].concat(coreFiles)
    },
    mocha: {
      test: {
        src: ['tests/**/test.html']
      }
    },
    watch: {
      main: {
        files: ['Gruntfile.js'].concat(coreFiles),
        tasks: 'default'
      }
    },
    browserify: {
      dist: {
        files: {
          'example/base/index.js': ['example/base/src.js'],
          'example/template/index.js': ['example/template/src.js']
        }
      }
    }
  })

  // Chargement des tâches npm
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-mocha')
  grunt.loadNpmTasks('grunt-browserify')

  // Tache par défaut
  grunt.registerTask('default', ['synthax', 'browserify:dist', 'uglify:dist'])
  // Tache de vérification de la synthaxe
  grunt.registerTask('synthax', ['jshint'])
  // Tache de tests unitaires
  grunt.registerTask('tests', ['synthax', 'mocha'])
  // Tache serveur
  grunt.registerTask('server', ['connect', 'watch'])
}
