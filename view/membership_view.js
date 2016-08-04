function init_membership_view()
{
	$("#secdiv").hide();

	var post = '';

	post += "<h2 class=\"hndle\"><span>MEMBERSHIP</span></h2>";
	post += "<div class=\"inside\">";
	post += "<table class=\"form-table\">";

	post += "<tr><td>Benvenuto, inserisci i campi necessari per la creazione dell'associazione</td></tr>";

	post += fill_init_membership();

	post += "</table></div>";

	$("#maindiv").html(post);

}

function fill_init_membership()
{
	var post = '';

	post += "<tr><td><b>Intestazione: </b></td><td><input type=\"text\" name=\"name\" id=\"name\" value=\"\" class=\"regular-text\" /></td></tr>";
	post += "<tr><td><b>Sede Legale: </b></td><td><input type=\"text\" name=\"registered_office\" id=\"registered_office\" value=\"\" class=\"regular-text\" /></td></tr>";
	post += "<tr><td><b>Sede Operativa: </b></td><td><input type=\"text\" name=\"op_headquarter\" id=\"op_headquarter\" value=\"\" class=\"regular-text\" /></td></tr>";
	post += "<tr><td><b>P. Iva / C.F. (VAT):</b></td><td><input type=\"text\" name=\"VAT\" id=\"VAT\" value=\"\" class=\"regular-text\" /></td></tr>";
	post += "<tr><td><b>Email: </b></td><td><input type=\"email\" name=\"email\" id=\"email\" value=\"\" class=\"regular-text\" /></td></tr>";
	post += "<tr><td><b>Sito Web: </b></td><td><input type=\"text\" name=\"website\" id=\"website\" value=\"\" class=\"regular-text\" /></td></tr>";
	post += "<tr><td><b>Quota Annuale: </b></td><td><input type=\"number\" step=\"0.01\" name=\"fee\" id=\"fee\" value=\"\" class=\"regular-text\" /></td></tr>";

	post += "<tr><td><b>Mese Start Quota: </b></td><td>";

		post += "<select id=\"range_fee\">";
		post += "<option value=\"1\">Gennaio</option>";
		post += "<option value=\"2\">Febbraio</option>";
		post += "<option value=\"3\">Marzo</option>";
		post += "<option value=\"4\">Aprile</option>";
		post += "<option value=\"5\">Maggio</option>";
		post += "<option value=\"6\">Giugno</option>";
		post += "<option value=\"7\">Luglio</option>";
		post += "<option value=\"8\">Agosto</option>";
		post += "<option value=\"9\">Settembre</option>";
		post += "<option value=\"10\">Ottobre</option>";
		post += "<option value=\"11\">Novembre</option>";
		post += "<option value=\"12\">Dicembre</option>";
		post += "</select>";

	post += "</td></tr>";

	post += "<tr><td><b>ClientId PAYPAL </b>(lascia libero se non vuoi impostare adesso):</td><td><input type=\"password\" name=\"ClientId\" id=\"ClientId\" value=\"\" class=\"regular-text\" /></td></tr>";
	post += "<tr><td><b>ClientSecret PAYPAL </b>(lascia libero se non vuoi impostare adesso):</td><td><input type=\"password\" name=\"ClientSecret\" id=\"ClientSecret\" value=\"\" class=\"regular-text\" /></td></tr>";

	post += "<tr><td><input class=\"button-primary\" type=\"submit\" onclick=\"registration_membership()\" name=\"registration_membership\" value=\"Registration\" /></td></tr>"

	return post;

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

function manage_roles_view()
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>ROLES MANAGEMENT</span></h2>";
	post += "<div class=\"inside\"><table class=\"form-table\">";

	extra_post = init_roles();

	post += extra_post;
	
	post += "</table></form></div>";


	$("#maindiv").html(post);

}

