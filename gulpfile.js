const gulp     = require('gulp');
const rollup   = require('gulp-rollup');
const cleanCSS = require('gulp-clean-css');
 
gulp.task('bundle', () => {
	gulp.src('./src/js/*.js')
		.pipe(rollup({
			"format": "iife",
			"plugins": [
				require("rollup-plugin-babel")({
					"presets": [["es2015", { "modules": false }]],
					"plugins": ["external-helpers"]
				})
			],
			entry: './src/js/app.js'
		}))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('minify-css', () => {
	gulp.src('./src/css/*.css')
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['minify-css', 'bundle'], () => {
	console.log('Files prepared!');
});