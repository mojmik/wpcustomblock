<?php
   /*
   Plugin Name: Custom read more image effect block
   Plugin URI: https://www.cyltr.com/wp-custom-read-more-block/
   description: Adds custom block option to Guttenberg with fancy custom image and read more link. 
   Version: 1.2
   Author: Mik
   Author URI: http://www.ttj.cz
   License: GPL2
   */
   

add_action( 'enqueue_block_editor_assets', 'crmieb_block_assets' );
add_action( 'wp_enqueue_scripts', 'crmieb_enqueue_style_frontend' );

function crmieb_enqueue_style_frontend() {
  wp_register_style('wpcustomblockcss', plugin_dir_url( __FILE__ ) . 'block-mik-frontend.css');
  wp_enqueue_style( 'wpcustomblockcss');
}

function crmieb_block_assets(){
 
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