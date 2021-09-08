<?php
/**
 * Plugin Name:     Social Buttons Block
 * Description:     Enable one-click social sharing option to grow your audience
 * Version:         1.0.1
 * Author:          WPDeveloper
 * Author URI: 		https://wpdeveloper.net
 * License:         GPL-3.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:     social-buttons-block
 *
 * @package         social-buttons-block
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */


require_once __DIR__ . '/includes/admin-enqueue.php';
require_once __DIR__ . '/lib/style-handler/style-handler.php';

function create_block_social_block_init() {
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "social-links-block/social-links-block" block first.'
		);
	}

	$index_js     = 'build/index.js';
	wp_register_script(
		'create-block-social-block-editor',
		plugins_url($index_js, __FILE__),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
			'wp-block-editor',
			'wp-editor',
		),
		filemtime("$dir/$index_js")
	);

	$editor_css = 'build/index.css';
	wp_register_style(
		'create-block-social-block-editor',
		plugins_url($editor_css, __FILE__),
		array(),
		filemtime("$dir/$editor_css")
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'create-block-social-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	$fontpicker_theme = 'assets/css/fonticonpicker.base-theme.react.css';
	wp_register_style(
		'fontpicker-default-theme',
		plugins_url($fontpicker_theme, __FILE__),
		array()
	);

	$fontpicker_material_theme = 'assets/css/fonticonpicker.material-theme.react.css';
	wp_register_style(
		'fontpicker-matetial-theme',
		plugins_url($fontpicker_material_theme, __FILE__),
		array()
	);

	$hover_css = 'assets/css/hover-min.css';
	wp_register_style(
		'essential-blocks-hover-css',
		plugins_url($hover_css, __FILE__),
		array()
	);

	$fontawesome_css = 'assets/css/font-awesome5.css';
	wp_register_style(
		'fontawesome-frontend-css',
		plugins_url($fontawesome_css, __FILE__),
		array()
	);

	if( ! WP_Block_Type_Registry::get_instance()->is_registered( 'essential-blocks/social' ) ) {
    register_block_type( 'social-buttons-block/social-buttons-block', array(
      'editor_script'             => 'create-block-social-block-editor',
      'editor_style'              => 'create-block-social-block-editor',
      'style'                     => 'create-block-social-block',
	  'render_callback' => function ($attribs, $content) {
		if (!is_admin()) {
			wp_enqueue_style('fontawesome-frontend-css');
			wp_enqueue_style('essential-blocks-hover-css');
		}
		return $content;
	}
    ) );
  }
}

add_action( 'init', 'create_block_social_block_init' );
