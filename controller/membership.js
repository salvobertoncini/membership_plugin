function init_membership_all()
{
	var post = '';

	//inserisco i dati in un json
	object = JSON.stringify({ r: 'AllMembership' });

	$.post(path+"api/servo.php", { js_object: object }, 
		function(response)
		{
			var resp = jQuery.parseJSON(response);
			
			if(resp.response=="true")
			{
				post = fill_membership_table(resp.userList);
				localStorage.setItem('membership', post);
			}
			else
			{
				post = "Nessun Socio da Visualizzare";
				localStorage.setItem('membership', post);
			}
						
		});

	post = localStorage.getItem('membership');

	return post;
}

function fill_membership_table(userList)
{
	var post = '';

	post += "<table class=\"form-table\">";
	post += "<tr><td><b>#</b></td><td><b>Nome</b></td><td><b>Cognome</b></td><td><b>Ruolo</b></td><td><b>Pagato</b></td><td><b>View</b></td><td><b>Status</b></td><td><b>Edit</b></td><td><b>Delete</b></td></tr>";
	

	for (var i in userList) 
	{
		var utente = userList[i];

		switch(userList[i].id_role)
		{
			case "1":
				var ruolo = "Socio Ordinario";
				break;
			case "2":
				var ruolo = "Socio Sostenitore";
				break;
			case "3":
				var ruolo = "Socio Onorario";
				break;
			case "4":
				var ruolo = "Direttivo";
				break;
			default:
				var ruolo = "BOH";
				break;
		}

		//inizializzo la variabile di approvazione (filtro utenti solo per admin)
		if (userList[i].enabled == 0)
			var approve = 'block';
		else 
			var approve = 'check';
		
		//inizializzo l'immagine di pagamento effettuato
		if (userList[i].paid == 0)
			var paid = 'block';
		else 
			var paid = 'check';

		post += "<tr id="+userList[i].id+"><td>"+i+"</td><td>"+userList[i].name+"</td><td>"+userList[i].surname+"</td><td>"+ruolo+"</td><td><i class=\"zmdi zmdi-"+paid+"\"></i></td><td><button onclick=\"member_by_id_view("+userList[i].id+")\"><i class=\"zmdi zmdi-eye\"></i></button></td><td><button id=\"approveid"+userList[i].id+"\" class=\""+approve+"\" onclick=\"approve_member("+userList[i].id+")\"><i class=\"zmdi zmdi-"+approve+"\"></i></button></td><td><button onclick=\"edit_member_view("+userList[i].id+")\"><i class=\"zmdi zmdi-edit\"></i></button></td><td><button onclick=\"delete_member_view("+userList[i].id+", '"+userList[i].name+"', '"+userList[i].surname+"')\"><i class=\"zmdi zmdi-delete\"></i></button></td></tr>";

	}

	post += "</table>"

	return post;

}

function remove_member(id)
{
	//inserisco i dati in un json
	object = JSON.stringify({ r: 'removeUser', i: id });

	$.post(path+"api/servo.php", { js_object: object }, 
		function(response)
		{
			console.log(response);

			var resp = jQuery.parseJSON(response);
			
			if(resp.response=="true")
			{
				membership_management();
			}
						
		});
}

function approve_member(id)
{
	var test = '';
	var approve = $('#approveid'+id).attr('class');

	if(approve=='block')
	{
		test = 1;
		approve = 'check';
	}
	else
	{
		test = 0;
		approve = 'block';
	}

	//inserisco i dati in un json
	object = JSON.stringify({ r: 'editEnableUser', i: id, t: test });

	$.post(path+"api/servo.php", { js_object: object }, 
		function(response)
		{
			console.log(response);

			var resp = jQuery.parseJSON(response);
			
			if(resp.response=="true")
			{
				$('#approveid'+id).html("<i class=\"zmdi zmdi-"+approve+"\"></i>");
				$('#approveid'+id).attr('class', approve);
			}
						
		});
}

