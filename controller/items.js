function init_items_all()
{
	var post = '';

	//inserisco i dati in un json
	object = JSON.stringify({ r: 'AllItems' });

	$.post(path+"api/servo.php", { js_object: object }, 
		function(response)
		{
			console.log(response);

			var resp = jQuery.parseJSON(response);
			
			if(resp.response=="true")
			{
				post = fill_items_table(resp.items);
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

function fill_items_table(userList)
{
	var post = '';

	var img = '';

    img = " <button class=\"btn btn-success waves-effect\" id=\"confirmButton\" onclick=\"upload_file()\">Upload</button> ";

    $('#pmo-contact').append(img);
    $('#confirmButton').hide();
    $('#deleteButton').hide();


$('#f').on('change', function(ev) {
    var f = ev.target.files[0];
    var fr = new FileReader();
    
    fr.onload = function(ev2) {
        console.dir(ev2);
        localStorage.setItem('tmpItem', ev2.target.result);

        console.log("tmpItem: ");
		console.log(ev2.target.result);
    };
    
    fr.readAsDataURL(f);

    $('#confirmButton').show();
    $('#deleteButton').show();
});

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

function remove_item(id)
{
	//inserisco i dati in un json
	object = JSON.stringify({ r: 'removeItem', i: id });

	$.post(path+"api/servo.php", { js_object: object }, 
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

    $.post(path+"api/servo.php", { js_object: object }, 
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

