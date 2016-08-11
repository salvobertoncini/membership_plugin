<?php

require_once '../vendor/autoload.php';

$plugin_path = $_SERVER['DOCUMENT_ROOT'] . '/wordpress';

global $wpdb;

if(!isset($wpdb))
{
	require_once( $plugin_path . '/wp-config.php' );
	require_once( $plugin_path . '/wp-includes/wp-db.php' );
}

define('SITE_URL', 'http://127.0.0.1:81/wordpress/wp-admin/options-general.php?page=wpassociazione');

use PayPal\Api\Amount;
use PayPal\Api\Details;
use PayPal\Api\ExecutePayment;
use PayPal\Api\Payment;
use PayPal\Api\PaymentExecution;
use PayPal\Api\Transaction;
use PayPal\Api\Payer;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Auth;
use PayPal\Exception\PayPalInvalidCredentialException;
use PayPal\Rest\ApiContext;
use PayPal\Auth\OAuthTokenCredential;

//chiave pubblica e chiave privata
$clientId 		= 'AeEgHdt7Zf1MJk14or6F2IaeIJLaNSLXUoud5BPpQvk9JR3w9fNWPdRYHMky11s0Ay67PMvlnMKBscnB';
$clientSecret 	= 'EOEWWww2_SxusFnkeksG-_NFNlWdSLj__Nk7tr6o-UERVxhznk4VcnKjabyFLk7L2jImVT2L0iDVIPWp';

$paypal = new ApiContext(
	new OAuthTokenCredential(
		$clientId,
		$clientSecret
		)
	);

$apiContext = getApiContext($clientId, $clientSecret);

function getApiContext($clientId, $clientSecret)
{
    // #### SDK configuration
    // Register the sdk_config.ini file in current directory
    // as the configuration source.
    /*
    if(!defined("PP_CONFIG_PATH")) {
        define("PP_CONFIG_PATH", __DIR__);
    }
    */
    // ### Api context
    // Use an ApiContext object to authenticate
    // API calls. The clientId and clientSecret for the
    // OAuthTokenCredential class can be retrieved from
    // developer.paypal.com
    $apiContext = new ApiContext(
    	new OAuthTokenCredential(
    		$clientId,
    		$clientSecret
    		)
    	);
    // Comment this line out and uncomment the PP_CONFIG_PATH
    // 'define' block if you want to use static file
    // based configuration
    $apiContext->setConfig(
    	array(
    		'mode' => 'sandbox',
            //'log.LogEnabled' => true,
            //'log.FileName' => '../PayPal.log',
            //'log.LogLevel' => 'DEBUG', // PLEASE USE `INFO` LEVEL FOR LOGGING IN LIVE ENVIRONMENTS
            //'cache.enabled' => true,
    		'http.CURLOPT_CONNECTTIMEOUT' => 30
            // 'http.headers.PayPal-Partner-Attribution-Id' => '123123123'
            //'log.AdapterFactory' => '\PayPal\Log\DefaultLogFactory' // Factory class implementing \PayPal\Log\PayPalLogFactory
    		)
    	);
    // Partner Attribution Id
    // Use this header if you are a PayPal partner. Specify a unique BN Code to receive revenue attribution.
    // To learn more or to request a BN Code, contact your Partner Manager or visit the PayPal Partner Portal
    // $apiContext->addRequestHeader('PayPal-Partner-Attribution-Id', '123123123');
    return $apiContext;
}

function testing()
{
	global $wpdb;
	
	//wpdb object test
	$wpdb->query( "SELECT * FROM {$wpdb->prefix}posts" );

	$risposta = array('response' => 'true', 'data' => $wpdb);

	return $risposta;
}

function console_log( $data )
{
	echo '<script>';
	echo 'console.log('. json_encode( $data ) .')';
	echo '</script>';
}

function alert( $data)
{
	echo '<script>';
	echo 'alert('. json_encode( $data ) .')';
	echo '</script>';
}

function db_connection()
{
	//connessione al database
	$dbhost = "localhost";
	$dbname = "wp_ardeekmembership";
	$dbuser = "salvo";
	$dbpass = "salvo";

	$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

	if ($mysqli->connect_errno)
		echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;

	return $mysqli;
}

function returnsomething($return)
{
//Encode the stdClass object containing information and return data as a json string
	$json = json_encode($return);

//Return the json string to the JavaScript
	echo $json;
}

function sanitize($str, $quotes = ENT_NOQUOTES)
{
	$str = htmlspecialchars($str, $quotes);
	return $str;
}

function default_return()
{
	$risposta = array('response' => 'error');
	return $risposta;
}

function today()
{
	global $wpdb;

	$risposta = array('response' => 'false');

	$myrows = $wpdb->get_results("SELECT paid, range_fee FROM {$wpdb->prefix}ardeek_membership");
	
	//verifichiamo che siano presenti records
	foreach ($myrows as $row)
	{  
		$range_fee	= $row->range_fee;
		$paid		= $row->paid;
		
		$date = array('range_fee'=> $range_fee, 'paid' => $paid);

		$risposta = array('response' => 'true', 'date' => $date);

	}

	return $risposta;

}

function update_today($year)
{
	global $wpdb;

	$a = $year + 1;

	$wpdb->query(
	$wpdb->prepare( 
		"UPDATE {$wpdb->prefix}ardeek_membership SET paid = %d",$a
		)
	);

	$risposta = array('response' => 'true');

	return $risposta;
}

