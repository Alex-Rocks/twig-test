<?php
/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 */

// Load Composer dependencies.
require_once __DIR__ . '/vendor/autoload.php';

require_once __DIR__ . '/src/StarterSite.php';

Timber\Timber::init();

// Sets the directories (inside your theme) to find .twig files.
Timber::$dirname = ['templates', 'views'];


add_filter('timber/twig/environment/options', function ($options) {
    $options['cache'] = false;
    return $options;
});

new StarterSite();

add_action('init', function() {
    foreach ( new DirectoryIterator( __DIR__ . '/templates/blocks' ) as $block ) {
        if ( $block->isDir() && ! $block->isDot()
            && file_exists( "{$block->getPathname()}/block.json" )
        ) {
            register_block_type( $block->getPathname() );
        }
    }
});


function timber_acf_block_render_callback( $attributes, $content, $is_preview, $post_id, $block ) {
    $slug = str_replace('acf/', '', $attributes['name']);

    $context = Timber::context();
    $context['attributes'] = $attributes;
    $context['fields']     = get_fields();
    $context['is_preview'] = $is_preview;
    Timber::render("templates/blocks/{$slug}/{$slug}.twig", $context);
}

if ( class_exists( 'Timber' ) ) {
    Timber::$cache = false;
}


add_filter( 'timber/twig/environment/options', function( $options ) {
    $options['cache'] = false;
    return $options;
} );


add_filter( 'upload_mimes', 'svg_upload_allow' );

# Добавляет SVG в список разрешенных для загрузки файлов.
function svg_upload_allow( $mimes ) {
    $mimes['svg']  = 'image/svg+xml';

    return $mimes;
}


function my_mce_before_init_insert_formats($init_array)
{
    // Define the style_formats array
    $style_formats = array(
        array(
            'title' => 'Heading',
            'items' => array(
                array(
                    'title' => 'Arrow-icon h1',
                    'selector' =>'h1',
                    'classes' => 'arrow-icon'
                ),
                array(
                    'title' => 'Arrow-icon h2',
                    'selector' =>'h2',
                    'classes' => 'arrow-icon'
                ),
                array(
                    'title' => 'H1',
                    'selector' => 'p',
                    'classes' => 'h1-heading'
                ),
                array(
                    'title' => 'H2',
                    'selector' => 'p',
                    'classes' => 'h2-heading'
                ),
                array(
                    'title' => 'H3',
                    'selector' => 'p',
                    'classes' => 'h3-heading'
                ),
                array(
                    'title' => 'H4',
                    'selector' => 'p',
                    'classes' => 'h4-heading'
                ),
                array(
                    'title' => 'H5',
                    'selector' => 'p',
                    'classes' => 'h5-heading'
                ),
            ),
        ),
        array(
            'title' => 'Text',
            'items' => array(
                array(
                    'title' => 'Big',
                    'selector' => 'p',
                    'classes' => 'big'
                ),
            ),
        ),
        array(
            'title' => 'Button',
            'items' => array(
                array(
                    'title' => 'Button',
                    'selector' => 'a',
                    'classes' => 'button'
                ),
            ),
        ),
    );
    $init_array['style_formats'] = json_encode($style_formats);

    return $init_array;
}

add_filter('tiny_mce_before_init', 'my_mce_before_init_insert_formats');
// Remove <p> and <br/> from Contact Form 7
add_filter('wpcf7_autop_or_not', '__return_false');

/**
 * Admin gutenberg block css styled
 */
function gutenberg_full_width_admin()
{
    print '<style>
    html :where(.wp-block) {
    max-width: 95%!important;
    } 
    </style>';
}

add_action('admin_head', 'gutenberg_full_width_admin');

/**
 * Admin gutenberg block css styled
 */
function megademic_gutenberg_editor_styles()
{
    echo '
        <style>
            /* Main column width */
            .wp-block { max-width: 720px; }
 
            /* Width of "wide" blocks */
            .wp-block[data-align="wide"] { max-width: 1080px; }
 
            /* Width of "full-width" blocks */
            .wp-block[data-align="full"] { max-width: none; }    
        </style>
    ';
}

add_action('admin_head', 'megademic_gutenberg_editor_styles');

if( function_exists('acf_add_options_page') ) {
    acf_add_options_page([
        'page_title' => 'Site Settings',
        'menu_title' => 'Site Settings',
        'menu_slug'  => 'site-settings',
        'capability' => 'edit_posts',
        'redirect'   => false
    ]);
}

function register_header_menu() {
    register_nav_menu('header', 'Menu in Header');
    register_nav_menu('footer', 'Menu in Footer');
}
add_action('after_setup_theme', 'register_header_menu');


function register_header_footer_menus() {
    register_nav_menu('header', 'Menu in Header');
    register_nav_menu('footer', 'Menu in Footer');
}
add_action('after_setup_theme', 'register_header_footer_menus');

function add_menus_to_context($context) {
    $context['header_menu'] = wp_nav_menu(array(
        'theme_location' => 'header',
        'container' => false,
        'echo' => false,
    ));

    $context['footer_menu'] = wp_nav_menu(array(
        'theme_location' => 'footer',
        'container' => false,
        'echo' => false,
    ));

    return $context;
}
add_filter('timber/context', 'add_menus_to_context');
