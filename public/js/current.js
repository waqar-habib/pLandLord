$(document).ready(function () {
    
    // Tenant Container holds all of our information regarding the Tenant searched
    var nameInput = $("#tenant-name");
    var tenantList = $("tbody");
    var tenantContainer = $(".tenant-container");

    // Empty array that will hold the tenants retrieved from database
    var allUserInfo = [];

    // Click events for the edit and delete buttons
    $(document).on("click", ".tsearch", tenantSearch);
    $(document).on("click", "#view-lease", showTenantInfo);
    $(document).on("click", "#view-bills", showBillingInfo);
    $(document).on("click", ".clear-tenants", clearTable);

    // Link click event to Delete Button 
    $(document).on("click", "#delete-tenants", deleteTenant);

    //Shows tenant lease info in modal on click. 
    function showTenantInfo(event) {

        const selectedUser = $(event.target).data("userid");
        const selectedUserInfo = allUserInfo.filter(user => user.id === selectedUser)[0];
        $(".modal-lease").empty();
        $(".modal-lease").append('Tenant Name: ' + selectedUserInfo.name + '<br>');
        $(".modal-lease").append('DOB: ' + selectedUserInfo.date_of_birth + '<br>');
        $(".modal-lease").append('Email: ' + selectedUserInfo.email_address + '<br>');
        $(".modal-lease").append('Phone: ' + selectedUserInfo.phone_number + '<br>');
        $(".modal-lease").append('Lease Term: ' + selectedUserInfo.move_in_date + ' to ' + selectedUserInfo.move_out_date + '<br>');
        $("#exampleModal").modal("show");
    };

        // Shows tenant bills info in modal on click. 
    function showBillingInfo(event) {
        
        const selectedBill = $(event.target).attr("data-billingid");
        console.log(selectedBill);
        const selectedBillInfo = allUserBillInfo.filter(user => user.id === selectedBill)[0];
        console.log(selectedBillInfo)
        $(".modal-bills").empty();
        $(".modal-bills").append('Unit Number: ' + selectedBillInfo.unit_id + '<br>');
        $(".modal-bills").append('Tenant Billing ID: ' + selectedBillInfo.tenant_id + '<br>');
        $(".modal-bills").append('Lease ID: ' + selectedBillInfo.lease_id + '<br>');
        $(".modal-bills").append('Billing Date: ' + selectedBillInfo.date + '<br>');
        $("#billingModal").modal("show");
        getTenantBills(selectedBill);
    }
    

    getTenants();
    

    function tenantSearch(event) {
        event.preventDefault();
        // Take input from the search box and clg it
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

    }

    // Connected to the Clear button. Empties out the existing search criteria and inserts the current tenant database back in tbody 
    function clearTable(event) {
        event.preventDefault();
        $("tbody").empty();
        getTenants();
    }

        function getTenants() {
            $.get("/api/tenants", function (data) {
                allUserInfo = data
                var rowsToAdd = [];
                for (var i = 0; i < data.length; i++) {
                    rowsToAdd.push(createTenantRow(data[i]));
                }
                renderTenantList(rowsToAdd);
                nameInput.val("");
            });
        }

        function getTenantBills(billId) {
            $.get("/api/bills/" + billId, function (data) {
                allUserBillInfo = data
                console.log(data)
            });
        }

    function renderTenantList(rows) {
        tenantList.children().not(":last").remove();
        tenantContainer.children(".alert").remove();
        if (rows.length) {
            console.log(rows);
            tenantList.prepend(rows);
        } else {
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
        newTr.append("<td><button type ='button' class='btn btn-secondary' id='view-bills' data-billingid=" + tenantData.id + ">View Details</button></td>");
        // For now this Delete button doesn't do anything until we can add DELETE function to it.
        newTr.append("<td><button type ='button' class='btn btn-danger' id='delete-tenants' data-userid="  + tenantData.id + ">Delete</button></td>");
        return newTr;
    };

    // 2. Create a deleteTenant Function 
      function deleteTenant() {
      var listItemData = $(this).parent("td").parent("tr").data("tenants");
      var id = listItemData.id;
      $.ajax({
        method: "DELETE",
      url: "/api/tenants/" + id
      })
        .then(getTenants);
      }

    });

