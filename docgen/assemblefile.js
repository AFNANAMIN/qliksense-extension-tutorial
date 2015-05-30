'use strict';

// node libs
var path = require( 'path' );
var fs = require( 'fs' );

// external libs
var assemble = require( 'assemble' );
var debug = require( 'gulp-debug' );
var extend = require( 'extend-shallow' );
//var extname = require( 'gulp-extname' );
var glob = require( 'glob' );
var less = require( 'gulp-less' );
var yaml = require( 'js-yaml' );
var logger = require( './lib/utils/logger.js' );
var del = require( 'del' );

//var files = [];

// ****************************************************************************************
// Config file
// ****************************************************************************************
var cfg = yaml.load( fs.readFileSync( path.join( __dirname, './assemble-config.yml' ), 'utf-8' ) );
console.log( 'cfg.data >> ', cfg.options.data );
assemble.data( cfg.data );

// ****************************************************************************************
// Helpers
// ****************************************************************************************
assemble.helper( 'markdown', require( 'helper-markdown' ) );

//var helperFiles = glob.sync( assembleCfg.options.helperFiles );
//logger.silly( 'helperFiles', helperFiles );
//var helpers = helperFiles.reduce( function ( acc, fp ) {
//	logger.silly( 'fp', fp );
//	return extend( acc, require( path.resolve( fp ) ) );
//}, {} );

assemble.helpers( require( 'handlebars-hybrid' )( 'markdown' ) );

// ****************************************************************************************
// Assemble middleware
// ****************************************************************************************
//assemble.option( 'middleware', ['assemble-middleware-drafts'] );

// ****************************************************************************************
// Assemble options
// ***************************************************************************************
assemble.layouts( cfg.options.layouts );
assemble.set( 'layouts', cfg.options.layouts );
assemble.option( 'layout', cfg.options.defaultLayout );

// ****************************************************************************************
// Assemble tasks
// ****************************************************************************************

assemble.task( 'clean:tutorial', function ( cb ) {
	del.sync( [
		'./../tutorial/**/*'
	], {force: true} );
	cb();
} );

assemble.task( 'assets', function () {
	return assemble.copy( cfg.images.src, cfg.images.target );
} );

assemble.task( 'tutorial', function () {
	assemble.src( './../docs/**/*.md' )
		.pipe( debug() )
		//.pipe( extname() )
		.pipe( assemble.dest( cfg.docs.target ) )
} );

assemble.postRender( /\.(md|png)$/, function ( file, next ) {
	// you might need to use `file.data.layout`
	// file.relative
	// file.base
	// file.path
	//logger.silly( 'file', file.relative );
	//files.push( file.path );
	next( null, file );
} );

//assemble.end( function () {
//	logger.silly( 'assemble.onEnd' );
//} );

assemble.task( 'qliksite.yml', function ( cb ) {
	//logger.silly( 'files', files );
	cb();
} );

//assemble.task( 'git:add', function () {
//	assemble.src( './../tutorial/**/*' )
//		.pipe( wait( 1500 ) )
//		.pipe( gulpGit.add() )
//		.pipe( assemble.dest( './../tutorial' ) )
//} );

assemble.task( 'default', ['clean:tutorial', 'assets', 'tutorial', 'qliksite.yml'] );