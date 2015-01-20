module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		cfg: grunt.file.readJSON('.couchapprc'),

		uglify: {
			options:{
				banner: '/*! <%= pkg.name %> - #<%= pkg.version %> - ' +
						'Author: Alex Schedler <alex@schedler.co>' +
						'<%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			default: {
				files:[{
					expand: true,
					cwd: 'src/_attachments/application',
					src: '**/*.js',
					dest: 'js/app.min.js'
				}]
			}
		},
		connect: {
			server: {
				options: {
					port: 9001,
					base: 'src/_attachments',
					keepalive:true
				}
			 }
		},
		watch: {
			src: {
				files: [
					'src/_attachments/**/*', '!src/_attachments/js/**/*'
				],
				tasks: ['uglify'],
				options: {
					livereload: true
				}
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'src/_attachments/**/*', '!src/_attachments/js/**/*'
				]
			}
		},
		/*
		 * CouchDB ...
		 */
		'couch-compile': {
			website: {
				files: {
					src: ['src', '!src/application'],
					dest: 'build/website.json'
				}
			}
		},
		'couch-push': {
			options: {
			  user: "<%= cfg.cloudant.username %>",
			  pass: "<%= cfg.cloudant.password %>",
			},
			cloudant: {
				files: {
					'<%= cfg.cloudant.url %>/<%= cfg.cloudant.couch %>': 'build/website.json'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-couch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['connect']);
	grunt.registerTask('compile', ['couch-compile']);
	grunt.registerTask('deploy', ['couch-compile', 'couch-push']);

};