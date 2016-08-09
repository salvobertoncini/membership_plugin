 #DA CHIEDERE A PEPPARRIGO

* hosting messinagiovane.org e joyfilm.org

* consigli acquisti amazon?

##COSE DA FARE

* best practice per il naming del plugin
 
* accedere alle variabili dell'installazione di wordpress (prefisso database, db_user, db_password, db_host) attraverso le api di wordpress (preferibilmente, in alternativa momentaneamente può essere richiamato ../../../wp-config.php, e FORSE si trova tutto in ../../wp-load.php)

* installazione e disinstallazione plugin, e aggiornamento

##RISORSE

/my-plugin-name
	my-plugin-name.php
	uninstall.php
	/admin
	/js
	/css
	/images
	/includes
	/settings

Use WordPress' APIs instead of using direct SQL where possible. For example, use get_posts() or new WP_Query() instead of SELECT * FROM {$wpdb->prefix}_posts.

Do not hardcode the WordPress database table prefix (usually "wp_") into your Plugins. Be sure to use the $wpdb->prefix variable instead.

