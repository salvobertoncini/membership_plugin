function registration_step_0()
{
	var name = $("#name").val();
	var surname = $("#surname").val();

	$("#birthday").datepicker({ dateFormat: 'yyyy, mm, dd' });
	var birthday = $("#birthday").val();

	var email = $("#email").val();
	var password = $("#password").val();

	if(check_something(name) && check_something(surname) && check_something(birthday) && check_something(email) && check_something(password))
	{
		if(check_if_exist_email(email) == "true")
		{
			if(check_valid_password(password))
			{
				var user = 
				{ 
					"name": name, 
					"surname": surname, 
					"birthday": birthday, 
					"email": email, 
					"password": password 
				};

				localStorage.setItem('regstep1', JSON.stringify(user));

				registration_view_2();
			}
			else
			{
				alert("password non valida. inserisci almeno un carattere minuscolo, uno maiuscolo e un numero, lunghezza minima 8 caratteri");
			}
		}
		else
		{
			alert("email già presente");
			$("#email").val("");
		}
		
	}
	else
	{
		alert("alcuni campi sono vuoti.");
	}
}

function registration_step_1()
{
	var website = $("#website").val();
	var education = $("#education").val();
	var skills = $("#skills").val();
	var bio = $("#bio").val();
	if ($('#i').attr('src') != undefined && $('#i').attr('src') != 'undefined' && $('#i').attr('src') != '')
	{
		var avatar = $('#i').attr('src');
		var splitted = splitSomething(avatar, ',');
		var avatar = createImageForServer(splitted);
	}
	else
		var avatar = 'undefined';



	if(check_something(website) && check_something(education) && check_something(skills) && check_something(bio))
	{

		token = create_token();

		var user = 
		{ 
			"website": website, 
			"education": education, 
			"skills": skills, 
			"bio": bio, 
			"avatar": avatar 
		};

		localStorage.setItem('regstep2', JSON.stringify(user));

		registration_step_2();

	}
	else
	{
		alert("alcuni campi sono vuoti.");
	}
}

function registration_step_2()
{

	//recupero dati salvati durante la registrazione
	var user = JSON.parse(localStorage.getItem('regstep1'));
	var user2 = JSON.parse(localStorage.getItem('regstep2'));

	//inserisco i dati in un json
	object = JSON.stringify({ r: 'Registration', nome:  user.name, cognome: user.surname, email: user.email , password: user.password, birthday: user.birthday, website: user2.website, education: user2.education, avatar: user2.avatar, bio: user2.bio, skills: user2.skills, verified: 0, enabled: 1, paid: 0, id_role: 1, id_permission: 3 , token: token});

	$.post(path+"api/servo.php", { js_object: object }, 
		function(response)
		{
			console.log(response);

			var resp = jQuery.parseJSON(response);
			
			if(resp.response=="true")
			{
				registration_success();
			}
						
		});

}