function email_sender($token, $email, $password)
{
	global $wpdb;

	$risposta = array('response' => 'false');

	$myrows = $wpdb->get_results("SELECT * FROM {$wpdb->prefix}ardeek_membership");
	
	//verifichiamo che siano presenti records
	foreach ($myrows as $row)
	{ 
		$name_membership	= $row->name;
		$admin_email		= $row->email;
		$url_plugin			= $row->url_plugin;
	}

	// email per la conferma
    // intestazioni
    $headers = "From: $admin_email\nreply-To: noreply\r\n";
    $subject = "Conferma la tua iscrizione.";
    
    //corpo del messaggio
    $messaggio = "Ti ringraziamo per la tua iscrizione a ".$name_membership.". \n";
    $messaggio .= "La tua user è: ".$email."\n";
    $messaggio .= "La tua password è: ".$password."\n";
    $messaggio .= "Per confemare vai alla pagina ".$url_plugin."&approvetoken=".$token;
    $messaggio .= " \ne inserisci i dati per l'autenticazione.\n"; 
    
    // invio dell'email
    @mail($email, stripslashes($subject),stripslashes($messaggio),$headers);
    
    $risposta = array('response' => 'true');

    return $risposta;
}

function forgot_password($token, $email, $password)
{
	global $wpdb; 

	$risposta = array('response' => 'false');

	//update password cliente
	$wpdb->query(
	$wpdb->prepare( 
		"UPDATE {$wpdb->prefix}ardeek_users SET `password`= %s ,`token`= %s WHERE email = $s", 
			$password, $token, $email
		)
	);



	//prelevo le informazioni dell'associazione
	$myrows = $wpdb->get_results("SELECT * FROM {$wpdb->prefix}ardeek_membership");

	//verifichiamo che siano presenti records
	foreach ($myrows as $row)
	{
		$name_membership	= $row->name;
		$admin_email		= $row->email;
		$url_plugin			= $row->url_plugin;
	}

	// email per la conferma
    // intestazioni
    $headers = "From: $admin_email\nreply-To: noreply\r\n";
    $subject = "Password smarrita.";
    
    //corpo del messaggio
    $messaggio = "Ti ringraziamo per la tua iscrizione a ".$name_membership.". \n";
    $messaggio .= "La tua user è: ".$email."\n";
    $messaggio .= "La tua nuova password è: ".$password."\n";
    $messaggio .= "Per completare la procedura effettua il login con le nuove credenziali."; 
    
    // invio dell'email
    @mail($email, stripslashes($subject),stripslashes($messaggio),$headers);
    
    $risposta = array('response' => 'true');

    return $risposta;
}

function login($email, $password)
{
	global $wpdb;

	$risposta = array('response' => 'false');

	$myrows = $wpdb->get_results(
		$wpdb->prepare("
			SELECT * FROM {$wpdb->prefix}ardeek_users WHERE email = %s AND password = %s ORDER BY id DESC",
				$email, $password
			)
		);

	foreach ($myrows as $row) 
	{

		$id             = $row->id;
		$id_role        = $row->id_role;
		$id_permission  = $row->id_permission;
		$name           = $row->name;
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
		$paid        	= $row->paid;

		$user = array('id'=> $id, 'id_role' => $id_role, 'id_permission' => $id_permission, 'name' => $name, 'surname' => $surname, 'birthday' => $birthday, 'email' => $email, 'password' => $password, 'website' => $website, 'education' => $education, 'skills' => $skills, 'bio' => $bio, 'avatar' => $avatar, 'token' => $token, 'verified' => $verified, 'enabled' => $enabled, 'paid' => $paid);

		$risposta = array('response' => 'true', 'user' => $user);
	}

	return $risposta;
}

function registration($name, $surname, $birthday, $email, $password, $website, $education, $bio, $skills, $avatar, $id_role, $id_permission, $enabled, $paid, $verified, $token)
{

	global $wpdb;

	$risposta = array('response' => 'false');

	$myrows = $wpdb->get_results("SELECT * FROM {$wpdb->prefix}ardeek_users");

	//verifichiamo che siano presenti records
	if($myrows)
		$nothing = 0;
	else
	{
		//se è il primo registrato, quindi l'admin
		$ruolo = 4;
		$permessi = 1;
		$verified = 1;
	}

	$wpdb->query( 
		$wpdb->prepare( 
			"INSERT INTO {$wpdb->prefix}ardeek_users (name, surname, birthday, email, password, website, education, skills, bio, token, id_permission, verified, enabled, paid, id_role, avatar) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %d, %d, %d, %d, %d, %s)", $name, $surname, $birthday, $email, $password, $website, $education, $skills, $bio, $token, $permessi, $verified, $enabled, $paid, $ruolo, $avatar));

	$risposta = array('response' => 'true');

	return $risposta;
}

function check_exist_email($email)
{
	global $wpdb;

	$risposta = array('response' => 'false');

	$myrows = $wpdb->get_results(
		$wpdb->prepare("SELECT * FROM {$wpdb->prefix}ardeek_users WHERE email = %s ORDER BY id DESC", 
			$email
			)
		);

	//verifichiamo che siano presenti records
	if($myrows)
		$risposta = array('response' => 'true');

	return $risposta;
}

