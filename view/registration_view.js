
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

