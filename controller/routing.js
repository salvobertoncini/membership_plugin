$(function() {

    testing();
    init_the_plugin();

});

function testing()
{
    //inserisco i dati in un json
    object = JSON.stringify({ r: 'Testing' });

    $.post(path+"api/servo.php", {js_object: object},
        function(response)
        {
            console.log(response);

            var resp = jQuery.parseJSON(response);

            if(resp.response=="true")
            {
                alert(resp.data);
            }
        });
}

function init_the_plugin()
{
    today();

    var test = if_membership_exist();

    if(test == "true")
    {
        route();
    }
    else
    {
        init_membership_view();
    }
}

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

function if_membership_exist()
{
    var ret = '';

    //inserisco i dati in un json
    var object = JSON.stringify({ r: 'IfMembershipExist' });

    $.post(path+"api/servo.php", { js_object: object }, 
        function(response)
        {
            var resp = jQuery.parseJSON(response);

            if(resp.response=="true")
                localStorage.setItem('testing', true);
            else
                localStorage.setItem('testing', false);
        }
    );

    post = localStorage.getItem('testing');

    return post;
}