function all_membership()
{
	global $wpdb;

	$user_list = [];

	$risposta = array('response' => 'false');

	$myrows = $wpdb->get_results("SELECT * FROM {$wpdb->prefix}ardeek_users ORDER BY id DESC");

	//verifichiamo che siano presenti records
	foreach ($myrows as $row)
	{   

		$id             = $row->id;
		$id_role        = $row->id_role;
		$id_permission  = $row->id_permission;
		$name           = $row->name;
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
		$paid        	= $row->paid;

		$user = array('id'=> $id, 'id_role' => $id_role, 'id_permission' => $id_permission, 'name' => $name, 'surname' => $surname, 'birthday' => $birthday, 'email' => $email, 'password' => $password, 'website' => $website, 'education' => $education, 'skills' => $skills, 'bio' => $bio, 'avatar' => $avatar, 'token' => $token, 'verified' => $verified, 'enabled' => $enabled, 'paid' => $paid);

		array_push($user_list, $user);

		$risposta = array('response' => 'true', 'userList' => $user_list);
	}

	return $risposta;
}

function edit_enable_user($id, $test)
{
	global $wpdb;

	$user_list = [];

	$risposta = array('response' => 'false');

	$wpdb->query(
		$wpdb->prepare("UPDATE {$wpdb->prefix}ardeek_users SET enabled = %d WHERE id = %d;", $test, $id));

	$risposta = array('response' => 'true');

	return $risposta;
}

function member_by_id($id)
{
	global $wpdb;

	$user_list = [];

	$risposta = array('response' => 'false');

	$myrows = $wpdb->get_results(
		$wpdb->prepare("SELECT * FROM {$wpdb->prefix}ardeek_users WHERE id = %d",$id));

	//verifichiamo che siano presenti records
	foreach ($myrows as $row)
	{
		$id             = $row->id;
		$id_role        = $row->id_role;
		$id_permission  = $row->id_permission;
		$name           = $row->name;
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
		$paid        	= $row->paid;

		$user = array('id'=> $id, 'id_role' => $id_role, 'id_permission' => $id_permission, 'name' => $name, 'surname' => $surname, 'birthday' => $birthday, 'email' => $email, 'password' => $password, 'website' => $website, 'education' => $education, 'skills' => $skills, 'bio' => $bio, 'avatar' => $avatar, 'token' => $token, 'verified' => $verified, 'enabled' => $enabled, 'paid' => $paid);

		$risposta = array('response' => 'true', 'user' => $user);
	}

	return $risposta;
}

function remove_user_by_id($id)
{
	global $wpdb;

	$user_list = [];

	$risposta = array('response' => 'false');

	$wpdb->query(
		$wpdb->prepare("DELETE FROM {$wpdb->prefix}ardeek_users WHERE id = %d",$id));

	$risposta = array('response' => 'true');

	return $risposta;
}

function edit_user($id, $id_role, $nome, $cognome, $birthday, $email, $website, $education, $skills, $bio)
{
	global $wpdb;

	$user_list = [];

	$risposta = array('response' => 'false');

	$wpdb->query(
		$wpdb->prepare("UPDATE {$wpdb->prefix}ardeek_users SET id_role = %d, name = %s surname = %s, birthday = %s, email =%s, website = %s, education = %s, skills = %s, bio = %s WHERE id = %d", $id_role, $nome, $cognome, $birthday, $email, $website, $education, $skills, $bio, $id));

	$risposta = array('response' => 'true');

	return $risposta;
}

function all_messages()
{
	global $wpdb;

	$msg_list = [];
	$msg = '';

	$risposta = array('response' => 'false');

	$myrows = $wpdb->get_results("SELECT {$wpdb->prefix}ardeek_messages.id, id_roles, name, surname, message FROM {$wpdb->prefix}ardeek_messages JOIN {$wpdb->prefix}ardeek_users ON ({$wpdb->prefix}ardeek_messages.id_user = {$wpdb->prefix}ardeek_users.id)");

	//verifichiamo che siano presenti records
	foreach ($myrows as $row)
	{ 

			$id             = $row->id;
			$name    	    = $row->name;
			$surname    	= $row->surname;
			$id_role        = $row->id_roles;
			$message  		= $row->message;

			$msg = array('id'=> $id, 'id_role' => $id_role, 'name' => $name, 'surname' => $surname, 'message' => $message);
			array_push($msg_list, $msg);
			
			$risposta = array('response' => 'true', 'messages' => $msg_list);
	}

	return $risposta;
}

function send_message($id, $id_role, $message)
{
	global $wpdb;

	$risposta = array('response' => 'false');

	$wpdb->query(
		$wpdb->prepare("INSERT INTO {$wpdb->prefix}ardeek_messages(`id`, `id_user`, `id_roles`, `message`) VALUES (null, %d, %d, %s)", $id, $id_role, $message));

	$risposta = array('response' => 'true');

	return $risposta;
}

function edit_message($id, $id_roles, $message)
{
	global $wpdb;

	$risposta = array('response' => 'false');

	$wpdb->query(
		$wpdb->prepare("UPDATE {$wpdb->prefix}ardeek_messages SET id_roles = %d, message = %s WHERE id = %d", $id_roles, $message, $id));

	$risposta = array('response' => 'true');

	return $risposta;
}

function delete_message($id)
{
	global $wpdb;

	$wpdb->query(
		$wpdb->prepare("DELETE FROM {$wpdb->prefix}ardeek_messages WHERE id = %d",$id));

	$risposta = array('response' => 'true');

	return $risposta;
}

