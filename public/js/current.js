$(document).ready(function() {
    // Tenant Container holds all of our information regarding the Tenant searched
    var tenantContainer = $(".tenant-container");
    var tenantModelSelect = $("#category");
    // Click events for the edit and delete buttons
    $(document).on("click", "button.search", searchTenant);
    $(document).on("click", "button.delete", deleteTenant);
    tenantModelSelect.on("change", handleModelChange);
    var posts;

    function searchTenant() {
        var tenantString = tenant || "";
        if (tenantString) {
          tenantString = "/tenant/" + tenantString;
        }
       $.get("/api/tenant" + tenantString, function(data) {
            console.log("tenants", data);
            posts = data;
            if (!tenants || !tenants.length) {
              displayEmpty();
            }
            else {
              initializeRows();
            }
          });
      }

    });