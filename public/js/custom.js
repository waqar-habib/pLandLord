$(function() {
    
    /* Confirmation modal */
    var tenantFormName = $("#future-form div.name input").val();
    console.log(tenantFormName);
    $('#confirm-box').confirmOn({
        questionText: 'The tenant ' + tenantFormName + ' has been added.',
        textYes: 'Thanks!'
    },'click', function() {
        //$(this).remove();
    });
    
});