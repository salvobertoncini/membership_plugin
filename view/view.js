function admin_view()
{
	var user = JSON.parse(localStorage.getItem('userLogged'));

	var post = '';

	switch(user.id_role)
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

	post += "<h2 class=\"hndle\"><span>ADMINISTRATOR</span></h2>";
	post += "<div class=\"inside\">";

	post += "<table class=\"form-table\">";
	post += "<tr><td>Benvenuto "+user.name+" "+user.surname+", il tuo ruolo è: <b>"+ruolo+"</b>. </td></tr>";

	//remember payment
	post += remember_payment(user.paid);

	//latest news
	post += init_latest_news(user.id_role);

	//membership status
	post += "<tr><td><h3>Membership Status</h3></td></tr>";

	extra_post = init_membership_status();
	post += extra_post;

	//personal profile
	post += init_personal_profile();

	post += "</table></div>";

	$("#maindiv").html(post);

	var post = '';

	post += "<h2 class=\"hndle\"><span>ADMIN PANEL</span></h2>";
	post += "<div class=\"inside\"><ul><li class=\"pointer\" onclick=\"route()\">Home</li><li class=\"pointer\" onclick=\"membership_management()\">Soci</li><li onclick=\"messages_view()\" class=\"pointer\">Messaggi</li><li class=\"pointer\" onclick=\"items_view()\">Contenuti</li><li class=\"pointer\" onclick=\"payment_management_view()\">Pagamenti</li><br>";
	post += "<hr><li class=\"pointer\" onclick=\"logout()\">Logout</li></div>";

	$("#secdiv").show();
	$("#secdiv").html(post);
}

function user_view()
{
	var user = JSON.parse(localStorage.getItem('userLogged'));

	var post = '';

	switch(user.id_role)
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

	post += "<h2 class=\"hndle\"><span>USER</span></h2>";

	post += "<table class=\"form-table\">";
	post += "<tr><td>Benvenuto "+user.name+" "+user.surname+", il tuo ruolo è: <b>"+ruolo+"</b>. </td></tr>";


	//remember payment
	post += remember_payment(user.paid);

	//latest news
	post += init_latest_news(user.id_role);

	//personal profile
	post += init_personal_profile();

	post += "</table></div>";

	$("#maindiv").html(post);

	var post = '';

	post += "<h2 class=\"hndle\"><span>USER PANEL</span></h2>";
	post += "<div class=\"inside\"><ul><li class=\"pointer\" onclick=\"route()\">Home</li><li class=\"pointer\" onclick=\"edit_member_view("+user.id+")\">Modifica Profilo</li><li class=\"pointer\" onclick=\"payments_made_view("+user.id+")\">Pagamenti Effettuati</li><br>";
	post += "<hr><li class=\"pointer\" onclick=\"logout()\">Logout</li></div>";

	$("#secdiv").show();
	$("#secdiv").html(post);
}

function payments_made_view(id)
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>PAGAMENTI EFFETTUATI</span></h2>";
	post += "<div class=\"inside\"><table class=\"form-table\">";

	post += payments_made(id);

	post += "</table></div>";

	$("#maindiv").html(post);

}

function init_latest_news(id)
{
	var post = '';

	post += "<tr><td><h3>Latest News</h3></td></tr>";
	
	//bacheca
	var extra_post = init_message_dashboard(id);
	post += extra_post;

	return post;
}

function init_personal_profile()
{
	var user = JSON.parse(localStorage.getItem('userLogged'));

	var post = '';

	post += "<tr><td><h3>Personal Profile</h3></td></tr>";


    if (localStorage['fotoProfilo'] != "undefined")
        var immagineProfilo = "data:image/png;base64, "+ localStorage['fotoProfilo']+"";   
    else 
        var immagineProfilo = "http://placehold.it/350x350";

    post += "<tr><td><img id=\"img-settings\" src=\"" + immagineProfilo +"\" class=\"pv-main\"/></td></tr>";

	
	var extra_post = init_member_by_id(user.id);

	post += extra_post;

	return post;
}

