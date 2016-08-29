function items_view()
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>ITEMS MANAGEMENT</span></h2>";
	post += "<div class=\"inside\"><table class=\"form-table\">";

	post += fill_upload_button();

	post += init_items_all();
	
	post += "</table></form></div>";

	$('#progressBar').hide();
	$("#maindiv").html(post);

}

function delete_item_view(id)
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>DELETE ITEMS</span></h2>";
	post += "<div class=\"inside\">";

	post += "Sei sicuro di voler rimuovere questo elemento?<br><br>";
	post += "<tr><td><button onclick=\"items_view()\">Annulla</button></td> ";
	post += "<td><button onclick=\"remove_item("+id+")\">Rimuovi</td></tr>";

	post += "</div>";

	$("#maindiv").html(post);

}

function content_by_role_view(id_role)
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>ITEMS</span></h2>";
	post += "<div class=\"inside\"><table class=\"form-table\">";

	post += init_items_by_role(id_role);

	post += "</table></div>";

	$("#maindiv").html(post);
}
