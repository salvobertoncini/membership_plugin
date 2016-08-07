#TODO

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

##COSE DA FARE

* e.preventDefault()
* prefisso di wordpress, e "subprefisso" configurabile manualmente
* ricevuta del pagamento
* abbellire app