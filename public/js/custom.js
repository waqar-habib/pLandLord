$(function() {
    
    /* Confirmation modal */
    $('#confirm-box').confirmOn({
        questionText: 'The tenant ' + $( "#future-form div.name input" ).val() + ' has been added.',
        textYes: 'Thanks!'
    },'click', function() {
        //$(this).remove();
    });
    
});