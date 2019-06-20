$(document).ready(function() {
    // Tenant Container holds all of our information regarding the Tenant searched
    var nameInput = $("#tenant-name");
    var tenantList = $("tbody");
    var tenantContainer = $(".tenant-container");

    // Empty array that will hold the tenants retrieved from database
    var allUserInfo = [];

    // Click events for the edit and delete buttons
    $(document).on("click", ".tsearch", tenantSearch);
    $(document).on("click", "#view-lease", showTenantInfo);
    
    //Shows tenant info in modal on click. 
    function showTenantInfo(event) {
    
        const selectedUser = $(event.target).data("userid");
        const selectedUserInfo = allUserInfo.filter(user => user.id === selectedUser)[0];
        $(".modal-body").empty();
        $(".modal-body").append('Tenant Name: ' + selectedUserInfo.name + '<br>');
        $(".modal-body").append('DOB: ' + selectedUserInfo.date_of_birth + '<br>');
        $(".modal-body").append('Email: ' + selectedUserInfo.email_address + '<br>');
        $(".modal-body").append('Phone: ' + selectedUserInfo.phone_number + '<br>');
        $(".modal-body").append('Lease Term: ' + selectedUserInfo.move_in_date + ' to ' + selectedUserInfo.move_out_date + '<br>');
        $("#exampleModal").modal("show");
    }

        getTenants();

        function tenantSearch(event) {
            event.preventDefault();
            // Take whatever is in the search box and clg it
            var tenantName = nameInput.val().trim();
            console.log(tenantName);

            // Display the tenantName
            if (tenantName.length <= 0) {
                return;
            }

            // Pull all the data, filter it based on user.name, then store it in matchedUsers
            const matchedUsers = allUserInfo.filter(user => user.name.toLowerCase().includes(tenantName.toLowerCase()));
            console.log(matchedUsers);
            // 1. Empty the table; 2. Create empty array and use a for loop to cycle thru the matchedUsers object; 
            // 3. Then, display the returned object data in the table by calling renderTenantList
            $("tbody").empty();
            var rowsToAdd = [];
            for (var i = 0; i < matchedUsers.length; i++) {
                rowsToAdd.push(createTenantRow(matchedUsers[i]));
            }
            renderTenantList(rowsToAdd);
            //empty table, user for loop to show matchedUsers on the table
            // add clear btn which clears the table and then calls getTenant func to reappened all the rows

        }    
        

            function getTenants() {
                $.get("/api/tenants", function(data) {
                allUserInfo = data
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
                        // Pulls up a modal with tenant details
                        newTr.append("<td><button type ='button' class='btn btn-secondary' id='view-lease' data-userid=" + tenantData.id + ">View Details</button></td>");
                        // For now "View Billing Info" will show the same info as "View Details" but once we associate the correct model with this button it should be able to pull details from "bill.js"
                        newTr.append("<td><button type ='button' class='btn btn-secondary' id='view-lease' data-userid=" + tenantData.id + ">View Details</button></td>");
                        newTr.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Tenant</a></td>");
                        return newTr;
                    }
                    });


                   