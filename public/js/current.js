$(document).ready(function() {
    // Tenant Container holds all of our information regarding the Tenant searched
    var nameInput = $("#tenant-name");
    var tenantList = $("tbody");
    var tenantContainer = $(".tenant-container");
    var tenantModelSelect = $("#modelselect");
    // Click events for the edit and delete buttons
    //$(document).on("submit", "#tsearch", tenantSearch);

    // tenantModelSelect.on("change", handleModelChange);
    // On click function for generatedCode.html
    function tenantSearch(event) {
    if (!nameInput.val()) {
      return;
    }
    // Calling the getTenants function and passing in the value of the name input
      getTenants({
        name: nameInput
        .val()
        .trim()
      });
    } 

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

    // Function for creating a new list row for authors
    function createTenantRow(tenantData) {
      console.log(tenantData);
      var newTr = $("<tr>");
      newTr.data("tenant", tenantData);
      newTr.append("<td>" + tenantData.name + "</td>");
      newTr.append("<td># of posts will display when we learn joins in the next activity!</td>");
      newTr.append("<td><a href='/lease?tenant_id=" + tenantData.id + "'>View Leasing Information</a></td>");
      newTr.append("<td><a href='/bills?tenant_id=" + tenantData.id + "'>View Billing Information</a></td>");
      newTr.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Author</a></td>");
      return newTr;
    }

  $("#tsearch").on("click", function () {
    console.log("hello world");  
    // $(document).on("click", "button.delete", deleteTenant);
    tenantSearch();
    getTenants();
    renderTenantList();
    createTenantRow();
  });
}); // end generateCodeBtn function 