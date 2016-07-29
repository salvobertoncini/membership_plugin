<?php

/*
 *	Plugin Name: Ardeek 4 Associazioni Plugin
 *	Plugin URI: http://ardeek.com/a4associazioni
 *	Description: Basic membership plugin for all associations.
 *	Version: 1.0
 *	Author: Ardeek S.r.l.
 *	Author URI: http://ardeek.com
 *	License: GPL2
*/

/*
 *	Assign global variables
*/

function wpassociazione_menu()
{
	add_options_page(
		'Ardeek 4 Associazioni Plugin',
		'Ardeek Associazioni',
		'manage_options',
		'wpassociazione',
		'wpassociazione_option_page'
		);
}
add_action('admin_menu', 'wpassociazione_menu');

function wpassociazione_option_page()
{
	require ('view/main_menu_associazione.php');
}




?>