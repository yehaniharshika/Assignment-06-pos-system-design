import {item_db} from "../db/db.js";
import {ItemModel} from "../model/ItemModel.js";

import {customer_db} from "../db/db.js";
import {CustomerModel} from "../model/CustomerModel.js";

import {order_db} from "../db/db.js";
import {OrderModel} from "../model/OrderModel.js";


/*generate current order-date*/
function generateCurrentDate(){
    $("#order-date").val(new Date().toISOString().slice(0, 10));
}



function generateOrderId() {
    let highestOrderId = 0;

    // Find the highest numeric part of existing order IDs
    for (let i = 0; i < order_db.length; i++) {
        const numericPart = parseInt(order_db[i].orderId.split('-')[1]);
        if (!isNaN(numericPart) && numericPart > highestOrderId) {
            highestOrderId = numericPart;
        }
    }

    // Generate a new order ID by incrementing the highest numeric part
    const newOrderId = highestOrderId + 1;

    // Insert the new order ID into the #order-id text field
    $('#order-id').val('order-00' + newOrderId);

    // Return the generated order ID
    return 'order-00' + newOrderId;
}

/* Auto-generate the order ID when navigating to the main section */
function populateOrderIdField() {
    // Check if the input field with ID 'order-id' exists
    const orderIdField = document.getElementById('order-id');
    if (orderIdField) {
        // Call the function to generate and populate the order ID
        const generatedOrderId = generateOrderId();
        orderIdField.value = generatedOrderId;
    } else {
        console.error("Input field with ID 'order-id' not found.");
    }
}

// Event listener for when the page loads
window.addEventListener('load', function() {
    // Call the function to populate the order ID field
    populateOrderIdField();
    generateCurrentDate();
    populateCustomerIDs();

});

/*
// Load customer id for combo box
function populateCustomerIDs() {
    // Get a reference to the select element
    var customerIdComboBox = $('#customer-id-box');

    // Clear existing options except the default one
    customerIdComboBox.find("option:not(:first-child)").remove();

    // Iterate through the customerArray and add options to the select element
    for (let i = 0; i < customer_db.length; i++) {
        // Append an option element for each customer ID
        customerIdComboBox.append($("<option>", {
            value: customer_db[i].customerId,
            text: customer_db[i].customerId
        }));
    }
}
*/

function populateCustomerIDs() {
    // Assuming customer_db is an array of customer objects
    var customerIds = customer_db.map(function(customer) {
        return customer.customerId;
    });

    // Get a reference to the select element
    var customerIdComboBox = $('#customer-id-box');

    // Clear existing options except the default one
    customerIdComboBox.empty();

    // Append an option element for each customer ID
    customerIds.forEach(function(customerId) {
        customerIdComboBox.append($('<option>', {
            value: customerId,
            text: customerId
        }));
    });
}