function get_payment_view()
{
	var user = JSON.parse(localStorage.getItem('userLogged'));

	var post = '';

	post += "<h2 class=\"hndle\"><span>EFFETTUA PAGAMENTO</span></h2>";
	post += "<div class=\"inside\"><table class=\"form-table\">";

	post += "<tr><td>Vuoi effettuare il pagamento della quota annuale?</td></tr>";
	post += "<tr><td><label for=\"payment\">Pagamento quota annuale</label></td><td><button onclick=\"try_paypal_payment("+user.id+")\">PAGA CON PAYPAL</button></td></tr>";

	post += "<tr><td><a class=\"pointer\" onclick=\"admin_view()\">Back</a></td></tr></table></form></div>";

	$("#maindiv").html(post);
}

function registration_view()
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>REGISTRATION</span></h2>";
	post += "<div class=\"inside\"><table class=\"form-table\">";

	post += "<tr><td><label for=\"name\">Nome</label></td><td><input type=\"text\" name=\"name\" id=\"name\" value=\"\" class=\"regular-text\" /><br></td></tr>";
	post += "<tr><td><label for=\"surname\">Cognome</label></td><td><input type=\"text\" name=\"surname\" id=\"surname\" value=\"\" class=\"regular-text\" /><br></td></tr>";
	post += "<tr><td><label for=\"birthday\">Data di Nascita</label></td><td><input type=\"date\" name=\"birthday\" id=\"birthday\" value=\"\" class=\"regular-text\" /><br></td></tr>";
	
	post += "<tr><td><label for=\"email\">Email</label></td><td><input type=\"email\" name=\"email\" id=\"email\" value=\"\" class=\"regular-text\" /><br></td></tr>";
	post += "<tr><td><label for=\"password\">Password</label></td><td><input type=\"password\" name=\"password\" id=\"password\" value=\"\" class=\"regular-text\" /><br></td></tr>";

	post += "<tr><td><input class=\"button-primary\" type=\"submit\" onclick=\"registration_step_0()\" name=\"reg_0\" value=\"Next Step\" /></td></tr><tr><td>";
	post += "<a onclick=\"login_view()\">Login</a> | <a onclick=\"donate_view()\">Donate</a> </td></tr></table></form></div>";


	$("#maindiv").html(post);
	$("#secdiv").hide();
}

function registration_view_2()
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>REGISTRATION</span></h2>";
	post += "<div class=\"inside\"><table class=\"form-table\">";

	post += "<tr><td><label for=\"website\">Sito Web</label></td><td><input type=\"text\" name=\"website\" id=\"website\" value=\"\" class=\"regular-text\" /><br></td></tr>";
	post += "<tr><td><label for=\"education\">Titolo di Studi</label></td><td><input type=\"textarea\" name=\"education\" id=\"education\" value=\"\" class=\"regular-text\" /><br></td></tr>";
	post += "<tr><td><label for=\"skills\">Skills</label></td><td><input type=\"text\" name=\"skills\" id=\"skills\" value=\"\" class=\"regular-text\" /><br></td></tr>";
	
	post += "<tr><td><label for=\"bio\">Bio</label></td><td><input type=\"textarea\" name=\"bio\" id=\"bio\" value=\"\" class=\"regular-text\" /><br></td></tr>";
	post += "<tr><td><label for=\"avatar\">Profile Pic</label></td>";

	post += "<td><div class=\"pmo-contact\" id=\"pmo-contact\"><ul  id=\"profilePhoto\"> </ul><span><img id=\"i\" /></span><br><br><input id=\"f\" type=\"file\" /></div></td></tr>";

	post += "<tr><td><input class=\"button-primary\" type=\"submit\" onclick=\"registration_step_1()\" name=\"reg_1\" value=\"Next Step\" /></td></tr><tr><td>";
	post += "<a onclick=\"login_view()\">Login</a> | <a onclick=\"donate_view()\">Donate</a> </td></tr></table></form></div>";

	$("#maindiv").html(post);
	$("#secdiv").hide();

$('#f').on('change', function(ev) {
    var f = ev.target.files[0];
    var fr = new FileReader();
    
    fr.onload = function(ev2) {
        console.dir(ev2);
        $('#i').attr('src', ev2.target.result);
    };
    
    fr.readAsDataURL(f);

    $('#confirmButton').show();
    $('#deleteButton').show();
});

}

