function init_admin_messages()
{
	var post = '';

	//inserisco i dati in un json
	object = JSON.stringify({ r: 'AllMessages' });

	ajaxPost(path+"api/servo.php", { js_object: object }, 
		function(response)
		{
			console.log(response);

			var resp = jQuery.parseJSON(response);
			
			if(resp.response=="true")
			{
				post = fill_all_messages(resp.messages);
				localStorage.setItem('messages', post);
			}
			else
			{
				post = "Nessun messaggio da visualizzare";
				localStorage.setItem('messages', post);
			}
						
		});

	post = localStorage.getItem('messages');

	console.log(post);

	return post;
}

function send_message(id)
{
	var role = $('#role_select').val();
	var message = $('#message').val();

	//inserisco i dati in un json
	object = JSON.stringify({ r: 'sendMessage' , i: id, l: parseInt(role), m: message });

	ajaxPost(path+"api/servo.php", { js_object: object }, 
		function(response)
		{
			console.log(response);

			var resp = jQuery.parseJSON(response);
			
			if(resp.response=="true")
			{
				alert("messaggio inviato con successo");
				messages_view();
			}
			else
			{
				alert("errore invio messaggio");
			}
						
		});	

}

function remove_message(id)
{
	//inserisco i dati in un json
	object = JSON.stringify({ r: 'deleteMessage' , i: id });

	ajaxPost(path+"api/servo.php", { js_object: object }, 
		function(response)
		{
			console.log(response);

			var resp = jQuery.parseJSON(response);
			
			if(resp.response=="true")
			{
				alert("messaggio rimosso con successo");
				messages_view();
			}
			else
			{
				alert("errore rimozione messaggio");
			}
						
		});	
}

function edit_message(id)
{
	var role = $('#role_select').val();
	var message = $('#message').val();

	//inserisco i dati in un json
	object = JSON.stringify({ r: 'editMessage' , i: id, l: parseInt(role), m: message });

	ajaxPost(path+"api/servo.php", { js_object: object }, 
		function(response)
		{
			console.log(response);

			var resp = jQuery.parseJSON(response);
			
			if(resp.response=="true")
			{
				alert("messaggio modificato con successo");
				messages_view();
			}
			else
			{
				alert("errore modifica messaggio");
			}
						
		});	
}

function init_message_by_id(id)
{
	//inserisco i dati in un json
	object = JSON.stringify({ r: 'findMessageById' , i: id });

	ajaxPost(path+"api/servo.php", { js_object: object }, 
		function(response)
		{
			console.log(response);

			var resp = jQuery.parseJSON(response);
			
			if(resp.response=="true")
			{
				//rimando indietro il messaggio 
				message = fill_message_by_id(resp.messages);
				localStorage.setItem('message', message);
			}
			else
			{
				//errore messaggio
			}
						
		});	

	var ok = localStorage.getItem("message");

	return ok;

}

function fill_message_by_id(message)
{
	console.log(message);

	var post = '';
	
	post += "<tr><td><b>User: </b></td><td><b>"+message.name+" "+message.surname+"</b></td></tr>";
	post += "<tr><td>Visibilita Massima: </td><td>";

	post += "<select id=\"role_select\"><option value=\"1\">Socio Ordinario</option>";
	post += "<option value=\"2\">Socio Sostenitore</option>";
	post += "<option value=\"3\">Socio Onorario</option>";
	post += "<option value=\"4\">Direttivo</option></select>";

	$('#role_select').val(message.id_role);

	post += "</td></tr>";
	post += "<tr><td>Messaggio: </td><td><textarea id=\"message\">"+message.message+"</textarea></td></tr>";

	return post;

}

function init_message_dashboard(id)
{
	//inserisco i dati in un json
	object = JSON.stringify({ r: 'initMessageDashboard' , i: id });

	ajaxPost(path+"api/servo.php", { js_object: object }, 
		function(response)
		{

			var resp = jQuery.parseJSON(response);
			
			if(resp.response=="true")
			{
				//inizializzo la bacheca
				message = fill_message_by_id_role(resp.messages);
				localStorage.setItem('message', message);
			}
			else
			{
				//errore messaggio
				message = "non ci sono messaggi da visualizzare";
				localStorage.setItem('message', message);
			}
						
		});	

	var ok = localStorage.getItem("message");

	return ok;
}

function fill_message_by_id_role(message)
{
	var post = '';
	
	for(var i in message)
		post += "<tr><td>"+message[i].name+" "+message[i].surname+"</td><td><i>"+message[i].message+"</i></td></tr>";

	return post;

}