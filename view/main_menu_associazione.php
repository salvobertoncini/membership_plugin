<?php
	
	$plugin_name = basename(dirname(__DIR__));
	$plugin_url = WP_PLUGIN_URL . '/'. $plugin_name;

	echo "<script>var path = '".$plugin_url."/';</script>";
	echo "<script>var full_url = \"".'http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF']."\" ;</script>";

	wp_enqueue_style('style', $plugin_url . '/style.css' , false, '1.0', 'all');
	wp_enqueue_style('material-design-iconic-font', 'https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css' , false, '1.0', 'all');

?>

<h2><?php esc_attr_e( 'Ardeek 4 Associazioni Plugin', 'wp_admin_style' ); ?></h2>

<div class="wrap">

	<div id="icon-options-general" class="icon32"></div>

	<div id="poststuff">

		<div id="post-body" class="metabox-holder columns-2">

			<!-- main content -->
			<div id="post-body-content">

				<div class="meta-box-sortables ui-sortable">

					<div class="postbox" id="maindiv">
						<?php /* MAIN DIV, GESTITO DA JS */ ?>
					</div>
					<!-- .postbox -->

				</div>
				<!-- .meta-box-sortables .ui-sortable -->

			</div>
			<!-- post-body-content -->

			<!-- sidebar -->
			<div id="postbox-container-1" class="postbox-container">

				<div class="meta-box-sortables">

					<div class="postbox" id="secdiv">
						<?php /* DIV SECONDARIO, GESTITO DA JS */ ?>

					</div>
					<!-- .postbox -->

				</div>
				<!-- .meta-box-sortables -->

			</div>
			<!-- #postbox-container-1 .postbox-container -->

		</div>
		<!-- #post-body .metabox-holder .columns-2 -->

		<br class="clear">
	</div>
	<!-- #poststuff -->

</div> <!-- .wrap -->

<script>
	$ = jQuery.noConflict();
</script>

<!--
<script <?php echo "src=".$plugin_url."/api/api.js"; ?> ></script>
<script <?php echo "src=".$plugin_url."/view/view.js"; ?> ></script>
<script <?php echo "src=".$plugin_url."/view/items_view.js"; ?> ></script>
<script <?php echo "src=".$plugin_url."/view/login_view.js"; ?> ></script>
<script <?php echo "src=".$plugin_url."/view/membership_view.js"; ?> ></script>
<script <?php echo "src=".$plugin_url."/view/payment_view.js"; ?> ></script>
<script <?php echo "src=".$plugin_url."/view/registration_view.js"; ?> ></script>
<script <?php echo "src=".$plugin_url."/view/messages_view.js"; ?> ></script>
<script <?php echo "src=".$plugin_url."/controller/routing.js"; ?> ></script>
<script <?php echo "src=".$plugin_url."/controller/registration.js"; ?> ></script>
<script <?php echo "src=".$plugin_url."/controller/login.js"; ?> ></script>
<script <?php echo "src=".$plugin_url."/controller/forgot_password.js"; ?> ></script>
<script <?php echo "src=".$plugin_url."/controller/membership.js"; ?> ></script>
<script <?php echo "src=".$plugin_url."/controller/messages.js"; ?> ></script>
<script <?php echo "src=".$plugin_url."/controller/items.js"; ?> ></script>
<script <?php echo "src=".$plugin_url."/controller/payment.js"; ?> ></script>
-->