$(function() {

    route();

});

function route()
{
    var userLogged = JSON.parse(localStorage.getItem('userLogged'));

    //verifico se utente loggato
    if (userLogged != null && userLogged != "")
    {
        console.log(userLogged);
        //verifico se utente amministratore o semplice membro associazione
        if(userLogged.id_role == "4")
        {
            //vado a pagina amministratore
            admin_view();
        }
        else
        {
            //vado a pagina membro associazione
            user_view();
        }
    }
    else
    {
        //login screen
        login_view();
    }
}