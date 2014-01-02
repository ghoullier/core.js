module.exports = function(grunt) {
  var port = grunt.option('port') || 8000
    , coreFiles = ['core/*.js']
    , testFiles = ['tests/**/test.js']
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
      tests: {
        files: {
          'tests/base/test.min.js': ['tests/base/test.build.js'],
          'tests/class/test.min.js': ['tests/class/test.build.js'],
          'tests/controller/test.min.js': ['tests/controller/test.build.js'],
          'tests/dom/test.min.js': ['tests/dom/test.build.js'],
          'tests/events/test.min.js': ['tests/events/test.build.js'],
          'tests/form/test.min.js': ['tests/form/test.build.js'],
          'tests/string/test.min.js': ['tests/string/test.build.js'],
          'tests/template/test.min.js': ['tests/template/test.build.js'],
        }
      },
      examples: {
        files: {
          'examples/base/index.min.js': ['examples/base/index.build.js'],
          'examples/template/index.min.js': ['examples/template/index.build.js']
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
      files: ['Gruntfile.js'].concat(coreFiles).concat(testFiles)
    },
    mocha: {
      test: {
        src: ['tests/**/test.html']
      }
    },
    watch: {
      main: {
        files: ['Gruntfile.js'].concat(coreFiles).concat(testFiles),
        tasks: 'default'
      }
    },
    browserify: {
      tests: {
        files: {
          'tests/base/test.build.js': ['tests/base/test.js'],
          'tests/class/test.build.js': ['tests/class/test.js'],
          'tests/controller/test.build.js': ['tests/controller/test.js'],
          'tests/dom/test.build.js': ['tests/dom/test.js'],
          'tests/events/test.build.js': ['tests/events/test.js'],
          'tests/form/test.build.js': ['tests/form/test.js'],
          'tests/string/test.build.js': ['tests/string/test.js'],
          'tests/template/test.build.js': ['tests/template/test.js']
        }
      },
      examples: {
        files: {
          'examples/base/index.build.js': ['examples/base/index.js'],
          'examples/template/index.build.js': ['examples/template/index.js']
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

  // Tache de build
  grunt.registerTask('build', ['browserify:tests', 'uglify:tests', 'browserify:examples', 'uglify:examples'])
  grunt.registerTask('examples', ['browserify:examples', 'uglify:examples'])
  // Tache par défaut
  grunt.registerTask('default', ['synthax', 'build'])
  // Tache de vérification de la synthaxe
  grunt.registerTask('synthax', ['jshint'])
  // Tache de tests unitaires
  grunt.registerTask('tests', ['synthax', 'mocha'])
  // Tache serveur
  grunt.registerTask('server', ['connect', 'watch'])
}