function find_message_by_id($id)
{
	global $wpdb;

	$risposta = array('response' => 'false');

	$msg = '';

	$myrows = $wpdb->get_results(
		$wpdb->prepare("SELECT {$wpdb->prefix}ardeek_messages.id, id_roles, name, surname, message FROM {$wpdb->prefix}ardeek_messages JOIN {$wpdb->prefix}ardeek_users ON ({$wpdb->prefix}ardeek_messages.id_user = {$wpdb->prefix}ardeek_users.id) WHERE {$wpdb->prefix}ardeek_messages.id = %d",$id));

	//verifichiamo che siano presenti records
	foreach ($myrows as $row)
	{
		$id             = $row->id;
		$name    	    = $row->name;
		$surname    	= $row->surname;
		$id_role        = $row->id_roles;
		$message  		= $row->message;

		$msg = array('id'=> $id, 'id_role' => $id_role, 'name' => $name, 'surname' => $surname, 'message' => $message);
		$risposta = array('response' => 'true', 'messages' => $msg);	
	}

	return $risposta;
}

function all_items()
{
	global $wpdb;

	$item_list = [];
	$item = '';

	$risposta = array('response' => 'false');

	$myrows = $wpdb->get_results($wpdb->prepare("SELECT {$wpdb->prefix}ardeek_contents.id, {$wpdb->prefix}ardeek_contents.id_role, {$wpdb->prefix}ardeek_contents.name as onome, {$wpdb->prefix}ardeek_users.name as name, surname, type, path FROM {$wpdb->prefix}ardeek_contents JOIN {$wpdb->prefix}ardeek_users ON ({$wpdb->prefix}ardeek_contents.id_user = {$wpdb->prefix}ardeek_users.id)"));

	//verifichiamo che siano presenti records
	foreach ($myrows as $row)
	{  
		$id             = $row->id;
		$name    	    = $row->name;
		$surname    	= $row->surname;
		$id_role        = $row->id_role;
		$oname			= $row->onome;
		$type  			= $row->type;
		$path	  		= $row->path;

		$item = array('id'=> $id, 'id_role' => $id_role, 'name' => $name, 'surname' => $surname, 'oname' => $oname, 'type' => $type, 'path' => $path);
		array_push($item_list, $item);

		$risposta = array('response' => 'true', 'items' => $item_list);
	}

	return $risposta;
}

function items_by_role($id_role)
{
	global $wpdb;

	$item_list = [];
	$item = '';

	$risposta = array('response' => 'false');

	$myrows = $wpdb->get_results($wpdb->prepare("SELECT {$wpdb->prefix}ardeek_contents.id, {$wpdb->prefix}ardeek_contents.id_role, {$wpdb->prefix}ardeek_contents.name as onome, {$wpdb->prefix}ardeek_users.name as name, surname, type, path FROM {$wpdb->prefix}ardeek_contents JOIN {$wpdb->prefix}ardeek_users ON ({$wpdb->prefix}ardeek_contents.id_user = {$wpdb->prefix}ardeek_users.id) WHERE {$wpdb->prefix}ardeek_contents.id_role <= %d",$id_role));

	//verifichiamo che siano presenti records
	foreach ($myrows as $row)
	{
		$id             = $row->id;
		$name    	    = $row->name;
		$surname    	= $row->surname;
		$id_role        = $row->id_role;
		$oname			= $row->onome;
		$type  			= $row->type;
		$path	  		= $row->path;

		$item = array('id'=> $id, 'id_role' => $id_role, 'name' => $name, 'surname' => $surname, 'oname' => $oname, 'type' => $type, 'path' => $path);
		array_push($item_list, $item);
	
		$risposta = array('response' => 'true', 'items' => $item_list);
	}

	return $risposta;
}

function remove_item($id)
{
	global $wpdb;

	$item_list = [];
	$item = '';

	$risposta = array('response' => 'false');

	$myrows = $wpdb->get_results($wpdb->prepare(
		"SELECT name, path FROM {$wpdb->prefix}ardeek_contents WHERE id = %d",$id));

	//verifichiamo che siano presenti records
	foreach ($myrows as $row)
	{   
		$name 			= $row->name;
		$path    	    = $row->path;
	}

	$wpdb->query(
		$wpdb->prepare("DELETE FROM {$wpdb->prefix}ardeek_contents WHERE id = %d",$id));

	unlink("../contents/".$name);
	
	$risposta = array('response' => 'true');

	return $risposta;
}

function all_payments()
{
	global $wpdb;

	$item_list = [];
	$item = '';

	$risposta = array('response' => 'false');

	$myrows = $wpdb->get_results($wpdb->prepare("SELECT {$wpdb->prefix}ardeek_payments.id, name, surname, data, information FROM {$wpdb->prefix}ardeek_payment JOIN `users` ON ({$wpdb->prefix}ardeek_payments.id_user = {$wpdb->prefix}ardeek_users.id)"));

	//verifichiamo che siano presenti records
	foreach ($myrows as $row)
	{  

		$id             = $row->id;
		$name    	    = $row->name;
		$surname    	= $row->surname;
		$data  			= $row->data;
		$information	= $row->information;

		$item = array('id'=> $id, 'name' => $name, 'surname' => $surname, 'data' => $data, 'information' => $information);
		array_push($item_list, $item);

		$risposta = array('response' => 'true', 'payments' => $item_list);
	}

	return $risposta;
}

