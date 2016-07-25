module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			dist: {
				src: [
					'js/vendor/jquery/jquery.js',
					'js/vendor/loader.js',
					'js/vendor/okhover.js',
					'js/vendor/tweenjs/Tween.js',
					'js/vendor/nodoubletapzoom/jquery.nodoubletapzoom.js',
					'js/vendor/tweenjs/src/Tween.js',
					'js/vendor/spin.js/spin.js',
					'js/mx/mx.js',
					'js/mx/mx.*.js',
					'js/spinner.js',
					'js/pano.js'

				],
				dest: 'js/live.concat.js',
			}
		},
		uglify: {
			options: {
				banner: '/* okfocus 2015 internet legends ~ https://github.com/okfocus/okfocus.github.io */\n'
			},
			build: {
				src: 'js/live.concat.js',
				dest: 'js/live.min.js'
			}
		},
		watch: {
			files: ['js/!(live.min|live.concat).js','js/vendor/*'],
			tasks: ['default']
		}
	});

	// Load tasks that we'll be using
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');


	// Default task(s).
	grunt.registerTask('default', ['concat', 'uglify']);
};
