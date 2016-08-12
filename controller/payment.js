$(function() {

	init_paypal_payment();

});

function init_paypal_payment()
{

	var success = GetURLParameter("success");
	var paymentId = GetURLParameter("paymentId");
	var token = GetURLParameter("token");
	var PayerID = GetURLParameter("PayerID");
	var amount = GetURLParameter("amount");

	if(success=="true")
	{
		//inserisco i dati in un json
		object = JSON.stringify({ r: 'InitPaypalPayment', s: true, i: paymentId, t: token, p: PayerID });

		ajaxPost(path+"api/servo.php", {js_object: object},
			function(response)
			{
				console.log(response);

				var resp = jQuery.parseJSON(response);

				if(resp.response=="true")
				{
					//registro nel db la transazione
    				var userLogged = JSON.parse(localStorage.getItem('userLogged'));
					try_to_pay(userLogged.id, amount, paymentId, PayerID, token);
				}
			});
	}
	if(success=="false")
		alert("pagamento non effettuato con successo");
}

function init_payment_all()
{

	var post = '';

	//inserisco i dati in un json
	object = JSON.stringify({ r: 'AllPayments' });

	ajaxPost(path+"api/servo.php", { js_object: object },
		function(response)
		{
			console.log(response);

			var resp = jQuery.parseJSON(response);

			if(resp.response=="true")
			{
				post = fill_payments_table(resp.payments);
				$('#restart_payment_button').show();
				localStorage.setItem('payments', post);
			}
			else
			{
				post = "Nessun Contenuto da Visualizzare";
				$('#restart_payment_button').hide();
				localStorage.setItem('payments', post);
			}

		});

	post = localStorage.getItem('payments');

	return post;

}

function fill_payments_table(list)
{
	var post = '';

	post += "<table class=\"form-table\">";
	post += "<tr><td><b>#</b></td><td><b>Nome</b></td><td><b>Data</b></td><td><b>Informazioni</b></td><td><b>Delete</b></td></tr>";

	for (var i in list)
		post += "<tr id="+list[i].id+"><td>"+i+"</td><td>"+list[i].name+" "+list[i].surname+"</td><td>"+list[i].data+"</td><td>"+list[i].information+"</td><td><button onclick=\"delete_payment_view("+list[i].id+")\"><i class=\"zmdi zmdi-delete\"></i></button></td></tr>";

	post += "</table>"

	return post;

}

function remove_payment(id)
{
	//inserisco i dati in un json
	object = JSON.stringify({ r: 'removePayment', i: id });

	ajaxPost(path+"api/servo.php", { js_object: object },
		function(response)
		{
			console.log(response);

			var resp = jQuery.parseJSON(response);

			if(resp.response=="true")
			{
				alert("pagamento rimosso con successo");
				payment_management_view();
			}
			else
			{
				alert("errore rimozione pagamento");
			}

		});
}

function restart_all_payment()
{
	//inserisco i dati in un json
	object = JSON.stringify({ r: 'restartAllPayment' });

	ajaxPost(path+"api/servo.php", { js_object: object },
		function(response)
		{
			console.log(response);

			var resp = jQuery.parseJSON(response);

			if(resp.response=="true")
			{
				alert("operazione effettuata con successo");
				payment_management_view();
			}
			else
			{
				alert("errore nell'operazione di azzeramento");
			}

		});
}

function remember_payment(paid)
{
	var post = '';

	if(paid=="0")
		post += "<tr><td>Devi effettuare il pagamento della quota associativa. <br><button onclick=\"get_payment_view()\">Effettua il pagamento</button></td></tr>";

	return post;
}

function admin_pay_user_payment()
{
	var userLogged = JSON.parse(localStorage.getItem('userLogged'));

	var id = $('#user_select').val();

	var amount = "12";
	var paymentId = "";
	var PayerID = "";
	var token = "pagamento effettuato manualmente da admin "+userLogged.name+" "+userLogged.surname;

	//inserisco i dati in un json
	object = JSON.stringify({ r: 'PaymentWithId', i: id, a: amount, y: paymentId, p: PayerID, t: token});

	ajaxPost(path+"api/servo.php", { js_object: object },
		function(response)
		{
			console.log(response);

			var resp = jQuery.parseJSON(response);

			if(resp.response=="true")
			{

					console.log("PAGAMENTO: ");
					console.log(resp.data);
				//AGGIORNO PAID IN USER

				//inserisco i dati in un json
				object = JSON.stringify({ r: 'RefreshPaidUserId', i: id});

				ajaxPost(path+"api/servo.php", { js_object: object },
					function(response)
					{
						console.log(response);

						var resp = jQuery.parseJSON(response);

						if(resp.response=="true")
						{
							alert("pagamento effettuato con successo");

							var user = JSON.parse(localStorage.getItem('userLogged'));

							user.paid = 1;

							//salvo nel localStorage l'Utente
							localStorage.setItem('userLogged', JSON.stringify(user));

							payment_management_view();
						}

					});
			}

		});
}

