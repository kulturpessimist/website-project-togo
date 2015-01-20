module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		cfg: grunt.file.readJSON('.couchapprc'),
		/* Concatination and Minification */
		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: 'src/_attachments/js/**/*',
				dest: 'src/_attachments/resources/application.js',
			},
		},
		uglify: {
			options:{
				banner: '/*! \n<%= pkg.name %> - #<%= pkg.version %> \n' +
						'Author: Alex Schedler <alex@schedler.co> \n' +
						'<%= grunt.template.today("yyyy-mm-dd") %> \n*/\n\n'
			},
			default: {
				files:{
					'src/_attachments/resources/application.min.js': 'src/_attachments/resources/application.js'
				}
			}
		},
		/* Local Development Server (w/o local CouchDB) */
		connect: {
			server: {
				options: {
					port: 9001,
					base: 'src/_attachments',
					//keepalive:true,
					livereload: true,
					open: 'http://127.0.0.1:9001'
				}
			 }
		},
		watch: {
			src: {
				files: [
					'src/_attachments/**/*', '!src/_attachments/resources/**/*'
				],
				tasks: ['concat','uglify'],
				options: {
					livereload: true
				}
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			livereload: {
				options: {
					livereload: true
				},
				files: [
					'src/_attachments/**/*', '!src/_attachments/resources/**/*'
				]
			}
		},
		/*
		 * CouchDB (remote) Deloyment...
		 */
		'couch-compile': {
			website: {
				files: [{
					src: 'src',
					dest: 'build/website.json'
				}]
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
	/*
	 * The _Modules_
	 */
	grunt.loadNpmTasks('grunt-couch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	/*
	 * The _Tasks_
	 */
	grunt.registerTask('default', ['connect', 'watch']);
	grunt.registerTask('compile', ['concat','uglify','couch-compile']);
	grunt.registerTask('deploy', ['couch-compile', 'couch-push']);
};