function add_roles_view()
{
		var post = '';

	post += "<h2 class=\"hndle\"><span>ADD ROLES</span></h2>";
	post += "<div class=\"inside\"><table class=\"form-table\">";

	post += "<tr><td><b>Ruolo</b></td><td><input type=\"text\" name=\"name\" id=\"name\" value=\"\" class=\"regular-text\" /></td></tr>";
	
	post += "<tr><td><b>Permessi Wordpress: </b></td><td>";

		post += "<select id=\"permission_select\"><option value=\"1\">Edithor</option>";
		post += "<option value=\"2\">Author</option>";
		post += "<option value=\"3\">Subscriber</option>";
		post += "</select>";

	post += "<tr><td><input class=\"button-primary\" type=\"submit\" onclick=\"add_roles()\" name=\"add_roles\" value=\"Aggiungi\" /></td></tr>";
	post += "<tr><td><a class=\"pointer\" onclick=\"manage_roles_view()\">Back</a></td></tr>";
	post += "</table></form></div>";


	$("#maindiv").html(post);
}

function edit_roles_view(id)
{
	var post = '';

	var role = role_by_id(id);

	post += "<h2 class=\"hndle\"><span>EDIT ROLES</span></h2>";
	post += "<div class=\"inside\"><table class=\"form-table\">";

	post += "<tr><td><b>Ruolo</b></td><td><input type=\"text\" name=\"name\" id=\"name\" value=\""+role.name+"\" class=\"regular-text\" /></td></tr>";
	
	post += "<tr><td><b>Permessi Wordpress: </b></td><td>";

		post += "<select id=\"permission_select\"><option value=\"1\">Edithor</option>";
		post += "<option value=\"2\">Author</option>";
		post += "<option value=\"3\">Subscriber</option>";
		post += "</select>";

		$("#permission_select").val(role.id_permission);

	post += "<tr><td><input class=\"button-primary\" type=\"submit\" onclick=\"edit_roles("+role.id+")\" name=\"edit_roles\" value=\"Modifica\" /></td></tr>";
	post += "<tr><td><a class=\"pointer\" onclick=\"manage_roles_view()\">Back</a></td></tr>";
	post += "</table></form></div>";


	$("#maindiv").html(post);
}

function remove_roles_view(id)
{
	var post = '';

	var role = role_by_id(id);

	post += "<h2 class=\"hndle\"><span>DELETE ROLES</span></h2>";
	post += "<div class=\"inside\"><table class=\"form-table\">";

	post += "<tr><td>Sei sicuro di voler eliminare il ruolo "+role.name+"?</td></tr>";

	post += "<tr><td><input class=\"button-danger\" type=\"submit\" onclick=\"delete_roles("+role.id+")\" name=\"edit_roles\" value=\"Elimina\" /></td></tr>";
	post += "<tr><td><button onclick=\"manage_roles_view()\">Annulla</button></td></tr>";

	post += "</table></form></div>";


	$("#maindiv").html(post);
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
        var immagineProfilo = path+user.avatar;   
    else 
        var immagineProfilo = "http://placehold.it/350x350";

    img += "<li><b><i class=\"zmdi zmdi-image\"></i> Current Profile Image: </b><br><br><img id=\"img-settings\" src=\"" + immagineProfilo +"\" class=\"pv-main\"/></li>";

    var post = '';
	post += "<form id=\"upload_form\" enctype=\"multipart/form-data\" method=\"post\">";
	post += "<b><i class=\"zmdi zmdi-image-o\"></i> Change Your Profile Image: </b><br>";
  	post += "<input type=\"file\" name=\"file1\" id=\"file1\">";
  	post += "<input type=\"button\" class=\"button-primary\" value=\"Upload File\" onclick=\"uploadAvatar("+user.id+")\"><br>";
  	post += "<br><progress id=\"progressBar\" value=\"0\" max=\"100\" style=\"width:300px;\"></progress>";
  	post += "<h3 id=\"status\"></h3>";
  	post += "<p id=\"loaded_n_total\"></p>";
	
	post += "</form>";
	post += "</li>";

	$("#profilePhoto").html(img);

	post += "<tr><td><div class=\"pmo-contact\" id=\"pmo-contact\"><ul  id=\"profilePhoto\"> </ul></div></td></tr>";

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

function membership_config_view()
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>MEMBERSHIP CONFIG</span></h2>";
	post += "<div class=\"inside\"><table class=\"form-table\">";

	extra_post = init_edit_membership_config();

	post += extra_post;

	post += "<tr><td><input class=\"button-primary\" type=\"submit\" onclick=\"edit_membership_config()\" name=\"edit_membership_config\" value=\"Edit\" /></td></tr>";
	post += "<tr><td></td></tr>";
	post += "<tr></tr>";
	post += "<tr><td><input class=\"button-danger\" type=\"submit\" onclick=\"delete_membership_forever()\" name=\"delete_membership_forever\" value=\"DELETE MEMBERSHIP\" /></td></tr>";

	post +=" </table></form></div>";

	$("#maindiv").html(post);

}

