/****************************************************************************************/

$(document).on('submit','form',function(e){
	e.preventDefault();
	$form = $(this);
	uploadImage($form);
});

function uploadImage($form){
	$form.find('.progress-bar').removeClass('progress-bar-success')
								.removeClass('progress-bar-danger');
	var formdata = new FormData($form[0]); //formelement
	var request = new XMLHttpRequest();
	//progress event...
	request.upload.addEventListener('progress',function(e){
		var percent = Math.round(e.loaded/e.total * 100);
		$form.find('.progress-bar').width(percent+'%').html(percent+'%');
	});
	//progress completed load event
	request.addEventListener('load',function(e){
		$form.find('.progress-bar').addClass('progress-bar-success').html('upload completed....');
	});
	request.open('post', 'contents/uploader.php');
	request.send(formdata);
	$form.on('click','.cancel',function(){
		request.abort();
		$form.find('.progress-bar')
			.addClass('progress-bar-danger')
			.removeClass('progress-bar-success')
			.html('upload aborted...');
	});
}

function fill_upload_button()
{
	var post = '';

	post += "<form action=\"#\"><input type=\"file\" name=\"image\" >";
	post += "<button bclass=\"btn btn-sm btn-info upload\" type=\"submit\">Upload</button>";
	post += "<button type=\"button\" class=\"btn btn-sm btn-danger cancel\">Cancel</button>";
	post += "<div class=\"progress progress-striped active\"><div class=\"progress-bar\" style=\"width:0%\"></div></div>";
	post += "</form>";

	return post;
}

function fill_contents_table(userList)
{
	var post = '';

	post += fill_upload_button();

	post += fill_items_table(userList);

	return post;

}

/****************************************************************************************/

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

function fill_items_table(userList)
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
