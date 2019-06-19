$(document).ready(function() {
    // Tenant Container holds all of our information regarding the Tenant searched
    var nameInput = $("#tenant-name");
    var tenantList = $("tbody");
    var tenantContainer = $(".tenant-container");
    // var tenantModelSelect = $("#modelselect");
    // Click events for the edit and delete buttons
    $(document).on("submit", ".tsearch", tenantSearch);

    // tenantModelSelect.on("change", handleModelChange);
   

        getTenants()

        function tenantSearch(event) {
            event.preventDefault();
            // Don't do anything if the name fields hasn't been filled out
            if (!nameInput.val().trim()) {
                return;
            }
            // Calling the upsertAuthor function and passing in the value of the name input
            getTenants({
            name: nameInput
                .val()
                .trim()
            });
        }    // $(document).on("click", "button.delete", deleteTenant);
        

            function getTenants() {
                $.get("/api/tenants", function(data) {
                var rowsToAdd = [];
                for (var i = 0; i < data.length; i++) {
                    rowsToAdd.push(createTenantRow(data[i]));
                }
                renderTenantList(rowsToAdd);
                nameInput.val("");
                });
            }

                function renderTenantList(rows) {
                    tenantList.children().not(":last").remove();
                    tenantContainer.children(".alert").remove();
                    if (rows.length) {
                    console.log(rows);
                    tenantList.prepend(rows);
                    }
                    else {
                    renderEmpty();
                    }
                }
        
                    // Function for creating a new list row for Tenants
                    function createTenantRow(tenantData) {
                        console.log(tenantData);
                        var newTr = $("<tr>");
                        newTr.data("tenants", tenantData);
                        newTr.append("<td>" + tenantData.name + "</td>");
                        newTr.append("<td>" + tenantData.email_address + "</td>");
                        newTr.append("<td><a href='/lease?tenant_id=" + tenantData.id + "'>View Leasing Information</a></td>");
                        newTr.append("<td><a href='/bills?tenant_id=" + tenantData.id + "'>View Billing Information</a></td>");
                        newTr.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Tenant</a></td>");
                        return newTr;
                    }
                    });