$(document).ready(function() {
    // Tenant Container holds all of our information regarding the Tenant searched
    var nameInput = $("#tenant-name");
    var tenantList = $("tbody");
    var tenantContainer = $(".tenant-container");
    
    
    // var tenantModelSelect = $("#modelselect");
    // tenantModelSelect.on("change", handleModelChange);
    // Click event for submit button
    $(document).on("submit", ".tsearch", tenantSearch);
    // $(document).on("click", "button.delete", deleteTenant);


   
    // Call getTenants 
        getTenants()

        function tenantSearch(event) {
            event.preventDefault();
            // Remain idle if no name is given
            if (!nameInput.val().trim()) {
                return;
            }
            //  getTenants function passes in the value of the name input
            upsertTenant({
            name: nameInput
                .val()
                .trim()
            });
        }  

            function upsertTenant(tenantData) {
                $.post("/api/tenant/:id", tenantData)
                .then(getTenants);
            }
                
        
        
        // $(document).on("click", "button.delete", deleteTenant);
        

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