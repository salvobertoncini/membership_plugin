<?php

require '../vendor/autoload.php';

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

function login($email, $password)
{
	$risposta = array('response' => 'false');

	$sql = "SELECT * FROM `users` WHERE email = \"".$email."\" AND password = \"".$password."\" ORDER BY id DESC";

	$mysqli = db_connection();

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
			$name           = $row['name'];
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

			$user = array('id'=> $id, 'id_role' => $id_role, 'id_permission' => $id_permission, 'name' => $name, 'surname' => $surname, 'birthday' => $birthday, 'email' => $email, 'password' => $password, 'website' => $website, 'education' => $education, 'skills' => $skills, 'bio' => $bio, 'avatar' => $avatar, 'token' => $token, 'verified' => $verified, 'enabled' => $enabled, 'paid' => $paid);

			$risposta = array('response' => 'true', 'user' => $user);
		}
	}

	return $risposta;
}

function registration($name, $surname, $birthday, $email, $password, $website, $education, $bio, $skills, $avatar, $id_role, $id_permission, $enabled, $paid, $verified, $token)
{
	$sql = "INSERT INTO `users` (id, name, surname, birthday, email, password, website, education, skills, bio, token, id_permission, verified, enabled, paid, id_role, avatar) VALUES (null, '".$name."', '".$surname."', '".$birthday."', '".$email."', '".$password."', '".$website."', '".$education."', '".$skills."', '".$bio."', '".$token."', ".$id_permission.", ".$verified.", ".$enabled.", ".$paid.", ".$id_role.", '".$avatar."');";

	$mysqli = db_connection();

    //eseguo la query
	$query = $mysqli->query($sql);

	$risposta = array('response' => 'true');

	return $risposta;
}

function check_exist_email($email)
{
	$risposta = array('response' => 'false');

	$sql = "SELECT * FROM `users` WHERE email = \"".$email."\" ORDER BY id DESC";

	$mysqli = db_connection();

    //eseguo la query
	$query = $mysqli->query($sql);
	
	//verifichiamo che siano presenti records
	if($query->data_seek(0))
	{
		while($row = $query->fetch_assoc())
		{
			$risposta = array('response' => 'true');
		}
	}

	return $risposta;
}

function all_membership()
{
	$risposta = array('response' => 'false');

	$user_list = [];

	$sql = "SELECT * FROM `users` ORDER BY id DESC";

	$mysqli = db_connection();

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
			$name           = $row['name'];
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

			$user = array('id'=> $id, 'id_role' => $id_role, 'id_permission' => $id_permission, 'name' => $name, 'surname' => $surname, 'birthday' => $birthday, 'email' => $email, 'password' => $password, 'website' => $website, 'education' => $education, 'skills' => $skills, 'bio' => $bio, 'avatar' => $avatar, 'token' => $token, 'verified' => $verified, 'enabled' => $enabled, 'paid' => $paid);

			array_push($user_list, $user);
		}

		$risposta = array('response' => 'true', 'userList' => $user_list);
	}

	return $risposta;
}

function edit_enable_user($id, $test)
{

	$user_list = [];

	$sql = "UPDATE `users` SET enabled = ".$test." WHERE id = ".$id.";";

	$mysqli = db_connection();

    //eseguo la query
	$query = $mysqli->query($sql);
	
	$risposta = array('response' => 'true');

	return $risposta;
}

function member_by_id($id)
{
	$risposta = array('response' => 'false');

	$user_list = [];

	$sql = "SELECT * FROM `users` WHERE id = ".$id.";";

	$mysqli = db_connection();

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
			$name           = $row['name'];
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

			$user = array('id'=> $id, 'id_role' => $id_role, 'id_permission' => $id_permission, 'name' => $name, 'surname' => $surname, 'birthday' => $birthday, 'email' => $email, 'password' => $password, 'website' => $website, 'education' => $education, 'skills' => $skills, 'bio' => $bio, 'avatar' => $avatar, 'token' => $token, 'verified' => $verified, 'enabled' => $enabled, 'paid' => $paid);
		}

		$risposta = array('response' => 'true', 'user' => $user);
	}

	return $risposta;
}

