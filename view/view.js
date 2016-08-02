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
	post += "<div class=\"inside\"><ul><li class=\"pointer\" onclick=\"route()\">Home</li><li class=\"pointer\" onclick=\"membership_management()\">Soci</li><li onclick=\"messages_view()\" class=\"pointer\">Messaggi</li><li class=\"pointer\" onclick=\"items_view()\">Contenuti</li><li class=\"pointer\" onclick=\"payment_management_view()\">Pagamenti</li><li class=\"pointer\" onclick=\"membership_config_view()\">Config Associazione</li><br>";
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