function registration_view_3()
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>REGISTRATION</span></h2>";
	post += "<div class=\"inside\"><table class=\"form-table\">";

	post += "<tr><td>Vuoi effettuare subito il pagamento della quota annuale?</td></tr>";
	post += "<tr><td><label for=\"payment\">Pagamento quota annuale</label></td><td><button onclick=\"try_paypal_payment_registration()\">PAGA CON PAYPAL</button></td></tr>";

	post += "<tr><td><input class=\"button-primary\" type=\"submit\" onclick=\"registration_step_2()\" name=\"reg_2\" value=\"Registrati\" /></td></tr><tr><td>";
	post += "<a onclick=\"login_view()\">Login</a> | <a onclick=\"donate_view()\">Donate</a> </td></tr></table></form></div>";


	$("#maindiv").html(post);
	$("#secdiv").hide();
}

function registration_success()
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>REGISTRATION</span></h2>";
	post += "<div class=\"inside\"><table class=\"form-table\">";

	post += "<tr><td>Registrazione effettuata con successo.</td></tr>";
	post += "<tr><td>Controlla se nella tua casella di posta è presente l'email di verifica e segui tutti i passi necessari.</td></tr>";

	post += "<tr><td><input class=\"button-primary\" type=\"submit\" onclick=\"login_view()\" name=\"log\" value=\"Torna a Log In\" /></td></tr><tr><td>";
	post += "<a onclick=\"login_view()\">Login</a> | <a onclick=\"donate_view()\">Donate</a> </td></tr></table></form></div>";


	$("#maindiv").html(post);
	$("#secdiv").hide();
}

function login_view()
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>LOGIN</span></h2>";
	post += "<div class=\"inside\"><table class=\"form-table\">";
	post += "<tr><td><label for=\"email\">Email</label></td><td><input type=\"email\" name=\"email\" id=\"email\" value=\"\" class=\"regular-text\" /><br></td></tr>";
	post += "<tr><td><label for=\"password\">Password</label></td><td><input type=\"password\" name=\"password\" id=\"password\" value=\"\" class=\"regular-text\" /><br></td></tr>";
	post += "<tr><td><input class=\"button-primary\" type=\"submit\" onclick=\"try_login()\" name=\"login\" value=\"Log In\" /></td></tr><tr><td>";
	post += "<a onclick=\"actual_view()\">actual_view</a> | ";
	post += "<a onclick=\"registration_view()\">Registration</a> | <a onclick=\"forget_password_view()\">Forget Password?</a> | <a onclick=\"donate_view()\">Donate</a> </td></tr></table></form></div>";

	$("#maindiv").html(post);

	$("#secdiv").hide();
}

function forget_password_view()
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>FORGET PASSWORD</span></h2>";
	post += "<div class=\"inside\"><table class=\"form-table\">";

	post += "<tr><td>Password dimenticata.</td></tr>";
	post += "<tr><td>Inserisci di seguito l'email a cui invieremo le istruzioni per il recupero password.</td></tr>";
	post += "<tr><td><label for=\"email\">Email</label></td><td><input type=\"email\" name=\"email\" id=\"email\" value=\"\" class=\"regular-text\" /><br></td></tr>";

	post += "<tr><td><input class=\"button-primary\" type=\"submit\" onclick=\"forgot_password()\" name=\"forgot\" value=\"Invia Richiesta\" /></td></tr><tr><td>";
	post += "<a onclick=\"login_view()\">Login</a> | <a onclick=\"donate_view()\">Donate</a> </td></tr></table></form></div>";


	$("#maindiv").html(post);
	$("#secdiv").hide();
}

function donate_view()
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>DONATE</span></h2>";
	post += "<div class=\"inside\"><table class=\"form-table\">";

	post += "<tr><td>Offrici un caffè.</td></tr>";
	
	post += "<tr><td><a onclick=\"login_view()\">Login</a> | <a onclick=\"registration_view()\">Registration</a> </td></tr></table></form></div>";


	$("#maindiv").html(post);
	$("#secdiv").hide();
}

function membership_management()
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>MEMBERSHIP MANAGEMENT</span></h2>";
	post += "<div class=\"inside\"><table class=\"form-table\">";

	extra_post = init_membership_all();

	post += extra_post;
	
	post += "</table></form></div>";


	$("#maindiv").html(post);
}

function items_view()
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>ITEMS MANAGEMENT</span></h2>";
	post += "<div class=\"inside\"><table class=\"form-table\">";

	//post += "<tr><td><button onclick=\"new_item_upload()\">Upload Item <i class=\"zmdi zmdi-upload\"></i></button></td></tr>";

	post += "<tr><td><div class=\"pmo-contact\" id=\"pmo-contact\"><ul  id=\"profilePhoto\"> </ul><span><img id=\"i\" /></span><br><br><input id=\"f\" type=\"file\" /></div></td></tr>";



	extra_post = init_items_all();

	post += extra_post;
	
	post += "</table></form></div>";


	$("#maindiv").html(post);

}

