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

$plugin_prefix = 'ardeek';

$plugin_path = $_SERVER['DOCUMENT_ROOT'] . '/wordpress';

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

/* FUNZIONE CHE SI ATTIVA QUANDO SI INSTALLA IL PLUGIN */

function wpassociazione_activate()
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
	$wpdb->query("CREATE TABLE {$wpdb->prefix}ardeek_contents (
			  `id` int(11) NOT NULL,
			  `id_user` int(11) NOT NULL,
			  `id_role` int(11) NOT NULL,
			  `type` enum('image','video','document') NOT NULL,
			  `name` varchar(255) NOT NULL,
			  `path` text NOT NULL
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
				  `paid` int(4) NOT NULL
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
			$wpdb->query("CREATE TABLE {$wpdb->prefix}ardeek_messages (
					  `id` int(11) NOT NULL,
					  `id_user` int(11) NOT NULL,
					  `id_roles` int(11) NOT NULL,
					  `message` text NOT NULL
					) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
				$wpdb->query("CREATE TABLE {$wpdb->prefix}ardeek_payments (
						  `id` int(11) NOT NULL,
						  `id_user` int(11) NOT NULL,
						  `data` date NOT NULL,
						  `information` text NOT NULL
						) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
					$wpdb->query("CREATE TABLE {$wpdb->prefix}ardeek_permissions (
							  `id` int(11) NOT NULL,
							  `name` varchar(255) NOT NULL
							) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
						$wpdb->query("CREATE TABLE {$wpdb->prefix}ardeek_roles (
								  `id` int(11) NOT NULL,
								  `id_permission` int(11) NOT NULL,
								  `name` varchar(255) NOT NULL,
								  `editable` tinyint(4) NOT NULL
								) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
							$wpdb->query("CREATE TABLE {$wpdb->prefix}ardeek_users (
									  `id` int(11) NOT NULL,
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
									  `id_permission` int(11) NOT NULL,
									  `verified` tinyint(4) NOT NULL,
									  `enabled` tinyint(4) NOT NULL,
									  `paid` tinyint(4) NOT NULL,
									  `id_role` int(11) NOT NULL,
									  `avatar` text NOT NULL
									) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
}

register_activation_hook( __FILE__, 'wpassociazione_activate' );

/* FUNZIONE CHE SI ATTIVA QUANDO SI DISINSTALLA IL PLUGIN */

function wpassociazione_deactivate()
{
	global $wpdb;
	
	$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}ardeek_contents;");
		$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}ardeek_membership;");
			$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}ardeek_messages;");
				$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}ardeek_payments;");
					$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}ardeek_permissions;");
						$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}ardeek_roles;");
							$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}ardeek_users;");

}

register_deactivation_hook( __FILE__, 'wpassociazione_deactivate' );

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

	//connessione al database
	$dbhost = "localhost";
	$dbname = "wp_ardeekmembership";
	$dbuser = "salvo";
	$dbpass = "salvo";

	$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

	if ($mysqli->connect_errno)
		echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;


	$sql = "SELECT *, roles.name AS role, users.name AS nome FROM users JOIN roles ON users.id_role = roles.id WHERE users.id = 1";

    //eseguo la query
	$query = $mysqli->query($sql);
	

	//verifichiamo che siano presenti records
	if($query->data_seek(0))
	{
		while($row = $query->fetch_assoc())
		{  

			$id             = $row['id'];
			$id_role        = $row['id_role'];
			$id_permission  = $row['id_permission'];
			$role 			= $row['role'];
			$name           = $row['nome'];
			$surname        = $row['surname'];
			$birthday       = $row['birthday'];
			$email          = $row['email'];
			$password       = $row['password'];
			$website        = $row['website'];
			$education      = $row['education'];
			$skills         = $row['skills'];
			$bio            = $row['bio'];
			$avatar         = $row['avatar'];
			$token          = $row['token'];
			$verified       = $row['verified'];
			$enabled        = $row['enabled'];
			$paid        	= $row['paid'];

			$user = array('id'=> $id, 'id_role' => $id_role, 'id_permission' => $id_permission, 'role' => $role, 'name' => $name, 'surname' => $surname, 'birthday' => $birthday, 'email' => $email, 'password' => $password, 'website' => $website, 'education' => $education, 'skills' => $skills, 'bio' => $bio, 'avatar' => $avatar, 'token' => $token, 'verified' => $verified, 'enabled' => $enabled, 'paid' => $paid);

		}

	}

	$post = '';

	//benvenuto

	$post .= 'Benvenuto <b>'.$user["name"].' '.$user["surname"].'</b>, il tuo ruolo è <b>'.$user["role"].'</b>.<br>';

	/*
	//wpdb object test
	$wpdb->query( "SELECT * FROM {$wpdb->prefix}posts" );
	foreach ( $wpdb->last_result as $r)
		print_r("<h3>".$r->post_title."</h3>".$r->post_content."<br>");
	*/

	//reminder pagamento

	if($user["paid"] == 0)
		$post .= "RICORDA DI EFFETTUARE IL PAGAMENTO DELLA QUOTA ANNUALE. <br>";

	//latest news
	$sql = "SELECT messages.id, name, surname, message FROM `messages` JOIN `users` ON (messages.id_user = users.id) WHERE id_roles <= ".$user["id_role"]." LIMIT 5;";

    //eseguo la query
	$query = $mysqli->query($sql);

	$item = '';
	$item_list = [];

	//verifichiamo che siano presenti records
	if($query->data_seek(0))
	{
		while($row = $query->fetch_assoc())
		{  

			$id             = $row['id'];
			$name    	    = $row['name'];
			$surname    	= $row['surname'];
			$message  		= $row['message'];

			$item = array('id'=> $id, 'name' => $name, 'surname' => $surname, 'message' => $message);
			array_push($item_list, $item);
		}
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
	$post .= '<img class="img-avatar" src="'.$url.'/wpassociazione/'.$user["avatar"].'"><br>';
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
