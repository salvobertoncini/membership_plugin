function forgot_password()
{
	var email = $("#email").val();
	var token = create_token();
	var password = create_password();

	//inserisco i dati in un json
	object = JSON.stringify({ r: 'ForgotPassword', t:  token, e: email, p: password });

	$.post(path+"api/servo.php", { js_object: object }, 
		function(response)
		{
			console.log(response);

			var resp = jQuery.parseJSON(response);
			
			if(resp.response=="true")
			{
				alert("Email inviata con successo. Segui la procedura ed effettua il Login con le nuove credenziali.");
				login_view();
			}
		});

}