function admin_pay_user_view()
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>ADMIN PAY USER</span></h2>";
	post += "<div class=\"inside\"><table class=\"form-table\">";

	post += "<tr><td>"

	var extra_post = init_user_for_payment();

	post += extra_post;

	post += "</td></tr>";

	post += "<tr><td><button id=\"admin_pay_user_payment\" onclick=\"admin_pay_user_payment()\">Effettua pagamento</button></td></tr>";

	post += "<tr><td><a class=\"pointer\" onclick=\"payment_management_view()\">Back</a></td></tr>";

	post += "</table></div>";

	$("#maindiv").html(post);
}

function payment_management_view()
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>PAYMENT MANAGER</span></h2>";
	post += "<div class=\"inside\"><table class=\"form-table\">";

	post += "<tr><td><button onclick=\"admin_pay_user_view()\">Pagamento Manuale Socio</button></td><td><button id=\"restart_payment_button\" onclick=\"restart_all_payment_view()\">Azzera Quota Associativa</button></td></tr>";

	var extra_post = init_payment_all();

	post += extra_post;

	post += "<tr><td><a onclick=\"admin_view()\">Back</a> | ";
	post +=" </table></form></div>";

	$("#maindiv").html(post);
}

function restart_all_payment_view()
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>DEFAULT ALL PAYMENT</span></h2>";
	post += "<div class=\"inside\">";

	post += "Sei sicuro di voler azzerare il flag \"quota annuale\"? <br><br>";
	post += "<tr><td><button onclick=\"payment_management_view()\">Annulla</button></td> ";
	post += "<td><button onclick=\"restart_all_payment()\">Procedi</td></tr>";

	post += "</div>";

	$("#maindiv").html(post);
}

function payment_success_view()
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>PAYMENT SUCCESS</span></h2>";
	post += "<div class=\"inside\">";
	post += "<table class=\"form-table\">";

	post += "PAGAMENTO EFFETTUATO CON SUCCESSO.";
	post += "<td><button onclick=\"restart_all_payment()\">Procedi</td></tr>";

	post += "<table class=\"form-table\">";
	post += "</table>";

	post += "</div>";

	$("#maindiv").html(post);
}

function delete_payment_view(id)
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>DELETE PAYMENT</span></h2>";
	post += "<div class=\"inside\">";

	post += "Sei sicuro di voler rimuovere questo pagamento?? <br><br>";
	post += "<tr><td><button onclick=\"payment_management_view()\">Annulla</button></td> ";
	post += "<td><button onclick=\"remove_payment("+id+")\">Rimuovi</td></tr>";

	post += "</div>";

	$("#maindiv").html(post);
}

function new_message_view()
{
	var userLogged = JSON.parse(localStorage.getItem('userLogged'));

	var post = '';

	post += "<h2 class=\"hndle\"><span>NEW MESSAGE</span></h2>";
	post += "<div class=\"inside\">";
	post += "<table class=\"form-table\">";

	post += "<tr><td><b>User: </b></td><td><b>"+userLogged.name+" "+userLogged.surname+"</b></td></tr>";
	post += "<tr><td>Visibilita Massima: </td><td>";

	post += "<select id=\"role_select\"><option value=\"1\">Socio Ordinario</option>";
	post += "<option value=\"2\">Socio Sostenitore</option>";
	post += "<option value=\"3\">Socio Onorario</option>";
	post += "<option value=\"4\">Direttivo</option></select>";

	post += "</td></tr>";
	post += "<tr><td>Messaggio: </td><td><textarea id=\"message\"></textarea></td></tr>";

	post += "<br><tr><td><button onclick=\"send_message("+userLogged.id+")\">Send Message</button>";

	post += "<br><tr><td><a onclick=\"messages_view()\">Back</a>";
	post +=" </table></form></div>";

	$("#maindiv").html(post);

}

