var path = '../wp-content/plugins/wpardeekmembership/';

function ajaxPost(url, data, success)
{
	$.ajax({
		type: 'POST',
		url: url,
		data: data,
		success: success,
		async:false
	});
}

function testing()
{
    //inserisco i dati in un json
    object = JSON.stringify({ r: 'Testing' });

    ajaxPost(path+"api/servo.php", {js_object: object},
        function(response)
        {
            console.log(response);

            var resp = jQuery.parseJSON(response);

            if(resp.response=="true")
            {
                console.log(resp.data);
            }
        });
}

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
	ajaxPost(path+"api/servo.php", { js_object: object },
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

function create_password()
{
	var rand = function()
	{
    	return Math.random().toString(36).substr(2); // remove `0.`
	};

	return rand();
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

function today()
{
	//se oggi è l'ultimo giorno del mese prestabilito per pagare la quota annuale,
	//allora azzera in automatico il paid di ogni users, così appare la notifica.

	//curyear()
	//if (curyear, mese) == true, azzera pagamento, curyear++

	//inserisco i dati in un json
	object = JSON.stringify({ r: 'Today' });

	ajaxPost(path+"api/servo.php", { js_object: object },
		function(response)
		{
			var resp = jQuery.parseJSON(response);

			if(resp.response=="true")
			{
				var d = new Date();
				if(isLastDay(resp.paid, resp.range_fee, d))
				{
					update_today(resp.paid);
					restart_all_payment();
				}

			}

		});
}

function update_today(year)
{
	//inserisco i dati in un json
	object = JSON.stringify({ r: 'UpdateToday', y: year });

	ajaxPost(path+"api/servo.php", { js_object: object },
		function(response)
		{
			console.log(response);

			var resp = jQuery.parseJSON(response);
		});
}

function isLastDay(y, m, d)
{
    var d1 = (m < 11) ? new Date(y, m + 1, 0) : new Date(y, 0, 0);
    var d2 = new Date(y, m, d);
    return (d1.getTime() === d2.getTime());
}
