function try_login()
{
	var email = $("#email").val();
	var password = $("#password").val();

	if (email != "" && email != null && password != "" && password != null)
	{
		//inserisco i dati in un json
		object = JSON.stringify({ r: 'Login', e: email, p: password });

		//verifico tramite db email e password
		//se funzione successo, verifico se admin o utente normale
		//se funzione fallimento, alert con messaggio errore e pulisco i campi email e password
		ajaxPost(path+"api/servo.php", { js_object: object }, 
			function(response)
			{
				var resp = jQuery.parseJSON(response);

				if(resp.response=="true")
				{
					if(resp.user.enabled == "1")
					{
						if(resp.user.verified == "1")
						{
							//salvo nel localStorage l'Utente
							localStorage.setItem('userLogged', JSON.stringify(resp.user));

							//salvo nel localStorage immagine profilo
							localStorage.setItem('fotoProfilo', resp.user.avatar);

							//se admin pannello admin, altrimenti pannello utente
							route();
						}
						alert("Utente non ancora verificato. Effettua la procedura di verifica tramite email.");
					}
					else
						alert("Utente bloccato. Contatta l'amministrazione. ");
				}
				else
				{
					alert("email o password non validi");
					$("#email").val("");
					$("#password").val("");
				}
			});

	}
	else
	{
		//ritorno che email o password vuoti e pulisco i campi
		alert("email o password vuoti");
		$("#email").val("");
		$("#password").val("");
	}
}

function logout()
{
	localStorage.clear();
	location.reload();
}
