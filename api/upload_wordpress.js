function upload_image_from_wp()
{
    jQuery(document).ready(function(){
    var custom_uploader;
 
    $('#upload_image_button').on("click", function(e) {
    	
        e.preventDefault();
 
        //If the uploader object has already been created, reopen the dialog
        if (custom_uploader) {
            custom_uploader.open();
            return;
        }
 
        //Extend the wp.media object
        custom_uploader = wp.media.frames.file_frame = wp.media({
            title: 'Choose Image',
            button: {
                text: 'Choose Image'
            },
            multiple: false
        });
 
        //When a file is selected, grab the URL and set it as the text field's value
        custom_uploader.on('select', function() {
            attachment = custom_uploader.state().get('selection').first().toJSON();
            $('#upload_image').val(attachment.url);
            $('#update_image_button').removeClass('hidden');
            $('#update_image_button').addClass('button-primary');
            $('#preview-name-image').removeClass('hidden');
            $('#preview-name-image').val(attachment.url);
        });
 
        //Open the uploader dialog
        custom_uploader.open();
 
    });
 
 
});

}

function upload_file_from_wp()
{
    jQuery(document).ready(function(){
    var custom_uploader;
 
    $('#select_file_button').on("click", function(e) {
        
        e.preventDefault();
 
        //If the uploader object has already been created, reopen the dialog
        if (custom_uploader) {
            custom_uploader.open();
            return;
        }
 
        //Extend the wp.media object
        custom_uploader = wp.media.frames.file_frame = wp.media({
            title: 'Choose File',
            button: {
                text: 'Choose File'
            },
            multiple: false
        });
 
        //When a file is selected, grab the URL and set it as the text field's value
        custom_uploader.on('select', function() {
            attachment = custom_uploader.state().get('selection').first().toJSON();
            $('#upload_image').val(attachment.url);
            $('#upload_file_button').removeClass('hidden');
            $('#upload_file_button').addClass('button-primary');
            $('#preview-file-image').removeClass('hidden');
            $('#preview-file-image').val(attachment.url);
        });
 
        //Open the uploader dialog
        custom_uploader.open();
 
    });
 
 
});

}