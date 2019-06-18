$(document).ready(function() {
    // Tenant Container holds all of our information regarding the Tenant searched
    var tenantContainer = $(".tenant-container");
    var tenantModelSelect = $("#category");
    // Click events for the edit and delete buttons
    $(document).on("click", "button.search", searchTenant);
    $(document).on("click", "button.delete", deleteTenant);
    tenantModelSelect.on("change", handleModelChange);
    var posts;

    function searchTenant(tenantData) {
        $.get("/api/:tenant", tenantData)
          .then(createTenantRow);
      }
    
      // Function for creating a new list row for authors
      function createTenantRow(authorData) {
        console.log(tenantData);
        var newTr = $("<tr>");
        newTr.data("tenant", tenantData);
        newTr.append("<td>" + tenantData.name + "</td>");
        newTr.append("<td># of posts will display when we learn joins in the next activity!</td>");
        newTr.append("<td><a href='/blog?author_id=" + tenantData.id + "'>Go to Posts</a></td>");
        newTr.append("<td><a href='/cms?author_id=" + tenantData.id + "'>Create a Post</a></td>");
        newTr.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Author</a></td>");
        return newTr;
      }
    });