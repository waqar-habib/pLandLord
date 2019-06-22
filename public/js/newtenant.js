$(document).ready(function() {
    function submitTenant(newGuy) {
      $.post("/api/tenants/", newGuy, function(data) {
        console.log("response back to front end was", data);
        $("#modalContactForm").modal("show");
        $("#modalContactForm").modal("hide");
      });
    }

    $(document).on("click", ".add-new-tenant", showAddTenantModal);

    // Trigger Tenant Modal Form Function
    function showAddTenantModal() {
    $("#modalContactForm").modal("show");
    };

    $(document).on("click", ".submit-tenant", function(event) {
      event.preventDefault();
      console.log("click");
      var newTenant = {
        name: $("#name")
          .val()
          .trim(),
        email_address: $("#email")
          .val()
          .trim(),
        date_of_birth: $("#dob")
          .val()
          .trim(),
        phone_number: $("#phone")
          .val()
          .trim(),
        move_in_date: $("#in")
          .val()
          .trim(),
        move_out_date: $("#out")
          .val()
          .trim()
      };
      console.log(newTenant);
      submitTenant(newTenant);
    });
  });