function edit_message_view(id)
{
	var post = '';

	var message = init_message_by_id(id);

	post += "<h2 class=\"hndle\"><span>EDIT MESSAGE</span></h2>";
	post += "<div class=\"inside\">";
	post += "<table class=\"form-table\">";

	post += message;

	post += "<br><tr><td><button onclick=\"edit_message("+id+")\">Edit Message</button>";

	post += "<br><tr><td><a onclick=\"messages_view()\">Back</a>";
	post +=" </table></form></div>";

	$("#maindiv").html(post);

}

function delete_message_view(id, message)
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>DELETE MESSAGE</span></h2>";
	post += "<div class=\"inside\">";

	post += "Sei sicuro di voler rimuovere: <br> "+message+" <br><br>";
	post += "<tr><td><button onclick=\"messages_view()\">Annulla</button></td> ";
	post += "<td><button onclick=\"remove_message("+id+")\">Rimuovi</td></tr>";

	post += "</div>";

	$("#maindiv").html(post);
}

function messages_view()
{

	var post = '';

	post += "<h2 class=\"hndle\"><span>MESSAGES MANAGER</span></h2>";
	post += "<div class=\"inside\">";

	extra_post = init_admin_messages();

	post += extra_post;

	post += "</div>";

	$("#maindiv").html(post);
}

function fill_all_messages(msg_list)
{
	var post = '';

	post += "<table class=\"form-table\">";
	post += "<tr><td><button onclick=\"new_message_view()\">New Message <i class=\"zmdi zmdi-edit\"></i></button></td></tr>";

	post += "<tr><td><b>#</b></td><td><b>Nome Mittente</b></td><td><b>Messaggio</b></td><td><b>Privilegi</b></td><td><b>Edit</b></td><td><b>Delete</b></td></tr>";

	for(var i in msg_list)
		post += "<tr><td>"+msg_list[i].id+"</td><td>"+msg_list[i].name+" "+msg_list[i].surname+"</td><td>"+msg_list[i].message+"</td><td>"+msg_list[i].id_role+"</td><td><button onclick=\"edit_message_view("+msg_list[i].id+")\"><i class=\"zmdi zmdi-edit\"></i></button></td><td><button onclick=\"delete_message_view("+msg_list[i].id+", '"+msg_list[i].message+"')\"><i class=\"zmdi zmdi-delete\"></i></button></td></tr>";

	post += "<tr><td><a onclick=\"admin_view()\">Back</a> | ";
	post +=" </table>";

	return post;

}

function member_by_id_view(id)
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>MEMBER VIEW</span></h2>";
	post += "<div class=\"inside\"><table class=\"form-table\">";

	extra_post = init_member_by_id(id);

	post += extra_post;

	post += "<tr><td><a onclick=\"membership_management()\">Back</a> | ";
	post +=" </table></form></div>";

	$("#maindiv").html(post);

}

function fill_member_view(user)
{
	var post = '';

	post += "<tr><td><b>Nome: </b>"+user.name+"</td></tr>";
	post += "<tr><td><b>Cognome: </b>"+user.surname+"</td></tr>";
	post += "<tr><td><b>Email: </b>"+user.email+"</td></tr>";
	post += "<tr><td><b>Data di Nascita: </b>"+user.birthday+"</td></tr>";
	post += "<tr><td><b>Sito Web: </b>"+user.website+"</td></tr>";
	post += "<tr><td><b>Titolo: </b>"+user.education+"</td></tr>";
	post += "<tr><td><b>Skills: </b>"+user.skills+"</td></tr>";
	post += "<tr><td><b>Bio: </b>"+user.bio+"</td></tr>";

	return post;
}

function delete_member_view(id, name, surname)
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>DELETE MEMBER</span></h2>";
	post += "<div class=\"inside\">";

	post += "Sei sicuro di voler rimuovere "+name+" "+surname+"? <br><br>";
	post += "<tr><td><button onclick=\"membership_management()\">Annulla</button></td> ";
	post += "<td><button onclick=\"remove_member("+id+")\">Rimuovi</td></tr>";

	post += "</div>";

	$("#maindiv").html(post);
}