function remove_payment($id)
{
	global $wpdb;

	$wpdb->query( 
	$wpdb->prepare("DELETE FROM {$wpdb->prefix}ardeek_payments WHERE id = %d",$id));

	$risposta = array('response' => 'true');

	return $risposta;
}

function restart_all_payment()
{
	global $wpdb;

	$wpdb->query( 
	$wpdb->prepare("UPDATE {$wpdb->prefix}ardeek_users SET paid = 0;"));
	
	$risposta = array('response' => 'true');

	return $risposta;
}

function init_message_dashboard($id_role)
{
	global $wpdb;

	$risposta = array('response' => 'false');

	$item_list = [];
	$item = '';

	$myrows = $wpdb->get_results($wpdb->prepare("SELECT {$wpdb->prefix}ardeek_messages.id, name, surname, message FROM {$wpdb->prefix}ardeek_messages JOIN {$wpdb->prefix}ardeek_users ON ({$wpdb->prefix}ardeek_messages.id_user = {$wpdb->prefix}ardeek_users.id) WHERE id_roles <= %d LIMIT 5;", $id_role));

	//verifichiamo che siano presenti records
	foreach ($myrows as $row)
	{ 
		$id             = $row->id;
		$name    	    = $row->name;
		$surname    	= $row->surname;
		$message  		= $row->message;

		$item = array('id'=> $id, 'name' => $name, 'surname' => $surname, 'message' => $message);
		array_push($item_list, $item);
		
		$risposta = array('response' => 'true', 'messages' => $item_list);
	}

	return $risposta;
}

