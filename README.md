# membership_plugin
Wordpress plugin for membership. Php &amp; jQuery.

##COSE FATTE

###22 luglio 2016

* impostazione base plugin, con separazione in due tabelle responsive
* login che distingue admin da user normali
* logout, che pulisce il localStorage

###25 luglio 2016

* creare view.js dove mettere le varie view
* base interfaccia soci nel pannello admin

###26 luglio 2016

* pannello admin
	- soci
	- messaggi
	- contenuti 
	- pagamenti

###27 luglio 2016

* ultimati soci e messaggi

* Ad ogni utente possono essere recapitate delle info da visualizzare nella Dashboard (es. manifestazioni e conferenze) in base al ruolo.

* Ogni utente ha la possibilità di inserire informazioni utili come nome, cognome, email, biografia, sito web, formazione, competenze.

###29 luglio 2016

* banner "pagamenti" nella dashboard, ancora senza paypal però
* fixato bug immagine profilo dashboard
* fixato routing
* fixato pagamento, aggiunto pagamento manuale per socio non ancora pagato
* fixato edit_member_view
* fixato bug immagine change_profile_image su edit_member
* fixata grafica messaggi nella dashboard
* fixato bug login

* inizio pannello utente, non admin

* Gestione utenti:
	- Creazione
	- Blocco
	- Eliminazione
	- Ruoli
		- Permessi (editor, author, subscriber) ????
	- Gestione pagamenti

* GITHUB

###1 agosto 2016

* pagamento paypal

###2 agosto 2016

* fixato pagamento paypal

* fixata registrazione

* SUDDIVISIONE DELLE VIEW

* setting iniziale associazione per:
	- intestazione associazione
	- quota associativa annuale
	- range anno associativo per il pagamento (solitamente anno solare)

* email per conferma per l'iscrizione
* email per password smarrita

###3 agosto 2016

* gestione e personalizzazione ruoli

* gestione quote anno solare

###4 agosto 2016

* inserimento contenuti

* fixato caricamento immagine personale, adattato a nuovo inserimento contenuti

* visualizzazione contenuti in base ai permessi

* creazione shortcode [wpardeek] per visualizzare contenuti homepage direttamente da sito web, e non da dashboard.

###9 agosto 2016

* async fix

###30 agosto 2016

* percorsi da assoluti a relativi
* bug fixing

###1 settembre 2016

* path fixing
* wp_enqueue for script and link
* installazione e disinstallazione plugin

###2 settembre 2016

* path fixing on server

###12 settembre 2016

* https://www.youtube.com/watch?v=_uk_clTGWlE

###14 settembre 2016

* PER EVITARE ON CLICK SU BOTTONE non appena caricata la vista, cioè dopo aver inserito l'html nella pagina, se la vista caricata corrisponde a admin_view, aggiungere la funzione all'evento on click del bottone per uploadare immagini wordpress. (funzione statica o anche dinamica passando come parametro l'id dell'oggetto). 

###15 settembre 2016

* upload from wordpress

###19 settembre 2016

* bug fixing auto increment query
* password sicure bcrypt
* bug fixing registrazione utente
* bug fixing login utente
* bug fixing pagamenti utente
* bug fixing messaggi
* bug fixing rimozione elemento "content / item"

##COSE DA FARE

* ricevuta del pagamento
* aggiornamento plugin
* abbellire app

###Bug fixing