function fill_edit_member_view(user)
{
	var userLogged = JSON.parse(localStorage.getItem('userLogged'));
	var img = '';

    if (user.avatar != "undefined")
        var immagineProfilo = "data:image/png;base64, "+ user.avatar;   
    else 
        var immagineProfilo = "http://placehold.it/350x350";

    img += "<li><b><i class=\"zmdi zmdi-image\"></i> Current Profile Image: </b><br><br><img id=\"img-settings\" src=\"" + immagineProfilo +"\" class=\"pv-main\"/></li>";

    img += "<li><b><i class=\"zmdi zmdi-image-o\"></i> Change Your Profile Image: </b><br><br>";

    img += "</li>";

    $("#profilePhoto").html(img);

    img = "<br><button class=\"btn btn-success waves-effect\" id=\"confirmButton\" onclick=\"change_profile_image("+user.id+")\">Confirm</button> "
        + "<button class=\"btn btn-danger waves-effect\" id=\"deleteButton\">Delete</button> ";

    $('#pmo-contact').append(img);
    $('#confirmButton').hide();
    $('#deleteButton').hide();


$('#f').on('change', function(ev) {
    var f = ev.target.files[0];
    var fr = new FileReader();
    
    fr.onload = function(ev2) {
        console.dir(ev2);
        $('#i').attr('src', ev2.target.result);
    };
    
    fr.readAsDataURL(f);

    $('#confirmButton').show();
    $('#deleteButton').show();
});

	var post = '';

	post += "<tr><td><div class=\"pmo-contact\" id=\"pmo-contact\"><ul  id=\"profilePhoto\"> </ul><span><img id=\"i\" /></span><br><br><input id=\"f\" type=\"file\" /></div></td></tr>";

	post += "<tr><td><b>Nome: </b></td><td><input type=\"text\" name=\"name\" id=\"name\" value=\""+user.name+"\" class=\"regular-text\" /></td></tr>";
	post += "<tr><td><b>Cognome: </b></td><td><input type=\"text\" name=\"surname\" id=\"surname\" value=\""+user.surname+"\" class=\"regular-text\" /></td></tr>";
	post += "<tr><td><b>Email: </b></td><td><input type=\"email\" name=\"email\" id=\"email\" value=\""+user.email+"\" class=\"regular-text\" /></td></tr>";
	post += "<tr><td><b>Data di Nascita: </b></td><td><input type=\"date\" name=\"birthday\" id=\"birthday\" value=\""+user.birthday+"\" class=\"regular-text\" /></td></tr>";
	post += "<tr><td><b>Sito Web: </b></td><td><input type=\"text\" name=\"website\" id=\"website\" value=\""+user.website+"\" class=\"regular-text\" /></td></tr>";
	post += "<tr><td><b>Titolo: </b></td><td><input type=\"text\" name=\"education\" id=\"education\" value=\""+user.education+"\" class=\"regular-text\" /></td></tr>";
	post += "<tr><td><b>Skills: </b></td><td><input type=\"text\" name=\"skills\" id=\"skills\" value=\""+user.skills+"\" class=\"regular-text\" /></td></tr>";
	post += "<tr><td><b>Bio: </b></td><td><input type=\"text\" name=\"bio\" id=\"bio\" value=\""+user.bio+"\" class=\"regular-text\" /></td></tr>";

	if(userLogged.id_role==4)
	{

		post += "<tr><td><b>Ruolo: </b></td><td>";

		post += "<select id=\"role_select\"><option value=\"1\">Socio Ordinario</option>";
		post += "<option value=\"2\">Socio Sostenitore</option>";
		post += "<option value=\"3\">Socio Onorario</option>";
		post += "<option value=\"4\">Direttivo</option></select>";

		$('#role_select').val(user.id_role);
	
		post += "</td></tr>";
	}

	return post;
}

function edit_member_view(id)
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>EDIT MEMBER</span></h2>";
	post += "<div class=\"inside\"><table class=\"form-table\">";

	extra_post = init_edit_member_by_id(id);

	post += extra_post;

	post += "<tr><td><button onclick=\"edit_member("+id+")\">Edit</button> ";
	post +=" </table></form></div>";

	$("#maindiv").html(post);

}

function delete_item_view(id)
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>DELETE ITEMS</span></h2>";
	post += "<div class=\"inside\">";

	post += "Sei sicuro di voler rimuovere questo elemento?<br><br>";
	post += "<tr><td><button onclick=\"items_view()\">Annulla</button></td> ";
	post += "<td><button onclick=\"remove_item("+id+")\">Rimuovi</td></tr>";

	post += "</div>";

	$("#maindiv").html(post);

}

function actual_view()
{
	registration_view_3();
}

function test_function()
{
	var lol = $('#i').attr('src');

	alert(lol);
}