 #DA CHIEDERE A PEPPARRIGO

* migrare senza problemi db da mysql a wordpress

* hosting messinagiovane.org

* consigli acquisti amazon?



best practice per il naming del plugin
 
accedere alle variabili dell'installazione di wordpress (prefisso database, db_user, db_password, db_host) attraverso le api di wordpress (preferibilmente, in alternativa momentaneamente può essere richiamato ../../../wp-config.php, e FORSE si trova tutto in ../../wp-load.php)

/my-plugin-name
     my-plugin-name.php
     uninstall.php
     /admin
     /js
     /css
     /images
     /includes
     /settings

installazione e disinstallazione plugin, e aggiornamento