function init_member_by_id(id)
{
	var post = '';

	//inserisco i dati in un json
	object = JSON.stringify({ r: 'MemberById' , i: id});

	$.post(path+"api/servo.php", { js_object: object }, 
		function(response)
		{
			var resp = jQuery.parseJSON(response);
			
			if(resp.response=="true")
			{
				post = fill_member_view(resp.user);
				localStorage.setItem('member', post);
			}
			else
			{
				post = "Nessun Socio da Visualizzare";
				localStorage.setItem('member', post);
			}
						
		});

	post = localStorage.getItem('member');

	return post;
}

function init_edit_member_by_id(id)
{
	var post = '';

	//inserisco i dati in un json
	object = JSON.stringify({ r: 'MemberById' , i: id});

	$.post(path+"api/servo.php", { js_object: object }, 
		function(response)
		{

			var resp = jQuery.parseJSON(response);
			
			if(resp.response=="true")
			{
				post = fill_edit_member_view(resp.user);
				localStorage.setItem('member', post);
			}
			else
			{
				post = "Nessun Socio da Visualizzare";
				localStorage.setItem('member', post);
			}
						
		});

	post = localStorage.getItem('member');

	return post;
}

function edit_member(id)
{
	//prendo tutti i dati dalle textbox
	var user = JSON.parse(localStorage.getItem('userLogged'));
	var id_role = user.id_role;

	var name = $("#name").val();
	var surname = $("#surname").val();

	$("#birthday").datepicker({ dateFormat: 'yyyy, mm, dd' });
	var birthday = $("#birthday").val();

	var email = $("#email").val();
	var website = $("#website").val();
	var education = $("#education").val();
	var skills = $("#skills").val();
	var bio = $("#bio").val();
	if (user.id_role == 4)
		id_role = $("#role_select").val();

	//inserisco i dati in un json
	object = JSON.stringify({ r: 'EditUser' , i: id, z: id_role, n: name, c: surname, b: birthday, e: email, w: website, d: education, s: skills, o: bio });

	$.post(path+"api/servo.php", { js_object: object }, 
		function(response)
		{
			console.log("response: ");
			console.log(response);

			var resp = jQuery.parseJSON(response);
			
			if(resp.response=="true")
			{
				alert("cambiamento effettuato con successo!");
				if(user.id_role == 4)
					membership_management();
				else
					route();
			}
						
		});
}

function init_membership_status()
{
	//inserisco i dati in un json
	object = JSON.stringify({ r: 'InitStatus' });

	$.post(path+"api/servo.php", { js_object: object }, 
		function(response)
		{
			var resp = jQuery.parseJSON(response);
			
			if(resp.response=="true")
			{
				post = fill_membership_status(resp.status);
				localStorage.setItem('status', post);
			}
						
		});

	post = localStorage.getItem('status');
	
	return post;
}

function fill_membership_status(status)
{
	var post = '';

	for(var i in status)
		post += "<tr><td><b>Tot Member:</b> "+status[i].members+"</td></tr><tr><td><b>Tot Payment:</b> "+status[i].payments+"</td><td></td></tr>";

	return post;
}

function change_profile_image(id)
{
	var userLogged = JSON.parse(localStorage.getItem('userLogged'));

    var photoString = $('#i').attr('src');

    var splitted = splitSomething(photoString, ',');

    var stringa = createImageForServer(splitted);

    //inserisco i dati in un json
	object = JSON.stringify({ r: 'changeAvatar' , i: id, a: stringa });

    $.post(path+"api/servo.php", { js_object: object }, 
		function(response)
		{
			var resp = jQuery.parseJSON(response);
			
			if(resp.response=="true")
			{
				//salvo su localstorage l'immagine
				if(id == userLogged.id)
					localStorage.setItem('fotoProfilo', stringa);

				alert("immagine aggiornata con successo");

				edit_member_view(id);
			}
						
		});
}
