$(document).ready(function () {
    $(document).on("click", ".add-new-tenant", showAddTenantModal);
    
    
        // Trigger Tenant Modal Form Function
        function showAddTenantModal() {
            $("#modalContactForm").modal("show");
            $(document).on("click", ".submit-tenant", createNewTenant);


            function createNewTenant() {  
                console.log("Hello World")
                var nameInput = $("#name");
                var emailInput = $("#email");
                var dobInput = $("#dob")
                var phonenumberInput = $("#phonenumber");
                var moveindateInput = $("#move-in");
                var moveoutdateInput = $("#move-out");
                
            
                $("#modalContactForm").on("submit", function handleFormSubmit(event) {
                    event.preventDefault();
                        if (!nameInput.val().trim()) {
                            return;
                        }
                        // Constructing a newPost object to hand to the database
                        var newTenant = {
                        name: nameInput.val().trim(),
                        email_address: emailInput.val().trim(),
                        date_of_birth: dobInput.val(),
                        phone_number: phonenumberInput.val().trim(),
                        move_in_date: moveindateInput.val().trim(),
                        move_out_date: moveoutdateInput.val().trim(),
                        email: emailInput.val().trim(),
                        };
                            console.log(newTenant);
                            submitTenant(newTenant);
    
    
                            
                    
                        });
                function submitTenant() {
                $.post("/api/tenants/", Tenant, function() {
                });
            }
        };
        };


       


});
