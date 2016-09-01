<?php

/*
 *	Plugin Name: Ardeek 4 Associazioni Plugin
 *	Plugin URI: http://ardeek.com/a4associazioni
 *	Description: Basic membership plugin for all associations.
 *	Version: 0.1
 *	Author: Ardeek S.r.l.
 *	Author URI: http://ardeek.com
 *	License: GPL2
*/

/*
 * WORDPRESS PLUGIN
*/

$plugin_path 	= __DIR__ . '/../../../..';
$website_path 	= __DIR__ . '/..';
$full_url 		= 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'];

function wpardeekmembership_menu()
{
	add_options_page(
		'Ardeek 4 Associazioni Plugin',
		'Ardeek Associazioni',
		'manage_options',
		'wpardeekmembership',
		'wpardeekmembership_option_page'
		);
}
add_action('admin_menu', 'wpardeekmembership_menu');



function wpardeekmembership_option_page()
{
	require ('view/main_menu_associazione.php');
}

/* FUNZIONE CHE SI ATTIVA QUANDO SI INSTALLA IL PLUGIN */
function wpardeekmembership_activate()
{
    global $wpdb;
    global $plugin_prefix;

	$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}ardeek_contents;");
		$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}ardeek_membership;");
			$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}ardeek_messages;");
				$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}ardeek_payments;");
					$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}ardeek_permissions;");
						$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}ardeek_roles;");
							$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}ardeek_users;");


	$wpdb->query("CREATE TABLE {$wpdb->prefix}ardeek_permissions (
	`id` int(11) NOT NULL,
	`name` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8;");

	$wpdb->query("CREATE TABLE {$wpdb->prefix}ardeek_roles (
	`id` int(11) NOT NULL,
	`id_permission` int(11) NOT NULL,
	`name` varchar(255) NOT NULL,
	`editable` tinyint(4) NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`id_permission`) REFERENCES {$wpdb->prefix}ardeek_permissions(`id`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8;");

	$wpdb->query("CREATE TABLE {$wpdb->prefix}ardeek_users (
	`id` int(11) NOT NULL,
	`id_permission` int(11) NOT NULL,
	`id_role` int(11) NOT NULL,
	`name` varchar(255) NOT NULL,
	`surname` varchar(255) NOT NULL,
	`birthday` date NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`website` varchar(255) NOT NULL,
	`education` text NOT NULL,
	`skills` text NOT NULL,
	`bio` text NOT NULL,
	`token` varchar(255) NOT NULL,
	`verified` tinyint(4) NOT NULL,
	`enabled` tinyint(4) NOT NULL,
	`paid` tinyint(4) NOT NULL,
	`avatar` text NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`id_permission`) REFERENCES {$wpdb->prefix}ardeek_permissions(`id`),
	FOREIGN KEY (`id_role`) REFERENCES {$wpdb->prefix}ardeek_roles(`id`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8;");

	$wpdb->query("CREATE TABLE {$wpdb->prefix}ardeek_contents (
	`id` int(11) NOT NULL,
	`id_user` int(11) NOT NULL,
	`id_role` int(11) NOT NULL,
	`type` enum('image','video','document') NOT NULL,
	`name` varchar(255) NOT NULL,
	`path` text NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`id_user`) REFERENCES {$wpdb->prefix}ardeek_users(`id`),
	FOREIGN KEY (`id_role`) REFERENCES {$wpdb->prefix}ardeek_roles(`id`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8;");

	$wpdb->query("CREATE TABLE {$wpdb->prefix}ardeek_membership (
	`id` int(11) NOT NULL,
	`name` varchar(255) NOT NULL,
	`registered_office` text NOT NULL,
	`op_headquarter` text NOT NULL,
	`VAT` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`fee` float NOT NULL,
	`range_fee` int(2) NOT NULL,
	`website` varchar(255) NOT NULL,
	`clientId` text NOT NULL,
	`clientSecret` text NOT NULL,
	`url_plugin` text NOT NULL,
	`registration_date` date NOT NULL,
	`paid` int(4) NOT NULL,
	PRIMARY KEY (`id`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8;");

	$wpdb->query("CREATE TABLE {$wpdb->prefix}ardeek_messages (
	`id` int(11) NOT NULL,
	`id_user` int(11) NOT NULL,
	`id_roles` int(11) NOT NULL,
	`message` text NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`id_user`) REFERENCES {$wpdb->prefix}ardeek_users(`id`),
	FOREIGN KEY (`id_roles`) REFERENCES {$wpdb->prefix}ardeek_roles(`id`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8;");

	$wpdb->query("CREATE TABLE {$wpdb->prefix}ardeek_payments (
	`id` int(11) NOT NULL,
	`id_user` int(11) NOT NULL,
	`data` date NOT NULL,
	`information` text NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`id_user`) REFERENCES {$wpdb->prefix}ardeek_users(`id`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8;");


	$wpdb->query("INSERT INTO {$wpdb->prefix}ardeek_permissions (`id`, `name`)
	VALUES (1, 'editor'), (2, 'author'), (3, 'subscriber');");
		$wpdb->query("INSERT INTO {$wpdb->prefix}ardeek_roles (`id`, `id_permission`, `name`, `editable`)
		VALUES (1, 3, 'socio ordinario', 0), (2, 2, 'socio sostenitore', 0), (3, 3, 'socio onorario', 0), (4, 1, 'direttivo', 0);");

}

register_activation_hook( __FILE__, 'wpardeekmembership_activate' );

/* FUNZIONE CHE SI ATTIVA QUANDO SI DISINSTALLA IL PLUGIN */

function wpardeekmembership_deactivate()
{
	global $wpdb;

	$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}ardeek_contents;");
		$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}ardeek_membership;");
			$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}ardeek_messages;");
				$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}ardeek_payments;");
					$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}ardeek_permissions;");
						$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}ardeek_roles;");
							$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}ardeek_users;");

//jQuery goodbye script.
	echo '<script>alert("ciaone"); console.log("ciaone"); localStorage.clear();</script>';

}

register_deactivation_hook( __FILE__, 'wpardeekmembership_deactivate' );

/*
 * WORDPRESS WIDGET
*/

class wpb_widget extends WP_Widget
{
	function __construct()
	{
		parent::__construct(
		// Base ID of your widget
		'wpb_widget',

		// Widget name will appear in UI
		__('Ardeek 4 Associazioni Widget', 'wpb_widget_domain'),

		// Widget description
		array( 'description' => __( 'Widget Ardeek 4 Associazioni...', 'wpb_widget_domain' ), )
		);
	}

	/*
	 * Widget Frontend
	*/

	public function widget( $args, $instance )
	{
		$title 		= apply_filters( 'widget_title', $instance['title'] );
		$output 	= 'Ciaone da Ardeek Inc.';

		// before and after widget arguments are defined by themes
		echo $args['before_widget'];

		if ( ! empty( $title ) )
		{
			echo $args['before_title'] . $title . $args['after_title'];
			$output = 'Ciaone '.$title.'!!';
		}

		// This is where you run the code and display the output
		echo __( $output, 'wpb_widget_domain' );
		echo $args['after_widget'];
	}

	/*
	 * Widget Backend
	*/

	public function form( $instance )
	{
		if ( isset( $instance[ 'title' ] ) )
			$title = $instance[ 'title' ];
		else
			$title = __( 'ASSOCIAZIONE XYZ', 'wpb_widget_domain' );

		// Widget admin form
		?>
		<p>
		<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?></label>
		<input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>" />
		</p>
		<?php
	}

	// Updating widget replacing old instances with new
	public function update( $new_instance, $old_instance )
	{
		$instance = array();
		$instance['title'] = ( ! empty( $new_instance['title'] ) ) ? strip_tags( $new_instance['title'] ) : '';

		return $instance;
	}

}

function wpb_load_widget()
{
	register_widget( 'wpb_widget' );
}

add_action( 'widgets_init', 'wpb_load_widget' );


/*
 * WORDPRESS SHORTCODE
*/

function fill_shortcode_page()
{
	//1. userLogged from DB
	//2. nome cognome : ruolo
	//3. se deve effettuare il pagamento
	//4. latest news
	//5. personal profile

	//wp database connection
	global $wpdb;

	$myrows = $wpdb->get_results("SELECT *, {$wpdb->prefix}ardeek_roles.name AS role, {$wpdb->prefix}ardeek_users.name AS nome FROM {$wpdb->prefix}ardeek_users JOIN {$wpdb->prefix}ardeek_roles ON {$wpdb->prefix}ardeek_users.id_role = {$wpdb->prefix}ardeek_roles.id WHERE {$wpdb->prefix}ardeek_users.id = 0");

	//verifichiamo che siano presenti records
	foreach ($myrows as $row)
	{

			$id             = $row->id;
			$id_role        = $row->id_role;
			$id_permission  = $row->id_permission;
			$role 					= $row->role;
			$name           = $row->nome;
			$surname        = $row->surname;
			$birthday       = $row->birthday;
			$email          = $row->email;
			$password       = $row->password;
			$website        = $row->website;
			$education      = $row->education;
			$skills         = $row->skills;
			$bio            = $row->bio;
			$avatar         = $row->avatar;
			$token          = $row->token;
			$verified       = $row->verified;
			$enabled        = $row->enabled;
			$paid        		= $row->paid;

			$user = array('id'=> $id, 'id_role' => $id_role, 'id_permission' => $id_permission, 'role' => $role, 'name' => $name, 'surname' => $surname, 'birthday' => $birthday, 'email' => $email, 'password' => $password, 'website' => $website, 'education' => $education, 'skills' => $skills, 'bio' => $bio, 'avatar' => $avatar, 'token' => $token, 'verified' => $verified, 'enabled' => $enabled, 'paid' => $paid);
	}

	$post = '';

	//benvenuto

	$post .= 'Benvenuto <b>'.$user["name"].' '.$user["surname"].'</b>, il tuo ruolo è <b>'.$user["role"].'</b>.<br>';

	//reminder pagamento

	if($user["paid"] == 0)
		$post .= "RICORDA DI EFFETTUARE IL PAGAMENTO DELLA QUOTA ANNUALE. <br>";

	//latest news
	$myrows = $wpdb->get_results("SELECT messages.id, name, surname, message FROM `messages` JOIN `users` ON (messages.id_user = users.id) WHERE id_roles <= ".$user["id_role"]." LIMIT 5;");

	$item = '';
	$item_list = [];

	//verifichiamo che siano presenti records
	foreach ($myrows as $row)
	{

		$id             = $row['id'];
		$name    	    = $row['name'];
		$surname    	= $row['surname'];
		$message  		= $row['message'];

		$item = array('id'=> $id, 'name' => $name, 'surname' => $surname, 'message' => $message);
		array_push($item_list, $item);
	}

	$post .= '<h3>Latest News</h3>';
	$post .= '<table>';
	$post .= '<tr><td><b>Sender</b></td><td><b>Message</b></td>';

	foreach ($item_list as $item)
		$post .= '<tr><td>'.$item["name"].' '.$item["surname"].'</td><td><i>'.$item["message"].'</i></td>';

	$post .= '</table>';

	$url = plugins_url();

	//personal profile
	$post .= '<style>
				.img-avatar {
				    width-max: auto;
				    height: 200px;
				}
				</style>';
	$post .= '<h3>Personal Profile</h3>';

	$post .= '<img class="img-avatar" src="'.$url.'/'.basename(plugin_dir_path( __FILE__ )).'/'.$user["avatar"].'"><br>';

	$post .= '<b>Nome: </b> '.$user["name"].'<br>';
	$post .= '<b>Cognome: </b> '.$user["surname"].'<br>';
	$post .= '<b>Data di Nascita: </b> '.$user["birthday"].'<br>';
	$post .= '<b>Email: </b> '.$user["email"].'<br>';
	$post .= '<b>Sito Web: </b> <a href="'.$user["website"].'">'.$user["website"].'</a><br>';
	$post .= '<b>Titolo di Studio: </b> '.$user["education"].'<br>';
	$post .= '<b>Skills: </b> '.$user["skills"].'<br>';
	$post .= '<b>Bio: </b> '.$user["bio"].'<br>';


	return $post;
}

add_shortcode('wpardeek', 'fill_shortcode_page');

function js_and_css(){

	$plugin_url = plugin_dir_url(__FILE__);

	wp_enqueue_script('api', $plugin_url."/api/api.js" , false, '1.0', 'all');

	wp_enqueue_script('all_view', $plugin_url."/view/view.js" , false, '1.0', 'all');
	wp_enqueue_script('items_view', $plugin_url."/view/items_view.js" , false, '1.0', 'all');
	wp_enqueue_script('login_view', $plugin_url."/view/login_view.js" , false, '1.0', 'all');
	wp_enqueue_script('membership_view', $plugin_url."/view/membership_view.js" , false, '1.0', 'all');
	wp_enqueue_script('payment_view', $plugin_url."/view/payment_view.js" , false, '1.0', 'all');
	wp_enqueue_script('registration_view', $plugin_url."/view/registration_view.js", false, '1.0', 'all');
	wp_enqueue_script('messages_view', $plugin_url."/view/messages_view.js" , false, '1.0', 'all');

	wp_enqueue_script('routing_controller', $plugin_url."/controller/routing.js" , false, '1.0', 'all');
	wp_enqueue_script('registration_controller', $plugin_url."/controller/registration.js", false, '1.0', 'all');
	wp_enqueue_script('login_controller', $plugin_url."/controller/login.js" , false, '1.0', 'all');
	wp_enqueue_script('forgot_password_controller', $plugin_url."/controller/forgot_password.js", false, '1.0', 'all');
	wp_enqueue_script('membership_controller', $plugin_url."/controller/membership.js", false, '1.0', 'all');
	wp_enqueue_script('messages_view_controller', $plugin_url."/controller/messages.js" , false, '1.0', 'all');
	wp_enqueue_script('items_controller', $plugin_url."/controller/items.js", false, '1.0', 'all');
	wp_enqueue_script('payment_controller', $plugin_url."/controller/payment.js" , false, '1.0', 'all');

}

add_action('admin_init', 'js_and_css');
