module.exports = function(grunt) {
  // Configuration de Grunt
  grunt.initConfig({
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/base.js', 'src/dom.js', 'src/event.js', 'src/class.js'],
        dest: 'dist/core.js'
      }
    },
    uglify: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/base.js', 'src/dom.js', 'src/event.js', 'src/class.js'],
        dest: 'dist/core.js'
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-uglify')

  // Définition des tâches Grunt
  grunt.registerTask('dev', ['concat:dist'])
  grunt.registerTask('dist', ['uglify:dist'])
}
