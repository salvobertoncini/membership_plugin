/****************************************************************************************/
function _(el)
{
	return document.getElementById(el);
}

function uploadFile()
{
	var id_role = $("#role_select").val();

	$('#progressBar').show();
	var userLogged = JSON.parse(localStorage.getItem('userLogged'));
	var file = _("file1").files[0];
	// alert(file.name+" | "+file.size+" | "+file.type);
	var formdata = new FormData();
	formdata.append("file1", file);
	formdata.append("id_user", userLogged.id);
	formdata.append("id_role", id_role);
	var ajax = new XMLHttpRequest();
	ajax.upload.addEventListener("progress", progressHandler, false);
	ajax.addEventListener("load", completeHandler, false);
	ajax.addEventListener("error", errorHandler, false);
	ajax.addEventListener("abort", abortHandler, false);
	ajax.open("POST", path+"uploader.php");
	ajax.send(formdata);
}

function uploadAvatar(id)
{
	var userLogged = JSON.parse(localStorage.getItem('userLogged'));
	var file = _("file1").files[0];
	// alert(file.name+" | "+file.size+" | "+file.type);
	var formdata = new FormData();
	formdata.append("file1", file);
	formdata.append("id", id);
	var ajax = new XMLHttpRequest();
	ajax.upload.addEventListener("progress", progressHandler, false);
	ajax.addEventListener("load", completeHandler, false);
	ajax.addEventListener("error", errorHandler, false);
	ajax.addEventListener("abort", abortHandler, false);
	ajax.open("POST", path+"changeAvatar.php");
	ajax.send(formdata);
}

function progressHandler(event)
{
	_("loaded_n_total").innerHTML = "Uploaded "+event.loaded+" bytes of "+event.total;
	var percent = (event.loaded / event.total) * 100;
	_("progressBar").value = Math.round(percent);
	_("status").innerHTML = Math.round(percent)+"% uploaded... please wait";
}

function completeHandler(event)
{
	_("status").innerHTML = event.target.responseText;
	_("progressBar").value = 0;
}

function errorHandler(event)
{
	_("status").innerHTML = "Upload Failed";
}

function abortHandler(event)
{
	_("status").innerHTML = "Upload Aborted";
}

function fill_upload_button()
{
	var post = '';

	post += "<form id=\"upload_form\" enctype=\"multipart/form-data\" method=\"post\">";
  	post += "<input type=\"file\" name=\"file1\" id=\"file1\">";
  	
  	post += " <b>Visibilità: </b><select id=\"role_select\">";
		post += "<option value=\"1\">Socio Ordinario</option>";
		post += "<option value=\"2\">Socio Sostenitore</option>";
		post += "<option value=\"3\">Socio Onorario</option>";
		post += "<option value=\"4\">Direttivo</option>";
		post += "</select> ";
	
	post += "<br><br><input type=\"button\" class=\"button-primary\" value=\"Upload File\" onclick=\"uploadFile()\"><br>";
  	post += "<br><progress id=\"progressBar\" value=\"0\" max=\"100\" style=\"width:300px;\"></progress>";
  	post += "<h3 id=\"status\"></h3>";
  	post += "<p id=\"loaded_n_total\"></p>";
	
	post += "</form>";

	return post;
}

function fill_contents_table(userList)
{
	var post = '';

	post += "<table class=\"form-table\">";
	post += "<tr><td><b>#</b></td><td><b>Nome</b></td><td><b>Proprietario</b></td><td><b>Ruolo</b></td><td><b>Tipo</b></td><td><b>Contenuto</b></td><td><b>Delete</b></td></tr>";

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

		post += "<tr id="+userList[i].id+"><td>"+i+"</td><td>"+userList[i].oname+"</td><td>"+userList[i].name+" "+userList[i].surname+"</td><td>"+ruolo+"</td><td>"+userList[i].type+"</td><td><a href=\""+path+"/"+userList[i].path+"\">Download <i class=\"zmdi zmdi-download\"></i></a></td><td><button onclick=\"delete_item_view("+userList[i].id+")\"><i class=\"zmdi zmdi-delete\"></i></button></td></tr>";

	}

	post += "</table>"

	return post;

}

/****************************************************************************************/

function init_items_all()
{
	var post = '';

	//inserisco i dati in un json
	object = JSON.stringify({ r: 'AllItems' });

	ajaxPost(path+"api/servo.php", { js_object: object }, 
		function(response)
		{
			console.log(response);

			var resp = jQuery.parseJSON(response);
			
			if(resp.response=="true")
			{
				post = fill_contents_table(resp.items);
				localStorage.setItem('items', post);
			}
			else
			{
				post = "Nessun Contenuto da Visualizzare";
				localStorage.setItem('items', post);
			}
						
		});

	post = localStorage.getItem('items');

	return post;
}

function remove_item(id)
{
	//inserisco i dati in un json
	object = JSON.stringify({ r: 'removeItem', i: id });

	ajaxPost(path+"api/servo.php", { js_object: object }, 
		function(response)
		{
			console.log(response);

			var resp = jQuery.parseJSON(response);
			
			if(resp.response=="true")
			{
				alert("elemento rimosso con successo");
				items_view();
			}
			else
			{
				alert("errore rimozione elemento");
			}
						
		});
}

function new_item_upload()
{
	alert("download file");	
}

function upload_file()
{
	var userLogged = JSON.parse(localStorage.getItem('userLogged'));

	var string = localStorage.getItem('tmpItem');

	console.log("tmpItem: ");
	console.log(string);

    /*

    var splitted = splitSomething(string, ',');

    var stringa = createImageForServer(splitted);

    */

    //inserisco i dati in un json
	object = JSON.stringify({ r: 'uploadFile' , i: userLogged["id"], a: string });

    ajaxPost(path+"api/servo.php", { js_object: object }, 
		function(response)
		{
			var resp = jQuery.parseJSON(response);
			console.log(resp);

			if(resp.response=="true")
			{
				alert("file uploaded con successo");

				items_view();
			}
						
		});
}

function download_item(path)
{
	alert("download file");
}

function init_items_by_role(id_role)
{
	var post = '';

	//inserisco i dati in un json
	object = JSON.stringify({ r: 'ItemsByRole' , i: id_role });

	ajaxPost(path+"api/servo.php", { js_object: object }, 
		function(response)
		{
			console.log(response);

			var resp = jQuery.parseJSON(response);
			
			if(resp.response=="true")
			{
				post = fill_contents_by_role_table(resp.items);
				localStorage.setItem('items', post);
			}
			else
			{
				post = "Nessun Contenuto da Visualizzare";
				localStorage.setItem('items', post);
			}
						
		});

	post = localStorage.getItem('items');

	return post;	
}

function fill_contents_by_role_table(userList)
{
	var post = '';

	post += "<table class=\"form-table\">";
	post += "<tr><td><b>#</b></td><td><b>Nome</b></td><td><b>Proprietario</b></td><td><b>Ruolo</b></td><td><b>Tipo</b></td><td><b>Contenuto</b></td></tr>";

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

		post += "<tr id="+userList[i].id+"><td>"+i+"</td><td>"+userList[i].oname+"</td><td>"+userList[i].name+" "+userList[i].surname+"</td><td>"+ruolo+"</td><td>"+userList[i].type+"</td><td><a href=\""+path+"/"+userList[i].path+"\">Download <i class=\"zmdi zmdi-download\"></i></a></td></tr>";

	}

	post += "</table>"

	return post;
}