module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-broccoli");
  grunt.loadNpmTasks('grunt-karma');

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
    }
  });
};
