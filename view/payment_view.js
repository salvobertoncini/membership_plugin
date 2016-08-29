function payments_made_view(id)
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>PAGAMENTI EFFETTUATI</span></h2>";
	post += "<div class=\"inside\"><table class=\"form-table\">";

	post += payments_made(id);

	post += "</table></div>";

	$("#maindiv").html(post);

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
