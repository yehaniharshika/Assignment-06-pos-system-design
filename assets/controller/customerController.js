import {CustomerModel} from "../model/CustomerModel.js";
import {customer_db} from "../db/db.js";

var recordIndex;
/*load customer for table*/
function loadTable() {

    $("#customer-tbl-tbody").empty();

   customer_db.map((item, index) => {
        console.log(item);

        let record = `<tr>
                <td class="customer-id-value">${item.customerId}</td>
                <td class="customer-name-value">${item.name}</td>
                <td class="customer-address-value">${item.address}</td>
                <td class="customer-contact-value">${item.contactNumber}</td>
                <td class="customer-email-value">${item.email}</td>
            </tr>`;
        $("#customer-tbl-tbody").append(record);
    });
}


$("#customer-tbl-tbody").on('click', 'tr', function() {
    let index = $(this).index();
    recordIndex = index;

    console.log("index: ", index);

    let customerId = $(this).find(".customer-id-value").text();
    let name = $(this).find(".customer-name-value").text();
    let address = $(this).find(".customer-address-value").text();
    let contactNumber = $(this).find(".customer-contact-value").text();
    let email = $(this).find(".customer-email-value").text();

    $("#customer-Id").val(customerId);
    $("#customer-name").val(name);
    $("#customer-address").val(address);
    $("#contact-number").val(contactNumber);
    $("#email").val(email);

});


function generateCustomerId() {
    let highestCustomerId = 0;

    // Find the highest numeric part of existing customer IDs
    for (let i = 0; i < customer_db.length; i++) {
        const numericPart = parseInt(customer_db[i].customerId.split('-')[1]);
        if (!isNaN(numericPart) && numericPart > highestCustomerId) {
            highestCustomerId = numericPart;
        }
    }

    // Generate a new customer ID by incrementing the highest numeric part
    const newCustomerId = highestCustomerId + 1;

    // Insert the new customer ID into the #customer-id text field
    $('#customer-id').val('CUS-00' + newCustomerId);

    // Return the generated customer ID
    return 'CUS-00' + newCustomerId;
}

/*Auto-generate the customer ID when navigating to the main section*/
function populateCustomerIdField() {
    const customerIdField = document.getElementById('customer-Id');
    const generatedCustomerId = generateCustomerId();
    customerIdField.value = generatedCustomerId;
}

// Event listener for when the page loads
window.addEventListener('load', function() {
    // Call the function to populate the customer ID field
    populateCustomerIdField();
});

/*save customer*/
$("#customer-save").on('click', () => {
    var customerId = $('#customer-Id').val();
    var name = $('#customer-name').val().trim();
    var address = $('#customer-address').val().trim();
    var contactNumber = $('#contact-number').val().trim();
    var email = $('#email').val().trim();

    let customer = new CustomerModel(
        customerId,
        name,
        address,
        contactNumber,
        email
    );

    Swal.fire(
        'Save Successfully!',
        'Customer saved successfully.',
        'success'
    );

    // push to the array
    customer_db.push(customer);

    loadTable();
    $("#customer-reset").click();
    populateCustomerIdField();

});

/*update customer*/
$("#customer-update").on('click', () => {
    var customerId = $('#customer-Id').val();
    var customerName = $('#customer-name').val();
    var customerAddress = $('#customer-address').val();
    var customerContactNum = $('#contact-number').val();
    var customerEmail = $('#email').val();

    let customerObj = customer_db[recordIndex];
    // let studentObj = {...students[recordIndex]}; // clone object
    customerObj.customerId = customerId;
    customerObj.name = customerName;
    customerObj.address = customerAddress;
    customerObj.contactNumber = customerContactNum;
    customerObj.email = customerEmail;

    Swal.fire(
        'Update Successfully !',
        'Customer updated successfully.',
        'success'
    )


    loadTable();
    $("#customer-reset").click();
    populateCustomerIdField();

});

/*delete customer*/
$("#customer-delete").on('click', () => {

    customer_db.splice(recordIndex, 1);

    Swal.fire(
        'delete Successfully !',
        'Customer deleted successfully.',
        'success'
    )

    loadTable();
    $("#customer-reset").click();
});



