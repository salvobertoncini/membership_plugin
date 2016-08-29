<?php

	$plugin_path = $_SERVER['DOCUMENT_ROOT'] . '/ardeek';

	global $wpdb;

	if(!isset($wpdb))
	{
		require_once( $plugin_path . '/wp-config.php' );
		require_once( $plugin_path . '/wp-includes/wp-db.php' );
	}

	$fileName 		= $_FILES["file1"]["name"]; // The file name
	$fileTmpLoc 	= $_FILES["file1"]["tmp_name"]; // File in the PHP tmp folder
	$fileType 		= $_FILES["file1"]["type"]; // The type of file it is
	$fileSize 		= $_FILES["file1"]["size"]; // File size in bytes
	$fileErrorMsg 	= $_FILES["file1"]["error"]; // 0 for false... and 1 for true
	$id_user 		= $_POST["id"];

	if (!$fileTmpLoc)
	{
		// if file not chosen
	    echo "ERROR: Please browse for a file before clicking the upload button.";
	    exit();
	}

	if(move_uploaded_file($fileTmpLoc, "contents/$fileName")){
	    upload_file($id_user, 4, $fileName, $fileType, "contents/".$fileName);
	    change_avatar($id_user, "contents/".$fileName);
	    echo "$fileName upload is complete";
	}
	else
	{
	    echo "move_uploaded_file function failed";
	}


	function upload_file($id, $id_role, $fileName, $fileType, $path)
	{


		$type = checkTypeUploadedFile($fileType);

		global $wpdb;

		$wpdb->query(
			$wpdb->prepare(
				"INSERT INTO {$wpdb->prefix}ardeek_contents (`id_user`, `id_role`, `type`, `name`, `path`) VALUES (%d, %d, %s, %s, %s)",$id,$id_role,$type,$fileName,$path));

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

	function change_avatar($id, $avatar)
	{
		global $wpdb;

		$wpdb->query(
			$wpdb->prepare(
				"UPDATE {$wpdb->prefix}ardeek_users SET avatar = %s WHERE id = %d",$avatar, $id));

		$risposta = array('response' => 'true');

		return $risposta;
	}