function remove_user_by_id($id)
{
	$sql = "DELETE FROM `users` WHERE id = ".$id.";";

	$mysqli = db_connection();

    //eseguo la query
	$query = $mysqli->query($sql);
	
	$risposta = array('response' => 'true');

	return $risposta;
}

function edit_user($id, $id_role, $nome, $cognome, $birthday, $email, $website, $education, $skills, $bio)
{
	$sql = "UPDATE `users` SET id_role = ".$id_role.", name = '".$nome."' , surname = '".$cognome."' , birthday = '".$birthday."' , email = '".$email."' , website = '".$website."' , education = '".$education."' , skills = '".$skills."' , bio = '".$bio."' WHERE id = ".$id.";";

	$mysqli = db_connection();

    //eseguo la query
	$query = $mysqli->query($sql);
	
	$risposta = array('response' => 'true');

	return $risposta;
}

function all_messages()
{
	$risposta = array('response' => 'false');

	$msg_list = [];
	$msg = '';

	$sql = "SELECT messages.id, id_roles, name, surname, message FROM `messages` JOIN `users` ON (messages.id_user = users.id)";

	$mysqli = db_connection();

    //eseguo la query
	$query = $mysqli->query($sql);
	

	//verifichiamo che siano presenti records
	if($query->data_seek(0))
	{
		while($row = $query->fetch_assoc())
		{  

			$id             = $row['id'];
			$name    	    = $row['name'];
			$surname    	= $row['surname'];
			$id_role        = $row['id_roles'];
			$message  		= $row['message'];

			$msg = array('id'=> $id, 'id_role' => $id_role, 'name' => $name, 'surname' => $surname, 'message' => $message);
			array_push($msg_list, $msg);
		}

		$risposta = array('response' => 'true', 'messages' => $msg_list);
	}

	return $risposta;
}

function send_message($id, $id_role, $message)
{
	$sql = "INSERT INTO `messages`(`id`, `id_user`, `id_roles`, `message`) VALUES (null, ".$id.",".$id_role.",'".$message."')";

	$mysqli = db_connection();

    //eseguo la query
	$query = $mysqli->query($sql);

	$risposta = array('response' => 'true');

	return $risposta;
}

function edit_message($id, $id_roles, $message)
{
	$sql = "UPDATE `messages` SET id_roles = ".$id_roles." , message = '".$message."' WHERE id = ".$id.";";

	$mysqli = db_connection();

    //eseguo la query
	$query = $mysqli->query($sql);
	
	$risposta = array('response' => 'true');

	return $risposta;
}

function delete_message($id)
{
	$sql = "DELETE FROM `messages` WHERE id = ".$id.";";

	$mysqli = db_connection();

    //eseguo la query
	$query = $mysqli->query($sql);
	
	$risposta = array('response' => 'true');

	return $risposta;
}

function find_message_by_id($id)
{
	$risposta = array('response' => 'false');

	$msg = '';

	$sql = "SELECT messages.id, id_roles, name, surname, message FROM `messages` JOIN `users` ON (messages.id_user = users.id) WHERE messages.id = ".$id.";";

	$mysqli = db_connection();

    //eseguo la query
	$query = $mysqli->query($sql);
	
	//verifichiamo che siano presenti records
	if($query->data_seek(0))
	{
		while($row = $query->fetch_assoc())
		{  

			$id             = $row['id'];
			$name    	    = $row['name'];
			$surname    	= $row['surname'];
			$id_role        = $row['id_roles'];
			$message  		= $row['message'];

			$msg = array('id'=> $id, 'id_role' => $id_role, 'name' => $name, 'surname' => $surname, 'message' => $message);
			$risposta = array('response' => 'true', 'messages' => $msg);
		}

		
	}

	return $risposta;
}