function init_status()
{
	global $wpdb;

	$risposta = array('response' => 'false');

	$item_list = [];
	$item = '';

	$myrows = $wpdb->get_results($wpdb->prepare("SELECT  (
	SELECT COUNT(*)
	FROM   {$wpdb->prefix}ardeek_users
	) AS {$wpdb->prefix}ardeek_members,
	(
	SELECT COUNT(*)
	FROM   {$wpdb->prefix}ardeek_payments
	) AS {$wpdb->prefix}ardeek_payments
	FROM    dual"));

	$mysqli = db_connection();

    //eseguo la query
	$query = $mysqli->query($sql);
	

	//verifichiamo che siano presenti records
	foreach ($myrows as $row)
	{ 
		$members        = $row->members;
		$payments    	= $row->payments;

		$item = array('members'=> $members, 'payments' => $payments);
		array_push($item_list, $item);
		
		$risposta = array('response' => 'true', 'status' => $item_list);
	}

	return $risposta;
}

function change_avatar($id, $avatar)
{
	global $wpdb;

	$wpdb->query( 
	$wpdb->prepare( "UPDATE {$wpdb->prefix}ardeek_users SET avatar = %s WHERE id = %d",$avatar, $id));

	$risposta = array('response' => 'true');

	return $risposta;
}

function upload_file($id, $id_role, $fileName, $fileType, $path)
{
	global $wpdb;

	$type = checkTypeUploadedFile($fileType);

	$wpdb->query( 
	$wpdb->prepare("INSERT INTO {$wpdb->prefix}ardeek_contents(`id`, `id_user`, `id_role`, `type`, `name`, `path`) VALUES (null, %d, %d, %s, %s, %s)", $id, $id_role, $type, $fileName, $path));

	$risposta = array('response' => 'true');

	return $risposta;	
}

function checkTypeUploadedFile($fileType)
{	
	$type = '';

	if (strpos($fileType, 'image') !== false)
		$type = 'image';
	else
		if(strpos($fileType, 'video') !== false )
			$type = 'video';
		else
			$type = 'document';

	echo "tipo: ".$type." ";
}


function user_payment($id, $amount, $paymentId, $PayerID, $token)
{
	$timestamp = date('Y-m-d G:i:s');
	$string = "data: ".$timestamp.", amount: ".$amount.", token: ".$token.", paymentId: ".$paymentId.", PayerID: ".$PayerID;

	global $wpdb;

	$wpdb->query( 
	$wpdb->prepare( "INSERT INTO {$wpdb->prefix}ardeek_payments(`id`, `id_user`, `data`, `information`) VALUES (null, %d, %s, $s)", $id, $timestamp, $string));

	$risposta = array('response' => 'true');

	return $risposta;
}

function refresh_user_paid($id)
{
	global $wpdb;

	$wpdb->query( 
	$wpdb->prepare( "UPDATE {$wpdb->prefix}ardeek_users SET paid = 1 WHERE id = %d", $id));
	
	$risposta = array('response' => 'true');

	return $risposta;
}

function all_membership_not_paid()
{
	$risposta = array('response' => 'false');

	$user_list = [];

	global $wpdb;

	$risposta = array('response' => 'false');

	$myrows = $wpdb->get_results($wpdb->prepare("SELECT * FROM {$wpdb->prefix}ardeek_users WHERE paid = 0 ORDER BY id DESC"));

	//verifichiamo che siano presenti records
	foreach ($myrows as $row)
	{   
		$id             = $row->id;
		$id_role        = $row->id_role;
		$id_permission  = $row->id_permission;
		$name           = $row->name;
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
		$paid        	= $row->paid;

		$user = array('id'=> $id, 'id_role' => $id_role, 'id_permission' => $id_permission, 'name' => $name, 'surname' => $surname, 'birthday' => $birthday, 'email' => $email, 'password' => $password, 'website' => $website, 'education' => $education, 'skills' => $skills, 'bio' => $bio, 'avatar' => $avatar, 'token' => $token, 'verified' => $verified, 'enabled' => $enabled, 'paid' => $paid);

		array_push($user_list, $user);
	

		$risposta = array('response' => 'true', 'userList' => $user_list);
	}

	return $risposta;	
}

function users_payments_made($id)
{
	$risposta = array('response' => 'false');

	$item_list = [];
	$item = '';

	global $wpdb;

	$myrows = $wpdb->get_results($wpdb->prepare("SELECT {$wpdb->prefix}ardeek_payments.id, name, surname, data, information FROM {$wpdb->prefix}ardeek_payments JOIN {$wpdb->prefix}ardeek_users ON ({$wpdb->prefix}ardeek_payments.id_user = {$wpdb->prefix}ardeek_users.id) WHERE {$wpdb->prefix}ardeek_payments.id_user = %d",$id));

	$mysqli = db_connection();

    //eseguo la query
	$query = $mysqli->query($sql);
	
	//verifichiamo che siano presenti records
	foreach ($myrows as $row)
	{   
		$id             = $row->id;
		$name    	    = $row->name;
		$surname    	= $row->surname;
		$data  			= $row->data;
		$information	= $row->information;

		$item = array('id'=> $id, 'name' => $name, 'surname' => $surname, 'data' => $data, 'information' => $information);
		array_push($item_list, $item);
		

		$risposta = array('response' => 'true', 'payments' => $item_list);
	}

	return $risposta;
}

function init_paypal_payment($success, $paymentId, $token, $payerId)
{
	global $apiContext;
	
	$user = '';

	$risposta = array('response' => 'false');

	$payment = Payment::get($paymentId, $apiContext);

	$execution = new PaymentExecution();
	$execution->setPayerId($payerId);

	try
	{
		$result = $payment->execute($execution, $apiContext);
	}
	catch(Exception $e)
	{
		$data = json_decode($e->getData());
		echo($data->message);
		die();
	}

	$risposta = array('response' => 'true', 'result' => $result);

	return $risposta;
}

function try_paypal_payment($id)
{
	global $apiContext;

	$user = '';

	$risposta = array('response' => 'false');

	$product = "Pagamento quota associativa";
	$price = "10";
	$shipping = 2.00;

	$total = $price + $shipping;

	$payer = new Payer();
	$payer->setPaymentMethod('paypal');

	$item = new Item();
	$item->setName($product)
	->setCurrency('EUR')
	->setQuantity(1)
	->setPrice($price);

	$itemList = new ItemList();
	$itemList->setItems([$item]);

	$details = new Details();
	$details->setShipping($shipping)
	->setSubtotal($price);

	$amount = new Amount();
	$amount->setCurrency('EUR')
	->setTotal($total)
	->setDetails($details);

	$transaction = new Transaction();
	$transaction->setAmount($amount)
	->setItemList($itemList)
	->setDescription('Quota annuale associativa')
	->setInvoiceNumber(uniqid());

	$redirectUrls = new RedirectUrls();
	$redirectUrls->setReturnUrl(SITE_URL . '&amount='.$total.'&success=true')
	->setCancelUrl(SITE_URL . '&success=false');

	$payment = new Payment();
	$payment->setIntent('sale')
	->setPayer($payer)
	->setRedirectUrls($redirectUrls)
	->setTransactions([$transaction]);

	try
	{
		//print_r($paypal);
		$payment->create($apiContext);

	}
	catch(Exception $e)
	{
		die($e);
	}

	$approvalUrl = $payment->getApprovalLink();

	header('Access-Control-Allow-Origin: *, Location: {$approvalUrl}');	

	$risposta = array('response' => 'true', 'test' => $approvalUrl);

	return $risposta;

}

function if_membership_exist()
{
	global $wpdb;

	$item_list = [];
	$item = '';

	$risposta = array('response' => 'false');

	$myrows = $wpdb->get_results("SELECT * FROM {$wpdb->prefix}ardeek_membership");
	
	//verifichiamo che siano presenti records
	foreach ($myrows as $row)
	{  
		$id             	= $row->id;
		$name				= $row->name;
		$registered_office	= $row->registered_office;
		$op_headquarter		= $row->op_headquarter;
		$VAT				= $row->VAT;
		$email				= $row->email;
		$fee				= $row->fee;
		$range_fee			= $row->range_fee;
		$website			= $row->website;
		$clientId			= $row->clientId;
		$clientSecret		= $row->clientSecret;
		$registration_date	= $row->registration_date;
		$url_plugin			= $row->url_plugin;

		$item = array('id'=> $id, 'name' => $name, 'registered_office' => $registered_office, 'op_headquarter' => $op_headquarter, 'VAT' => $VAT, 'email' => $email, 'fee' => $fee, 'range_fee' => $range_fee,'website' => $website, 'clientId' => $clientId, 'clientSecret' => $clientSecret, 'registration_date' => $registration_date, 'url_plugin' => $url_plugin);

		array_push($item_list, $item);
	

		$risposta = array('response' => 'true', 'membership' => $item_list);
	}

	return $risposta;
}

function registration_membership($name, $registered_office, $op_headquarter, $VAT, $email, $fee, $range_fee, $website, $clientId, $clientSecret, $url_plugin)
{
	$timestamp = date('Y-m-d G:i:s');

	global $wpdb;

	$wpdb->query( 
	$wpdb->prepare( 
		"INSERT INTO {$wpdb->prefix}ardeek_membership(`name`, `registered_office`, `op_headquarter`, `VAT`, `email`, `fee`, `range_fee`, `website`, `clientId`, `clientSecret`, `url_plugin`, `registration_date`) VALUES (%s,%s,%s,%s,%s,%d,%d,%s,%s,%s,%s,%s)", $name, $registered_office, $op_headquarter, $VAT, $email, $fee, $range_fee, $website, $clientId, $clientSecret, $url_plugin, $timestamp));

	$risposta = array('response' => 'true', 'data' => $wpdb);

	return $risposta;
}

function update_membership($name, $registered_office, $op_headquarter, $VAT, $email, $fee, $range_fee, $website, $clientId, $clientSecret, $url_plugin)
{
	global $wpdb;

	$wpdb->query( 
	$wpdb->prepare( 
		"UPDATE {$wpdb->prefix}ardeek_membership SET `name` = %s, `registered_office` = %s, `op_headquarter` = %s, `VAT` = %s, `email` = %s, `fee` = %d, `range_fee` = %d, `website` = %s, `clientId` = %d, `clientSecret` = %s, `url_plugin` = %s", $name, $registered_office, $op_headquarter, $VAT, $email, $fee, $range_fee, $website, $clientId, $clientSecret, $url_plugin));

	$risposta = array('response' => 'true');

	return $risposta;
}

function delete_membership_forever()
{
	global $wpdb;

	$wpdb->query( 
	$wpdb->prepare( 
		"DELETE FROM {$wpdb->prefix}ardeek_membership"));

	$risposta = array('response' => 'true');

	return $risposta;
}

function all_roles()
{
	global $wpdb;

	$item_list = [];
	$item = '';

	$risposta = array('response' => 'false');

	$myrows = $wpdb->get_results($wpdb->prepare("SELECT * FROM {$wpdb->prefix}ardeek_roles"));

	//verifichiamo che siano presenti records
	foreach ($myrows as $row)
	{
		$id        		= $row->id;
		$id_permission	= $row->id_permission;
		$name			= $row->name;
		$editable		= $row->editable;

		$item = array('id'=> $id, 'id_permission' => $id_permission, 'name' => $name, 'editable' => $editable);

		array_push($item_list, $item);
	
		$risposta = array('response' => 'true', 'roles' => $item_list);
	}

	return $risposta;
}

function add_roles($name, $permission)
{
	global $wpdb;

	$item_list = [];
	$item = '';

	$risposta = array('response' => 'false');

	$myrows = $wpdb->get_results($wpdb->prepare("SELECT * FROM {$wpdb->prefix}ardeek_roles WHERE name = %s",$name));

	//verifichiamo che siano presenti records
	if($myrows)
	{
		return $risposta;
	}
	else
	{
		$wpdb->query( 
			$wpdb->prepare("INSERT INTO {$wpdb->prefix}ardeek_roles(`id`, `name`, `id_permission`, `editable`) VALUES (null,%s,%d,1)", $name, $permission));

		$risposta = array('response' => 'true');

		return $risposta;
	}
}

function edit_roles($id, $name, $permission)
{
	global $wpdb;

	$wpdb->query( 
		$wpdb->prepare( "UPDATE {$wpdb->prefix}ardeek_roles SET `name` = %s, `id_permission` = %d WHERE id= %d", $name, $permission,$id));

	$risposta = array('response' => 'true');

	return $risposta;
}

function delete_roles($id)
{
	global $wpdb;

	$wpdb->query( 
		$wpdb->prepare(
			"DELETE FROM {$wpdb->prefix}ardeek_roles WHERE id = %d",$id));

	$risposta = array('response' => 'true');

	return $risposta;
}

function roles_by_id($id)
{
	global $wpdb;

	$item_list = [];
	$item = '';

	$risposta = array('response' => 'false');

	$myrows = $wpdb->get_results($wpdb->prepare("SELECT * FROM {$wpdb->prefix}ardeek_roles WHERE id= %d",$id));

	//verifichiamo che siano presenti records
	foreach ($myrows as $row)
	{
		$id_permission	= $row->id;
		$id_permission 	= $row->id_permission;
		$name			= $row->name;
		$editable		= $row->editable;

		$item = array('id'=> $id, 'id_permission' => $id_permission, 'name' => $name, 'editable' => $editable);


		$risposta = array('response' => 'true', 'role' => $item);
	}

	return $risposta;
}



//Create a stdClass instance to hold important information
$return = new stdClass(); 
$return->success = true;
$return->errorMessage = "";
$return->data = array();

$method = $_POST;

//Sanitize the string and json strings received from the front-end
//Corresponds to 'data:{ js_string: val , js_array: arr,  js_object: obj }' in $.ajax
//if(isset($method['js_object'])) $json_object = sanitize($method['js_object']); 
$json_object = stripslashes( $method['js_object']);
//var_dump($json_object);
//Decode the json to get workable PHP variables
$php_object = json_decode($json_object);
//var_dump ($php_object);
switch ($php_object->r) 
{
	case "Testing":
		$return = testing();
		returnsomething($return);
		break;
	case "IfMembershipExist":
		$return = if_membership_exist();
		returnsomething($return);
		break;
	case "RegistrationMembership":
		$return = registration_membership($php_object->n, $php_object->d, $php_object->o, $php_object->v, $php_object->e, $php_object->f, $php_object->g, $php_object->w, $php_object->c, $php_object->k, $php_object->u);
		returnsomething($return);
		break;
	case "UpdateMembership":
		$return = update_membership($php_object->n, $php_object->d, $php_object->o, $php_object->v, $php_object->e, $php_object->f, $php_object->g, $php_object->w, $php_object->c, $php_object->k, $php_object->u);
		returnsomething($return);
		break;
	case "DeleteMembershipForever":
		$return = delete_membership_forever();
		returnsomething($return);
		break;
	case "Login":
		$return = login($php_object->e, $php_object->p);
		returnsomething($return);
		break;
	case "Registration":
		$return = registration($php_object->nome, $php_object->cognome, $php_object->birthday, $php_object->email, $php_object->password, $php_object->website, $php_object->education, $php_object->bio, $php_object->skills, $php_object->avatar, $php_object->id_role, $php_object->id_permission, $php_object->enabled, $php_object->verified, $php_object->paid, $php_object->token);
		returnsomething($return);
		break;
	case "EmailSender":
		$return = email_sender($php_object->t, $php_object->e, $php_object->p);
		returnsomething($return);
		break;
	case "ForgotPassword":
		$return = forgot_password($php_object->t, $php_object->e, $php_object->p);
		returnsomething($return);
		break;
	case "CheckExistEmail":
		$return = check_exist_email($php_object->e);
		returnsomething($return);
		break;
	case "AllMembership":
		$return = all_membership();
		returnsomething($return);
		break;
	case "editEnableUser":
		$return = edit_enable_user($php_object->i, $php_object->t);
		returnsomething($return);
		break;
	case "MemberById":
		$return = member_by_id($php_object->i);
		returnsomething($return);
		break;
	case "removeUser":
		$return = remove_user_by_id($php_object->i);
		returnsomething($return);
		break;
	case "EditUser":
		$return = edit_user($php_object->i, $php_object->z, $php_object->n, $php_object->c, $php_object->b, $php_object->e, $php_object->w, $php_object->d, $php_object->s, $php_object->o);
		returnsomething($return);
		break;
	case "AllMessages":
		$return = all_messages();
		returnsomething($return);
		break;
	case "sendMessage":
		$return = send_message($php_object->i, $php_object->l, $php_object->m);
		returnsomething($return);
		break;
	case "deleteMessage":
		$return = delete_message($php_object->i);
		returnsomething($return);
		break;
	case "editMessage":
		$return = edit_message($php_object->i, $php_object->l, $php_object->m);
		returnsomething($return);
		break;
	case "findMessageById";
		$return = find_message_by_id($php_object->i);
		returnsomething($return);
		break;
	case "AllItems":
		$return = all_items();
		returnsomething($return);
		break;
	case "ItemsByRole":
		$return = items_by_role($php_object->i);
		returnsomething($return);
		break;
	case "removeItem":
		$return = remove_item($php_object->i);
		returnsomething($return);
		break;
	case "AllPayments":
		$return = all_payments();
		returnsomething($return);
		break;
	case "removePayment":
		$return = remove_payment($php_object->i);
		returnsomething($return);
		break;
	case "restartAllPayment":
		$return = restart_all_payment();
		returnsomething($return);
		break;
	case "initMessageDashboard":
		$return = init_message_dashboard($php_object->i);
		returnsomething($return);
		break;
	case "InitStatus":
		$return = init_status();
		returnsomething($return);
		break;
	case "changeAvatar":
		$return = change_avatar($php_object->i, $php_object->a);
		returnsomething($return);
		break;
	case "uploadFile":
		$return = upload_file($php_object->i, $php_object->l, $php_object->n, $php_object->t, $php_object->p);
		returnsomething($return);
		break;
	case "PaymentWithId":
		$return = user_payment($php_object->i, $php_object->a, $php_object->y, $php_object->p, $php_object->t);
		returnsomething($return);
		break;
	case "RefreshPaidUserId":
		$return = refresh_user_paid($php_object->i);
		returnsomething($return);
		break;
	case "AllUsersNotPaid":
		$return = all_membership_not_paid();
		returnsomething($return);
		break;
	case "UsersPaymentsMade":
		$return = users_payments_made($php_object->i);
		returnsomething($return);
		break;
	case "InitPaypalPayment":
		$return = init_paypal_payment($php_object->s, $php_object->i, $php_object->t, $php_object->p);
		returnsomething($return);
		break;
	case "TryPaypalPayment":
		$return = try_paypal_payment($php_object->i);
		returnsomething($return);
		break;
	case "AllRoles":
		$return = all_roles();
		returnsomething($return);
		break;
	case "AddRoles":
		$return = add_roles($php_object->n, $php_object->p);
		returnsomething($return);
		break;
	case "EditRoles":
		$return = edit_roles($php_object->i, $php_object->n, $php_object->p);
		returnsomething($return);
		break;
	case "RolesById":
		$return = roles_by_id($php_object->i);
		returnsomething($return);
		break;
	case "DeleteRoles":
		$return = delete_roles($php_object->i);
		returnsomething($return);
		break;
	case "Today":
		$return = today();
		returnsomething($return);
		break;
	default:
		$return = default_return();
		returnsomething($return);
		break;

}

?>