function init_edit_membership_config()
{
	var post = '';

    //inserisco i dati in un json
	object = JSON.stringify({ r: 'IfMembershipExist' });

    $.post(path+"api/servo.php", { js_object: object }, 
	function(response)
	{
		var resp = jQuery.parseJSON(response);
		
		if(resp.response=="true")
		{
			for(var i in resp.membership)
				post = fill_config_membership(resp.membership[i]);

			localStorage.setItem('config_member', post);
		}
					
	});

	post = localStorage.getItem('config_member');

	return post;

}

function fill_config_membership(membership)
{
	var post = '';

	post += "<tr><td><b>Intestazione: </b></td><td><input type=\"text\" name=\"name\" id=\"name\" value=\""+membership.name+"\" class=\"regular-text\" /></td></tr>";
	post += "<tr><td><b>Sede Legale: </b></td><td><input type=\"text\" name=\"registered_office\" id=\"registered_office\" value=\""+membership.registered_office+"\" class=\"regular-text\" /></td></tr>";
	post += "<tr><td><b>Sede Operativa: </b></td><td><input type=\"text\" name=\"op_headquarter\" id=\"op_headquarter\" value=\""+membership.op_headquarter+"\" class=\"regular-text\" /></td></tr>";
	post += "<tr><td><b>P. Iva / C.F. (VAT):</b></td><td><input type=\"text\" name=\"VAT\" id=\"VAT\" value=\""+membership.VAT+"\" class=\"regular-text\" /></td></tr>";
	post += "<tr><td><b>Email: </b></td><td><input type=\"email\" name=\"email\" id=\"email\" value=\""+membership.email+"\" class=\"regular-text\" /></td></tr>";
	post += "<tr><td><b>Sito Web: </b></td><td><input type=\"text\" name=\"website\" id=\"website\" value=\""+membership.website+"\" class=\"regular-text\" /></td></tr>";
	post += "<tr><td><b>Quota Annuale: </b></td><td><input type=\"number\" step=\"0.01\" name=\"fee\" id=\"fee\" value=\""+membership.fee+"\" class=\"regular-text\" /></td></tr>";

	post += "<tr><td><b>Mese Start Quota: </b></td><td>";

		post += "<select id=\"range_fee\">";
		post += "<option value=\"1\">Gennaio</option>";
		post += "<option value=\"2\">Febbraio</option>";
		post += "<option value=\"3\">Marzo</option>";
		post += "<option value=\"4\">Aprile</option>";
		post += "<option value=\"5\">Maggio</option>";
		post += "<option value=\"6\">Giugno</option>";
		post += "<option value=\"7\">Luglio</option>";
		post += "<option value=\"8\">Agosto</option>";
		post += "<option value=\"9\">Settembre</option>";
		post += "<option value=\"10\">Ottobre</option>";
		post += "<option value=\"11\">Novembre</option>";
		post += "<option value=\"12\">Dicembre</option>";
		post += "</select>";

		$("#range_fee").val(membership.range_fee);

	post += "</td></tr>";

	post += "<tr><td><b>ClientId PAYPAL </b>:</td><td><input type=\"password\" name=\"ClientId\" id=\"ClientId\" value=\""+membership.ClientId+"\" class=\"regular-text\" /></td></tr>";
	post += "<tr><td><b>ClientSecret PAYPAL </b>:</td><td><input type=\"password\" name=\"ClientSecret\" id=\"ClientSecret\" value=\""+membership.ClientSecret+"\" class=\"regular-text\" /></td></tr>";

	return post;
}