function all_items()
{
	$risposta = array('response' => 'false');

	$item_list = [];
	$item = '';

	$sql = "SELECT contents.id, contents.id_role, contents.name as onome, users.name as name, surname, type, path FROM `contents` JOIN `users` ON (contents.id_user = users.id)";

	$mysqli = db_connection();

    //eseguo la query
	$query = $mysqli->query($sql);
	

	//verifichiamo che siano presenti records
	if($query->data_seek(0))
	{
		while($row = $query->fetch_assoc())
		{  

			$id             = $row['id'];
			$name    	    = $row['name'];
			$surname    	= $row['surname'];
			$id_role        = $row['id_role'];
			$oname			= $row['onome'];
			$type  			= $row['type'];
			$path	  		= $row['path'];

			$item = array('id'=> $id, 'id_role' => $id_role, 'name' => $name, 'surname' => $surname, 'oname' => $oname, 'type' => $type, 'path' => $path);
			array_push($item_list, $item);
		}

		$risposta = array('response' => 'true', 'items' => $item_list);
	}

	return $risposta;
}

function remove_item($id)
{
	$sql = "DELETE FROM `contents` WHERE id = ".$id.";";

	$mysqli = db_connection();

    //eseguo la query
	$query = $mysqli->query($sql);
	
	$risposta = array('response' => 'true');

	return $risposta;
}

function all_payments()
{
	$risposta = array('response' => 'false');

	$item_list = [];
	$item = '';

	$sql = "SELECT payments.id, name, surname, data, information FROM `payments` JOIN `users` ON (payments.id_user = users.id)";

	$mysqli = db_connection();

    //eseguo la query
	$query = $mysqli->query($sql);
	

	//verifichiamo che siano presenti records
	if($query->data_seek(0))
	{
		while($row = $query->fetch_assoc())
		{  

			$id             = $row['id'];
			$name    	    = $row['name'];
			$surname    	= $row['surname'];
			$data  			= $row['data'];
			$information	= $row['information'];

			$item = array('id'=> $id, 'name' => $name, 'surname' => $surname, 'data' => $data, 'information' => $information);
			array_push($item_list, $item);
		}

		$risposta = array('response' => 'true', 'payments' => $item_list);
	}

	return $risposta;
}

function remove_payment($id)
{
	$sql = "DELETE FROM `payments` WHERE id = ".$id.";";

	$mysqli = db_connection();

    //eseguo la query
	$query = $mysqli->query($sql);
	
	$risposta = array('response' => 'true');

	return $risposta;
}

function restart_all_payment()
{
	$sql = "UPDATE `users` SET paid = 0;";

	$mysqli = db_connection();

    //eseguo la query
	$query = $mysqli->query($sql);
	
	$risposta = array('response' => 'true');

	return $risposta;
}

function init_message_dashboard($id_role)
{
	$risposta = array('response' => 'false');

	$item_list = [];
	$item = '';

	$sql = "SELECT messages.id, name, surname, message FROM `messages` JOIN `users` ON (messages.id_user = users.id) WHERE id_roles <= ".$id_role." LIMIT 5;";

	$mysqli = db_connection();

    //eseguo la query
	$query = $mysqli->query($sql);
	

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

		$risposta = array('response' => 'true', 'messages' => $item_list);
	}

	return $risposta;
}

function init_status()
{
	$risposta = array('response' => 'false');

	$item_list = [];
	$item = '';

	$sql = "SELECT  (
	SELECT COUNT(*)
	FROM   users
	) AS members,
	(
	SELECT COUNT(*)
	FROM   payments
	) AS payments
	FROM    dual";

	$mysqli = db_connection();

    //eseguo la query
	$query = $mysqli->query($sql);
	

	//verifichiamo che siano presenti records
	if($query->data_seek(0))
	{
		while($row = $query->fetch_assoc())
		{  

			$members        = $row['members'];
			$payments    	= $row['payments'];

			$item = array('members'=> $members, 'payments' => $payments);
			array_push($item_list, $item);
		}

		$risposta = array('response' => 'true', 'status' => $item_list);
	}

	return $risposta;
}

function change_avatar($id, $avatar)
{
	$sql = "UPDATE `users` SET avatar = '".$avatar."' WHERE id = ".$id.";";

	$mysqli = db_connection();

    //eseguo la query
	$query = $mysqli->query($sql);
	
	$risposta = array('response' => 'true');

	return $risposta;
}

function upload_file($id, $file)
{
	$sql = "INSERT INTO `contents`(`id`, `id_user`, `id_role`, `type`, `name`, `path`) VALUES (null, ".$id.", 1, 'document', 'LeL', '".$file."')";

	$mysqli = db_connection();

    //eseguo la query
	$query = $mysqli->query($sql);

	$risposta = array('response' => 'true');

	return $risposta;
}