function try_to_pay(id, amount, paymentId, PayerID, token)
{
	//inserisco i dati in un json
	object = JSON.stringify({ r: 'PaymentWithId', i: id, a: amount, y: paymentId, p: PayerID, t: token});

	ajaxPost(path+"api/servo.php", { js_object: object },
		function(response)
		{
			console.log(response);

			var resp = jQuery.parseJSON(response);

			if(resp.response=="true")
			{
				//AGGIORNO PAID IN USER

				//inserisco i dati in un json
				object = JSON.stringify({ r: 'RefreshPaidUserId', i: id});

				ajaxPost(path+"api/servo.php", { js_object: object },
					function(response)
					{
						console.log(response);

						var resp = jQuery.parseJSON(response);

						if(resp.response=="true")
						{
							alert("pagamento effettuato con successo");

							var user = JSON.parse(localStorage.getItem('userLogged'));

							user.paid = 1;

							//salvo nel localStorage l'Utente
							localStorage.setItem('userLogged', JSON.stringify(user));

							//route();
							window.location = 'http://127.0.0.1:81/wordpress/wp-admin/options-general.php?page=wpardeekmembership';
						}

					});
			}

		});
}

function init_user_for_payment()
{
	//inserisco i dati in un json
	object = JSON.stringify({ r: 'AllUsersNotPaid'});

	ajaxPost(path+"api/servo.php", { js_object: object },
		function(response)
		{
			console.log(response);

			var resp = jQuery.parseJSON(response);

			if(resp.response=="true")
			{
				post = fill_user_for_payment(resp.userList);
				$('#admin_pay_user_payment').show();
				localStorage.setItem('tmpPost', post);
			}
			else
			{
				post = "Tutti gli utenti hanno già pagato";
				$('#admin_pay_user_payment').hide();
				localStorage.setItem('tmpPost', post);
			}

		});

	post = localStorage.getItem('tmpPost');

	return post;
}

function fill_user_for_payment(userList)
{
	var post = '';

	post += "<select id=\"user_select\">";

	for (var i in userList)
		post += "<option value=\""+userList[i].id+"\">"+userList[i].name+" "+userList[i].surname+" <i class=\"zmdi zmdi-block\"></i></option>";

	post += "</select>";

	return post;
}

function payments_made(id)
{
	//inserisco i dati in un json
	object = JSON.stringify({ r: 'UsersPaymentsMade', i:id});

	ajaxPost(path+"api/servo.php", { js_object: object },
		function(response)
		{
			console.log(response);

			var resp = jQuery.parseJSON(response);

			if(resp.response=="true")
			{
				post = fill_users_payments_made(resp.payments);
				localStorage.setItem('tmpPost', post);
			}
			else
			{
				post = "Nessun pagamento effettuato.";
				localStorage.setItem('tmpPost', post);
			}

		});

	post = localStorage.getItem('tmpPost');

	return post;

}

function fill_users_payments_made(list)
{
	var post = '';

	post += "<table class=\"form-table\">";

	post += "<tr><td><b>#</b></td><td><b>Nome</b></td><td><b>Data</b></td><td><b>Informazioni</b></td><td><b>Ricevuta Pagamento</b></td></tr>";

	for (var i in list)
		post += "<tr id="+list[i].id+"><td>"+i+"</td><td>"+list[i].name+" "+list[i].surname+"</td><td>"+list[i].data+"</td><td>"+list[i].information+"</td><td><button onclick=\"print_quittance("+list[i].id+")\"><i class=\"zmdi zmdi-file\"></button></td></tr>";

	post += "</table>"

	return post;
}

function print_quittance(id)
{
	alert("Stai stampando la ricevuta con id: "+id);
}

function try_paypal_payment(id)
{
	//inserisco i dati in un json
	object = JSON.stringify({ r: 'TryPaypalPayment', i:id});

	ajaxPost(path+"api/servo.php", { js_object: object },
		function(response)
		{
			console.log(response);

			var resp = jQuery.parseJSON(response);

			if(resp.response=="true")
			{
				//pagamento riuscito
				window.location = resp.test;

			}
			else
			{
				//pagamento non riuscito
				alert("errore nel pagamento");
			}

		});
}
