There are issues with your plugin code. Please read this ENTIRE email, address all listed issues, and reply to this email with your corrected code attached. It is required for you to read and reply to these emails, and failure to do so will result in significant delays with your plugin being accepted.

## Calling file locations poorly

The way your plugin is referencing other files is not going to work with all setups of WordPress.

When you hardcode in paths, or assume that everyone has WordPress in the root of their domain, you cause anyone using 'Giving WordPress it's own directory' (a VERY common setup) to break. In addition, WordPress allows users to change the name of wp-content, so you would break anyone who choses to do so.

Please review http://codex.wordpress.org/Determining_Plugin_and_Content_Directories and update your plugin accordingly. And don't worry about supporting WordPress 2.x or lower. We don't encourage it nor expect you to do so, so save yourself some time and energy.

Example:

var path = '../wp-content/plugins/wpardeekmembership/';

$plugin_path = $_SERVER['DOCUMENT_ROOT'] . '/wordpress';

## Generic function (and/or define) names

All plugins should have unique function names, defines, and classnames. This will prevent your plugin from conflicting with other plugins or themes.

For example, if your plugin is called "Easy Custom Post Types", then you might prefix your functions with ecpt_{your function name here}. Similarly a define of LICENSE would be better done as ECPT_LICENSE. You can use namespaces instead, however make sure that those also are unique. A namespace or class of 'MyPlugin' is NOT actually all that unique, you see.
 This extends to anything in a define. For example ...

define( 'PLUGIN_PATH', plugins_url( __FILE__ ) );

That define is a global, so PLUGIN_PATH could conflict with a number of other things.

Don't try to use two letter slugs anymore. As of 2016, all the good ones are taken. Instead consider easy_cpts_ (from the first example).

Similarly, don't use __ to prefix, as the double underscore should be reserved for WordPress itself.

Please update your plugin to use more unique names.

Some Examples:

define('SITE_URL', 'http://127.0.0.1:81/wordpress/wp-admin/options-general.php?page=wpardeekmembership');
function testing()

If those are intended to be in shared libraries, please detect IF the code is already included and not re-include it, as doing so will cause conflicts if two people call the same defines and functions.

## Allowing Direct File Access to plugin files

Direct file access is when someone directly queries your file. This can be done by simply entering the complete path to the file in the URL bar of the browser but can also be done by doing a POST request directly to the file. For files that only contain a PHP class the risk of something funky happening when directly accessed is pretty small. For files that contain procedural code, functions and function calls, the chance of security risks is a lot bigger.

You can avoid this by putting this code at the top of all php files:

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

## Using your own uploader

Historically, we've had lots of security issues with regard to plugins that do their own uploads because they don't consider the security ramifications of allow any file to be uploaded.

Generally speaking, we prefer plugins to not attempt to handle "uploads" themselves, but to use the built in WordPress media functionality for that. WordPress has many functions to handle both media uploads (image, video, audio) as well as to handle just raw "file" uploads, which a PDF would likely fall under. Additionally, WordPress has a media management system built in, where users can upload files, and those files will be indexed by the system as "attachment" posts.

We would highly recommend using this built-in functionality instead, as it accounts for security issues like these, and takes things like user permissions into account as well. No need to roll your own code if you use this sort of functionality.

We recommend looking at the wp_handle_upload() function and the various calls made to it in WordPress, as well as the media system in general. Using functionality like this can simplify your plugin quite a lot, and also mitigate any potential security issues that you might accidentally introduce to a site.

## Please use wp_enqueue commands

Your plugin is using <style> and/or <link> tags to insert CSS/JS

You should be using the built in functions for this:

https://codex.wordpress.org/Function_Reference/wp_enqueue_script
https://codex.wordpress.org/Function_Reference/wp_enqueue_style

If you're trying to enqueue on the admin pages you'll want to use the admin enqueues

https://codex.wordpress.org/Plugin_API/Action_Reference/admin_enqueue_scripts
https://codex.wordpress.org/Plugin_API/Action_Reference/admin_print_scripts
https://codex.wordpress.org/Plugin_API/Action_Reference/admin_print_styles

## Hardcoded plugin folder name

Your plugin won't work via our repository because you hardcoded in the plugin's folder. You've defined your plugin name like this:

        $relative_path = '/wpardeekmembership';
        $plugin_url = WP_PLUGIN_URL . $relative_path;

Problem is? That won't be the folder name. The plugin folder name is derived from the name you used to submit your plugin. So if you submitted it as 'Joe's Cool Nameapp' then the folder will be joes-cool-nameapp and not cool-nameapp.

Please read http://codex.wordpress.org/Function_Reference/plugins_url - you'll notice how we have a __FILE__ parameter used in most examples. If you change your plugin to use that, it will work no matter what the folder name is.

----

Please make sure you've addressed ALL issues brought up in this email. When you've corrected your code, reply to this email with the updated code attached as a zip, or provide a link to the new code for us to review. If you have questions, concerns, or need clarification, please reply to this email and just ask us.

(While we have tried to make this review as exhaustive as possible we, like you, are humans and may have missed things. As such, we will re-review the ENTIRE plugin when you send it back to us. We appreciate your patience and understanding in this.)