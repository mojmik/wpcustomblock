<?php
   /*
   Plugin Name: custom block plugin
   Plugin URI: http://ttj.cz
   description: Adds custom block option to guttenberg
  mAuta plugin
   Version: 1.2
   Author: Mik
   Author URI: http://ttj.cz
   License: GPL2
   */
   

add_action( 'enqueue_block_editor_assets', 'mik_block_assets' );
 
function mik_block_assets(){
 
	wp_enqueue_script(
 		'mik-block',
		plugin_dir_url( __FILE__ ) . 'block-mik.js',
		array( 'wp-blocks', 'wp-element', 'wp-editor' ),
		filemtime( dirname( __FILE__ ) . '/block-mik.js' )
	);
 
	wp_enqueue_style(
		'mik-block-css',
		plugin_dir_url( __FILE__ ) . 'block-mik.css',
		array( 'wp-edit-blocks' ),
		filemtime( dirname( __FILE__ ) . '/block-mik.css' )
	);
 
}