function forgot_password()
{
	var email = $("#email").val();

	if(check_something(email))
	{
		//invio email con procedura recupero password
		// send_forget_password_email();
		alert("email inviata con successo");
	}
	else
		alert("alcuni campi sono vuoti.");
}