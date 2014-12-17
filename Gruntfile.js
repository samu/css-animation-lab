module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-broccoli");
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-sync');
  grunt.registerTask('default', 'sync');

  grunt.initConfig({
    broccoli: {
      test: {
        dest: "dist/test",
        config: "Brocfile.js",
        env: "development"
      },
      www: {
        dest: "www",
        config: "Brocfile.js",
        env: "development"
      },
      www1: {
        dest: "www1",
        config: "Brocfile.js",
        env: "development"
      }
    },

    karma: {
      unit: {
        configFile: "karma.conf.js",
      }
    },

    sync: {
      main: {
        files: [{
          cwd: 'www1',
          src: [
            '**', /* Include everything */
            '!**/*.txt' /* but exclude txt files */
          ],
          dest: 'www',
        }],
        pretend: false, // Don't do any IO. Before you run the task with `updateAndDelete` PLEASE MAKE SURE it doesn't remove too much.
        verbose: true // Display log messages when copying files
      }
    }
  });
};
