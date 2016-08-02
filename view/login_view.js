function login_view()
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>LOGIN</span></h2>";
	post += "<div class=\"inside\"><table class=\"form-table\">";
	post += "<tr><td><label for=\"email\">Email</label></td><td><input type=\"email\" name=\"email\" id=\"email\" value=\"\" class=\"regular-text\" /><br></td></tr>";
	post += "<tr><td><label for=\"password\">Password</label></td><td><input type=\"password\" name=\"password\" id=\"password\" value=\"\" class=\"regular-text\" /><br></td></tr>";
	post += "<tr><td><input class=\"button-primary\" type=\"submit\" onclick=\"try_login()\" name=\"login\" value=\"Log In\" /></td></tr><tr><td>";
	post += "<a class=\"pointer\" onclick=\"registration_view()\">Registration</a> | <a class=\"pointer\" onclick=\"forget_password_view()\">Forget Password?</a> | <a class=\"pointer\" onclick=\"donate_view()\">Donate</a> </td></tr></table></form></div>";

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
	post += "<a class=\"pointer\" onclick=\"login_view()\">Login</a> | <a class=\"pointer\" onclick=\"donate_view()\">Donate</a> </td></tr></table></form></div>";


	$("#maindiv").html(post);
	$("#secdiv").hide();
}

function donate_view()
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>DONATE</span></h2>";
	post += "<div class=\"inside\"><table class=\"form-table\">";

	post += "<tr><td>Offrici un caffè.</td></tr>";
	
	post += "<tr><td><a class=\"pointer\" onclick=\"login_view()\">Login</a> | <a class=\"pointer\" onclick=\"registration_view()\">Registration</a> </td></tr></table></form></div>";


	$("#maindiv").html(post);
	$("#secdiv").hide();
}
