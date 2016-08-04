
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

function init_latest_news(id)
{
	var post = '';

	post += "<tr><td><h3>Latest News</h3></td></tr>";
	post += "<tr><td><b>User</b></td><td><b>Message</b></td></tr>";
	
	//bacheca
	var extra_post = init_message_dashboard(id);
	post += extra_post;

	return post;
}