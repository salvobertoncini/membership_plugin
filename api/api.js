var path = '../wp-content/plugins/wpassociazione/';

function check_something(value)
{
	if(value != '' && value != null)
		return true;
	else
		return false;
}

function check_if_exist_email(email)
{
	//inserisco i dati in un json
	object = JSON.stringify({ r: 'CheckExistEmail', e: email });

	//verifico tramite db la mail
	$.post(path+"api/servo.php", { js_object: object }, 
		function(response)
		{
			console.log(response);

			var resp = jQuery.parseJSON(response);

			//se esiste una mail, restituisco false
			//se la mail non esiste, restituisco true
			if(resp.response=="true")
				localStorage.setItem('email_exist_value', "false");
			else
				localStorage.setItem('email_exist_value', "true");
		});

	var ret = localStorage.getItem('email_exist_value');
	console.log(ret);
	return ret;
}

function check_valid_password(password)
{
	// at least one number, one lowercase and one uppercase letter
	// at least 8 characters
	var re = /(?=.*[a-zA-Z])(?=.*[0-9]).{8,}/;

	return re.test(password);
}

function create_token()
{
	var rand = function()
	{
    	return Math.random().toString(36).substr(2); // remove `0.`
	};

	return rand() + rand();
}

function splitSomething(data, split)
{
    var arr = data.split(''+split);
    return arr;
}

function createImageForServer(array)
{
    var stringa = '';

    if(array.length == 2)
        stringa = array[1];
    else
    {
        var i = 1;
        while (i < array.length)
            stringa = array[i]+',';
        stringa.slice(0,-1);
    }

    return stringa;
}

function clearImageDiv()
{
    $('.i').hide();
    $('.deleteButton').hide();
}

function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i< sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if(sParameterName[0] == sParam)
            return decodeURIComponent(sParameterName[1]);
    }
}