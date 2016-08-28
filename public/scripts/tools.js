/*
 * Copyright (c) 2016  Andrey Yaresko.
 */

/**
 * Created by aayaresko on 17.07.16.
 */
jQuery(window).on('resize', function() {
    var height = jQuery( window ).height();
        height = height * 0.7;
    var min = 410;
    if (height < min) {
        height = min;
    }
    jQuery('#chat-main-window').height(height);
});
jQuery(document).ready(function(){
    jQuery(window).trigger('resize');
});