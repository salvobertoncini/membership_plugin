function items_view()
{
	var post = '';

	post += "<h2 class=\"hndle\"><span>ITEMS MANAGEMENT</span></h2>";
	post += "<div class=\"inside\"><table class=\"form-table\">";

	extra_post = init_items_all();

	post += extra_post;
	
	post += "</table></form></div>";


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