function user_payment($id, $amount, $paymentId, $PayerID, $token)
{
	$timestamp = date('Y-m-d G:i:s');
	$string = "data: ".$timestamp.", amount: ".$amount.", token: ".$token.", paymentId: ".$paymentId.", PayerID: ".$PayerID;

	$sql = "INSERT INTO `payments`(`id`, `id_user`, `data`, `information`) VALUES (null, ".$id.", '".$timestamp."', '".$string."')";

	$mysqli = db_connection();

    //eseguo la query
	$query = $mysqli->query($sql);

	$risposta = array('response' => 'true');

	return $risposta;
}

function refresh_user_paid($id)
{
	$sql = "UPDATE `users` SET paid = 1 WHERE id = ".$id.";";

	$mysqli = db_connection();

    //eseguo la query
	$query = $mysqli->query($sql);
	
	$risposta = array('response' => 'true');

	return $risposta;
}

function all_membership_not_paid()
{
	$risposta = array('response' => 'false');

	$user_list = [];

	$sql = "SELECT * FROM `users` WHERE paid = 0 ORDER BY id DESC";

	$mysqli = db_connection();

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
			$name           = $row['name'];
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

			$user = array('id'=> $id, 'id_role' => $id_role, 'id_permission' => $id_permission, 'name' => $name, 'surname' => $surname, 'birthday' => $birthday, 'email' => $email, 'password' => $password, 'website' => $website, 'education' => $education, 'skills' => $skills, 'bio' => $bio, 'avatar' => $avatar, 'token' => $token, 'verified' => $verified, 'enabled' => $enabled, 'paid' => $paid);

			array_push($user_list, $user);
		}

		$risposta = array('response' => 'true', 'userList' => $user_list);
	}

	return $risposta;	
}

function users_payments_made($id)
{
	$risposta = array('response' => 'false');

	$item_list = [];
	$item = '';

	$sql = "SELECT payments.id, name, surname, data, information FROM `payments` JOIN `users` ON (payments.id_user = users.id) WHERE payments.id_user = ".$id.";";

	$mysqli = db_connection();

    //eseguo la query
	$query = $mysqli->query($sql);
	

	//verifichiamo che siano presenti records
	if($query->data_seek(0))
	{
		while($row = $query->fetch_assoc())
		{  

			$id             = $row['id'];
			$name    	    = $row['name'];
			$surname    	= $row['surname'];
			$data  			= $row['data'];
			$information	= $row['information'];

			$item = array('id'=> $id, 'name' => $name, 'surname' => $surname, 'data' => $data, 'information' => $information);
			array_push($item_list, $item);
		}

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
	$risposta = array('response' => 'false');

	$item_list = [];
	$item = '';

	$sql = "SELECT * FROM `membership`";

	$mysqli = db_connection();

    //eseguo la query
	$query = $mysqli->query($sql);
	

	//verifichiamo che siano presenti records
	if($query->data_seek(0))
	{
		while($row = $query->fetch_assoc())
		{  

			$id             	= $row['id'];
			$name    	    	= $row['name'];
			$registered_office  = $row['registered_office'];
			$op_headquarter  	= $row['op_headquarter'];
			$VAT				= $row['VAT'];
			$email             	= $row['email'];
			$website    	    = $row['website'];
			$clientId    		= $row['clientId'];
			$clientSecret  		= $row['clientSecret'];

			$item = array('id'=> $id, 'name' => $name, 'registered_office' => $registered_office, 'op_headquarter' => $op_headquarter, 'VAT' => $VAT, 'email' => $email, 'website' => $website, 'clientId' => $clientId, 'clientSecret' => $clientSecret);
			array_push($item_list, $item);
		}

		$risposta = array('response' => 'true', 'membership' => $item_list);
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
if(isset($method['js_object'])) $json_object = sanitize($method['js_object']); 

//Decode the json to get workable PHP variables
$php_object = json_decode($json_object);

switch ($php_object->r) 
{
	case "IfMembershipExist":
	$return = if_membership_exist();
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
	$return = upload_file($php_object->i, $php_object->a);
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
	default:
	$return = default_return();
	returnsomething($return);
	break;

}

?>